<template>
  <div class="common-layout full_height" >
    <el-container  class="full_height"  v-bind:class="{ 'mask': maskEffective }">

        <transition
          :duration="200"
          enter-active-class="animate__animated animate__fadeInDown"
          leave-active-class="animate__animated animate__fadeOutUp"
        >
          <div v-if="!headerFlag" style="position:fixed;width:100%;z-index:4;background-color:green">hello2</div>
        </transition> 


        <transition
          :duration="200"
          enter-active-class="animate__animated animate__fadeInDown"
          leave-active-class="animate__animated animate__fadeOutUp"
        >
          <div v-if="headerFlag" style="position:fixed;width:100%;z-index:4;background-color:red">hello</div>
        </transition>               
      <el-header class="main_header" height="150px" style="padding:0px;width:100%">


        <div class="main_header_div">
          <span class="cursor-font declare-font" @click="declareClick">网站声明</span>
          <router-link to="/boxOffice">boxofficeview</router-link>
          <!-- <router-link to="/MessageBoard">messageboard</router-link> -->
        </div>





        <div class="default_header_div">
          <!-- <router-link to="/MessageBoard">messageboard</router-link> -->
        </div>

      </el-header>
      <el-container class="full_height" style="z-index:2">
        <el-aside width="17%"></el-aside>
        <el-container class="full_height white_background" style="padding-top:10px">
        <el-main class="router_main el_main_first">
        <!-- <router-view ref="routerViewRef"></router-view> -->
        <router-view v-slot="{ Component }">
            <component ref="order_view" :is="Component" />
        </router-view>

        </el-main>
        </el-container>
        <el-aside width="37%"><Statement/></el-aside>
      </el-container>
      
    </el-container>
  </div>

      <div class="declareDialog" v-bind:class="{ 'display-class': maskEffective ,'undisplay-class': !maskEffective }" @click="declareDialogClick">
        <span>尊敬的游客你好:</span>
        <br/>
        <span>我是你爹</span>
    </div>
</template>

<script lang="ts" setup>
import Statement from '@/views/statement/statement_page.vue'
import { ref ,reactive ,onMounted,onBeforeUnmount } from 'vue'

const headerFlag = ref(false);
let order_view = ref()
onMounted(() => {
  initPageSize()
  window.addEventListener('scroll', sorlly)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', sorlly)
})

const sorlly= () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //  可视区域
    let clientHeight = document.documentElement.clientHeight;
    // 页面的高度
    let scrollHeight = document.documentElement.scrollHeight;
    //console.log(scrollTop +"+"+ clientHeight +"???"+ scrollHeight);

    if(scrollTop>144){
      headerFlag.value = true;
    }else{
      headerFlag.value = false;
    }
    if (scrollTop + clientHeight >= scrollHeight) {
        console.log("access");
        order_view.value.sorlly();
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
</script>
<style lang="scss">
.full_height{
  height:100%
}

.el-main{
  padding:0px;
}

.main_header_div {
  background: url("@/assets/bearsInWinter.png") no-repeat center;
  background-size: cover;
    width: 100%;
    height: 175%;  
}

.default_header_div{
    width: 100%;
    z-index: 3;
    background:red   
}
.el_main_first{
  overflow-y:hidden
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
        color: white;
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

    .white_background{
      background-color:white;
    }

    .cursor-font {cursor:pointer}
    .declare-font{color:white}
</style>