/*
 * @author: Lan_
 * @create: 2021-08-20 10:51 AM
 * @license: MIT
 * @lastAuthor: Lan_
 * @lastEditTime: 2021-08-24 13:06 PM
 * @desc:
 */
// components/tabs/tabs.js
Component({
  data: {
    tabTag: [
      "京东物流",
      "品牌",
      "新品",
      "CPU型号",
      "京东物流",
      "机身储存",
      "京东物流",
    ],
  },
  properties: {
    tabs: {
      type: Array,
      value: [],
    },
    tags: {
      type: Array,
      value: [],
    },
    flag: {
      type: Boolean,
    },
    priceFlag: {
      type: Boolean,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handletep(e) {
      const index = e.currentTarget.dataset;
      this.triggerEvent("tabschange", { index });
    },
    changeList(e) {
      this.triggerEvent("custom");
    },
    switch() {
      this.triggerEvent("switch");
    },
    changeTag(e) {
      let index = e.currentTarget.dataset.index;
      this.triggerEvent("tagschange", { index });
    },
    downList(e) {
      console.log(e);
      if (e.currentTarget.dataset.index == 0) {
        this.triggerEvent("downList");
      }
    },
  },
});
