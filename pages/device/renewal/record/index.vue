<template>
  <view class="record-container">
    <!-- 记录总数 -->
    <view class="record-count"> 续期记录：{{ records.length }} </view>

    <!-- 续期记录列表 -->
    <template v-if="records.length">
      <view v-for="(item, idx) in records" :key="idx" class="record-card">
        <view class="card-header">
          <text class="sn"
            >SN：<text class="sn-blue">{{ item.sn }}</text></text
          >
          <text class="days">续期{{ item.day }}天</text>
        </view>
        <view class="card-info">
          <view>续约前：{{ item.after }}</view>
          <view>续后前：{{ item.before }}</view>
          <view>操作人：{{ item.creator }}</view>
          <view>操作时间：{{ item.createTime }}</view>
        </view>
      </view>
    </template>
    <view v-else class="empty">
      <image
        src="/static/images/empty.png"
        mode="aspectFit"
        class="empty-img"
      />
      <view class="empty-text"> 暂无数据 </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { expireRenewalRecord } from "@/api/dealer";
import { onLoad, onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app";
const page = ref(1);
const deviceId = ref("");
const records = ref([]);

onLoad(({ id }) => {
  deviceId.value = id;
  getList();
});

// 滚动到底部
onReachBottom(() => {
  getList();
});
// 下拉刷新
onPullDownRefresh(async () => {
  page.value = 1;
  await getList();
  uni.stopPullDownRefresh();
});

const getList = async () => {
  // 分页
  const res = await expireRenewalRecord({
    page: page.value,
    pageSize: 10,
    deviceId: deviceId.value,
  });
  records.value = page.value === 1 ? res : [...records.value, ...res];
  if (res.length) {
    page.value++;
  }
};
</script>

<style lang="scss" scoped>
.record-container {
  // min-height: 100vh;
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
  background: linear-gradient(90deg, #324a70ff 0%, #324a7033 100%);
  box-shadow: 0px 4rpx 7rpx #0000003f;
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
