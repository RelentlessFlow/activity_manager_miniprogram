// components/safeFooter/safeFooter.ts
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    
  },
  data: {
    marginbottom: 50
  },
  methods: {

  },
  lifetimes: {
    attached: function() {
      wx.getSystemInfo().then(resolve => {
        const { bottom, height } = resolve.safeArea
        this.setData({ marginbottom: bottom - height })
      })
    },
  }
})
