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
				<text v-if="timeNum" class="code">{{ timeNum }}s</text>
				<text v-else @click="getCode" class="code">获取验证码</text>
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
import { passwordReset, getCaptcha } from '@/api/login'
import { ref, reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";

// 登录类型
const showPassword = ref(false);
const showPasswordTwo = ref(false);
const timeNum = ref(0);
const role = ref('ROLE_CUSTOMER')
let timer = null
// 表单数据
const form = reactive({
	phone: "",
	password: "",
	code: '',
	passwordTwo: ""
});
onLoad((options) => {
	role.value = options.role
})
const getCode = () => {
	if (timeNum.value > 0) return;
	if (!form.phone || !/^1[3456789]\d{9}$/.test(form.phone)) {
		uni.showToast({
			title: "请输入正确的手机号码",
			icon: "none",
		});
		return;
	}
	getCaptcha({ phone: form.phone }).then(v => {
		// 这里可以添加请求验证码的逻辑
		uni.showToast({
			title: "验证码发送成功",
			icon: "none",
		})
		timeNum.value = 60;
		timer = setInterval(() => {
			timeNum.value--;
			if (timeNum.value <= 0) {
				clearInterval(timer);
			}
		}, 1000);
	}).catch(() => {
		clearInterval(timer);
		timeNum.value = 0
	})

};

// 处理登录
const handleSubmit = () => {
	if (!form.phone) {
		uni.showToast({
			title: "请输入手机号码",
			icon: "none",
		});
		return;
	}
	if (!form.code) {
		uni.showToast({
			title: "请输入验证码",
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
	if (form.password !== form.passwordTwo) {
		uni.showToast({
			title: "两次输入的密码不一致",
			icon: "none",
		});
		return;
	}
	// 密码需由字母与数字组成，不少于8位
	if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(form.password)) {
		uni.showToast({
			title: "密码需由字母与数字组成，不少于8位",
			icon: "none",
		});
		return;
	}
	passwordReset({
		role: role.value,
		phone: form.phone,
		captcha: form.code,
		newPassword: form.password,
		againPassword: form.passwordTwo,
	}).then(v => {
		return uni.navigateTo({
			url: `/pages/login/result/index?from=forget`
		})
	})
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
			z-index: 100;
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