import { IAppOption } from "../../../typings"
import { ActivityEntity, Category, Theme } from "../../../typings/types/data/activity"
import { ActivitiesQuery, getActivities, getActivitiesQuery, getActivitiesQuerySchools } from "../../api/apiActivity"
import { getCategories } from "../../api/apiCategory"
import { getThemes } from "../../api/apiTheme"
const app = <IAppOption>getApp()
// pages/activity/activity.ts
Page({
  data: {
    searchInput: '', searchPlaceholder: 'Search',
    searchInitalData: [] as Array<ActivityEntity>,
    activities: [] as Array<ActivityEntity>,
    categories: [] as Array<Category>,   //活动分类 
    themes: [] as Array<Theme>,
    filter: {   // 活动过滤条件
      categoryId: "", themeId: ""
    },
    pickerIndex: {
      activity: -1, status: -1, theme: -1
    },
    pageOption: {} as {
      categoryIndex?: undefined | string,
      themeId?: undefined | string,
      categoryId?: undefined | string
    }
  },
  handleBackTap: function () { // 返回导航
    wx.navigateBack()
  },
  handleSearchInput: function (e: any) {  // 搜索表单输入逻辑
    this.setData({ searchInput: e.detail },async () => {
      const {searchInput, activities, searchInitalData} = this.data
      if(searchInput !== '') { // 输入有东西
        // 第一次输入把结果存一下做个缓存，防止重复请求
        if(searchInitalData.length === 0) { this.setData({searchInitalData: activities}) }
        // 这里该做个节流...但是不太会...
        const rs = await getActivities([{name: searchInput}, {"school.name": app.globalData.currentUser?.school?.name}])
        if(rs.statusCode !== 200) {
          wx.showToast({title: "网络请求失败", icon: "error"})
          return
        }
        this.setData({activities: rs.value})
      }
      if(searchInput === '') { // 输入值为空
        this.setData({activities: searchInitalData})
      }
    })
  },
  handlePickerActivityChange: function (e: any) { // 活动分类选择器逻辑
    this.setCategoryData(e.detail.value, this.getActivitiesData)
  },
  handlePickerThemeChange: function (e: any) { // 活动状态选择器逻辑
    this.setThemeData(e.detail.value, this.getActivitiesData)
  },
  handleTapEmptyFilter: function () { // 清除筛选条件按钮
    const { filter, pickerIndex } = this.data
    for (let k in filter) {
      filter[k as keyof typeof filter] = ""
    }
    for (let k in pickerIndex) {
      pickerIndex[k as keyof typeof pickerIndex] = -1
    }
    Promise.all([
      new Promise(resolve => { this.setData({ filter }), resolve(true) }),
      new Promise(resolve => { this.setData({ pickerIndex }), resolve(true) })
    ]).then(() => {
      this.getActivitiesData()
    })
  },

  getCategoryData: async function (callBack = () => { }) {
    const cg = await getCategories()
    if (cg.statusCode !== 200) {
      wx.showToast({ 'icon': 'error', title: '数据获取失败' })
      return
    }
    this.setData({ categories: cg.value }, callBack)
  },
  getThemesData: async function (callBack = () => { }) {
    const themsResult = await getThemes()
    if (themsResult.statusCode !== 200) {
      wx.showToast({ 'icon': 'error', title: '数据获取失败' })
      return
    }
    this.setData({ themes: themsResult.value }, callBack)
  },
  getActivitiesData: async function () {
    const q = [] as Array<ActivitiesQuery>
    const { filter } = this.data
    if (!(filter.categoryId === '')) {
      q.push({ categoryId: filter.categoryId })
    }
    if (!(filter.themeId === '')) {
      q.push({ themeId: filter.themeId })
    }
    const rs = await getActivitiesQuerySchools(q)
    if (rs.statusCode !== 200) {
      wx.showToast({ 'icon': 'error', title: '数据获取失败' })
      return
    }
    this.setData({ activities: rs.value })
  },
  setCategoryData: function (index: number, callBack = () => { }) {
    const { filter, pickerIndex, categories } = this.data
    pickerIndex.activity = index
    this.setData({ pickerIndex }, () => {
      filter.categoryId = categories[pickerIndex.activity].id as string
      this.setData({ filter }, callBack)
    })
  },
  setThemeData: function (index: number, callBack = () => { }) {
    const { filter, pickerIndex, themes } = this.data
    pickerIndex.theme = index
    this.setData({ pickerIndex }, () => {
      filter.themeId = themes[pickerIndex.theme].id as string
      this.setData({ filter }, callBack)
    })
  },
  onLoad(option: any) {
    this.setData({ pageOption: option })
  },
  onShow() {
    const { categoryIndex, themeId, categoryId } = this.data.pageOption
    Promise.all([this.getThemesData(), this.getCategoryData()]).then(() => {
      const task = []
      if (categoryIndex != undefined) {
        task.push(this.setCategoryData(parseInt(categoryIndex)))
      }
      if (categoryId != undefined) {
        const categoryIndex = this.data.categories.findIndex(item => item.id === categoryId)
        task.push(this.setCategoryData(categoryIndex))
      }
      if (themeId != undefined) {
        const themeIndex = this.data.themes.findIndex(item => item.id === themeId)
        task.push(this.setThemeData(themeIndex))
      }
      Promise.all(task).then(this.getActivitiesData)
    })
  },

  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
})