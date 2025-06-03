<template>
  <view class="container">
    <view v-if="from == 'fail'" class="result-content">
      <!-- 成功图标 -->
      <image
        class="success-icon"
        src="/static/images/icon-danger.png"
        mode="aspectFit"
      />
      <!-- 成功提示文本 -->
      <text class="success-title">绑定失败</text>
      <text class="success-desc">{{ msg }}</text>
      <!-- 登录按钮 -->
      <button class="login-btn" @click="goToLogin">返回首页</button>
    </view>
    <view v-else class="result-content">
      <!-- 成功图标 -->
      <image
        class="success-icon"
        src="/static/images/icon-success.png"
        mode="aspectFit"
      />
      <!-- 成功提示文本 -->
      <text class="success-title">绑定成功</text>
      <button class="login-btn" @click="goToLogin">返回首页</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const from = ref("success");
const msg = ref("");
const goToLogin = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};

onLoad((options) => {
  from.value = options.from;
  msg.value = options.msg;
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: $bg-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.result-content {
  flex: 1;
  margin-top: 200rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  width: 100%;

  .success-icon {
    width: 180rpx;
    height: 180rpx;
    margin-bottom: 40rpx;
  }

  .success-title {
    font-size: 36rpx;
    color: rgba(255, 255, 255, 1);
  }

  .success-desc {
    margin-top: 30rpx;
    font-size: 29rpx;
    color: rgba(14, 203, 247, 1);
  }

  .login-btn {
    margin-top: 60rpx;
    line-height: 72rpx;
    background: $active-color;
    font-size: 29rpx;
    color: #fff;
    width: 181rpx;
    height: 72rpx;
    border-radius: 90rpx;
    background: #d68f01ff;
  }
}
</style>
