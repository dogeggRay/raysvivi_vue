<template>
  <div id="echartTreeDiv" style="min-height: 500px;">
   <div id="chartIns" style="min-height: 500px; width: 100%"></div>

  </div>
</template>
<script setup>
import { ref, reactive, onMounted ,onActivated,watch,nextTick,defineProps,onBeforeUnmount,defineEmits } from 'vue'
import { ElMessage, ElMessageBox, ElButton } from 'element-plus'
import * as echarts from "echarts"
const outerProps = defineProps({
    echartsData:{
        required: true,
        default:null
    },
})

const outerEmits = defineEmits(['nodeClick'])
let echartsDataResponsive=ref(outerProps.echartsData)
watch(() => outerProps.echartsData ,(newValue, oldValue) => {
    //console.log("watch1111111111",JSON.parse(JSON.stringify(echartsDataResponsive.value)))
  refreshEchart()
});

onActivated(() => {
    //console.log("onActivated11111111111",JSON.parse(JSON.stringify(echartsDataResponsive.value)))
    //refreshEchart()
})

onMounted(() => {
    //console.log("onMounted1111111111",JSON.parse(JSON.stringify(echartsDataResponsive.value)))
    //refreshEchart()
})

const chartInstance = ref()
const drawOption = reactive({
    title: {
        text: '',//TODO
    },
    series: [{
        height:"450",
        type: 'tree',
        name:'treeSeries',
        roam: true,
        layout: 'orthogonal',
        orient: 'LR',
        symbol: 'emptyCircle',
        symbolSize: 10,
        left:70,
        initialTreeDepth: -1,
        edgeShape:'polyline',
        label: {
            show: true,
            position: ['0%', '50%'],
            backgroundColor: '#354A5E',
            
			borderRadius: 5,
			width: 110,
            height:20,
            verticalAlign: 'middle',
            color:'white',
            padding:[10,0,0,0],
            formatter:(param)=>{
                if(param.value&&param.value.length>0){
                    return '{link| ≡ '+param.name+'}'
                }
                return '{noLink| '+param.name+'}'
            },
            rich:{
                link:{
                    fontWeight:'bolder',
                    fontSize:15,
                },
                noLink:{
                    fontSize:15,
                },
                underLine:{
                    borderWidth:1,
                    borderType:'solid',
                    borderColor:'red',
                }
            }
        },
        lineStyle:{
            curveness:"0.7",
        },
        expandAndCollapse:false,
        selectedMode:"single",
        select:{
            disabled:false,
            itemStyle:{
                color:"#B03A5B"
            },
        },

        emphasis:{
            disabled:false,
            focus:"ancestor",
            itemStyle:{
                color:"#B03A5B"
            },
            labelStyle:{
                color:"#B03A5B"
            },
        },
        leaves:{
            label: {
                show: true,
                position:'right',
            },
        },
        data: []
    }]
})


const refreshEchart=()=>{
    nextTick(()=>{
        let tempArr = [];
        tempArr.push(JSON.parse(JSON.stringify(outerProps.echartsData.data)));
        drawOption.series[0].data = tempArr;
        var myChart = echarts.init(document.getElementById("chartIns"));
        myChart.setOption(drawOption);
        chartInstance.value = myChart;
        myChart.on('click', function (params) {
            chartsNodeClick(params.value)
        });
    })

    
}

const chartsNodeClick=(nodeValue) =>{
    outerEmits("nodeClick", nodeValue)
}

onBeforeUnmount(()=>{
  chartInstance.value.dispose()
})

</script>
<style lang="less" scoped>

</style>