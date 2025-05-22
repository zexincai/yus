<template>
  <view class="container">
    <view class="param-card">
      <!-- 功能参数列表 -->
      <view class="param-item" v-for="(item, index) in paramList" :key="index">
        <text class="param-label">{{ item.label }}：</text>
        <view class="param-value">
          <text
            class="value-off"
            :class="{
              'value-on': item.value === '有' || item.value === '显示',
            }"
          >
          </text>
          {{ item.value }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from "vue";
import { deviceParams } from "@/api/dealer";
import { onLoad } from "@dcloudio/uni-app";
// 参数列表数据
const paramList = reactive([
  { label: "自动冲洗功能", value: "", key: "funcWH" },
  { label: "排空功能", value: "", key: "funcEM" },
  { label: "消毒功能", value: "", key: "funcST" },
  { label: "净水量统计功能", value: "", key: "pwenable" },
  { label: "原水TDS显示", value: "", key: "rwtdsshow" },
  { label: "纯水TDS显示", value: "", key: "fwtdsshow" },
  { label: "温开水温度显示", value: "", key: "wtshow" },
  { label: "滤芯寿命显示", value: "", key: "flshow" },
]);

onLoad(async ({ id }) => {
  const res = await deviceParams({ deviceId: id });
  paramList.forEach((item) => {
    if (res[item.key]) {
      item.value = res[item.key];
    }
  });
});
</script>

<style lang="scss" scoped>
.container {
  background-color: $bg-color;
  padding: 40rpx 24rpx;
  height: 100vh;
}

.param-card {
  background: #233657;
  border-radius: 12rpx;
  padding: 0 28rpx;

  .param-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 0;
    border-bottom: 2rpx solid #152136;

    &:last-child {
      border-bottom: none;
    }

    .param-label {
      color: #fff;
      font-size: 25rpx;
    }

    .param-value {
      width: 160rpx;
      display: flex;
      align-items: center;
      color: $link-color;
      padding-right: 30rpx;
      font-size: 25rpx;
      position: relative;
      line-height: 1;
      .value-off {
        display: inline-block;
        width: 30rpx;
        height: 30rpx;
        background: #fff;
        border-radius: 50%;
        margin-right: 20rpx;
      }
      .value-on {
        width: 30rpx;
        height: 30rpx;
        border: 10rpx solid #005cf0;
        box-sizing: border-box;
        border-radius: 50%;
      }
    }
  }
}
</style>
