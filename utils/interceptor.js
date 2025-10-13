import permisionUtil from "./permission.js";

const permisionMap = {
  chooseImage: async function () {
    try {
      const status1 = await permisionUtil.requestAndroidPermission("android.permission.CAMERA");
      const status2 = await permisionUtil.requestAndroidPermission("android.permission.READ_EXTERNAL_STORAGE");
      if (status1 == 1 || status2 == 1) {
        return Promise.resolve(1);
      } else {
        return Promise.resolve(-1);
      }
    } catch (e) {
      return Promise.resolve(0);
    }
  },
  chooseVideo: async function () {
    try {
      const status1 = await permisionUtil.requestAndroidPermission("android.permission.CAMERA");
      const status2 = await permisionUtil.requestAndroidPermission("android.permission.READ_EXTERNAL_STORAGE");
      if (status1 == 1 || status2 == 1) {
        return Promise.resolve(1);
      } else {
        return Promise.resolve(-1);
      }
    } catch (e) {
      return Promise.resolve(0);
    }
  },
  saveImageToPhotosAlbum: async function () {
    try {
      const status = await permisionUtil.requestAndroidPermission("android.permission.WRITE_EXTERNAL_STORAGE");
      return Promise.resolve(status);
    } catch (e) {
      return Promise.resolve(0);
    }
  },
  getLocation: async function () {
    try {
      const status = await permisionUtil.requestAndroidPermission("android.permission.ACCESS_FINE_LOCATION");
      return Promise.resolve(status);
    } catch (e) {
      return Promise.resolve(0);
    }
  },
  makePhoneCall: async function () {
    try {
      const status = await permisionUtil.requestAndroidPermission("android.permission.CALL_PHONE");
      return Promise.resolve(status);
    } catch (e) {
      return Promise.resolve(0);
    }
  }
};

const resultHandler = function (args, err) {
  args.fail && args.fail(err);
  args.complete && args.complete(err);
};

/**
 * @func addPermisionInterceptor
 * @desc 添加权限申请说明
 * @param {String} permisionName 要拦截的 uniApi 名称
 * @param {String} content 申请权限说明信息
 * @return {}
 * @Author huiliyi
 * @Email 1824159241@qq.com
 */
export const addPermissionInterceptor = function (permisionName, content) {
  const prefix = "permision_";
  uni.addInterceptor(permisionName, {
    invoke(args) {
      const { uniPlatform, platform } = uni.getSystemInfoSync();
      if (uniPlatform != "app" || platform != "android") return true;
      return new Promise((resolve, reject) => {
        if (uni.getStorageSync(prefix + permisionName) == 1) {
          resolve(args);
          return;
        }
        uni.showModal({
          title: "权限申请说明",
          content,
          cancelText: "不同意",
          confirmText: "同意",
          success: async res => {
            try {
              if (res.confirm) {
                let status = 0;
                if (permisionMap[permisionName]) {
                  status = await permisionMap[permisionName]();
                } else {
                  status = 1;
                  console.error(`addPermisionInterceptor fail, ${permisionName}-未配置获取权限方法`);
                }
                uni.setStorageSync(prefix + permisionName, status);
                if (status === 1) {
                  resolve(args);
                }
                if (status === 0) {
                  reject(args);
                  resultHandler(args, {
                    errMsg: "申请权限失败"
                  });
                }
                if (status === -1) {
                  reject(args);
                  resultHandler(args, {
                    errMsg: "用户已拒绝该权限"
                  });
                  uni.showModal({
                    title: "是否前往开启权限?",
                    cancelText: "否",
                    confirmText: "是",
                    success: res => {
                      if (res.confirm) {
                        permisionUtil.gotoAppPermissionSetting();
                      }
                    }
                  });
                }
              }
              if (res.cancel) {
                uni.setStorageSync(prefix + permisionName, 0);
                reject(args);
                resultHandler(args, {
                  errMsg: "用户不同意申请权限"
                });
              }
            } catch (err) {
              reject(args);
              resultHandler(args, err);
            }
          },
          fail: err => {
            reject(args);
            resultHandler(args, err);
          }
        });
      });
    },
    fail(err) {
      console.log("interceptor-fail", err);
      if (err.errMsg.includes("fail No Permission") || (err.errMsg == "getLocation:fail 获取定位权限失败" && err.code == 22)) {
        uni.setStorageSync(prefix + permisionName, 0);
        uni.showModal({
          title: "是否前往开启权限?",
          cancelText: "否",
          confirmText: "是",
          success: res => {
            if (res.confirm) {
              permisionUtil.gotoAppPermissionSetting();
            }
          }
        });
      }
    }
  });
};
