import { Activity, ActivityEntity, ActivityStatus, ActivityThemeCategory, Category } from "../../typings/types/data/activity"
import { ApiResult, postAysnc, rootUrl } from "./common"

export const addActivity = async (activity: Activity) => {
  return new Promise<ApiResult>(async (resolve) => {
    const { statusCode: acStatusCode, value: acValue,} = await postAysnc(`${rootUrl}/activities`, activity)
    if (acStatusCode === 201) {
      const { id: activityId, category: { id: categoryId }, theme: { id: themeId } } = acValue as ActivityEntity
      const { statusCode: actStatusCode, value: actValue} =
        await postAysnc(`${rootUrl}/activityThemeCategory`, { activityId, categoryId, themeId } as ActivityThemeCategory)
      if (actStatusCode === 201) {
        resolve({status: true, statusCode: 201, value: [acValue, actValue], desc: "成功"} as ApiResult)
      }
    }
  })
}