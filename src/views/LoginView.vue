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
                        <el-form-item label="账号">
                            <el-input v-model="ruleForm.username" />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="ruleForm.password" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
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
import { useRouter } from "vue-router"
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const screenHeigth = ref(0)
const maskEffective = ref(false)
const ruleForm = reactive({
    username:"",
    password:""
})

const ruleFormRef = ref<FormInstance>()

onMounted(() => {
  initOptions()
})

const declareClick = ()=>{
    maskEffective.value = true;
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      //console.log('submit!')
      router.push("about");
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
            left: 56%;
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