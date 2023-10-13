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
            </el-row>
        
            
      </el-header>
      <el-main>
            
            <el-row>
                <el-col :span="10"> 
                    <el-input v-model="structureBody.name"></el-input>
                </el-col>
            </el-row>
            <el-divider content-position="left" style="margin:15px 0px">正文</el-divider>

              <div style="height: 600px;">
                <el-container style="height:100%">
                  <el-aside width="40%" style="background: lightgray;">
                          <el-tree 
                                :data="treeInstance.data" 
                                :props="defaultProps" 
                                :highlight-current="true" 
                                :default-expand-all="true"
                                :expand-on-click-node="false">
                                  <template #default="{ node, data }">
                                    <div class="custom-tree-node">
                                      <span v-if="data.value" @click="handleNodeClick(data)"><el-icon size="20px" style="position:relative;top:4px"><Document /></el-icon>{{ node.label }}</span>
                                      <span v-else @click="handleNodeClick(data)">{{ node.label }}</span>

                                      <span class="treeOperate">
                                        <a @click="append(data)"> 追加 </a>
                                        <a style="margin-left: 8px" @click="update(node, data)"> 修改 </a>
                                        <a style="margin-left: 8px" @click="remove(node, data)"> 删除 </a>
                                      </span>
                                    </div>
                                  </template>
                              </el-tree>
                  </el-aside>
                  <el-main>
                        <el-form :model="treeForm" label-width="120px">
                          <el-form-item label="node name">
                            <el-input v-model="treeForm.name" />
                          </el-form-item>
                          <el-form-item label="node value">
                            <el-input v-model="treeForm.value" />
                          </el-form-item>
                        </el-form>

                        <el-row>
                            <el-col :span="24" style="text-align:center"> 
                                <el-button @click="formReset">reset</el-button>
                                <el-button @click="formSubmit">submit</el-button>
                            </el-col>
                        </el-row>
                        {{structureBody.id}}
                  </el-main>
                </el-container>
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
import type Node from 'element-plus/es/components/tree/src/model/node'
import store from '@/store'
interface Tree {
  name: string,
  value: string,
  children?: Tree[]
}

const treeForm = reactive({
  name:"",
  value:""
})
const handleNodeClick = (data: Tree) => {
  treeForm.name = data.name
  treeForm.value = data.value
}

const formReset = () =>{
  treeForm.name = ""
  treeForm.value = ""
}

const append = (data: Tree) => {
  if(treeForm.name==""){
    ElMessage.error("node name invalid")
    return
  }
  const newChild = {name: treeForm.name,value:treeForm.value, children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  treeInstance.data = [...treeInstance.data]
}

const update = (node: Node, data: Tree) => {
  const parent = node.parent
  const newChild = {name: treeForm.name,value:treeForm.value, children: [] }
  const children: Tree[] = parent.data.children || parent.data
  const index = children.findIndex((d) => d.name === data.name)
  children.splice(index, 1,newChild)
  treeInstance.data = [...treeInstance.data]
}

const remove = (node: Node, data: Tree) => {
  const parent = node.parent
  const children: Tree[] = parent.data.children || parent.data
  const index = children.findIndex((d) => d.name === data.name)
  children.splice(index, 1)
  treeInstance.data = [...treeInstance.data]
}

let treeInstance = reactive({data:[{
  name:"",
  value:"",
  children:[]
}]})

let structureBody =  reactive({
    id:null,
    name: "",
    value:"",
})

const defaultProps = {
  children: 'children',
  label: 'name',
  value: 'value',
}

const {proxy} = getCurrentInstance() as ComponentInternalInstance

const showDetail = ref(false)

const structureList = ref([])
const currentRelativeId = ref("")
const currentStructure = ref("")
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
          treeInstance.data = []
          treeInstance.data.push(resp.data.value)
          console.log(treeInstance.data)
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

const formSubmit = () =>{
  if(structureBody.id == null){
    addData()
  }else{
    updateData()
  }
}

const addData = () =>{
  structureBody.value = treeInstance.data[0];
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
  structureBody.value = treeInstance.data[0];
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

.treeOperate {
  margin-left:160px
}
</style>