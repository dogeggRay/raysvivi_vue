<template>
  <div class = "inner-container">
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
    
      <!--  -->
    </div>
</template>

<script lang="ts" setup>

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
  position: absolute;
    top: 12%;
    width: 270px;
    text-align: center;
}
</style>