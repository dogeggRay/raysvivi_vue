
import {createStore} from 'vuex'
import {getAccessToken,setAccessToken,removeAccessToken} from '@/utils/accessToken'
import { tokenName } from '@/config'
import { message } from 'ant-design-vue'
import dateFormat from '@/utils/dateTime'
import { adminLogin } from '@/js/admin'
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
          username: '',
          avatar: '',
        }
    },
    mutations: {
        /**
         * @author chuzhixin 1204505056@qq.com
         * @description 设置accessToken
         * @param {*} state
         * @param {*} accessToken
         */
          setAccessToken(state:any, accessToken) {
            state.accessToken = accessToken
            setAccessToken(accessToken)
        },

        /**
         * @author chuzhixin 1204505056@qq.com
         * @description 设置用户名
         * @param {*} state
         * @param {*} username
         */
        setUsername(state:any, username) {
            state.username = username
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
              commit('setUsername', 'admin(未开启登录拦截)')
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
              console.log(4444,data)
              localStorage.setItem('USERID', data.user_id)
              localStorage.setItem('name_chn', data.name_chn)
              localStorage.setItem('logintime', dateFormat(new Date()))
              localStorage.setItem('USERINFO', JSON.stringify(data))
              const accessToken = data[tokenName]
              const flag = data['flag']
              if (accessToken) {
                  commit('setAccessToken', accessToken)
              } else {
                  message.error(`登录接口异常，未正确返回${tokenName}...`)
              }
          },
    },
    modules:{}
})

export default store