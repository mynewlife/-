/*
 * @Author: your name
 * @Date: 2021-08-20 07:28:20
 * @lastEditTime: 2021-08-25 20:45 PM
 * @lastAuthor: Lan_
 * @Description: In User Settings Edit
 * @FilePath: \miniprogram-1\pages\mySearch\mySearch.js
 */
/*
 * @author: Lan_
 * @create: 2021-08-20 12:32 PM
 * @license: MIT
 * @lastAuthor: Lan_
 * @lastEditTime: 2021-08-25 19:11 PM
 * @desc:
 */
const App = getApp()
Component({
  data: {
    // 自定义顶部导航
    // navHeight: App.globalData.navHeight,
    // navTop: App.globalData.navTop,
  },
  properties:{
    search:{
      type:Array
    }
  },
  methods: {
    // 点击返回上级页面
  goBack: function() {
    // let pages = getCurrentPages();   //获取小程序页面栈
    // let beforePage = pages[pages.length - 2];  //获取上个页面的实例对象
    // beforePage.setData({      //直接修改上个页面的数据（可通过这种方式直接传递参数）
    //   txt: '修改数据了'
    // })
    // beforePage.goUpdate();   //触发上个页面自定义的go_update方法
    wx.navigateBack({         //返回上一页
      delta: 1
    })
  },
  },

  /**
   * 获取顶部固定高度
   */
  attached: function () {
    this.setData({
      navHeight: App.globalData.navHeight,
      navTop: App.globalData.navTop,
    })
  },
})