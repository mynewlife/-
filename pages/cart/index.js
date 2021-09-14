/*
 * @author: Lan_
 * @create: 2021-08-16 11:13 AM
 * @license: MIT
 * @lastAuthor: Lan_
 * @lastEditTime: 2021-08-27 14:39 PM
 * @desc:
 */
import { request } from "../../request/request.js";
let animationShowHeight = 300;
import { regionData } from "../../components/select/city";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    animationData: "",
    user: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
    dis: true,
    addresss: [],
    shopping_car_ids: [],
    addresslist: [],
    result: [
      { id: 1, name: "中国银行" },
      { id: 3, name: "北京银行" },
      { id: 2, name: "河北银行" },
      { id: 10, name: "保定银行" },
      { id: 7, name: "涞水银行" },
    ],
    disPlay: false,
    city: {
      show: false,
      pageList: regionData,
      data: regionData,
      name: "city",
      value: "",
      selected: [],
      chinaed: [],
      index: 0,
      page: 0,
      quantity: 2,
      multipleChoice: false,
    },
    publicObj: {},
    default:{}
  },
  closeAddress() {
    this.setData({
      "city.show": false,
      IsBack: false,
      disPlay: false,
    });
  },
  // 点击输入框弹出地址选择框
  cityFocus() {
    this.setData({
      "city.show": true,
      IsBack: true,
      disPlay: true,
    });
  },
  //通过事件接收子组件传过来的参数
  city: function (event) {
    let list = [];
    let selected = event.detail;
    for (let i = 0; i < selected.length; i++) {
      if (i == selected.length - 1) {
        list += selected[i].select;
      } else {
        // 选择之后加一个-
        list += selected[i].select;
      }
    }
    let address = selected.map((v) => v.select);
    this.data.default=address.join("-");
    this.setData({
      "city.selected": selected,
      "city.value": list,
      default:this.data.default
    });
    this.hideModal()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.goLogin();
    // this.getToken();
    this.getshoppingCart();
    // this.getaddress();
    this.handleAdress();
    this.getAddressList();

    // this.defaultSort();
  },

  // 获取缓存中的地址列表
  handleAdress() {
    let addresss = wx.getStorageSync("address");
    this.setData({
      addresss,
    });
  },

  // 数组对象按对象属性排序
  defaultSort() {
    //   function sortId(a,b){
    //     return a.id-b.id
    //  }
    this.data.result.sort((a, b) => {
      return a.id - b.id;
    });
    console.log(this.data.result);
  },

  // 获取地址列表
  async getAddressList() {
    let res = await request({
      url: "http://api_devs.wanxikeji.cn/api/userAddressList",
      method: "POST",
      data: {
        token: this.data.user.token,
      },
    });
    // console.log(res.data.data);
    if(res.data.data.length!=0){

      let addresslist = res.data.data;
      // 排序
      addresslist = addresslist.sort((a, b) => {
        return b.default - a.default;
      });
      this.data.default=addresslist.filter(v=>{
        return v.default==1
      })[0].detailed
    this.setData({
      addresslist,
      default:this.data.default
    });
    console.log(this.data.addresslist[0]);
  }
  },

  // 点击设置默认地址
  async setDefault(e) {
    console.log(e.currentTarget.dataset);
    let address_id = e.currentTarget.dataset.id;
    let res = await request({
      url: "http://api_devs.wanxikeji.cn/api/userAddressDfault",
      method: "POST",
      data: {
        token: this.data.user.token,
        id: address_id,
      },
    });
    console.log(res);
    let showModalStatus = !this.data.showModalStatus;
    this.setData({
      showModalStatus,
    });
    this.getAddressList();
  },

  // 检测是否登录  如果没有登录就跳转至登录页面
  goLogin() {
    let user = wx.getStorageSync("user");
    if (!user) {
      setTimeout(function () {
        wx.reLaunch({
          url: "../login/index",
        });
      }, 1500);
    }
  },

  // 结算事件
  handlePay() {
    var that = this;
    let token = this.data.user.token;
    let address_id = this.data.addresslist[0].address_id;
    let coupon_money = 0;
    let money = this.data.totalPrice;
    let shopping_car_ids = this.data.shopping_car_ids;

    // console.log("222");
    // 判断收货地址
    const {addresslist,totalNum} =this.data;
    if (addresslist.length==0) {
      // showToast({title:"您还没有选择收货地址"});
      wx.showToast({
        title: '您还没有选择收货地址',
        // duration: 0,
        icon: "error",
      })
      // return;
    }else if (totalNum===0) {
      // 判断用户有没有选购商品
      wx.showToast({
        title: '您还有选购商品',
        // duration: 0,
        icon: "error",
      })
      // return;
    }else {
      // wx.setStorageSync('cart', data)
      let shopOrder = [];
      this.data.cart.forEach(c=>{
        if (c.checked) {
          shopOrder.push(c);
        }
      })
      wx.setStorageSync('shopOrder', shopOrder);
      // 页面跳转传参
      shopping_car_ids = JSON.stringify(shopping_car_ids);
      // //跳转页面
      // // 点击微信支付再生成所需的订单
      wx.navigateTo({
        url: '../pay/index?shopping_car_ids='+shopping_car_ids,
      })



      // console.log(this.data.shopping_car_ids);
      // 生成订单
      // wx.request({
      //   url: 'http://api_devs.wanxikeji.cn/api/generateOrder',
      //   method: "POST",
      //   data: {
      //     token: token,
      //     address_id:address_id,
      //     coupon_money:coupon_money,
      //     money:money,
      //     shopping_car_ids:shopping_car_ids
      //   },
      //   success: res => {
      //     // that.getshoppingCart()
      //     // 成功之后删除购物车
      //     console.log(res.data.data);
      //     // 将生成的支付订单放进缓存
      //     wx.setStorageSync('pay', res.data.data);

      //     // this.deletecom(this.data.cart);
      //     this.data.cart.forEach(v => {
      //       if (v.checked == true) {
      //         console.log('用户点击确定')
      //         wx.request({
      //           url: 'http://api_devs.wanxikeji.cn/api/shoppingCarDelete',
      //           method: "POST",
      //           data: {
      //             token: token,
      //             shopping_car_id: v.shopping_car_id
      //           },
      //           success: res => {
      //             wx.navigateTo({
      //               url: '../pay/index',
      //             })
      //             // that.getshoppingCart()
      //           }
      //         })
      //       }
      //     })
      //   }
      // })
    }

  },

  // 获取地址列表
  // getaddress() {
  //   let token = this.data.user.token;
  //   wx.request({
  //     url: 'http://api_devs.wanxikeji.cn/api/userAddressList',
  //     method: "POST",
  //     data: {
  //       token:token
  //     },
  //     success: res => {
  //       console.log(res);
  //     }
  //   })
  // },

  // checkAdult(age) {
  //   return age.checked == false;
  // },

  // 商品删除
  showdis() {
    let dis = !this.data.dis;
    console.log(dis);
    this.setData({
      dis,
    });
  },
  // 删除
  deletecom(e) {
    var that = this;
    // console.log(e);
    let cart = this.data.cart;
    let token = this.data.user.token;
    // console.log(cart);
    let all = cart.every((v) => {
      // console.log(v.checked);
      return v.checked == false;
    });
    // }
    // console.log(all);
    if (all) {
      wx.showToast({
        title: "选择删除的商品",
        icon: "error",
      });
    } else {
      // console.log(cart.checked);
      wx.showModal({
        // title: '提示',
        content: "确认将已选中的商品删除吗？",
        success(res) {
          if (res.confirm) {
            cart.forEach((v) => {
              if (v.checked == true) {
                console.log("用户点击确定");
                wx.request({
                  url: "http://api_devs.wanxikeji.cn/api/shoppingCarDelete",
                  method: "POST",
                  data: {
                    token: token,
                    shopping_car_id: v.shopping_car_id,
                  },
                  success: (res) => {
                    that.getshoppingCart();
                  },
                });
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            });
          }
        },
      });
    }
  },

  // 商品的选中
  handeItemChange(e) {
    console.log(e.currentTarget.dataset);
    // 1 获取被修改的商品的car_id
    const car_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组
    let { cart } = this.data;
    // 3 找到被修改的商品对象
    let index = cart.findIndex((v) => v.shopping_car_id == car_id);
    // 4 选中状态取反
    cart[index].checked = !cart[index].checked;
    // 5 6 把 购物车数据重新设置回data中和缓存中
    this.setCart(cart);
  },

  // 设置购物车状态同时  重新计算 底部工具栏的数据  全选  总价格  购买的数量
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    let shopping_car_ids = [];
    cart.forEach((v) => {
      if (v.checked) {
        totalPrice += v.num * v.price;
        totalNum += v.num;
        shopping_car_ids.push(v.shopping_car_id);
      } else {
        allChecked = false;
      }
    });
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum,
      shopping_car_ids,
    });
    // wx.setStorageSync('cart', cart);
  },

  // 商品全选功能
  handleItemAllCheck() {
    // 1 获取data中的数据
    let { cart, allChecked } = this.data;
    // 2 修改值
    allChecked = !allChecked;
    // 3 循环修改cart数组 中的商品选中状态
    cart.forEach((v) => (v.checked = allChecked));
    // 4 把修改后的值 填充回data或者缓存中
    this.setCart(cart);
  },

  // 商品数量的编辑功能
  handleItemNumEdit(e) {
    // 1 获取传递过来的参数
    // console.log(e);
    const { opreation, id } = e.currentTarget.dataset;
    // console.log(operation,id);
    // 2 获取购物车数组
    let { cart } = this.data;
    // 3 找到需要修改的商品索引
    const index = cart.findIndex((v) => v.shopping_car_id === id);
    // 4 进行修改数量
    cart[index].num += opreation;
    // console.log(cart[index]);
    // 修改购物车请求
    this.amendcart(cart[index]);
    // wx.request({
    //   url: 'http://api_devs.wanxikeji.cn/api/shoppingCarAddModify',
    // })
    // 5 设置回缓存和data中
    this.setCart(cart);
  },

  // 修改购物车
  async amendcart(cart) {
    let token = this.data.user.token;
    let res = await request({
      url: "http://api_devs.wanxikeji.cn/api/shoppingCarAddModify",
      method: "POST",
      data: {
        token,
        good_id: cart.good_id,
        num: cart.num,
        price: cart.price,
        money: cart.money,
        sku: cart.sku,
        shopping_car_id: cart.shopping_car_id,
      },
    });
    console.log(res);
  },

  // 获取购物车列表
  async getshoppingCart() {
    let user = wx.getStorageSync("user");
    this.setData({
      user,
    });
    // console.log(this.data.user.token);
    let res = await request({
      url: "http://api_devs.wanxikeji.cn/api/shoppingCarList",
      method: "POST",
      data: {
        token: this.data.user.token,
      },
    });
    // console.log(res.data.data.data);
    let cart = res.data.data.data || [];

    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      (element.checked = false),
      // console.log(element);
      element.sku = JSON.parse(element.sku);
      element.good_name = JSON.parse(element.good_name);
    }
    // 计算全选
    // every  数组方法  会遍历 会接收一个回调函数 那么 每一个回调函数都返回true 那么 every方法的返回值为true
    // 只要 有一个回调函数返回了false 那么不在循环执行，直接返回false
    // 空数组 调用 every，返回值就是true
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    this.setCart(cart);
    console.log(this.data.cart);
  },

  // 给最外层盒子加点击事件
  handledownp(e) {
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
      delay: 0,
    });
    this.animation = animation;
    animation.translateY(animationShowHeight).step();
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
    });
    setTimeout(
      function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export(),
        });
      }.bind(this),
      0
    );
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0,
    });
    this.animation = animation;
    animation.translateY(animationShowHeight).step();
    this.setData({
      animationData: animation.export(),
    });
    setTimeout(
      function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export(),
          showModalStatus: false,
        });
      }.bind(this),
      0
    );
  },
  cancel(e) {
    this.setData({
      showModalStatus: !this.data.showModalStatus,
    });
  },
  onShow() {
    wx.getSystemInfo({
      success: (res) => {
        animationShowHeight = res.windowHeight;
      },
    });
    this.goLogin();
    this.getshoppingCart();
    this.getAddressList();
  },
});

// 通过code换取openid(小程序用)

// 注册(账号密码或小程序)
// })
