export function getStorageValue(key) {
  return sessionStorage.getItem(key)
}

export function setStorageObject(object) {
    const keys = Object.keys(object)
    let obj = {}
    keys.forEach((item) => {
      console.log(item,object[item])
      sessionStorage.setItem(item, object[item])
    })
  return
}

export function isEmpty(value) {
    if(value==null||value==undefined||value.length==0){
        return true
    }
    return false
}

export function initialReactive (info){
    const keys = Object.keys(info)
    let obj = {}
    keys.forEach((item) => {
      obj[item] = ""
    })
    Object.assign(info, obj);
  }
  