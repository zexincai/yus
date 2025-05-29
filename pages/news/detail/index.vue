<template>
  <view class="container">
    <!-- 新闻标题 -->
    <view class="news-header">
      <text class="news-title">{{ detail.title }}</text>
      <view class="news-info">
        <view class="source-info">
          <text>来源：</text>
          <text class="source">{{ detail.source }}</text>
        </view>
        <view class="time-views">
          <text class="time">{{ detail.createTime }}</text>
          <view class="view-count">
            <image
              src="/static/images/eye-open.png"
              mode="aspectFit"
              class="view-icon"
            />
            <text>{{ detail.visitNum }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 新闻内容 -->
    <view class="news-content">
      <rich-text :nodes="detail.content"></rich-text>
      <!-- <text class="paragraph"
        >2024年下半年，家电行业乘着"国补"的东风，实现逆势增长。2025年，家电"国补"继续高歌猛进，据新闻报道，首批用于消费品以旧换新的中央财政资金已预下达810亿元，相较于2024年，今年延续实施的国补政策进一步加码扩容，家电品类扩至12类，新增微波炉、净水器、洗碗机、电饭煲，且2024年已享受过某类家电产品以旧换新补贴的消费者，2025年购买同类产品时可继续享受补贴。</text
      >

      <image
        src="/static/images/news2.png"
        mode="widthFix"
        class="content-image"
      />

      <text class="paragraph"
        >作为新普国民标配电器的净水器，在"国补"真金白银政策利好催动下，不仅迎来市场销量增长，还同步带动了产品更新换代。因此对于普通消费者来说，当下购买净水器是不仅迎来市场销量增长，还同步带动了产品更新换代。因此对于普通消费者来说，不仅迎来市场销量增长，还同步带动了产品更新换代。</text
      > -->
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { getNewsDetail } from "@/api/dealer";
import { onLoad } from "@dcloudio/uni-app";
const detail = ref({});
onLoad(({ id }) => {
  getDetail(id);
});
const getDetail = async (id) => {
  detail.value = await getNewsDetail({ id });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #fff;
  padding: 30rpx;
  color: #333333;
}

.news-header {
  margin-bottom: 40rpx;

  .news-title {
    color: #333333ff;
    font-size: 38rpx;
    line-height: 65rpx;
    margin-bottom: 30rpx;
  }

  .news-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;
    .source-info {
      display: flex;
      align-items: center;

      text {
        font-size: 24rpx;

        &.source {
        }
      }
    }

    .time-views {
      display: flex;
      align-items: center;

      .time {
        color: #a6a6a6;
        font-size: 25rpx;
        margin-right: 24rpx;
      }

      .view-count {
        display: flex;
        align-items: center;

        .view-icon {
          width: 36rpx;
          height: 36rpx;
          margin-right: 8rpx;
        }

        text {
          color: #a6a6a6;
          font-size: 25rpx;
        }
      }
    }
  }
}

.news-content {
  .paragraph {
    font-size: 28rpx;
    line-height: 32rpx;
    color: #444444;
    margin-bottom: 30rpx;
    display: block;
  }

  .content-image {
    width: 100%;
    margin: 20rpx 0;
  }
}
</style>
