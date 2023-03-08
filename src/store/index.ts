
import {createStore} from 'vuex'
import {getAccessToken,setAccessToken,removeAccessToken} from '@/utils/accessToken'
import { tokenName } from '@/config'
import { message } from 'ant-design-vue'
import { adminLogin ,getTags } from '@/js/admin'
// import state from "./modules/state";
// import mutations from "./modules/mutations.js";
// import actions from "./modules/actions";

// export default createStore({
//   state,
//   mutations,
//   actions,
//   modules:{}
// })

const store = createStore({

    state() { 
        return {
          accessToken: getAccessToken(),
          touristName: '',
          avatar: '',
          tagMap:null
        }
    },
    getters:{
      accessToken(state:any){
        return state.accessToken
      },
      touristName(state:any){
        return state.touristName
      },
      tagMap(state:any){
        return state.tagMap
      },
    },
    mutations: {
        /**
         * @author chuzhixin 1204505056@qq.com
         * @description 设置accessToken
         * @param {*} state
         * @param {*} accessToken
         */
          setAccessToken(state:any, accessToken) {
            console.log("mutations.accessToken",accessToken)
            state.accessToken = accessToken
            setAccessToken(accessToken)
        },

        setTagMap(state:any,tagMap) {
          state.tagMap = tagMap
        },

        /**
         * @author chuzhixin 1204505056@qq.com
         * @description 设置用户名
         * @param {*} state
         * @param {*} touristName
         */
        setTouristname(state:any, touristName) {
            state.touristName = touristName
        },
        /**
         * @author chuzhixin 1204505056@qq.com
         * @description 设置头像
         * @param {*} state
         * @param {*} avatar
         */
        setAvatar(state:any, avatar) {
            state.avatar = avatar
        },
    },
    actions: {
        /**
         * @author chuzhixin 1204505056@qq.com
         * @description 登录拦截放行时，设置虚拟角色
         * @param {*} { commit, dispatch }
         */
            setVirtualRoles({ commit, dispatch }) {
              dispatch('acl/setFull', true, { root: true })
              commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
              commit('setTourist', 'admin(未开启登录拦截)')
          },

          async simulationLogin({ commit }, userInfo) {
              const { data } = await adminLogin(userInfo)
              const accessToken = data[tokenName]
              if (accessToken) {
                commit('setAccessToken', accessToken)
                return true
              } else {
                return false
              }
            },
            simulationLoginByToken({ commit }, token) {
              if (token) {
                commit('setAccessToken', token)
                return true
              } else {
                return false
              }
            },

          /**
           *  退出登录
           */
          async logout({ dispatch }) {
              localStorage.clear()
              // await logout(state.accessToken)
              await dispatch('resetAll')
          },
          /**
           * @author chuzhixin 1204505056@qq.com
           * @description 重置accessToken、roles、ability、router等
           * @param {*} { commit, dispatch }
           */
          async resetAll({ dispatch }) {
              await dispatch('setAccessToken', '')
              await dispatch('acl/setFull', false, { root: true })
              await dispatch('acl/setRole', [], { root: true })
              await dispatch('acl/setAbility', [], { root: true })
              store.dispatch('routes/initRoutes')
              removeAccessToken()
          },
          /**
           * @author chuzhixin 1204505056@qq.com
           * @description 设置token
           */
          setAccessToken({ commit }, accessToken) {
              commit('setAccessToken', accessToken)
          },

          

          /**
           * @author chuzhixin 1204505056@qq.com
           * @description 登录
           * @param {*} { commit }
           * @param {*} userInfo
           */
          async login({ commit }, userInfo) {
              const { data } = await adminLogin(userInfo)
              // localStorage.setItem('USERID', data.user_id)
              // localStorage.setItem('name_chn', data.name_chn)
              //localStorage.setItem('logintime', dateFormat(new Date()))
              localStorage.setItem('USERINFO', JSON.stringify(data))
              console.log("tokenName",tokenName)
              const accessToken = data[tokenName]
              console.log("accessToken",accessToken)
              const flag = data['flag']
              if (accessToken) {
                  commit('setAccessToken', accessToken)
              } else {
                  message.error(`登录接口异常，未正确返回${tokenName}...`)
              }
          },

          async initTag({ commit }) {
            const {data} = await getTags()
          debugger
            const tempMap = new Map()
            if (data) {
              data.forEach(element => {
                    tempMap.set(element.value,element.name)
              });
              commit('setTagMap', tempMap)
            }
          }
    },
    modules:{}
})

export default store