// index.ts

import { IAppOption } from "../../../typings"
import { Activity, ActivityEntity, Category, Theme } from "../../../typings/types/data/activity"
import { SwiperSlider } from "../../../typings/types/data/swiperSlider"
import { getActivities, getActivitiesQuery, getActivitiesQuerySchools } from "../../api/apiActivity"
import { getCategories } from "../../api/apiCategory"
import { getSwiperSliders } from "../../api/apiSwiper"
import { getFirstTheme } from "../../api/apiTheme"

// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    searchInput: '', searchPlaceholder: 'Search',
    hots: [
      {id: 1, title: '返家乡', icon: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/fangzi.png', color:'#bdbdbd'},
      {id: 2, title: '返家乡', icon: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/fangzi.png', color:'#bdbdbd'},
      {id: 3, title: '返家乡', icon: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/fangzi.png', color:'#bdbdbd'},
      {id: 4, title: '返家乡', icon: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/fangzi.png', color:'#bdbdbd'},
    ],
    categories: [] as Array<Category>,
    theme: {} as Theme,
    activities: [] as Array<ActivityEntity>,
    swiperSlider: [] as Array<SwiperSlider>,
  },
  handleSearchInput: function(e:any) {  // 搜索框表单
    this.setData({searchInput: e.detail})
  },
  handleTopActivityTap: function() {
    wx.navigateTo({
      url: '../../pages/activity/activity'
    })
  },
  handleReleaseActivityTap: function() { // 发布活动按钮 
    wx.navigateTo({
      url: '../../pages/releaseActivity/releaseActivity'
    })
  },
  handleSwiperTap: function(e:any) {
    console.log(e.detail)
  },
  handleTapCategoryItem: function(e: any) {
    const index = e.currentTarget.dataset.index
    wx.navigateTo({url: `../activity/activity?categoryIndex=${index}`})
  },
  handleTapQrCode: function() {
    wx.scanCode({
      scanType: ["qrCode"],
      success: function(res) {
        console.log(res)
      }
    })
  },
  verifyUserInfo: function() {
    // 存在登录用户
    if(app.globalData.currentUser !== null && app.globalData.currentUser != undefined) {
      const { name, idCard, school, major } = app.globalData.currentUser
      if(name === undefined) {
        wx.navigateTo({url: '../../pages/userSettingPages/nameSetting/nameSetting'})
        return
      }
      if(idCard === undefined) {
        wx.navigateTo({url: '../../pages/userSettingPages/idCardSetting/idCardSetting'})
        return
      }
      if(school === undefined) {
        wx.navigateTo({url: '../../pages/userSettingPages/schoolSetting/schoolSetting'})
        return
      }
      if(major === undefined) {
        wx.navigateTo({url: '../../pages/userSettingPages/majorSetting/majorSetting'})
        return
      }
    } else { // 用户未登录
      wx.navigateTo( {url: '../login/login'} )
    }
  },
  intailPageDate: async function () {
    const cateResult = await getCategories() // 分类数据
    if(cateResult.statusCode === 200) {
      this.setData({categories: cateResult.value})
    } else {wx.showToast({title: cateResult.desc}) }
    const swiperResult = await getSwiperSliders() // 轮播图数据
    if(swiperResult.statusCode === 200) {
      this.setData({swiperSlider: swiperResult.value})
    } else {wx.showToast({title: swiperResult.desc}) }
    const activityResult = await getActivitiesQuerySchools() // 首页活动数据
    if(activityResult.statusCode === 200) { 
      this.setData({activities: activityResult.value})
    } else {wx.showToast({title: swiperResult.desc}) }
    const themeResult = await getFirstTheme() // 首页专题数据
    if(themeResult.statusCode === 200) {
      this.setData({theme: themeResult.value[0]})
    }
  },
  onLoad() {
  },
  onReady() {
  },
  onShow() {
    this.verifyUserInfo()
    this.intailPageDate()
  }
})
