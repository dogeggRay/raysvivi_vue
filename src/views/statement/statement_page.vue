<template>
  <div class = "inner-container">
    <!-- 统计板 -->
        <el-card class="card_me"  shadow="hover">
                  <div class="card_me_main">
                    <div class="normal_header"></div>
                    <div class="normal_main">
                        <div class="my_head"></div>
                        <div class="normal_main_title fine-font">下路一直叫我去 我怎么去啊</div>
                    </div>
                    <div class="normal_footer">
                      <el-row>
                        <el-col :span="8" style="text-align:center"><span class="fine-font">文章</span></el-col>
                        <el-col :span="8" style="text-align:center"><span class="fine-font">留言</span></el-col>
                        <el-col :span="8" style="text-align:center"><span class="fine-font">浏览</span></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8" style="text-align:center"><span class="fine-font">0</span></el-col>
                        <el-col :span="8" style="text-align:center"><span class="fine-font">0</span></el-col>
                        <el-col :span="8" style="text-align:center"><span class="fine-font">0</span></el-col>
                      </el-row>
                    </div>
                  </div>
        </el-card>

        <div v-bind:class="{ 'fix_now': fix_flag }">
            <!-- 搜索框 -->
            <el-card class="card_search"  shadow="hover">
              <el-input
                v-model="SearchKey"
                placeholder="输入关键字搜索"
                class="input-with-select"
              >
                <template #append>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
            </el-card>
          <!-- 标签框 -->
            <el-card class="card_search"  shadow="hover">
                    <el-tag
                      v-for="item in items"
                      :key="item.label"
                      :type="item.type"
                      class="mx-1 tag_node"
                      effect="dark"
                    >
                      {{ item.label }}
                    </el-tag>
            </el-card>

            <!-- 声明框 -->
            <el-card class="card_search"  shadow="hover">
              <el-row>
                <el-col :span="24"><div class="fine-font small-font">{{copy_right}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="margin-top:10px;"><div class="fine-font small-font">{{declare_value}}</div>
                </el-col>
                </el-row>          
              <el-row>
                <el-col :span="24" style="margin-top:10px;">
                  
                  <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34070202000554" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
                  <img alt="Vue logo" src="@/img/beianguohui.png"/>
                  <img src="" style="float:left;"/>
                    <p style="float:left;height:20px;line-height:20px;margin: 0px;" class="fine-font small-font">{{Public_security_record}}</p>
                  </a>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                <a target="_blank" href="https://beian.miit.gov.cn" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
                  <img src="" style="float:left;"/>
                  <p style="float:left;height:20px;line-height:20px;margin: 0px; " class="fine-font small-font">{{ICP_Filing_record}}</p>
                </a>
                </el-col>
              </el-row>
            </el-card>
        </div>    
    </div>
</template>

<script lang="ts" setup>

import { ref ,onMounted,onBeforeUnmount } from 'vue'
import type { TagProps } from 'element-plus'
type Item = { type: TagProps['type']; label: string }

const ICP_Filing_record = "皖ICP备2022015508号-1"
const Public_security_record = "皖公网安备 34070202000554号"
const copy_right = "Copyright © 2023 · Raysvivi"
const declare_value = "任何反馈请联系[2105520190@qq.com]";
const items = ref<Array<Item>>([
  { type: '', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'danger', label: 'Tag 4' },
  { type: 'warning', label: 'Tag 5' },
])

const SearchKey = ref("")
const fix_flag = ref(false)
onMounted(() => {
  window.addEventListener('scroll', sorlly)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', sorlly)
})

const sorlly= () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;


    //console.log(scrollTop+"+"+clientHeight+"??"+scrollHeight);
    if(scrollTop>=380){
        fix_flag.value = true
    }else{
        fix_flag.value = false
    }
    //如果触底就让index++
    
}    
</script>

<style lang="less">
.inner-container{
  height:100%
}

.card_me,.card_me>.el-card__body{
  width:270px;
  height:250px;
  padding:0px;
  margin-top: -1px;
}

.card_search{
  margin-top:10px;
  width:270px;
  padding:0px;
}

.card_me_main{
  padding:0px;
  height:251px;
}

.normal_header{
  height:40%;
  padding:0px;
  background: url("@/assets/background-03.png") no-repeat center;
  background-size: cover;
}

.normal_main{
  height:40%;
  padding:0px;
}

.normal_footer{
  height:20%;
  padding:0px;
}

.my_head{
  width:90px;
  height:90px;
  border-radius: 50%;
  margin: auto;
  background: url("@/assets/header_01.png") no-repeat center;
  position:relative;
  top:-40px;
  border-width: 4px;
  border-style: solid;
  border-color: white;  
}

.normal_main_header{
    position: absolute;
    width: 270px;
    top: 12%;
    margin: auto;
}

.normal_main_title{
  position: relative;
    top: -39%;
    width: 270px;
    text-align: center;
}

.tag_node{
  margin-left:5px;
  margin-bottom:5px
}

.fix_now{
  position:fixed;
  top: 0px;
}
</style>