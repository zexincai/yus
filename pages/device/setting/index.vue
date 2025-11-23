<template>
  <view class="container">
    <template v-if="brandCode == 'JYROJSJ'">
      <view class="setting-card">
        <view class="temp-item">
          <text>开关机</text>
          <xSwitch keyName="stopSW" @change="handleSave" v-model="settings.pause" />
        </view>

      </view>
      <view class="setting-card">
        <view class="temp-item" :class="{ 'disabled': !settings.backflow }">
          <text>回流</text>
          <xSwitch :disabled="!settings.backflow" keyName="Backflow" @change="handleSave"
            v-model="settings.backflowOpen" />
        </view>
      </view>
    </template>
    <template v-else>
      <!-- 基础开关设置 -->
      <view v-if="brandCode == 'SWJSJV002'" class="setting-card flex-between">
        <view class="switch-item">
          <text>开关机</text>
          <xSwitch keyName="OpenSW" @change="handleSave" v-model="settings.drain" />
        </view>

        <view class="switch-item">
          <text>锁机</text>
          <xSwitch keyName="LOCK" @change="handleSave" v-model="settings.pause" />
        </view>
      </view>

      <view v-else class="setting-card flex-between">
        <view class="switch-item">
          <text>暂停</text>
          <xSwitch keyName="stopSW" @change="handleSave" v-model="settings.pause" />
        </view>

        <view class="switch-item">
          <text>排空</text>
          <xSwitch keyName="emptySwitch" @change="handleSave" v-model="settings.drain" />
        </view>
      </view>

      <!-- 温度设置 -->
      <view class="setting-card">
        <view class="temp-item">
          <text>开水停止加热温度</text>
          <view class="temp-input">
            <input @blur="openTimer" @focus="clearTimer" type="number" v-model="settings.hotWaterTemp" class="input"
              maxlength="3" />
            <text class="unit">℃</text>
            <button class="save-btn" @click="handleSaveHotTemp">保存</button>
          </view>
        </view>
      </view>

      <view class="setting-card">
        <view class="temp-item">
          <text>温开水停止加热温度</text>
          <view class="temp-input">
            <input @blur="openTimer" @focus="clearTimer" type="number" v-model="settings.warmWaterTemp" class="input"
              maxlength="3" />
            <text class="unit">℃</text>
            <button class="save-btn" @click="handleSaveWarmTemp">保存</button>
          </view>
        </view>
      </view>

      <!-- 定时设置 -->
      <view class="setting-card">
        <view class="timer-item">
          <view class="timer-header">
            <view class="timer-left">
              <text>定时运行</text>
            </view>
            <xSwitch @change="handleSave" keyName="workMode" v-model="settings.timerRun" />
          </view>
          <view class="timer-link" @click="navigateToTimerSetting">
            <image src="/static/images/timer.png" mode="aspectFit" class="timer-icon" />
            <view>
              <text>定时开关设置</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
        </view>
      </view>

      <view class="setting-card">
        <view class="timer-item">
          <view class="timer-header">
            <view class="timer-left">
              <text>{{brandCode !== 'SWJSJV002' ? '定时' : ' '}}消毒</text>
            </view>
            <xSwitch v-if="brandCode !== 'SWJSJV002'" @change="handleSave" keyName="sterilizingSwitch" v-model="settings.timerSterilize" />
          </view>
          <view class="timer-link" @click="navigateToSterilizeSetting">
            <image src="/static/images/sterilize.png" mode="aspectFit" class="timer-icon" />
            <view>
              <text>定时消毒设置</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
        </view>
      </view>

      <view class="setting-card">
        <view class="timer-item">
          <view class="timer-header">
            <view class="timer-left">
              <text>{{brandCode !== 'SWJSJV002' ? '定时' : ' '}}冲洗</text>
            </view>
            <xSwitch v-if="brandCode !== 'SWJSJV002'" @change="handleSave" keyName="washingSwitch" v-model="settings.timerWash" />
          </view>
          <view class="timer-link" @click="navigateToWashSetting">
            <image src="/static/images/wash.png" mode="aspectFit" class="timer-icon" />
            <view>
              <text>定时冲洗设置</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
        </view>
      </view>
    </template>
  </view>
</template>

<script setup>
import xSwitch from "@/components/switch/index.vue";
import { reactive, ref } from "vue";
import { loadSetParams, deviceCmdSet } from "@/api/dealer";
import { onLoad, onShow, onHide, onUnload } from "@dcloudio/uni-app";
let deviceId = "";
const brandCode = ref("");
const loading = ref(false);
// 设置数据
const settings = reactive({
  pause: false,
  backflowOpen: false,
  drain: false,
  hotWaterTemp: 98,
  warmWaterTemp: 65,
  timerRun: true,
  timerSterilize: false,
  timerWash: true,
});
let timer = null;
onLoad(async ({ id }) => {
  deviceId = id;
});
onUnload(() => {
  clearInterval(timer);
});
onShow(async () => {
  getDetail();
  // 隔两秒自动刷新
  timer = setInterval(() => {
    getDetail();
  }, 5000);
});

const clearTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};
const openTimer = () => {
  if (!timer) {
    timer = setInterval(() => {
      getDetail();
    }, 5000);
  }
};
// 清除定时器
onHide(() => {
  clearInterval(timer);
});
const getDetail = async () => {
  try {
    const res = await loadSetParams(
      { deviceId },
      {
        loading: false,
      }
    );
    brandCode.value = res.brandCode;
    settings.deviceId = res.deviceId;

    if (res.brandCode == "JYROJSJ") {
      settings.backflow = res.jyrojsjvo && res.jyrojsjvo.backflow == '1';
      settings.pause = res.stopSW === 1;
      settings.backflowOpen = res.jyrojsjvo && res.jyrojsjvo.backflowOpen == 1;
    } else {
      settings.pause = res.stopSW === 1;
      // settings.backflowOpen = res.backflowOpen == 1;
      settings.deviceId = res.deviceId;
      settings.drain = res.emptySwitch === 1;
      settings.hotWaterTemp = res.targetTemperature;
      settings.warmWaterTemp = res.setWarmTemp;
      settings.timerRun = res.workMode === 1;
      settings.timerSterilize = res.sterilizingSwitch === 1;
      settings.timerWash = res.washingSwitch === 1;
    }
  } catch (error) {
  } finally {
    // loading.value = false;
  }
};

// 保存开水温度
const handleSaveHotTemp = async () => {
  const temp = Number(settings.hotWaterTemp);
  if (temp < 0 || temp > 100) {
    uni.showToast({
      title: "温度范围为0-100℃",
      icon: "none",
    });
    return;
  }
  const resp = await deviceCmdSet(
    {
      key: "targetTemperature",
      value: temp,
      deviceId: settings.deviceId,
    },
    { raw: true }
  );
  uni.showToast({
    title: resp.msg,
    icon: "none",
  });
};

// 保存温开水温度
const handleSaveWarmTemp = async () => {
  const temp = Number(settings.warmWaterTemp);

  if (temp < 25 || temp > 50) {
    uni.showToast({
      title: "温度范围为:25 ~ 50℃",
      icon: "none",
    });
    return;
  }
  const resp = await deviceCmdSet(
    {
      key: "setWarmTemp",
      value: temp,
      deviceId: settings.deviceId,
    },
    { raw: true }
  );
  uni.showToast({
    title: resp.msg,
    icon: "none",
  });
};
const handleSave = async (params) => {
  if (params.key) {
    const resp = await deviceCmdSet(
      {
        key: params.key,
        value: params.value ? 1 : 0,
        deviceId: settings.deviceId,
      },
      { raw: true }
    );
    uni.showToast({
      title: resp.msg,
      icon: "none",
    });
  }
};
// 跳转到定时开关设置
const navigateToTimerSetting = () => {
  uni.navigateTo({
    url: "/pages/device/setting/run/index?id=" + settings.deviceId,
  });
};

// 跳转到定时消毒设置
const navigateToSterilizeSetting = () => {
  uni.navigateTo({
    url: "/pages/device/setting/sterilize/index?id=" + settings.deviceId,
  });
};

// 跳转到定时冲洗设置
const navigateToWashSetting = () => {
  uni.navigateTo({
    url: "/pages/device/setting/wash/index?id=" + settings.deviceId,
  });
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
    height: 144rpx;
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
        width: 90rpx;
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
        font-size: 25rpx;
        margin-right: 52rpx;
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

  .disabled {
    opacity: 0.8;
  }

  .timer-item {
    padding: 0rpx 40rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 18rpx;
    height: 235rpx;
    background: linear-gradient(180deg, #324a70ff 0%, #324a7033 100%);

    .timer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;

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
        margin-left: 10rpx;
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
