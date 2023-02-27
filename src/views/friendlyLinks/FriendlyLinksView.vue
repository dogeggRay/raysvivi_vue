<template>
  <div class = "inner-container">
      <el-card class="about-card fine-font" shadow="always">
        
        <el-row>
          <el-col :span="24"></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="24" style="text-align: center;"><span class="title_level_1">友情链接</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"></el-col>
          <el-col :span="22"><span class="content">没有友情链接</span></el-col>
        </el-row>     
      </el-card>

    </div>
</template>

<script lang="ts" setup>
import { ref ,onMounted,onBeforeUnmount } from 'vue'
const editorInstance = ref()
function handleChange (item) {
    console.log('change', item)
}

</script>

<style lang="less" scoped>
.about-card{
  height:800px;
  margin-left:10px;
  margin-right:10px;
}

.about-card >.el-card__body> .el-row{
  margin-bottom:15px;
}
</style>