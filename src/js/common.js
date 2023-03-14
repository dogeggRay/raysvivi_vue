
import { useStore } from 'vuex'

export function switchSideBar(value){
    let storeInstance = useStore()
    storeInstance.commit('setSideBarShow',value)
  }