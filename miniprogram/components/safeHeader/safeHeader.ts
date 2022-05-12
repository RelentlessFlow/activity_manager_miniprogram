Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {},
  data: {
    margintop: 0
  },
  methods: {
    hanldeBackClick: function() {
      this.triggerEvent("tapback")
    }
  },
  lifetimes: {
    attached: function() {
      wx.getSystemInfo().then(resolve => {
        this.setData({margintop: resolve.statusBarHeight + 20})
      })
    },
  }
})
