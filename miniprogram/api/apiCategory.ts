import { Category } from "../../typings/types/data/activity"
import { getAysnc, rootUrl } from "./common"

export const getCategories = () => {
  return getAysnc<Array<Category>>(`${rootUrl}/categories`)
}