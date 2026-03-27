<template>
  <view class="container">
    <view class="logo-box">
      <image class="logo" src="/static/images/app-logo.png" mode="aspectFit" />
      <text class="title">水灵夕</text>
    </view>
    <template v-if="!isSuccess">
      <text class="header">账号注销</text>
      <view class="notice">
        <view
          >以下选定的数据类型将在您提交申请后14天被完全清除。如果您改变主意，不再需要取消账户，请在14天内再次登录该应用，以暂时中止账户取消流程。</view
        >
        <view style="margin-top: 10rpx"
          >如果您有任何问题，请通过电子邮箱联系我们。</view
        >
        <view style="margin-top: 10rpx">E-mail: 18079028643@163.com</view>
      </view>
      <text class="choose-tip">请选择您需要删除的数据类型:</text>
      <view class="checkbox-group">
        <label class="checkbox-item">
          <checkbox value="account" checked />
          <text>账户</text>
        </label>
        <label class="checkbox-item">
          <checkbox value="device" />
          <text>设备信息</text>
        </label>
        <label class="checkbox-item">
          <checkbox value="identity" />
          <text>个人身份和地址</text>
        </label>
        <label class="checkbox-item">
          <checkbox value="notification" />
          <text>通知消息</text>
        </label>
      </view>
      <button class="submit-btn" @click="submit">提交注销申请</button>
    </template>
    <template v-if="isSuccess">
      <text
        style="color: green; margin-top: 40rpx; font-size: 40rpx"
        class="header"
        >提交成功</text
      >
      <view class="notice">
        <view
          >选定的数据类型将在您提交申请后14天被完全清除。如果您改变主意，不再需要取消账户，请在14天内再次登录该应用，以暂时中止账户取消流程。</view
        >
        <view style="margin-top: 20rpx; color: #000; font-weight: 600"
          >联系我们。</view
        >
        <view style="margin-top: 10rpx">E-mail: 18079028643@163.com</view>
      </view>
    </template>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isSuccess: false,
      selectedTypes: ["account"],
    };
  },
  methods: {
    submit() {
      // 这里可以添加提交注销申请的逻辑
      uni.showToast({
        title: "提交成功",
        icon: "success",
      });
      this.isSuccess = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: $bg-color-white;
  height: calc(100vh - 88rpx);
  width: 100%;
  overflow: hidden;
  /* border: 1rpx solid #2a64d9; */
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  color: $text-primary;
}
.logo-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10rpx;
}
.logo {
  width: 160rpx;
  height: 160rpx;
  margin: 10rpx;
  border-radius: 18rpx;
}
.title {
  margin-top: 4px;
  font-size: 28rpx;
  color: $nav-bg-alt;
  font-weight: 600;
}
.header {
  font-size: 32rpx;
  color: $nav-bg; // approx nav-bg
  font-weight: 600;
  margin: 30rpx 0 0rpx 0;
}
.notice {
  padding: 20rpx 60rpx 40rpx;
  font-size: 20rpx;
  color: $bg-color-card; // approx bg-color-card
  line-height: 1.5;
  text-align: left;
  margin-bottom: 20rpx;
}
.notice text:nth-child(3) {
  margin-top: 10rpx;
  font-weight: 600;
}
.choose-tip {
  padding: 0 60rpx;
  color: $nav-bg; // approx nav-bg
  font-weight: 600;
  font-size: 28rpx;
  margin-bottom: 20rpx;
  align-self: flex-start;
}
.checkbox-group {
  padding: 0 60rpx;
  width: 100%;
  margin-bottom: 30rpx;
}
.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
  color: $text-primary;
  font-size: 16rpx;
}
.checkbox-item text {
  margin-left: 8rpx;
}
.submit-btn {
  width: 90%;
  margin-top: 100px;
  background-color: $nav-bg; // approx nav-bg
  color: $text-white;
  font-size: 16rpx;
  margin: 80rpx 80rpx 0;
  padding: 12rpx 0;
  border-radius: 10rpx;
  border: none;
}
</style>
