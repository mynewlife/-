/*
 * @author: Lan_
 * @create: 2021-08-16 11:13 AM
 * @license: MIT
 * @lastAuthor: Lan_
 * @lastEditTime: 2021-08-20 08:41 AM
 * @desc:
 */
// pages/goods_detail/index.js
import { request } from "../../request/request";
let animationShowHeight = 300;

Page({
  data: {
    goodsDetail: {},
    goodsNum: 1,
    goodList: [],
    currentSwiper: 0,
    likeNumber: 0,
    showModalStatus: false,
    animationData: "",
    showCan: 0,
    checkde:[],
    shopCar:[],
    theSku:[],
    isAdd:false,
    isZhe:false,
    downp: [
      {
        id: 0,
        value: "首页",
        path: "/pages/index/index",
        icon: "icon-gouwudai1",
      },
      {
        id: 1,
        value: "搜索",
        path: "/pages/search/index",
        icon: "icon-sousuoxuanzhong",
      },
      {
        id: 2,
        value: "购物车",
        path: "/pages/cart/index",
        icon: "icon-gouwuche",
      },
      {
        id: 3,
        value: "个人中心",
        path: "/pages/user/index",
        icon: "icon-gerenzhongxin-xuanzhongxin",
      },
      {
        id: 4,
        value: "我的收藏",
        path: "/pages/index/index",
        icon: "icon-shoucang",
      },
      {
        id: 5,
        value: "我的足迹",
        path: "/pages/index/index",
        icon: "icon-zuji",
      },
      {
        id: 6,
        value: "用户反馈",
        path: "/pages/feedback/index",
        icon: "icon-yonghufankui",
      },]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdetailData(options.goods_id);
    this.getGoodList();
    this.getshoppingCart();
  },
  async getdetailData(e) {
    let res = await request({
      url: "http://api_devs.wanxikeji.cn/api/goodInfo",
      data: { good_id: e },
    });
    try {
      //在这里运行代码
      res.data.data.good_name = JSON.parse(res.data.data.good_name);
    } catch (err) {
      //在这里处理错误
      res.data.data.good_name;
    }
    try {
      res.data.data.img = JSON.parse(res.data.data.img);
    } catch (err) {
      if(typeof res.data.data.img == "string"){
        if(res.data.data.img.includes(',')){
          res.data.data.img=res.data.data.img.split(',')
        }else{
          let img =[];
          img.push(res.data.data.img)
          res.data.data.img=img
        }
      }
    }
    res.data.data.info.map((itm) => {
      try {
        itm.colour = JSON.parse(JSON.parse(itm.colour));
      } catch (err) {
        itm.colour;
      }
      try {
        itm.edition = JSON.parse(JSON.parse(itm.edition));
      } catch (err) {
        itm.edition;
      }
      try {
        itm.imgs = JSON.parse(itm.imgs);
        if(typeof itm.imgs =='string'){
          itm.imgs=itm.imgs.split(',')
        }
      } catch (err) {
        itm.imgs
      }
      try {
        itm.info = JSON.parse(itm.info);
      } catch (err) {
        itm.info;
      }
       itm.edition.specList.map((i)=>{
        
        i.list = i.list.map((j)=>{
          let a =j;
          return  j={
              val:a,
              check:false
            }
        })
      })
    });
    let that = res.data.data;
    this.setData({
      goodsDetail: that,
    });
  },
  async getGoodList() {
    let res = await request({
      url: "http://api_devs.wanxikeji.cn/api/goodList",
      data: { is_new: 1 },
    });
    res.data.data.data.map((item) => {
      try {
        item.good_name = JSON.parse(item.good_name);
      } catch (err) {
        if(typeof item.good_name == "string"){
          let name ={}
          name.name = item.good_name
          item.good_name = name
        }
      }
      try {
        item.img = JSON.parse(item.img);
        if(typeof item.img == "string"){
          if(item.img.includes(',')){
            item.img=item.img.split(',')
          }else{
            let img =[];
            img.push(item.img)
            item.img=img
          }
        }
      } catch (err) {
        if(typeof item.img == "string"){
          if(item.img.includes(',')){
            item.img=item.img.split(',')
          }else{
            let img =[];
            img.push(item.img)
            item.img=img
          }
        }
      }
    });
    let that = this.group(res.data.data.data, 6);
    this.setData({
      goodList: that,
    });
  },
  // 获取购物车列表
  async getshoppingCart() {
    let user = wx.getStorageSync('user');
    this.setData({
      user
    })
    let res = await request({
      url: 'http://api_devs.wanxikeji.cn/api/shoppingCarList',
      method: "POST",
      data: {
        token: this.data.user.token,
      }
    })
    this.setData({
      shopCar:res.data.data.data
    })
  },
  goLogin() {
    let user = wx.getStorageSync('user');
    if (!user) {
      setTimeout(function () {
        wx.reLaunch({
          url: '../login/index',
        })
      }, 1500)
    }
  },
  /**
   * 添加购物车
   */
  async handleCarAdd() {
   this.goLogin()
    let checkeds = true;
    let that =this.data.goodsDetail
    let flag =""
    that.info.map(value=>{
      for (const val of value.edition.specList) {
        let flags = val.list.some((item)=>{
          return item.check == true
        })
        if(!flags){
          flag = val.titel
          checkeds=flags
          break
        }
      }
    })
   if(!checkeds){
    wx.showToast({
      title: "请选择"+flag,
      image: "/img/cuowu.svg",
      duration: 1500,
      mask: true,
    });
   }else{
     let resCode = ""
    let shopCars = this.data.shopCar;
    let id = this.data.goodsDetail.good_id;
    let money = this.data.goodsNum * this.data.goodsDetail.price;
    let skus = this.data.theSku;
    if(!shopCars){
      let res = await request({
        url: "http://api_devs.wanxikeji.cn//api/shoppingCarAddModify",
        data: {
          token: this.data.user.token,
          good_id: id,
          num: this.data.goodsNum,
          price: this.data.goodsDetail.price,
          money: money,
          sku: skus,
        },
      });
      resCode =res.data.code
      this.getshoppingCart();
    }else{
      let isIn = false;
      for (const param of shopCars) {
        let skuss = param.sku
        if (param.good_id === id&&skuss==skus) {
          isIn = true;
          let nium = (param.num-0) +(this.data.goodsNum-0);
          let res = await request({
            url: "http://api_devs.wanxikeji.cn//api/shoppingCarAddModify",
            data: {
              token: this.data.user.token,
              good_id: id,
              num: nium,
              price: this.data.goodsDetail.price,
              money: money,
              sku: skus,
              shopping_car_id:param.shopping_car_id
            },
          });
          resCode =res.data.code
          this.getshoppingCart();
          break
        }
      }
      if(!isIn){
        let res = await request({
          url: "http://api_devs.wanxikeji.cn//api/shoppingCarAddModify",
          data: {
            token: this.data.user.token,
            good_id: id,
            num: this.data.goodsNum,
            price: this.data.goodsDetail.price,
            money: money,
            sku: skus,
          },
        });
        resCode =res.data.code
        this.getshoppingCart();
      }
    }
    if(resCode==2000){
      wx.showToast({
        title: "添加成功",
        icon: "success",
        duration: 1500,
        mask: true,
      });
      this.setData({
        isAdd:true
      })
      setTimeout(() => {
        this.setData({
          isAdd:false
        })
      }, 1500);
    }
   }
  },
  swiperChange(e) {
    this.setData({
      currentSwiper: e.detail.current,
    });
  },
  likeNumberChange(e) {
    this.setData({
      likeNumber: e.detail.current,
    });
  },
  group(array, _length) {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, (index += _length)));
    }
    return newArray;
  },
  openMantle(e) {
    let temp = e.currentTarget.dataset.fl;
    this.setData({
      showCan:temp
    })
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
  hideModal() {
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
  },
  chrckeds(e) {
    let a = e.currentTarget.dataset.index;
    let b = e.currentTarget.dataset.titel;
    let thats = this.data.goodsDetail;
    let check = this.data.checkde;
    thats.info.map((item) => {
      item.edition.specList.map((itm) => {
        if (itm.titel == b) {
          itm.list.map((i) => {
            return (i.check = false);
          });
          itm.list[a].check = true;
          if (check.length > 0) {
            let flage = false;
            check.forEach((element) => {
              if (element.titel == itm.titel) {
                flage = true;
                element.val = itm.list[a].val;
              }
            });
            if (!flage) {
              check.push({ titel: itm.titel, val: itm.list[a].val });
            }
          } else {
            check.push({ titel: itm.titel, val: itm.list[a].val });
          }
          let intersection = item.edition.skuList.filter((value) => {
            var state = true;
            for (const item of check) {
              let a = value.specs.includes(item.val);
              if (!a) {
                state = false;
                break;
              }
            }
            if (state) {
              return value;
            }
          });
          if (intersection.length == 1) {
            if (intersection[0].specs[intersection[0].specs.length-2] == 0) {
              check = [];
              wx.showToast({
                title: "缺货，请重新选择",
                image: "/img/cuowu.svg",
                duration: 1500,
                mask: true,
              });
              for (const iterator of item.edition.specList) {
                for (const itera of iterator.list) {
                  itera.check = false;
                }
              }
            } else {
              let prices = this.data.goodsDetail
              prices.price = intersection[0].specs[intersection[0].specs.length-1]
              this.setData({
                theSku:intersection,
                goodsDetail:prices
              })
            }
          }
        }
      });
    });
    this.setData({
      goodsDetail: thats,
      checkde: check,
    });
  },
  shuliang(e){
    let a=e.currentTarget.dataset.num-0
    let thats = this.data.goodsNum-0
    thats+=a
    if(thats<=0){
      thats=1
    }
    this.setData({
      goodsNum:thats
    })
  },
  menuIsHidden(){
    this.setData({
      isZhe:false
    })
  },
  openList(){
    this.setData({
      isZhe: !this.data.isZhe
    })
  },
  previousPage(){
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
    })
  },
  async buys(){
    this.goLogin()
    let checkeds = true;
    let that =this.data.goodsDetail
    let flag =""
    that.info.map(value=>{
      for (const val of value.edition.specList) {
        let flags = val.list.some((item)=>{
          return item.check == true
        })
        if(!flags){
          flag = val.titel
          checkeds=flags
          break
        }
      }
    })
    console.log(checkeds,132123)
    if(!checkeds){
      wx.showToast({
        title: "请选择"+flag,
        image: "/img/cuowu.svg",
        duration: 1500,
        mask: true,
      });
     }else{
       let resCode = ""
      let id = this.data.goodsDetail.good_id;
      let money = this.data.goodsNum * this.data.goodsDetail.price;
      let skus = this.data.theSku;
        skus.unshift(this.data.goodsNum)
        skus = JSON.stringify(skus)
      let res = await request({
        url: "http://api_devs.wanxikeji.cn//api/shoppingCarAddModify",
        data: {
          token: this.data.user.token,
          good_id: id,
          num: this.data.goodsNum,
          price: this.data.goodsDetail.price,
          money: money,
          sku: skus,
        },
      });
      resCode =res.data.code
      if(resCode==2000){
        let user = wx.getStorageSync('user');
        this.setData({
          user
        })
        let res = await request({
          url: 'http://api_devs.wanxikeji.cn/api/shoppingCarList',
          method: "POST",
          data: {
            token: this.data.user.token,
          }
        })
        let list =res.data.data.data.filter((val)=>{
         return val.sku==skus
        })
        console.log(id,skus,list,res.data.data.data)
        wx.redirectTo({
          url: '../pay/index?shopping_car_id=' + list[0].shopping_car_id
        })   
      }
     }
  }
});
