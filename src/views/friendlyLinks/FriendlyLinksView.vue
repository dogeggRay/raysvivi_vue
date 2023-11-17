<template>
  <div class = "inner-container">
      <el-card class="about-card fine-font" shadow="always">
        
        <el-row>
          <el-col :span="24"></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="24" style="text-align: center;"><span class="title_level_1">友情链接</span><br/><span class="small-font">(申请要求：互加友链，博客可达，内容合法)</span></el-col>
        </el-row>

        <el-row class="independent_row">
              <div class="friendly-module">
                        <el-card class="infinite-list-item friendly-link-card fine-font gray-font" shadow="hover">
                            <el-container>
                              <el-header height="20px" style="background-color: rgba(244,244,244,0.9);">this is a demo</el-header>
                              <el-main></el-main>
                            </el-container>   
                        </el-card>                                               
              </div>
        </el-row>
 
 <br/>
        <el-row class="independent_row">
          <el-col :span="2"></el-col>
          <el-col :span="20"><CommentView :key="componentKey" :moduleId="'friendlyLink'" :relativeId="-1"/></el-col>
          <el-col :span="2"></el-col>
        </el-row>      
      </el-card>

    </div>
</template>

<script lang="ts" setup>
import { ref ,onMounted,onBeforeUnmount } from 'vue'
import CommentView from '@/views/component/CommentView.vue'
const editorInstance = ref()
const componentKey = Date.now()
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
  width: 350px; float:left;height:125px;padding-top:5px;margin-left: 5%;
  
}
.friendly-link-card{
  cursor:pointer;
  height:100%;
  background-image: url("@/assets/xiaowangzi_01.webp");
  background-size:cover;
    background-position-y: center;
}
</style>