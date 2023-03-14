<template>
  <div class = "inner-container">
      <el-card class="about-card fine-font" shadow="always">
        <el-row>
          <el-col :span="24"></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="24" style="text-align: center;"><span class="title_level_1">留言板</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"></el-col>
          <el-col :span="22"><span class="content">欢迎来到Ray的博客</span></el-col>
        </el-row>
        <el-row class="independent_row">
          <el-col :span="2"></el-col>
          <el-col :span="20"><CommentView :moduleId="'messages'" :relativeId="''"/></el-col>
          <el-col :span="2"></el-col>
        </el-row>        
      </el-card>

    </div>
</template>

<script lang="ts" setup>
import CommentView from '@/views/component/CommentView.vue'
</script>

<style lang="less" scoped>
.about-card{
  min-height:800px;
  margin-left:10px;
  margin-right:10px;
}

.about-card >.el-card__body> .el-row{
  margin-bottom:15px;
}
</style>