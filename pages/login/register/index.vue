<template>
	<view class="register-page">
		<view class="form">
			<!-- 手机号输入 -->
			<view class="form-item">
				<text class="label">手机号码</text>
				<input v-model="formData.phone" type="number" placeholder="请输入" class="input" />
			</view>

			<!-- 验证码输入 -->
			<view class="form-item">
				<text class="label">验证码</text>
				<view class="verify-code">
					<input v-model="formData.code" type="number" placeholder="请输入" class="input" />
					<text class="get-code" :class="{ disabled: counting }" @click="getVerifyCode">
						{{ codeText }}
					</text>
				</view>
			</view>

			<!-- 密码输入 -->
			<view class="form-item">
				<text class="label">密码</text>
				<input v-model="formData.password" type="password" placeholder="请输入" class="input" password />
			</view>

			<!-- 确认密码 -->
			<view class="form-item">
				<text class="label">确认密码</text>
				<input v-model="formData.confirmPassword" type="password" placeholder="请输入" class="input" password />
			</view>

			<text class="tip">密码需由字母与数字组成，不少于8位</text>

			<!-- 提交按钮 -->
			<button class="submit-btn" @click="handleSubmit">
				确定
			</button>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 表单数据
const formData = reactive({
	phone: '',
	code: '',
	password: '',
	confirmPassword: ''
})

// 验证码相关
const counting = ref(false)
const countdown = ref(60)
const codeText = ref('获取验证码')

// 获取验证码
const getVerifyCode = () => {
	if (counting.value) return
	if (!formData.phone) {
		uni.showToast({
			title: '请输入手机号',
			icon: 'none'
		})
		return
	}

	counting.value = true
	codeText.value = `${countdown.value}s`

	const timer = setInterval(() => {
		countdown.value--
		codeText.value = `${countdown.value}s`
		if (countdown.value <= 0) {
			clearInterval(timer)
			counting.value = false
			countdown.value = 60
			codeText.value = '获取验证码'
		}
	}, 1000)

	// TODO: 调用获取验证码接口
}

// 提交表单
const handleSubmit = () => {
	if (!formData.phone) {
		uni.showToast({
			title: '请输入手机号',
			icon: 'none'
		})
		return
	}
	if (!formData.code) {
		uni.showToast({
			title: '请输入验证码',
			icon: 'none'
		})
		return
	}
	if (!formData.password) {
		uni.showToast({
			title: '请输入密码',
			icon: 'none'
		})
		return
	}
	if (formData.password !== formData.confirmPassword) {
		uni.showToast({
			title: '两次密码输入不一致',
			icon: 'none'
		})
		return
	}

	// TODO: 调用重置密码接口
}
</script>

<style lang="scss" scoped>
.register-page {
	min-height: 100vh;
	background-color: $primary-color;
	padding: 20px;
}

.form {
	.form-item {
		margin-bottom: 20px;

		.label {
			font-size: 14px;
			color: #fff;
			margin-bottom: 8px;
			display: block;
		}

		.input {
			background-color: #fff;
			height: 44px;
			border-radius: 8px;
			padding: 0 15px;
			font-size: 14px;
		}

		.verify-code {
			display: flex;
			align-items: center;

			.input {
				flex: 1;
				margin-right: 10px;
			}

			.get-code {
				background-color: #f0ad4e;
				color: #fff;
				padding: 0 15px;
				height: 44px;
				line-height: 44px;
				border-radius: 8px;
				font-size: 14px;

				&.disabled {
					background-color: #ccc;
				}
			}
		}
	}

	.tip {
		font-size: 12px;
		color: #999;
		margin-bottom: 30px;
		display: block;
	}

	.submit-btn {
		width: 100%;
		height: 44px;
		line-height: 44px;
		background-color: #f0ad4e;
		color: #fff;
		font-size: 16px;
		border-radius: 8px;
		text-align: center;
	}
}
</style>
