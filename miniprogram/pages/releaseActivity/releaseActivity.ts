import { Category } from "../../../typings/types/data/categories"

// pages/releaseActivity/releaseActivity.ts
Page({
  data: {
    name: "", desc: "", 
    people: 0, // 人数
    category: "", categoryId: "",  // 分类
    topic: "", topicId: "", // 专题
    location: { address: "", latitude: 0, longitude: 0, name: '' },
    cover: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/WX20220508-222713%402x.png',
    categories: [] as Array<Category>,
    joinTopic: false,
    topics: [
      { id: '1', name: '青春有我' }, 
    ],
    pickerIndex: {
      activity: 0, status: 0, topic: 0
    },
    opacity: 0, initialDistance: 0, // 处理顶部导航渐变
    navIndex: 0,
    userList: {
      organize: {
        id: '1', name: "苑紫清"
      },
      admit: [],  // 已录用
      pending: [] // 待录取
    },
    // 日期选择器处理
    activitStartTime: "",
    activitStartTimePlaceholder: "开始时间",
    activitEndTime: "",
    activitEndTimePlaceholder: "结束时间",
    joinStartTime: "",
    joinStartTimePlaceholder: "开始时间",
    joinEndTime: "",
    joinEndTimePlaceholder: "结束时间",
  },
  handleTapCancel: function() { // 返回上一级
    wx.navigateBack()
  },
  handleTapChangeCover: function() {  // 更改封面
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        _this.setData({cover: res.tempFilePaths[0]})
      }
    })
  },
  handleNameInputChange: function(e:any) {  //活动名称表单处理
    console.log(e)
    this.setData({name: e.detail.value})
  },
  handleDescInputChange: function(e:any) {  //活动描述表单处理
    this.setData({desc: e.detail.value})
  },
  handlePickerActivityChange: function(e:any) { // 活动分类选择器逻辑
    let { id } = e.currentTarget.dataset
    const { pickerIndex } = this.data
    pickerIndex.activity = e.detail.value
    this.setData({ pickerIndex }, () => {
      this.setData({ categoryId: id});
      this.setData({ category: this.data.categories[pickerIndex.activity].name})
    })
  },
  handlePickerTopicChange: function(e:any) {  // 专题选择器逻辑
    let { id } = e.currentTarget.dataset
    const { pickerIndex } = this.data
    pickerIndex.topic = e.detail.value
    this.setData({ pickerIndex }, () => {
      this.setData({ topicId: id});
      this.setData({ topic: this.data.topics[pickerIndex.topic].name})
    })
  },
  handleTapLocSelector: function() {  // 位置选择事件
    const _this = this
    wx.chooseLocation({
      success: function (res) {  
        const loc = res
        const newLoc = _this.data.location
        newLoc.name = loc.name
        newLoc.latitude = loc.latitude
        newLoc.longitude = loc.longitude
        newLoc.address = loc.address
        _this.setData({location: newLoc})
      }
    })
  },
  handleSwitchTopic: function(e:any) {  // 参加专题
    this.setData({joinTopic: e.detail.value})
  },
  handleSwitchTap: function(e:any) { // 
    this.setData({navIndex: parseInt(e.currentTarget.dataset.index)})
    if(e.currentTarget.dataset.index === 3) {
      if( this.data.location.longitude !== 0 && this.data.location.latitude === 0) {
        this.getMapByLocation()
      }
    }
  },
  selectSwitchBottom: function() {  // 查询业内导航位置
    return new Promise(resolve => {
      const query = wx.createSelectorQuery()
      query.select('.switch').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function(res){
        resolve({
          bottom: res[0].bottom,
          height: res[0].height
        }) 
      })
    })
  },
  selectButtonGroupBottom: function(){  // 查询顶部按钮组位置
    return new Promise(resolve => {
      const query2 = wx.createSelectorQuery()
      query2.select('.button-group').boundingClientRect()
      query2.selectViewport().scrollOffset()
      query2.exec(function(res){
        resolve({
          bottom: res[0].bottom,
          height: res[0].height
        }) 
      })
    })
  },
  getMapByLocation: function() {
    wx.openLocation({
      latitude: this.data.location.latitude,
      longitude: this.data.location.longitude  
    }).then(res => {
      console.log(res)
    })
  },
  // 日期处理
  // 日期选择函数（开始日期）
  handleActivityTimeStart: function (e:any) { var model = e.detail; this.setData({ activitStartTime: model.dateTime }) },
  handleActivityTimeEnd: function (e:any) { var model = e.detail; this.setData({ activitEndTime: model.dateTime }) },
  handleJoinTimeStart: function (e:any) { var model = e.detail; this.setData({ joinStartTime: model.dateTime }) },
  handleJoinTimeEnd: function (e:any) { var model = e.detail; this.setData({ joinEndTime: model.dateTime }) },
  initalDataComponents: function() { // 初始化日期组件
    const activitStartTime = this.selectComponent("#activitStartTime");
    activitStartTime?.setTime("2010-01-01 00:00", "2099-12-31 23:59", "2022-01-01 00:00");
    const activitEndTime = this.selectComponent("#activitEndTime");
    activitEndTime?.setTime("2010-01-01 00:00", "2099-12-31 23:59", "2022-01-01 00:00");
    const joinStartTime = this.selectComponent("#joinStartTime");
    joinStartTime?.setTime("2010-01-01 00:00", "2099-12-31 23:59", "2022-01-01 00:00");
    const joinEndTime = this.selectComponent("#joinEndTime");
    joinEndTime?.setTime("2010-01-01 00:00", "2099-12-31 23:59", "2022-01-01 00:00");
  },
  // 初始化数据

  
  onLoad() {
    this.selectButtonGroupBottom().then(resolveButton => {
      this.selectSwitchBottom().then(resolveSwitch => {
        const distance = (resolveSwitch as any).bottom 
          - (resolveButton as any).bottom 
          - (resolveSwitch as any).height
        this.setData({initialDistance: distance})
      }) // 存储滚动距离
    })
  },
  onReady() {
    // 初始化日期组件
    this.initalDataComponents()
  },
  onPageScroll(e) {
    const opacity = e.scrollTop / this.data.initialDistance * 2
    if(opacity >= 0) { this.setData({opacity}) }
  }
})