<template>
  <view class="container">
    <!-- 滤芯更换周期 -->
    <view class="section-title">滤芯更换周期</view>
    <view class="data-grid">
      <view :key="index" v-for="(item, index) in detail.chipLifes" class="data-card">
        <text class="value">{{ item.periodValue }}</text>
        <text class="label">{{ item.name }}（{{ item.periodUnit }}）</text>
      </view>
    </view>

    <!-- 设备数据 -->
    <view class="section-title">设备数据</view>
    <view v-if="brandCode == 'JYROJSJ'" class="data-grid">
      <view class="data-card">
        <text class="value">{{ detail.pt }}</text>
        <text class="label">总制水时间（min）</text>
      </view>
    </view>
    <view v-else class="data-grid">
      <view class="data-card">
        <text class="value">{{ detail.totalPureWater }}</text>
        <text class="label">总制水量（L）</text>
      </view>
      <view class="data-card">
        <text class="value">{{ detail.waterTemperature }}</text>
        <text class="label">开水水温（℃）</text>
      </view>
      <view class="data-card">
        <text class="value">{{ detail.warmTemp }}</text>
        <text class="label">温开水温（℃）</text>
      </view>
    </view>

    <!-- 状态数据 -->
    <view class="section-title">状态数据</view>
    <view v-if="brandCode == 'JYROJSJ'" class="status-grid">
      <view class="status-card">
        <text class="status-value">{{ detail.deviceState || "--" }}</text>
        <text class="status-label">净水机状态</text>
      </view>
    </view>
    <view v-else class="status-grid">
      <view class="status-card">
        <text class="status-value">{{ detail.heatState || "--" }}</text>
        <text class="status-label">加热状态</text>
      </view>
      <view class="status-card">
        <text class="status-value">{{ detail.pureState || "--" }}</text>
        <text class="status-label">进水状态</text>
      </view>
      <view class="status-card">
        <text class="status-value">{{ detail.washingState || "--" }}</text>
        <text class="status-label">冲洗状态</text>
      </view>
      <view class="status-card">
        <text class="status-value">{{ detail.emptyStatus || "--" }}</text>
        <text class="status-label">排空状态</text>
      </view>
      <view class="status-card">
        <text class="status-value">{{ detail.sterilizingStatus || "--" }}</text>
        <text class="status-label">消毒状态</text>
      </view>
      <view class="status-card">
        <text class="status-value">{{ detail.prodWTStatus || "--" }}</text>
        <text class="status-label">制水状态</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { deviceDatas } from "@/api/dealer";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
const brandCode = ref("");
const detail = ref({ chipLifes: [] });
onLoad(async ({ id }) => {
  const res = await deviceDatas({ deviceId: id });
  if (res.brandCode == 'JYROJSJ') {
    brandCode.value = 'JYROJSJ'
    Object.keys(res.jyrojsjvo).forEach((key) => {
      res[key] = res.jyrojsjvo[key]
    })
  }
  detail.value = res;
});
// 可以根据需要添加数据和方法
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: $bg-color;
  padding: 30rpx 24rpx;
}

.section-title {
  color: #fff;
  font-size: 29rpx;
  margin-bottom: 38rpx;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  margin-bottom: 40rpx;

  .data-card {
    border-radius: 18rpx;
    background: linear-gradient(180deg, #324a70ff 0%, #324a7033 100%);
    text-align: center;
    height: 181rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .value {
      color: #fff;
      font-size: 43rpx;
      margin-bottom: 12rpx;
      display: block;
    }

    .label {
      color: #a5bfe8;
      font-size: 21rpx;
    }
  }
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;

  .status-card {
    border-radius: 18rpx;
    background: linear-gradient(180deg, #324a70ff 0%, #324a7033 100%);
    text-align: center;
    height: 181rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .status-value {
      color: #fff;
      font-size: 43rpx;
      margin-bottom: 12rpx;
      display: block;
    }

    .status-label {
      color: #a5bfe8;
      font-size: 21rpx;
    }
  }
}
</style>
