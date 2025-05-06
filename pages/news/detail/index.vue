<template>
	<view class="container">
		<!-- 新闻标题 -->
		<view class="news-header">
			<text class="news-title">国补福利催动净水器更新换代hots，普通人选哪一款净水器好？</text>
			<view class="news-info">
				<view class="source-info">
					<text>来源：</text>
					<text class="source">中关村在线</text>
				</view>
				<view class="time-views">
					<text class="time">2025-05-24 13:46</text>
					<view class="view-count">
						<image src="/static/images/view.png" mode="aspectFit" class="view-icon" />
						<text>4220</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 新闻内容 -->
		<view class="news-content">
			<text
				class="paragraph">2024年下半年，家电行业乘着"国补"的东风，实现逆势增长。2025年，家电"国补"继续高歌猛进，据新闻报道，首批用于消费品以旧换新的中央财政资金已预下达810亿元，相较于2024年，今年延续实施的国补政策进一步加码扩容，家电品类扩至12类，新增微波炉、净水器、洗碗机、电饭煲，且2024年已享受过某类家电产品以旧换新补贴的消费者，2025年购买同类产品时可继续享受补贴。</text>

			<image src="/static/images/news/detail1.jpg" mode="widthFix" class="content-image" />

			<text
				class="paragraph">作为新普国民标配电器的净水器，在"国补"真金白银政策利好催动下，不仅迎来市场销量增长，还同步带动了产品更新换代。因此对于普通消费者来说，当下购买净水器是不仅迎来市场销量增长，还同步带动了产品更新换代。因此对于普通消费者来说，不仅迎来市场销量增长，还同步带动了产品更新换代。</text>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 页面加载时可以从路由参数获取新闻ID
onMounted(() => {
	const eventChannel = getOpenerEventChannel()
	// TODO: 根据ID获取新闻详情数据
})
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #1c2431;
	padding: 30rpx;
}

.news-header {
	margin-bottom: 40rpx;

	.news-title {
		color: #fff;
		font-size: 36rpx;
		font-weight: bold;
		line-height: 1.4;
		margin-bottom: 30rpx;
	}

	.news-info {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.source-info {
			display: flex;
			align-items: center;

			text {
				color: #999;
				font-size: 24rpx;

				&.source {
					color: #4A9FEE;
				}
			}
		}

		.time-views {
			display: flex;
			align-items: center;

			.time {
				color: #999;
				font-size: 24rpx;
				margin-right: 20rpx;
			}

			.view-count {
				display: flex;
				align-items: center;

				.view-icon {
					width: 32rpx;
					height: 32rpx;
					margin-right: 8rpx;
				}

				text {
					color: #999;
					font-size: 24rpx;
				}
			}
		}
	}
}

.news-content {
	.paragraph {
		color: #fff;
		font-size: 28rpx;
		line-height: 1.6;
		margin-bottom: 30rpx;
		display: block;
	}

	.content-image {
		width: 100%;
		margin: 30rpx 0;
		border-radius: 12rpx;
	}
}
</style>
