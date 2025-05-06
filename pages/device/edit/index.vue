<template>
	<view class="container">
		<!-- 表单区域 -->
		<view class="form-card">
			<!-- 所在地区 -->
			<view class="form-item">
				<text class="label">所在地区：</text>
				<view class="input-wrapper" @click="handleRegionClick">
					<text :class="['input-text', !formData.region && 'placeholder']">
						{{ formData.region || '请选择' }}
					</text>
					<image src="/static/images/arrow-down.png" mode="aspectFit" class="arrow-icon" />
				</view>
			</view>

			<!-- 详细地址 -->
			<view class="form-item">
				<text class="label">详细地址：</text>
				<input type="text" v-model="formData.address" placeholder="请输入" placeholder-class="placeholder"
					class="input" />
			</view>

			<!-- 安装位置 -->
			<view class="form-item">
				<text class="label">安装位置：</text>
				<input type="text" v-model="formData.location" placeholder="请输入" placeholder-class="placeholder"
					class="input" />
			</view>
		</view>

		<!-- 保存按钮 -->
		<button class="save-btn" @click="handleSave">保存</button>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 表单数据
const formData = reactive({
	region: '广东省广州市天河区',
	address: '中山大道56号骏景创意园合生骏景广场B3和家公寓',
	location: '小芸家'
})

// 处理地区选择
const handleRegionClick = () => {
	uni.showRegionPicker({
		success: (result) => {
			formData.region = result.label.join('')
		}
	})
}

// 处理保存
const handleSave = () => {
	if (!formData.region) {
		uni.showToast({
			title: '请选择所在地区',
			icon: 'none'
		})
		return
	}
	if (!formData.address) {
		uni.showToast({
			title: '请输入详细地址',
			icon: 'none'
		})
		return
	}
	if (!formData.location) {
		uni.showToast({
			title: '请输入安装位置',
			icon: 'none'
		})
		return
	}

	// TODO: 调用保存接口
	uni.showToast({
		title: '保存成功',
		icon: 'success'
	})

	// 返回上一页
	setTimeout(() => {
		uni.navigateBack()
	}, 1500)
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #1c2431;
	padding: 20rpx;
}

.form-card {
	background: #2D3C58;
	border-radius: 12rpx;
	padding: 0 30rpx;

	.form-item {
		padding: 30rpx 0;
		border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);

		&:last-child {
			border-bottom: none;
		}

		.label {
			color: #999;
			font-size: 28rpx;
			margin-bottom: 20rpx;
			display: block;
		}

		.input-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.input-text {
				color: #fff;
				font-size: 28rpx;

				&.placeholder {
					color: #666;
				}
			}

			.arrow-icon {
				width: 32rpx;
				height: 32rpx;
			}
		}

		.input {
			color: #fff;
			font-size: 28rpx;
			width: 100%;

			&.placeholder {
				color: #666;
			}
		}
	}
}

.save-btn {
	position: fixed;
	left: 20rpx;
	right: 20rpx;
	bottom: 40rpx;
	height: 88rpx;
	line-height: 88rpx;
	background: #D68F01;
	color: #fff;
	font-size: 32rpx;
	border-radius: 12rpx;
	text-align: center;
}

.placeholder {
	color: #666;
}
</style>
