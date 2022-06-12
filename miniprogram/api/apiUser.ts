import {generateUUID} from '../utils/util'
import { ApiResult, getAysnc, postAysnc, putAysnc, rootUrl } from './common'

// 查询全部用户信息
export const getUsers = () => {
  return getAysnc(`${rootUrl}/users`)
}

// 通过手机号获取用户信息
export const getUserByPhone = (phone: string) => {
  return getAysnc(`${rootUrl}/users?phone=${phone}`)
}
// 通过id获取用户信息
export const getUser = (id: string) => {
  return (getAysnc(`${rootUrl}/users/${id}`))
}
// 通过账号密码获取用户信息
export const getUserByPhoneAndPassoword = (phone: string, password: string) => {
  return getAysnc(`${rootUrl}/users?phone=${phone}&password=${password}`)
}

// 用户注册
export const addUsers = async (phone: string, password: string) => {
  const result = await getUserByPhone(phone)
  if(result.value.length === 0) {
    const url = `${rootUrl}/users`
    const data = { phone, password }
    return postAysnc(url, data)
  }else {
    return { value: false, status: false, desc: '手机号已被注册' } as ApiResult
  }
}
// 修改用户资料
export const putUsers = async (userid: string, user: object) => {
  const url = `${rootUrl}/users/${userid}`
  return putAysnc(url, user)
}