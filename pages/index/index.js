// pages/list.js
Page({
    promiseClick(building, room) {

        // wx.showLoading({
        //     title: '查询中',
        // })
        // //console.log('楼号选择是',building_id2post[1])
        // let p = new Promise(function (resolve) {
        //     wx.request({
        //         url: 'http://localhost:80801/electricityLevel?buildingID=' + building +'&roomID='+ room,
        //         method: "GET",
        //         dataType: JSON,
        //         success: (res) => {
        //             console.log(res.data)
        //             //捕获json.pause异常
        //             try {
        //                 //判断查询结果json的returncode字段
        //                 if (JSON.parse(res.data).returncode == '100') {
        //                     //查询成果返回json的quantity字段 
        //                     resolve(JSON.parse(res.data).quantity)
        //                 } else if (JSON.parse(res.data).returncode == '-600') {
        //                     resolve('-600')
        //                 } else {
        //                     resolve('no-room')
        //                     //console.log(JSON.parse(res.data).quantity)
        //                 }
        //             } catch (e) {
        //                 console.log(e.message);
        //                 wx.hideLoading();
        //                 resolve('error')
        //             }
        //         },

        //     })
        // });
        // 方法1
        wx.showLoading({
            title: '查询中',
        })
        
        // 封装请求为 Promise
        function requestWithPromise(url, method) {
            return new Promise(function (resolve, reject) {
                wx.request({
                    url: url,
                    method: method,
                    dataType: 'json', // 修改为字符串 'json'
                    success: (res) => {
                        resolve(res.data);
                    },
                    fail: (err) => {
                        reject(err);
                    },
                });
            });
        }
        
        // 使用封装的请求函数
        let p = new Promise(function (resolve) {
            requestWithPromise('http://localhost:8080/electricityLevel?buildingID=' + building + '&roomID=' + room, 'GET')
                .then((res) => {
                    console.log(res);
                    try {
                        // 判断查询结果 json 的 returncode 字段
                        if (res.returncode === '100') {
                            // 查询成功返回 json 的 quantity 字段
                            resolve(res.quantity);
                        } else if (res.returncode === '-600') {
                            resolve('-600');
                        } else {
                            resolve('no-room');
                        }
                    } catch (e) {
                        console.log(e.message);
                        resolve('error');
                    }
                })
                .catch((err) => {
                    console.log('请求超时：', err);
                    wx.hideLoading(); // 关闭 loading 框
                    wx.showToast({
                        title: '请求超时请稍后重试，或联系客服',
                        icon: 'none',
                    });
                    resolve('timeout'); // 返回 'timeout' 用于后续处理
                });
        });

    
          
        
        
        let avg = new Promise(function (resolve) {
            wx.request({
                url: 'http://127.0.0.1:8080/getAvgPowerConsumptionToJson?buildingID=' + building +'&roomID='+ room,
                method: "GET",
                dataType: JSON,
                success: (res) => {
                    console.log(res.data)
                    //捕获json.pause异常
                    try {      
                        resolve(res.data)
                    } catch (e) {
                        console.log(e.message);
                        wx.hideLoading();
                        resolve('error')
                    }
                },
            })
        });
        
        p.then((data) => {
            //console.log(data)        
            if (data == 'no-room') {
                wx.hideLoading();
                wx.showModal({
                    title: '输错了哦',
                    content: '请输入正确的宿舍',
                    showCancel:false,
                })
            } else if (data == '-600') {
                wx.hideLoading();
                wx.showModal({
                    title: '系统维护',
                    content: '系统维护中，请稍后重试',
                    showCancel:false,
                })
            } else if(data=='timeout'){
                return
            }
            else {
                wx.hideLoading();
                this.setData({
                    shengyu: '剩余电量',
                    kongtiao: data,
                    du: '度'
                })
                // 传递参数给echarts
                getApp().globalData.building=building;
                getApp().globalData.room=room;
                getApp().globalData.todaypower=data;
            }

        });
        avg.then((data) => {     
            if(data!=''){
                data="近七天日平均用电"+data+"度"
                this.setData({
                    avg: data,
                }) 
            }       
    });
        
    },
    //点击查询后执行 
    formSubmit(e) {
        //清空页面已有的显示
        this.setData({
            avg: '',
            shengyu: '',
            kongtiao: '',
            du: ''
        }) 
        
        let room = e.detail.value.room;
        let building = e.detail.value.building.valueOf()
        if (e.detail.value.building == -1 || e.detail.value.building == 0) {
            wx.showModal({
                title: '输错了哦',
                content: '请输入正确的宿舍',
                showCancel:false,
            })
            return false
        }
        // 执行查询
        this.promiseClick(building, room)
    },
    bindPickerChange: function (e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            // 楼号
            index: e.detail.value
        })
    },
    // 用前须知
    what() {
        wx.showModal({
            title: '用前须知',
            content: '8号楼的ABCD区用1234代替\r例如A102房间号为1102\rB102房间号为2102\rC102房间号为3102\rD102房间号为4102\r若需充值电量可前往\r完美校园APP-缴费-预缴费处缴费\r到账时间1-3分钟，单价0.5元/度',
            showCancel:false,
        })
    },

    /**
     * 页面的初始数据
     */
    data: {
        imagsrc: 'https://i0.hdslb.com/bfs/face/dfef378ff65e8e9007f3ffcd6bfeb711f236b797.jpg@240w_240h_1c_1s.webp',
        array: ['请选择公寓楼', '1号楼', '2号楼', '3号楼', '4号楼', '5号楼', '6号楼', '7号楼', '8号楼', '9号楼', '10号楼', '11号楼'],
        shengyu: '',
        index: 0,
        kongtiao: '',
        du: '',
        avg:''
    },
    


    /**
     * 生命周期函数--监听页面加载
     * (
        )
     */
    onLoad(options) {
    }
            
    ,

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: res => {
        return {
            title: '微信小程序可以查询空调电量啦！',
            path: '/pages/index/index',
            success: function () {},
            fail: function () {}
        }
    },

})