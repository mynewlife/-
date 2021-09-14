// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    instrumentData:[
      {
        img:"/icon/one.png",
        text:"客服服务"
      },
      {
        img:"/icon/two.png",
        text:"寄件服务"
      },
      {
        img:"/icon/three.png",
        text:"我的预约"
      },
      {
        img:"/icon/four.png",
        text:"闲置换钱"
      },
      {
        img:"/icon/five.png",
        text:"我的爱车"
      },
      {
        img:"/icon/six.png",
        text:"高价回收"
      },
      {
        img:"/icon/seven.png",
        text:"我的礼物"
      },
      {
        img:"/icon/eight.png",
        text:"闪电退款S+"
      },
      {
        img:"/icon/nine.png",
        text:"特价机票"
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
    shopingList:[
      {
        title:"商品收藏",
        num:2
      },
      {
        title:"店铺收藏",
        num:1
      },
      {
        title:"我的足迹",
        num:4
      }
    ],
    myAssetList:[
      {
        title:"优惠券",
        num:4,
      },
      {
        title:"账号余额",
        num:10000,
      },
      {
        title:"京豆",
        num:153,
      },
      {
        title:"红包",
        num:1,
      },
    ],
    isLogin:false,
    nickName:"请登录/注册您的账号",
    icon:"//img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cur = new Date();
    // console.log(cur.getMonth()+1);
    // console.log(navigator.userAgent.toLowerCase.indexOf('micromessenger'));
    let obj ={
      get:function () {
        return 1;
      }
    }
    let g=obj.get
    g.apply({},[1,2,3])
    g.call({},1,2,3)

  },
  test(left,right){
    console.log(left,right);
  },
  //设置按钮的跳转
  handleSetting(){
    wx.navigateTo({
      url: '/pages/setting/index',
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
  //跳转登录页面
  handleLogin(){
    let user = wx.getStorageSync('user');
    if(!user.icon){
      wx.navigateTo({
        url: '/pages/login/index',
        success: (result) => {

        },
        fail: () => {},
        complete: () => {}
      });
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  //跳转全部订单页面
  handleOrder(){
    wx.navigateTo({
      url: '/pages/order/index',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },
  onShow: function () {
    let user = wx.getStorageSync("user");
    let nickName = user.nick_name;
    let icon = user.icon;
    if(nickName){
      this.setData({
        isLogin:true,
        nickName,
        icon
      })
      console.log(icon);
    }else{
      this.setData({
        isLogin:false,
        nickName:"请登录/注册您的账号",
        icon:"//img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png"
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