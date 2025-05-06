<template>
	<view class="container">
		<!-- 轮播图 -->
		<swiper class="banner" circular autoplay interval="3000" duration="500" :indicator-dots="true"
			indicator-active-color="#D68F01">
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<image :src="item.image" mode="aspectFill" class="banner-image" />
			</swiper-item>
		</swiper>

		<!-- 分类标签 -->
		<view class="category-tabs">
			<view v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: currentTab === index }"
				@click="handleTabClick(index)">
				{{ tab.name }}
			</view>
		</view>

		<!-- 案例列表 -->
		<view class="case-list">
			<view v-for="(item, index) in caseList" :key="index" class="case-item" @click="handleCaseClick(item)">
				<image :src="item.image" mode="aspectFill" class="case-image" />
				<text class="case-title">{{ item.title }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 轮播图数据
const bannerList = reactive([
	{
		image: '/static/images/case/banner1.jpg'
	},
	{
		image: '/static/images/case/banner2.jpg'
	},
	{
		image: '/static/images/case/banner3.jpg'
	}
])

// 分类标签
const tabs = reactive([
	{ name: '公共净水' },
	{ name: '校园净水' },
	{ name: '企业净水' },
	{ name: '家庭净水' }
])

const currentTab = ref(0)

// 案例列表数据
const caseList = reactive([
	{
		image: '/static/images/case/case1.jpg',
		title: '广州市图书馆净水项目'
	},
	{
		image: '/static/images/case/case2.jpg',
		title: '深圳市民公园饮水机'
	},
	{
		image: '/static/images/case/case3.jpg',
		title: '社区自动售水机项目'
	},
	{
		image: '/static/images/case/case4.jpg',
		title: '公益直饮水站'
	}
])

// 处理标签点击
const handleTabClick = (index) => {
	currentTab.value = index
	// TODO: 根据分类加载对应的案例列表
}

// 处理案例点击
const handleCaseClick = (item) => {
	uni.navigateTo({
		url: `/pages/case/detail/index?id=${item.id}`
	})
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #1c2431;
	padding-bottom: 30rpx;
}

.banner {
	width: 100%;
	height: 400rpx;

	.banner-image {
		width: 100%;
		height: 100%;
	}
}

.category-tabs {
	display: flex;
	justify-content: space-around;
	padding: 30rpx 20rpx;
	background: #2D3C58;
	margin-bottom: 20rpx;

	.tab-item {
		color: #fff;
		font-size: 28rpx;
		position: relative;
		padding-bottom: 10rpx;

		&.active {
			color: #D68F01;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 40rpx;
				height: 4rpx;
				background: #D68F01;
				border-radius: 2rpx;
			}
		}
	}
}

.case-list {
	padding: 0 20rpx;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;

	.case-item {
		background: #2D3C58;
		border-radius: 12rpx;
		overflow: hidden;

		.case-image {
			width: 100%;
			height: 300rpx;
		}

		.case-title {
			display: block;
			color: #fff;
			font-size: 28rpx;
			padding: 20rpx;
			text-align: center;
		}
	}
}
</style>
