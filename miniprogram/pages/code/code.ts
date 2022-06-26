//index.js
//获取应用实例
const app = getApp()
const QR = require('../../utils/weapp-qrcode.js')

Page({
  data: {
    qrcodeURL: "",
    codeText: "",
  },
  onLoad: function (options:any) {
    console.log(options.id)
    this.setData({
      codeText: options.id
    })
    this.drawImg();
  },
  // setText: function (e:any) {
  //   this.setData({
  //     codeText: e.detail.value
  //   })
  // },
  drawImg: function () {
    console.log(this.data.codeText);
    var imgData = QR.drawImg(this.data.codeText, {
      typeNumber: 4,
      errorCorrectLevel: 'M',
      size: 500
    })
    this.setData({
      qrcodeURL: imgData
    })
  }
})
