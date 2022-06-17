import { School } from '../../typings/types/data/user'
import {generateUUID} from '../utils/util'
import { ApiResult, getAysnc, postAysnc, rootUrl } from './common'

// 注意value返回的是个数组
export const getSchoolByName = (name: string) => {
  return getAysnc<Array<School>>(`${rootUrl}/schools?name=${name}`)
}

export const getSchools = () => {
  return getAysnc<Array<School>>(`${rootUrl}/schools`)
}