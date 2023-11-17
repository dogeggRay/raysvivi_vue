<template>
  <div class="common-layout full_height" style="overflow-x:hidden">
    <a id="mainTopA"></a>
    <el-card v-if="store.getters['tagMap']&&store.getters['currentTag']" class="blogList_tag_notice fine-font">
      当前标签:
      <el-tag style="position: relative;bottom: 0.1rem;" class="ml-2" type="info" closable @close="tagClose">{{store.getters['tagMap'].get(store.getters['currentTag'])}}</el-tag> 
    </el-card> 

    <!-- 主体模块 -->
    <el-container  class="full_height"  v-bind:class="{ 'mask': maskEffective }" style="background :url('@/assets/background-02.jpg' repeat;">
        <!-- 头部模块 -->
        <transition
          name="fade"
        >
          <div v-if="!headerFlag" class="top_header_div_transparent" >
              <el-row class="top_header_div_row full_height">
                <el-col :span="2" class="full_height">
                    
                </el-col>
                <el-col :span="8" class="full_height main_header_middle">
                  <span class="cursor-font declare-font top_header_span" @click="declareClick">雷迪JOURNEY</span>
                </el-col>
                <el-col :span="2" class="full_height"></el-col>
                <el-col :span="10" class="full_height">
                  <el-menu
                    class="top_header_menu full_height declare-font"
                    mode="horizontal"
                    menu-trigger="click"
                    background-color="rgba(0,0,0,0)"
                    text-color="#fff"
                    active-text-color="rgba(227,230,195)"                    
                    router
                  >
                    <el-menu-item index="/view">首页</el-menu-item>
                    <el-menu-item index="/view/saysay">说说</el-menu-item>
                    <el-menu-item index="/view/structure">笔记</el-menu-item>
                    <el-menu-item index="/view/friendlyLinks">友链</el-menu-item>
                    <el-menu-item index="/view/messageBoard">留言</el-menu-item>
                    <el-menu-item index="/view/about">关于</el-menu-item>
                    <el-menu-item >cyberpunk</el-menu-item>
                    
                    <!-- <el-menu-item ><el-image style="float: right;height: 53.1px;" src="/localmeme/meme_xiran_heart.gif"/></el-menu-item> -->
                   </el-menu>
                </el-col>
                <el-col :span="2" class="full_height" style="overflow: hidden;">
                  <router-link class="common-routerlink" to="/login">管理员登陆</router-link>
                </el-col>
              </el-row>

          </div>
        </transition> 
      <el-header class="main_header" height="430px" style="padding:0px;width:100%">
        <div class="main_header_div">
          <div class="title_on_main_page"><span>I'd rather make mistakes than make nothing at all</span></div>
          <BackgroundStars/>
          <!-- <router-link to="/boxOffice">boxofficeview</router-link> -->
          <!-- <router-link to="/MessageBoard">messageboard</router-link> -->
        </div>
        <div class="default_header_div">
          <!-- <router-link to="/MessageBoard">messageboard</router-link> -->
        </div>

      </el-header>
      <!-- 内容模块 -->
      <el-container class="full_height main_container" style="z-index:2;">
        <div style="position: absolute;width: 100%;top: 390px;z-index:0">
            <section class="evan-big-banner_bottom" id="indexPosition">
              <svg id="EvanWaves" class="waves-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto" style="
                /* display: none; */
            ">
                <defs>
                  <path id="gentle-wave" d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88
                                -18 s 58 18 88 18 v 44 h -352 Z" fill-opacity="0.7" stroke-width="3" stroke-opacity="0.3"></path>
                </defs>
                <g class="parallax">
                  <use xlink:href="#gentle-wave" x="48" y="0"></use>
                  <use xlink:href="#gentle-wave" x="48" y="3"></use>
                  <use xlink:href="#gentle-wave" x="48" y="5"></use>
                  <use xlink:href="#gentle-wave" x="48" y="7"></use>
                </g>
              </svg>
            </section>          
        </div>
        <!-- 内容模块-左侧边 -->
        <el-aside width="13%" class="layout_left_aside adapt_show_part" style=""></el-aside>
        <!-- 内容模块-主体 -->
        <el-container class="full_height content_container" style="padding-top:10px;">
            <el-main class="router_main el_main_first">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component ref="order_view" :is="Component" />
              </keep-alive>
                
            </router-view>

            </el-main>
        </el-container>
        <!-- 内容模块-右侧边 -->
        <el-aside v-if="store.getters['homeMode']" width="30%" class="layout_right_aside adapt_show_part"><Statement/></el-aside>
        <el-aside v-else width="13%" class="adapt_show_part"></el-aside>
      </el-container>
      
      

    <!-- 辅助栏 -->
    <el-affix position="bottom" :offset="20" style="height:0px">
      <el-card class="operationIcon" shadow="always" @click="flyToTop"> <el-icon ><Top /></el-icon> </el-card>
      <el-card class="operationIcon" shadow="always"> 
           
          <el-popover
            placement="left"
            trigger="click"
            :show-arrow = "false"
            popper-class="sidebarPopper"
          >
            <template #reference>
              <el-icon style="position: relative;;left: 0.5px;"><Headset /></el-icon>
            </template>
            <Musicplayer :key="componentKey" />
          </el-popover>
      </el-card>
      <el-card class="operationIcon" shadow="always"> <el-icon  style="position: relative;top: -2px;left: 0.5px;"><Promotion /></el-icon> </el-card>
      <el-card class="operationIcon" shadow="always"> <el-icon  style="position: relative;top: -2px;left: 0.5px;"><Promotion /></el-icon> </el-card>
      <el-card class="operationIcon adapt_hidden_part" shadow="always"><el-icon @click="statementShow" style=""> <DArrowLeft /></el-icon> </el-card>
      <!-- adapt_hidden_part -->
    </el-affix>

    </el-container>
  </div>

      <div class="declareDialog fine-font" v-bind:class="{ 'display-class': maskEffective ,'undisplay-class': !maskEffective }" @click="declareDialogClick">
        <div style="position: absolute;    top: 50%;    width: 100%;">
            <span>尊敬的游客你好:</span>
            <br/>
            <span>技术支持技术支持技术支持技术支持技术支持技术支持技术支持技术支持</span>
        </div>
        
    </div>



    <!--导航抽屉-->
    <el-drawer custom-class="statementDrawer" direction="rtl" size="90%" v-model="navigateDrawer" :with-header="false">
      <div @click="statementHide" ><Statement/></div>
    </el-drawer>
</template>

<script lang="ts" setup>
import Statement from '@/views/statement/statement_page.vue'
import { ref ,onMounted,onBeforeUnmount } from 'vue'
import {initTags} from '@/js/admin'
import store from '@/store'
import { useStore } from 'vuex'
import "@/style/beauty.min.css"
import Musicplayer from '@/views/cyberpunk/music/music-player.vue'
import BackgroundStars from '@/views/component/background-stars.vue'

const componentKey = Date.now()

let storeInstance = useStore()

const headerFlag = ref(false);
let order_view = ref()
const navigateDrawer = ref(false);
onMounted(() => {
  initDatas()
  window.addEventListener('scroll', sorlly)
})

// watch(() => store.getters['homeMode'], (newValue, oldValue) => {
//   alert("watch:"+newValue)
  
// });

onBeforeUnmount(() => {
  window.removeEventListener('scroll', sorlly)
})

const sorlly= () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if(scrollTop>144){
      headerFlag.value = true;
    }else{
      headerFlag.value = false;
    }
}

const initDatas = () =>{
  storeInstance.dispatch('initTag').then(
            (response) => {
              console.log('OK')
            },
            (err) => {
              console.log('ERR', err)
            }
          )
  //alert(document.body.clientHeight)
  //alert(document.getElementsByClassName('router_main')[0].clientHeight)
  //  document.getElementsByClassName('inner-container')[0].style.height;
}

//蒙纱弹框============================================================================
const maskEffective = ref(false)
const declareClick = ()=>{
    maskEffective.value = true;
}

const declareDialogClick = () => {
    maskEffective.value = false;
}

//辅助栏================================================================================
const statementShow = () => {
  navigateDrawer.value = true;
}

const statementHide = () => {
  navigateDrawer.value = false;
}

const tagClose = () =>{
  storeInstance.commit('setCurrentTag',"")
}

const flyToTop = () =>{
  let section = document.getElementById("mainTopA")
    if (section) {
        section.scrollIntoView()
    }
}

</script>


<style lang="less" >

.el-main{
  padding:0px;
}

.main_header_div {
  background: url("@/assets/background-journey.png") no-repeat center;
  background-size: cover;
    width: 100%;
    height: 118%;  
}

.main_container{
  // background-color : #E6E6E6;
  background :url('@/assets/background-02.jpg') repeat;
  background-size: contain;
  background-attachment:fixed;
  background-repeat:repeat;
  min-height: 800px;
}

.default_header_div{
    width: 100%;
    z-index: 3;
    background:red   
}
.el_main_first{
    position: relative;
    top: -130px;
    // background-color: #E6E6E6;
    padding-top: 12px;  
    overflow-y:hidden;
    border-radius: 7px;
}

.layout_left_aside{
  //background :url('@/assets/background-02.jpg') repeat;
}
.layout_right_aside{
    padding: 10px 10px 0px 10px;
    margin-left: 10px;
    position: relative;
    top: -97px;
    //background-color: #E6E6E6;
    border-radius: 7px 0px 0px 0px;
}

    .display-class{
        display:block;
    }

    .undisplay-class{
        display:none;
    }

    .declareDialog{
        position: fixed;
        top: 0rem;
        height: 100%;
        width: 80%;
        border-radius: 1rem;
        text-align: center;
        width: 100%;
    }    

    .mask{
        filter:blur(10px);
        -webkit-filter:blur(10px);
        -moz-filter:blur(10px);
        -ms-filter:blur(10px);
        -o-filter:blur(10px);
    }    

    .cursor-font {cursor:pointer}
    .declare-font{
      color:white;
      font-family:"Consolas","Microsoft JhengHei","Apple LiGothic Medium,Microsoft YaHei","微软雅黑","Arial",sans-serif;
    }


//顶部栏样式==============================================
    .top_header_div_transparent{
      position:fixed;
      width:100%;
      z-index:4;
      height: 50px;
      // backdrop-filter: blur(10px);
      // background-color:rgba(0, 0, 0, 0.3);
    }

    .top_header_span{
      line-height:310%;
    }
   

    .el-popper.is-pure{
      background-color:rgba(0, 0, 0, 0.0)!important;
      border: none;
      backdrop-filter: blur(10px);
    }

     
//辅助栏===================================================
.declare_card{
    font-size: xx-small;
    color:#939393;
}


.blogList_tag_notice{
    position: fixed;
    top: 18rem;
    left: -1rem;
    padding-left: 1rem;
    width: auto;  
    height: 2.5rem;
    line-height: 2rem;
    z-index: 3;    
}

.statementDrawer{
}

.waves-svg{
  width: 100%;
    height: 3rem;
    fill: whitesmoke;
}

  .sidebarPopper{
    padding:0px!important;
    background-color: transparent!important;
    border: none!important;
    box-shadow:none!important;
  }

.title_on_main_page{
    position: absolute;
    width: 100%;
    text-align: center;
    color: white;
}
//小屏配置
@media screen
and (max-device-width : 768px) {
  .operationIcon{
    left:85%;
  }

  .sidebarPopper{
    width:78%!important;
  }

  .title_on_main_page{
    top: 26%;
    font-weight: 700;
    font-size: 14px;    
}
}

@media screen
and (min-device-width : 768px){
  .operationIcon{
    left:90%;
  }

  .sidebarPopper{
    width:51%!important
  }  

  .title_on_main_page{
      top: 24%;
      font-weight: 700;
      font-size: 2rem;
  }
}

.operationIcon{
  color:#777AAF;
  display:block;
  font-size: x-large;
  width: 34px;
  height: 34px;
  border-radius: 18px;
  margin-bottom:5px;
  position: relative;
  top:-190px;
  cursor:pointer;
}
</style>