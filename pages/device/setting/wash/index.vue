<template>
  <view class="container">
    <view class="setting-card">
      <view class="temp-item">
        <text>换水时长</text>
        <view class="temp-input">
          <input @blur="openTimer" @focus="clearTimer" type="number" v-model="settings.refreshMinute" class="input"
            maxlength="3" />
          <text class="unit">分钟</text>
          <button class="save-btn" @click="handleSaveTime">保存</button>
        </view>
      </view>
    </view>
    <view class="setting-card">
      <view class="temp-item">
        <text>换水周期</text>
        <view class="temp-input">
          <input type="number" v-model="settings.refreshPeriod" class="input" maxlength="3" />
          <text class="unit">天</text>
          <button class="save-btn" @click="handleSaveTime">保存</button>
        </view>
      </view>
    </view>

    <view class="setting-card">
      <view class="timer-item">
        <view class="timer-link">
          <text>换水时间</text>
          <picker mode="time" :value="settings.refreshTime" @change="onTimeChange($event, 'refreshTime')">
            <view>
              <text>{{ settings.refreshTime }}</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </picker>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, ref } from "vue";
import { loadWorkTime, deviceCmdSet } from "@/api/dealer";
import { onLoad, onShow, onHide, onUnload } from "@dcloudio/uni-app";

// 设置数据
const settings = reactive({
  refreshTime: "",
  refreshPeriod: "",
  deviceId: "",
  key: "SetRefresh",
  refreshMinute: "",
});
let deviceId = "";
let timer = null;
onLoad(async ({ id }) => {
  deviceId = id;
});
onShow(() => {
  getDetail();
  timer = setInterval(() => {
    getDetail();
  }, 5000)
})
onUnload(() => {
  clearInterval(timer)
})
const getDetail = async () => {
  const { refreshPlan } = await loadWorkTime({ deviceId: deviceId }, { loading: false });
  settings.deviceId = deviceId;
  settings.refreshTime = refreshPlan.refreshTime;
  settings.refreshPeriod = refreshPlan.refreshPeriod;
  settings.refreshMinute = refreshPlan.refreshMinute;
}
onHide(() => {
  clearInterval(timer);
})

const onTimeChange = async (e, key) => {
  settings[key] = e.detail.value;
  handleSaveTime();
};
const clearTimer = () => {
  clearInterval(timer);
}
const openTimer = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    getDetail();
  }, 5000)
}
const handleSaveTime = () => {
  setTimeout(async () => {
    const resp = await deviceCmdSet(
      {
        key: "SetRefresh",
        deviceId: settings.deviceId,
        ...settings,
      },
      { raw: true }
    );
    uni.showToast({
      title: resp.msg,
      icon: "none",
    });
  }, 100);
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: $bg-color;
  padding: 20rpx;
}

.setting-card {
  margin-bottom: 25rpx;

  .switch-item {
    width: 344rpx;
    // height: 144rpx;
    border-radius: 18.12px;
    background: linear-gradient(180deg, #324a70ff 0%, #324a7033 100%);
    padding: 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    text {
      color: #fff;
      font-size: 28rpx;
    }

    .custom-switch {
      transform: scale(0.8);
    }
  }

  .temp-item {
    padding: 0rpx 40rpx;
    display: flex;
    align-items: center;
    border-radius: 18rpx;
    height: 145rpx;
    background: linear-gradient(180deg, #324a70 0%, #324a7033 100%);

    text {
      flex: 1;
      color: #fff;
      font-size: 25rpx;
      display: block;
    }

    .temp-input {
      display: flex;
      align-items: center;

      .input {
        width: 100rpx;
        padding: 0 10rpx; // 调整padding以适应输入框的大小和需要的边距
        height: 65rpx;
        border-radius: 9rpx;
        background: #fff;
        box-sizing: border-box;
        font-size: 25rpx;
        text-align: center;
        margin-right: 20rpx;
      }

      .unit {
        color: #fff;
        width: 52rpx;
        font-size: 25rpx;
        margin-right: 32rpx;
      }

      .save-btn {
        height: 65rpx;
        line-height: 80rpx;
        background: #d68f01;
        color: #fff;
        font-size: 25rpx;
        border-radius: 8rpx;
        text-align: center;
        width: 130rpx;
        line-height: 65rpx;
        border-radius: 36rpx;
        background: $active-color;
      }
    }
  }

  .timer-item {
    padding: 30rpx 40rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 18rpx;
    // height: 144rpx;
    background: linear-gradient(180deg, #324a70ff 0%, #324a7033 100%);

    .timer-header {
      margin-top: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 26rpx;

      .timer-left {
        display: flex;
        align-items: center;

        .timer-icon {
          width: 40rpx;
          height: 40rpx;
          margin-right: 20rpx;
        }

        text {
          color: #fff;
          font-size: 25rpx;
        }
      }

      .custom-switch {
        transform: scale(0.8);
      }
    }

    .timer-link {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 0;

      // border-top: 2rpx solid rgba(255, 255, 255, 0.1);
      image {
        width: 72rpx;
        height: 72rpx;
      }

      text {
        color: #fff;
        font-size: 25rpx;
      }

      .arrow-icon {
        margin-left: 20rpx;
        width: 14rpx;
        height: 14rpx;
        border-top: 2rpx solid #fff;
        border-right: 2rpx solid #fff;
        // border-left: 18rpx solid #fff;
        transform: rotate(45deg);
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
