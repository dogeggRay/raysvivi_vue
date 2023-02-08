// ==== buildShortUUID  函数====
let unique = 0;
export function buildShortUUID (prefix = '') {
    const time = Date.now()
    const random = Math.floor(Math.random() * 1000000000)
    unique++
    return prefix + '_' + random + unique + String(time)
}