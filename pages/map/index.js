/*
 * @Author: your name
 * @Date: 2021-08-25 09:54:51
 * @LastEditTime: 2021-08-25 11:25:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \miniprogram-1\pages\map\index.js
 */
// pages/map/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:0,
    latitude:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'wgs84',
      altitude: false,
      success: (result) => {
        console.log(result);
        this.setData({
          longitude:result.longitude,
          latitude:result.latitude
        })
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  handlelongitude(e){
    // console.log(e.detail);
    wx.chooseLocation({
      success: (result) => {
        console.log(result);
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