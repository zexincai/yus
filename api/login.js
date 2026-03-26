import http from './index.js'

export const managerLogin = (data) => http.post('https://yuq.fenaor.com/ma/home/managerLogin', data, { loading: true })

export const passwordReset = (data) => http.post('https://yuq.fenaor.com/ma/home/passwordReset', data)

export const getCaptcha = (data) => http.post('https://yuq.fenaor.com/ma/home/captcha', data)

export const appleLogin = (data) => http.post('https://yuq.fenaor.com/ma/home/appleLogin', data)

export const registerUser = (data) => http.post('https://yuq.fenaor.com/ma/home/registerUser', data)

export const getLoginPageConfig = (data) =>
  http.get("https://yuq.fenaor.com/ma/home/loginPageConfig", data, {
    loading: true,
  });