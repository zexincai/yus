<template>
  <view class="reset-container">
    <!-- Device Info Card -->
    <view class="device-card">
      <view class="device-info">
        <text class="label">SN:</text>
        <text class="sn">4533095668934</text>
        <view class="signal-icon">
          <text class="iconfont">&#xe8c4;</text>
        </view>
      </view>
      <view class="imei-info">
        <text class="imei-label">IMEI:</text>
        <text class="imei-value">34555667944903456</text>
      </view>
      <view class="date-info">
        <text class="date-label">到期日期:</text>
        <text class="date-value">2025-06-30</text>
      </view>
    </view>

    <!-- Filter List Card -->
    <view class="filter-card">
      <view class="filter-header">
        <text class="filter-title">可更换滤芯：</text>
        <text class="filter-code">滤芯码：C56498</text>
      </view>
      <view class="filter-list">
        <view v-for="(item, idx) in filters" :key="idx" class="filter-item">
          <checkbox
            :checked="item.checked"
            :disabled="item.disabled"
            color="#223A7A"
            @click="toggleCheck(idx)"
          />
          <text class="percent" :class="{ disabled: item.disabled }"
            >{{ item.percent }}%</text
          >
        </view>
      </view>
    </view>

    <!-- Confirm Button -->
    <view class="button-wrapper">
      <button class="confirm-btn" @click="handleConfirm">确认重置滤芯</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const filters = ref([
  { checked: true, percent: 86, disabled: false },
  { checked: true, percent: 73, disabled: false },
  { checked: false, percent: 8, disabled: true },
]);

const handleBack = () => {
  uni.navigateBack();
};

const toggleCheck = (idx) => {
  if (!filters.value[idx].disabled) {
    filters.value[idx].checked = !filters.value[idx].checked;
  }
};

const handleConfirm = () => {
  // TODO: Implement reset logic
  uni.showToast({
    title: "重置成功",
    icon: "success",
  });
};
</script>

<style lang="scss" scoped>
.reset-container {
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

.device-card {
  margin: 30rpx;
  background: #f7f9fb;
  border-radius: 20rpx;
  padding: 30rpx;

  .device-info {
    display: flex;
    align-items: center;
    margin-bottom: 18rpx;

    .label {
      color: #333;
      margin-right: 20rpx;
    }
    .sn {
      color: #223a7a;
      font-weight: bold;
      margin-right: 20rpx;
    }
    .signal-icon {
      color: #00c8b4;
      font-size: 40rpx;
    }
  }
  .imei-info {
    color: #bfc9d6;
    margin-bottom: 10rpx;
    .imei-label {
      margin-right: 10rpx;
    }
    .imei-value {
      color: #bfc9d6;
    }
  }
  .date-info {
    color: #bfc9d6;
    .date-label {
      margin-right: 10rpx;
    }
    .date-value {
      color: #bfc9d6;
    }
  }
}

.filter-card {
  margin: 30rpx;
  background: #f7f9fb;
  border-radius: 20rpx;
  padding: 30rpx;

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18rpx;

    .filter-title {
      color: #223a7a;
      font-size: 28rpx;
    }
    .filter-code {
      color: #333;
      font-size: 28rpx;
    }
  }
  .filter-list {
    .filter-item {
      display: flex;
      align-items: center;
      margin-bottom: 24rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .percent {
        margin-left: 32rpx;
        color: #999;
        font-size: 28rpx;
        &.disabled {
          color: #ccc;
        }
      }
    }
  }
}

.button-wrapper {
  margin: 60rpx 30rpx;
  .confirm-btn {
    background: #d28b0a;
    color: #fff;
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 12rpx;
    font-size: 32rpx;
  }
}
</style>
