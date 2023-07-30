import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
//上图表 历史电量
var buidlid = app.globalData.building
var roomid = app.globalData.room

function setOption(chart) {
    var buidlid = app.globalData.building
    var roomid = app.globalData.room
    console.log(buidlid, roomid)

    let p = new Promise(function (resolve) {

        wx.request({
            url: 'http://127.0.0.1:8080/getHistoricalElectricityToJson?buildingID=' + buidlid + '&roomID=' + roomid,
            method: "GET",
            dataType: JSON,
            success: (res) => {
                //捕获json.pause异常
                try {
                    //console.log(JSON.parse(res.data))
                    resolve(JSON.parse(res.data))
                } catch (e) {
                    // console.log(e.message);
                    resolve('error')
                }
            }
        })
    });
    p.then((data) => {
        // 今天电量显示当前查询的电量


        // 提取 powerTable 数组中的 date 和 power 属性
        var dateArray = data.powerTable.map(item => item.date);
        var powerArray = data.powerTable.map(item => item.power);
        powerArray[6] = app.globalData.todaypower
        dateArray[6] = '今天'
        console.log("Dates:", dateArray);
        console.log("Powers:", powerArray);
        const option = {
            title: {
                text: buidlid + "-" + roomid + '历史电量曲线(Beta)',
                left: 'center'
            },
            legend: { //图例组件的相关配置
                data: ['电量曲线'], //图例上显示的文字信息
                top: 25, //设置图例在Y轴方向上的位置
                left: 'center', //设置图例在X轴方向上的位置
                backgroundColor: 'white', //背景颜色

            },
            grid: { //图表离容器的距离
                containLabel: true //防止数值过大而超出视图
            },
            tooltip: { //提示框
                show: true, // 是否显示提示框组件
                trigger: 'axis' //触发类型:坐标轴触发
            },
            xAxis: { //x坐标轴
                type: 'category', // 坐标轴类型
                name: "日期", // 坐标轴名
                boundaryGap: false, //x 坐标轴两边不留白
                data: dateArray, //设置 x 轴上的值。
            },
            yAxis: {
                x: 'center',
                type: 'value', //坐标轴类型
                name: "剩余电量/度",
                axisLine: {
                    show: true, // 是否显示坐标轴轴线
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed' // 坐标轴线线的类型：虚线
                    }
                }
            },
            series: [{
                name: '历史电量',
                type: 'line', // 图形类型
                smooth: true, // 线条平滑展示，折线图起作用
                data: powerArray // 数值
            }]
        };
        chart.setOption(option);
    });
}

//下图表 历史耗电量
function setOption2(chart) {
    var buidlid = app.globalData.building
    var roomid = app.globalData.room
    let p = new Promise(function (resolve) {
        wx.request({
            url: 'http://127.0.0.1:8080/getPowerConsumptionToJson?buildingID=' + buidlid + '&roomID=' + roomid,
            method: "GET",
            dataType: JSON,
            success: (res) => {
                //捕获json.pause异常
                try {
                    //console.log(JSON.parse(res.data))
                    resolve(JSON.parse(res.data))
                } catch (e) {
                    // console.log(e.message);
                    resolve('error')
                }
            }
        })
    });
    p.then((data) => {
        var dateArray = data.powerTable.map(item => item.date);
        var powerArray = data.powerTable.map(item => item.power);
        console.log("Dates:", dateArray);
        console.log("Powers:", powerArray);
        const option = {
            title: {
                text: buidlid + "-" + roomid + '近期耗电量曲线(Beta)',
                left: 'center'
            },
            legend: {
                data: ['电量曲线'],
                top: 25,
                left: 'center',
                backgroundColor: 'white',
                z: 100
            },
            grid: {
                containLabel: true
            },
            tooltip: {
                show: true,
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                name: "日期",
                boundaryGap: false,
                data: dateArray,
                // show: false
            },
            yAxis: {
                x: 'center',
                type: 'value',
                name: "耗电量/度",
                axisLine: {
                    show: true, // 是否显示坐标轴轴线
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
                // show: false
            },
            series: [{
                name: '耗电量',
                type: 'line',
                smooth: true,
                data: powerArray
            }]
        };
        chart.setOption(option);
    });
}
Page({
    onShareAppMessage: res => {
        return {
            title: '微信小程序可以查询空调电量啦！',
            path: '/pages/index/index',
            success: function () {},
            fail: function () {}
        }
    },

    onReady: function () {
        // 获取组件 
        this.ecComponent = this.selectComponent('#mychart-dom-bar');
        this.ecComponent2 = this.selectComponent('#mychart-dom-multi-scatter');
        this.init()

    },

    data: {
        ec: {
            // 将 lazyLoad 设为 true 后，需要手动初始化图表
            lazyLoad: false
        },
        ecScatter: {
            lazyLoad: false
        },
        isLoaded: true,
        isDisposed: false,
        flag: "0"
    },

    // 点击按钮后初始化图表
    init: function () {

        if (app.globalData.building == 0 || app.globalData.room == 0) {
            if (app.globalData.flag == 0) {
                wx.showModal({
                    title: '先选择宿舍哦',
                    content: '请先在 首页 查询剩余电量后才能查看图表哦',
                    showCancel: false,
                    success(res) {
                        app.globalData.flag = 0
                    }
                })
                app.globalData.flag = 1
            }
        } else {
            this.ecComponent.init((canvas, width, height, dpr) => {
                // 获取组件的 canvas、width、height 后的回调函数
                // 在这里初始化图表
                const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                });
                setOption(chart);
                // 将图表实例绑定到 this 上
                this.chart = chart;
                this.setData({
                    isLoaded: true,
                    isDisposed: false
                });
                // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                return chart;
            });
            this.ecComponent2.init((canvas, width, height, dpr) => {
                // 获取组件的 canvas、width、height 后的回调函数
                // 在这里初始化图表
                const scatterChart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                });
                setOption2(scatterChart);
                // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                this.scatterChart = scatterChart;
                this.setData({
                    isLoaded: true,
                    isDisposed: false
                });
                // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                return scatterChart;
            });
        }
    },
    onShow: function () {
        try {
            this.init();
        } catch {
            console.log("onshow首次加载失败")
        }
    }
});