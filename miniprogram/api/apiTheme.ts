import { Theme } from "../../typings/types/data/activity";
import { getAysnc, rootUrl } from "./common"

export const getThemes = () => {
  return getAysnc<Array<Theme>>(`${rootUrl}/themes?_sort=startTime&_order=desc`);
}

export const getFirstTheme = () => {
  return getAysnc<Array<Theme>>(`${rootUrl}/themes?_sort=startTime&_order=desc&_limit=1`);
}