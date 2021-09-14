/*
 * @author: Lan_
 * @create: 2021-08-20 10:51 AM
 * @license: MIT
 * @lastAuthor: Lan_
 * @lastEditTime: 2021-08-30 16:06 PM
 * @desc:
 */
import { regionData } from "../../components/select/city";
const App = getApp();
// import { regionData } from "../../components/select/select";
import { request } from "../../request/request";
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true,
      },
      {
        id: 1,
        value: "销量",
        isActive: false,
      },
      {
        id: 2,
        value: "价格",
        isActive: false,
      },
      {
        id: 3,
        value: "小时达",
        isActive: false,
      },
    ],
    downList: [
      {
        id: 0,
        value: "综合",
        isActive: true,
      },
      {
        id: 1,
        value: "最新上架",
        isActive: false,
      },
      {
        id: 2,
        value: "评价最多",
        isActive: false,
      },
    ],
    tags: [
      {
        value: "京东物流",
        isActive: false,
      },
      {
        value: "有货优先",
        isActive: false,
      },
      {
        value: "货到付款",
        isActive: false,
      },
      {
        value: "211限时达",
        isActive: false,
      },
      {
        value: "京东国际",
        isActive: false,
      },
      {
        value: "促销商品",
        isActive: false,
      },
      {
        value: "PLUS专享",
        isActive: false,
      },
      {
        value: "拍拍二手",
        isActive: false,
      },
      {
        value: "新品",
        isActive: false,
      },
    ],
    brand: [
      {
        value: "Apple",
        isActive: false,
      },
      {
        value: "华为",
        isActive: false,
      },
      {
        value: "绿联",
        isActive: false,
      },
      {
        value: "小米",
        isActive: false,
      },
      {
        value: "欧普",
        isActive: false,
      },
      {
        value: "三星",
        isActive: false,
      },
      {
        value: "锤子",
        isActive: false,
      },
      {
        value: "倍思",
        isActive: false,
      },
      {
        value: "魅族",
        isActive: false,
      },
    ],
    addressIndex: 0,
    prices: [
      {
        min: 138,
        max: 309,
        scale: 15,
      },
      {
        min: 309,
        max: 428,
        scale: 25,
      },
      {
        min: 428,
        max: 2000,
        scale: 17,
      },
    ],
    search: [],
    publicObj: {},
    navHeight: 0,
    goodslist: [],
    flag: false,
    show: false,
    show2: false,
    show3: false,
    min: "",
    max: "",
    goodslistup: [],
    goodslistdown: [],
    priceFlag: true,
    TheOne: 0,
    tagsearch: [],
    address: false,
    dis: false,
    goodsNum: 0,
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
    filter: [],
  },
  attached: function () {
    this.setData({
      navHeight: App.globalData.navHeight,
    });
  },
  totalPages: 1,
  QueryParams: {
    page: "1",
    size: "10",
  },
  // 点击输入框弹出地址选择框
  cityFocus() {
    this.setData({
      "city.show": true,
      IsBack: true,
      dis: true,
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
    console.log(address.join("-"));
    let addressArr = [{ detailed: address.join("-") }];
    wx.setStorageSync("address", [
      ...wx.getStorageSync("address"),
      ...addressArr,
    ]);
    this.addressData = wx.getStorageSync("address");
    this.data.addressIndex = this.addressData.length - 1;
    this.setData({
      "city.selected": selected,
      "city.value": list,
      addressData: this.addressData,
      addressIndex: this.data.addressIndex,
      dis: !this.data.dis,
    });
  },
  // 判断缓存是否存在地址
  showAds() {
    let isaddress = wx.getStorageSync("add") || [];
    this.setData({
      isaddress,
    });
  },
  // 触底加载
  onReachBottom() {
    if (this.QueryParams.page >= this.totalPages) {
      wx.showToast({
        title: "我也是有底线的",
      });
    } else {
      this.QueryParams.page++;
      this.goodslist();
    }
  },

  // tag点击样式改变
  tagChange(e) {
    let Brand = this.data.brand;

    let filter = this.data.filter;
    // if (search.length > 5) {
    //   wx.showToast({
    //     title: "最多可选6个",
    //     icon: false,
    //   });
    //   this.setData({
    //     brand: this.data.brand,
    //   });
    // } else {
      let index = e.currentTarget.dataset.index;
    try {
      if (this.data.tagsearch.length > 5&&this.data.brand[index].isActive==false) {
        console.log(index);
        console.log(this.data.brand[index].isActive);
        wx.showToast({
          title: "最多可选6个",
          icon: "none",
        });
        this.setData({
          brand: this.data.brand,
        });
      } else {
        function _this() {
          if (e.currentTarget.dataset.tag === 0) {
            let index = 0;
            return index;
          } else {
            let index = e.currentTarget.dataset.tag || e.detail.index;
            return index;
          }
        }
        let index = _this();
        this.data.tags[index].isActive = !this.data.tags[index].isActive;
        this.setData({
          tags: this.data.tags,
          brand: this.data.brand,
        });
      }
    } catch (error) {
      if (this.data.tagsearch.length > 5&&this.data.brand[index].isActive==false) {
        wx.showToast({
          title: "最多可选6个",
          icon: "none",
        });
        this.setData({
          brand: this.data.brand,
        });
      } else {
        let index = e.currentTarget.dataset.index;
        this.data.brand[index].isActive = !this.data.brand[index].isActive;
        this.setData({
          brand: this.data.brand,
        });
      }
    }
    let search = [];
    for (let i = 0; i < Brand.length; i++) {
      if (Brand[i].isActive) {
        search.push(Brand[i].value);
      }
    }
    filter = filter.filter((v) => {
      for (let i = 0; i < search.length; i++) {
        if (v.good_name.includes(search[i])) {
          return v;
        }
      }
      return;
    });
    // }
    console.log(search);
    this.setData({
      goodsNum: filter.length,
      filter: filter,
      Brand,
      tagsearch: search,
    });
  },
  handlePrice(e) {
    try {
      let index = e.currentTarget.dataset.index;
      this.data.min = this.data.prices[index].min;
      this.data.max = this.data.prices[index].max;
    } catch (error) {}
    if (this.data.max == "") {
      this.data.max = Infinity;
    }
    // if (this.data.min == "") {
    //   this.data.min = 0;
    // }
    console.log(this.data.min);

    // }
    // let filter = this.data.goodslist.filter((v) => {
    //   return Number(v.price) < this.data.max && Number(v.price) > this.data.min;
    // });
    this.gofilter();
    this.setData({
      max: this.data.max,
      min: this.data.min,
      goodsNum: this.data.filter.length,
      filter: this.data.filter,
    });
  },
  go() {},
  // 价格排序
  changeTheOne(e) {
    let index = e.currentTarget.dataset.index;
    this.data.tabs[0].value = this.data.downList[index].value;
    this.data.TheOne = index;
    this.setData({
      TheOne: this.data.TheOne,
      tabs: this.data.tabs,
    });
  },
  // 重置
  reset() {
    let msg = this.data;
    msg.min = "";
    msg.max = "";
    msg.tagsearch=[]
    msg.tags.map((v) => {
      v.isActive = false;
    });
    msg.brand.map((v) => {
      v.isActive = false;
    });
    let list = wx.getStorageSync("list");
    this.setData({
      max: this.data.max,
      min: this.data.min,
      brand: this.data.brand,
      tags: this.data.tags,
      goodslist: list,
      filter: list,
      goodsNum: list.length,
      tagsearch:this.data.tagsearch
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  goLogin() {
    let user = wx.getStorageSync("user");
    if (!user) {
      setTimeout(function () {
        wx.reLaunch({
          url: "../login/index",
        });
      }, 500);
    }
  },
  address() {
    this.goLogin();
    if (this.data.dis) {
      this.data.dis = false;
      this.setData({
        dis: this.data.dis,
      });
    } else {
      this.setData({
        address: !this.data.address,
      });
    }
  },
  addressData: [],
  onLoad: function (options) {
    console.log(450 / 20);
    this.addressData = wx.getStorageSync("address");
    this.data.search.push(options.search1, options.search2);
    this.QueryParams.good_type = options.good_type_id;
    this.goodslist();
    this.setData({
      navHeight: App.globalData.navHeight,
      search: this.data.search,
      addressData: this.addressData,
      goodsNum: this.data.goodslist.length,
      filter: this.data.goodslist,
    });
  },
  // 地址栏改变事件
  handleAddress(e) {
    let indexs = e.currentTarget.dataset.index;
    this.setData({
      addressIndex: indexs,
    });
  },
  // 获取商品信息
  async goodslist() {
    let res = await request({
      url: "http://api_devs.wanxikeji.cn/api/goodList",
      data: this.QueryParams,
    });
    let message = res.data.data.data;
    message.map((v) => {
      try {
        v.good_name = JSON.parse(v.good_name).name;
        v.img = JSON.parse(v.img)[0];
      } catch (error) {}
    });
    let total = res.data.data.count;
    this.totalPages = Math.ceil(total / this.QueryParams.size);
    if (this.data.goodslist.length > 0) {
      this.setData({
        goodslist: [...this.data.goodslist, ...res.data.data.data],
      });
    } else {
      this.setData({
        goodslist: res.data.data.data,
      });
    }
    wx.setStorageSync("list", this.data.goodslist);
    wx.stopPullDownRefresh();
    this.setData({
      goodsNum: message.length,
    });
  },
  // 导航切换
  handlechange(e) {
    let index = e.detail.index.index;
    let { tabs } = this.data;
    this.data.goodslistup = this.data.goodslist;
    if (index == 2) {
      this.sort();
    }
    tabs.forEach((v, i) =>
      i == index ? (v.isActive = true) : (v.isActive = false)
    );
    console.log(this.data.goodslistup);
    this.setData({
      tabs,
      goodslistup: this.data.goodslistup,
      priceFlag: !this.data.priceFlag,
    });
  },
  sort() {
    if (this.data.priceFlag) {
      this.data.goodslistup.sort((a, b) => {
        return a.price - b.price;
      });
    } else {
      this.data.goodslistup.sort((a, b) => {
        return b.price - a.price;
      });
    }
  },
  sureTo() {
    this.gofilter();
    this.sort();
    this.setData({
      goodslist: this.data.filter,
      goodslistup: this.data.filter,
    });
    this.close();
  },
  gofilter() {
    this.data.goodslist = wx.getStorageSync("list");
    if (this.data.max == "") {
      this.data.max = Infinity;
    }
    if (this.data.min == "") {
      this.data.min = 0;
    }
    let Brand = this.data.brand;
    let search = [];
    for (let i = 0; i < Brand.length; i++) {
      if (Brand[i].isActive) {
        search.push(Brand[i].value);
      }
    }
    let filter = this.data.goodslist.filter((v) => {
      return Number(v.price) < this.data.max && Number(v.price) > this.data.min;
    });
    if (search.length != 0) {
      filter = filter.filter((v) => {
        for (let i = 0; i < search.length; i++) {
          if (v.good_name.includes(search[i])) {
            return v;
          }
        }
        return;
      });
    }
    this.setData({
      filter: filter,
    });
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      goodslist: [],
    });
    this.QueryParams.pagenum = 1;
    this.goodslist();
  },
  // 改变排列方式
  changelist(e) {
    this.setData({
      flag: !this.data.flag,
    });
  },
  // 点击遮罩关闭选择框
  close(e) {
    try {
      if (e.type == "switch") {
        this.setData({
          show: !this.data.show,
          show2: !this.data.show,
        });
      } else if (e.type == "downList") {
        this.setData({
          show: !this.data.show,
          show3: !this.data.show,
        });
      } else {
        this.data.address = false;
        this.data.tabs.map((v) => {
          v.isActive = false;
        });
        this.data.tabs[0].isActive = true;
        console.log(this.data.tabs[0].isActive);
        this.setData({
          address: this.data.address,
          show: !this.data.show,
          show2: !this.data.show,
          show3: !this.data.show,
          tabs: this.data.tabs,
        });
      }
    } catch (error) {
      this.setData({
        show: !this.data.show,
        show2: !this.data.show,
        show3: !this.data.show,
      });
    }
  },
});
