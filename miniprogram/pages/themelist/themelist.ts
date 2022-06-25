import { Theme } from "../../../typings/types/data/activity";
import { getThemes } from "../../api/apiTheme";

// pages/themelist/themelist.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themes: [] as Array<Theme>
  },

  initailPage: function() {
    this.getThemesDate()
  },

  getThemesDate: async function() {
    const themsResult = await getThemes()
    if(themsResult.statusCode != 200) {
      wx.showToast({title: '网络请求错误', icon: 'error'})
      return
    }
    this.setData({themes: themsResult.value})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.initailPage()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})