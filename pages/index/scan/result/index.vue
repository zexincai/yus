<template>
    <view class="container">
        <view v-if="from == 'success'" class="result-content">
            <!-- 成功图标 -->
            <image class="success-icon" src="/static/images/icon-success.png" mode="aspectFit" />
            <!-- 成功提示文本 -->
            <text class="success-title">绑定成功</text>
            <button class="login-btn" @click="goToLogin">
                返回首页
            </button>
        </view>
        <view v-if="from == 'register'" class="result-content">
            <!-- 成功图标 -->
            <image class="success-icon" src="/static/images/login-register-success.png" mode="aspectFit" />
            <!-- 成功提示文本 -->
            <text class="success-title">注册成功</text>
            <text class="success-desc">请使用手机号码与密码登录</text>ƒ
            <!-- 登录按钮 -->
            <button class="login-btn" @click="goToLogin">
                去登录
            </button>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const from = ref(route.query.from)
const goToLogin = () => {
    uni.redirectTo({
        url: '/pages/login/index'
    })
}
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
        width: 217rpx;
        height: 217rpx;
        margin-bottom: 40rpx;
    }

    .success-title {
        font-size: 36rpx;
        color: rgba(255, 255, 255, 1);
    }

    .success-desc {
        font-size: 29rpx;
        color: #fff;
        margin-bottom: 491rpx;
    }

    .login-btn {
        margin-top: 125rpx;
        line-height: 72rpx;
        background: $active-color;
        font-size: 29rpx;
        color: #fff;
        width: 181rpx;
        height: 72rpx;
        border-radius: 90rpx;
        background: #D68F01FF;
    }
}
</style>
