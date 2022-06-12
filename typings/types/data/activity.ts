import { User } from "./user"

enum ActivityStatus {
  准备中,
  报名中,
  活动中,
  活动结束,
}

export type Activity = {
  name: string, 
  desc: string, // 描述
  people: number,
  category: Category,
  theme: string | undefined,
  location: Location,
  sponsorUser: User // 组织者
  startTime: Date,
  endTime: Date,
  img: String,
  status: ActivityStatus
}

export type Category = {
  id: string | undefined,
  name: string | undefined,
  introduce: string | undefined,
  img: string | undefined,
}

export type Theme = {
  name: string,
  desc: string,
  startTime: Date,
  endTime: Date,
  img: String
}

export type Location = {
  address: string, // xx市xx区
  latitude: string, // 经纬度
  longitude: string, 
  name: string // 具体地点名
}

// 负责一对多关联
export type ActivityThemeCategory = {
  activityId: string,
  themeId: string,
  categoryId: string
}