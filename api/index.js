import Request from "./request/index.js";
import Config from "@/config/index.js";
import store from "@/store";
const http = new Request();

let errorCount = 0;
http.setConfig((config) =>
  Object.assign(config, {
    /* 根域名不同 */
    baseUrl: Config.baseUrl,
    /* api超时时间 */
    timeout: Config.apiTimeout,
  })
);

http.interceptors.request.use(async (config) => {
  if (!config.noToken) {
    // if (!store.state.token) await store.dispatch('getToken')
    config.header = {
      ...config.header,
      token: `${store.state.token}`,
    };
  }
  if (config.loading) {
    uni.showLoading({});
  }
  return config;
});

http.interceptors.response.use(
  async (resp) => {
    console.log("resp", resp);
    const { data, code, msg, login } = resp.data;
    // 根据需要打印日志方便调试
    if (Config.isConsole) console.log(resp.config.url, resp.data);
    if (resp.config.loading) {
      uni.hideLoading();
    }
    if (resp.config.raw) {
      return resp.data;
    }
    if (code === 200) {
      return data;
    }
    if ([500].includes(code)) {
      if (!resp.config.noTip) {
        uni.showToast({
          title: msg,
          icon: "none",
        });
      }
      if (login) {
        store.commit('setUserInfo', {})
        // 跳转到登录页
        uni.reLaunch({
          url: '/pages/login/index',
        })

      }
      return Promise.reject(resp.data);
    }
    if ([10027, 10025].includes(code)) {
      store.state.user.token = null;
      errorCount++;
      if (errorCount < 3) {
        return await http.request(resp.config);
      }
    }
    return data;
  },
  (resp) => resp
);

export default http;
