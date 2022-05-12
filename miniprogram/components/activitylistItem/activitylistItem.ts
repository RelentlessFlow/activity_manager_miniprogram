// components/activitylistItem/activitylistItem.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activity: {
      type: Object, 
      value: {
        id: "1",
        cover: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/WX20220508-222713%402x.png',
        name: '妈，我想你了1妈，我想你了',
        type: "实践育人",
        date: { start: "2022.05.09", end: "2022.5.13" },
        status: "规划中"
      }
    }
  },
  data: {

  },
  methods: {
    handleTap: function() { // 前往详情页
      wx.navigateTo({
        url: '../../pages/detail/detail'
      })
    }
  }
})
