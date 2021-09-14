// pages/pay/index.js
import {
  request
} from "../../request/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    checkeda: true,
    checkedb: false,
    user: {},
    unpaid: {},
    pay: {},
    addresslist: [],
    shopping_car_ids: [],
    car_id:[],
    shopOrder: [],
    totalPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // console.log(options);
    if (options.shopping_car_id) {
      this.getCache();
      this.getAddressList();
      wx.removeStorageSync("shopOrder")
      let car_id = JSON.parse(options.shopping_car_id);
      this.setData({
        car_id
      })
      console.log(this.data.car_id);
      this.getshopping();
    }else{
    this.getCache();
    this.getAddressList();
    }
    // this.getshopping();
  },


  // 获取缓存
  getCache() {
    let user = wx.getStorageSync('user');
    this.setData({
      user,
    })
  },


  // 获取地址列表
  async getAddressList() {
    let res = await request({
      url: 'http://api_devs.wanxikeji.cn/api/userAddressList',
      method: "POST",
      data: {
        token: this.data.user.token,
      }
    })
    // console.log(res.data.data);
    let addresslist = res.data.data;
    let shopOrder = wx.getStorageSync('shopOrder');
    // 排序
    addresslist = addresslist.sort((a, b) => {
      return b.default-a.default
    });
    this.setData({
      addresslist,
      shopOrder
    })
    console.log(this.data.addresslist[0]);
    console.log(this.data.shopOrder);
    this.count(this.data.shopOrder);
  },


  // 计算价格
  count(cart) {
    if (cart.length!=0) {

      let shopping_car_ids = [];
      let totalPrice = 0;
      cart.forEach(v => {
        totalPrice += v.num * v.price;
        shopping_car_ids.push(v.shopping_car_id);
    })
    this.setData({
      totalPrice,
      shopping_car_ids
    })
    console.log(this.data.totalPrice);
    }
  },





  // 获取购物车列表
  async getshopping() {
    let res = await request({
      url: 'http://api_devs.wanxikeji.cn/api/shoppingCarList',
      method: "POST",
      data: {
        token: this.data.user.token,
      }
    })

    if (res.data.data.length != 0 && this.data.car_id.length != 0) {
      let cart = res.data.data.data;
      for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        console.log(element);
        if (element.shopping_car_id == this.data.car_id) {
          element.sku = JSON.parse(element.sku);
          element.good_name = JSON.parse(element.good_name);
          let shopOrder = []
          shopOrder.push(element);
          console.log(shopOrder);
          this.setData({
            shopOrder
          })

          }
        // console.log(element.shopping_car_id);
        // console.log(this.data.shopping_car_ids[i]);
        // for (let j = 0; j < this.data.shopping_car_ids.length; j++) {
        //   const jj = this.data.shopping_car_ids[j];
        //   console.log(jj);
        //   if (element.shopping_car_id == jj) {
        //     // console.log(this.data.shopping);
        //     console.log(element);
        //     let shopping = [];
        //     shopping = shopping.push(element);
        //     this.setData({
        //       shopping
        //     })
        //     console.log(this.data.shopping);
        //   }

        // }
      }
    }
    console.log(this.data.shopOrder);
    this.count(this.data.shopOrder)
  },




  // 获取订单
  async getpayment() {
    let user = wx.getStorageSync('user');
    let pay = wx.getStorageSync('pay');
    this.setData({
      user,
      pay
    })
    // console.log(this.data.user.token);
    let res = await request({
      url: 'http://api_devs.wanxikeji.cn/api/orderList',
      method: "POST",
      data: {
        token: this.data.user.token,
        status: 1
      },
    })
    // console.log(res);
    if (res.data.data.length !== 0) {
      console.log(res.data.data.data);
      let unpaid = res.data.data.data[0];
      for (let i = 0; i < unpaid.childern.length; i++) {
        const element = unpaid.childern[i];
        // console.log(element);
        element.sku = JSON.parse(element.sku)
        element.good_name = JSON.parse(element.good_name);
      }
      this.setData({
        unpaid
      })
      console.log(this.data.unpaid.childern);
    } else {
      wx.switchTab({
        url: '../cart/index',
      })
    }
  },


  // 支付
  async wxpay() {
    let token = this.data.user.token;
    let address_id = this.data.addresslist[0].address_id;
    let coupon_money = 0;
    let money = this.data.totalPrice;
    let shopping_car_ids = this.data.shopping_car_ids;
    console.log(shopping_car_ids);
    let res = await request({
      url: 'http://api_devs.wanxikeji.cn/api/generateOrder',
      method: "POST",
      data: {
        token: token,
        address_id: address_id,
        coupon_money: coupon_money,
        money: money,
        shopping_car_ids: shopping_car_ids
      },
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
            // console.log(res);
            this.data.shopping_car_ids.forEach(v=>{
              wx.request({
                url: 'http://api_devs.wanxikeji.cn/api/shoppingCarDelete',
                method:"POST",
                data:{
                  token:token,
                  shopping_car_id:v
                },
                success: res=>{
                  wx.switchTab({
                    url: '../user/index',
                  })
                }
              })
            })
          },
          fail:res=>{
            // console.log(res);
            this.data.shopping_car_ids.forEach(v=>{
              wx.request({
                url: 'http://api_devs.wanxikeji.cn/api/shoppingCarDelete',
                method:"POST",
                data:{
                  token:token,
                  shopping_car_id:v
                },
                success: res=>{
                  wx.switchTab({
                    url: '../user/index',
                  })
                }
              })
            })
          },
        })

      }
  },

  // 不可用信息隐藏显示
  clishow() {
    let show = !this.data.show;
    this.setData({
      show
    })
  },

  // 微信支付按钮出现
  checkaff() {
    if (this.data.checkeda == false) {
      let checkeda = !this.data.checkeda;
      this.setData({
        checkeda,
        checkedb: false
      })
    }
  },
  // 找人代付按钮出现
  checkbff() {
    if (this.data.checkedb == false) {
      let checkedb = !this.data.checkedb;
      this.setData({
        checkedb,
        checkeda: false
      })
    }
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
    this.getAddressList();
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