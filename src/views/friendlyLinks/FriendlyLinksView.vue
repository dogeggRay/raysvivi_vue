<template>
  <div class = "inner-container">
      <el-card class="about-card fine-font" shadow="always">
        
        <el-row>
          <el-col :span="24"></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="24" style="text-align: center;"><span class="title_level_1">友情链接</span></el-col>
        </el-row>
        
        <div style="padding-left:5%;">
          <div class="friendly-module">
                    <el-card class="infinite-list-item friendly-link-card fine-font gray-font" shadow="hover">
                        <el-container>
                          <el-header>Header</el-header>
                          <el-main>Main</el-main>
                        </el-container>   
                    </el-card>                                               
          </div>
          <div class="friendly-module">
                    <el-card class="infinite-list-item friendly-link-card fine-font gray-font" shadow="hover">
                        <el-container>
                          <el-header>Header</el-header>
                          <el-main>Main</el-main>
                        </el-container>   
                    </el-card>                                               
          </div>
          <div class="friendly-module">
                    <el-card class="infinite-list-item friendly-link-card fine-font gray-font" shadow="hover">
                        <el-container>
                          <el-header>Header</el-header>
                          <el-main>Main</el-main>
                        </el-container>   
                    </el-card>                                               
          </div>
        </div>
 
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

.friendly-module{
  padding-left:5%;width: 40%; float:left;height:85px;padding-top:5px
}
.friendly-link-card{
  cursor:pointer;
  height:100%
}
</style>