import { customNavBack } from "../../utils/util"

// pages/editInfo/editInfo.ts
Page({
  data: {
    user: {
      avatar : { value: "../../image/avatar.png", editable: true},
      name: { value: "苑紫清", editable: true },
      nickName: { value: "爱吃辣的机器人", editable: true },
      introduce: { value: "Stay foolish, Stay hungry.", editable: true },
      favorite: { value: "剧本杀，读书分享会", editable: true },
      birthday: { value: "2000-05-11", editable: true },
      idCard:  { value: "21100220000511121X", editable: true },
      school: { value: "河北传媒学院", editable: true },
      major: { value: "信息技术与管理学院——物联网工程", editable: true },
      nation: { value: "汉族", editable: true },
      location: { value: "河北石家庄", editable: true },
      hometown: { value: "辽宁辽阳", editable: true }
    }
   
  },
  handleAvatarTap: function(e:any) {
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        _this.setData({cover: res.tempFilePaths[0]})
      }
    })
  },
  handleItemTap: function(e:any) {
    const _this = this
    const { value : v, property : p } = e.currentTarget.dataset as {
      value: string, property: keyof typeof _this.data.user}
    wx.showModal({
      title: '输入内容',
      content: v,
      editable: true,
      placeholderText: v,
      success (res) {
        if(res.confirm) {
          const newUser = _this.data.user
          newUser[p].value = res.content
          _this.setData({user: newUser})
        }
      }
    })
  },
  handleTapSave: function() {
    console.log('handleTapSave')
    wx.navigateBack()
  },
  onLoad() {

  },

  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onShareAppMessage() {

  }
})