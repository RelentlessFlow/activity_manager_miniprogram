import { ActivityEntity } from "../../../typings/types/data/activity"

// components/activitylistItem/activitylistItem.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    toEdit: {
      type: Boolean, value: false
    },
    activity: {
      type: Object, 
      value: {} as ActivityEntity
    }
  },
  data: {

  },
  methods: {
    handleTap: function() { // 前往详情页
      if(this.properties.toEdit) {
        wx.navigateTo({
          url: '../../pages/editActivity/editActivity'
        })
      } else {
        wx.navigateTo({
          url: '../../pages/detail/detail'
        })
      }
      
    },
  }
})
