<template>
  <view class="renewal-container">
    <!-- 设备信息卡片 -->
    <view class="device-card">
      <view class="device-info">
        <text class="label">SN:</text>
        <text class="value">{{ form.sn }}</text>
        <image class="signal-icon" :src="form.rssiUrl" />
      </view>

      <view class="time-info">
        <view class="time-item">
          <text class="label">激活时间:</text>
          <text class="value">{{ form.activeDate }}</text>
        </view>
        <view class="time-item">
          <text class="label">到期日期:</text>
          <text class="value">{{ form.expireDate }}</text>
        </view>
      </view>
    </view>

    <!-- 截止日期选择 -->
    <view class="date-picker">
      <text class="label">截止日期:</text>
      <view class="picker-wrapper">
        <picker mode="date" :value="form.endDate" @change="hanldeDateChange">
          <text class="value">{{ form.endDate }}</text>
          <text class="icon-arrow"></text>
        </picker>
      </view>
    </view>

    <!-- 确认按钮 -->
    <view class="button-wrapper">
      <button class="confirm-btn" @click="handleConfirm">确认续期</button>
    </view>
  </view>
</template>

<script setup>
import { reactive } from "vue";
import { deviceCmdSet } from "@/api/dealer";
import { onLoad } from "@dcloudio/uni-app";

// 表单数据
const form = reactive({
  endDate: "",
  deviceId: "",
  expireDate: "",
  activeDate: "",
  rssiUrl: "",
});

onLoad(async () => {
  const res = await uni.getStorageSync("lastPageData");
  form.deviceId = res.deviceId;
  form.activeDate = res.activeDate;
  form.expireDate = res.expireDate;
  form.endDate = res.expireDate;
  form.rssiUrl = res.rssiUrl;
  form.sn = res.sn;
});
const hanldeDateChange = (e) => {
  form.endDate = e.detail.value;
};
const goToDetail = () => {
  uni.navigateTo({
    url: "/pages/device/renewal/record/index",
  });
};
// 确认续期
const handleConfirm = async () => {
  if (!form.endDate) {
    uni.showToast({
      title: "请选择截止日期",
      icon: "none",
    });
    return;
  }
  // 截止日期不能小于当前日期
  if (new Date(form.endDate).getTime() < new Date().getTime()) {
    uni.showToast({
      title: "截止日期不能小于当前日期",
      icon: "none",
    });
    return;
  }
  const resp = await deviceCmdSet(
    {
      key: "EnableDate",
      value: form.endDate,
      deviceId: form.deviceId,
    },
    { raw: true }
  );
  uni.showToast({
    title: resp.msg,
    icon: "success",
    duration: 1500,
  });
  setTimeout(() => {
    uni.navigateBack();
  }, 1500);
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
  background: #f4f6f9ff;
  position: relative;

  .device-info {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;

    .label {
      color: #333;
      font-size: 25rpx;
      color: rgba(19, 51, 124, 1);
      margin-right: 10rpx;
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
        width: 120rpx;
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
  background: #f4f6f9ff;

  .label {
    color: #13337cff;
    margin-right: 20rpx;
    font-size: 25rpx;
  }

  .picker-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .value {
      color: #152136ff;
      font-size: 25rpx;
      margin-right: 10rpx;
    }

    .icon-arrow {
      // 向下的三角形
      margin-left: 20rpx;
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      border-top: 12rpx solid #cccccc;
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
