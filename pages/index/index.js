/*
 * @author: Lan_
 * @create: 2021-08-16 10:57 AM
 * @license: MIT
 * @lastAuthor: Lan_
 * @lastEditTime: 2021-08-16 14:40 PM
 * @desc:
 */
//Page Object
import {
  request
} from "../../request/request.js";
Page({
  data: {
    leftMenu:true,
    MenuSort:3,
    swiperList: [],
    catesList:[],
    floorList:[],
    navData:["食品饮料","大家电","酒水","首页","手机","奢侈品","爱车","玩具乐器","图书","家具厨具","男鞋","数码","内衣配饰","女装","美妆","生鲜","家装","宠物","腕表珠宝"],
    navData2:["首页","食品饮料","大家电","酒水","手机","奢侈品","爱车","玩具乐器","图书","家具厨具","男鞋","数码","内衣配饰","女装","美妆","生鲜","家装","宠物","腕表珠宝"],
    picNavList:[
      {
        pic:"//m.360buyimg.com/mobilecms/s120x120_jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg.dpg",
        text:"京东超市"
      },
      {
        pic:"//m.360buyimg.com/mobilecms/s120x120_jfs/t1/178015/31/13828/6862/60ec0c04Ee2fd63ac/ccf74d805a059a44.png!q70.jpg.dpg",
        text:"数码电器"
      },
      {
        pic:"//m.360buyimg.com/mobilecms/s120x120_jfs/t1/41867/2/15966/7116/60ec0e0dE9f50d596/758babcb4f911bf4.png!q70.jpg.dpg",
        text:"京东服饰"
      },
      {
        pic:"//m.360buyimg.com/mobilecms/s120x120_jfs/t1/177902/16/13776/5658/60ec0e71E801087f2/a0d5a68bf1461e6d.png!q70.jpg.dpg",
        text:"京东生鲜"
      },
      {
        pic:"//m.360buyimg.com/mobilecms/s120x120_jfs/t1/196472/7/12807/7127/60ec0ea3Efe11835b/37c65625d94cae75.png!q70.jpg.dpg",
        text:"京东到家"
      },
      {
        pic:"//m.360buyimg.com/mobilecms/s120x120_jfs/t1/185733/21/13527/6648/60ec0f31E0fea3e0a/d86d463521140bb6.png!q70.jpg.dpg",
        text:"充值缴费"
      },
      {
        pic:"//m.360buyimg.com/mobilecms/s120x120_jfs/t1/36069/14/16068/6465/60ec0f67E155f9488/595ff3e606a53f02.png!q70.jpg.dpg",
        text:"9.9元拼"
      },
      {
        pic:"//m.360buyimg.com/mobilecms/s120x120_jfs/t1/186080/16/13681/8175/60ec0fcdE032af6cf/c5acd2f8454c40e1.png!q70.jpg.dpg",
        text:"领券"
      },
      {
        pic:"//m.360buyimg.com/mobilecms/s120x120_jfs/t1/196711/35/12751/6996/60ec1000E21b5bab4/38077313cb9eac4b.png!q70.jpg.dpg",
        text:"领津贴"
      },
      {
        pic:"//m.360buyimg.com/mobilecms/s120x120_jfs/t1/37709/6/15279/6118/60ec1046E4b5592c6/a7d6b66354efb141.png!q70.jpg.dpg",
        text:"PLUS会员"
      },

    ],
    secKill:[
      {
        pic:"/icon/01.png",
        price:"100",
        delPrice:999,
      },
      {
        pic:"//img11.360buyimg.com/n7/s150x150_jfs/t1/189972/24/18002/127962/6115ce7fEf095c40d/e40715c3900495de.jpg.dpg",
        price:"1200",
        delPrice:1999,
      },
      {
        pic:"/icon/07.png",
        price:"200",
        delPrice:299,
      },
      {
        pic:"/icon/03.png",
        price:"224",
        delPrice:399,
      },
      {
        pic:"/icon/04.png",
        price:"11110",
        delPrice:11999,
      },
      {
        pic:"/icon/05.png",
        price:"999",
        delPrice:1099,
      },
      {
        pic:"/icon/06.png",
        price:"776",
        delPrice:999,
      },
      {
        pic:"/icon/07.png",
        price:"239",
        delPrice:499,
      },
    ],
    recommentList:[
      {
        img:"//img13.360buyimg.com/mobilecms/s372x372_jfs/t1/180043/29/19622/92980/611b3690E1f5314f9/010b19e816067833.jpg!q70.dpg.webp",
        info:"神仙水 我的生命之光 我欲念之火 我的罪恶 我的灵魂",
        tag:"15天最低价",
        price:1120.00,
        comment:"999+"
      },
      {
        img:"//img10.360buyimg.com/mobilecms/s372x372_jfs/t1/166560/9/20734/139912/60815c83E9b42d646/d63ff6348cafafeb.jpg!q70.dpg.webp",
        info:"神仙水 我的生命之光 我欲念之火 我的罪恶 我的灵魂",
        tag:"",
        price:1120.00,
        comment:"999+"
      },
      {
        img:"//img10.360buyimg.com/mobilecms/s372x372_jfs/t1/161091/28/19054/378848/6079a5caE17c5e858/e6bf3fb5cdf6dc37.jpg!q70.dpg.webp",
        info:"神仙水 我的生命之光 我欲念之火 我的罪恶 我的灵魂",
        tag:"",
        price:1120.00,
        comment:"999+"
      },
      {
        img:"//img12.360buyimg.com/mobilecms/s372x372_jfs/t3169/108/88666437/86997/1667267d/57a3fabbNb066897d.jpg!q70.dpg.webp",
        info:"神仙水 我的生命之光 我欲念之火 我的罪恶 我的灵魂",
        tag:"",
        price:1120.00,
        comment:"999+"
      },
      {
        img:"//img10.360buyimg.com/mobilecms/s372x372_jfs/t1/141242/31/9201/202167/5f6c0837E41909a23/0e6396b3713538ea.jpg!q70.dpg.webp",
        info:"神仙水 我的生命之光 我欲念之火 我的罪恶 我的灵魂",
        tag:"15天最低价",
        price:1120.00,
        comment:"999+"
      },
    ],
    scrollLeft:133
  },
  //导航栏菜单显示与隐藏
  handleMenuPull(){
    if(this.data.leftMenu==true){
      this.setData({
        leftMenu:false
      })
    }else{
      this.setData({
        leftMenu:true
      })
    }
  },
  //点击菜单border样式改变
  handleMenuSort(e){
    this.setData({
      MenuSort:e.currentTarget.dataset.index
    })
  },
  // 页面开始加载 就会触发
  onLoad: function (option) {
    request({
      url:"http://api_devs.wanxikeji.cn/api/promotionGoodList"
    }).then(res=>{
      console.log(res);
    })

   this.getswiperList()
   this.getcatesList()
   this.getfloorList()
  },
  // 获取轮播图数据
  getswiperList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
   // 获取分类导航数据
  getcatesList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
    }).then(result => {
      this.setData({
        catesList: result.data.message
      })
    })
  },
  //点击导航栏
  handleNav(e){
    console.log(e.currentTarget.offsetLeft);
    this.setData({
      scrollLeft:e.currentTarget.offsetLeft
    })
  },
   // 获取楼层数据
  getfloorList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"
    }).then(result => {
      console.log(result.data.message[0].floor_title.image_src);
      this.setData({
        floorList: result.data.message
      })
    })
  }
});