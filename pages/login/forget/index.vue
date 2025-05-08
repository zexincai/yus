<template>
	<view class="login-container">
		<view class="forget-form">
			<view class="label">手机号码</view>
			<view class="form-item">
				<input type="text" maxlength="11" v-model="form.phone" placeholder="手机号码"
					placeholder-class="placeholder" />
			</view>
			<view class="label">验证码</view>
			<view class="form-item">
				<input type="text" maxlength="11" v-model="form.code" placeholder="请输入"
					placeholder-class="placeholder" />
				<text class="code">获取验证码</text>
			</view>
			<view class="label">密码</view>
			<view class="form-item">
				<input :type="showPassword ? 'text' : 'password'" v-model="form.password" placeholder="密码"
					placeholder-class="placeholder" />
				<image v-if="!showPassword" src="/static/images/eye-off.png" class="eye-icon"
					@click="showPassword = !showPassword" />
				<image v-else src="/static/images/eye-open.png" class="eye-icon eye-open"
					@click="showPassword = !showPassword" />
			</view>

			<view class="label">确认密码</view>
			<view class="form-item">
				<input :type="showPasswordTwo ? 'text' : 'password'" v-model="form.passwordTwo" placeholder="密码"
					placeholder-class="placeholder" />
				<image v-if="!showPasswordTwo" src="/static/images/eye-off.png" class="eye-icon"
					@click="showPasswordTwo = !showPasswordTwo" />
				<image v-else src="/static/images/eye-open.png" class="eye-icon eye-open"
					@click="showPasswordTwo = !showPasswordTwo" />
			</view>
			<view class="login-tip">密码需由字母与数字组成，不少于8位</view>
			<button class="login-btn" @click="handleSubmit">确定</button>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from "vue";

// 登录类型
const showPassword = ref(false);
const showPasswordTwo = ref(false);

// 表单数据
const form = reactive({
	phone: "",
	password: "",
	code: '',
	passwordTwo: ""
});

// 处理登录
const handleSubmit = () => {
	return uni.navigateTo({
		url: `/pages/login/result/index?from=forget`
	})
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
	// TODO: 实现登录逻辑
};
</script>

<style lang="scss" scoped>
.login-container {
	min-height: 100vh;
	background-color: $bg-color;
	display: flex;
	flex-direction: column;
	// justify-content: center;
	align-items: center;
}

.forget-form {
	margin-top: 40rpx;
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
		margin-bottom: 48rpx;
		border-radius: 18rpx;
		padding: 0 25rpx;
		position: relative;
		height: 90rpx;

		input {
			height: 100%;
			font-size: 25rpx;
		}

		.code {
			font-size: 25rpx;
			color: $active-color;
			position: absolute;
			right: 38rpx;
			top: 50%;
			transform: translateY(-50%);
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

.login-btn {
	background: $active-color;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 18rpx;
	margin-bottom: 30rpx;
	font-size: 29rpx;
}

.login-tip {
	color: #fff;
	font-size: 29rpx;
	text-align: center;
	padding-top: 30rpx;
	margin-bottom: 72rpx;
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