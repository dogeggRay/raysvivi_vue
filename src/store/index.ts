
import {createStore} from 'vuex'
import {getAccessToken,setAccessToken,removeAccessToken} from '@/utils/accessToken'
import { tokenName } from '@/config'
import { message } from 'ant-design-vue'
import { adminLogin ,getTags } from '@/js/admin'

const store = createStore({

    state() { 
        return {
          accessToken: getAccessToken(),
          touristName: '',
          avatar: '',
          tagMap:null,
          homeMode:true,
          currentTag:"",
          articleKeyWord:"",
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
      homeMode(state:any){
        return state.homeMode
      },
      currentTag(state:any){
        return state.currentTag
      },
      articleKeyWord(state:any){
        return state.articleKeyWord
      }
    },
    mutations: {
        setAccessToken(state:any, accessToken) {
            state.accessToken = accessToken
            setAccessToken(accessToken)
        },

        setTagMap(state:any,tagMap) {
          state.tagMap = tagMap
        },
        setHomeMode(state:any,homeMode) {
          state.homeMode = homeMode
        },
        setCurrentTag(state:any,currentTag){
          state.currentTag = currentTag
        },

        setTouristname(state:any, touristName) {
            state.touristName = touristName
        },
        
        setAvatar(state:any, avatar) {
            state.avatar = avatar
        },
        setArticleKeyWord(state:any, articleKeyWord) {
            state.articleKeyWord = articleKeyWord
        }
    },
    actions: {

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
              console.log("action.setAccessToken access")
              commit('setAccessToken', accessToken)
          },

          

          /**
           * @description 登录
           * @param {*} { commit }
           * @param {*} userInfo
           */
          async login({ commit }, userInfo) {
            console.log("action.login access")
              const { data } = await adminLogin(userInfo)
              localStorage.setItem('USERINFO', JSON.stringify(data))
              const accessToken = data[tokenName]
              const flag = data['flag']
              if (accessToken) {
                  commit('setAccessToken', accessToken)
              } else {
                  message.error(`登录接口异常，未正确返回${tokenName}...`)
              }
          },

          async initTag({ commit }) {
            const {data} = await getTags()
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