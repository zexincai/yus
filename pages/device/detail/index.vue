<template>
  <view class="device-detail-container">
    <uni-nav-bar @click="handleBack" backgroundColor="#152136" statusBar dark fixed leftIcon="left" rightIcon="more"
      title="设备详情" :left-arrow="false" :border="false">
      <template v-slot:right>
        <image src="/static/images/more.png" mode="aspectFit" class="right-icon" />
      </template>
    </uni-nav-bar>
    <view class="device-header">
      <view class="device-title">
        <text>小芸家</text>
        <image src="/static/images/icon-edit.png" mode="aspectFit" class="edit-icon" />
      </view>
      <image src="/static/images/signal-full.png" class="view-device"> </image>
    </view>
    <!-- 设备信息卡片 -->
    <view class="device-card">
      <view class="device-info">
        <view class="sn-row">
          <text class="sn-label">SN：</text>
          <text class="sn-value">{{ deviceInfo.sn }}</text>
          <button class="copy-btn" size="mini" @click="copySn">复制</button>
        </view>
        <view class="model-row">
          <text class="model-label">型号：</text>
          <text class="model-value">{{ deviceInfo.model }}</text>
        </view>
        <view class="type-row">
          <text class="type-label">类型：</text>
          <text class="type-value">{{ deviceInfo.type }}</text>
        </view>
        <view class="customer-row">
          <text class="customer-label">客户：</text>
          <text class="customer-value">{{ deviceInfo.customer }}</text>
        </view>
        <view class="region-row">
          <text class="region-label">地区：</text>
          <text class="region-value">{{ deviceInfo.region }}</text>
        </view>
        <view class="address-row">
          <text class="address-label">地址：</text>
          <text class="address-value">{{ deviceInfo.address }}</text>
        </view>
      </view>
      <image class="device-img" :src="deviceInfo.image" mode="aspectFit"></image>
    </view>

    <!-- 功能导航 -->
    <view class="function-nav">
      <view class="nav-item" v-for="(item, index) in navList" :key="item.text" @click="navigateTo(item.page)">
        <view class="icon-wrapper">
          <image class="iconfont" :class="{ small: index == 0 }" :src="item.icon" />
        </view>
        <text class="nav-text">{{ item.text }}</text>
      </view>
    </view>

    <!-- 授权信息 -->
    <view class="auth-info">
      <view class="auth-row">
        <text>授权时间：{{ deviceInfo.authTime }}</text>
      </view>
      <view class="auth-row">
        <text>到期日期：{{ deviceInfo.expireDate }}</text>
        <text class="renewal-link" @click="navigateTo('renewalLog')">续期记录 >>
        </text>
        <view v-if="userType != 'user'" class="call-btn" @click="navigateTo('renewal')">
          <image class="icon" src="/static/images/call.png"></image>
          联系经销商
        </view>
        <view v-else class="renewal-btn" @click="navigateTo('renewal')">
          续期
        </view>
      </view>
    </view>

    <!-- 故障信息 -->
    <view class="error-card" v-if="deviceInfo.error">
      <image src="/static/images/error.png" class="error-icon" />
      <text class="error-text">故障：{{ deviceInfo.error }}</text>
    </view>

    <!-- 水质数据 -->
    <view class="water-data">
      <view class="data-card orange">
        <text class="data-value">{{ deviceInfo.rawWater }}</text>
        <text class="data-unit">原水 (ppm)</text>
      </view>
      <view class="data-card blue">
        <text class="data-value">{{ deviceInfo.purifiedWater }}</text>
        <text class="data-unit">纯水 (ppm)</text>
      </view>
    </view>

    <!-- 水温数据 -->
    <view class="temperature-card">
      <text class="temp-value">{{ deviceInfo.temperature }}<text class="temp-unit">℃</text></text>
      <text class="temp-label">水温</text>
    </view>

    <!-- 滤芯状态 -->
    <view class="filter-status">
      <view class="filter-header">
        <text class="filter-title">滤芯状态</text>
        <view class="filter-actions">
          <text class="action-btn active" @click="navigateTo('filterRecord')">换芯记录
          </text>
          <text class="action-btn" @click="navigateTo('filterReset')">更换滤芯</text>
        </view>
      </view>
      <view class="filter-list">
        <view class="filter-item" v-for="(filter, index) in deviceInfo.filters" :key="index">
          <view class="filter-index">{{ index + 1 }}</view>
          <view class="filter-info">
            <text class="filter-name">{{ filter.name }}</text>
            <view class="progress-bar">
              <view class="progress-inner" :class="{
                'progress-yellow': filter.percent < 30,
              }" :style="{ width: filter.percent + '%' }"></view>
            </view>
          </view>
          <view class="filter-percent">{{ filter.percent }}%</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, } from "vue";
import { onLoad } from '@dcloudio/uni-app'
const userType = ref('user')
const deviceInfo = reactive({
  name: "小芸家",
  sn: "3452345671456",
  model: "RO200",
  type: "家用反渗透净水机",
  customer: "陈芸 18977893456",
  region: "广东省 广州市 天河区",
  address: "工业大道58号威斯大厦209室",
  image: "/static/images/device.png",
  authTime: "2025-04-01 20:30",
  expireDate: "2025-07-30",
  error: "E4-温水温度传感器故障",
  rawWater: 368,
  purifiedWater: 2,
  temperature: 68,
  filters: [
    { name: "精密PP棉", percent: 86 },
    { name: "活性炭", percent: 73 },
    { name: "弱性碳", percent: 8 },
    { name: "超滤膜", percent: 90 },
    { name: "RO反渗透膜", percent: 40 },
  ],
});

const navList = [
  { text: "参数", icon: "/static/images/device/param.png", page: "params" },
  { text: "数据", icon: "/static/images/device/datas.png", page: "data" },
  { text: "消息", icon: "/static/images/device/news.png", page: "message" },
  { text: "统计", icon: "/static/images/device/stas.png", page: "stat" },
  { text: "设置", icon: "/static/images/device/setting.png", page: "setting" },
];
// 获取路由参数
onLoad((options) => {
  if (options.type) {
    userType.value = options.type;
  }
});

const handleBack = () => {
  uni.navigateBack();
};
const copySn = () => {
  uni.setClipboardData({
    data: deviceInfo.sn,
    success: () => uni.showToast({ title: "已复制", icon: "success" }),
  });
};
const navigateTo = (page) => {
  const pathMap = {
    filterRecord: "/pages/device/filter/record/index",
    filterReset: "/pages/device/filter/index",
    params: "/pages/device/param/index",
    data: "/pages/device/data/index",
    message: "/pages/message/detail/index",
    stat: "/pages/device/stat/index",
    setting: "/pages/device/setting/index",
    renewal: "/pages/device/renewal/index",
    renewalLog: "/pages/device/renewal/record/index",
  };
  if (pathMap[page]) {
    uni.navigateTo({
      url: pathMap[page],
    });
  }
};
</script>

<style lang="scss" scoped>
.device-detail-container {
  padding: 0rpx 24rpx;
  background: $bg-color;

  .right-icon {
    width: 43rpx;
    height: 43rpx;
  }

  .device-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    padding-top: 30rpx;

    .device-title {
      display: flex;
      align-items: center;

      text {
        color: #fff;
        font-size: 43rpx;
        margin-right: 34rpx;
      }

      .edit-icon {
        width: 36rpx;
        height: 36rpx;
      }
    }

    .view-device {
      width: 36rpx;
      height: 36rpx;
    }
  }
}

.device-card {
  margin-top: 24rpx;
  border-radius: 18rpx;
  background: linear-gradient(90deg, #324a70ff 0%, #324a7033 100%);
  border-radius: 18rpx;
  padding: 24rpx 36rpx 24rpx;
  display: flex;
  align-items: center;
  position: relative;

  .device-info {
    flex: 1;

    .sn-row,
    .model-row,
    .type-row,
    .customer-row,
    .region-row,
    .address-row {
      display: flex;
      align-items: center;
      margin-bottom: 12rpx;

      .sn-label,
      .model-label,
      .type-label,
      .customer-label,
      .region-label,
      .address-label {
        color: #fff;
        font-size: 25rpx;
      }

      .sn-value,
      .model-value,
      .type-value,
      .customer-value,
      .region-value,
      .address-value {
        color: #fff;
        font-size: 24rpx;
        margin-left: 8rpx;
      }

      .online-tag {
        margin-left: 16rpx;
        background: #f39b11;
        color: #fff;
        font-size: 20rpx;
        padding: 2rpx 12rpx;
        border-radius: 8rpx;
      }

      .copy-btn {
        margin-left: 16rpx;
        background: #f39b11;
        color: #fff;
        font-size: 18rpx;
        border-radius: 8rpx;
        border-radius: 36rpx;
        padding: 0 16rpx;
        height: 36rpx;
        line-height: 36rpx;
      }
    }
  }

  .device-img {
    margin-top: 30rpx;
    width: 180rpx;
    height: 180rpx;
    margin-left: 20rpx;
    border-radius: 8rpx;
  }
}

.function-nav {
  display: flex;
  justify-content: space-between;
  margin: 52rpx 16rpx 0 16rpx;

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon-wrapper {
      width: 90rpx;
      height: 90rpx;
      border-radius: 50%;
      background: #13337c;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12rpx;

      .iconfont {
        width: 48rpx;
        height: 48rpx;
        color: #fff;
      }

      .small {
        width: 40rpx;
        height: 40rpx;
      }
    }

    .nav-text {
      font-size: 25rpx;
      color: #fff;
    }
  }
}

.auth-info {
  margin-top: 38rpx;
  border-radius: 18rpx;
  padding: 30rpx;
  position: relative;
  background: linear-gradient(90deg, #324a70ff 0%, #324a7033 100%);

  .auth-row {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 25rpx;
    margin-bottom: 14rpx;

    .renewal-link {
      color: $active-color;
      margin-left: 16rpx;
      font-size: 24rpx;
    }

    .call-btn {
      right: 30rpx;
      top: 20rpx;
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #0ecbf7;
      font-size: 18rpx;

      .icon {
        height: 80rpx;
        width: 80rpx;
        margin-bottom: 4rpx;
      }
    }

    .renewal-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 25rpx;
      right: 30rpx;
      top: 45rpx;
      position: absolute;
      width: 108rpx;
      height: 54rpx;
      border-radius: 90rpx;
      background: $active-color;
    }
  }

  .auth-row:last-child {
    margin-bottom: 0;
  }
}

.error-card {
  margin-top: 30rpx;
  padding: 0rpx 20rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  border-radius: 18rpx;
  color: #152136;
  font-size: 25rpx;
  background: linear-gradient(90deg, #fcc9bdff 0%, #fcc9bd7f 100%);

  .error-icon {
    width: 42rpx;
    height: 42rpx;
    margin-right: 12rpx;
  }

  .error-text {
    color: #152136;
    font-size: 24rpx;
    line-height: 1;
  }
}

.water-data {
  margin-top: 30rpx;
  display: flex;
  justify-content: space-between;

  .data-card {
    width: 344rpx;
    height: 181rpx;
    border-radius: 12rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .data-value {
      font-size: 43rpx;
      color: #fff;
    }

    .data-unit {
      font-size: 21rpx;
      color: #fff;
      margin-top: 4rpx;
    }

    &.orange {
      border-radius: 18rpx;
      background: linear-gradient(180deg,
          #4f3500ff 0%,
          #f1a100ff 0%,
          #523700ff 100%);
    }

    &.blue {
      border-radius: 18rpx;
      background: linear-gradient(180deg, #1a479cff 0%, #0a1938ff 100%);
    }
  }
}

.temperature-card {
  height: 181rpx;
  margin-top: 20rpx;
  border-radius: 18rpx;
  background: linear-gradient(180deg, #324a70ff 0%, #324a7033 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .temp-value {
    font-size: 54rpx;
    color: #fff;

    .temp-unit {
      font-size: 28rpx;
    }
  }

  .temp-label {
    font-size: 21rpx;
    color: $active-color;
    margin-top: 8rpx;
  }
}

.filter-status {
  margin-top: 20rpx;
  border-radius: 18rpx;
  background: linear-gradient(90deg, #324a70ff 0%, #324a7033 100%);
  padding: 26rpx;

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .filter-title {
      color: #fff;
      font-size: 32rpx;
    }

    .filter-actions {
      display: flex;

      .action-btn {
        color: #fff;
        background: #13337cff;
        font-size: 20rpx;
        border-radius: 90rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 152rpx;
        height: 54rpx;
        margin-left: 16rpx;

        &.active {
          background: #f39b11;
          color: #fff;
        }
      }
    }
  }

  .filter-list {
    .filter-item {
      display: flex;
      align-items: center;
      align-content: center;
      margin-bottom: 28rpx;

      &:last-child {
        margin-bottom: 18rpx;
      }

      .filter-index {
        width: 54rpx;
        height: 54rpx;
        background: linear-gradient(180deg, #6081bfff 0%, #13337cff 100%);
        color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25rpx;
        margin-right: 20rpx;
      }

      .filter-info {
        flex: 1;

        .filter-name {
          color: #fff;
          font-size: 21rpx;
        }

        .progress-bar {
          margin-top: 12rpx;
          height: 18rpx;
          background: #a5abb7;
          border-radius: 90rpx;
          overflow: hidden;

          .progress-inner {
            height: 100%;
            background: linear-gradient(180deg, #96b0e0ff 0%, #13337cff 100%);
            border-radius: 90rpx;
          }

          .progress-yellow {
            background: linear-gradient(180deg, #d68f01ff 0%, #f7e4bcff 100%);
          }
        }
      }

      .filter-percent {
        color: #fff;
        font-size: 21rpx;
        margin-left: 12rpx;
        width: 52rpx;
        text-align: right;
      }
    }
  }
}

.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-back:before {
  content: "\e8ef";
}

.icon-param:before {
  content: "\e64c";
}

.icon-data:before {
  content: "\e64f";
}

.icon-message:before {
  content: "\e650";
}

.icon-stat:before {
  content: "\e651";
}

.icon-setting:before {
  content: "\e652";
}
</style>
