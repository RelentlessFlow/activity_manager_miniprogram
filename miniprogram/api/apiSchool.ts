import {generateUUID} from '../utils/util'
import { ApiResult, getAysnc, postAysnc, rootUrl } from './common'

// 注意value返回的是个数组
export const getSchoolByName = (name: string) => {
  return getAysnc(`${rootUrl}/schools?name=${name}`)
}

export const getSchools = () => {
  return getAysnc(`${rootUrl}/schools`)
}