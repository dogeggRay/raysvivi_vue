<template>
  <div class = "inner-container fine-font">
    <el-container>
      <el-header height="40px">
            <el-row>
                <el-col :span="4"> 
                    <el-select style="margin-right: 10px;float:left" v-model="currentStructure" @change="structureChange">
                      <el-option v-for="item in structureList" :key="item.id" :value="item.id" :label="item.label" />
                    </el-select>
                </el-col>
                <el-col :span="7"> 
                    <div style="margin-right: 10px;float:left"><el-button @click="addData">新增</el-button> </div>
                    <div style="margin-right: 10px;float:left"><el-button @click="updateData">更新</el-button> </div>
                </el-col>
            </el-row>
        
            
      </el-header>
      <el-main>
                <!-- <div style="display: flex; padding: 10px;" v-if="store.getters['accessToken']"> -->
                  <!-- <div style="display: flex; padding: 10px;">
                    <div style="margin-right: 10px"><el-switch v-model="horizontal"></el-switch> 横向</div>
                    <div style="margin-right: 10px"><el-switch v-model="collapsable"></el-switch> 可收起</div>
                    <div style="margin-right: 10px"><el-switch v-model="disaledFlag"></el-switch> 禁止编辑</div>
                    <div style="margin-right: 10px"><el-switch v-model="onlyOneNode"></el-switch> 仅拖动当前节点</div>
                    <div style="margin-right: 10px"><el-switch v-model="cloneNodeDrag"></el-switch> 拖动节点副本</div>

                    
                </div>
            <div style="padding: 0 10px 10px">
              背景色：<el-color-picker v-model="labelstyle.background" size="small"></el-color-picker>&nbsp;
              文字颜色：<el-color-picker v-model="labelstyle.color" size="small"></el-color-picker>&nbsp;
            </div> -->
            
            <el-row>
                <el-col :span="10"> 
                    <el-input v-model="structureBody.name"></el-input>
                </el-col>
            </el-row>
            <el-divider content-position="left" style="margin:15px 0px">正文</el-divider>

              <div style="height: 600px;">
                
              </div>
      </el-main>
    </el-container>

    <el-drawer
      v-model="showDetail"
      title="I am the title"
      direction="rtl"
      size="60%"
      :before-close="detailHandleClose"
      @opened="openDrawer"
    >
      <BlogDetail ref="structureBlog" :key="componentTime"/>
    </el-drawer>

    </div>
</template>

<script lang="ts" setup>
import { ElSwitch, ElColorPicker, ElMessage,ElMessageBox  } from 'element-plus'
import BlogDetail from '@/views/blog/detail/blogDetail.vue'
import {isEmpty} from "@/utils/common.js"
import { ref,onMounted,reactive ,nextTick ,getCurrentInstance,ComponentInternalInstance} from 'vue'
import { getStrucNameList,queryOneStruc,updateStruc,addStruc} from "@/js/structure.js"
import store from '@/store'

const {proxy} = getCurrentInstance() as ComponentInternalInstance
let cardOne = reactive({
  label:"",
  moduleId:"",
  relativeId:""
})
const cardTwo = reactive({
  label:"",
  children:[],
  id:"",
  pid:"",
  expand:"",
  isLeaf:true,
  extention:{
    moduleId:"",
    relativeId:""
  }
})

const menus=[{ name: '复制文本', command: 'copy' }, { name: '新增节点', command: 'add' }, { name: '编辑节点', command: 'newEdit' }, { name: '删除节点', command: 'delete' }]

const cloneNodeDrag = ref(true)

const horizontal= ref(true)
const collapsable=ref(true)
const onlyOneNode=ref(false)
const expandAll=ref(true)
const disaledFlag=ref(false)

const showDetail = ref(false)

const structureList = ref([])
const currentRelativeId = ref("")
const currentStructure = ref("")
const structureBody = reactive({
  id:"",
  name:"demo",
  value:{
          id:1,
          label:"第一个节点",
          moduleId:"1",
          relativeId:"2"
      }
})
const labelstyle = reactive({
    background: "#fff",
    width: "max-content",
    color: "#5e6d82",
    cursor:"pointer"
})
const componentTime = Date.now()
const structureBlog = ref<any>()


onMounted(() => {
  getStructureNameList();
})

const onNodeClick = (event,node) =>{
  let tempRelativeId = node.label.split("_")[1];
  if(isEmpty(tempRelativeId)){
      return
  }  
  showDetail.value = true;
  currentRelativeId.value = tempRelativeId
  
  nextTick(() => {
    structureBlog.value.blogRefresh(currentRelativeId.value)
  }) 
}

const openDrawer=()=>{
  // alert("open")
  // console.log(structureBlog)
  // nextTick(() => {
  //   console.log(structureBlog)
  // })  
}
const structureChange = () =>{
  queryOneStruc({"id":currentStructure.value}).then((resp:any) => {
        if(resp.code == "0"){
          structureBody.id = resp.data.id
          structureBody.name = resp.data.name
          structureBody.value = resp.data.value
          collapsable.value = true
        }else{
            ElMessage.error(resp.msg)
        }
    })
    .catch((e) => {
      return
    })
}
const getStructureNameList =() =>{
  getStrucNameList().then((resp:any) => {
        if(resp.code == "0"){
          structureList.value = resp.data
        }else{
            ElMessage.error(resp.msg)
        }
    })
    .catch((e) => {
      return
    })
}

const addData = () =>{
  addStruc(structureBody).then((resp:any) => {
        if(resp.code == "0"){
          ElMessage.success("OK!")
        }else{
            ElMessage.error(resp.msg)
        }
    })
    .catch((e) => {
      return
    })
}

const detailHandleClose = () =>{
  showDetail.value = false
  currentRelativeId.value = ""
  console.log("detailHandleClose")
}
const updateData = () =>{
  updateStruc(structureBody).then((resp:any) => {
        if(resp.code == "0"){
          ElMessage.success("OK!")
        }else{
            ElMessage.error(resp.msg)
        }
    })
    .catch((e) => {
      return
    })
}

const onMenus = ({ node, command }) => {
  console.log(222222,node, command)
  if (command === 'newEdit'){
    node.open = true
    // ElMessageBox.prompt('Please input your e-mail', 'Tip', {
    //   confirmButtonText: 'OK',
    //   cancelButtonText: 'Cancel'
    // })
    //   .then(({ value }) => {
    //     let extention = {
    //       moduleId:"",
    //       relativeId:""
    //     }
    //     console.log(1111,value)
    //     console.log(2222,value.split("|")[0])
    //     console.log(3333,value.split("|")[1])
    //     console.log(4444,value.split("|")[2])
    //     extention.moduleId = value.split("|")[1]
    //     extention.relativeId = value.split("|")[2]
    //     node.label = value.split("|")[0]
    //     node.extention = extention
    //     console.log(5555,node)
    //   })
    //   .catch(() => {
    //     ElMessage({
    //       type: 'info',
    //       message: 'Input canceled',
    //     })
    //   })
  }
 

}

 const closeEdit = (node) => {
  node.open = false
}

</script>

<style lang="less" scoped>
/deep/ .el-drawer__body{
  padding:0px!important
}
</style>