<template>
  <view class="login-page">
    <view class="logo-area">
      <image class="logo" src="/static/images/app-logo.png" mode="aspectFit" />
      <view class="brand-name">优口净水器产品测试工具</view>
    </view>

    <view class="form-area">
      <view class="input-row">
        <uni-icons type="person" size="22" color="#1a9de4" />
        <input
          class="input"
          v-model="account"
          type="number"
          placeholder="请输入手机号"
          placeholder-style="color:#aaa"
        />
      </view>
      <view class="input-row">
        <uni-icons type="locked" size="22" color="#1a9de4" />
        <input
          class="input"
          v-model="password"
          :password="true"
          placeholder="请输入密码"
          placeholder-style="color:#aaa"
        />
      </view>
    </view>

    <button
      class="login-btn"
      :class="{ disabled: !account || !password }"
      @tap="doLogin"
    >
      登录
    </button>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { prodtestLogin } from "@/api/api.js";

const store = useStore();
const account = ref("");
const password = ref("");

// 页面加载时读取缓存的账号密码
onMounted(() => {
  const cached = uni.getStorageSync("loginInfo");
  if (cached) {
    account.value = cached.account || "";
    password.value = cached.password || "";
  }
});

async function doLogin() {
  if (!account.value || !password.value) {
    uni.showToast({ title: "请输入账号和密码", icon: "none" });
    return;
  }
  try {
    const res = await prodtestLogin({
      account: account.value,
      password: password.value,
    });
    // 登录成功后缓存账号密码
    uni.setStorageSync("loginInfo", {
      account: account.value,
      password: password.value,
    });
    store.commit("setUserInfo", res);
    uni.reLaunch({ url: "/pages/index/index" });
  } catch (e) {}
}
</script>

<style lang="scss">
.login-page {
  min-height: 100vh;
  background: #dff1fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 300rpx 60rpx 0;

  .logo-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80rpx;

    .logo {
      width: 360rpx;
      height: 120rpx;
    }

    .brand-name {
      margin-top: 24rpx;
      font-size: 32rpx;
      color: #1a237e;
      font-weight: 600;
    }
  }

  .form-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32rpx;
    margin-bottom: 60rpx;
  }

  .input-row {
    background: #fff;
    border-radius: 60rpx;
    padding: 14rpx 40rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);

    .input {
      flex: 1;
      padding-left: 4rpx;
      font-size: 30rpx;
      color: #222;
    }
  }

  .disabled {
    opacity: 0.5;
  }

  .login-btn {
    width: 100%;
    background: #1a9de4;
    color: #fff;
    border-radius: 60rpx;
    font-size: 34rpx;
    font-weight: 600;
    padding: 12rpx 0;
    border: none;
    box-shadow: 0 4rpx 16rpx rgba(26, 157, 228, 0.4);
  }
}
</style>
