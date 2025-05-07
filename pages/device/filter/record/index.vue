<template>
  <view class="filter-record-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back" @click="handleBack">
        <text class="iconfont icon-back">&#xe8ef;</text>
      </view>
      <text class="title">换芯记录</text>
    </view>

    <!-- 记录总数 -->
    <view class="record-count"> 换芯记录：{{ records.length }} </view>

    <!-- 换芯记录列表 -->
    <view v-for="(item, idx) in records" :key="idx" class="record-card">
      <view class="card-header">
        <text class="filter-code"
          >滤芯码：<text class="blue">{{ item.code }}</text></text
        >
        <text class="imei">IMEI: {{ item.imei }}</text>
      </view>
      <view class="card-body">
        <view class="label-orange">更换滤芯：</view>
        <view class="filter-list">
          <view v-for="(f, i) in item.filters" :key="i" class="filter-name">{{
            f
          }}</view>
        </view>
      </view>
      <view class="card-footer">
        <view>操作人：{{ item.operator }}</view>
        <view>操作时间：{{ item.time }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const records = ref([
  {
    code: "C56498",
    imei: "84569833450098",
    filters: ["精密PP棉", "活性炭", "RO反渗透膜"],
    operator: "李小梦",
    time: "2025-04-23 16:28",
  },
  {
    code: "C56498",
    imei: "84569833450098",
    filters: ["精密PP棉", "活性炭", "RO反渗透膜"],
    operator: "李小梦",
    time: "2025-04-23 16:28",
  },
]);

const handleBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.filter-record-container {
  min-height: 100vh;
  background: #1c2431;
  padding-top: var(--status-bar-height);
}

.nav-bar {
  position: relative;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  .back {
    position: absolute;
    left: 30rpx;
    font-size: 40rpx;
  }
  .title {
    font-size: 36rpx;
  }
}

.record-count {
  color: #fff;
  font-size: 30rpx;
  margin: 30rpx 30rpx 20rpx 30rpx;
}

.record-card {
  margin: 0 24rpx 32rpx 24rpx;
  background: linear-gradient(90deg, #232e44 0%, #22304a 100%);
  border-radius: 24rpx;
  padding: 32rpx 28rpx 24rpx 28rpx;
  color: #fff;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12rpx;

    .filter-code {
      font-size: 28rpx;
      .blue {
        color: #1ecfff;
      }
    }
    .imei {
      font-size: 26rpx;
      color: #bfc9d6;
    }
  }

  .card-body {
    display: flex;
    margin-bottom: 12rpx;

    .label-orange {
      color: #f39b11;
      font-size: 26rpx;
      margin-right: 12rpx;
      flex-shrink: 0;
    }
    .filter-list {
      display: flex;
      flex-direction: column;
      .filter-name {
        color: #fff;
        font-size: 26rpx;
        line-height: 36rpx;
      }
    }
  }

  .card-footer {
    font-size: 26rpx;
    color: #bfc9d6;
    view {
      margin-bottom: 4rpx;
    }
  }
}
</style>
