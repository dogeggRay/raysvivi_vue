import {getAccessToken} from '@/utils/accessToken'
const state = {
    accessToken: getAccessToken(),
    username: '',
    avatar: '',
}

export {state}