<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { clearUserInfo } = userStore

const confirm = () => {
  clearUserInfo()
  router.push('/login')
}

onMounted(() => {
  console.log(userInfo.value);
  
})
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userInfo?.token">
          <li><a href="javascript:;"><i class="iconfont icon-person"></i><span>{{ userInfo.nickname }}</span></a></li>
          <li>
            <el-popconfirm title="确认退出吗？" confirmButtonText="确认" cancelButtonText="取消" @confirm="confirm">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员收藏</a></li>
        </template>

        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        position: relative;
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          position: absolute;
          top: -5px;
          left: -7px;
          font-size: 20px;
          display: block;
          margin-top: 3px;
          margin-right: 2px;
          color: #cdcdcd;
        }

        &:hover {
          color: $xtxColor;
          background-color: #333;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>