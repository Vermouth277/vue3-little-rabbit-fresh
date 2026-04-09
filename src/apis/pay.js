import http from '@/utils/http'

export const getPayInfoAPI = (id) => {
  return http({
    url: `/member/order/${id}`
  })
}