<template>
  <view class="record-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back" @click="handleBack">
        <text class="iconfont icon-back">&#xe8ef;</text>
      </view>
      <text class="title">出库记录</text>
    </view>

    <!-- 订单信息 -->
    <view class="order-info">
      <text class="order-label">订单：</text>
      <text class="order-no">{{ order.orderNo }}</text>
      <button class="copy-btn" size="mini" @click="copyOrderNo">复制</button>
      <text class="order-date">{{ order.date }}</text>
    </view>

    <!-- 设备数量 -->
    <view class="device-count"> 设备：{{ devices.length }} </view>

    <!-- 设备列表 -->
    <view class="device-list">
      <view class="device-card" v-for="(item, idx) in devices" :key="idx">
        <image class="device-img" :src="item.img" mode="aspectFit"></image>
        <view class="device-info">
          <text class="device-title">{{ item.title }}</text>
          <text class="device-model">{{ item.model }}</text>
          <text class="device-sn">SN：{{ item.sn }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const order = ref({
  orderNo: "25052456740034",
  date: "2025-05-24 10:38",
});

const devices = ref([
  {
    img: "/static/images/device-home-ro.png",
    title: "家用反渗透净水机",
    model: "RO-24",
    sn: "34587690983566",
  },
  {
    img: "/static/images/device-home-ro.png",
    title: "家用反渗透净水机",
    model: "RO-24",
    sn: "34587690983406",
  },
  {
    img: "/static/images/device-business.png",
    title: "商用饮水机",
    model: "S800-1",
    sn: "34529478370945",
  },
  {
    img: "/static/images/device-business.png",
    title: "商用饮水机",
    model: "S800-1",
    sn: "34529478370237",
  },
  {
    img: "/static/images/device-business.png",
    title: "商用饮水机",
    model: "S800-1",
    sn: "34529478370034",
  },
]);

const handleBack = () => {
  uni.navigateBack();
};

const copyOrderNo = () => {
  uni.setClipboardData({
    data: order.value.orderNo,
    success: () => {
      uni.showToast({ title: "已复制", icon: "success" });
    },
  });
};
</script>

<style lang="scss" scoped>
.record-container {
  min-height: 100vh;
  background: #1c2431;
  padding-bottom: 40rpx;
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
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }
  .title {
    font-size: 36rpx;
    font-weight: bold;
  }
}
.order-info {
  margin: 30rpx 30rpx 0 30rpx;
  background: #fff;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  height: 80rpx;
  font-size: 28rpx;
  .order-label {
    color: #223a7a;
    margin-right: 8rpx;
  }
  .order-no {
    color: #223a7a;
    font-weight: bold;
    margin-right: 16rpx;
  }
  .copy-btn {
    background: #d28b0a;
    color: #fff;
    font-size: 24rpx;
    border-radius: 8rpx;
    padding: 0 18rpx;
    margin-right: 16rpx;
    height: 48rpx;
    line-height: 48rpx;
    min-width: 60rpx;
  }
  .order-date {
    color: #bfc9d6;
    font-size: 26rpx;
    margin-left: auto;
  }
}
.device-count {
  color: #fff;
  font-size: 28rpx;
  margin: 30rpx 30rpx 10rpx 30rpx;
}
.device-list {
  padding: 0 20rpx;
  .device-card {
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, #26314a 0%, #22304a 100%);
    border-radius: 20rpx;
    margin-bottom: 24rpx;
    padding: 24rpx 24rpx;
    .device-img {
      width: 90rpx;
      height: 120rpx;
      margin-right: 24rpx;
      border-radius: 8rpx;
      background: #fff;
    }
    .device-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .device-title {
        color: #fff;
        font-size: 30rpx;
        font-weight: bold;
        margin-bottom: 6rpx;
      }
      .device-model {
        color: #bfc9d6;
        font-size: 26rpx;
        margin-bottom: 6rpx;
      }
      .device-sn {
        color: #bfc9d6;
        font-size: 26rpx;
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
</style>
