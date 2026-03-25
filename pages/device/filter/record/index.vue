<template>
  <view class="filter-record-container">
    <!-- 记录总数 -->
    <view class="record-count"> 换芯记录：{{ records.length }} </view>
    <!-- 换芯记录列表 -->
    <view v-for="(item, idx) in records" :key="idx" class="record-card">
      <view class="card-header">
        <text class="filter-code">
          滤芯码：<text class="blue">{{ item.chipSn }}</text>
        </text>
        <text class="imei">SN: {{ item.sn }}</text>
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
        <view>操作人：{{ item.creator }}</view>
        <view>操作时间：{{ item.createTime }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { chipResetRecord } from "@/api/dealer";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";

const records = ref([]);
const current = ref(1);
let deviceId = "";
onLoad(async ({ id }) => {
  deviceId = id;
  getList();
});

// 触底加载
onReachBottom(() => {
  getList();
});
const getList = async () => {
  let list = await chipResetRecord({
    deviceId,
    current: current.value,
    size: 10,
  });
  list = list.map((item) => {
    item.filters = item.name.split("\n");
    return item;
  });
  records.value = current.value == 1 ? list : [...records.value, ...list];
  if (list.length) {
    current.value++;
  }
};
</script>

<style lang="scss" scoped>
.filter-record-container {
  min-height: 100vh;
  background: $bg-color;
  padding: 24rpx;
}

.record-count {
  color: $text-white;
  font-size: 29rpx;
}

.record-card {
  margin-top: 24rpx;
  border-radius: 24rpx;
  padding: 32rpx 28rpx 24rpx 28rpx;
  color: $text-white;
  border-radius: 18rpx;
  background: linear-gradient(90deg, $bg-color-card 0%, $border-color-card 100%);
  box-shadow: 0px 4rpx 7rpx #0000003f;
  font-size: 22rpx;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12rpx;

    .filter-code {
      font-size: 25rpx;
      color: $link-color;
      // 省略号
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 350rpx;

      .blue {
        color: $link-color;
      }
    }

    .imei {
      font-size: 22rpx;
      color: $border-color-light;
    }
  }

  .card-body {
    display: flex;
    padding-top: 22rpx;
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
        color: $text-white;
        font-size: 22rpx;
        line-height: 36rpx;
        text-align: right;
      }
    }
  }

  .card-footer {
    color: $border-color-light;

    view {
      margin-bottom: 14rpx;
    }
  }
}
</style>
