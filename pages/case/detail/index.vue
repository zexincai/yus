<template>
  <view class="container">
    <!-- 轮播图 -->
    <swiper class="banner" circular autoplay interval="3000" duration="500" :indicator-dots="true"
      indicator-active-color="#0ECBF7" indicator-color="#fff">
      <swiper-item v-for="(item, index) in detail.slideUrls" :key="index">
        <image :src="item" mode="aspectFill" class="banner-image" />
      </swiper-item>
    </swiper>

    <!-- 项目标题 -->
    <view class="project-title">
      <text>{{ detail.title }}</text>
      <view class="info">
        <text class="date">{{ detail.createTime }}</text>
        <view class="view-count">
          <image src="/static/images/eye-open.png" mode="aspectFit" class="view-icon" />
          <text>{{ detail.visitNum }}</text>
        </view>
      </view>
    </view>

    <!-- 项目内容 -->
    <view class="project-content">
      <rich-text :nodes="detail.content"></rich-text>
      <!-- <view class="section">
        <text class="section-title">用户需求：</text>
        <text class="section-text"
          >广州白云国际机场对公共区域饮水机的水质安全和量值要求很高的要求。若是发生饮水安全问题，或是机器供水量不足，需要频繁维护维修等问题导致旅客等待时间过长，均可能影响机场的运营和形象。</text
        >
      </view>

      <view class="section">
        <text class="section-title">解决方案：</text>
        <text class="section-text"
          >为了给旅客提供更好的服务，决定在机场内区域安装各个方面都表现优秀的商用直饮水机。水质安全方面，商用净水机拥有"专利长渗透滤芯"及其他先进技术，水质满足GB19298-2014《食品安全国家标准包装饮用水》的要求，能够为旅客提供安全、健康的饮用水。</text
        >
      </view> -->
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { getCaseDetail } from "@/api/dealer";
import { onLoad } from "@dcloudio/uni-app";
const detail = ref({});
onLoad(({ id }) => {
  getDetail(id);
});
const getDetail = async (id) => {
  const resp = await getCaseDetail({ id });
  resp.content = (resp.content || '').replace(/<img/g, '<img width="100%" style="max-width:100%;height:auto"');
  detail.value = resp
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #fff;
  padding: 0rpx;
}

.banner {
  width: 100%;
  height: 750rpx;

  .banner-image {
    width: 100%;
    height: 100%;
  }
}

.project-title {
  padding: 30rpx 34rpx;
  position: relative;

  text {
    color: #333333;
    font-size: 40rpx;
    display: block;
  }

  .date {
    font-size: 25rpx;
    color: #a6a6a6;
    font-weight: normal;
  }

  .info {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .view-count {
    display: flex;
    align-items: center;

    .view-icon {
      width: 36rpx;
      height: 36rpx;
      margin-right: 10rpx;
    }

    text {
      font-size: 24rpx;
      color: #a6a6a6;
      font-weight: normal;
    }
  }
}

.project-content {
  padding: 30rpx;

  .section {
    margin-bottom: 40rpx;

    .section-title {
      color: #000000;
      font-size: 26rpx;
      margin-bottom: 20rpx;
      display: block;
    }

    .section-text {
      color: #444444;
      font-size: 26rpx;
      line-height: 60rpx;
    }
  }
}
</style>
