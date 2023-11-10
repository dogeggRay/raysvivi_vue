<template>
  <div>
    <el-image
      style="width: 0px"
      :src="imageUrls[0]"
      :zoom-rate="1"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="imageUrls"
      :initial-index="4"
      fit="cover"
      id="imagePreview" 
      hide-on-click-modal="true"
    />  
  </div>

</template>
<script lang="ts" setup>
import { ref,onMounted,defineExpose,defineProps,nextTick  } from 'vue'
//父传子属性step1:接收
const props = defineProps({
    imageUrls:{
        type:Array,
        default:[""]
    }
})

//document.getElementById('imagePreview').click()

const imageShow = () => {
    nextTick(() => {
        console.log(props.imageUrls)
        let showDom = document.getElementById('imagePreview')
        if(showDom){ showDom.click()}
    });
}

const imagesHide = () =>{
    //el-image-viewer__btn el-image-viewer__close

    // let domImageView = document.querySelector(".el-image-viewer__mask"); // 获取遮罩层dom
    // let closeEle = document.querySelector(".el-image-viewer__close"); // 获取遮罩层关闭按钮dom
    // if (!domImageView || !closeEle) {
    //   return;
    // }
        let close = document.querySelector(".el-image-viewer__close");
        console.log(close)
        if(close){ close.click()}
}

defineExpose({
    imageShow,
    imagesHide
})

onMounted(()=>{
})
const imageRef = ref();
</script>
<style>
.el-image-viewer__canvas img{
    max-width:800px!important;
}
</style>