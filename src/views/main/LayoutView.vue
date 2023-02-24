<template>
  <div class="common-layout full_height" >
    <!-- 主体模块 -->
    <el-container  class="full_height"  v-bind:class="{ 'mask': maskEffective }" style="background :url('@/assets/background-02.jpg' repeat;">
        <!-- 头部模块 -->
        <transition
          name="fade"
        >
          <div v-if="!headerFlag" class="top_header_div_transparent" >
              <el-row class="top_header_div_row full_height">
                <el-col :span="2" class="full_height"></el-col>
                <el-col :span="9" class="full_height main_header_middle">
                  <span class="cursor-font declare-font top_header_span" @click="declareClick">雷の博客</span>
                </el-col>
                <el-col :span="4" class="full_height"></el-col>
                <el-col :span="7" class="full_height">
                  <el-menu
                    class="top_header_menu full_height declare-font"
                    text-color="white"
                    mode="horizontal"
                    menu-trigger="click"
                    router
                  >
                    <el-menu-item index="/view">首页</el-menu-item>
                    <el-menu-item index="/view/friendlyLinks">友链</el-menu-item>
                    <el-menu-item index="/view/messageBoard">留言</el-menu-item>
                    <el-menu-item index="/view/about">关于</el-menu-item>
                    <el-menu-item v-if="store.getters['accessToken']&&store.getters['accessToken'].length>0" index="/view/adminBlog">写博客</el-menu-item>
                  </el-menu>
                </el-col>
                <el-col :span="2" class="full_height" style="overflow: hidden;">
                  <router-link class="common-routerlink" to="/login">管理员登陆</router-link>
                </el-col>
              </el-row>
            
          </div>
        </transition> 
      <el-header class="main_header" height="150px" style="padding:0px;width:100%">
        <div class="main_header_div">
          
          <!-- <router-link to="/boxOffice">boxofficeview</router-link> -->
          <!-- <router-link to="/MessageBoard">messageboard</router-link> -->
        </div>
        <div class="default_header_div">
          <!-- <router-link to="/MessageBoard">messageboard</router-link> -->
        </div>

      </el-header>
      <!-- 内容模块 -->
      <el-container class="full_height main_container" style="z-index:2;">
        <!-- 内容模块-左侧边 -->
        <el-aside width="16%" class="layout_left_aside adapt_show_part" style=""></el-aside>
        <!-- 内容模块-主体 -->
        <el-container class="full_height content_container" style="padding-top:10px;">
            <!-- <el-header class="adapt_hidden_part" ><Statement/></el-header>   -->
            <el-main class="router_main el_main_first">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component ref="order_view" :is="Component" />
              </keep-alive>
                
            </router-view>

            </el-main>
        </el-container>
        <!-- 内容模块-右侧边 -->
        <el-aside width="30%" class="layout_right_aside adapt_show_part"><Statement/></el-aside>
      </el-container>
      
    </el-container>
  </div>

      <div class="declareDialog" v-bind:class="{ 'display-class': maskEffective ,'undisplay-class': !maskEffective }" @click="declareDialogClick">
        <span>尊敬的游客你好:</span>
        <br/>
        <span>我是你爹</span>
    </div>

    <!-- 辅助栏 -->
    <el-card class="support_card" style="color: #939393;" shadow="hover">
            <el-row>
                  <el-col :span="24">
                    <el-icon><ArrowUp /></el-icon>
                  </el-col>
                </el-row>
            <el-row>
                  <el-col :span="24">
                    <span>——</span>
                  </el-col>
                </el-row>                
            <el-row class="adapt_hidden_part">
              <el-col :span="24">
                  <el-icon @click="statementShow"><Menu /></el-icon>
              </el-col>
            </el-row>    
            <el-row class="adapt_hidden_part">
                  <el-col :span="24">
                    <span >——</span>
                  </el-col>
                </el-row>                
            <el-row>
              <el-col :span="24">
                  <el-icon><InfoFilled /></el-icon>
              </el-col>
            </el-row>                          
    </el-card>

    <!--导航抽屉-->
    <el-drawer direction="btt" size="80%" v-model="navigateDrawer" :with-header="false">
      <Statement/>
    </el-drawer>
</template>

<script lang="ts" setup>
import Statement from '@/views/statement/statement_page.vue'
import { ref ,onMounted,onBeforeUnmount } from 'vue'
    import store from '@/store'

const headerFlag = ref(false);
let order_view = ref()
const navigateDrawer = ref(false);
onMounted(() => {
  initPageSize()
  window.addEventListener('scroll', sorlly)
})

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

const initPageSize = () =>{
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
</script>
<style lang="less">
.full_height{
  height:100%
}

.el-main{
  padding:0px;
}

.main_header_div {
  background: url("@/assets/animals_book_3.jpg") no-repeat center;
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
    top: -45px;
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
    top: -35px;
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
        top: 17rem;
        height: 10%;
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
      backdrop-filter: blur(10px);
      background-color:rgba(0, 0, 0, 0.3);
    }

    .top_header_span{
      line-height:310%;
    }
    .top_header_menu{
      background-color:transparent;
      border: none;
    }

    .top_header_menu >.el-menu-item:hover,.top_header_menu >.el-menu-item.is-active {
      background: rgba(255,255,255,0.2)!important;
      color: #fff !important;
    }

    .el-menu--popup > .el-menu-item{
      color:white!important;
    }

    .el-menu--popup-bottom-start > .el-menu-item ,.el-menu--popup-bottom-start{
      background-color:transparent!important;
    }

    .el-popper.is-pure{
      background-color:rgba(0, 0, 0, 0.3)!important;
      border: none;
      backdrop-filter: blur(10px);
    }

    .el-menu--popup-container{
      border: none;
    }

    .el-menu--horizontal>.el-sub-menu:focus, .el-menu--horizontal>.el-sub-menu:hover {
      background-color:rgba(255,255,255,0.2)
    }

    .el-tooltip__trigger{
      background-color: rgba(255,255,255,0.2)
    }

    .el-sub-menu__hide-arrow{
      background-color:transparent;
      transition: opacity .5s;
    }
    .el-menu--horizontal>.el-sub-menu.is-active{
      background-color: transparent!important
    }

    .el-tooltip__trigger:hover{
      background-color: rgba(255,255,255,0.2)!important
    }    

    .el-menu--popup-bottom-start > .el-menu-item:hover{
      background-color: rgba(255,255,255,0.2)!important
    }

    .el-sub-menu__hide-arrow.is-active>.el-tooltip__trigger{
      color:white!important;
    }
    .el-menu--popup-bottom-start > .el-menu-item.is-active{
      background-color: rgba(255,255,255,0.2)!important
    }    

    // 过渡动画样式
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to  {
      opacity: 0;
    }    
//辅助栏===================================================
.declare_card{
    font-size: xx-small;
    color:#939393;
}

.support_card{
    z-index: 2;
    width:53px;
    position: fixed;
    right: 10px;
    bottom: 20px;  
    text-align: center;
}


</style>