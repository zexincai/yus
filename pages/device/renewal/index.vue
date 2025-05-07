<template>
  <view class="renewal-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back" @click="handleBack">
        <text class="iconfont icon-back">&#xe8ef;</text>
      </view>
      <text class="title">续期</text>
    </view>

    <!-- 设备信息卡片 -->
    <view class="device-card">
      <view class="device-info">
        <text class="label">SN:</text>
        <text class="value">453309566893</text>
        <view class="signal-icon">
          <text class="iconfont">&#xe8c4;</text>
        </view>
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
  uni.showDatePicker({
    mode: "date",
    value: form.endDate,
    success: (res) => {
      form.endDate = res.value;
    },
  });
};

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
  background-color: #1c2431;
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

.device-card {
  margin: 30rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;

  .device-info {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;

    .label {
      color: #333;
      margin-right: 20rpx;
    }

    .value {
      flex: 1;
      color: #333;
      font-weight: bold;
    }

    .signal-icon {
      color: #00c8b4;
      font-size: 40rpx;
    }
  }

  .time-info {
    .time-item {
      display: flex;
      margin-bottom: 20rpx;

      .label {
        color: #666;
        width: 160rpx;
      }

      .value {
        color: #333;
      }
    }
  }
}

.date-picker {
  margin: 30rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  display: flex;
  align-items: center;

  .label {
    color: #333;
    margin-right: 20rpx;
  }

  .picker-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .value {
      color: #333;
    }

    .icon-arrow {
      color: #999;
      font-size: 32rpx;
    }
  }
}

.button-wrapper {
  margin: 60rpx 30rpx;

  .confirm-btn {
    background: #f39b11;
    color: #fff;
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 12rpx;
  }
}
</style>
