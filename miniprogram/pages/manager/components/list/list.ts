// pages/manager/components/list/list.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean, value: true
    },
    title: {
      type: String, value: "列表"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTitleTap:function() {
      this.triggerEvent('titletap')
    }
  }
})
