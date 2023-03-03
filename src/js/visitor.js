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
    let body = {
        moduleName:data.meta.module,
        relativeId:isEmpty(data.query.relativeId)?"-1":data.query.relativeId
    }
    console.log(body)
    return request({
        url: '/api/tourist/record/footstepRecord',
        method: 'post',
        data:body,
    })
}