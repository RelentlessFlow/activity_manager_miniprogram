import { IAppOption } from "../../../typings"
import { ActivityEntity } from "../../../typings/types/data/activity"
import { User } from "../../../typings/types/data/user"
import { getActivitiesQuerySchools, getParticipatorsAndActivitiesByUserId } from "../../api/apiActivity"
const app = <IAppOption>getApp()
// pages/my/my.ts
Page({
  data: {
    user: {} as User,
    activitiesDate: [] as Array<ActivityEntity & { organize: boolean }>, // 原始数据
    activities: [] as Array<ActivityEntity & { organize: boolean }>, // 当前显示的数据
    filter: "" as "Organize" | "Participate" | "Progress" | "Finish" | "", // 当前过滤项
    filterActivities: { // 过滤的四个列表
      Organize: undefined as undefined | Array<ActivityEntity & { organize: boolean }>,
      Participate: undefined as undefined | Array<ActivityEntity & { organize: boolean }>,
      Progress: undefined as undefined | Array<ActivityEntity & { organize: boolean }>,
      Finish: undefined as undefined | Array<ActivityEntity & { organize: boolean }>
    }
  },
  handleTapFilter: function (e: any) {
    const { type } = e.currentTarget.dataset as {type: "Organize" | "Participate" | "Progress" | "Finish"}
    const { filter, activitiesDate } = this.data
    if (type !== filter) {
      this.setData({ filter: type }, () => {
         this.setData({activities: this.data.filterActivities[type]})
      })
    }
    if (filter === type) { this.setData({ filter: "" }), this.setData({ activities: activitiesDate }) }
  },
  handleTapInfoEdit: function() {
    wx.navigateTo({url: '../../pages/editInfo/editInfo'})
  },
  handleTapToAdmin: function() {
    wx.navigateTo({url: '../../pages/manager/index/index'})
  },
  filterActivitiesDate(filter: "Organize" | "Participate" | "Progress" | "Finish", activities: Array<ActivityEntity & { organize: boolean }>) {
    console.log('filterActivitiesDate')
    console.log('activities', activities)
    const newActivity = JSON.parse(JSON.stringify(activities)) as Array<ActivityEntity & { organize: boolean }>
    switch (filter) {
      case "Organize":
        return newActivity.filter(item => { return item.organize === true })
      case "Participate":
        return newActivity.filter(item => { return item.organize === false })
      case "Progress":
        return newActivity.filter(item => { return (new Date().valueOf() > item.joinStartTime) && (new Date().valueOf() < item.endTime) })
      case "Finish":
        return newActivity.filter(item => { return (new Date().valueOf() > item.endTime.valueOf()) })
    }
  },
  getActivitiesDate: async function () {
    // 我参与的活动
    if (app.globalData.currentUser?.id === undefined) {
      wx.showToast({ title: '数据加载异常' }); return
    }
    const pcResult = await getParticipatorsAndActivitiesByUserId(app.globalData.currentUser.id)
    if (pcResult.statusCode !== 200) {
      wx.showToast({ title: '数据加载异常' }); return
    }
    const pcDate = pcResult.value.map(item => { return Object.assign(item, { organize: false }) })
    // 我组织的活动
    const aqResult = await getActivitiesQuerySchools([{ "sponsor.id": app.globalData.currentUser.id }])
    if (aqResult.statusCode !== 200) {
      wx.showToast({ title: '数据加载异常' }); return
    }
    const apDate = aqResult.value.map(item => { return Object.assign(item, { organize: true }) })
    const newActivities = [...pcDate, ...apDate].sort((c, p) => {
      return p.joinStartTime !== c.joinStartTime ? (c.joinStartTime as number) - (p.joinStartTime as number) : (c.endTime as number) - (p.endTime as number)
    })
    this.setData({ activitiesDate: newActivities })
    this.setData({ activities: newActivities })
    const filterActivites = this.data.filterActivities
    for(let key in filterActivites) {
      filterActivites[key as keyof typeof filterActivites] = this.filterActivitiesDate(key as keyof typeof filterActivites, newActivities)
    }
    this.setData({filterActivites})
  },
  // 初始化页面数据
  initailPageDateAjax: function () {
    this.getActivitiesDate()
  },
  onLoad() {
  },
  onReady() {
    this.initailPageDateAjax()
  },
  onShow() {
    // 获取当前用户信息
    const user = app.globalData.currentUser
    if (user) { this.setData({ user }) }

  },

  onHide() { },
  onUnload() { },
  onPullDownRefresh() {
  },
  onReachBottom() { },
  onShareAppMessage() { }
})