<template>
  <view class="login-container">
    <!-- 登录类型选择 -->
    <view class="login-type">
      <view
        class="type-item"
        :class="{ active: loginType === 'user' }"
        @click="loginType = 'user'"
      >
        <view class="circle" :class="{ active: loginType === 'user' }"></view>
        用户登录
      </view>
      <view
        class="type-item"
        :class="{ active: loginType === 'dealer' }"
        @click="loginType = 'dealer'"
      >
        <view class="circle" :class="{ active: loginType === 'dealer' }"></view>
        经销商登录
      </view>
    </view>

    <!-- 登录表单 -->
    <view class="login-form">
      <view class="form-item">
        <input
          type="text"
          v-model="form.phone"
          placeholder="手机号码"
          placeholder-class="placeholder"
        />
      </view>
      <view class="form-item">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="form.password"
          placeholder="密码"
          placeholder-class="placeholder"
        />
        <text class="eye-icon" @click="showPassword = !showPassword"> 👁 </text>
      </view>

      <!-- 记住账号和忘记密码 -->
      <view class="form-options">
        <label class="remember">
          <checkbox v-model="form.remember" color="#F39B11" />
          记住账号
        </label>
        <text class="forget" @click="handleForgetPassword">忘记密码？</text>
      </view>

      <!-- 登录按钮 -->
      <button class="login-btn" @click="handleLogin">登录</button>
      <button class="register-btn" @click="handleRegister">注册</button>

      <!-- 用户协议 -->
      <view class="agreement">
        <checkbox v-model="form.agreement" color="#F39B11" />
        <text class="agreement-text">
          您已阅读并同意
          <text class="link" @click="handleViewTerms">《用户服务协议》</text>
          和
          <text class="link" @click="handleViewPrivacy">《隐私政策》</text>
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

// 登录类型
const loginType = ref("user");
const showPassword = ref(false);

// 表单数据
const form = reactive({
  phone: "",
  password: "",
  remember: false,
  agreement: false,
});

// 处理登录
const handleLogin = () => {
  if (!form.phone) {
    uni.showToast({
      title: "请输入手机号码",
      icon: "none",
    });
    return;
  }
  if (!form.password) {
    uni.showToast({
      title: "请输入密码",
      icon: "none",
    });
    return;
  }
  if (!form.agreement) {
    uni.showToast({
      title: "请阅读并同意用户协议",
      icon: "none",
    });
    return;
  }
  // TODO: 实现登录逻辑
};

// 处理注册
const handleRegister = () => {
  // TODO: 跳转到注册页面
};

// 处理忘记密码
const handleForgetPassword = () => {
  // TODO: 跳转到忘记密码页面
};

// 查看用户协议
const handleViewTerms = () => {
  // TODO: 跳转到用户协议页面
};

// 查看隐私政策
const handleViewPrivacy = () => {
  // TODO: 跳转到隐私政策页面
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background-color: #1c2431;
  padding: 60rpx 40rpx;
}

.login-type {
  display: flex;
  justify-content: space-around;
  margin-bottom: 80rpx;

  .type-item {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 32rpx;

    .circle {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      border: 2rpx solid #fff;
      margin-right: 20rpx;

      &.active {
        background-color: #f39b11;
        border-color: #f39b11;
      }
    }

    &.active {
      color: #f39b11;
    }
  }
}

.login-form {
  .form-item {
    background: #fff;
    border-radius: 12rpx;
    height: 100rpx;
    margin-bottom: 30rpx;
    padding: 0 30rpx;
    position: relative;

    input {
      height: 100%;
      font-size: 28rpx;
    }

    .eye-icon {
      position: absolute;
      right: 30rpx;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20rpx 0 40rpx;

  .remember {
    color: #fff;
    font-size: 28rpx;
    display: flex;
    align-items: center;
  }

  .forget {
    color: #f39b11;
    font-size: 28rpx;
  }
}

.login-btn {
  background: #f39b11;
  color: #fff;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
}

.register-btn {
  background: transparent;
  color: #f39b11;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 12rpx;
  border: 2rpx solid #f39b11;
  margin-bottom: 40rpx;
}

.agreement {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24rpx;

  .link {
    color: #f39b11;
  }
}

.placeholder {
  color: #999;
}
</style>
