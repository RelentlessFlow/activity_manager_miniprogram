import { ActivityEntity, ActivityStatus, Category } from "../../../typings/types/data/activity"
import { getActivities, getActivityStatus } from "../../api/apiActivity"
import { getCategories } from "../../api/apiCategory"

// pages/activity/activity.ts
Page({
  data: {
    searchInput: '', searchPlaceholder: 'Search',
    activities: [] as Array<ActivityEntity>,
    categories: [] as Array<Category>,   //活动分类 
    status: ['无']  as Array<string>,
    filter: {   // 活动过滤条件
      categoryId: "", status: ""
    },
    pickerIndex: {
      activity: 0, status: 0
    }
  },
  handleBackTap: function() { // 返回导航
    wx.navigateBack()
  },
  handleSearchInput: function(e:any) {  // 搜索表单输入逻辑
    this.setData({searchInput: e.detail})
  },
  handlePickerActivityChange: function(e:any) { // 活动分类选择器逻辑
    let { id } = e.currentTarget.dataset
    const { filter, pickerIndex } = this.data
    filter.categoryId = id
    pickerIndex.activity = e.detail.value
    this.setData({ pickerIndex })
    this.setData({ filter })
  },
  handlePickerStatusChange: function(e:any) { // 活动状态选择器逻辑
    let { id } = e.currentTarget.dataset
    const { filter, pickerIndex } = this.data
    pickerIndex.status = e.detail.value
    this.setData({ pickerIndex })
    this.setData({ filter })
  },
  onLoad() {},
  onReady() {},
  async onShow() {
    const as = await getActivityStatus()
    const cg = await getCategories()
    const ac = await getActivities()
    if(as.statusCode !== 200 || cg.statusCode !== 200 || ac.statusCode !== 200) {
      wx.showToast({'icon': 'error', title: '数据获取失败'})
      return
    }
    this.setData({status: as.value})
    this.setData({categories: cg.value})
    this.setData({activities: ac.value})
  },
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
})