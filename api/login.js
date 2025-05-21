import http from './index.js'

export const managerLogin = (data) => http.post('https://yuq.fenaor.com/ma/home/managerLogin', data, { loading: true })

export const passwordReset = (data) => http.post('https://yuq.fenaor.com/ma/home/passwordReset', data)

export const getCaptcha = (data) => http.post('https://yuq.fenaor.com/ma/home/captcha', data)
