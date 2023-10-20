// ==== buildShortUUID  函数====
let unique = 0;
export function buildShortUUID (prefix = '') {
    const time = Date.now()
    const random = Math.floor(Math.random() * 1000000000)
    unique++
    return prefix + '_' + random + unique + String(time)
}

//[1,upperNum]
export function getRandomBg0(upperNum){
    var aNumber = (upperNum) * Math.random()+1;
    return Math.floor(aNumber);
}