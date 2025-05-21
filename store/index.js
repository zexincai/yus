import { createStore } from 'vuex'
const store = createStore({
    state: {
        token: uni.getStorageSync('token'), userInfo: uni.getStorageSync('userInfo') || {}
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
            state.token = userInfo.token
            uni.setStorageSync('token', userInfo.token)
            uni.setStorageSync('userInfo', userInfo)
        }
    },
    actions: {
        getToken({ commit }) {
            return ''
        }
    }
})
export default store