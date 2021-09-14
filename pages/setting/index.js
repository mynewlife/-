/*
 * @Author: your name
 * @Date: 2021-08-23 16:41:09
 * @LastEditTime: 2021-08-30 09:31:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \miniprogram-1\pages\setting\index.js
 */
// pages/setting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    icon:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //退出登录
  logOff(){
    let user =  wx.getStorageSync("user");
    if(user){
      wx.setStorage({
        key: 'user',
        data: "",
        success: (result) => {
        },
        fail: () => {},
        complete: () => {}
      });
      wx.setStorageSync('address', '')
      wx.showToast({
        title: '已退出登录',
        icon: 'none',
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
      }, 1000);

    }
  },
  //返回上一页跳转
  // handleSet(){
  //   wx.navigateTo({
  //     url: '/pages/address/index',
  //     success: (result) => {

  //     },
  //     fail: () => {},
  //     complete: () => {}
  //   });
  // },
  //个人信息跳转
  handleUserInfo(){
    wx.navigateTo({
      url: '/pages/user_info/index',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },
  //我的收货地址跳转
  handleMyaddress(){
    wx.navigateTo({
      url: '/pages/address/index',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let user = wx.getStorageSync("user");
    let nickName = user.nick_name;
    let icon = user.icon
    if(nickName){
      this.setData({
        nickName,
        icon,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})