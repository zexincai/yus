<template>
	<view class="container">
		<!-- 滤芯更换周期 -->
		<view class="section-title">滤芯更换周期</view>
		<view class="data-grid">
			<view class="data-card">
				<text class="value">100</text>
				<text class="label">精密PP棉（天）</text>
			</view>
			<view class="data-card">
				<text class="value">120</text>
				<text class="label">活性炭（天）</text>
			</view>
			<view class="data-card">
				<text class="value">120</text>
				<text class="label">超滤膜（天）</text>
			</view>
			<view class="data-card">
				<text class="value">90</text>
				<text class="label">RO反渗透膜（天）</text>
			</view>
		</view>

		<!-- 设备数据 -->
		<view class="section-title">设备数据</view>
		<view class="data-grid">
			<view class="data-card">
				<text class="value">14530</text>
				<text class="label">总制水量（L）</text>
			</view>
			<view class="data-card">
				<text class="value">97</text>
				<text class="label">开水水温（℃）</text>
			</view>
			<view class="data-card">
				<text class="value">64</text>
				<text class="label">温开水温（℃）</text>
			</view>
		</view>

		<!-- 状态数据 -->
		<view class="section-title">状态数据</view>
		<view class="status-grid">
			<view class="status-card">
				<text class="status-value">加热中</text>
				<text class="status-label">加热状态</text>
			</view>
			<view class="status-card">
				<text class="status-value">进水关闭</text>
				<text class="status-label">进水状态</text>
			</view>
			<view class="status-card">
				<text class="status-value">冲洗关闭</text>
				<text class="status-label">冲洗状态</text>
			</view>
			<view class="status-card">
				<text class="status-value">排空关闭</text>
				<text class="status-label">排空状态</text>
			</view>
			<view class="status-card">
				<text class="status-value">消毒关闭</text>
				<text class="status-label">消毒状态</text>
			</view>
			<view class="status-card">
				<text class="status-value">制水中</text>
				<text class="status-label">制水状态</text>
			</view>
		</view>
	</view>
</template>

<script setup>
// 可以根据需要添加数据和方法
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: $bg-color;
	padding: 30rpx 24rpx;
}

.section-title {
	color: #fff;
	font-size: 29rpx;
	margin-bottom: 38rpx;
}

.data-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16rpx;
	margin-bottom: 40rpx;

	.data-card {
		border-radius: 18rpx;
		background: linear-gradient(180deg, #324A70FF 0%, #324A7033 100%);
		text-align: center;
		height: 181rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.value {
			color: #fff;
			font-size: 43rpx;
			margin-bottom: 12rpx;
			display: block;
		}

		.label {
			color: #A5BFE8;
			font-size: 21rpx;
		}
	}
}

.status-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;

	.status-card {
		border-radius: 18rpx;
		background: linear-gradient(180deg, #324A70FF 0%, #324A7033 100%);
		text-align: center;
		height: 181rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.status-value {
			color: #fff;
			font-size: 43rpx;
			margin-bottom: 12rpx;
			display: block;
		}

		.status-label {
			color: #A5BFE8;
			font-size: 21rpx;
		}
	}
}
</style>
