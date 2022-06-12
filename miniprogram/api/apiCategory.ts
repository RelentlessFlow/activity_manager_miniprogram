import { getAysnc, rootUrl } from "./common"

export const getCategories = () => {
  return getAysnc(`${rootUrl}/categories`)
}