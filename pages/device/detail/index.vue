<template>
  <view class="device-detail-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back" @click="handleBack">
        <text class="iconfont icon-back">&#xe8ef;</text>
      </view>
      <text class="title">{{ deviceInfo.name }}</text>
      <view class="info-icon" @click="showInfo">
        <text class="iconfont icon-info">&#xe6e5;</text>
      </view>
    </view>

    <!-- 设备信息卡片 -->
    <view class="device-card">
      <view class="device-header">
        <view class="device-info">
          <view class="sn-info">
            <text>SN: {{ deviceInfo.sn }}</text>
            <text class="online-tag">在线</text>
          </view>
          <view class="model-info">
            <text>型号: {{ deviceInfo.model }}</text>
          </view>
          <view class="type-info">
            <text>类型: {{ deviceInfo.type }}</text>
          </view>
          <view class="customer-info">
            <text>客户: {{ deviceInfo.customer }}</text>
          </view>
          <view class="region-info">
            <text>地区: {{ deviceInfo.region }}</text>
          </view>
          <view class="address-info">
            <text>地址: {{ deviceInfo.address }}</text>
          </view>
        </view>
        <view class="device-image">
          <image :src="deviceInfo.image" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 功能导航 -->
      <view class="function-nav">
        <view class="nav-item" @click="navigateTo('params')">
          <view class="icon-wrapper blue">
            <text class="iconfont">&#xe64c;</text>
          </view>
          <text class="nav-text">参数</text>
        </view>
        <view class="nav-item" @click="navigateTo('data')">
          <view class="icon-wrapper blue">
            <text class="iconfont">&#xe64f;</text>
          </view>
          <text class="nav-text">数据</text>
        </view>
        <view class="nav-item" @click="navigateTo('message')">
          <view class="icon-wrapper blue">
            <text class="iconfont">&#xe650;</text>
          </view>
          <text class="nav-text">消息</text>
        </view>
        <view class="nav-item" @click="navigateTo('statistics')">
          <view class="icon-wrapper blue">
            <text class="iconfont">&#xe651;</text>
          </view>
          <text class="nav-text">统计</text>
        </view>
        <view class="nav-item" @click="navigateTo('setting')">
          <view class="icon-wrapper blue">
            <text class="iconfont">&#xe652;</text>
          </view>
          <text class="nav-text">设置</text>
        </view>
      </view>
    </view>

    <!-- 授权信息 -->
    <view class="auth-info">
      <view class="auth-text">
        <text>授权时间: {{ deviceInfo.authTime }}</text>
        <text>到期日期: {{ deviceInfo.expireDate }}</text>
        <text class="renewal-link" @click="navigateTo('renewal')"
          >续期记录 >></text
        >
      </view>
      <view class="renewal-btn" @click="navigateTo('renewal')">
        <text class="iconfont">&#xe653;</text>
      </view>
    </view>

    <!-- 故障信息 -->
    <view class="error-card" v-if="deviceInfo.error">
      <text class="error-icon">!</text>
      <text class="error-text">故障: {{ deviceInfo.error }}</text>
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
      <text class="temp-value"
        >{{ deviceInfo.temperature }}<text class="temp-unit">℃</text></text
      >
      <text class="temp-label">水温</text>
    </view>

    <!-- 滤芯状态 -->
    <view class="filter-status">
      <view class="filter-header">
        <text class="filter-title">滤芯状态</text>
        <view class="filter-actions">
          <text class="action-btn" @click="navigateTo('filterRecord')"
            >换芯记录</text
          >
          <text class="action-btn" @click="navigateTo('filterReset')"
            >更换滤芯</text
          >
        </view>
      </view>

      <view class="filter-list">
        <view
          class="filter-item"
          v-for="(filter, index) in deviceInfo.filters"
          :key="index"
        >
          <view class="filter-index">{{ index + 1 }}</view>
          <view class="filter-info">
            <text class="filter-name">{{ filter.name }}</text>
            <view class="progress-bar">
              <view
                class="progress-inner"
                :style="{ width: filter.percent + '%' }"
              ></view>
            </view>
          </view>
          <text class="filter-percent">{{ filter.percent }}%</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

// 设备信息
const deviceInfo = reactive({
  name: "小芸家",
  sn: "34523456714566",
  model: "RO200",
  type: "家用反渗透净水机",
  customer: "陈芸 18977893456",
  region: "广东省 广州市 天河区",
  address: "工业大道58号威斯大厦209室",
  image: "/static/images/water-purifier.png",
  authTime: "2025-04-01 20:30",
  expireDate: "2025-07-30",
  error: "E4-温水温度传感器故障",
  rawWater: 368,
  purifiedWater: 2,
  temperature: 68,
  filters: [
    { name: "精密PP棉", percent: 86 },
    { name: "活性炭", percent: 73 },
    { name: "碱性碳", percent: 8 },
    { name: "超滤膜", percent: 90 },
    { name: "RO反渗透膜", percent: 40 },
  ],
});

// 返回上一页
const handleBack = () => {
  uni.navigateBack();
};

// 显示设备信息
const showInfo = () => {
  uni.showToast({
    title: "设备信息",
    icon: "none",
  });
};

// 页面导航
const navigateTo = (page) => {
  const pageMap = {
    params: "/pages/device/params/index",
    data: "/pages/device/data/index",
    message: "/pages/device/message/index",
    statistics: "/pages/device/statistics/index",
    setting: "/pages/device/setting/index",
    renewal: "/pages/device/renewal/index",
    filterRecord: "/pages/device/filter/record/index",
    filterReset: "/pages/device/filter/index",
  };

  if (pageMap[page]) {
    uni.navigateTo({
      url: pageMap[page],
    });
  }
};
</script>

<style lang="scss" scoped>
.device-detail-container {
  min-height: 100vh;
  background-color: #1c2431;
  padding-top: var(--status-bar-height);
  padding-bottom: 30rpx;
}

.nav-bar {
  position: relative;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  .back {
    position: absolute;
    left: 30rpx;
    font-size: 40rpx;
  }

  .title {
    font-size: 36rpx;
  }

  .info-icon {
    position: absolute;
    right: 30rpx;
    font-size: 40rpx;
  }
}

.device-card {
  margin: 20rpx 30rpx;
  background: linear-gradient(90deg, #223a7a 0%, #2a4592 100%);
  border-radius: 20rpx;
  padding: 30rpx;
  color: #fff;

  .device-header {
    display: flex;
    margin-bottom: 30rpx;

    .device-info {
      flex: 1;

      .sn-info {
        display: flex;
        align-items: center;
        margin-bottom: 10rpx;

        .online-tag {
          margin-left: 20rpx;
          background: #f39b11;
          color: #fff;
          font-size: 24rpx;
          padding: 4rpx 12rpx;
          border-radius: 8rpx;
        }
      }

      .model-info,
      .type-info,
      .customer-info,
      .region-info,
      .address-info {
        margin-bottom: 10rpx;
        font-size: 28rpx;
      }
    }

    .device-image {
      width: 120rpx;
      height: 180rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .function-nav {
    display: flex;
    justify-content: space-between;

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon-wrapper {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10rpx;

        &.blue {
          background: #1e50a2;
        }

        .iconfont {
          font-size: 40rpx;
          color: #fff;
        }
      }

      .nav-text {
        font-size: 24rpx;
        color: #fff;
      }
    }
  }
}

.auth-info {
  margin: 20rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .auth-text {
    color: #fff;
    font-size: 28rpx;

    text {
      display: block;
      margin-bottom: 6rpx;
    }

    .renewal-link {
      color: #f39b11;
    }
  }

  .renewal-btn {
    width: 80rpx;
    height: 80rpx;
    background: #f39b11;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .iconfont {
      font-size: 40rpx;
      color: #fff;
    }
  }
}

.error-card {
  margin: 20rpx 30rpx;
  background: #f76260;
  border-radius: 16rpx;
  padding: 20rpx 30rpx;
  display: flex;
  align-items: center;

  .error-icon {
    width: 40rpx;
    height: 40rpx;
    background: #fff;
    color: #f76260;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 20rpx;
  }

  .error-text {
    color: #fff;
    font-size: 28rpx;
  }
}

.water-data {
  margin: 20rpx 30rpx;
  display: flex;
  justify-content: space-between;

  .data-card {
    width: 48%;
    height: 160rpx;
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.orange {
      background: #f39b11;
    }

    &.blue {
      background: #1e50a2;
    }

    .data-value {
      font-size: 60rpx;
      color: #fff;
      font-weight: bold;
    }

    .data-unit {
      font-size: 28rpx;
      color: #fff;
      margin-top: 10rpx;
    }
  }
}

.temperature-card {
  margin: 20rpx 30rpx;
  background: #223a7a;
  border-radius: 16rpx;
  height: 160rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .temp-value {
    font-size: 60rpx;
    color: #fff;
    font-weight: bold;

    .temp-unit {
      font-size: 40rpx;
    }
  }

  .temp-label {
    font-size: 28rpx;
    color: #fff;
    margin-top: 10rpx;
  }
}

.filter-status {
  margin: 20rpx 30rpx;
  background: #223a7a;
  border-radius: 16rpx;
  padding: 30rpx;

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .filter-title {
      color: #fff;
      font-size: 32rpx;
    }

    .filter-actions {
      display: flex;

      .action-btn {
        color: #f39b11;
        font-size: 28rpx;
        margin-left: 30rpx;
      }
    }
  }

  .filter-list {
    .filter-item {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .filter-index {
        width: 40rpx;
        height: 40rpx;
        background: #1e50a2;
        color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        margin-right: 20rpx;
      }

      .filter-info {
        flex: 1;

        .filter-name {
          color: #fff;
          font-size: 28rpx;
          margin-bottom: 10rpx;
        }

        .progress-bar {
          height: 16rpx;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8rpx;
          overflow: hidden;

          .progress-inner {
            height: 100%;
            background: #1ecfff;
            border-radius: 8rpx;
          }
        }
      }

      .filter-percent {
        color: #fff;
        font-size: 28rpx;
        margin-left: 20rpx;
        width: 60rpx;
        text-align: right;
      }
    }
  }
}

// iconfont样式
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
