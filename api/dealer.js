import http from "./index.js";

export const getDeviceGroupMsg = (data) =>
  http.post("https://fuhui.wetime520.cn/bili/ma/dealer/deviceGroupMsg", data, {
    loading: true,
  });

export const equipmentStatistics = (data) =>
  http.post("https://yuq.fenaor.com/ma/dealer/equipmentStatistics", data, {
    loading: true,
  });

export const loadDeviceBaseInfo = (data) =>
  http.post("https://yuq.fenaor.com/ma/dealer/loadDeviceBaseInfo", data, {
    loading: true,
  });

export const activeCmd = (data) =>
  http.post("https://yuq.fenaor.com/ma/dealer/activeCmd", data, {
    loading: true,
  });

// export const activeCmd = () =>
//   new Promise((resolve) => {
//     resolve({
//       code: 0,
//       msg: "success",
//     });
//   });

export const activeCmdResult = (data) =>
  http.post("https://yuq.fenaor.com/ma/dealer/activeCmdResult", data, {
    loading: true,
  });
// export const activeCmdResult = (data) =>
//   Promise.resolve({
//     code: 500,
//     msg: "success",
//   });

export const activeDevice = (data) =>
  http.post("https://yuq.fenaor.com/ma/dealer/activeDevice", data, {
    loading: true,
  });

export const searchCustomerByPhone = (data, config) =>
  http.post(
    "https://yuq.fenaor.com/ma/dealer/searchCustomerByPhone",
    data,
    config
  );

// 4-客户详情【设备列表】
export const getCustomerDevices = (data) =>
  http.post("https://yuq.fenaor.com/ma/dealer/customerDevices", data, {
    loading: true,
  });

export const loadBrands = (data) =>
  http.get("https://yuq.fenaor.com/ma/home/loadBrands", data);

// 4-客户信息
export const getCustomerInfo = (data) =>
  http.post("https://yuq.fenaor.com/ma/dealer/customerInfo", data, {
    loading: true,
  });

// 5-客户备注
export const operaCustomer = (data) =>
  http.post("https://yuq.fenaor.com/ma/dealer/operaCustomer", data, {
    loading: true,
  });

// 6-设备详情-【商用饮水机】
export const deviceDetailInfo = (data) =>
  http.post("https://yuq.fenaor.com/ma/device/deviceDetailInfo", data, {
    loading: true,
  });

// 6-编辑设备
export const editLocation = (data) =>
  http.post("https://yuq.fenaor.com/ma/device/editLocation", data, {
    loading: true,
  });

// 7-设备参数
export const deviceParams = (data) =>
  http.post("https://yuq.fenaor.com/ma/device/deviceParams", data, {
    loading: true,
  });

// 8-设备数据
export const deviceDatas = (data) =>
  http.post("https://yuq.fenaor.com/ma/device/deviceDatas", data, {
    loading: true,
  });

// 9-设备设置界面
export const loadSetParams = (data) =>
  http.post("https://yuq.fenaor.com/ma/device/loadSetParams", data, {
    loading: true,
  });

// 10-定时开关界面，定时消毒时间，定时冲洗时间等参数
export const loadWorkTime = (data) =>
  http.post("https://yuq.fenaor.com/ma/device/loadWorkTime", data, {
    loading: true,
  });

// 11-设置定时开关计划 12-指令参数设置 13-设置定时消毒计划
export const deviceCmdSet = (data, config) =>
  http.post("https://yuq.fenaor.com/ma/device/deviceCmdSet", data, {
    loading: true,
    ...config,
  });

//14-滤芯扫码
export const loadChipSnInfo = (data) =>
  http.post("https://yuq.fenaor.com/ma/device/loadChipSnInfo", data, {
    loading: true,
  });

// 14-重置滤芯
export const resetChipConfig = (data) =>
  http.post("https://yuq.fenaor.com/ma/device/resetChipConfig", data, {
    loading: true,
  });

// 14-滤芯更换记录
export const chipResetRecord = (data) =>
  http.post("https://yuq.fenaor.com/ma/device/chipResetRecord", data, {
    loading: true,
  });

// 15-续期记录
export const expireRenewalRecord = (data) =>
  http.post("https://yuq.fenaor.com/ma/device/expireRenewalRecord", data, {
    loading: true,
  });

// 16-授权设备列表
export const searchDevices = (data) =>
  http.post("https://yuq.fenaor.com/ma/dealer/searchDevices", data, {
    loading: true,
  });
