import { IAppOption } from "../../../typings"
import { User } from "../../../typings/types/data/user"
import { countDown, customNavBack, isUploadFile } from "../../utils/util"
import { putUsers } from '../../api/apiUser'
import { uploadCloud } from '../../api/apiCloudStorage'
const app = <IAppOption>getApp()
// pages/editInfo/editInfo.ts
Page({
  data: {
    user: {} as User,
  },
  handleAvatarTap: function(e:any) { // 处理头像单机
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const path = res.tempFilePaths[0]
        const {user} = _this.data
        user.avatar = path
        _this.setData({ user })
      }
    })
  },

  handleItemTap: function(e:any) { //单机列表项 更改对应字段
    const _this = this
    const { value : v, property : p, label } = e.currentTarget.dataset as {
      value: string, property: keyof typeof _this.data.user, label: string}
    wx.showModal({
      title: `请输入${label}`,
      content: v,
      editable: true,
      placeholderText: `此处输入本人${label}`,
      success (res) {
        if(res.confirm && res.content !== "") {
          const newUser = _this.data.user
          if(p === 'birthday') {
            const data = new Date(res.content)
            newUser['birthday'] = data
          } else {
            newUser[p] = res.content
          }
          _this.setData({user: newUser})
        }
      }
    })
  },
  handleTapSave: async function() {
    const {user} = this.data
    if(user.avatar) {
      const avatarArr = user.avatar?.split('/')
      if(avatarArr[2] === 'tmp') { // 判定为本地图片
        const rs = await uploadCloud(user.avatar, `avatar/${avatarArr[3]}`)
        if(rs.statusCode !== 204) {
          wx.showToast({title: '图片上传失败', icon: 'error'})
          return // 图片上传失败直接返回
        }
        user.avatar = rs.fileID 
        this.setData({user})// 将返回的图片ID保存到用户数据上
      }
    }
    if(user.id) { 
      const rs = await putUsers(user.id, user) 
      if(rs.status) {
        wx.showToast({title: '保存成功'})
        countDown(wx.navigateBack, 1)
      }else {
        wx.showToast({title: '网络请求超时', icon: 'error'})
      }
    }
  },
  onLoad() {

  },

  onReady() {
    const user = app.globalData.currentUser as User
    this.setData({user})
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