<template>
  <div class = "inner-container">
    <div
        class="infinite-list inner-container"
        style="overflow: auto;"
      >
        <el-card v-for="i in count" :key="i"  class="infinite-list-item"  shadow="always">
            {{ i }}
        </el-card>

         <!-- <div v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</div> -->
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref ,reactive,onMounted ,defineProps,onBeforeUnmount,defineExpose} from 'vue'
import request from '@/utils/request'
const count = ref(10)

onMounted(() => {
  window.addEventListener('scroll', sorlly)
  demoFuncRequest(null)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', sorlly)
})

const sorlly= () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //  可视区域
    let clientHeight = document.documentElement.clientHeight;
    // 页面的高度
    let scrollHeight = document.documentElement.scrollHeight;

    //console.log(scrollTop+"+"+clientHeight+"??"+scrollHeight);
    //如果触底就让index++
    if (scrollTop + clientHeight >= scrollHeight-100) {
      //console.log("sorlly");
        count.value++;
    }
}    

defineExpose({
  sorlly
})

//====================================接口测试===============================================
//查询所有品牌
const demoFuncRequest = (params) => {
  return request({
    url: '/demo/demo',
    method: 'get',
    params,
  })
}
</script>

<style>
.infinite-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  /* background: var(--el-color-primary-light-9); */
  background-color:white;
  margin: 0px 10px 10px 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-bottom: 10px;
}

/* .inner-container::-webkit-scrollbar{
  display:none;
} */

</style>