<template>
	<view class="container">
		<!-- 基础开关设置 -->
		<view class="setting-card">
			<view class="switch-item">
				<text>暂停</text>
				<switch :checked="settings.pause" @change="handlePauseChange" color="#0A84FF" class="custom-switch" />
			</view>
			<view class="switch-item">
				<text>排空</text>
				<switch :checked="settings.drain" @change="handleDrainChange" color="#0A84FF" class="custom-switch" />
			</view>
		</view>

		<!-- 温度设置 -->
		<view class="setting-card">
			<view class="temp-item">
				<text>开水停止加热温度</text>
				<view class="temp-input">
					<input type="number" v-model="settings.hotWaterTemp" class="input" maxlength="3" />
					<text class="unit">℃</text>
					<button class="save-btn" @click="handleSaveHotTemp">保存</button>
				</view>
			</view>
		</view>

		<view class="setting-card">
			<view class="temp-item">
				<text>温开水停止加热温度</text>
				<view class="temp-input">
					<input type="number" v-model="settings.warmWaterTemp" class="input" maxlength="3" />
					<text class="unit">℃</text>
					<button class="save-btn" @click="handleSaveWarmTemp">保存</button>
				</view>
			</view>
		</view>

		<!-- 定时设置 -->
		<view class="setting-card">
			<view class="timer-item">
				<view class="timer-header">
					<view class="timer-left">
						<image src="/static/images/timer.png" mode="aspectFit" class="timer-icon" />
						<text>定时运行</text>
					</view>
					<switch :checked="settings.timerRun" @change="handleTimerRunChange" color="#0A84FF"
						class="custom-switch" />
				</view>
				<view class="timer-link" @click="navigateToTimerSetting">
					<text>定时开关设置</text>
					<image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
				</view>
			</view>
		</view>

		<view class="setting-card">
			<view class="timer-item">
				<view class="timer-header">
					<view class="timer-left">
						<image src="/static/images/sterilize.png" mode="aspectFit" class="timer-icon" />
						<text>定时消毒</text>
					</view>
					<switch :checked="settings.timerSterilize" @change="handleTimerSterilizeChange" color="#0A84FF" />
				</view>
				<view class="timer-link" @click="navigateToSterilizeSetting">
					<text>定时消毒设置</text>
					<image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
				</view>
			</view>
		</view>

		<view class="setting-card">
			<view class="timer-item">
				<view class="timer-header">
					<view class="timer-left">
						<image src="/static/images/wash.png" mode="aspectFit" class="timer-icon" />
						<text>定时冲洗</text>
					</view>
					<switch :checked="settings.timerWash" @change="handleTimerWashChange" color="#0A84FF" />
				</view>
				<view class="timer-link" @click="navigateToWashSetting">
					<text>定时冲洗设置</text>
					<image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive } from 'vue'

// 设置数据
const settings = reactive({
	pause: false,
	drain: false,
	hotWaterTemp: 98,
	warmWaterTemp: 65,
	timerRun: true,
	timerSterilize: false,
	timerWash: true
})

// 暂停开关
const handlePauseChange = (e) => {
	settings.pause = e.detail.value
}

// 排空开关
const handleDrainChange = (e) => {
	settings.drain = e.detail.value
}

// 保存开水温度
const handleSaveHotTemp = () => {
	const temp = Number(settings.hotWaterTemp)
	if (temp < 0 || temp > 100) {
		uni.showToast({
			title: '温度范围为0-100℃',
			icon: 'none'
		})
		return
	}
	uni.showToast({
		title: '保存成功',
		icon: 'success'
	})
}

// 保存温开水温度
const handleSaveWarmTemp = () => {
	const temp = Number(settings.warmWaterTemp)
	if (temp < 0 || temp > 100) {
		uni.showToast({
			title: '温度范围为0-100℃',
			icon: 'none'
		})
		return
	}
	uni.showToast({
		title: '保存成功',
		icon: 'success'
	})
}

// 定时运行开关
const handleTimerRunChange = (e) => {
	settings.timerRun = e.detail.value
}

// 定时消毒开关
const handleTimerSterilizeChange = (e) => {
	settings.timerSterilize = e.detail.value
}

// 定时冲洗开关
const handleTimerWashChange = (e) => {
	settings.timerWash = e.detail.value
}

// 跳转到定时开关设置
const navigateToTimerSetting = () => {
	uni.navigateTo({
		url: '/pages/device/setting/timer/index'
	})
}

// 跳转到定时消毒设置
const navigateToSterilizeSetting = () => {
	uni.navigateTo({
		url: '/pages/device/setting/sterilize/index'
	})
}

// 跳转到定时冲洗设置
const navigateToWashSetting = () => {
	uni.navigateTo({
		url: '/pages/device/setting/wash/index'
	})
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #1c2431;
	padding: 20rpx;
}

.setting-card {
	background: #2D3C58;
	border-radius: 12rpx;
	margin-bottom: 20rpx;

	.switch-item {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		text {
			color: #fff;
			font-size: 28rpx;
		}

		.custom-switch {
			transform: scale(0.8);
		}
	}

	.temp-item {
		padding: 30rpx;

		text {
			color: #fff;
			font-size: 28rpx;
			margin-bottom: 20rpx;
			display: block;
		}

		.temp-input {
			display: flex;
			align-items: center;

			.input {
				width: 120rpx;
				height: 80rpx;
				background: #1c2431;
				border-radius: 8rpx;
				color: #fff;
				font-size: 32rpx;
				text-align: center;
				margin-right: 20rpx;
			}

			.unit {
				color: #fff;
				font-size: 28rpx;
				margin-right: 20rpx;
			}

			.save-btn {
				width: 140rpx;
				height: 80rpx;
				line-height: 80rpx;
				background: #D68F01;
				color: #fff;
				font-size: 28rpx;
				border-radius: 8rpx;
				text-align: center;
			}
		}
	}

	.timer-item {
		padding: 30rpx;

		.timer-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;

			.timer-left {
				display: flex;
				align-items: center;

				.timer-icon {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}

				text {
					color: #fff;
					font-size: 28rpx;
				}
			}

			.custom-switch {
				transform: scale(0.8);
			}
		}

		.timer-link {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			border-top: 2rpx solid rgba(255, 255, 255, 0.1);

			text {
				color: #999;
				font-size: 28rpx;
			}

			.arrow-icon {
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
}
</style>
