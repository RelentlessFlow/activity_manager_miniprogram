import { customNavBack } from "../../utils/util"

// pages/inputDetail/inputDetail.ts
Page({

  data: {
    value: ""
  },

  handleTapBack: function() {
    customNavBack(this.data.value)
  },

  onLoad(option) { // value
    this.setData({value: option.value})
  },

  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },

  onShareAppMessage() {

  }
})