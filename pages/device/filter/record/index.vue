<template>
  <view class="filter-record-container">
    <!-- 记录总数 -->
    <view class="record-count"> 换芯记录：{{ records.length }} </view>

    <!-- 换芯记录列表 -->
    <view v-for="(item, idx) in records" :key="idx" class="record-card">
      <view class="card-header">
        <text class="filter-code">滤芯码：<text class="blue">{{ item.code }}</text></text>
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
  background: $bg-color;
  padding: 24rpx;
}

.record-count {
  color: #fff;
  font-size: 29rpx;
}

.record-card {
  margin-top: 24rpx;
  border-radius: 24rpx;
  padding: 32rpx 28rpx 24rpx 28rpx;
  color: #fff;
  border-radius: 18rpx;
  background: linear-gradient(90deg, #324A70FF 0%, #324A7033 100%);
  box-shadow: 0px 4rpx 7rpx #0000003F;
  font-size: 22rpx;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12rpx;

    .filter-code {
      font-size: 25rpx;
      color: #1ecfff;


      .blue {
        color: #1ecfff;
      }
    }

    .imei {
      font-size: 22rpx;
      color: #C7C7C7FF;
    }
  }

  .card-body {
    display: flex;
    margin-bottom: 12rpx;
    justify-content: space-between;

    .label-orange {
      color: $active-color;
      font-size: 22rpx;
      margin-right: 12rpx;
      flex-shrink: 0;
    }

    .filter-list {
      display: flex;
      flex-direction: column;

      .filter-name {
        margin-bottom: 12rpx;
        color: #fff;
        font-size: 22rpx;
        line-height: 36rpx;
        text-align: right;
      }
    }
  }

  .card-footer {
    color: #C7C7C7FF;

    view {
      margin-bottom: 10rpx;
    }
  }
}
</style>
