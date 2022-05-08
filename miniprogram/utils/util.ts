export const formatTime = (date: Date) => {
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

const formatNumber = (n: number) => {
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