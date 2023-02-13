<template>
  <div class = "inner-container">
      <el-card class="about-card fine-font" shadow="always">
        
        <el-row>
          <el-col :span="24"></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="24" style="text-align: center;"><span class="title_level_1">关于</span></el-col>
        </el-row>
        
        <el-row class="independent_row">
          <el-col :span="2"></el-col>
          <el-col :span="20"><span class="title_level_2">姓名</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="3"></el-col>
          <el-col :span="21"><span class="content">Ray</span></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="2"></el-col>
          <el-col :span="22"><span class="title_level_2">性别</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="3"></el-col>
          <el-col :span="21"><span class="content">男</span></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="2"></el-col>
          <el-col :span="20"><span class="title_level_2">个人评价</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="3"></el-col>
          <el-col :span="21"><span class="content">一个脱离了高级趣味的人</span></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="2"></el-col>
          <el-col :span="20"><span class="title_level_2">个人标签</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="3"></el-col>
          <el-col :span="21"><span class="content">拖延症晚期、大乱斗小王子、DNFer、灵魂画手、减肥宅男</span></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="2"></el-col>
          <el-col :span="20"><span class="title_level_2">技术特长</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="3"></el-col>
          <el-col :span="21"><span class="content">JAVA互联网(分布式)全家桶开发,VUE 2/3,MYSQL,REDIS,KAFKA,DOCKER,NGINX实战开发</span></el-col>
        </el-row>    

        <el-row class="independent_row">
          <el-col :span="2"></el-col>
          <el-col :span="20"><span class="title_level_2">建站初衷</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="3"></el-col>
          <el-col :span="21"><span class="content">写一个好康的个人博客 分享生活和技术 顺便拧拧拖延症</span></el-col>
        </el-row>  
        <el-row>
          <el-col :span="3"></el-col>
          <el-col :span="21"><span class="content">never too late</span></el-col>
        </el-row>                   

        <el-row class="independent_row">
          <el-col :span="2"></el-col>
          <el-col :span="20"><span class="title_level_2">建站历程</span></el-col>
        </el-row>
        <el-row class="independent_row">
          <el-col :span="3"></el-col>
          <el-col :span="21">
            <el-timeline>
              <el-timeline-item timestamp="2022-10-25" placement="top">
                <el-card>
                  <p>阿里云服务器ECS/域名购置</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2022-11-7" placement="top">
                <el-card>
                  <p>备案通过</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2023-01-12" placement="top">
                <el-card>
                  <p>VUE前端框架搭建</p>
                  <p>发布上线</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="...待续" placement="top">
              </el-timeline-item>              
            </el-timeline>
          </el-col>
        </el-row>           
        
        <el-row class="independent_row">
          <el-col :span="2"></el-col>
          <el-col :span="20"><CommentView :moduleId="123"/></el-col>
          <el-col :span="2"></el-col>
        </el-row> 




      </el-card>

    </div>
</template>

<script lang="ts" setup>
import CommentView from '@/views/comment/CommentView.vue'

</script>

<style lang="less">
.about-card{
  height:1300px;
  margin-left:10px;
  margin-right:10px;
}

.about-card >.el-card__body> .el-row.independent_row{
  margin-top:20px;
}

.title_level_1{
  font-size: larger;
  font-weight: bold;
}
.title_level_2{
  font-weight:600;
}
</style>