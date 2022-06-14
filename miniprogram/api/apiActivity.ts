import { Activity, ActivityEntity, ActivityStatus, ActivityThemeCategory, Category } from "../../typings/types/data/activity"
import { ApiResult, getAysnc, postAysnc, rootUrl } from "./common"

export const addActivity = async (activity: Activity) => {
  return new Promise<ApiResult>(async (resolve) => {
    const { statusCode: acStatusCode, value: acValue,} = await postAysnc(`${rootUrl}/activities`, activity)
    if (acStatusCode === 201) {
      const { id: activityId, category: { id: categoryId }, school: {id: schoolId}, theme } = acValue as ActivityEntity
      let themeObj = {}
      if(theme != null || theme != undefined) { themeObj = theme }
      const { statusCode: actStatusCode, value: actValue} =
        await postAysnc(`${rootUrl}/activityThemeCategory`, Object.assign({ activityId, categoryId, schoolId }, themeObj)  as ActivityThemeCategory)
      if (actStatusCode === 201) {
        resolve({status: true, statusCode: 201, value: [acValue, actValue], desc: "成功"} as ApiResult)
      }
    }
  })
}

export const getActivities = () => {
  return getAysnc(`${rootUrl}/activities`)
}

export const getActivityStatus = () => {
  return getAysnc(`${rootUrl}/activityStatus`)
}