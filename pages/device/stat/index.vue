<template>
	<view class="container">
		<!-- 总量统计 -->
		<view class="total-stats">
			<view class="stat-item">
				<text class="value">23480</text>
				<text class="label">总净水量（L）</text>
			</view>
			<view class="stat-item">
				<text class="value">164</text>
				<text class="label">总过滤杂质（g）</text>
			</view>
		</view>

		<!-- 日期选择 -->
		<view class="date-picker">
			<view class="picker-item" @click="showStartDatePicker">
				<text>{{ startDate }}</text>
				<image src="/static/images/arrow-down.png" mode="aspectFit" class="arrow-icon" />
			</view>
			<text class="picker-separator">至</text>
			<view class="picker-item" @click="showEndDatePicker">
				<text>{{ endDate }}</text>
				<image src="/static/images/arrow-down.png" mode="aspectFit" class="arrow-icon" />
			</view>
			<button class="confirm-btn" @click="handleConfirm">确定</button>
		</view>

		<!-- 数据表格 -->
		<view class="data-table">
			<!-- 表头 -->
			<view class="table-header">
				<text class="header-cell">日期</text>
				<text class="header-cell">当日用水（L）</text>
				<text class="header-cell">当日杂质（g）</text>
			</view>

			<!-- 表格内容 -->
			<scroll-view scroll-y class="table-body">
				<view v-for="(item, index) in tableData" :key="index" class="table-row">
					<text class="table-cell">{{ item.date }}</text>
					<text class="table-cell">{{ item.water }}</text>
					<text class="table-cell">{{ item.impurity }}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 日期范围
const startDate = ref('2024-04-01')
const endDate = ref('2024-04-30')

// 表格数据
const tableData = reactive([
	{ date: '2025-04-09', water: 12, impurity: 1.34 },
	{ date: '2025-04-08', water: 9, impurity: 0.76 },
	{ date: '2025-04-07', water: 14, impurity: 1.67 },
	{ date: '2025-04-06', water: 12, impurity: 1.34 },
	{ date: '2025-04-05', water: 9, impurity: 0.76 },
	{ date: '2025-04-04', water: 14, impurity: 1.67 },
	{ date: '2025-04-03', water: 12, impurity: 1.34 },
	{ date: '2025-04-02', water: 9, impurity: 0.76 },
	{ date: '2025-04-01', water: 14, impurity: 1.67 },
	{ date: '2025-03-30', water: 14, impurity: 1.67 },
	{ date: '2025-03-29', water: 12, impurity: 1.34 },
	{ date: '2025-03-28', water: 9, impurity: 0.76 },
	{ date: '2025-03-27', water: 14, impurity: 1.67 }
])

// 显示开始日期选择器
const showStartDatePicker = () => {
	uni.showDatePicker({
		value: startDate.value,
		success: (res) => {
			startDate.value = res.value
		}
	})
}

// 显示结束日期选择器
const showEndDatePicker = () => {
	uni.showDatePicker({
		value: endDate.value,
		success: (res) => {
			endDate.value = res.value
		}
	})
}

// 确认查询
const handleConfirm = () => {
	// TODO: 根据日期范围获取数据
	uni.showLoading({
		title: '加载中'
	})

	setTimeout(() => {
		uni.hideLoading()
	}, 1000)
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #1c2431;
	padding: 30rpx;
}

.total-stats {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;

	.stat-item {
		text-align: center;

		.value {
			color: #fff;
			font-size: 48rpx;
			font-weight: bold;
			margin-bottom: 10rpx;
			display: block;
		}

		.label {
			color: #999;
			font-size: 24rpx;
		}
	}
}

.date-picker {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;

	.picker-item {
		flex: 1;
		background: #2D3C58;
		height: 80rpx;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;

		text {
			color: #fff;
			font-size: 28rpx;
		}

		.arrow-icon {
			width: 32rpx;
			height: 32rpx;
		}
	}

	.picker-separator {
		color: #fff;
		padding: 0 20rpx;
	}

	.confirm-btn {
		width: 160rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #D68F01;
		color: #fff;
		font-size: 28rpx;
		border-radius: 12rpx;
		margin-left: 20rpx;
		text-align: center;
	}
}

.data-table {
	background: #2D3C58;
	border-radius: 12rpx;
	overflow: hidden;

	.table-header {
		display: flex;
		padding: 20rpx 0;
		background: #1c2431;

		.header-cell {
			flex: 1;
			color: #fff;
			font-size: 28rpx;
			text-align: center;
		}
	}

	.table-body {
		height: calc(100vh - 400rpx);

		.table-row {
			display: flex;
			padding: 20rpx 0;
			border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);

			&:last-child {
				border-bottom: none;
			}

			.table-cell {
				flex: 1;
				color: #fff;
				font-size: 28rpx;
				text-align: center;
			}
		}
	}
}
</style>
