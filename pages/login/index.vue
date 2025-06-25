<template>
  <view class="login-container">
    <image src="/static/images/login-bg.png" class="login-bg" />
    <!-- 登录类型选择 -->
    <view class="login-type">
      <view class="type-item" @click="loginType = 'ROLE_CUSTOMER'">
        <view
          class="circle"
          :class="{ active: loginType === 'ROLE_CUSTOMER' }"
        ></view>
        用户登录
      </view>
      <view class="type-item" @click="loginType = 'ROLE_DEALER'">
        <view
          class="circle"
          :class="{ active: loginType === 'ROLE_DEALER' }"
        ></view>
        经销商登录
      </view>
    </view>

    <!-- 登录表单 -->
    <view class="login-form">
      <view class="label">手机号码</view>
      <view class="form-item">
        <input
          type="text"
          maxlength="11"
          v-model="form.phone"
          placeholder="手机号码"
          placeholder-class="placeholder"
        />
      </view>
      <view class="label">密码</view>
      <view class="form-item">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="form.password"
          placeholder="密码"
          placeholder-class="placeholder"
        />
        <image
          v-if="!showPassword"
          src="/static/images/eye-off.png"
          class="eye-icon"
          @click="showPassword = !showPassword"
        />
        <image
          v-else
          src="/static/images/eye-open.png"
          class="eye-icon eye-open"
          @click="showPassword = !showPassword"
        />
      </view>

      <!-- 记住账号和忘记密码 -->
      <view class="form-options">
        <label class="remember">
          <checkbox
            activeBackgroundColor="#0ECBF7"
            style="transform: scale(0.6)"
            :checked="form.remember"
            @click="form.remember = !form.remember"
            color="#000"
          />
          记住账号
        </label>
        <text class="forget" @click="handleForgetPassword">忘记密码？</text>
      </view>
      <!-- 登录按钮 -->
      <button class="login-btn" @click="handleLogin">登录</button>
      <!-- <button @click="appleLogin" class="apple-login-button">
        <image src="/static/images/apple.png" class="apple-icon" />
        <text class="apple-text">通过Apple登录</text>
      </button> -->
      <button
        v-if="loginType == 'ROLE_CUSTOMER'"
        class="register-btn"
        @click="handleRegister"
      >
        注册
      </button>
      <view v-else class="dealer-info">经销商申请致电详询：020-89567789</view>

      <!-- 用户协议 -->
      <view class="agreement">
        <checkbox
          activeBackgroundColor="#0ECBF7"
          style="transform: scale(0.6)"
          :checked="form.agreement"
          @click="form.agreement = !form.agreement"
          color="#000"
        />
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
import { managerLogin } from "@/api/login";
import store from "@/store";
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive } from "vue";

// 登录类型
const loginType = ref("ROLE_CUSTOMER");
const showPassword = ref(false);

// 表单数据
const form = reactive({
  // phone: "18826483596",
  // password: "123456",
  // phone: "15989297809",
  // password: "123456",
  phone: "",
  password: "",
  remember: false,
  agreement: false,
});
onLoad(() => {
  const res = uni.getStorageSync("loginForm");
  if (res) {
    form.phone = res.phone;
    form.password = res.password;
    form.remember = res.remember;
  }
});
const appleLogin = () => {
  uni.login({
    provider: "apple",
    success: (res) => {
      console.log("Apple登录成功", res);
      // 处理Apple登录返回的code
      const code = res.code;
    },
    fail: (err) => {
      console.error("Apple登录失败", err);
    },
    complete: (res) => {
      console.log("Apple登录完成", res);
    }
  });
};
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
  if (form.remember) {
    uni.setStorageSync("loginForm", form);
  } else {
    uni.removeStorageSync("loginForm");
  }
  // 账号角色 ROLE_DEALER:经销商；ROLE_CUSTOMER:客户，ROLE_EMPLOYEE:员工
  managerLogin({
    account: form.phone,
    password: form.password,
    role: loginType.value,
  }).then((res) => {
    store.commit("setUserInfo", res);
    uni.switchTab({
      url: "/pages/index/index",
    });
  });
  // TODO: 实现登录逻辑
};

// 处理注册
const handleRegister = () => {
  // TODO: 跳转到注册页面
  uni.navigateTo({
    url: `/pages/login/register/index`,
  });
};

// 处理忘记密码
const handleForgetPassword = () => {
  // TODO: 跳转到忘记密码页面
  uni.navigateTo({
    url: `/pages/login/forget/index`,
  });
};

// 查看用户协议
const handleViewTerms = () => {
  // TODO: 跳转到用户协议页面
  uni.navigateTo({
    url: `/pages/login/agreement/index`,
  });
};

// 查看隐私政策
const handleViewPrivacy = () => {
  // TODO: 跳转到隐私政策页面
  uni.navigateTo({
    url: `/pages/login/privacy/index`,
  });
};
</script>

<style lang="scss" scoped>
.apple-login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 44px;
  margin: 15px 0;
  background-color: #000;
  border-radius: 8px;
  
  .apple-icon {
    margin-right: 10rpx;
    width: 32rpx;
    height: 32rpx;
  }
  
  .apple-text {
    color: #fff;
    font-size: 17px;
    font-weight: 500;
  }
}
.login-container {
  background-color: $bg-color;
  min-height: 100vh;
  background-color: #1c2431;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
}

.login-bg {
  margin-top: 240rpx;
  width: 420rpx;
  height: 170rpx;
}

.login-type {
  margin-top: 136rpx;
  display: flex;
  justify-content: space-between;
  margin-bottom: 85rpx;
  width: 550rpx;

  .type-item {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 36rpx;

    .circle {
      width: 36rpx;
      height: 36rpx;
      background-color: #fff;
      border-radius: 50%;
      border: 2rpx solid #a5bfe8;
      margin-right: 18rpx;
      box-sizing: border-box;

      &.active {
        border: 10rpx solid #d68f01;
      }
    }
  }
}

.login-form {
  width: 100vw;
  padding-left: 32rpx;
  padding-right: 32rpx;

  .label {
    font-size: 29rpx;
    font-weight: 500;
    color: #fff;
    margin-bottom: 16rpx;
  }

  .form-item {
    background: #fff;
    margin-bottom: 30rpx;
    border-radius: 18rpx;
    padding: 0 25rpx;
    position: relative;
    height: 90rpx;

    input {
      height: 100%;
      font-size: 25rpx;
    }

    .eye-icon {
      width: 34rpx;
      height: 26rpx;
      position: absolute;
      right: 38rpx;
      top: 50%;
      transform: translateY(-50%);
    }

    .eye-open {
      width: 40rpx;
      height: 40rpx;
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
    font-size: 26rpx;
    display: flex;
    align-items: center;
  }

  .forget {
    color: #0ecbf7;
    font-size: 26rpx;
  }
}

.login-btn {
  background: $active-color;
  color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 18rpx;
  margin-bottom: 30rpx;
  font-size: 29rpx;
}

.register-btn {
  background: transparent;
  height: 100rpx;
  line-height: 100rpx;
  color: $active-color;
  border-radius: 18rpx;
  border: 3rpx solid $active-color;
  margin-bottom: 101rpx;
  font-size: 29rpx;
}

.dealer-info {
  color: #fff;
  font-size: 29rpx;
  text-align: center;
  padding-top: 30rpx;
  margin-bottom: 116rpx;
}

.agreement {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 25rpx;

  .link {
    color: $link-color;
  }
}

.placeholder {
  color: #999;
}

</style>
