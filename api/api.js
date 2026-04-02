import http from "./index.js";

/**
 * 功能：产测登录
 * URL: https://yuq.fenaor.com/ma/home/prodtestLogin
 * Method: POST
 * 入参
 * - account {string} 必填，手机号码，例如：17757512383
 * - password {string} 必填，登录密码，例如：1234567
 * 响应示例
 * {
 *   "id": 4,
 *   "account": null,
 *   "password": null,
 *   "role": "ROLE_PRODTEST",
 *   "phone": "17757512383",
 *   "name": "打发斯蒂芬",
 *   "token": "eyJ...（JWT）",
 *   "headImgUrl": null,
 *   "msgNum": 0
 * }
 */
export const prodtestLogin = (data) =>
  http.post("https://yuq.fenaor.com/ma/home/prodtestLogin", data, {
    loading: true,
  });

/**
 * 功能：指令下发
 * URL: https://yuq.fenaor.com/ma/prodtest/cmdPost
 * Method: POST
 * 入参
 * - deviceId {string|number} 必填，设备ID，例如：5
 * - key {string} 必填，指令 key，例如：StopSW
 * - value {string|number} 必填，参数值，例如：1
 * 响应示例
 * null
 */
export const cmdPost = (data) =>
  http.post("https://yuq.fenaor.com/ma/prodtest/cmdPost", data, {
    loading: true,
  });


/**
 * 功能：查看电控数据
 * URL: https://yuq.fenaor.com/ma/prodtest/deviceData
 * Method: POST
 * 入参
 * - deviceId {string|number} 必填，设备ID，例如：3
 * 响应示例
 * {
 *   "rssiUrl": "https://yuq.fenaor.com/mobileApp/file/fetch/rssi_0.png",
 *   "modelName": "YUQ-CX1000",
 *   "rssi": 24,
 *   "imei": "8696...6231",
 *   "sn": "20250617-02",
 *   "rows": [
 *     {
 *       "title": "开关机状态",
 *       "value": "开机运行中",
 *       "editable": true,
 *       "type": "radio",
 *       "key": "StopSW",
 *       "options": [{ "id": 0, "text": "执行关机" }]
 *     }
 *   ],
 *   "deviceId": 39
 * }
 */
export const deviceData = (data) =>
  http.post("https://yuq.fenaor.com/ma/prodtest/deviceData", data, {
    loading: true,
  });


/**
 * 功能：开始测试（测试下一项）
 * URL: https://fuhui.wetime520.cn/youkoubackend/ma/prodtest/startTestDevice
 * Method: POST
 * 入参
 * - step {string} 必填，步骤 key：onlinetest/activedata/datavalidate/datareset，例如：onlinetest
 * - deviceId {string|number} 必填，设备ID，例如：3
 * 响应示例
 * null
 */
export const startTestDevice = (data) =>
  http.post(
    "https://fuhui.wetime520.cn/youkoubackend/ma/prodtest/startTestDevice",
    data,
    {
      loading: true,
    }
  );

/**
 * 功能：扫码结果
 * URL: https://fuhui.wetime520.cn/youkoubackend/ma/prodtest/scanMachineMes
 * Method: POST
 * 入参
 * - mes {string} 必填，设备流水码，例如：45678902
 * 响应示例
 * {
 *   "modelName": "BL881",
 *   "machineCode": "JX0003",
 *   "imei": "8345...5434",
 *   "mes": "45678902",
 *   "id": 2,
 *   "rfid": "202408252121123456",
 *   "online": 0
 * }
 */
export const scanMachineMes = (data) =>
  http.post(
    "https://fuhui.wetime520.cn/youkoubackend/ma/prodtest/scanMachineMes",
    data,
    {
      loading: true,
    }
  );

/**
 * 功能：查询机型列表
 * URL: http://localhost:8080/youkoubackend/ma/home/loadMachineTypes
 * Method: GET
 * 入参
 * - name {string} 必填，搜索参数，例如：0394
 * 响应示例
 * {
 *   "rows": [{ "modelName": "ceshi2024", "code": "JX0002", "id": 2 }],
 *   "logoUrl": ""
 * }
 */
export const loadMachineTypes = (data) =>
  http.get("http://localhost:8080/youkoubackend/ma/home/loadMachineTypes", data, {
    loading: true,
  });

/**
 * 功能：绑定设备
 * URL: https://yuq.fenaor.com/ma/prodtest/bindMachineImei
 * Method: POST
 * 入参
 * - machineId {string|number} 必填，机型ID，例如：3
 * - mes {string} 必填，设备流水码，例如：BL01890987678909
 * - imei {string} 必填，通讯码，例如：123456789
 * 响应示例
 * null
 */
export const bindMachineImei = (data) =>
  http.post("https://yuq.fenaor.com/ma/prodtest/bindMachineImei", data, {
    loading: true,
  });

/**
 * 功能：删除设备
 * URL: https://fuhui.wetime520.cn/youkoubackend/ma/prodtest/removeDevice
 * Method: POST
 * 入参
 * - deviceId {string|number} 必填，设备ID，例如：7276
 * 响应示例
 * null
 */
export const removeDevice = (data) =>
  http.post("https://fuhui.wetime520.cn/youkoubackend/ma/prodtest/removeDevice", data, {
    loading: true,
  });

/**
 * 功能：获取测试结果
 * URL: https://yuq.fenaor.com/ma/prodtest/resultTestDevice
 * Method: POST
 * 入参
 * - deviceId {string|number} 必填，设备ID，例如：3
 * 响应示例（完整）见下方
 */
/* 响应示例（完整）
{
        "modelName": "ceshi1122",
        "machineCode": "JX0394",
        "imei": "864708062025005",
        "rfid": "20240825123456",
        "mes": "864708062025005",
        "online":0,
        "rows": [
            {
                "key": "onlinetest",
                "label": "联网测试",
                "target": "在线",
                "icon": "https://fuhui.wetime520.cn/miniapp/resources/insagee/test1.png",
                "value": "在线",
                "pass": true,
                "childs": []
            },
            {
                "key": "activedata",
                "label": "激活测试",
                "target": "成功",
                "icon": "https://fuhui.wetime520.cn/miniapp/resources/insagee/test2.png",
                "value": "成功",
                "pass": true,
                "childs": [
                    {
                        "key": "WorkEnable",
                        "label": "设备有效期工作使能",
                        "target": "租赁",
                        "icon": null,
                        "value": "租赁",
                        "pass": true,
                        "childs": null
                    },
                    {
                        "key": "EnableType",
                        "label": "设备有效期计数方式",
                        "target": "天数",
                        "icon": null,
                        "value": "天数",
                        "pass": true,
                        "childs": null
                    },
                    {
                        "key": "EnableDate",
                        "label": "设备使用有效期",
                        "target": "2024-01-10",
                        "icon": null,
                        "value": "2024-01-10",
                        "pass": true,
                        "childs": null
                    },
                    {
                        "key": "EnableState",
                        "label": "设备锁机状态",
                        "target": "正常工作",
                        "icon": null,
                        "value": "正常工作",
                        "pass": true,
                        "childs": null
                    }
                ]
            },
            {
                "key": "datavalidate",
                "label": "数据校验",
                "target": "成功",
                "icon": "https://fuhui.wetime520.cn/miniapp/resources/insagee/test3.png",
                "value": "失败",
                "pass": false,
                "childs": [
                    {
                        "key": "FLShow",
                        "label": "设备滤芯",
                        "target": "不显示",
                        "icon": null,
                        "value": "不显示",
                        "pass": true,
                        "childs": null
                    },
                    {
                        "key": "FilterEnable",
                        "label": "滤芯管控开关",
                        "target": "关闭",
                        "icon": null,
                        "value": "关闭",
                        "pass": true,
                        "childs": null
                    },
                    {
                        "key": "PWenable",
                        "label": "净水量统计功能",
                        "target": "无",
                        "icon": null,
                        "value": "无",
                        "pass": true,
                        "childs": null
                    },
                    {
                        "key": "UVLED",
                        "label": "UV灯",
                        "target": "无",
                        "icon": null,
                        "value": "有",
                        "pass": false,
                        "childs": null
                    },
                    {
                        "key": "Child",
                        "label": "开水锁",
                        "target": "无",
                        "icon": null,
                        "value": "有",
                        "pass": false,
                        "childs": null
                    },
                    {
                        "key": "WTShow",
                        "label": "温开水温度",
                        "target": "不显示",
                        "icon": null,
                        "value": "不显示",
                        "pass": true,
                        "childs": null
                    },
                    {
                        "key": "FWTDSShow",
                        "label": "净水TDS显示",
                        "target": "显示",
                        "icon": null,
                        "value": "显示",
                        "pass": true,
                        "childs": null
                    },
                    {
                        "key": "RWTDSShow",
                        "label": "原水TDS显示",
                        "target": "显示",
                        "icon": null,
                        "value": "显示",
                        "pass": true,
                        "childs": null
                    },
                    {
                        "key": "FuncST",
                        "label": "无菌功能",
                        "target": "有",
                        "icon": null,
                        "value": "有",
                        "pass": true,
                        "childs": null
                    },
                    {
                        "key": "FuncEM",
                        "label": "排空功能",
                        "target": "无",
                        "icon": null,
                        "value": "无",
                        "pass": true,
                        "childs": null
                    },
                    {
                        "key": "TargetTemperature",
                        "label": "开水停止加热温度",
                        "target": "93",
                        "icon": null,
                        "value": "93",
                        "pass": true,
                        "childs": null
                    }
                ]
            },
            {
                "key": "datareset",
                "label": "数据复位",
                "target": "成功",
                "icon": "https://fuhui.wetime520.cn/miniapp/resources/insagee/test4.png",
                "value": "失败",
                "pass": false,
                "childs": [
                    {
                        "key": "FilterTP1",
                        "label": "滤芯寿命",
                        "target": "100",
                        "icon": null,
                        "value": "0",
                        "pass": false,
                        "childs": null
                    },
                    {
                        "key": "StopSW",
                        "label": "锁机",
                        "target": "锁机",
                        "icon": null,
                        "value": "锁机",
                        "pass": true,
                        "childs": null
                    }
                ]
            }
        ],
        "deviceId": 7277
    }
*/
export const resultTestDevice = (data) =>
  http.post("https://yuq.fenaor.com/ma/prodtest/resultTestDevice", data, {
    loading: true,
  });

/**
 * 功能：查询绑定列表
 * URL: https://fuhui.wetime520.cn/youkoubackend/ma/prodtest/bindDevices
 * Method: POST
 * 入参
 * - arg {string} 必填，查询参数类型：mes/imei，例如：mes
 * - current {string|number} 必填，页码，例如：1
 * - size {string|number} 必填，条数，例如：10
 * 响应示例
 * [
 *   {
 *     "id": 4,
 *     "machineCode": "JX0001",
 *     "modelName": "2024A",
 *     "mes": "MO20250510193731",
 *     "imei": "8696...1281",
 *     "activeState": 1,
 *     "activeDesc": "未出库",
 *     "createTime": "2025-05-10 19:38:01"
 *   }
 * ]
 */
export const bindDevices = (data) =>
  http.post("https://fuhui.wetime520.cn/youkoubackend/ma/prodtest/bindDevices", data, {
    loading: true,
  });