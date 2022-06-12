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