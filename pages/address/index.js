/*
 * @Author: your name
 * @Date: 2021-08-24 10:45:42
 * @LastEditTime: 2021-08-30 10:05:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \miniprogram-1\pages\address\index.js
 */
// pages/address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [
      {
        name:"小许",
        phone:"12345678901",
        detailed:"四川省南充市仪陇县"
      },
      {
        name:"小许",
        phone:"12345678901",
        detailed:"四川省南充市仪陇县"
      },
      {
        name:"小许",
        phone:"12345678901",
        detailed:"四川省南充市仪陇县"
      },

    ],
    token:"",
    delete:false,
    confirm:false,
    addressid:"",
    gun:"",
    flag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleScroll(e){
    // console.log(22);
    // if(!this.data.flag){
    //   this.setData({
    //     gun:e.currentTarget.dataset.addressid,
    //     flag:true
    //   })
    // }
  },
  //新增收货地址页面跳转
  handleAddAddr() {
    wx.navigateTo({
      url: '/pages/edit_address/index',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },
  //返回上一页
  navBack(){
    wx.navigateTo({
      url: '/pages/setting/index',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     //获取token
    //  let user = wx.getStorageSync("user");
    //  let token = user.token
    //  if(!token){
    //    wx.showToast({
    //      title: '请先登录',
    //      icon: 'none',
    //    });
    //    setTimeout(() => {
    //      wx.navigateBack({
    //        delta: 1
    //      });
    //    }, 1500);
    //  }else{
    //    this.setData({
    //      token
    //    })
    //  }
    this.getAddressData();
  },
  //请求地址列表数据
  getAddressData(){
    wx.request({
      url: 'http://api_devs.wanxikeji.cn/api/userAddressList',
      data: {
        token: this.data.token,
        groupid: 2
      },
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log(result.data.data);
        let newlist = [...result.data.data.reverse()];
        // console.log(newlist);
        let temp;
        for(let i=0;i<newlist.length;i++){
          for(let j=0;j<newlist.length-i-1;j++){
            if(newlist[i].default<newlist[j+1].default){
              temp = newlist[j]
              newlist[j]=newlist[j+1];
              newlist[j+1]=temp;
            }
          }
        }
        this.setData({
          addressList:newlist,
        })
        //将请求的数据放缓存里面
        wx.setStorageSync("address",result.data.data);
      },
      fail: () => { },
      complete: () => {}
    });
  },
  //编辑跳转页面
  handleEdit(e){
    let index = e.currentTarget.dataset.index;
    let obj = this.data.addressList[index]
    // console.log(obj);
    obj = JSON.stringify(obj)
    wx.navigateTo({
      // url: '/pages/edit_address/index',
      url: '/pages/edit_address/index?obj='+obj,
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },
  //设置默认点击事件
  setDefault(e){
    console.log(e.target.dataset.addressid);
    var reqTask = wx.request({
      url: 'http://api_devs.wanxikeji.cn/api/userAddressDfault',
      data: {
        token: this.data.token,
        id:e.target.dataset.addressid,
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log(result);
        this.getAddressData();
        wx.showToast({
          title: '设置成功',
        });

      },
      fail: () => {},
      complete: () => {}
    });

  },
  //删除函数
  deleteItem(e){
    this.setData({
      delete:true,
      addressid:e.target.dataset.addressid,
    })
    // console.log(e.target.dataset.addressid);


  },
  //确认删除按钮
  confirmDelete(){
    wx.request({
      url: 'http://api_devs.wanxikeji.cn/api/userAddressDelete',
      data: {
        token: this.data.token,
        id:this.data.addressid,
      },
      success: (result) => {
        let arr = this.data.addressList.filter(item=>item.address_id==this.data.addressid)
        let index = this.data.addressList.indexOf(arr[0]);
        let newarr = [...this.data.addressList];
        newarr.splice(index,1)
        this.setData({
          addressList:newarr,
          delete:false
        })

      },

    });
  },
  //取消删除按钮
  cancleBtn(){
    this.setData({
      delete:false
    })
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