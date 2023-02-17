<template>
    <div class="login-box" :style="{height:screenHeigth+'px'}">{{screen_heigth}}
        <el-container class="main-container" >
            <el-header>
                <el-row class="top-row">
                    <el-col :span="6" ><span class="cursor-font" @click="declareClick">网站声明</span></el-col><el-col :span="18" ></el-col>
                </el-row>
            </el-header>
            <el-main class="main-main" v-bind:class="{ 'mask': maskEffective }">
                <div class="formDiv">
                    <el-form ref="ruleFormRef"
                        :model="ruleForm"
                        label-width="120px">
                        <el-form-item label="">
                            <el-input v-model="ruleForm.username" placeholder="请输入管理员账号"/>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input v-model="ruleForm.password" placeholder="请输入管理员密码"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button color="#0D1F2F" style="width:100px" @click="submitForm()">确定</el-button>
                        </el-form-item>
                    </el-form>




                    <div class="bottom-row">
                        <img alt="Vue logo" src="../img/beianguohui.png"/>
                        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34070202000554" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
                        <img src="" style="float:left;"/>
                            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">皖公网安备 34070202000554号</p>
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span style="display:inline-block;text-decoration:none;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393; position: relative;top: -5px;">ICP证</span>
                        <a target="_blank" href="https://beian.miit.gov.cn" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
                            <img src="" style="float:left;"/>
                            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">皖ICP备2022015508号-1</p>
                        </a>

                    </div>
                </div>
                
                
            </el-main>
        </el-container>
    </div>

    <div class="declareDialog"  v-bind:class="{ 'display-class': maskEffective ,'undisplay-class': !maskEffective }" @click="declareDialogClick">
        <span>尊敬的游客你好:</span>
        <br/>
        <span>我是你爹</span>
    </div>
</template>

<script lang="ts" setup>
import { ref ,reactive ,onMounted} from 'vue'
import { useStore } from 'vuex'
import {adminLogin} from "@/js/admin.js"
import { useRouter } from "vue-router"
import type { FormInstance, FormRules } from 'element-plus'
import { Md5 } from 'ts-md5'

let storeInstance = useStore()

const router = useRouter()
const screenHeigth = ref(0)
const maskEffective = ref(false)
const ruleForm = reactive({
    username:"",
    password:""
})

const ruleFormRef = ref()

onMounted(() => {
    
  initOptions()
})

const declareClick = ()=>{
    maskEffective.value = true;
}

const submitForm = async (formEl: FormInstance | undefined) => {
    console.log(1233333,storeInstance)
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {

        storeInstance.dispatch('login',{username:ruleForm.username,password:Md5.hashStr(ruleForm.password)}).then(res => { 
            console.log('返回来的值',res)
        })
        
        //storeInstance.dispatch("login",{username:ruleForm.username,password:Md5.hashStr(ruleForm.password)})
        // adminLogin({
        //     username:ruleForm.username,
        //     password:Md5.hashStr(ruleForm.password),
        // })
        //     .then((res) => {
        //         console.log(res)
        //     return
        //     })
        //     .catch((e) => {
        //     return
        //     })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const initOptions = () => {
    //  可视区域
    screenHeigth.value = document.documentElement.clientHeight-1;

}
const declareDialogClick = () => {

    maskEffective.value = false;
}
</script>

<style scoped lang="scss">
    .login-box{
        height: 100%;
        width: 100%;
        background-color: #121212;
    }

    .main-container{
        height:100%;
    }

    .main-main{
        background: url("../assets/background-01.jpg") no-repeat center;
        background-size: cover;
        .formDiv{
            width: 30rem;
            position: relative;
            top: 45%;
            left: 6%;
            border-radius: 8px;
            padding-right: 10rem;
            height: 54%;
        }
    }
    
    .bottom-row{
        font-size: xx-small;
        line-height: 50%;
        width: 30rem;
        text-align: right;
        position: absolute;
        bottom: 0px;
    }

    .top-row{
        font-size: xx-small;
        color:#939393;
        margin-top:1%
    }

    .main-row{
        font-size: xx-small;
        color:#939393;
        margin-top:13rem
    }
    .cursor-font{
        cursor: pointer;
    }

    .dialog-footer button:first-child {
        margin-right: 10px;
    }

    .mask{
        filter:blur(10px);
		-webkit-filter:blur(10px);
		-moz-filter:blur(10px);
		-ms-filter:blur(10px);
		-o-filter:blur(10px);
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

    .display-class{
        display:block;
    }

    .undisplay-class{
        display:none;
    }

</style>