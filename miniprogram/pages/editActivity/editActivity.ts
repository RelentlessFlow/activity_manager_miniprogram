// pages/releaseActivity/releaseActivity.ts
Page({
  data: {
    name: "", desc: "", 
    time: {
      start: { date: "", time: "", }, 
      end: { date: "", time: "", },
    },
    signTime: {
      start: { date: "", time: "", }, 
      end: { date: "", time: "", },
    },
    people: 0, // 人数
    category: "", categoryId: "",  // 分类
    topic: "", topicId: "", // 专题
    location: { address: "", latitude: 0, longitude: 0, name: '' },
    cover: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/WX20220508-222713%402x.png',
    categories: [ //活动分类
      { id: '-1', name: '选择分类' },
      { id: '1', name: '读书分享会' }, { id: '2', name: '电影分享会/放映会' },  { id: '3', name: '脑洞大开的活动/分享会' }, 
      { id: '4', name: '辩论会' }, { id: '5', name: '即兴表演' }, { id: '6', name: '美食聚会' }, 
      { id: '7', name: '行业技能交流会' }, { id: '8', name: '个性化导赏' }, { id: '9', name: 'DIY' }, 
      { id: '10', name: '兴趣学习活动' }, { id: '11', name: '舞会' }, { id: '12', name: '英语角/英语沙龙' },
    ],
    joinTopic: false,
    topics: [
      { id: '1', name: '青春有我' }, 
    ],
    pickerIndex: {
      activity: 0, status: 0, topic: 0
    },
    opacity: 0, initialDistance: 0, // 处理顶部导航渐变
    navIndex: 0,
    userList: [
      { id: "1", avatar: "../../image/avatar.png", name: "苑紫清", school: "河北传媒学院", status: {type: 1, name: "负责人"} },
      { id: "2", avatar: "../../image/avatar.png", name: "苑紫清", school: "河北传媒学院", status: {type: 2, name: "已录取"} },
      { id: "3", avatar: "../../image/avatar.png", name: "苑紫清", school: "河北传媒学院", status: {type: 3, name: "待录取"} },
    ],
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
  handleStartDate: function(e:any) {  // 处理活动开始日期
    const {time} = this.data
    time.start.date = e.detail.value
    this.setData({time})
  },
  handleStartTime: function(e:any) { // 处理活动开始时间
    const {time} = this.data
    time.start.time = e.detail.value
    this.setData({time})
  },
  handleEndDate: function(e:any) { // 处理活动结束日期
    const {time} = this.data
    time.end.date = e.detail.value
    this.setData({time})
  },
  handleEndTime: function(e:any) { // 处理活动开始时间
    const {time} = this.data
    time.end.time = e.detail.value
    this.setData({time})
  },
  handleSignUpStartDate: function(e:any) {  // 处理活动报名开始日期
    const {signTime: time} = this.data
    time.start.date = e.detail.value
    this.setData({time})
  },
  handleSignUpStartTime: function(e:any) { // 处理活动报名开始时间
    const {signTime: time} = this.data
    time.start.time = e.detail.value
    this.setData({time})
  },
  handleSignUpEndDate: function(e:any) { // 处理活动报名结束日期
    const {signTime: time} = this.data
    time.end.date = e.detail.value
    this.setData({time})
  },
  handleSignUpEndTime: function(e:any) { // 处理活动报名结束时间
    const {signTime: time} = this.data
    time.end.time = e.detail.value
    this.setData({time})
  },
  handleSwitchTap: function(e:any) { // 处理页内导航
    this.setData({navIndex: parseInt(e.currentTarget.dataset.index)})
    if(e.currentTarget.dataset.index === 3) {
      if( this.data.location.longitude !== 0 && this.data.location.latitude === 0) {
        this.getMapByLocation()
      }
    }
  },
  handlePeopleDisposeTap: function(e:any) { // 人员录取处理
    const _this = this
    wx.showActionSheet({
      itemList: ['予以录取', '不予以录取'],
      success (res) {
        const {index, id} = e.currentTarget
        const rs = res.tapIndex
        const {userList} = _this.data
        if(rs === 0) {
          userList[index].status.type = rs
          userList[index].status.name = '已录取'
        }else if(rs === 1) {
          userList[index].status.type = rs
          userList[index].status.name = '未录取'
        }
      },
      fail (res) { // console.log(res.errMsg)
      }
    })
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
  onReady() {},
  onPageScroll(e) {
    const opacity = e.scrollTop / this.data.initialDistance * 2
    if(opacity >= 0) { this.setData({opacity}) }
  }
})