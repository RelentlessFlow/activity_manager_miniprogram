import {countDown} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allow: false,
    times: 3
  },

  async onReady() {
    // 倒计时函数
    await countDown(() => {
      this.setData({ times: this.data.times - 1 })
    }, this.data.times)
    this.setData({ allow: true })
    wx.navigateTo({ url: '../index/index' })
  },
})