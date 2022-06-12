export type ApiResult = { value: any, status: boolean, desc: string, statusCode: number }
export const getAysnc = (url: string) => {
  return new Promise<ApiResult>((resolve, reject) => {
    wx.request({
      url, header: { 'content-type': 'application/json' },
      success(res) { 
        if(res.statusCode === 200 || res.statusCode === 201) {
          resolve( { value: res.data, status: true, desc: '成功', statusCode: res.statusCode } as ApiResult) 
        }
        if(res.statusCode === 400 || res.statusCode === 404) {
          resolve( { value: res.data, status: false, desc: '请求资源无效', statusCode: res.statusCode } as ApiResult) 
        }
      },
        
      fail() { reject(new Error('请求超时')) }
    })
  })
}
export const postAysnc = (url: string, data : object) => {
  return new Promise<ApiResult>((resolve, reject) => {
    wx.request({
      url, method: "POST", data,
      header: { 'content-type': 'application/json' },
      success(res) { 
        if(res.statusCode === 200 || res.statusCode === 201) {
          resolve( { value: res.data, status: true, desc: '成功', statusCode: res.statusCode } as ApiResult) 
        }
        if(res.statusCode === 400 || res.statusCode === 404) {
          resolve( { value: res.data, status: false, desc: '请求资源无效', statusCode: res.statusCode } as ApiResult) 
        }
      },
      fail() { reject(new Error('请求超时')) }
    })
  })
}

export const putAysnc = (url: string, data : object) => {
  return new Promise<ApiResult>((resolve, reject) => {
    wx.request({
      url, method: "PUT", data,
      header: { 'content-type': 'application/json' },
      success(res) { 
        if(res.statusCode === 200 || res.statusCode === 201) {
          resolve( { value: res.data, status: true, desc: '成功', statusCode: res.statusCode } as ApiResult) 
        }
        if(res.statusCode === 400 || res.statusCode === 404) {
          resolve( { value: res.data, status: false, desc: '请求资源无效', statusCode: res.statusCode } as ApiResult) 
        }
      },
      fail() { reject(new Error('请求超时')) }
    })
  })
}

export const rootUrl = 'http://localhost:3004' // 根路径