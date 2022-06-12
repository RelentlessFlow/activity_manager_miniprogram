export const formatDateTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

export const formatDate = (date: Date) => {
  let nowMonth = date.getMonth() + 1 + '';
  let strDate = date.getDate() + '';
  let seperator = "-";
  // 对月份进行处理，1-9月在前面添加一个“0”˜
  if (parseInt(nowMonth) >= 1 && parseInt(nowMonth) <= 9) {
    nowMonth = "0" + nowMonth;
  }
  // 对月份进行处理，1-9号在前面添加一个“0”
  if (parseInt(strDate) >= 0 && parseInt(strDate) <= 9) {
    strDate = "0" + strDate;
  }
  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  let nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
  return nowDate
}

export const formatTime = (date: Date) => {
  return `${date.getHours()}:${date.getMinutes()}`
}

export const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}


export const countDown = (callback: Function, second: number) => {
  return new Promise(resolve => {
    var i = second - 1;
    var myInter = setInterval(() => {
      if (i < 1) {
        resolve(true)
        clearInterval(myInter);
      }
      callback();
      i--;
    }, 1000);
  })
}

export const customNavBack = (value= '') => {
  const cp = getCurrentPages()
    const {route} =  cp[cp.length-2]
    wx.navigateTo({
      url: `/${route}?value=${value as string}`
    })
}

export const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}


export const isUploadFile = (path: string) => {
  const pathArr = path.split('/')
  if(pathArr[2] === 'tmp') {
    return true
  }
  return false
}

/**
 * 节流
 * @param {function} fn
 * @param {number} delay
 */
export function throttle(fn: Function, delay = 500){
  let timer: any = null
  return () =>{
      if(timer) return
      timer = setTimeout(()=>{
          fn.apply(this, arguments)
          timer = null
      }, delay)
  }
}