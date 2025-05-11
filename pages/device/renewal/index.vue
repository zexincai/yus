<template>
  <view class="renewal-container">
    <!-- 设备信息卡片 -->
    <view @click="goToDetail" class="device-card">
      <view class="device-info">
        <text class="label">SN:</text>
        <text class="value">453309566893</text>
        <image class="signal-icon" src="/static/images/signal-full.png" />
      </view>

      <view class="time-info">
        <view class="time-item">
          <text class="label">激活时间:</text>
          <text class="value">2025-03-30 12:30</text>
        </view>
        <view class="time-item">
          <text class="label">到期日期:</text>
          <text class="value">2025-06-30</text>
        </view>
      </view>
    </view>

    <!-- 截止日期选择 -->
    <view class="date-picker">
      <text class="label">截止日期:</text>
      <view class="picker-wrapper" @click="showDatePicker">
        <text class="value">{{ form.endDate }}</text>
        <text class="iconfont icon-arrow">&#xe65c;</text>
      </view>
    </view>

    <!-- 确认按钮 -->
    <view class="button-wrapper">
      <button class="confirm-btn" @click="handleConfirm">确认续期</button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

// 表单数据
const form = reactive({
  endDate: "2025-06-30",
});

// 返回上一页
const handleBack = () => {
  uni.navigateBack();
};

// 显示日期选择器
const showDatePicker = () => {
  // uni.showDatePicker({
  //   mode: "date",
  //   value: form.endDate,
  //   success: (res) => {
  //     form.endDate = res.value;
  //   },
  // });
};
const goToDetail = () => {
  uni.navigateTo({
    url: "/pages/device/renewal/record/index",
  });
}
// 确认续期
const handleConfirm = () => {
  // TODO: 实现续期逻辑
  uni.showToast({
    title: "续期成功",
    icon: "success",
  });
};
</script>

<style lang="scss" scoped>
.renewal-container {
  min-height: 100vh;
  background-color: $bg-color;
  padding: 30rpx;
}


.device-card {
  padding: 30rpx 30rpx;
  height: 196rpx;
  border-radius: 18rpx;
  background: #F4F6F9FF;
  position: relative;

  .device-info {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;

    .label {
      color: #333;
      font-size: 25rpx;
      color: rgba(19, 51, 124, 1);
      margin-right: 20rpx;
    }

    .value {
      font-size: 25rpx;
      color: rgba(19, 51, 124, 1);
      font-weight: bold;
    }

    .signal-icon {
      position: absolute;
      right: 30rpx;
      top: 30rpx;
      width: 36rpx;
      height: 36rpx;
    }
  }

  .time-info {
    .time-item {
      display: flex;
      margin-bottom: 10rpx;
      font-size: 22rpx;

      .label {
        color: #999999;
        width: 160rpx;
      }

      .value {
        color: #999999;
      }
    }
  }
}

.date-picker {
  margin-top: 25rpx;
  border-radius: 20rpx;
  padding: 30rpx;
  display: flex;
  align-items: center;
  height: 80rpx;
  border-radius: 18rpx;
  background: #F4F6F9FF;

  .label {
    color: #13337CFF;
    margin-right: 20rpx;
    font-size: 25rpx;
  }

  .picker-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .value {
      color: #152136FF;
      font-size: 25rpx;
    }

    .icon-arrow {
      // 向下的三角形
      margin-left: 10rpx;
      width: 0;
      height: 0;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      border-top: 12rpx solid #CCCCCC;
      margin-left: 4rpx;
      display: inline-block;
      vertical-align: middle;
    }
  }
}

.button-wrapper {

  .confirm-btn {
    color: #fff;
    height: 90rpx;
    margin-top: 161rpx;
    line-height: 90rpx;
    border-radius: 12rpx;
    border-radius: 18rpx;
    background: $active-color;
    font-size: 29rpx;
  }
}
</style>
