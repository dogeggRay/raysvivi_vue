<template>
  <div class = "inner-container">
    <div
        class="infinite-list inner-container"
        style="overflow: auto;"
      >
      
        <el-card v-for="item in blog.list" :key="item"  class="infinite-list-item blog-list-card fine-font gray-font"  shadow="always" @click="blogTouch(item.id)">
          <el-container style="height:100%;padding-right: 10px;">
            <el-aside class="blog-list-aside">
              <el-image class="card_image" style="" :src="item.image" />
            </el-aside>
            <el-container>
              <el-header class="blog-list-header title-font"><span>{{ item.title }}</span></el-header>
              <el-main class="blog-list-main">{{ item.abstractInfo }}</el-main>
              <el-footer height="37px" class="blog-list-footer">
              <el-icon class="icon-in-card-footer"><Clock /></el-icon>
                {{ item.createTime }}
              </el-footer>
            </el-container>
          </el-container>
            
        </el-card>

         <div v-if="endFlag" class="fine-font " style="text-align:center;color: #939393;">再怎么翻也没有啦...</div>
         <!-- <div v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</div> -->
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref ,reactive,onMounted ,defineProps,onBeforeUnmount,defineExpose} from 'vue'
import {getArtclePageList,demoTest} from "@/js/blog.js"
import {isEmpty} from "@/utils/common.js"
import {useRouter} from 'vue-router'
const count = ref(10)
const blog = reactive({
  list:[]
})

const endFlag = ref(false)
const pageParam = reactive({
  startIndex:0,
  pageSize:5
})

onMounted(() => {
  window.addEventListener('scroll', sorlly)
  getBlogPages()
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

    //console.log(scrollTop+"+"+clientHeight+"??"+scrollHeight);
    //如果触底就让index++
    if (scrollTop + clientHeight >= scrollHeight) {
        pageParam.startIndex+=pageParam.pageSize
        getBlogPages()
        //count.value++;
    }
}    

const getBlogPages =() => {
    if(endFlag.value){
      return
    }

    getArtclePageList(pageParam)
        .then((res) => {
          if(isEmpty(res.data)){
              endFlag.value = true
          }else{
              blog.list=blog.list.concat(res.data)
          }
          
        })
        .catch((e) => {
          return
        })

        // demoTest({}).then((res) => {
        //   console.log(res)
        // })
        // .catch((e) => {
        //   return
        // })
}

const router=useRouter()
const blogTouch = (blogId) =>{
    router.push({path:"/view/blogDetail",query:{"blogId":blogId}})
}
defineExpose({
  sorlly
})

//====================================接口测试===============================================

</script>

<style>
.infinite-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 210px;
  /* background: var(--el-color-primary-light-9); */
  background-color:white;
  margin: 0px 10px 10px 10px;
  cursor:pointer;
}
.infinite-list .infinite-list-item + .list-item {
  margin-bottom: 10px;
}

.blog-list-card > .el-card__body {
  width:100%;
  height:100%
}

.blog-list-aside{
    margin: auto;
    text-align: center;
}
.blog-list-header {
  text-align: left;
  padding:25px 0px 0px 0px;
  line-height: 1;
  font-size: larger;
  font-weight: 600;
}
.blog-list-main{
  text-align: left;
  font-size: smaller;
  padding-top:15px
}

.blog-list-footer{
  text-align: left;
  font-size: smaller;
  padding-left:0px;
  padding-right:0px
}

.gray-font{
  color:#999
}

.icon-in-card-footer{
  position: relative;
  top: 4px;
  font-size: medium;
}
/* .inner-container::-webkit-scrollbar{
  display:none;
} */

</style>