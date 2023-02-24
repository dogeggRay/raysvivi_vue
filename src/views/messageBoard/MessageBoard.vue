<template>
  <div class = "inner-container">
      <el-card class="about-card fine-font" shadow="always">
        
        <el-row>
          <el-col :span="24">关于</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">this is aboutPage</el-col>
        </el-row>

        <el-row>
          <el-col :span="24"><CommentView/></el-col>
        </el-row>        
      </el-card>

    </div>
</template>

<script lang="ts" setup>
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