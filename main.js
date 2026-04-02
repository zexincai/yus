import App from "./App";
import store from "./store";
import { addPermisionInterceptor } from "@/utils/js_sdk/index.js";

addPermisionInterceptor(
  "chooseImage",
  "为了修改个人头像和发布信息图片视频等, 我们需要申请您设备的相机和存储权限",
);
addPermisionInterceptor(
  "chooseVideo",
  "为了发布信息图片视频等, 我们需要申请您设备的相机和存储权限",
);
addPermisionInterceptor(
  "saveImageToPhotosAlbum",
  "为了保存推广海报到手机相册, 我们需要申请您设备的存储权限",
);
addPermisionInterceptor(
  "getLocation",
  "为了根据您的位置展示信息, 我们需要申请您设备的位置权限",
);
addPermisionInterceptor(
  "makePhoneCall",
  "为了联系客服/用户/咨询等, 我们需要申请您设备的拨打电话权限",
);
addPermisionInterceptor(
  "getRecorderManager",
  "为了使用语言消息功能等, 我们需要申请您设备的麦克风权限",
);
addPermisionInterceptor(
  "startLocationUpdate",
  "为了根据您的位置展示信息, 我们需要申请您设备的位置权限",
);
addPermisionInterceptor(
  "scanCode",
  "为了识别二维码信息, 我们需要申请您设备的相机和存储权限",
);

// #ifndef VUE3
import Vue from "vue";
import "./uni.promisify.adaptor";
Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  return {
    app,
  };
}
// #endif
