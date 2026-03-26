<template>
	<view class="container">
		<view v-if="fromType == 'forget'" class="result-content">
			<!-- 成功图标 -->
			<image class="success-icon" src="/static/images/login-reset-success.png" mode="aspectFit" />
			<!-- 成功提示文本 -->
			<text class="success-title">重置密码成功！</text>
			<text class="success-desc">请使用手机号码与密码登录</text>ƒ
			<!-- 登录按钮 -->
			<button class="login-btn" @click="goToLogin">
				去登录
			</button>
		</view>
		<view v-if="fromType == 'register'" class="result-content">
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
import { onLoad } from "@dcloudio/uni-app";

const fromType = ref('forget')
onLoad(({ from }) => {
	fromType.value = from || 'forget'
})
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
		font-size: 32rpx;
		color: $warning-color;
		margin-bottom: 20rpx;
	}

	.success-desc {
		font-size: 29rpx;
		color: $active-color;
		margin-bottom: 491rpx;
	}

	.login-btn {
		width: 688rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 18rpx;
		background: $active-color;
		font-size: 29rpx;
		color: $text-white;
	}
}
</style>
