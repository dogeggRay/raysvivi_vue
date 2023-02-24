<template>
  <div class = "inner-container">
     {{moduleId}}
    <el-input
        v-model="textarea"
        :rows="2"
        type="textarea"
        placeholder="Please input"
    />
    </div>
</template>
    
<script lang="ts" setup>
import { ref ,reactive,onMounted ,defineProps} from 'vue'
defineProps({
  moduleId: {
    type: String,
    required: true
  }
})
</script>

<style lang="less" scoped >
.about-card{
  height:800px;
  margin-left:10px;
  margin-right:10px;
}

.about-card >.el-card__body> .el-row{
  margin-bottom:15px;
}
</style>