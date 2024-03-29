import { IAppOption } from "../../../../typings"
import { School } from "../../../../typings/types/data/user"
import { getSchoolByName } from "../../../api/apiSchool"
import {putUsers} from "../../../api/apiUser"
const app = getApp<IAppOption>()
Page({

  data: {
    value: "",
  },
  handleInputValue: function(e:any) {
    const {value} = e.detail
    this.setData({value})
  },
  verfity: function() {
    if(this.data.value.length <= 2) {
      return false
    }
    return true
  },
  handleTapSave: async function() {
    if(!this.verfity()) {
      wx.showModal({ title: "请填写正确的学校全称", showCancel: false })
      return
    }
    const result = await getSchoolByName(this.data.value)
    if(result.value.length === 0) {
      wx.showModal({ title: "您所在的学校未开通此服务，敬请期待！", showCancel: false })
      return
    }
    const user =  app.globalData.currentUser
    if(user) {
      user.school = result.value[0]
      const userResult = await putUsers((user.id) as string, user)
      if(userResult.status) {
        this.setData({'currentUser':user})
        wx.showToast({ title: "保存成功" })
        wx.navigateTo({url: '../majorSetting/majorSetting'})
      }else {
        wx.showToast({ title: result.desc })
      }
    }
  },

  onReady() {
    if(app.globalData.currentUser?.school != undefined) {
      this.setData({value: app.globalData.currentUser?.school.name}) 
    }
  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },

  onShareAppMessage() {

  }
})