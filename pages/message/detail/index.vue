<template>
	<view class="container">
		<!-- 设备信息卡片 -->
		<view class="device-card">
			<view class="device-header">
				<view class="device-title">
					<text>企业展厅</text>
					<image src="/static/images/edit.png" mode="aspectFit" class="edit-icon" />
				</view>
				<view class="view-device" @click="handleViewDevice">
					<text>查看设备 >></text>
				</view>
			</view>

			<view class="device-info">
				<view class="info-item">
					<text class="label">SN:</text>
					<text class="value">34523456712801</text>
					<text class="tag">复制</text>
				</view>
				<view class="info-item">
					<text class="label">型号:</text>
					<text class="value">S800-2</text>
				</view>
				<view class="info-item">
					<text class="label">类型:</text>
					<text class="value">商务饮水机</text>
				</view>
				<view class="info-item">
					<text class="label">客户:</text>
					<text class="value">焦靖国 15677893456</text>
				</view>
				<view class="info-item">
					<text class="label">地区:</text>
					<text class="value">广东省广州市天河区</text>
				</view>
				<view class="info-item">
					<text class="label">地址:</text>
					<text class="value">工业大道58号福福大厦209室</text>
				</view>
			</view>

			<image src="/static/images/device.png" mode="aspectFit" class="device-image" />
		</view>

		<!-- 消息列表 -->
		<view class="message-section">
			<view class="message-header">
				<text>消息: {{ messageCount }}</text>
				<view class="delete-all" @click="handleDeleteAll">
					<image src="/static/images/delete.png" mode="aspectFit" class="delete-icon" />
					<text>全部删除</text>
				</view>
			</view>

			<view class="message-list">
				<view v-for="(message, index) in messages" :key="index" class="message-item" :class="message.type">
					<view class="message-title">
						<text>{{ message.title }}</text>
						<text class="message-time">{{ message.time }}</text>
						<text class="delete-btn" @click="handleDeleteMessage(index)">删除</text>
					</view>
					<text class="message-content">{{ message.content }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 消息数量
const messageCount = ref(3)

// 消息列表
const messages = reactive([
	{
		type: 'error',
		title: '故障提醒',
		time: '2025-06-16 09:30',
		content: '进水口缺水'
	},
	{
		type: 'warning',
		title: '租赁到期提醒',
		time: '2025-06-16 09:30',
		content: '到期日期: 2025-06-15'
	},
	{
		type: 'info',
		title: '滤芯更换提醒',
		time: '2025-06-16 09:30',
		content: '滤芯剩余低于10%'
	}
])

// 查看设备详情
const handleViewDevice = () => {
	uni.navigateTo({
		url: '/pages/device/detail'
	})
}

// 删除单条消息
const handleDeleteMessage = (index) => {
	messages.splice(index, 1)
	messageCount.value--
}

// 删除全部消息
const handleDeleteAll = () => {
	messages.length = 0
	messageCount.value = 0
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #1c2431;
	padding: 20rpx;
}

.device-card {
	background: #2D3C58;
	border-radius: 12rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	position: relative;

	.device-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;

		.device-title {
			display: flex;
			align-items: center;

			text {
				color: #fff;
				font-size: 32rpx;
				margin-right: 20rpx;
			}

			.edit-icon {
				width: 32rpx;
				height: 32rpx;
			}
		}

		.view-device {
			text {
				color: #4A9FEE;
				font-size: 28rpx;
			}
		}
	}

	.device-info {
		.info-item {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.label {
				color: #999;
				font-size: 28rpx;
				margin-right: 20rpx;
			}

			.value {
				color: #fff;
				font-size: 28rpx;
			}

			.tag {
				background: #D68F01;
				color: #fff;
				font-size: 24rpx;
				padding: 4rpx 12rpx;
				border-radius: 6rpx;
				margin-left: 20rpx;
			}
		}
	}

	.device-image {
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		width: 200rpx;
		height: 400rpx;
	}
}

.message-section {
	.message-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;

		text {
			color: #fff;
			font-size: 32rpx;
		}

		.delete-all {
			display: flex;
			align-items: center;

			.delete-icon {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}

			text {
				color: #FF4D4F;
				font-size: 28rpx;
			}
		}
	}

	.message-list {
		.message-item {
			background: #2D3C58;
			border-radius: 12rpx;
			padding: 30rpx;
			margin-bottom: 20rpx;

			.message-title {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				text {
					color: #fff;
					font-size: 28rpx;
				}

				.message-time {
					color: #999;
					margin-left: 20rpx;
					flex: 1;
				}

				.delete-btn {
					color: #FF4D4F;
				}
			}

			.message-content {
				color: #fff;
				font-size: 28rpx;
			}

			&.error {
				.message-title text:first-child {
					color: #FF4D4F;
				}
			}

			&.warning {
				.message-title text:first-child {
					color: #D68F01;
				}
			}

			&.info {
				.message-title text:first-child {
					color: #4A9FEE;
				}
			}
		}
	}
}
</style>
