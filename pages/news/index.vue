<template>
	<view class="container">
		<!-- 资讯列表 -->
		<view class="news-list">
			<view v-for="(item, index) in newsList" :key="index" class="news-item" @click="handleNewsClick(item)">
				<!-- 时间显示 -->
				<view class="news-date" v-if="shouldShowDate(index)">
					{{ item.date }}
				</view>

				<!-- 新闻卡片 -->
				<view class="news-card">
					<view class="news-content">
						<text class="news-title">{{ item.title }}</text>
						<view class="news-info">
							<text class="news-source">{{ item.source }}</text>
							<view class="view-count">
								<image src="/static/images/view.png" mode="aspectFit" class="view-icon" />
								<text>{{ item.views }}</text>
							</view>
						</view>
					</view>
					<image v-if="item.image" :src="item.image" mode="aspectFill" class="news-image" />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 新闻列表数据
const newsList = reactive([
	{
		date: '2025-05-19 13:28',
		title: '10年净水器选购经验总结：看完谁都坑不了你',
		source: '广州日报',
		views: 2346,
		image: '/static/images/news/news1.jpg'
	},
	{
		date: '2025-05-24 13:46',
		title: '国补福利催动净水器更新换代hots，普通人选哪一款净水器好？',
		source: '中关村在线',
		views: 4220,
		image: '/static/images/news/news2.jpg'
	},
	{
		date: '2025-05-28 14:20',
		title: '走出认知误区：看懂这四点，你就该买净水器了',
		source: '消费者日报',
		views: 1283,
		image: '/static/images/news/news3.jpg'
	}
])

// 判断是否显示日期
const shouldShowDate = (index) => {
	if (index === 0) return true
	const currentDate = newsList[index].date.split(' ')[0]
	const prevDate = newsList[index - 1].date.split(' ')[0]
	return currentDate !== prevDate
}

// 处理新闻点击
const handleNewsClick = (news) => {
	uni.navigateTo({
		url: `/pages/news/detail/index?id=${news.id}`
	})
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #1c2431;
	padding: 20rpx;
}

.news-list {
	.news-date {
		color: #fff;
		font-size: 28rpx;
		margin: 30rpx 0;
	}

	.news-card {
		background: #2D3C58;
		border-radius: 12rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;

		.news-content {
			flex: 1;
			margin-right: 20rpx;

			.news-title {
				color: #fff;
				font-size: 32rpx;
				margin-bottom: 20rpx;
				display: block;
				line-height: 1.4;
			}

			.news-info {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.news-source {
					color: #4A9FEE;
					font-size: 24rpx;
				}

				.view-count {
					display: flex;
					align-items: center;

					.view-icon {
						width: 32rpx;
						height: 32rpx;
						margin-right: 10rpx;
					}

					text {
						color: #999;
						font-size: 24rpx;
					}
				}
			}
		}

		.news-image {
			width: 200rpx;
			height: 140rpx;
			border-radius: 8rpx;
		}
	}
}
</style>
