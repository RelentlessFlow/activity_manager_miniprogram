import { SwiperSlider } from "../../typings/types/data/swiperSlider"
import { getAysnc, rootUrl } from "./common"

// 首页轮播图API
// 获取全部的轮播图
export const getSwiperSliders = () => {
  return getAysnc<Array<SwiperSlider>>(`${rootUrl}/swiperSlider`)
}