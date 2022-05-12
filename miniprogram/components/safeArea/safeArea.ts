// components/safeArea/safeArea.ts
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {},
  data: {
    paddingtop: 0,
  },
  methods: {
  },
  lifetimes: {
    attached: function() {
      wx.getSystemInfo().then(resolve => { this.setData({ paddingtop: resolve.safeArea.top }) })
    },
  }
})
