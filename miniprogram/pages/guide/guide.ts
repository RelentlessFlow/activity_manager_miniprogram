import { IAppOption } from '../../../typings'
import { countDown } from '../../utils/util'
const app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: 3
  },

  async onReady() {
    // 倒计时函数
    const complete = await countDown(() => {
      this.setData({ times: this.data.times - 1 })
    }, this.data.times)
    if(complete) { this.gotoNext() }
  },

  gotoNext: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    const route = currentPage.route
    if(route === 'pages/guide/guide') {
      wx.switchTab({
        url: "../index/index"
      })
    }
  }
})