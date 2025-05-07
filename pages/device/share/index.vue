<template>
  <view class="share-account-container">
    <!-- 当前设备共享成员 -->
    <view class="current-members-section">
      <text class="section-title">当前设备共享成员：</text>
      <view class="empty-state">
        <image
          class="empty-image"
          src="/static/images/empty-box.png"
          mode="aspectFit"
        ></image>
        <text class="empty-text">当前尚未添加共享成员</text>
      </view>
    </view>

    <!-- 选择共享方式 -->
    <view class="share-method-section">
      <text class="section-title">选择共享方式：</text>
      <view class="method-item" @click="handleShareByPhone">
        <view class="method-icon-wrapper">
          <text class="iconfont icon-phone">&#xe648;</text>
        </view>
        <text class="method-text">手机号码</text>
        <text class="iconfont icon-arrow-right">&#xe65c;</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

// 返回上一页
const handleBack = () => {
  uni.navigateBack();
};

// 处理通过手机号共享
const handleShareByPhone = () => {
  // TODO: 跳转到手机号共享页面或弹出输入框
  uni.navigateToast({
    title: "即将跳转到手机号共享页面",
    icon: "none",
  });
};
</script>

<style lang="scss" scoped>
.share-account-container {
  min-height: 100vh;
  background-color: #1c2431; // 深蓝色背景
  color: #ffffff; // 白色文字
  padding-top: var(--status-bar-height); // 适配状态栏
}

.nav-bar {
  position: relative;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  .back {
    position: absolute;
    left: 30rpx;
    font-size: 40rpx;
    color: #fff;
  }

  .title {
    font-size: 36rpx;
  }
}

.section-title {
  font-size: 28rpx;
  color: #ffffff;
  padding: 30rpx;
}

.current-members-section {
  display: flex;
  flex-direction: column;

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60rpx 0;

    .empty-image {
      width: 240rpx;
      height: 240rpx;
      margin-bottom: 30rpx;
    }

    .empty-text {
      font-size: 28rpx;
      color: #8a97a8;
    }
  }
}

.share-method-section {
  padding: 0 30rpx 30rpx;

  .method-item {
    background-color: #ffffff;
    border-radius: 16rpx;
    padding: 0 30rpx;
    height: 100rpx;
    display: flex;
    align-items: center;
    color: #333333;

    .method-icon-wrapper {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      background-color: #4a90e2;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;

      .iconfont {
        font-size: 32rpx;
        color: #ffffff;
      }
    }

    .method-text {
      flex-grow: 1;
      font-size: 30rpx;
    }

    .icon-arrow-right {
      font-size: 28rpx;
      color: #c7c7cc;
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
