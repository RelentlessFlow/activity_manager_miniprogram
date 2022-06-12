import { IAppOption } from "../../../../typings"
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
    if(this.data.value.length !== 18) {
      return false
    }
    return true
  },
  handleTapSave: async function() {
    if(!this.verfity()) {
      wx.showModal({title: '请填写正确的18位身份证号', showCancel: false})
      return
    }
    const user =  app.globalData.currentUser
    if(user) {
      user.idCard = this.data.value
      const result = await putUsers((user.id) as string, user)
      if(result.status) {
        this.setData({"currentUser": user})
        wx.showToast({ title: "保存成功" })
        wx.navigateTo({url: '../schoolSetting/schoolSetting'})
      }else {
        wx.showToast({ title: result.desc })
      }
    }
  },
  onReady() {
    if(app.globalData.currentUser?.idCard != null) {
      this.setData({value: app.globalData.currentUser?.idCard}) 
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