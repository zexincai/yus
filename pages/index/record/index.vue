<template>
  <view class="record-container">
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
    img: "/static/images/device.png",
    title: "家用反渗透净水机",
    model: "RO-24",
    sn: "34587690983566",
  },
  {
    img: "/static/images/device.png",
    title: "家用反渗透净水机",
    model: "RO-24",
    sn: "34587690983406",
  },
  {
    img: "/static/images/device.png",
    title: "商用饮水机",
    model: "S800-1",
    sn: "34529478370945",
  },
  {
    img: "/static/images/device.png",
    title: "商用饮水机",
    model: "S800-1",
    sn: "34529478370237",
  },
  {
    img: "/static/images/device.png",
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
  padding: 24rpx;
  background: $bg-color;
}

.order-info {
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  height: 80rpx;
  font-size: 25rpx;
  background: #F4F6F9FF;

  .order-label {
    color: #223a7a;
    margin-right: 8rpx;
  }

  .order-no {
    color: #223a7a;
    font-weight: bold;
    // margin-right: 16rpx;
  }

  .copy-btn {
    border-radius: 36rpx;
    background: #D68F01FF;
    color: #fff;
    font-size: 18rpx;
    padding: 0 18rpx;
    margin-right: 16rpx;
    height: 36rpx;
    line-height: 36rpx;
    min-width: 60rpx;
  }

  .order-date {
    font-size: 22rpx;
    color: #bfc9d6;
    margin-left: auto;
  }
}

.device-count {
  color: #fff;
  margin-top: 50rpx;
  font-size: 29rpx;
}

.device-list {
  margin-top: 40rpx;

  .device-card {
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, #324A70FF 0%, #324A7033 100%);
    box-shadow: 0px 3.62px 7.25px #0000003F;
    border-radius: 18rpx;
    margin-bottom: 27rpx;
    padding: 24rpx 24rpx;

    .device-img {
      width: 106rpx;
      height: 106rpx;
      margin-right: 24rpx;
      border-radius: 8rpx;
    }

    .device-info {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .device-title {
        color: #fff;
        font-size: 29rpx;
        font-weight: bold;
        margin-bottom: 6rpx;
      }

      .device-model {
        color: #fff;
        font-size: 25rpx;
        margin-bottom: 6rpx;
      }

      .device-sn {
        color: #C7C7C7FF;
        font-size: 25rpx;
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
