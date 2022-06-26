import { IAppOption } from "../../typings"
import { Activity, ActivityEntity, ActivityParticipator, ActivityThemeCategory, Category, UserInfo } from "../../typings/types/data/activity"
import { ApiResult, getAysnc, postAysnc, putAysnc, rootUrl } from "./common"
const app = getApp<IAppOption>()

// 添加活动信息
export const addActivity = async (activity: Activity) => {
  return new Promise<ApiResult<ActivityEntity | [ActivityEntity, ActivityThemeCategory]>>(async (resolve, reject) => {
    const acResult = await postAysnc<ActivityEntity>(`${rootUrl}/activities`, activity)
    const { statusCode: acStatusCode, value: acValue, } = acResult
    if (acStatusCode === 201) {
      const { id: activityId, category: { id: categoryId }, school: { id: schoolId }, theme } = acValue as ActivityEntity
      let themeObj = {}
      if (theme != null || theme != undefined) { themeObj = { 'themeId': theme.id } }
      const actEntity = Object.assign({ activityId, categoryId, schoolId }, themeObj) as ActivityThemeCategory
      const atcResult = await postAysnc<ActivityThemeCategory>(`${rootUrl}/activityThemeCategory`, actEntity as ActivityThemeCategory)
      const { statusCode: actStatusCode, value: actValue } = atcResult
      if (actStatusCode === 201) {
        resolve({ status: true, statusCode: 201, value: [acValue, actValue], desc: "成功" })
      } else {
        reject({ status: true, statusCode: 201, value: [acValue, actValue], desc: "失败" })
      }
    } else {
      reject(acResult)
    }

  })
}

// 修改活动信息
export const putActivity = async (activity: Activity) => {
  return new Promise<ApiResult<ActivityEntity | [ActivityEntity, ActivityThemeCategory]>>(async (resolve, reject) => {
    const acResult = await postAysnc<ActivityEntity>(`${rootUrl}/activities`, activity)
    const { statusCode: acStatusCode, value: acValue, } = acResult
    if (acStatusCode === 200) {
      const { id: activityId, category: { id: categoryId }, school: { id: schoolId }, theme } = acValue as ActivityEntity
      const atcResult = await getAysnc<Array<ActivityThemeCategory>>(`${rootUrl}/activityThemeCategory?activityId=${activityId}`)
      if (atcResult.statusCode !== 200 || atcResult.value.length === 0) { reject(atcResult) }
      let actId = atcResult.value[0].id
      let themeObj = {}
      if (theme != null || theme != undefined) { themeObj = { 'themeId': theme.id } }
      const actEntity = Object.assign({ activityId, categoryId, schoolId }, themeObj) as ActivityThemeCategory
      const { statusCode: actStatusCode, value: actValue } =
        await putAysnc<ActivityThemeCategory>(`${rootUrl}/activityThemeCategory/${actId}`, actEntity as ActivityThemeCategory)
      if (actStatusCode === 200) {
        resolve({ status: true, statusCode: 200, value: [acValue, actValue], desc: "成功" })
      } else {
        reject({ status: true, statusCode: 201, value: [acValue, actValue], desc: "失败" })
      }
    } else {
      reject(acResult)
    }
  })
}

// 获取全部活动信息
export const getActivities = (q = [] as Array<Object>) => {
  return getAysnc<Array<ActivityEntity>>(`${rootUrl}/activities`, q)
}

// 查询活动信息查询参数
export type ActivitiesQuery = {
  activityId?: string
  categoryId?: string,
  schoolId?: string,
  themeId?: string,
  "sponsor.id"?: string,
}

// 查询活动信息（带查询）(外键查询)
export const getActivitiesQuery = async (q = [] as Array<ActivitiesQuery>) => {
  return new Promise<ApiResult<Array<ActivityEntity>>>(async (resolve, reject) => {
    const actResult = await getAysnc<Array<ActivityThemeCategory>>(`${rootUrl}/activityThemeCategory`, q)
    if (actResult.statusCode === 200) {
      const ids = []
      for (let act of actResult.value as Array<ActivityThemeCategory>) {
        ids.push({ id: act.activityId })
      }
      if (ids.length > 0) {
        const acResult = getAysnc<Array<ActivityEntity>>(`${rootUrl}/activities`, ids)
        resolve(acResult)
      } else {
        reject(actResult)
      }
    } else {
      reject(actResult)
    }
  })
}

// 获取本校活动信息
export const getActivitiesQuerySchools = async (q = [] as Array<ActivitiesQuery>) => {
  q.push({ schoolId: app.globalData.currentUser?.school?.id })
  return getActivitiesQuery(q)
}

// ID获取单个活动信息
export const getActivity = (id: string) => {
  return getAysnc<Activity>(`${rootUrl}/activities/${id}`)
}

// 添加参与者信息
export const addParticipator = (activityId: string, participator: UserInfo) => {
  const obj = { activityId, participator, isDispose: false, dsResult: false } as ActivityParticipator
  return postAysnc<ActivityParticipator>(`${rootUrl}/activityParticipators`, obj)
}

// 通过用户ID查找参与者信息
export const getParticipatorsByUserId = (userId: string, activityId?: string) => {
  const query = { userId }
  if (activityId !== undefined) { Object.assign({ activityId }) }
  return getAysnc<Array<ActivityParticipator>>(`${rootUrl}/activityParticipators`, query)
}

// 通过用户ID查找用户参与过的全部活动与活动信息。
export const getParticipatorsAndActivitiesByUserId = (userId: string) => {
  return new Promise<ApiResult<Array<ActivityEntity>>>(async (resolve, reject) => {
    const ppResult: ApiResult<Array<ActivityParticipator>> = await getParticipatorsByUserId(userId)
    if (ppResult.statusCode !== 200) { reject(ppResult) }
    const query = ppResult.value.map(item => { return { id: item.activityId } })
    resolve(await getAysnc<Array<ActivityEntity>>(`${rootUrl}/activities`, query))
  })
}

// 通过活动ID查找啊参与者信息
export const getParticipatorsByActivityId = (activityId: string) => {
  return getAysnc<Array<ActivityParticipator>>(`${rootUrl}/activityParticipators?activityId=${activityId}`)
}

// ID定位到参与者信息（单个）
export const getParticipator = (id: string) => {
  return getAysnc<ActivityParticipator>(`${rootUrl}/activityParticipators/${id}`)
}

// 修改参与者信息
export const putParticipators = async (id: string, dispose: boolean) => {
  return new Promise<ApiResult<ActivityParticipator>>(async (resolve, reject) => {
    const pResult = await getParticipator(id)
    if (pResult.statusCode === 200 && pResult.value.id != undefined) {
      const pObj = pResult.value
      pObj.dsResult = dispose
      pObj.isDispose = true
      const putResult = putAysnc<ActivityParticipator>(`${rootUrl}/activityParticipators/${id}`, pObj)
      resolve(putResult)
    } else {
      reject(pResult)
    }
  })
}
//扫码签到
export const putSignInSatus = async (activityId: string, userId: string) => {
  return new Promise<ApiResult<ActivityParticipator>>((async (resolve, reject) => {
    const activityResult = await getActivity(activityId)
    if (activityResult.statusCode !== 200) {
      reject({ statusCode: 500, status: false, desc: "参数异常", value: {} } as ApiResult<ActivityParticipator>)
      return
    }
    const { startTime, endTime } = activityResult.value
    if (typeof startTime !== "number" || typeof endTime !== "number") {
      reject({ statusCode: 500, status: false, desc: "参数异常", value: {} } as ApiResult<ActivityParticipator>)
      return
    }
    const nowTimeStamp = new Date().valueOf()
    if (nowTimeStamp <= startTime || nowTimeStamp >= endTime) {
      resolve({ statusCode: 200, status: true, desc: "活动已结束", value: {} } as ApiResult<ActivityParticipator>)
    }
    const apResult = await getAysnc<Array<ActivityParticipator>>(`${rootUrl}/activityParticipators?activityId=${activityId}&participator.id=${userId}`)
    if (apResult.statusCode !== 200 || apResult.value.length < 1) {
      resolve({ statusCode: 200, status: false, desc: "参数错误", value: {} } as ApiResult<ActivityParticipator>)
    }
    const putObj = apResult.value[0]
    putObj.singIn = true
    return putAysnc(`${rootUrl}/activityParticipators/${putObj.id}`, putObj)
  }
  ))
}