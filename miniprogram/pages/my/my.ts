import { IAppOption } from "../../../typings"
import { User } from "../../../typings/types/data/user"
const app = <IAppOption>getApp()
// pages/my/my.ts
Page({
  data: {
    user: {} as User,
    activities: [{
      id: "1",
      cover: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/WX20220508-222713%402x.png',
      name: '妈，我想你了1妈，我想你了',
      type: "实践育人",
      date: { start: "2022.05.09", end: "2022.5.13" },
      status: "规划中"
    },{
      id: "2",
      cover: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/WX20220508-222713%402x.png',
      name: '妈，我想你了2',
      type: "实践育人",
      date: { start: "2022.05.09", end: "2022.5.13" },
      status: "规划中"
    },{
      id: "3",
      cover: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/WX20220508-222713%402x.png',
      name: '妈，我想你了3',
      type: "实践育人",
      date: { start: "2022.05.09", end: "2022.5.13" },
      status: "规划中"
    },{
      id: "4",
      cover: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/WX20220508-222713%402x.png',
      name: '妈，我想你了4',
      type: "实践育人",
      date: { start: "2022.05.09", end: "2022.5.13" },
      status: "规划中"
    }],
  },
  handleTapInfoEdit: function() {
    wx.navigateTo({
      url: '../../pages/editInfo/editInfo'
    })
  },
  onLoad() {
  },
  onReady() {
    
  },
  onShow() {
    const user = app.globalData.currentUser
    if(user) {
      this.setData({user})
    }
  },

  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {}
})