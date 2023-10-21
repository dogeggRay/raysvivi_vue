<template>
  <div class = "inner-container">

    <div
        class="infinite-list inner-container"
        style="overflow: auto;"
      >
        <el-card v-for="item in blog.list" :key="item" class="infinite-list-item blog-list-card fine-font gray-font"  shadow="always">
          <el-container style="height:100%;padding-right: 10px;">
            <el-aside class="blog-list-aside">
              <el-image class="card_image" :src="'/landscape/landscape_'+item.picNo+'.jpg'"  @click="blogTouch(item.id)" />
            </el-aside>
            <el-container class="blog-list-container" >
              <el-header class="blog-list-header title-font"  @click="blogTouch(item.id)"><span>{{ item.title }}</span></el-header>
              <el-main class="blog-list-main"  @click="blogTouch(item.id)">{{ item.abstractInfo }}</el-main>
              <el-footer height="60px" class="blog-list-footer">
              <el-row style="    margin-bottom: 5px;">
                <el-col :span="24"> 
                  <template v-if="store.getters['tagMap']">
                    <el-tag style="margin-right:5px;cursor:pointer;" v-for="(tag,index) in item.tags" class="ml-2" type="info" :key="index" @click="tagChange(tag)">
                    {{store.getters['tagMap'].get(tag)}}</el-tag>
                  </template>
                  <template v-else><el-tag style="margin-right:5px;cursor:pointer" v-for="(tag,index) in item.tags" class="ml-2" type="info" :key="index">
                    {{tag}}</el-tag></template>
                  
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-icon class="icon-in-card-footer"><Clock /></el-icon>
                  {{ item.createTime.substring(0,11) }}
                </el-col>
              </el-row>
              
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
import { ref ,reactive,watch,onMounted ,onBeforeUnmount,defineExpose,onActivated,getCurrentInstance} from 'vue'
import {getArtclePageList,demoTest} from "@/js/blog.js"
import {isEmpty} from "@/utils/common.js"
import store from '@/store'
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
import {getRandomBg0} from "@/utils/uuid.js"
const storeInstance = useStore()
const count = ref(10)
const blog = reactive({
  list:[]
})

const endFlag = ref(false)
const pageParam = reactive({
  startIndex:0,
  pageSize:5,
  tag:""
})

onMounted(() => {
  window.addEventListener('scroll', sorlly)
  getBlogPages(true)
})

onActivated(() => {
//  switchHomeMode(true)
})

watch(() => store.getters['currentTag'] ,(newValue, oldValue) => {
  pageParam.startIndex=0
  pageParam.tag = newValue
  getBlogPages(true)
});

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
    if (scrollTop + clientHeight >= scrollHeight-250) {
        pageParam.startIndex+=pageParam.pageSize
        getBlogPages(false)
        //count.value++;
    }
}    

const tagChange =(value) =>{
    storeInstance.commit('setCurrentTag',value)
}

const getBlogPages =(isRefresh) => {
    if(endFlag.value&&!isRefresh){
      return
    }
    getArtclePageList(pageParam)
        .then((res) => {
          res.data.forEach((item )=>{
            item.picNo = getRandomBg0(40)
          })
          if(isRefresh){
                blog.list=res.data
                endFlag.value = false
          }else{
            if(isEmpty(res.data)){
                endFlag.value = true
            }else{
              blog.list=blog.list.concat(res.data)
              endFlag.value = false
            }
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
    router.push({path:"/view/blogDetail",query:{"relativeId":blogId}})
}
defineExpose({
  sorlly
})

//====================================接口测试===============================================

</script>

<style lang="less" scoped >
.infinite-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:white;
  margin: 0px 10px 10px 10px;
}
.infinite-list .infinite-list-item + .list-item {
  margin-bottom: 10px;
}

/deep/ .blog-list-card > .el-card__body {
  margin: 0px;  
  padding:0px;
  width:100%;
  height:100%
}

.blog-list-card:hover{
  border:1px solid #409EFF
}

.blog-list-aside{
    margin: auto;
    text-align: center;
    height:100%;
      overflow: hidden
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

    .card_image{
      width: 100%;
      height: 100%;
    }
    .blog-list-container{
      padding-left:1rem;
    }
/* .inner-container::-webkit-scrollbar{
  display:none;
} */
//小屏配置
@media screen
and (max-device-width : 768px) {
    /deep/ .blog-list-main{
      display: none
    }

    .blog-list-card{
      height:100px
    }

    .blog-list-aside{
        width:130px;
    }    

    .blog-list-header {
      text-align: left;
      padding:10px 0px 0px 0px;
      line-height: 1;
      font-size: smaller;
      font-weight: 600;
    }    

    .el-tag{
      height:15px
    }
}

@media screen
and (min-device-width : 768px){
  .blog-list-card{
      height: 180px;
    }


    .blog-list-aside{
        width:300px;
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
      padding-top:5px;
      overflow: hidden;
    }
}


</style>