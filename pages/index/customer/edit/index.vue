<template>
  <view class="customer-edit-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back" @click="handleBack">
        <text class="iconfont icon-back">&#xe8ef;</text>
      </view>
      <text class="title">客户备注</text>
    </view>

    <!-- 信息卡片 -->
    <view class="info-card">
      <view class="info-row">
        <text class="label">手机号码：</text>
        <text class="value">17688978904</text>
      </view>
      <view class="info-row">
        <text class="label">客户姓名：</text>
        <text class="value">陈霞</text>
      </view>
      <view class="info-row">
        <text class="label">客户备注：</text>
        <input
          class="input"
          type="text"
          v-model="remark"
          placeholder="请输入"
          placeholder-class="placeholder"
        />
      </view>
    </view>

    <!-- 保存按钮 -->
    <button class="save-btn" @click="handleSave">保存</button>
  </view>
</template>

<script setup>
import { ref } from "vue";

const remark = ref("");

const handleBack = () => {
  uni.navigateBack();
};

const handleSave = () => {
  // TODO: 保存逻辑
  uni.showToast({
    title: "保存成功",
    icon: "success",
  });
};
</script>

<style lang="scss" scoped>
.customer-edit-container {
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
.info-card {
  margin: 60rpx 30rpx 0 30rpx;
  background: #f7f9fb;
  border-radius: 20rpx;
  padding: 0 0 0 0;
  .info-row {
    display: flex;
    align-items: center;
    height: 90rpx;
    border-bottom: 1rpx solid #e5e5e5;
    padding: 0 30rpx;
    &:last-child {
      border-bottom: none;
    }
    .label {
      color: #223a7a;
      font-size: 28rpx;
      width: 180rpx;
      flex-shrink: 0;
    }
    .value {
      color: #333;
      font-size: 28rpx;
      flex: 1;
      text-align: right;
    }
    .input {
      flex: 1;
      font-size: 28rpx;
      color: #333;
      text-align: right;
      background: transparent;
      border: none;
      outline: none;
    }
    .placeholder {
      color: #cccccc;
    }
  }
}
.save-btn {
  margin: 80rpx 30rpx 0 30rpx;
  background: #d28b0a;
  color: #fff;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 16rpx;
  font-size: 32rpx;
  font-weight: bold;
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
