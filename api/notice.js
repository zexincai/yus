import http from '@/services/index.js'

export default {
	fetchNoticeById: (data) => http.get('/notice/getById', data),
	fetchNoticeDataList: (data) => http.get('/notice/getDataList', data)
}