/*
 * @Author: your name
 * @Date: 2021-08-20 05:43:48
 * @LastEditTime: 2021-08-20 07:45:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \miniprogram-1\app.js
 */
/*
 * @author: Lan_
 * @create: 2021-08-20 10:51 AM
 * @license: MIT
 * @lastAuthor: Lan_
 * @lastEditTime: 2021-08-20 13:06 PM
 * @desc:
 */
//app.js
App({
  onLaunch: function () {
    var _this = this;
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        //导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;        //navTop
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    userInfo: null,
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
 	 },
});
