<template>
  <view class="info-edit-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back" @click="handleBack">
        <text class="iconfont icon-back">&#xe8ef;</text>
      </view>
      <text class="title">编辑信息</text>
    </view>

    <!-- 我的信息 -->
    <view class="section-title">我的信息</view>
    <view class="info-card">
      <view class="info-row">
        <text class="label">手机号码：</text>
        <text class="value">13876669980</text>
      </view>
      <view class="info-row">
        <text class="label">姓名：</text>
        <text class="value">周芸</text>
      </view>
    </view>

    <!-- 修改密码 -->
    <view class="section-title">我的信息</view>
    <view class="info-card">
      <view class="info-row">
        <text class="label">原密码：</text>
        <input
          class="input"
          type="password"
          v-model="oldPwd"
          placeholder=""
          placeholder-class="placeholder"
        />
      </view>
      <view class="divider"></view>
      <view class="info-row">
        <text class="label">新密码：</text>
        <input
          class="input"
          type="password"
          v-model="newPwd"
          placeholder=""
          placeholder-class="placeholder"
        />
      </view>
      <view class="divider"></view>
      <view class="info-row">
        <text class="label">确认新密码：</text>
        <input
          class="input"
          type="password"
          v-model="confirmPwd"
          placeholder=""
          placeholder-class="placeholder"
        />
      </view>
    </view>

    <!-- 保存按钮 -->
    <button class="save-btn" @click="handleSave">保存</button>

    <!-- 退出账号 -->
    <view class="logout-link" @click="handleLogout">退出当前账号 >></view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const oldPwd = ref("");
const newPwd = ref("");
const confirmPwd = ref("");

const handleBack = () => {
  uni.navigateBack();
};

const handleSave = () => {
  // TODO: 校验和保存逻辑
  uni.showToast({ title: "保存成功", icon: "success" });
};

const handleLogout = () => {
  // TODO: 退出登录逻辑
  uni.showModal({
    title: "提示",
    content: "确定要退出当前账号吗？",
    success: (res) => {
      if (res.confirm) {
        uni.showToast({ title: "已退出", icon: "success" });
        // 这里可跳转到登录页
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.info-edit-container {
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
.section-title {
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  margin: 40rpx 30rpx 10rpx 30rpx;
}
.info-card {
  margin: 0 30rpx 0 30rpx;
  background: #f7f9fb;
  border-radius: 20rpx;
  padding: 0;
  .info-row {
    display: flex;
    align-items: center;
    height: 80rpx;
    padding: 0 30rpx;
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
      letter-spacing: 4rpx;
    }
    .placeholder {
      color: #cccccc;
    }
  }
  .divider {
    height: 1rpx;
    background: #e5e5e5;
    margin: 0 30rpx;
  }
}
.save-btn {
  margin: 60rpx 30rpx 0 30rpx;
  background: #d28b0a;
  color: #fff;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 16rpx;
  font-size: 32rpx;
  font-weight: bold;
}
.logout-link {
  margin: 60rpx 30rpx 0 0;
  color: #1ecfff;
  font-size: 28rpx;
  text-align: right;
  text-decoration: underline;
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
