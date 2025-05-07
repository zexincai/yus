<template>
  <view class="scan-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back" @click="handleBack">
        <text class="iconfont icon-back">&#xe8ef;</text>
      </view>
    </view>

    <!-- 扫码区域 -->
    <view class="scan-card" @click="handleScan">
      <view class="scan-icon">
        <text class="iconfont icon-scan">&#xe6a1;</text>
      </view>
      <text class="scan-text">扫描二维码</text>
    </view>

    <!-- SN码输入 -->
    <view class="sn-row">
      <input
        class="sn-input"
        v-model="sn"
        placeholder="输入设备SN码"
        placeholder-class="placeholder"
      />
      <button class="confirm-btn" @click="handleConfirm">确定</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const sn = ref("");

const handleBack = () => {
  uni.navigateBack();
};

const handleScan = () => {
  uni.scanCode({
    success: (res) => {
      sn.value = res.result;
      uni.showToast({ title: "扫码成功", icon: "success" });
    },
    fail: () => {
      uni.showToast({ title: "扫码失败", icon: "none" });
    },
  });
};

const handleConfirm = () => {
  if (!sn.value.trim()) {
    uni.showToast({ title: "请输入SN码", icon: "none" });
    return;
  }
  // TODO: 处理SN码逻辑
  uni.showToast({ title: "SN码已提交", icon: "success" });
};
</script>

<style lang="scss" scoped>
.scan-container {
  min-height: 100vh;
  background: #1c2431;
  padding-top: var(--status-bar-height);
}
.nav-bar {
  position: relative;
  height: 88rpx;
  display: flex;
  align-items: center;
  .back {
    position: absolute;
    left: 30rpx;
    font-size: 40rpx;
    color: #fff;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }
}
.scan-card {
  margin: 40rpx 30rpx 0 30rpx;
  background: linear-gradient(90deg, #26314a 0%, #22304a 100%);
  border-radius: 28rpx;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .scan-icon {
    margin-bottom: 24rpx;
    .iconfont {
      font-size: 100rpx;
      color: #1ecfff;
    }
  }
  .scan-text {
    color: #1ecfff;
    font-size: 32rpx;
  }
}
.sn-row {
  display: flex;
  align-items: center;
  margin: 40rpx 30rpx 0 30rpx;
  .sn-input {
    flex: 1;
    height: 80rpx;
    background: #f7f9fb;
    border-radius: 16rpx;
    font-size: 28rpx;
    color: #333;
    padding: 0 24rpx;
    border: none;
    outline: none;
  }
  .placeholder {
    color: #cccccc;
  }
  .confirm-btn {
    margin-left: 20rpx;
    width: 140rpx;
    height: 80rpx;
    background: #d28b0a;
    color: #fff;
    font-size: 32rpx;
    border-radius: 16rpx;
    line-height: 80rpx;
    text-align: center;
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
.icon-scan:before {
  content: "\e6a1";
}
</style>
