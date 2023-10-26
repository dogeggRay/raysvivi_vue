<template>
  <div id="app" style="padding:0px">
    <!-- 准备一个容器用来存放音乐播放器 -->
    <div id="aplayer"></div>
  </div>
</template>

<script lang="ts" setup>
import APlayer from "APlayer"; // 引入音乐插件
import '@/assets/css/prism/prism.min.css'
import "APlayer/dist/APlayer.min.css"; // 引入音乐插件的样式
import { ref ,reactive,onActivated,onMounted,shallowRef,nextTick,defineExpose,defineProps,defineEmits } from 'vue'
let playerInstance = ref()
let audio = ref([ // 歌曲列表
        {
          name: "不能说的秘密", // 歌曲名字
          artist: "林俊杰", // 歌曲演唱者
          url: // 歌曲地址（这里用外链地址）
            "/music/JJ_unspeakable_secret.ogg",
          cover: "/localmeme/meme_music_cat.gif", // 歌曲头像
          lrc: "", // 歌词
          theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色
        }, {
          name: "2020全球总决赛主题交响乐", // 歌曲名字
          artist: "英雄联盟", // 歌曲演唱者
          url: // 歌曲地址（这里用外链地址）
            "/music/LOL_2020_Theme Symphony.ogg",
          cover: "/localmeme/meme_music_cat.gif", // 歌曲头像
          lrc: "", // 歌词
          theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色
        },
      ]) 
const info = reactive({
        fixed: false, // 不开启吸底模式
        listFolded: true, // 折叠歌曲列表
        autoplay: false, // 开启自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "list", //  播放模式，list列表播放, random随机播放
      })

onMounted(()=>{
  initAudio();
})

onActivated(() => {
  
})      

const initAudio = () => {
  // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
  playerInstance = new APlayer({
    container: document.getElementById("aplayer"),
    audio: audio.value, // 音乐信息
    ...info, // 其他配置信息
  });
}
/** export default {
  name: "App",
  data() {
    return {
      
    };
  },
  mounted() {
    // 初始化播放器
    this.initAudio();
  },
  methods: {
    
  },
};*/
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  padding: 50px;
  #aplayer {
    float:right;
    box-shadow:5px 5px 5px rgba(0,0,0,0.5)
  }  


}

:deep( .aplayer-icon-loop){
    display:inline!important;
  }
//小屏配置
@media screen
and (max-device-width : 768px) {
  #aplayer {
    width: 270px; // 定个宽度
  }
}

@media screen
and (min-device-width : 768px){
  #aplayer {
    width: 480px; // 定个宽度
  }
}

</style>