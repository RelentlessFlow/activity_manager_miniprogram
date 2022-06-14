import { IAppOption } from "../../../typings"
import { User } from "../../../typings/types/data/user"
import { countDown, customNavBack, isUploadFile } from "../../utils/util"
import { putUsers } from '../../api/apiUser'
import { uploadFast } from '../../api/apiCloudStorage'
import { getSchoolByName } from "../../api/apiSchool"
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
        console.log(path)
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
      async success (res) {
        if(res.confirm && res.content !== "") {
          const newUser = _this.data.user
          if(p === 'school') {
            const schoolsRs = await getSchoolByName(res.content)
            if(schoolsRs.value.length === 0) {
              wx.showModal({title: '学校未开通次服务，敬请期待。', showCancel: false})
              return
            }
            newUser['school'] = schoolsRs.value[0]
          }else {
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
      const result = await uploadFast(user.avatar, 'avatar')
      if(result) {
        user.avatar = result as string
        this.setData(user)
      }
    }
    if(user.id) { 
      const rs = await putUsers(user.id, user) 
      if(rs.status) {
        wx.showToast({title: '保存成功'})
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
      }else {
        wx.showToast({title: '网络请求超时', icon: 'error'})
      }
    }
  },
  handleTapLoginOut: function() {
    wx.clearStorageSync()
    wx.navigateTo({url: '../login/login'})
  },
  onLoad() {

  },

  onReady() {
    const user = app.globalData.currentUser
    if(user !== null) {
      this.setData({user})
    }
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