import http from '@/utils/http';

/**
 * 根据id获取此分类数据从而渲染一级页面
 * @param {string} id 
 * @returns 
 */
export const getCategoryDataAPI = (id) => {
  return http({
    url: `/category`,
    params: {id}
  })
}

/**
 * 根据id获取分类数据从而渲染二级页面
 * @param {string} id 
 * @returns 
 */
export const getCategoryFilterAPI = (id) => {
  return http({
    url: `/category/sub/filter`,
    params: {id}
  })
}

/**
 * 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return http({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  })
}