<template>
  <view class="container">
    <!-- 轮播图 -->
    <swiper
      @change="onSwiperChange"
      class="banner"
      circular
      autoplay
      interval="3000"
      duration="500"
    >
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <image :src="item.image" mode="aspectFill" class="banner-image" />
      </swiper-item>
    </swiper>
    <view class="custom-dots">
      <view
        v-for="(item, idx) in bannerList"
        :key="idx"
        :class="['dot', { active: currentBanner === idx }]"
      ></view>
    </view>

    <!-- 分类标签 -->
    <scroll-view scroll-x class="status-tabs" :show-scrollbar="false">
      <view class="category-tabs">
        <view
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-item"
          :class="{ active: currentTab === index }"
          @click="handleTabClick(index)"
        >
          {{ tab.name }}
        </view>
      </view>
    </scroll-view>

    <!-- 案例列表 -->
    <view class="case-list">
      <view
        v-for="(item, index) in caseList"
        :key="index"
        class="case-item"
        @click="handleCaseClick(item)"
      >
        <image :src="item.image" mode="aspectFill" class="case-image" />
        <text class="case-title">{{ item.title }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
const currentBanner = ref(0);
// 轮播图数据
const bannerList = reactive([
  {
    image: "/static/images/case/1.png",
  },
  {
    image: "/static/images/case/1.png",
  },
  {
    image: "/static/images/case/1.png",
  },
]);

// 分类标签
const tabs = reactive([
  { name: "公共净水" },
  { name: "校园净水" },
  { name: "企业净水" },
  { name: "家庭净水" },
]);

const currentTab = ref(0);
const onSwiperChange = (e) => {
  currentBanner.value = e.detail.current;
};
// 案例列表数据
const caseList = reactive([
  {
    image: "/static/images/case/2.png",
    title: "广州市图书馆净水项目",
  },
  {
    image: "/static/images/case/3.png",
    title: "深圳市民公园饮水机",
  },
  {
    image: "/static/images/case/4.png",
    title: "社区自动售水机项目",
  },
  {
    image: "/static/images/case/5.png",
    title: "公益直饮水站",
  },
]);

// 处理标签点击
const handleTabClick = (index) => {
  currentTab.value = index;
  // TODO: 根据分类加载对应的案例列表
};

// 处理案例点击
const handleCaseClick = (item) => {
  uni.navigateTo({
    url: `/pages/case/detail/index?id=${item.id}`,
  });
};
</script>

<style lang="scss" scoped>
.container {
  background-color: $bg-color;
  padding-bottom: 24rpx;
}

.banner {
  width: 100%;
  height: 400rpx;

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
.custom-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30rpx;
  .dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background: #a5bfe8ff;
    margin: 0 8rpx;
    &.active {
      background: #0ecbf7ff;
    }
  }
}
.category-tabs {
  white-space: nowrap;
  margin-top: 8rpx;
  display: flex;
  // justify-content: space-around;
  padding: 30rpx 0rpx;
  margin-bottom: 10rpx;

  .tab-item {
    color: #a5bfe8;
    font-size: 28rpx;
    // padding: 10rpx 30rpx;
    margin-right: 32rpx;
    position: relative;
    padding-bottom: 16rpx;

    &.active {
      color: $active-color;

      &::after {
        content: "";

        position: absolute;
        left: 0;
        bottom: 0rpx;
        width: 100%;
        height: 4rpx;
        background: $active-color;
      }
    }
  }
}

.case-list {
  padding: 0 0rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;

  .case-item {
    border-radius: 18rpx;
    background: linear-gradient(90deg, #324a70ff 0%, #324a7033 100%);
    overflow: hidden;

    .case-image {
      width: 100%;
      height: 250rpx;
    }

    .case-title {
      display: block;
      color: #fff;
      font-size: 28rpx;
      padding: 20rpx;
    }
  }
}
</style>
