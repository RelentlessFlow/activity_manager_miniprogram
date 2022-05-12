// index.ts
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
    theme: {
      cover: "https://activity-1257765810.cos.ap-beijing.myqcloud.com/2fd26bb99b723337a2f8eaba84f7d5bb.jpg",
      title: '全国大学生金融挑战赛',
      date: {start: "2022.04.22", end: "2022.05.17"},
      count: "166"
    },
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
    }]
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
  handleThemeCardTap: function() {
    wx.navigateTo({
      url: '../../pages/themeActivity/themeActivity'
    })
  },
  onLoad() {}
})
