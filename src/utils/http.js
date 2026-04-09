import { useUserStore } from '@/stores/userStore'
import axios from 'axios'
import { ElMessage } from 'element-plus/es/components/message/index.mjs'

const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    console.log(config.url);
    
    if (token && (config.url.startsWith('member') || config.url.startsWith('/member'))) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  })

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    ElMessage({
      message: error.response.data.message || '请求失败',
      type: 'error'
    })
    return Promise.reject(error);
})

export default http