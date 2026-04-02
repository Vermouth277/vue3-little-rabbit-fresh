import http from "@/utils/http";

/**
 * 获取轮播图
 * @param {*} distributionSite 默认值为1，1代表首页，2代表分类页 
 * @returns 
 */
export const getBannerAPI = ({ distributionSite = 1 } = {}) => {
  return http({
    url: "/home/banner",
    params: {
      distributionSite
    } 
  })
}

/**
 * 获取人气推荐
 * @returns 
 */
export const getHotAPI = () => {
  return http({
    url: "home/hot"
  })
}

/**
 * 获取新鲜好物
 * @returns 
 */
export const findNewAPI = () => {
  return http({
    url: "home/new"
  })
}

/**
 * 获取 所有商品模块
 * @returns 
 */
export const getGoodsAPI = () => {
  return http({
    url: "home/goods"
  })
}
