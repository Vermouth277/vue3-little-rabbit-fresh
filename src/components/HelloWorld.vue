<script setup>
import { getCategoryAPI } from '@/apis/test';
import { onMounted } from 'vue';
import { ref } from 'vue';

const msgTest = ref('请求测试失败。')
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
onMounted(() => {
  getCategoryAPI().then(res => {
    msgTest.value = res.data.msg;
    console.log(res);
  }).catch(err => {
    console.error(err);
  })
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
    <el-button type="primary">{{ msgTest }}</el-button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
