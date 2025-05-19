import Request from './request/index.js'
import Config from '@/config/index.js'
import store from '@/store/index.js'
const http = new Request()

let errorCount = 0
http.setConfig((config) => Object.assign(config, {
	/* 根域名不同 */
	baseUrl: Config.baseUrl,
	/* api超时时间 */
	timeout: Config.apiTimeout,
}))

http.interceptors.request.use(async (config) => {
	if (!config.noToken) {
		if (!store.state.user.token) await store.dispatch('getMinaSession')
		config.header = {
			...config.header,
			token: `${store.state.user.token}`
		}
	}
	if (config.loading) {
		uni.showLoading({})
	}
	return config
})

http.interceptors.response.use(async (resp) => {
	const {
		data,
		code,
		message,
	} = resp.data
	// 根据需要打印日志方便调试
	if (Config.isConsole) console.log(resp.config.url, resp.data)
	if (resp.config.loading) {
		uni.hideLoading()
	}
	if (code === 200) {
		return data
	}
	if ([10018].includes(code)) {
		uni.showToast({
			title: msg,
			icon: 'none',
		})
		return Promise.reject(resp.data)
	}
	if ([10027, 10025].includes(code)) {
		store.state.user.token = null
		errorCount++
		if (errorCount < 3) {
			return await http.request(resp.config)
		}

	}
	return resp
}, (resp) => resp)

export default http