<template>
  <view class="record-container">
    <!-- 记录总数 -->
    <view class="record-count"> 续期记录：{{ records.length }} </view>

    <!-- 续期记录列表 -->
    <view v-for="(item, idx) in records" :key="idx" class="record-card">
      <view class="card-header">
        <text class="sn">SN：<text class="sn-blue">{{ item.sn }}</text></text>
        <text class="days">续期{{ item.days }}天</text>
      </view>
      <view class="card-info">
        <view>续约前：{{ item.beforeDate }}</view>
        <view>续后前：{{ item.afterDate }}</view>
        <view>操作人：{{ item.operator }}</view>
        <view>操作时间：{{ item.operateTime }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const records = ref([
  {
    sn: "4533095668934",
    days: 90,
    beforeDate: "2025-03-30",
    afterDate: "2025-06-30",
    operator: "李小梦",
    operateTime: "2025-04-23 16:28",
  },
  {
    sn: "4533095668934",
    days: 60,
    beforeDate: "2025-03-30",
    afterDate: "2025-06-30",
    operator: "李小梦",
    operateTime: "2025-04-23 16:28",
  },
  {
    sn: "4533095668934",
    days: 120,
    beforeDate: "2025-03-30",
    afterDate: "2025-06-30",
    operator: "李小梦",
    operateTime: "2025-04-23 16:28",
  },
]);

const handleBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.record-container {
  min-height: 100vh;
  padding: 24rpx;
  background: $bg-color;
}

.record-count {
  color: #fff;
  font-size: 29rpx;
}

.record-card {
  margin-top: 24rpx;
  padding: 32rpx 28rpx 24rpx 28rpx;
  color: #fff;
  border-radius: 18rpx;
  background: linear-gradient(90deg, #324A70FF 0%, #324A7033 100%);
  box-shadow: 0px 4rpx 7rpx #0000003F;
  font-size: 25rpx;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18rpx;

    .sn {
      margin-bottom: 2rpx;
      color: #1ecfff;
      .sn-blue {
        color: #1ecfff;
      }
    }

    .days {
      font-size: 25rpx;
    }
  }

  .card-info {
    font-size: 25rpx;
    color: #bfc9d6;

    view {
      margin-bottom: 8rpx;
    }
  }
}
</style>
