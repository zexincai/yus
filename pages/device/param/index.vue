<template>
	<view class="container">
		<view class="param-card">
			<!-- 功能参数列表 -->
			<view class="param-item" v-for="(item, index) in paramList" :key="index">
				<text class="param-label">{{ item.label }}：</text>
				<text class="param-value" :class="{ 'value-on': item.value === '有' || item.value === '显示' }">
					{{ item.value }}
				</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive } from 'vue'

// 参数列表数据
const paramList = reactive([
	{ label: '自动冲洗功能', value: '有' },
	{ label: '排空功能', value: '有' },
	{ label: '消毒功能', value: '有' },
	{ label: '净水量统计功能', value: '有' },
	{ label: '原水TDS显示', value: '显示' },
	{ label: '纯水TDS显示', value: '显示' },
	{ label: '温开水温度显示', value: '不显示' },
	{ label: '滤芯寿命显示', value: '显示' }
])
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #1c2431;
	padding: 20rpx;
}

.param-card {
	background: #2D3C58;
	border-radius: 12rpx;
	padding: 0 30rpx;

	.param-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);

		&:last-child {
			border-bottom: none;
		}

		.param-label {
			color: #fff;
			font-size: 28rpx;
		}

		.param-value {
			color: #0A84FF;
			font-size: 28rpx;

			&.value-on {
				color: #0A84FF;
			}
		}
	}
}
</style>
