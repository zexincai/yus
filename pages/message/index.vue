<template>
	<view class="container">
		<!-- 顶部标题和操作按钮 -->
		<view class="header">
			<text class="title">消息：{{ messageCount }}</text>
			<view class="actions">
				<view class="action-btn" @click="handleReadAll">
					<image src="/static/images/read-all.png" mode="aspectFit" class="action-icon" />
					<text>全部已读</text>
				</view>
				<view class="action-btn" @click="handleDeleteAll">
					<image src="/static/images/delete-all.png" mode="aspectFit" class="action-icon" />
					<text>全部删除</text>
				</view>
			</view>
		</view>

		<!-- 消息列表 -->
		<view class="message-list">
			<view v-for="(message, index) in messageList" :key="index" class="message-item"
				@click="handleMessageClick(message)">
				<image :src="message.icon" mode="aspectFit" class="device-icon" />
				<view class="message-info">
					<text class="device-name">{{ message.name }}</text>
					<text class="device-sn">SN:{{ message.sn }}</text>
				</view>
				<view class="message-right">
					<text class="message-time">{{ message.time }}</text>
					<view v-if="message.unread" class="unread-badge">{{ message.unread }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 消息总数
const messageCount = ref(4)

// 消息列表数据
const messageList = reactive([
	{
		name: '一楼前台',
		sn: '34523487679890',
		icon: '/static/images/device1.png',
		time: '2025-06-20 14:20',
		unread: 3
	},
	{
		name: '企业展厅',
		sn: '34523487679821',
		icon: '/static/images/device2.png',
		time: '2025-06-20 11:30',
		unread: 1
	},
	{
		name: '会议室',
		sn: '34523487675680',
		icon: '/static/images/device1.png',
		time: '2025-06-16 09:30',
		unread: 0
	}
])

// 处理消息点击
const handleMessageClick = (message) => {
	uni.navigateTo({
		url: `/pages/message/detail/detail?sn=${message.sn}`
	})
}

// 全部已读
const handleReadAll = () => {
	messageList.forEach(item => {
		item.unread = 0
	})
	messageCount.value = 0
}

// 全部删除
const handleDeleteAll = () => {
	messageList.length = 0
	messageCount.value = 0
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: $primary-color;
	padding: 20rpx;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30rpx;

	.title {
		color: #fff;
		font-size: 32rpx;
	}

	.actions {
		display: flex;
		align-items: center;

		.action-btn {
			display: flex;
			align-items: center;
			margin-left: 30rpx;

			.action-icon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}

			text {
				color: #D68F01;
				font-size: 28rpx;
			}
		}
	}
}

.message-list {
	.message-item {
		background: #2D3C58;
		border-radius: 12rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;

		.device-icon {
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
		}

		.message-info {
			flex: 1;

			.device-name {
				color: #fff;
				font-size: 32rpx;
				margin-bottom: 10rpx;
				display: block;
			}

			.device-sn {
				color: #999;
				font-size: 24rpx;
			}
		}

		.message-right {
			text-align: right;

			.message-time {
				color: #999;
				font-size: 24rpx;
				display: block;
				margin-bottom: 10rpx;
			}

			.unread-badge {
				display: inline-block;
				min-width: 36rpx;
				height: 36rpx;
				line-height: 36rpx;
				text-align: center;
				background: #ff4d4f;
				color: #fff;
				font-size: 24rpx;
				border-radius: 18rpx;
				padding: 0 10rpx;
			}
		}
	}
}
</style>
