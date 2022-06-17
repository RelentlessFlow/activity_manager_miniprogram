import { IAppOption } from "../../../typings"
import { Activity, Category, Theme } from "../../../typings/types/data/activity"
import { addActivity } from "../../api/apiActivity"
import { getCategories } from "../../api/apiCategory"
import { uploadFast } from "../../api/apiCloudStorage"
import { getThemes } from "../../api/apiTheme"
import { formatTimeLocal, paramsValidate } from "../../utils/util"
const app = <IAppOption>getApp()
Page({
  data: {
    activity: {
      name: undefined, desc: undefined,
      people: undefined, // 人数
      category: undefined, // 分类
      theme: undefined,// 专题
      location: undefined, // 位置
      cover: '../../image/activity-cover.jpg', // 封面,
      // 日期选择器处理
      startTime: undefined, 
      endTime: undefined, 
      joinStartTime: undefined, 
      joinEndTime: undefined, 
      sponsor: undefined, // 发起人
      joinTheme: false, // 是否参加主题
    } as Activity,
    categories: [] as Array<Category>, // 分类类别
    themes: [{}] as Array<Theme>, // 专题列表
    pickerIndex: {
      activity: 0, theme: 0
    },
    // 页面
    opacity: 0, initialDistance: 0, // 处理顶部导航渐变
    navIndex: 0,
    // 时间选择器组件
    startTimePlaceholder: "开始时间",
    endTimePlaceholder: "结束时间",
    joinStartTimePlaceholder: "开始时间",
    joinEndTimePlaceholder: "结束时间",
    startTime: "", 
    endTime: "", 
    joinStartTime: "", 
    joinEndTime: "", 
  },
  // 事件处理
  handleTapCancel: function () { // 返回上一级
    wx.removeStorageSync('activityDraft')
    wx.navigateBack()
  },
  handleTapChangeCover: function () {  // 更改封面
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const {activity} = _this.data
        activity.cover = res.tempFilePaths[0]
        _this.setData({ activity })
      }
    })
  },
  handleNameInputChange: function (e: any) {  //活动名称表单处理
    const {activity} = this.data
    activity.name = e.detail.value
    this.setData({ activity }) 
  },
  handleDescInputChange: function (e: any) {  //活动描述表单处理
    const {activity} = this.data
    activity.desc = e.detail.value
    this.setData({ activity })
  },
  handlePickerActivityChange: function (e: any) { // 活动分类选择器逻辑
    const { pickerIndex } = this.data
    pickerIndex.activity = e.detail.value
    this.setData({ pickerIndex }, () => {
      const {activity} = this.data
      activity.category = this.data.categories[pickerIndex.activity]
      this.setData({ activity })
    })
  },
  hanlePeopleInputChange: function (e: any) { // 人数输入框
    const {activity} = this.data
    activity.people = e.detail.value
    this.setData({ activity })
  },
  handlePickerTopicChange: function (e: any) {  // 专题选择器逻辑
    const { pickerIndex } = this.data
    pickerIndex.theme = e.detail.value
    this.setData({ pickerIndex }, () => {
      const {activity} = this.data
      activity.theme = this.data.themes[pickerIndex.theme]
      this.setData({ activity })
    })
  },
  handleTapLocSelector: function () {  // 位置选择事件
    const _this = this
    wx.chooseLocation({
      success: function (res) {
        const {activity} = _this.data
        const {address, latitude, longitude, name}  = res
        activity.location = {address, latitude, longitude, name}
        _this.setData({ activity })
      }
    })
  },
  handleSwitchTheme: function (e: any) {  // 参加专题
    const {activity, themes} = this.data 
    activity.joinTheme = e.detail.value
    if(activity.joinTheme) {
      activity.theme = themes[0]
    } else {
      activity.theme = undefined
    }
    this.setData({ activity })
  },
  handleSwitchTap: function (e: any) { // 业内导航
    this.setData({ navIndex: parseInt(e.currentTarget.dataset.index) })
    const {index} = e.currentTarget.dataset
    if(index === '3') { // 切换到位置
      this.getMapByLocation()
    }
  },
  selectSwitchBottom: function () {  // 查询业内导航位置
    return new Promise(resolve => {
      const query = wx.createSelectorQuery()
      query.select('.switch').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        resolve({
          bottom: res[0].bottom,
          height: res[0].height
        })
      })
    })
  },
  selectButtonGroupBottom: function () {  // 查询顶部按钮组位置
    return new Promise(resolve => {
      const query2 = wx.createSelectorQuery()
      query2.select('.button-group').boundingClientRect()
      query2.selectViewport().scrollOffset()
      query2.exec(function (res) {
        resolve({
          bottom: res[0].bottom,
          height: res[0].height
        })
      })
    })
  },
  // 日期更新时间处理
  handleStartTime: function (e: any) { 
    this.setData({startTime: e.detail.dateTime}) // 先设置组件数据
    const {activity} = this.data;  // 在设置实体数据
    activity.startTime = new Date(e.detail.dateTime).valueOf()
    this.setData({ activity }) 
  },
  handleEndTime: function (e: any) { 
    this.setData({endTime: e.detail.dateTime}) // 先设置组件数据
    const {activity} = this.data;  // 在设置实体数据
    activity.endTime = new Date(e.detail.dateTime).valueOf()
    this.setData({ activity }) 
  },
  handleJoinStartTime: function (e: any) { 
    this.setData({joinStartTime: e.detail.dateTime}) // 先设置组件数据
    const {activity} = this.data;  // 在设置实体数据
    activity.joinStartTime = new Date(e.detail.dateTime).valueOf()
    this.setData({ activity }) 
  },
  handleJoinEndTime: function (e: any) { 
    this.setData({joinEndTime: e.detail.dateTime}) // 先设置组件数据
    const {activity} = this.data;  // 在设置实体数据
    activity.joinEndTime = new Date(e.detail.dateTime).valueOf()
    this.setData({ activity }) 
  },

  // 点击存草稿事件处理
  handleTapSaveToDraft: function () {
    const _this = this
    wx.setStorage({
      key: "activityDraft",
      data: _this.data
    })
    wx.showToast({ "title": "草稿保存成功！" })
    wx.navigateBack()
  },

  // 点击发布活动按钮事件处理
  handleTapRelase: async function () {
    const {activity} = this.data
    const valrs = paramsValidate(activity, ['theme'])
    if(valrs.size === 0) { // 验证通过
      // 上传图片到云端
      const uploadResult = await uploadFast(activity.cover as string, 'activity-cover')
      if(uploadResult) { activity.cover = uploadResult }
      const result = await addActivity(activity)
      if(result.statusCode === 201) {
        wx.showToast({title: '添加成功'})
        setTimeout(wx.navigateBack, 1000)
      }
    } else {
      wx.showModal({'title': "请将信息填写完整后发布", showCancel: false})
      return
    }

  },

  // 其余函数
  getMapByLocation: function () { // 通过小程序API获取本地位置
    const {location} = this.data.activity
    if(location && location.latitude && location.longitude) {
      wx.openLocation({
        latitude: location.latitude,
        longitude: location.longitude
      })
    }
  },

  // 初始化函数部分
  initalDataComponents: function () { // 初始化日期组件
    const nowDate = formatTimeLocal(new Date())
    const activitStartTime = this.selectComponent("#startTime");
    activitStartTime?.setTime(nowDate, "2099-12-31 23:59", nowDate);
    const activitEndTime = this.selectComponent("#endTime");
    activitEndTime?.setTime(nowDate, "2099-12-31 23:59", nowDate);
    const joinStartTime = this.selectComponent("#joinStartTime");
    joinStartTime?.setTime(nowDate, "2099-12-31 23:59", nowDate);
    const joinEndTime = this.selectComponent("#joinEndTime");
    joinEndTime?.setTime(nowDate, "2099-12-31 23:59", nowDate);
  },
  // 初始化数据
  intailPageDateAjax: async function () {
    // 分类数据
    const {activity} = this.data
    const cateResult = await getCategories()
    if (cateResult.statusCode === 200) {
      this.setData({ categories: cateResult.value })
      activity.category = cateResult.value[0]
      this.setData({ activity })
    } else { wx.showToast({ title: cateResult.desc }) }
    // 专题数据
    const themesResult = await getThemes()
    if (themesResult.statusCode === 200) {
      this.setData({ themes: themesResult.value })
    } else { wx.showToast({ title: themesResult.desc }) }
    // 发起人（当前用户）
    if (app.globalData.currentUser != null) {
      const {activity} = this.data
      activity.sponsor = app.globalData.currentUser
      activity.school = app.globalData.currentUser.school
      this.setData({ activity })
    }
  },

  onLoad() {
    this.selectButtonGroupBottom().then(resolveButton => {
      this.selectSwitchBottom().then(resolveSwitch => {
        const distance = (resolveSwitch as any).bottom
          - (resolveButton as any).bottom
          - (resolveSwitch as any).height
        this.setData({ initialDistance: distance })
      }) // 存储滚动距离
    })
  },
  async onReady() {
    // 初始化日期组件
    this.initalDataComponents()
    // 初始化草稿中的数据
    const draft = wx.getStorageSync('activityDraft')
    if(draft != undefined && draft != null) {
      this.setData(draft)
    }
    this.intailPageDateAjax()
  },
  onPageScroll(e) {
    const opacity = e.scrollTop / this.data.initialDistance * 2
    if (opacity >= 0) { this.setData({ opacity }) }
  }
})