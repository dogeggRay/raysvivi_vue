<template>
  <div class = "inner-container">123
<i class="el-icon-warning-outline"></i>
    <el-card class="support_card"  shadow="hover">
      <el-row>
            <el-col :span="24">
              <el-icon><Service /></el-icon>
            </el-col>
          </el-row>
          <el-divider style="margin: 13px 0px 13px 0px;"></el-divider>
      <el-row>
              <el-col :span="24">
                

                  <el-popover
                    placement="left"
                    :offset="50"
                    :show-arrow="false"
                    :width="400"
                    trigger="hover"
                  >
                  
                    <template #reference>
                      <el-icon><More /></el-icon>
                    </template>
                    <div class="declare_card"  shadow="hover">
                        <el-row>
                          <el-col :span="24"><div class="grid-content bg-purple-dark">留言建议 · 友情链接</div></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24"><div class="grid-content bg-purple-dark">{{copy_right}}</div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><div class="grid-content bg-purple-dark">{{declare_value}}</div></el-col>
                          </el-row>          
                        <el-row>
                          <el-col :span="24" style="margin-top:10px;text-align:right">
                              <img alt="Vue logo" src="@/img/beianguohui.png"/>
                              <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34070202000554" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
                              <img src="" style="float:left;"/>
                                  <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;">{{Public_security_record}}</p>
                              </a>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24" style="text-align:right">
                            <a target="_blank" href="https://beian.miit.gov.cn" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
                                <img src="" style="float:left;"/>
                                <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; ">{{ICP_Filing_record}}</p>
                            </a>
                          </el-col>
                        </el-row>

                    </div>
                  </el-popover>
              </el-col>
            </el-row>              
    </el-card>
      <!--  -->
    </div>
</template>

<script lang="ts" setup>

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const ICP_Filing_record = "皖ICP备2022015508号-1"
const Public_security_record = "皖公网安备 34070202000554号"
const copy_right = "Copyright © 2022 · Raysvivi"
const declare_value = "免责声明：本站部分资源来自互联网，仅供交流学习之用，请勿作商业用途，所有资源版权归原作者所有。如果有侵犯到您的权益，请联系本站【2105520190@qq.com】删除，谢谢合作！";
</script>

<style>
.inner-container{
  
  height:100%
}
.declare_card{
    font-size: xx-small;
    color:#939393;
}

.support_card{
  width:53px;
    position: fixed;
    right: 10px;
    bottom: 20px;  
}
</style>