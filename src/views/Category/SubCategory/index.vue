<script setup>
import GoodsItem from '@/views/Home/components/GoodsItem.vue';
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { onMounted, ref } from 'vue';

const categoryData = ref({});
const route = useRoute();

const getCategoryData = async (id) => {
  const res = await getCategoryFilterAPI(id);
  categoryData.value = res.data.result;
  // console.log(categoryData.value);
}

const goodList = ref([]);
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})  

const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value);
  console.log(res);
  goodList.value = res.data.result.items;
}

// tab切换回调
const tabChange = () => {
  console.log('tab切换了', reqData.value.sortField)
  reqData.value.page = 1
  getGoodList()
}

// 加载更多
const disable = ref(false)
const load = async (direction) => {
  console.log( '加载更多了', direction);
  console.log(disable.value);
  
  if (disable.value) return

  if (direction !== 'bottom') return
  
  disable.value = true
  console.log('加载更多数据咯')
  // 获取下一页的数据
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = [...goodList.value, ...res.data.result.items]
  console.log(res.data.result.items.length);
  
  // // 加载完毕 停止监听
  if (res.data.result.items.length === 0) {
    disable.value = true
  } else {
    disable.value = false
  }
}

onBeforeRouteUpdate((to) => {
  getCategoryData(to.params.id);
})
onMounted(() => {
  getCategoryData(route.params.id);
  getGoodList();
})
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <el-scrollbar view-class="body" height="calc(100vh)" distance="40" @end-reached="load">
        <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  :deep(.body) {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>