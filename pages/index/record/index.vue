<template>
  <view class="record-container">
    <!-- 订单信息 -->
    <view class="order-info">
      <text class="order-label">订单：</text>
      <text class="order-no">{{ order.orderNo }}</text>
      <button class="copy-btn" size="mini" @click="copyOrderNo">复制</button>
      <text class="order-date">{{ order.createTime }}</text>
    </view>

    <!-- 设备数量 -->
    <view class="device-count"> 设备：{{ logs.length }} </view>

    <!-- 设备列表 -->
    <view class="device-list">
      <template v-if="logs.length">
        <view class="device-card" v-for="(item, idx) in logs" :key="idx">
          <image class="device-img" :src="item.productUrl" mode="aspectFit"></image>
          <view class="device-info">
            <text class="device-title">{{ item.brand }}</text>
            <text class="device-model">{{ item.modelName }}</text>
            <text class="device-sn">SN：{{ item.sn }}</text>
          </view>
        </view>
      </template>
      <template v-else>
        <view class="empty">
          <image src="/static/images/empty.png" mode="aspectFit" class="empty-img" />
          <view class="empty-text"> 暂无数据 </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { getOrderDetail } from "@/api/dealer";
import { ref } from "vue";

const order = ref({
  orderNo: "",
  createTime: "",
});

const logs = ref([]);
onLoad(() => {
  // 从缓存里取
  const orderDetail = uni.getStorageSync("orderDetail");
  if (orderDetail) {
    order.value = orderDetail;
  }
  getLogList();
})
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

const getLogList = async () => {
  const res = await getOrderDetail({
    orderId: order.value.id,
  });

  logs.value = res.snList;
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
  font-size: 26rpx;
  background: $bg-color-light;

  .order-label {
    color: $nav-bg-alt;
    margin-right: 4rpx;
    line-height: 1;
  }

  .order-no {
    color: $nav-bg-alt;
    line-height: 1;
    // font-weight: bold;
    // margin-right: 16rpx;
  }

  .copy-btn {
    border-radius: 36rpx;
    background: $accent-color;
    border: none;
    color: $text-white;
    font-size: 18rpx;
    padding: 0 18rpx;
    margin-right: 16rpx;
    margin-left: 20rpx;
    height: 36rpx;
    line-height: 36rpx;
    min-width: 60rpx;
  }

  .order-date {
    font-size: 23rpx;
    color: $text-disabled;
    margin-left: auto;
  }
}

.device-count {
  color: $text-white;
  margin-top: 50rpx;
  font-size: 29rpx;
}

.device-list {
  margin-top: 40rpx;

  .device-card {
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, $bg-color-card 0%, $border-color-card 100%);
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
        color: $text-white;
        font-size: 29rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
      }

      .device-model {
        color: $text-white;
        font-size: 25rpx;
        margin-bottom: 8rpx;
      }

      .device-sn {
        color: $border-color-light;
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
