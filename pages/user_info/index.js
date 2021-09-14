/*
 * @Author: your name
 * @Date: 2021-08-20 05:43:48
 * @LastEditTime: 2021-08-30 14:53:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \miniprogram-1\pages\user_info\index.js
 */
// pages/user_info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    nickName: "",
    name:"",
    icon: "",
    isNickname:false,
    birthday:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync("user")
    let birth = wx.getStorageSync("birthday");
    let icon = user.icon;
    if(!birth){
      this.setData({
        birthday:""
      })
    }
    this.setData({
      token: user.token,
      nickName:user.nick_name,
      name:user.nick_name,
      birthday:birth,
      icon,
    })
  },
  //上传图片
  upLodeImg(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        wx.showToast({
          title: '正在上传',
          icon: 'loading',
        });
          console.log(result.tempFilePaths[0]);
          this.setData({
            icon:result.tempFilePaths[0]
          })
          let user = wx.getStorageSync("user");
          user.icon = result.tempFilePaths[0];
          wx.setStorageSync('user', user);
          this.alterUserInfo();
        //   wx.uploadFile({
        //   url: 'http://api_devs.wanxikeji.cn',
        //   filePath: result.tempFilePaths[0],
        //   name: "image",
        //   formData: {},
        //   success: (res) => {
        //     console.log(res);
        //     console.log(Array.from("\u7f3a\u5c11\u56fe\u7247"));
        //   },
        //   fail: (err) => {console.log(err);},
        //   complete: () => {}
        // });

      },
      fail: () => {},
      complete: () => {}
    });

  },
  //修改个人信息API
  alterUserInfo() {
    wx.request({
      url: 'http://api_devs.wanxikeji.cn/api/userModify',
      data: {
        token: this.data.token,
        nick_name: this.data.nickName,
        icon:this.data.icon,
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log(result);
      },
      fail: () => { },
      complete: () => { }
    });

  },
  //昵称点击修改
  handleModifyName(){
    this.setData({
      isNickname:true
    })
  },
  //确认按钮
  handleComfirm(){
    if(this.data.nickName.trim()==''){
      wx.showToast({
        title: '昵称不能为空哦',
        icon: 'none',
      });
    }else if(this.data.nickName.trim().length<4||this.data.nickName.trim().length>20){
      wx.showToast({
        title: '昵称必须是4-20个字符哟',
        icon: 'none',
      });
    }else{
      this.alterUserInfo();
      this.setData({
        isNickname:false
      })
      let user = wx.getStorageSync("user");
      user.nick_name = this.data.nickName;
      wx.setStorageSync('user', user)
      wx.showToast({
        title: '修改成功啦',
        icon: 'none',
      });
    }
  },
  //取消按钮
  handleCancle(){
    // console.log(this.data.name);
    this.setData({
      isNickname:false,
      nickName:this.data.name
    })
  },
  //隐藏阴影和修改昵称
  handleShadow(){
    this.setData({
      isNickname:false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //用户名点击事件
  userName(){
    wx.showToast({
      title: '用户名不支持修改',
      icon: 'none',
    });

  },
  //出生日期
  handleBirth(e){
    console.log(e.detail.value);
    wx.setStorageSync("birthday", e.detail.value);
    this.setData({
      birthday:e.detail.value
    })

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