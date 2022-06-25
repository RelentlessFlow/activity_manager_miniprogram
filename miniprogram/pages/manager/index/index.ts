import { IAppOption } from "../../../../typings"
import { User } from "../../../../typings/types/data/user"

const app = <IAppOption>getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    platform: false,
    school: false
  },

  handleTapToPlatform: function() {
    console.log('handleTapToPlatform')
  },
  handleTapToSchool: function() {
    console.log('handleTapToSchool')
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
    const user = app.globalData.currentUser
    if(user === null) {
      wx.showToast({ title: '用户不存在' })
      return
    }
    for(let k of user.roles) {
      if(k === "platform") {
        this.setData({platform: true})
      }
      if(k === "school") {
        this.setData({school: true})
      }
    }
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