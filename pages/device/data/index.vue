<template>
  <view class="container">
    <view v-if="chipLifes.length" class="section-title"> 滤芯更换周期</view>
    <view class="data-grid">
      <view :key="index" v-for="(item, index) in chipLifes" class="data-card box-shadow">
        <text class="value">{{ item.value }}</text>
        <text class="label">{{ item.title }}</text>
      </view>
    </view>
    <!-- 设备数据 -->
    <view v-if="paramList.length" class="section-title">设备数据</view>
    <view class="data-grid">
      <view v-for="(item, index) in paramList" :key="index" class="data-card box-shadow">
        <text class="value">{{ item.value }}</text>
        <text class="label">{{ item.title }}</text>
      </view>
    </view>

    <!-- 状态数据 -->
    <view v-if="stateList.length" class="section-title">状态数据</view>
    <view class="status-grid">
      <view v-for="(item, index) in stateList" :key="index" class="status-card box-shadow">
        <text class="status-value">{{ item.value }}</text>
        <text class="status-label">{{ item.title }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { deviceDatasV002 } from "@/api/dealer";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
const brandCode = ref("");
// const detail = ref({ chipLifes: [] });
const chipLifes = ref([]);
const paramList = ref([]);
const stateList = ref([]);
onLoad(async ({ id }) => {
  const res = await deviceDatasV002({ deviceId: id });
  chipLifes.value = res.chipLifes;
  paramList.value = res.paramList;
  stateList.value = res.stateList;
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
  color: $text-secondary;
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
    background: $text-white;
    // box-shadow: 0rpx 3.62rpx 7.25rpx  #000000;
    text-align: center;
    height: 181rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .value {
      color: $active-color;
      font-size: 43rpx;
      margin-bottom: 12rpx;
      display: block;
    }

    .label {
      color: $text-secondary;
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
    // background: linear-gradient(180deg, $bg-color-card 0%, $border-color-card 100%);
    background-color: $text-white;
    text-align: center;
    height: 181rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .status-value {
      color: $active-color;
      font-size: 43rpx;
      margin-bottom: 12rpx;
      display: block;
    }

    .status-label {
      color: $text-secondary;
      font-size: 21rpx;
    }
  }
}
</style>
