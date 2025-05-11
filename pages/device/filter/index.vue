<template>
  <view class="reset-container">
    <!-- Device Info Card -->
    <view class="device-card">
      <view class="device-info">
        <text class="label">SN:</text>
        <text class="sn">4533095668934</text>
        <image class="signal-icon" src="/static/images/signal-full.png" />
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
          <checkbox activeBackgroundColor="#13337CFF" style="transform:scale(0.6)" :checked="item.checked"
            :disabled="item.disabled" color="#fff" @click="toggleCheck(idx)" />
          <view class="filter-info">
            <text class="filter-name">{{ item.name }}</text>
            <view class="progress-bar">
              <view class="progress-inner" :class="{
                'progress-yellow': item.percent < 30,
              }" :style="{ width: item.percent + '%' }"></view>
            </view>
          </view>
          <text class="percent" :class="{ disabled: item.disabled }">{{ item.percent }}%</text>
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
  { checked: true, percent: 86, disabled: false, name: "精密PP棉" },
  { checked: true, percent: 73, disabled: false, name: '活性炭', },
  { checked: false, percent: 8, disabled: true, name: 'RO反渗透膜' },
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
  padding: 24rpx;
  background: $bg-color;
}

.device-card {
  background: #F4F6F9FF;
  border-radius: 18rpx;
  padding: 32rpx 30rpx 20rpx;
  position: relative;

  .device-info {
    display: flex;
    align-items: center;
    margin-bottom: 18rpx;
    font-size: 25rpx;

    .label {
      color: #13337C;
      margin-right: 20rpx;
    }

    .sn {
      color: #13337C;
      font-weight: bold;
      margin-right: 20rpx;
    }

    .signal-icon {
      position: absolute;
      right: 30rpx;
      top: 30rpx;
      width: 36rpx;
      height: 36rpx;
    }
  }

  .imei-info,
  .date-info {
    color: #999999;
    margin-bottom: 12rpx;
    font-size: 22rpx;

    .imei-label {
      margin-right: 10rpx;
    }

    .imei-value {
      color: #999999;
    }
  }

  .date-info {
    .date-label {
      margin-right: 10rpx;
    }

    .date-value {}
  }
}

.filter-card {
  border-radius: 18rpx;
  margin-top: 24rpx;
  padding: 30rpx;
  border-radius: 18rpx;
  background: #F4F6F9FF;
  font-size: 25rpx;

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18rpx;

    .filter-title {
      color: #13337CFF;
    }

    .filter-code {
      color: #152136FF;
    }
  }

  .filter-list {
    .filter-item {
      display: flex;
      align-items: center;
      margin-bottom: 10rpx;

      .filter-info {
        flex: 1;
        margin-left: 12rpx;

        .filter-name {
          color: #808080;
          font-size: 21rpx;
        }

        .progress-bar {
          margin-top: 8rpx;
          height: 18rpx;
          background: #a5abb7;
          border-radius: 90rpx;
          overflow: hidden;

          .progress-inner {
            height: 100%;
            background: linear-gradient(180deg, #96b0e0ff 0%, #13337cff 100%);
            border-radius: 90rpx;
          }

          .progress-yellow {
            background: linear-gradient(180deg, #d68f01ff 0%, #f7e4bcff 100%);
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }

      .percent {
        width: 50rpx;
        text-align: right;
        margin-left: 14rpx;
        color: #999999;
        margin-top: 40rpx;
        font-size: 22rpx;

        // &.disabled {
        //   color: #ccc;
        // }
      }
    }
  }
}

.button-wrapper {
  margin-top: 140rpx;

  .confirm-btn {
    color: #fff;
    line-height: 90rpx;
    height: 90rpx;
    line-height: 90rpx;
    font-size: 29rpx;
    border-radius: 18rpx;
    background: $active-color;
  }
}
</style>
