import { School } from "./user"

export type UserInfo = {
  id: string | undefined,
  phone: string | undefined,
  name: string | undefined,
  avatar: string | undefined, 
  nickName: string | undefined,
  school: School | undefined,
  major: string | undefined,
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
  startTime: Date | undefined | string| number, // 开始时间
  endTime: Date | undefined | string | number, // 结束时间
  joinStartTime: Date | undefined | string | number, 
  joinEndTime: Date | undefined | string | number // 参与时间
  cover: string | undefined, // 封面
  sponsor: UserInfo | undefined, // 组织者,
  joinTheme: boolean | undefined, // 是否加入专题
  school: School | undefined
}

export type ActivityEntity = {
  id: string
  name: string, // 名称
  desc: string, // 描述
  people: number, // 人数
  category: Category, // 分类
  theme?: Theme | undefined | null, // 主题
  location: Location, // 位置
  startTime: Date | string | number, // 开始时间
  endTime: Date | string | number, // 结束时间
  joinStartTime: Date | string | number, 
  joinEndTime: Date | string | number, // 参与时间
  cover: String, // 封面
  sponsor: UserInfo, // 组织者,
  joinTheme: boolean, // 是否加入专题
  school: School
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
  startTime: Date | number,
  endTime: Date | number,
  img: String,
  stick?: boolean
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
  themeId?: string | undefined | null,
  categoryId: string,
  schoolId: string
}

export type ActivityParticipator = {
  activityId: string,
  participator: UserInfo,
  isDispose: boolean,
  dsResult: boolean,
  id?: string
}