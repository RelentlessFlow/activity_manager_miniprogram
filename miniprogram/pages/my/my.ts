import { IAppOption } from "../../../typings"
import { ActivityEntity } from "../../../typings/types/data/activity"
import { User } from "../../../typings/types/data/user"
const app = <IAppOption>getApp()
// pages/my/my.ts
Page({
  data: {
    user: {} as User,
    activities: [] as Array<ActivityEntity>,
  },
  handleTapInfoEdit: function() {
    wx.navigateTo({
      url: '../../pages/editInfo/editInfo'
    })
  },
  getActivitiesDate: function() {
    
  },
  // 初始化页面数据
  initailPageDateAjax: function() {
    
  },
  onLoad() {
  },
  onReady() {
    
  },
  onShow() {
    // 获取当前用户信息
    const user = app.globalData.currentUser
    if(user) { this.setData({user}) }
    
  },

  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {}
})