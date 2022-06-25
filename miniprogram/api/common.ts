export type ApiResult<T> = { value: T, status: boolean, desc: string, statusCode: number }
export const getAysnc = <T>(url: string, query?: Object | Array<Object>) => {
  if (query != undefined) {
    // 拼接查询语句
    let qString = ''
    if (!(query instanceof Array)) {
      const arr = [] as Array<Object>
      arr.push(query)
      query = arr
    }
    for(let q of query as Array<Object>) {
      for (let i = 0; i < Object.keys(q).length; i++) {
        if (i == 0) {
          if (!(qString.startsWith('?'))){qString += '?'}
        }
        qString += `&${Object.keys(q)[i]}=${q[Object.keys(q)[i] as keyof typeof q]}`
      }
    }
    
    url += qString
    console.log(url)
  }
  return new Promise<ApiResult<T>>((resolve, reject) => {
    wx.request({
      url, header: { 'content-type': 'application/json' },
      success(res) {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve({ value: res.data as T, status: true, desc: '成功', statusCode: res.statusCode } as ApiResult<T>)
        }
        if (res.statusCode === 400 || res.statusCode === 404) {
          resolve({ value: res.data, status: false, desc: '请求资源无效', statusCode: res.statusCode } as ApiResult<T>)
        }
      },

      fail() { reject(new Error('请求超时')) }
    })
  })
}
export const postAysnc = <T> (url: string, data: object) => {
  return new Promise<ApiResult<T>>((resolve, reject) => {
    wx.request({
      url, method: "POST", data,
      header: { 'content-type': 'application/json' },
      success(res) {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve({ value: res.data, status: true, desc: '成功', statusCode: res.statusCode } as ApiResult<T>)
        }
        if (res.statusCode === 400 || res.statusCode === 404) {
          resolve({ value: res.data, status: false, desc: '请求资源无效', statusCode: res.statusCode } as ApiResult<T>)
        }
      },
      fail() { reject(new Error('请求超时')) }
    })
  })
}

export const putAysnc = <T>(url: string, data: object) => {
  return new Promise<ApiResult<T>>((resolve, reject) => {
    wx.request({
      url, method: "PUT", data,
      header: { 'content-type': 'application/json' },
      success(res) {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve({ value: res.data, status: true, desc: '成功', statusCode: res.statusCode } as ApiResult<T>)
        }
        if (res.statusCode === 400 || res.statusCode === 404) {
          resolve({ value: res.data, status: false, desc: '请求资源无效', statusCode: res.statusCode } as ApiResult<T>)
        }
      },
      fail() { reject(new Error('请求超时')) }
    })
  })
}

export const rootUrl = 'http://localhost:3004' // 根路径