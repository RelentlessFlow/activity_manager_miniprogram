import { School } from "../../../../typings/types/data/school"
import { User } from "../../../../typings/types/data/user"
import { getSchools, getSchoolByName } from "../../../api/apiSchool"
import { getUser, getUsers, getUserByPhone } from "../../../api/apiUser"
import { throttle } from '../../../utils/util'

// pages/manager/platform/platform.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInput: "", searchPlaceholder: "请输入学校名称",
    currentType: "school" as "school" | "user" | "",
    hiddenSchools: false, hiddenUsers: true,
    schools: [{}] as Array<School>,
    users: [{}] as Array<User>,
    searchSchools: [{}] as Array<School>, // 搜索学校结果
    searchUsers: [{}] as Array<User>, // 搜索用户结果
    initailSchools: [{}] as Array<School>, // 第一次请求返回的学校结果
    initailUsers: [{}] as Array<User>, // 第一次请求返回的户结果
  },
  handleSearchInput: async function (e: any) {
    this.setData({ searchInput: e.detail }, this.searchDataUpdate)
  },
  handleSwitchTypeTap: function () {
    const { currentType } = this.data
    switch (currentType) {
      case "user":
        this.setData({ currentType: "school" })
        this.setData({ searchPlaceholder: "请输入学校名称" })
        this.setData({ searchInput: "" })
        break;
      case "school":
        this.setData({ currentType: "user" })
        this.setData({ searchPlaceholder: "请输入用户手机号" })
        this.setData({ searchInput: "" })
        break
    }
  },

  //搜索框数据更新（请求）
  searchDataUpdate: async function() {
    const { currentType, searchInput, searchSchools, searchUsers, initailSchools, initailUsers } = this.data
    switch (currentType) {
      case "school":
        if (searchInput !== "") {
          const result = await getSchoolByName(searchInput)
          if (result.statusCode === 200) {
            this.setData({ searchSchools: result.value }, () => {
              this.setData({ schools: searchSchools })
            })
          }
        }
        if (!searchInput) {
          this.setData({ schools: initailSchools })
        }
        break;
      case "user":
        if (searchInput !== "") {
          const result = await getUserByPhone(searchInput)
          if (result.statusCode === 200) {
            this.setData({ searchUsers: result.value }, () => {
              this.setData({ users: searchUsers })
            })
          }
        }
        if (!searchInput) {
          this.setData({ users: initailUsers })
        }
        break
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    const schoolsResult = await getSchools()
    const { statusCode: sStatusCode, value: sValue, desc: sDesc } = schoolsResult
    if (sStatusCode === 200) {
      this.setData({ initailSchools: sValue }, () => {
        this.setData({ schools: this.data.initailSchools })
      })
    } else {
      wx.showToast({ title: sDesc, icon: "error" })
    }
    const userResult = await getUsers()
    const { statusCode: uStatusCode, value: uValue, desc: uDesc } = userResult
    if (uStatusCode === 200) {
      this.setData({ initailUsers: uValue }, () => {
        this.setData({ users: this.data.initailUsers })
      })
    } else {
      wx.showToast({ title: uDesc, icon: "error" })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})