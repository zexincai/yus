<template>
	<view class="container">
		<!-- 轮播图 -->
		<swiper class="banner" circular autoplay interval="3000" duration="500" :indicator-dots="true"
			indicator-active-color="#D68F01">
			<swiper-item v-for="(item, index) in bannerImages" :key="index">
				<image :src="item" mode="aspectFill" class="banner-image" />
			</swiper-item>
		</swiper>
		
		<!-- 项目标题 -->
		<view class="project-title">
			<text>广州白云国际机场公共净水项目</text>
			<text class="date">2025-05-24 13:46</text>
			<view class="view-count">
				<image src="/static/images/view.png" mode="aspectFit" class="view-icon" />
				<text>4220</text>
			</view>
		</view>
		
		<!-- 项目内容 -->
		<view class="project-content">
			<view class="section">
				<text class="section-title">用户需求：</text>
				<text class="section-text">广州白云国际机场对公共区域饮水机的水质安全和量值要求很高的要求。若是发生饮水安全问题，或是机器供水量不足，需要频繁维护维修等问题导致旅客等待时间过长，均可能影响机场的运营和形象。</text>
			</view>
			
			<view class="section">
				<text class="section-title">解决方案：</text>
				<text class="section-text">为了给旅客提供更好的服务，决定在机场内区域安装各个方面都表现优秀的商用直饮水机。水质安全方面，商用净水机拥有"专利长渗透滤芯"及其他先进技术，水质满足GB19298-2014《食品安全国家标准包装饮用水》的要求，能够为旅客提供安全、健康的饮用水。</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

// 轮播图数据
const bannerImages = ref([
	'/static/images/case/detail/banner1.jpg',
	'/static/images/case/detail/banner2.jpg',
	'/static/images/case/detail/banner3.jpg',
	'/static/images/case/detail/banner4.jpg',
	'/static/images/case/detail/banner5.jpg'
])
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #1c2431;
}

.banner {
	width: 100%;
	height: 500rpx;
	
	.banner-image {
		width: 100%;
		height: 100%;
	}
}

.project-title {
	padding: 30rpx;
	position: relative;
	
	text {
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
		display: block;
	}
	
	.date {
		font-size: 24rpx;
		color: #999;
		font-weight: normal;
		margin-top: 20rpx;
	}
	
	.view-count {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		display: flex;
		align-items: center;
		
		.view-icon {
			width: 32rpx;
			height: 32rpx;
			margin-right: 10rpx;
		}
		
		text {
			font-size: 24rpx;
			color: #999;
			font-weight: normal;
		}
	}
}

.project-content {
	padding: 30rpx;
	
	.section {
		margin-bottom: 40rpx;
		
		.section-title {
			color: #D68F01;
			font-size: 28rpx;
			margin-bottom: 20rpx;
			display: block;
		}
		
		.section-text {
			color: #fff;
			font-size: 28rpx;
			line-height: 1.6;
		}
	}
}
</style>