<template>
  <view class="container">
    <!-- 资讯列表 -->
    <view class="news-list">
      <view
        v-for="(item, index) in newsList"
        :key="index"
        class="news-item"
        @click="handleNewsClick(item)"
      >
        <!-- 时间显示 -->
        <view class="news-date" v-if="shouldShowDate(index)">
          {{ item.date }}
        </view>
        <!-- 新闻卡片 -->
        <view class="news-card big" :class="{ 'big-card': item.type == 'big' }">
          <view class="news-content">
            <text class="news-title">{{ item.title }}</text>
            <view class="news-info">
              <text class="news-source">{{ item.source }}</text>
              <view class="view-count">
                <image
                  src="/static/images/eye-open.png"
                  mode="aspectFit"
                  class="view-icon"
                />
                <text>{{ item.views }}</text>
              </view>
            </view>
          </view>
          <image
            v-if="item.image"
            :src="item.image"
            mode="aspectFill"
            class="news-image"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

// 新闻列表数据
const newsList = reactive([
  {
    date: "2025-05-19 13:28",
    title: "10年净水器选购经验总结：看完谁都坑不了你",
    source: "广州日报",
    views: 2346,
    image: "/static/images/news1.png",
  },
  {
    date: "2025-05-24 13:46",
    title: "国补福利催动净水器更新换代hots，普通人选哪一款净水器好？",
    source: "中关村在线",
    views: 4220,
    image: "/static/images/news2.png",
    type: "big",
  },
  {
    date: "2025-05-28 14:20",
    title: "走出认知误区：看懂这四点，你就该买净水器了",
    source: "消费者日报",
    views: 1283,
    image: "/static/images/news1.png",
  },
]);

// 判断是否显示日期
const shouldShowDate = (index) => {
  if (index === 0) return true;
  const currentDate = newsList[index].date.split(" ")[0];
  const prevDate = newsList[index - 1].date.split(" ")[0];
  return currentDate !== prevDate;
};

// 处理新闻点击
const handleNewsClick = (news) => {
  uni.navigateTo({
    url: `/pages/news/detail/index?id=${news.id}`,
  });
};
</script>

<style lang="scss" scoped>
.container {
  background-color: $bg-color;
  padding: 24rpx;
}

.news-list {
  .news-date {
    color: #C7C7C7FF;
    font-size: 25rpx;
    text-align: center;
    margin: 30rpx 0;
  }

  .news-card {
    border-radius: 18rpx;
    background: linear-gradient(180deg, #324a70ff 0%, #324a7033 100%);
    padding: 22rpx;
    margin-bottom: 32rpx;
    display: flex;
    align-items: center;

    .news-content {
      flex: 1;
      margin-right: 24rpx;

      .news-title {
        color: #fff;
        margin-bottom: 34rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 50rpx;
        display: block;
      }

      .news-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .news-source {
          color: $link-color;
          font-size: 28rpx;
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
            color: #c7c7c7ff;
            font-size: 25rpx;
          }
        }
      }
    }

    .news-image {
      width: 216rpx;
      height: 162rpx;
      border-radius: 8rpx;
    }
  }
  .big-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    padding: 0;
    .news-image {
      width: 100%;
      height: 280rpx;
      border-radius: 0rpx;
      // margin-bottom: 14rpx;
      // 排序优先级
      order: -1;
    }
    .news-content {
      padding: 22rpx;
    }
  }
}
</style>
