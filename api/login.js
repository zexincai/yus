import http from './index.js'

export const managerLogin = (data) => http.post('https://app.usayuq.com/ma/home/managerLogin', data, { loading: true })

export const passwordReset = (data) => http.post('https://app.usayuq.com/ma/home/passwordReset', data)

export const getCaptcha = (data) => http.post('https://app.usayuq.com/ma/home/captcha', data)

export const appleLogin = (data) => http.post('https://app.usayuq.com/ma/home/appleLogin', data)

export const registerUser = (data) => http.post('https://app.usayuq.com/ma/home/registerUser', data)
