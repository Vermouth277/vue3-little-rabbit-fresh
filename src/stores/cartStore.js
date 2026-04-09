import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { ref,computed } from "vue";
import { delCartAPI, findNewCartListAPI, insertCartAPI } from "@/apis/cart";

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  const cartList = ref([])

  //获取用户购物车数据
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.data.result
  }

  //加入购物车
  const addCart = async (goods) => {
    const { skuId, count } =goods
    if (isLogin.value) {
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count += count
      } else {
        cartList.value.push(goods)
      }
    }
  }

  //删除
  const delCart = async (skuId) => {
    if (isLogin.value) {
      console.log(skuId);
      
      await delCartAPI([skuId])
      updateNewList()
    } else {
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
  }

  //清除购物车
  const clearCart = () => {
    cartList.value = []
  }

  //总的数量 所有项的count和
  const allCount = computed(() => cartList.value.reduce((a,c) => a + c.count, 0))
  //总价
  const allPrice = computed(() => cartList.value.reduce((a,c) => a + c.count * c.price, 0))

  //购物车列表
  //单选
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }
  //已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  //已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  return {
    cartList,
    updateNewList,
    addCart,
    delCart,
    clearCart,
    allCount,
    allPrice,
    singleCheck,
    allCheck,
    selectedCount,
    selectedPrice,
    isAll
  }
},{
  persist: true
})