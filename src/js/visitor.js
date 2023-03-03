import {isEmpty} from "@/utils/common.js"
import request from '@/utils/request'

const visitFlag = "visitHistory"
// PV/UV统计
// export function indicatorRecords(fullpath) {
//     let histories = sessionStorage.getItem(visitFlag)
    
//     if(isEmpty(histories)){
//         var tempArr = []
//         tempArr.push({name:fullpath})
//         sessionStorage.setItem(visitFlag,JSON.stringify(tempArr))
//         doRecords()
//     }else{
//         let findNode = JSON.parse(histories).filter((d) => d.name === fullpath)
//         if(isEmpty(findNode)){
//             doRecords()
//         }
//     }
    
// }

export function indicatorRecords(data){
    // return request({
    //     url: '/api/admin/article/saveArtcle',
    //     method: 'post',
    //     data,
    // })
}