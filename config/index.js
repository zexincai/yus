const app = {
	// API 版本号
	apiVersion: '7.1',
	// 小程序渠道编码
	channel: 1012,
	// 莲花管家渠道标识
	clientCode: 3,
	// 接口超时时长
	apiTimeout: 60000,
	// 接口头部是否携带token
	authCheck: false,
	// 接口是否显示加载弹窗
	isLoading: true,
	/*
	 * 是否在控制台打印接口信息
	 * TODO 根据发行还是运行
	 */
	isConsole: true,
	// 错误信息是否上报
	isErrorReport: false,
}

const proConfig = {
	baseUrl: 'https://micro.xunzhaotech.com/api/studyCourses/api',
	uploadUrl: 'https://micro.xunzhaotech.com/api/file/upload',
}
const devConfig = {
	baseUrl: 'https://micro.xunzhaotech.com/api/studyCourses/api',
	uploadUrl: 'https://micro.xunzhaotech.com/api/file/upload',
}



export default {
	...app,
	...process.env.NODE_ENV === 'production' ? proConfig : devConfig,
}