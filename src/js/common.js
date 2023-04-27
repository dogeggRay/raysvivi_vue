
import { useStore } from 'vuex'

export function switchHomeMode(value){
    let storeInstance = useStore()
    storeInstance.commit('setHomeMode',value)
  }