import { User } from '../../typings/types/data/user'
import { ApiResult, getAysnc, postAysnc, putAysnc, rootUrl } from './common'

// 查询全部用户信息
export const getUsers = () => {
  return getAysnc<Array<User>>(`${rootUrl}/users`)
}

// 通过手机号获取用户信息
export const getUserByPhone = (phone: string) => {
  return getAysnc<Array<User>>(`${rootUrl}/users?phone=${phone}`)
}
// 通过id获取用户信息
export const getUser = (id: string) => {
  return getAysnc<User>(`${rootUrl}/users/${id}`)
}
// 通过账号密码获取用户信息
export const getUserByPhoneAndPassoword = (phone: string, password: string) => {
  return getAysnc<Array<User>>(`${rootUrl}/users?phone=${phone}&password=${password}`)
}

// 用户注册
export const addUsers = async (phone: string, password: string) => {
  return new Promise<ApiResult<any | User | undefined>>(async (resolve ,reject) => {
    const result = await getUserByPhone(phone)
    if(result.value.length === 0) {
      const url = `${rootUrl}/users`
      const data = { phone, password }
      const pResult = postAysnc<User>(url, data)
      resolve(pResult)
    }else {
      reject({ value: false, status: false, desc: '手机号已被注册' }) 
    }
  })
  
}
// 修改用户资料
export const putUsers = async (userid: string, user: object) => {
  const url = `${rootUrl}/users/${userid}`
  return putAysnc<User>(url, user)
}