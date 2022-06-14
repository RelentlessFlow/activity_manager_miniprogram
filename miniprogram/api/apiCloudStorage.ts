export const uploadCloud = (location: string, target: string) => {
  return new Promise<ICloud.UploadFileResult>((resolve, reject) =>{
    wx.cloud.uploadFile({
      cloudPath: target, // 上传至云端的路径
      filePath: location, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log(res.fileID)
        resolve(res)
      },
      fail: () => {reject(new Error('上传文件失败'))}
    })
  })
}

/**
 * 将本地临时存储的图片上传到云端
 * @param path 图片本地路径 http://tem........
 * @param target 上传云端地址 eg : avatar => avatar/filename.png
 */
export const uploadFast = async (path: string, target: string) => {
  if(path) {
    const pathArr = path?.split('/')
    if(pathArr[2] === 'tmp') { // 判定为本地图片
      const rs = await uploadCloud(path, `${target}/${pathArr[3]}`)
      if(rs.statusCode !== 204) {
        wx.showToast({title: '图片上传失败', icon: 'error'})
        throw new Error('上传失败') // 图片上传失败直接返回
      }
      return rs.fileID 
    } else {
      return false
    }
  } else {
    throw new Error('文件路径错误')
  }
}