import http from "@/utils/http";

/**
 * 获取商品详情
 * @param {string} id 商品Id
 * @returns 
 */
export const getDetailAPI = (id) => {
  return http({
    url: '/goods',
    params: {id}
  })
}

export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return http({
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  })
}