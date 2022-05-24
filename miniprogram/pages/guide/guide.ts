import {countDown} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: 3
  },

  async onReady() {
    // 倒计时函数
    await countDown(() => {
      this.setData({ times: this.data.times - 1 })
    }, this.data.times)
    this.gotoIndex()
  },

  gotoIndex: function() {
    wx.navigateTo({
      url: "../login/login"
    })
  }
})