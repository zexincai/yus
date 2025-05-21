import http from './index.js'

export const getDeviceGroupMsg = (data) => http.post('https://fuhui.wetime520.cn/bili/ma/dealer/deviceGroupMsg', data, { loading: true })

export const equipmentStatistics = (data) => http.post('https://yuq.fenaor.com/ma/dealer/equipmentStatistics', data, { loading: true })

export const loadDeviceBaseInfo = (data) => http.post('https://yuq.fenaor.com/ma/dealer/loadDeviceBaseInfo', data, { loading: true })

export const activeCmd = (data) => http.post('https://yuq.fenaor.com/ma/dealer/activeCmd', data, { loading: true })

export const activeCmdResult = (data) => http.post('https://yuq.fenaor.com/ma/dealer/activeCmdResult', data, { loading: true })

export const activeDevice = (data) => http.post('https://yuq.fenaor.com/ma/dealer/activeDevice', data, { loading: true })

export const searchCustomerByPhone = (data, config) => http.post('https://yuq.fenaor.com/ma/dealer/searchCustomerByPhone', data, config)

