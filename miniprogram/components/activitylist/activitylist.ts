// components/activitylist/activitylist.ts
Component({
  properties: {
    activities: {
      type: Object,
      value: [{
        id: "1",
        cover: 'https://activity-1257765810.cos.ap-beijing.myqcloud.com/WX20220508-222713%402x.png',
        name: '妈，我想你了1妈，我想你了',
        type: "实践育人",
        date: { start: "2022.05.09", end: "2022.5.13" }
      }]
    }
  },
  data: {
  },
  methods: {}
})
