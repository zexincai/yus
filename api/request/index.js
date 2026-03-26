import {
	buildURL,
	combineURLs,
	forEach,
	isAbsoluteURL,
} from './utils.js'

import InterceptorManager from './InterceptorManager.js'
/**
 * 封装基础请求库
 */
export default class Request {
	constructor() {
		/* 基础默认配置 */
		this.config = {
			baseUrl: '',
			header: {
				'appId': 'wxc65bb3c6e7698487',
				// 'content-type': 'application/json',
				'content-type': 'application/x-www-form-urlencoded',
			},
			method: 'get',
			dataType: 'json',
			responseType: 'text',
			timeout: '60000',
		}

		this.interceptors = {
			request: new InterceptorManager(),
			response: new InterceptorManager(),
		}

		forEach(['delete', 'get', 'head', 'options', 'post', 'put', 'patch'], (method) => {
			this[method] = function (url, data = {}, config) {
				return this.request({
					...config,
					method,
					url,
					...['post', 'put', 'patch'].includes(method) ? {
						data,
					} : {
						params: data,
					},
				})
			}
		})

	}

	// 设置全局默认配置
	setConfig(f) {
		this.config = f(this.config)
	}

	async request(config = {}) {
		config = {
			...this.config,
			...config,
		}
		const url = isAbsoluteURL(config.url) ? config.url : combineURLs(config.baseUrl, config.url)
		config.url = buildURL(url, config.params)

		const dispatchRequest = async (config) => {
			const resp = await uni.request(config)
			return {
				config,
				...resp,
			}
		}
		// Hook up interceptors middleware
		const chain = [dispatchRequest, undefined]
		this.interceptors.request.forEach((interceptor) => {
			chain.unshift(interceptor.fulfilled, interceptor.rejected)
		})
		this.interceptors.response.forEach((interceptor) => {
			chain.push(interceptor.fulfilled, interceptor.rejected)
		})
		let promise = Promise.resolve(config)

		while (chain.length) {
			promise = promise.then(chain.shift(), chain.shift())
		}
		return promise
	}
}