import http from "@/utils/http";

// 登录验证
export const loginAPI = ({ account, password }) => {
  return http({
    url: 'login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}