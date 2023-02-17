import {
    getAccessToken,
    removeAccessToken,
    setAccessToken,
} from '@/utils/accessToken'
import { title, tokenName } from '@/config'
import { message, notification } from 'ant-design-vue'
import { getUserInfo, login, logout, refreshToken } from '@/js/admin'
import dateFormat from '@/utils/dateTime'
import store from '@/store'

const user = {
    namespaced : true,
    state: {
        accessToken: getAccessToken(),
        username: '',
        avatar: '',
    },
    mutations: {

         /**
         * @author chuzhixin 1204505056@qq.com
         * @description 设置accessToken
         * @param {*} state
         * @param {*} accessToken
         */
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken
            setAccessToken(accessToken)
        },

        /**
         * @author chuzhixin 1204505056@qq.com
         * @description 设置用户名
         * @param {*} state
         * @param {*} username
         */
        setUsername(state, username) {
            state.username = username
        },
        /**
         * @author chuzhixin 1204505056@qq.com
         * @description 设置头像
         * @param {*} state
         * @param {*} avatar
         */
        setAvatar(state, avatar) {
            state.avatar = avatar
        },
    },
    actions:{
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
            const { data } = await login(userInfo)
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
         * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
         * @param {*} { commit, dispatch, state }
         * @returns
         */
        async getUserInfo({ commit, dispatch, state }) {
            // const { data } = await getUserInfo(state.accessToken, localStorage.getItem('logintime'))
            // console.log('getUserInfo data', data)
            // if (!data) {
            //   message.error(`闲置超时，请重新登录...`)

            //   return false
            // }
            let { username, avatar, roles, ability } = {
            ability: ['READ', 'WRITE', 'DELETE'],
            avatar: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
            roles: [
                'postbackup_level',
                'postcode_level',
                'postdate_level',
                'postedit_level',
                'postemp_level',
                'postfinance_level',
                'postinfo_level',
                'postload_level',
                'postnotice_level',
                'postprint_level',
                'postpubedit_level',
                'postpubinfo_level',
                'postpubstat_level',
                'postpubsys_level',
                'postsearch_level',
                'poststat_level',
                'postsys_level',
                'postuser_level',
            ],
            username: 'srq',
            timeout: '2022/2/14 11:08:54',
            }
            if (username && roles && Array.isArray(roles)) {
            dispatch('acl/setRole', roles, { root: true })
            if (ability && ability.length > 0)
                dispatch('acl/setAbility', ability, { root: true })
            commit('setUsername', username)
            commit('setAvatar', avatar)
            } else {
            message.error('用户信息接口异常')
            }
        },

        /**
         * @author chuzhixin 1204505056@qq.com
         * @description 登录
         * @param {*} { commit }
         * @param {*} userInfo
         */
        async login({ commit }, userInfo) {
            const { data } = await login(userInfo)
            console.log(23333,data)
            var time = dateFormat(new Date())
            localStorage.setItem('USERID', data.user_id)
            localStorage.setItem('name_chn', data.name_chn)
            localStorage.setItem('logintime', time)
            localStorage.setItem('USERINFO', JSON.stringify(data))
            const accessToken = data[tokenName]
            const flag = data['flag']
            if (accessToken) {
                commit('setAccessToken', accessToken)
            } else {
                message.error(`登录接口异常，未正确返回${tokenName}...`)
            }
        },

        
    }
}

export default user