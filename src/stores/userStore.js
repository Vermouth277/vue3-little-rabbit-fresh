import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";

export const useUserStore = defineStore('user', () => {
  //用户数据
  const userInfo = ref({})

  const getUserInfo = async ({ account, password }) => {
    console.log(account,password);
    
    const res = await loginAPI({ account, password })
    console.log(res);
    
    userInfo.value = res.data.result
  }

  const clearUserInfo = () => {
    userInfo.value = {}

  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true
})