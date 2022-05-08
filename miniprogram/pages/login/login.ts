// pages/login/login.ts
Page({
  data: {
    margintop: 0,
    phone: "",
    password: "",
    agree: false,
    verify: false,
  },
  onLoad() {
    wx.getSystemInfo().then(resolve => {
      this.setData({ 'margintop': resolve.safeArea.top })
    })
  },
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
  handleTapLoginButton: function () { // 登录按钮点击逻辑
    console.log('ccc')
  },
  handleVerifyPass: function () { // 表单验证通过(前台)
    let { phone, password, agree } = this.data
    if (phone != "" && password != "" && agree) {
      this.setData({ verify: true })
    } else {
      this.setData({ verify: false })
    }
  },
})