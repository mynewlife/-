import {
  request
} from "../../request/request";

// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    user: {},
    checked: false,
    istrue: true
  },
  str: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],

  // 微信一键登录函数
  getUserProfile(e) {
    // 判断是否勾选用户协议
    if (this.data.checked) {
      // 生成随机用户名
      let names = this.generateMixed(13);
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          console.log(res);
          this.setData({
            userInfo: res,
            //   hasUserInfo: true
          })
          // 执行加载事件
          wx.showLoading({
            title: '登录中',
            mask: true
          })
          wx.login({
            // success成功之后
            success(res) {
              // 打印获取的对象
              console.log(res.code);
              // 如果有code
              if (res.code) {
                // 直接发起网络请求
                wx.request({
                  // 通过code换取openid
                  // 在请求后面携带参数code
                  url: 'http://api_devs.wanxikeji.cn/api/codeExchangeOpenid',
                  // method选择发送的请求方式
                  method: "POST",
                  data: {
                    code: res.code,
                  },
                  // 成功之后打印获取到的对象
                  success: restwo => {
                    console.log(restwo);
                    // console.log(restwo.data.msg);
                    if (restwo.data.msg === "用户已被禁用") {
                      wx.showToast({
                        title: '该账号已被禁用',
                        icon: 'error',
                      })
                    } else {
                      // 注册接口
                      wx.request({
                        url: 'http://api_devs.wanxikeji.cn/api/register',
                        method: 'POST',
                        data: {
                          openid: restwo.data.data.openid,
                          nick_name: 'jd_' + names,
                          icon: 'https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png'
                        },
                        success: res => {
                          // 如果用户已存在 则直接登录获取信息
                          if (res.data.msg === "用户已存在") {
                            // openid转换token
                            wx.request({
                              url: 'http://api_devs.wanxikeji.cn/api/refreshToken',
                              method: 'POST',
                              data: {
                                openid: restwo.data.data.openid
                              },
                              success: resthe => {
                                // console.log(resthe);
                                wx.setStorageSync('user', resthe.data.data)
                                // 取消加载事件
                                wx.hideLoading();
                                // wx.navigateBack({
                                //   delta: 1
                                // });
                                wx.showToast({
                                  title: '登录成功',
                                  icon: 'success',
                                  mask: true,
                                });
                                wx.switchTab({
                                  url: '../user/index',
                                })
                              }
                            })
                          } else {
                            console.log(res);
                            console.log("已给你注册");
                            wx.setStorageSync('user', res.data.data)
                            // wx.showToast({
                            //   title: '登录成功',
                            //   icon: 'success',
                            //   mask: true,
                            // });
                            // 取消加载事件
                            wx.hideLoading();
                            // wx.navigateBack({
                            //   delta: 1
                            // });
                            wx.switchTab({
                              url: '../user/index',
                            })

                          }
                        }
                      })

                    }
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
      })
    } else {
      // 提示
      wx.showToast({
        title: '请先阅读或勾选协议',
        icon: 'error'
      })
    }
  },

  // 生成随机十三位数
  generateMixed(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 35);
      res += this.str[id];
    }
    // console.log(res);
    return res;
  },

  //  阅读协议
  getprotocol(e) {
    let checked = !this.data.checked;
    this.setData({
      checked
    })
    // console.log(e);
    console.log(this.data.checked);
  },

  // 切换登录方式
  loginway() {
    let istrue = !this.data.istrue;
    this.setData({
      istrue
    })
  },



  // 点击调用wx.login接口获取登录凭证（code）
  // getcode(){
  //   wx.login({
  //     // success成功之后
  //     success (res) {
  //       // 打印获取的对象
  //       console.log(res.code);
  //       // 如果有code
  //       if (res.code) {
  //         // 直接发起网络请求
  //         wx.request({
  //           // 通过code换取openid
  //           // 在请求后面携带参数code
  //           url: 'http://api_devs.wanxikeji.cn/api/codeExchangeOpenid',
  //           // url:'http://api_devs.wanxikeji.cn/api/refreshToken',
  //           // method选择发送的请求方式
  //           method:"POST",
  //           data:{
  //             code:res.code,
  //           },
  //           // 成功之后打印获取到的对象
  //           success:restwo => {
  //             // 缓存openid 和 Key
  //             wx.setStorageSync('open', restwo.data.data);
  //             console.log(restwo);
  //             // 注册接口
  //             wx.request({
  //               url: 'http://api_devs.wanxikeji.cn/api/register',
  //               method:'POST',
  //               data:{
  //                 openid:restwo.data.data.openid,
  //                 nick_name:'fdsfs',
  //                 icon:'https://thirdwx.qlogo.cn/mmopen/vi_32/1pSuO8JYUGaSYo7QgOn4ZZdao7kcKQMRWicBGUX5ZjOOOZbhhEkXOYgAlCSL6icicBfkLO3520IASOribmOzVlLw4Q/132'
  //               },
  //               success:res => {
  //                 console.log(res);
  //                 // this.setData({
  //                 //   user:res.data.data
  //                 // })
  //               }
  //             })
  //           }
  //         })
  //       } else {
  //         console.log('登录失败！' + res.errMsg)
  //       }
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.generateMixed(13);
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