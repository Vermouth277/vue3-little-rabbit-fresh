import http from "@/utils/http"

export const getCategoryAPI = async() => {
  return await http({
    url: 'home/category/head'
  })
}