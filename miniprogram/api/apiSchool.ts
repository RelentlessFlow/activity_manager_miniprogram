import {generateUUID} from '../utils/util'
import { ApiResult, getAysnc, postAysnc, rootUrl } from './common'

export const getSchoolByName = (name: string) => {
  return getAysnc(`${rootUrl}/schools?name=${name}`)
}

export const getSchools = () => {
  return getAysnc(`${rootUrl}/schools`)
}