<template>
  <div class = "inner-container">
      <el-card class="about-card fine-font" shadow="always">
        
        <el-row>
          <el-col :span="24">关于</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">友情链接

          </el-col>
        </el-row><el-row>
          <el-col :span="24"></el-col>
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