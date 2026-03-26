<template>
	<view class="container">
		<!-- 总量统计 -->
		<view v-if="detail.brandCode === 'GXYSJ'" class="total-stats">
			<view class="stat-item">
				<text class="value">{{ detail.totalVolume }}</text>
				<text class="label">总取水流量（L）</text>
			</view>
		</view>
		<view v-else class="total-stats">
			<view class="stat-item">
				<text class="value">{{ detail.totalVolume }}</text>
				<text class="label">总净水量（L）</text>
			</view>
			<view class="stat-item">
				<text class="value">{{ detail.totalImpurity }}</text>
				<text class="label">总过滤杂质（g）</text>
			</view>
		</view>

		<!-- 日期选择 -->
		<view class="date-picker">
			<picker mode="date" :valLue="startDate" @change="hanldeStartDateChange">
				<view class="picker-item">
					<text>{{ startDate }}</text>
					<image src="/static/images/arrow-down.png" mode="aspectFit" class="arrow-icon" />
				</view>
			</picker>
			<text class="picker-separator">至</text>
			<picker mode="date" :valLue="endDate" @change="hanldeEndDateChange">
				<view class="picker-item">
					<text>{{ endDate }}</text>
					<image src="/static/images/arrow-down.png" mode="aspectFit" class="arrow-icon" />
				</view>
			</picker>
			<button class="confirm-btn" @click="handleConfirm">确定</button>
		</view>

		<!-- 数据表格 -->
		<view v-if="detail.brandCode === 'GXYSJ'" class="data-table">
			<!-- 表头 -->
			<view class="table-header">
				<text class="header-cell">时间</text>
				<text class="header-cell" style="flex: 0.5">取水流量（L）</text>
			</view>

			<!-- 表格内容 -->
			<scroll-view scroll-y class="table-body">
				<!-- detail.rows -->
				<view v-for="(item, index) in detail.rows" :key="index" class="table-row">
					<text class="table-cell">{{ item.date }}</text>
					<text class="table-cell" style="flex: 0.5">{{ item.volume }}</text>
				</view>
			</scroll-view>
		</view>
		<view v-else class="data-table">
			<!-- 表头 -->
			<view class="table-header">
				<text class="header-cell">日期</text>
				<text class="header-cell">当日用水（L）</text>
				<text class="header-cell">当日杂质（g）</text>
			</view>

			<!-- 表格内容 -->
			<scroll-view scroll-y class="table-body">
				<view v-for="(item, index) in detail.rows" :key="index" class="table-row">
					<text class="table-cell">{{ item.date }}</text>
					<text class="table-cell">{{ item.volume }}</text>
					<text class="table-cell">{{ item.impurity }}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad, } from "@dcloudio/uni-app";
import { getStatistics, } from "@/api/dealer";
import DateUtil from "@/utils/date";

// 日期范围
const startDate = ref('2024-04-01')
const endDate = ref('2024-04-30')
const deviceId = ref('')
const detail = ref({
	totalVolume: 0,
	totalImpurity: 0,
	rows: []
})
// 表格数据
const tableData = reactive([
	{ date: '2025-04-09', volume: 12, impurity: 1.34 },
	{ date: '2025-04-08', volume: 9, impurity: 0.76 },
	{ date: '2025-04-07', volume: 14, impurity: 1.67 },
	{ date: '2025-04-06', volume: 12, impurity: 1.34 },
	{ date: '2025-04-05', volume: 9, impurity: 0.76 },
	{ date: '2025-04-04', volume: 14, impurity: 1.67 },
	{ date: '2025-04-03', volume: 12, impurity: 1.34 },
	{ date: '2025-04-02', volume: 9, impurity: 0.76 },
	{ date: '2025-04-01', volume: 14, impurity: 1.67 },
	{ date: '2025-03-30', volume: 14, impurity: 1.67 },
	{ date: '2025-03-29', volume: 12, impurity: 1.34 },
	{ date: '2025-03-28', volume: 9, impurity: 0.76 },
	{ date: '2025-03-27', volume: 14, impurity: 1.67 }
])

onLoad(({ id }) => {
	deviceId.value = id
	// 获取取这个月的第一天跟今天
	endDate.value = DateUtil.today()
	startDate.value = DateUtil.getFirstDayOfMonth()
	getData()

})
const hanldeStartDateChange = (e) => {
	startDate.value = e.detail.value;
	if (new Date(startDate.value).getTime() > new Date(endDate.value).getTime()) {
		endDate.value = startDate.value
	}
	// if (DateUtil.compare(startDate.value, endDate.value)) {
	// 	startDate.value = endDate.value
	// }
	getData()

};
const hanldeEndDateChange = (e) => {
	endDate.value = e.detail.value;
	if (new Date(startDate.value).getTime() > new Date(endDate.value).getTime()) {
		startDate.value = endDate.value
	}
	getData()
};
const getData = async () => {
	const resp = await getStatistics({
		deviceId: deviceId.value,
		startDate: startDate.value,
		endDate: endDate.value
	})
	detail.value = resp
}
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
	background-color: $bg-color;
	padding: 24rpx;
}

.total-stats {
	padding: 10rpx 50rpx;
	display: flex;
	justify-content: space-around;
	margin-bottom: 50rpx;

	.stat-item {
		text-align: center;

		.value {
			color: $active-color;
			font-size: 43rpx;
			margin-bottom: 10rpx;
			line-height: 1;
			display: block;
		}

		.label {
			color: $text-secondary;
			font-size: 21rpx;
		}
	}
}

.date-picker {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;

	.picker-item {
		min-width: 200rpx;
		flex: 1;
		height: 65.22rpx;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		border-radius: 9rpx;
		background: $bg-color-card;

		text {
			color: $text-secondary;
			font-size: 25rpx;
		}

		.arrow-icon {
			// 箭头图标样式
			width: 0;
			height: 0;
			border-left: 10rpx solid transparent;
			border-right: 10rpx solid transparent;
			border-top: 12rpx solid $text-disabled;
			margin-left: 4rpx;
			display: inline-block;
			vertical-align: middle;

		}
	}

	.picker-separator {
		color: $text-dark;
		font-size: 28rpx;
		padding: 0 20rpx;
	}

	.confirm-btn {
		color: $text-white;
		font-size: 25rpx;
		border-radius: 12rpx;
		margin-left: 40rpx;
		text-align: center;
		width: 130rpx;
		line-height: 65rpx;
		height: 65rpx;
		border-radius: 36rpx;
		background: $active-color;
	}
}

.data-table {
	background: $bg-color-card;
	overflow: hidden;

	.table-header {
		display: flex;
		height: 66rpx;
		align-items: center;
		background: #A0ABB8; // approx
		border-bottom: 4rpx solid $bg-color;

		.header-cell {
			flex: 1;
			padding-left: 25rpx;
			color: $text-white;
			font-size: 25rpx;
		}
	}

	.table-body {
		.table-row {
			display: flex;
			height: 66rpx;
			align-items: center;
			border-bottom: 4rpx solid $text-white;

			&:last-child {
				border-bottom: none;
			}

			.table-cell {
				padding-left: 25rpx;
				flex: 1;
				color: $text-secondary;
				font-size: 25rpx;
			}
		}
	}
}
</style>
