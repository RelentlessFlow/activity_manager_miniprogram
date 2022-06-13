import { User } from "./user"

export enum ActivityStatus {
  准备中,
  报名中,
  活动中,
  活动结束,
}

// 活动
export type Activity = {
  id?: string | undefined,
  name: string | undefined, // 名称
  desc: string | undefined, // 描述
  people: number | undefined, // 人数
  category: Category | undefined, // 分类
  theme: Theme | undefined, // 主题
  location: Location | undefined, // 位置
  startTime: Date | undefined | string, // 开始时间
  endTime: Date | undefined | string, // 结束时间
  joinStartTime: Date | undefined | string, 
  joinEndTime: Date | undefined | string // 参与时间
  cover: String | undefined, // 封面
  status: ActivityStatus | undefined
  sponsor: User | undefined // 组织者,
  joinTheme: boolean | undefined // 是否加入专题
}

export type ActivityEntity = {
  id: string
  name: string, // 名称
  desc: string, // 描述
  people: number, // 人数
  category: Category, // 分类
  theme: Theme, // 主题
  location: Location, // 位置
  startTime: Date | string, // 开始时间
  endTime: Date | string, // 结束时间
  joinStartTime: Date | string, 
  joinEndTime: Date | string // 参与时间
  cover: String, // 封面
  status: ActivityStatus
  sponsor: User // 组织者,
  joinTheme: boolean // 是否加入专题
}

export type Category = {
  id?: string | undefined,
  name: string | undefined,
  introduce: string | undefined,
  img: string | undefined,
}

export type Theme = {
  id: string | undefined,
  name: string,
  desc: string,
  startTime: Date,
  endTime: Date,
  img: String
}

export type Location = {
  address: string, // xx市xx区
  latitude: number, // 经纬度
  longitude: number,
  name: string // 具体地点名
}

// 负责一对多关联
export type ActivityThemeCategory = {
  activityId: string,
  themeId: string,
  categoryId: string
}