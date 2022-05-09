// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    paddingtop: 0, paddingbottom: 0,
    searchInput: '',
    searchPlaceholder: 'Search',
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
      date: { start: "2022.05.09", end: "2022.5.13" }
    },{
      id: "2",
      cover: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/WX20220508-222713%402x.png',
      name: '妈，我想你了2',
      type: "实践育人",
      date: { start: "2022.05.09", end: "2022.5.13" }
    },{
      id: "3",
      cover: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/WX20220508-222713%402x.png',
      name: '妈，我想你了3',
      type: "实践育人",
      date: { start: "2022.05.09", end: "2022.5.13" }
    },{
      id: "4",
      cover: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/WX20220508-222713%402x.png',
      name: '妈，我想你了4',
      type: "实践育人",
      date: { start: "2022.05.09", end: "2022.5.13" }
    }]
  },
  handleSearchInput: function(e:any) {
    this.setData({searchInput: e.detail})
  },
  onLoad: function() {
    wx.getSystemInfo().then(resolve => {
      this.setData({ paddingtop: resolve.safeArea.top })
      const paddingbottom =  resolve.safeArea.bottom - resolve.safeArea.height
      this.setData({ paddingbottom })
    })
  }
})
