import { IAppOption } from "../../../typings"
import { ActivityEntity } from "../../../typings/types/data/activity"
import { formatDateTime } from "../../utils/util"
const app = <IAppOption>getApp()

type extendType = {
  status? : string,
  isPrincipal? : boolean
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activity: {
      type: Object, 
      value: {} as ActivityEntity
    }
  },
  data: {
    activityDate: {} as (ActivityEntity & extendType),
    isPrincipal: false
  },
  methods: {
    handleTap: function() { // 前往详情页)
      if(this.data.activityDate.isPrincipal) {
        wx.navigateTo({
          url: `../../pages/editActivity/editActivity?id=${this.data.activity.id}`
        })
      } else {
        wx.navigateTo({
          url: `../../pages/detail/detail?id=${this.data.activity.id}`
        })
      }
    },
  },
  observers: {
    "activity": function(activity) {
      // 1. 通过日期处理状态
      const newActivity = activity as (ActivityEntity & extendType)
      const nowTimeStamp = new Date().valueOf()
      if(nowTimeStamp > newActivity.endTime) { // 结束了
        newActivity.status = '已结束'
      } else if(nowTimeStamp > newActivity.startTime && nowTimeStamp < newActivity.endTime){ // 结束了
        newActivity.status = '进行中'
      } else if(nowTimeStamp > newActivity.joinStartTime && nowTimeStamp < newActivity.joinEndTime) { // 报名中
        newActivity.status = '报名中'
      } else if(nowTimeStamp < newActivity.startTime ) { // 准备中
        newActivity.status = '准备中'
      } else {
        newActivity.status = '状态异常'
      }
      // 2. 处理日期显示问题
      for(let k in (newActivity)) {  
        if(k === 'startTime' || k === 'endTime' || k === 'joinStartTime' || k === 'joinEndTime') {
          newActivity[k] = formatDateTime(new Date(newActivity[k]))
        }
      }
      // 3. 处理是否为负责人
      if(app.globalData.currentUser !== null && app.globalData.currentUser.id != undefined) {
        if(newActivity.sponsor.id === app.globalData.currentUser.id) {
          newActivity.isPrincipal = true
        }
      }
      this.setData({activityDate: newActivity})
    }
  },
  lifetimes: {
    attached: function() {
    }
  }
})
