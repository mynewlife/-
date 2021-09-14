/*
 * @author: Lan_
 * @create: 2021-08-16 11:13 AM
 * @license: MIT
 * @lastAuthor: Lan_
 * @lastEditTime: 2021-08-25 16:05 PM
 * @desc:
 */
import { request } from "../../request/request";

Page({
  data: {
    index: 0,
    leftdata: [],
    rightdata: [],
    scrollTop:0,
    children:[]
  },
  onLoad: function (options) {
    const cate = wx.getStorageSync("cate");
    if (!cate) {
      this.getcategoryData();
    } else {
      if (Date.now() - cate.time > 1000 * 300) {
        this.getcategoryData();
      } else {
        this.cate = cate.data;
        let leftdata = this.cate.map((v) => v.cat_name);
        let rightdata = this.cate[0].children;
        this.setData({
          leftdata,
          rightdata,
        });
      }
    }
  },
  cate: [],
  getcategoryData() {
    request({
      url: "http://api_devs.wanxikeji.cn/api/goodType",
    })
      .then((res) => {
        console.log(res);
        this.cate = res.data.data;
        console.log(this.cate);
        // wx.setStorageSync("cate", { time:Date.now(), data:this.cate });
        let leftdata = this.cate.filter((v) => v.parent_id==0);
        console.log(leftdata);
        let rightdata = this.cate.filter(v=>v.parent_id==leftdata[0].good_type_id);
        rightdata.map((v)=>v["children"]=this.cate.filter(j=> j.parent_id==v.good_type_id)) 
        console.log(rightdata);
        this.setData({
          leftdata,
          rightdata,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // 左侧菜单点击事件
  itemtep(e) {
    let leftdata = this.data.leftdata;
    const index = e.currentTarget.dataset.index;
    let rightdata = this.cate.filter(v=>v.parent_id==leftdata[index].good_type_id);
    rightdata.map((v,ind)=>v["children"]=this.cate.filter(j=> j.parent_id==v.good_type_id)) 
    this.setData({
      index: index,
      rightdata,
    });
  },
});
