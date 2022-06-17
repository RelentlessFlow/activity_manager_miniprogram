import { IAppOption } from "../../../typings"
import { Activity, ActivityParticipator } from "../../../typings/types/data/activity"
import { addParticipator, getActivity, getParticipatorsByActivityId, getParticipatorsByUserId } from "../../api/apiActivity"
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
    activityParticipators: [] as Array<ActivityParticipator>,
    // 页面
    opacity: 0, initialDistance: 0, // 处理顶部导航渐变
    navIndex: 0,
    participatorInfo: {} as ActivityParticipator
  },
  // 事件处理
  handleTapCancel: function () { // 返回上一级
    wx.removeStorageSync('activityDraft')
    wx.navigateBack()
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
  handleTapSignUp: async function() { // 立刻报名
    const user = app.globalData.currentUser
    if(this.data.activity.id !== undefined && user!= undefined) {
      const rs = await addParticipator(this.data.activity.id, user)
      if(rs.statusCode === 201) {
        this.setData({participatorInfo: rs.value})
        wx.showToast({title: '报名成功'})
      } else {
        wx.showToast({title: '网络错误'})
      }
    } 
  },
  handleTapAdmitDetail: function() {
    const {isDispose, dsResult} = this.data.participatorInfo
    const content = `是否处理：${isDispose ? '已处理' : '未处理'};录取结果：${dsResult ? '已录取' : '未录取'}`
    wx.showModal({"title": "报名详情", content, showCancel: false})
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
  initalPageAjax: async function() {
    if(this.data.activity.id !== undefined && app.globalData.currentUser?.id !== undefined) {
      const parResult = await getParticipatorsByUserId(app.globalData.currentUser.id, this.data.activity.id )
      const parsResult = await getParticipatorsByActivityId(this.data.activity.id)
      if(parResult.statusCode !== 200 || parsResult.statusCode !== 200) {
        wx.showToast({title: '页面加载失败'})
        return
      }
      if(parResult.value.length > 0) {
        this.setData({participatorInfo: parResult.value[0]})
      }
      if(parsResult.value.length > 0) {
        this.setData({activityParticipators: parsResult.value})
      }
    }
  },
  async onLoad(option) {
    const {id } = option
    if(id === undefined) {
      wx.showToast({title: '页面参数错误'})
      return
    }
    const acResult = await getActivity(id)
    if(acResult.statusCode !== 200) {
      wx.showToast({title: '页面加载失败'})
      return
    }
    this.setData({activity: acResult.value}, this.initalPageAjax)
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
    
  },
  onPageScroll(e) {
    const opacity = e.scrollTop / this.data.initialDistance * 2
    if (opacity >= 0) { this.setData({ opacity }) }
  }
})