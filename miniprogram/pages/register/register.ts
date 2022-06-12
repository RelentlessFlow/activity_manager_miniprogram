import { IAppOption } from '../../../typings'
import {addUsers} from '../../api/apiUser'
const app = getApp<IAppOption>()

Page({
  data: {
    phone: "",
    password: "",
    confirmPassword: "",
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
  handleConfirmPassInputChange: function (e: any) { // 处理密码输入
    this.setData({ confirmPassword: e.detail.value }, this.handleVerifyPass)
  },
  handleTapAgreeButton: function () { // 同意按钮点击UI逻辑
    const { agree } = this.data
    this.setData({ agree: !agree }, this.handleVerifyPass)
  },
  handleVerifyPass: function () { // 表单验证通过(前台)
    let { phone, password, agree, confirmPassword } = this.data
    let pattern = new RegExp("^1[34578][0-9]{9}$", 'i'); // 手机号正则匹配
    if (phone != "" && pattern.test(phone) && password != "" && confirmPassword != "" && confirmPassword === password && agree) {
    this.setData({ verify: true })
    } else {
      this.setData({ verify: false })
    }
  },
  handleTapRigisterButton: async function () { // 注册按钮点击逻辑
    const result = await addUsers(this.data.phone, this.data.password)
    if(result.status) {
      app.globalData.currentUser = result.value
      this.setData({
        'currentUser': result.value
      })
      wx.setStorage({
        key:"currentUser",
        data:app.globalData.currentUser?.id
      })
      wx.switchTab({"url": '../index/index'})
    } else {
      wx.showToast({ title: `${result.desc}`, icon: 'error', duration: 2000 })
    }
  },
})