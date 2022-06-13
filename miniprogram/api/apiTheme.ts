import { getAysnc, rootUrl } from "./common"

export const getThemes = () => {
  return getAysnc(`${rootUrl}/themes`);
}