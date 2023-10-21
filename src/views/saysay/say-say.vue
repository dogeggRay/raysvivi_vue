<template>
  <div class="fine-font">
    <el-date-picker style="margin-left:50px"
          v-model="saysayRequest.startDateTime"
          type="year"
          placeholder="Pick a year"
          size="small"
          @change="refreshSaysay"
          value-format="YYYY-MM-DD hh:mm:ss "
        />
      <el-timeline style="margin-left:50px;margin-top:20px">
        <el-timeline-item :id="item.id" v-for="(item,index) in saysayList" :key="index" center :timestamp="item.createTime" placement="top">
          <el-card>
            <h4>
              <a v-if="item.link" style="font-style:italic" :href="item.link" target="_blank">{{item.context}}</a>
              <span v-else>{{item.context}}</span>
              
              </h4>
            <p>{{item.content}}<img v-if="item.meme" :src="item.meme" style="width: 40px;"/></p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
  </div>
</template>
<script lang="ts" setup>
import { ref ,reactive,onMounted} from 'vue'
import {getSaysayList} from "@/js/blog.js"
const saysayList = ref([])
const saysayRequest = reactive({
  startDateTime:"2023-01-01 00:00:01"
})

onMounted(() => {
  refreshSaysay()
})

const refreshSaysay = () =>{
  getSaysayList(saysayRequest).then((res)=>{
    saysayList.value = res.data;
  }).catch((err)=>{
    console.log(err)
  })
}
</script>
<style lang="less" scoped >
:deep(.el-timeline-item__timestamp){
    color: royalblue;
}
</style>