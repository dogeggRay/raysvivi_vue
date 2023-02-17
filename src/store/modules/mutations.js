import {setAccessToken} from '@/utils/accessToken'
const mutations = {
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
}

export {mutations}