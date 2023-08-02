# APIS-WeChat-mini-program

应急管理大学空调查询系统的微信小程序端

## [前端APIS-WeChat-mini-program](https://github.com/krisxia0506/APIS-WeChat-mini-program)

前端部分采用面向微信小程序的Echarts框架：[echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin)

## [后端APIS-Service](https://github.com/krisxia0506/APIS-Service)

后端采用的技术栈：SpringBoot2+Mybatis+Druid

## 首页

* 查询实时电量
* 获取近七天平均用电
首页
![首页](https://xjy-1305858208.cos.ap-beijing.myqcloud.com/APIS-WeChat-mini-program.jpg?q-sign-algorithm=sha1&q-ak=AKIDya0kvxbphMiZo5hTVZUWqsdBsyG11JBn1unznNn10QFyVOiRzaIEReo8pYa_FPLA&q-sign-time=1690940767;1690944367&q-key-time=1690940767;1690944367&q-header-list=host&q-url-param-list=ci-process&q-signature=10d4e4d6787eab0ea773ea5e57f3024bcb639716&x-cos-security-token=l89sL4A4oMMirnEyDCaqv5lmkY8wHyYaa0a65e0988358019ff82c5bffd1e9cf626_6soU8nXMTqu0VRP7dYEz18L7_I1ojwcmtk187Yjmo0HGGf7sHMKeUhTECNOjK8lyZUD7SUhf3CCOaY8Ukv1cBgrO6ddOxqNmd1IZyjZydtceD4I02jFoeVZcIhObDEx9MbrBEGc6FiETgZzxRo2deqiXG2IpIO39d-wdeN3P_IgrpVKDR3nTkaoComy1x&ci-process=originImage)
图表
![图表](https://xjy-1305858208.cos.ap-beijing.myqcloud.com/APIS-WeChat-mini-program-echarts.jpg?q-sign-algorithm=sha1&q-ak=AKID0OZVKC6u6ihgYVOTDm5gpCoTjwzsd0ZGk5HqCIeN_grWI0AS3jZkE_gpL9bV1Mv5&q-sign-time=1690940830;1690944430&q-key-time=1690940830;1690944430&q-header-list=host&q-url-param-list=ci-process&q-signature=ae2378fbf41a5b480eb40659296bf75e2892a373&x-cos-security-token=l89sL4A4oMMirnEyDCaqv5lmkY8wHyYa7a2e2780f4ec77ae92d54f53d6faaba826_6soU8nXMTqu0VRP7dYAmfozvTMfXLGNO9kqSMy8tAGj1GY_eSNu4JbslbwYj2OSolLyRKHTHyh0aiUfMwEw9x9brjsTmVWahdjp5h5dsTebGgcISG9WDc1XW4R-DNLshyWflUnbilPBaqg0FQN24WQRyCPw_D3ALgbyXPRbBVS1yfNI9LoBydC4xgLqsp&ci-process=originImage)
未登录
![未登录](https://xjy-1305858208.cos.ap-beijing.myqcloud.com/APIS-WeChat-mini-program-nologin.jpg?q-sign-algorithm=sha1&q-ak=AKIDRCwvGupPNtyveYokdBSa7_ekaRoq3Orbh4Eqd3pCnKlqooRdQ0r5-X305acWje8D&q-sign-time=1690940863;1690944463&q-key-time=1690940863;1690944463&q-header-list=host&q-url-param-list=ci-process&q-signature=6373bf448cfc005b7b000c01eff52e9b29d83d3a&x-cos-security-token=l89sL4A4oMMirnEyDCaqv5lmkY8wHyYa02c9f49d2c7acb74844acddd1e611f1e26_6soU8nXMTqu0VRP7dYEQ5fylY0inDdSMD7bzttxPpz27rPCTW3HlDgg1EI8IzgbRcg_4o8vkTYF4tXyLgAdLC7_FxHwP71FwgIOeDXj7rx4ufndjywFQ-qCI_XJaq-2ghp227jUwGrdfhXizdKrpdY1zHmCVKUjmaFF2XciiR5B73SIIeJzrbpKhHmY4D&ci-process=originImage)
登陆
![已登录](https://xjy-1305858208.cos.ap-beijing.myqcloud.com/APIS-WeChat-mini-program-login.jpg?q-sign-algorithm=sha1&q-ak=AKIDaz1kx9zxNjx7aEQUpeS14GuZ63452HLg8yUI8A6eFGB3RRaMLx0ulSFeLXfgJIA4&q-sign-time=1690940901;1690944501&q-key-time=1690940901;1690944501&q-header-list=host&q-url-param-list=ci-process&q-signature=bd7269b8d394d5b27e41eef662e3cfb123f97c66&x-cos-security-token=l89sL4A4oMMirnEyDCaqv5lmkY8wHyYab6d8f07ad1f3ff737355d67fbc91532926_6soU8nXMTqu0VRP7dYP33lgsFX4Ll57xk65nNpbCZEqLsjZnj0Xs5_dUiqdXVXWKCSQi_2EG3TP5Y_eKQB-fW2DY3ZPFbZ014z62hxkCZY-6VGMWQOGFk0ZinmmrJFLPzQhCs4QEoU9exmZU-Wg1FzoPwgSKJCdhA6GemOX7UPrlcwKCbX_hFqSWVk1GD&ci-process=originImage)
