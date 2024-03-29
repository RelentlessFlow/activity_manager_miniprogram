import { IAppOption } from "../../../typings"
import { getUserByPhoneAndPassoword } from "../../api/apiUser"
import { countDown } from "../../utils/util"
const app = getApp<IAppOption>()
Page({
  data: {
    phone: "",
    password: "",
    agree: false,
    verify: false,
  },
  onLoad() {},
  onReady() {},
  handlePhoneInputChange: function (e: any) { // 处理手机号输入
    this.setData({ phone: e.detail.value }, this.handleVerifyPass)
  },
  handlePassInputChange: function (e: any) { // 处理密码输入
    this.setData({ password: e.detail.value }, this.handleVerifyPass)
  },
  handleTapAgreeButton: function () { // 同意按钮点击UI逻辑
    const { agree } = this.data
    this.setData({ agree: !agree }, this.handleVerifyPass)
  },
  handleVerifyPass: function () { // 表单验证通过(前台)
    let { phone, password, agree } = this.data
    let pattern = new RegExp("^1[34578][0-9]{9}$", 'i'); // 手机号正则匹配
    if (phone != "" && pattern.test(phone) && password != "" && agree) {
    this.setData({ verify: true })
    } else {
      this.setData({ verify: false })
    }
  },
  handleTapLoginButton: async function () { // 登录按钮点击逻辑
    const {phone, password} = this.data
    const result = await getUserByPhoneAndPassoword(phone, password)
    if(result.statusCode === 200) {
      app.globalData.currentUser = result.value[0]
      wx.setStorage({
        key:"currentUser",
        data:app.globalData.currentUser?.id
      })
      wx.showToast({ title: `${result.desc}`, duration: 1000 })
      setTimeout(()=> {
        wx.switchTab({"url": '../index/index'})
      }, 1000)
    } else {
      wx.showToast({ title: `${result.desc}`,icon: 'error', duration: 2000 })
    }
  },
  handleTapRegisterButton: function () {
    wx.navigateTo({ 
      "url": '../register/register'
     })
  }
})