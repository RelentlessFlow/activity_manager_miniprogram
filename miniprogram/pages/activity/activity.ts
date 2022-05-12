// pages/activity/activity.ts
Page({
  data: {
    searchInput: '', searchPlaceholder: 'Search',
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
    categories: [ //活动分类
      { id: -1, name: '活动'}, { id: 1, name: '读书分享会' }, { id: 2, name: '电影分享会/放映会' }, 
      { id: 3, name: '脑洞大开的活动/分享会' }, { id: 4, name: '辩论会' }, { id: 5, name: '即兴表演' }, 
      { id: 6, name: '美食聚会' }, { id: 7, name: '行业技能交流会' }, { id: 8, name: '个性化导赏' },
      { id: 9, name: 'DIY' }, { id: 10, name: '兴趣学习活动' }, { id: 11, name: '舞会' }, 
      { id: 12, name: '英语角/英语沙龙' },
    ],
    status: [
      { id: -1, name: '状态'}, { id: 1, name: '规划中' }, { id: 2, name: '报名中' }, 
      { id: 3, name: '进行中' }, { id: 4, name: '已结束' }
    ],
    filter: {   // 活动过滤条件
      categoryId: "", statusId: ""
    },
    pickerIndex: {
      activity: 0, status: 0
    }
  },
  handleBackTap: function() { // 返回导航
    wx.navigateBack()
  },
  handleSearchInput: function(e:any) {  // 搜索表单输入逻辑
    this.setData({searchInput: e.detail})
  },
  handlePickerActivityChange: function(e:any) { // 活动分类选择器逻辑
    let { id } = e.currentTarget.dataset
    const { filter, pickerIndex } = this.data
    filter.categoryId = id
    pickerIndex.activity = e.detail.value
    this.setData({ pickerIndex })
    this.setData({ filter })
  },
  handlePickerStatusChange: function(e:any) { // 活动状态选择器逻辑
    let { id } = e.currentTarget.dataset
    const { filter, pickerIndex } = this.data
    filter.statusId = id
    pickerIndex.status = e.detail.value
    this.setData({ pickerIndex })
    this.setData({ filter })
  },
  onLoad() {},
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
})