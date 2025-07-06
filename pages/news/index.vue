<template>
  <view class="container">
    <!-- 资讯列表 -->
    <view class="news-list">
      <view v-for="(item, index) in newsList" :key="index" class="news-item" @click="handleNewsClick(item)">
        <!-- 时间显示 -->
        <view class="news-date" v-if="shouldShowDate(index)">
          {{ item.createTime }}
        </view>
        <!-- 新闻卡片 -->
        <view class="news-card big" :class="{ 'big-card': item.layout }">
          <view class="news-content">
            <text class="news-title">{{ item.title }}</text>
            <view class="news-info">
              <text class="news-source">{{ item.source }}</text>
              <view class="view-count">
                <image src="/static/images/eye-open.png" mode="aspectFit" class="view-icon" />
                <text>{{ item.visitNum }}</text>
              </view>
            </view>
          </view>
          <image v-if="item.imgUrl" :src="item.imgUrl" mode="aspectFill" class="news-image" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { getNewsList } from "@/api/dealer";
import { onShow, onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app";
const current = ref(1);
const pageSize = 10;
// 新闻列表数据
const newsList = ref([
]);

const getNewsListPage = async () => {
  const data = await getNewsList({
    size: pageSize,
    current: current.value,
  });
  newsList.value = current.value == 1 ? data : newsList.value.concat(data);
  current.value++;
};
// 判断是否显示日期
const shouldShowDate = (index) => {
  if (index === 0) return true;
  const currentDate = (newsList.value[index].createTime || '').split(" ")[0];
  const prevDate = (newsList.value[index - 1].createTime || '').split(" ")[0];
  return currentDate !== prevDate;
};

onShow(async () => {
  current.value = 1;
  getNewsListPage();
});
// 触底加载
onReachBottom(() => {
  getNewsListPage();
});

onPullDownRefresh(async () => {
  current.value = 1;
  await getNewsListPage();
  uni.stopPullDownRefresh();
});
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
    color: #c7c7c7ff;
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
      width: 100%;
      flex: 1;
      margin-right: 24rpx;

      .news-title {
        color: #fff;
        margin-bottom: 84rpx;
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
            line-height: 1;
            color: #c7c7c7ff;
            font-size: 25rpx;
          }
        }
      }
    }

    .news-image {
      width: 218rpx;
      height: 218rpx;
      border-radius: 8rpx;
    }
  }

  .big-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    padding: 0;

    .news-title {
      margin-bottom: 10rpx !important;
    }

    .news-image {
      width: 702rpx;
      height: 351rpx;
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
