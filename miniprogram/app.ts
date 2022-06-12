import { IAppOption } from "../typings";
import {getUser} from './api/apiUser'
import {User} from '../typings//types/data/user'

// app.ts
App<IAppOption>({
  globalData: {
    currentUser: null,
  },
  async onLaunch() {
    // 云开发初始化
    wx.cloud.init({
      env: 'cloud1-3gsztpuzcaddc2ec', //填上你的云开发环境id
      traceUser: true,
    })
    // 获取本次存储的当前用户ID
    const userIdAysnc = new Promise<string>(resolve => {
      wx.getStorage({
        key: 'currentUser',
        success (res) {
          resolve((res.data as string))
        }
      })
    })
    // 获取最新的用户信息
    const userId = await userIdAysnc
    if(userId === undefined || userId === null) {
      wx.navigateTo({url: './pages/login/login'})
    }
    const result = await getUser(userId)
    // 找不到用户就直接进登录
    if(result.status) {
      this.globalData.currentUser = result.value
    } else {
      wx.navigateTo({url: './pages/login/login'})
    }
  },
})