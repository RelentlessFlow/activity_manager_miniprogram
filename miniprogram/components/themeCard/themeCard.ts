Component({
  options: { 
    multipleSlots: true,
    styleIsolation: "apply-shared" 
  },
  properties: {
    theme: {
      type: Object,
      value: {
        cover: "https://activity-1257765810.cos.ap-beijing.myqcloud.com/2fd26bb99b723337a2f8eaba84f7d5bb.jpg",
        title: '全国大学生金融挑战赛',
        date: {start: "2022.04.22", end: "2022.05.17"},
        count: "165"
      }
    }
  },
  data: {},
  methods: {}
})
