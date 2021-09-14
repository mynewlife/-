// pages/order/index.js
import {
  request
} from "../../request/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [{
        text: "全部"
      },
      {
        text: "待付款"
      },
      {
        text: "已完成"
      },
      {
        text: "待收货"
      },
    ],
    num: 0,
    user: {},
    orderList: [],
    isTrue:true,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getorderList();
  },


  // 点击事件给nav列表加样式
  bandle(e) {
    let num = e.currentTarget.dataset.index;
    this.setData({
      num
    })
    this.getorderList();
  },


  // 获取订单列表
  async getorderList() {
    let user = wx.getStorageSync('user');
    let orderList = [];
    this.setData({
      user,
      orderList
    })
    let res = await request({
      url: 'http://api_devs.wanxikeji.cn/api/orderList',
      method: "POST",
      data: {
        token: this.data.user.token,
        status: this.data.num,
      }
    })
    // console.log(res.data.data);
    if (res.data.data.length != 0) {
      // 现在时间
      let now = Date.parse(new Date());
      // console.log(now);
      // console.log(res.data.data.data);
      let orderList = res.data.data.data;
      for (var i = 0; i < orderList.length; i++) {
        const element = orderList[i];
        // console.log(element.delivery_time);
        // 将获取到的时间加15分钟
        element.time = element.delivery_time *1000+900000;
        // 如果现在时间大于增加之后的时间就证明在15分钟之内
        // 不然则反之
        if (element.time<now) {
          element.state = "已完成"
        }else {
          element.state = "等待付款"
        }
        // 生成剩余时间 再加进数组对象中
        let minute, second,timeRemaining;
        timeRemaining= element.time-now;
        second = Math.floor(timeRemaining / 1000 % 60);
        minute = Math.floor(timeRemaining / 1000 / 60 % 60);
        // console.log(minute + '分' + second + '秒');
        element.time= minute + '分' + second + '秒';
        if (element.childern) {
          for (let j = 0; j < element.childern.length; j++) {
            const ele = element.childern[j];
            // console.log(ele.good_name);
            ele.sku = JSON.parse(ele.sku);
            ele.good_name = JSON.parse(ele.good_name)
          }
        }
      }

      this.setData({
        orderList
      })
      console.log(this.data.orderList);
    }
  },


  // 再次购买
  async buyAgain(e) {
    console.log(e.currentTarget.dataset);
    let order = e.currentTarget.dataset.id;
    let res = await request({
      url: 'http://api_devs.wanxikeji.cn/api/rePayOrder',
      method: "POST",
      data: {
        token: this.data.user.token,
        order_id: order
      }
    })
    if (res.data.data.length!=0) {
      let prepay = 'prepay_id='+res.data.data.prepay_id
      console.log(res.data.data);
      wx.requestPayment({
        appid:res.data.data.appid,
        nonceStr: res.data.data.nonce_str,
        // nonceStr:this.data.pay.sign,
        package: prepay,
        timeStamp: res.data.data.timeStamp,
        signType: "MD5",
        paySign: res.data.data.paySign,
        success:res=>{
          // 订单生产之后不管成功还是失败都要清除购物车中的东西
          console.log(res);
         // 支付成功之后再重新获取刷新页面  
          this.getorderList();
        },
        fail:res=>{
          console.log(res);
          // 支付失败之后再重新获取刷新页面  
          this.getorderList();
        },
      })
      
    }
    console.log(res);
    // console.log(order);
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
    this.getorderList();
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