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
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="title_level_2">姓名</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="content">雷迪/Ray</span></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="title_level_2">性别</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="content">男</span></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="title_level_2">个人评价</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="content">一个脱离了高级趣味的人</span></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="title_level_2">个人标签</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="content">拖延症晚期、大乱斗小王子、DNFer、灵魂画手、减肥宅男</span></el-col>
        </el-row>

        <el-row class="independent_row">
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="title_level_2">技术特长</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="content">JAVA互联网(分布式)全家桶开发,VUE 2/3,MYSQL,REDIS,KAFKA,DOCKER,NGINX实战开发</span></el-col>
        </el-row>    

        <el-row class="independent_row">
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="title_level_2">建站初衷</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="content">反正是空着，干脆塞点东西进去玩</span></el-col>
        </el-row>                   

        <el-row class="independent_row">
          <el-col :span="1"></el-col>
          <el-col :span="23"><span class="title_level_2">建站历程</span></el-col>
        </el-row>
        <el-row class="independent_row">
          <el-col :span="1"></el-col>
          <el-col :span="23">
            <el-timeline>
              <el-timeline-item timestamp="2022-10-25" placement="top">
                <el-card>
                  <p>阿里云服务器ECS/域名适配</p>
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
                  <p>上线</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2023-02-8" placement="top">
                <el-card>
                  <p>调研了一下用阿里云OSS做图床</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2023-02-12" placement="top">
                <el-card>
                  <p>用WangEditor做博客部分</p>
                  <p>前后端打通，随便写点</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2023-02-26" placement="top">
                <el-card>
                  <p>博客太乱，用vue-org-tree做个书架</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2023-09-3" placement="top">
                <el-card>
                  <p>书架不好用，换echarts，我真蠢</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2023-09-23" placement="top">
                <el-card>
                  <p>WangEditor不好用，一堆问题</p>
                  <p>换tinyMCE</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2023-10-17" placement="top">
                <el-card>
                  <p>说我域名到期，继续掏钱</p>
                  <p>我丢雷</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="...待续" placement="top">
              </el-timeline-item>              
            </el-timeline>
          </el-col>
        </el-row>           
        
        <el-row class="independent_row">
          <el-col :span="2"></el-col>
          <el-col :span="20"><CommentView :key="componentTime" :moduleId="'about'" :relativeId="''"/></el-col>
          <el-col :span="2"></el-col>
        </el-row> 




      </el-card>

    </div>
</template>

<script lang="ts" setup>
import CommentView from '@/views/component/CommentView.vue'
const componentTime = Date.now()
</script>

<style lang="less" scoped>
.about-card{
  min-height:1300px;
  margin-left:10px;
  margin-right:10px;
}

@media screen
and (max-device-width : 768px) {
  .content{
    font-size:small;
  }
}

</style>