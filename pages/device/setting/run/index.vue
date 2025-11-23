<template>
  <view class="container">
    <!-- 定时设置 -->
    <template v-if="brandType !== 'SWJSJV002'">
      <view class="setting-card">
        <view class="timer-item">
          <view class="timer-link">
            <text>开机日</text>
            <picker mode="selector" range-key="text" :range="weekList" :value="settings.workBeginDay - 1"
              @change="onWeekChange($event, 'workBeginDay')">
              <view>
                <text>{{ getText(settings.workBeginDay) }}</text>
                <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
              </view>
            </picker>
          </view>
        </view>
      </view>
      <view class="setting-card">
        <view class="timer-item">
          <view class="timer-link">
            <text>停机日</text>

            <picker mode="selector" range-key="text" :range="weekList" :value="settings.workEndDay - 1"
              @change="onWeekChange($event, 'workEndDay')">
              <view>
                <text>{{ getText(settings.workEndDay) }}</text>
                <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
              </view>
            </picker>
          </view>
        </view>
      </view>
      <view class="setting-card">
        <view class="timer-item">
          <view class="timer-header">
            <view class="timer-left">
              <text>定时计划1</text>
            </view>
          </view>
          <view class="timer-link">
            <text>开机</text>
            <view @click="onTimeClick('openTime1')">
              <text>{{ settings.openTime1 }}</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
          <view class="timer-link">
            <text>关机</text>
            <view @click="onTimeClick('closeTime1')">
              <text>{{ settings.closeTime1 }}</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
        </view>
      </view>
      <view class="setting-card">
        <view class="timer-item">
          <view class="timer-header">
            <view class="timer-left">
              <text>定时计划2</text>
            </view>
          </view>
          <view class="timer-link">
            <text>开机</text>

            <view @click="onTimeClick('openTime2')">
              <text>{{ settings.openTime2 }}</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
          <view class="timer-link">
            <text>关机</text>
            <view @click="onTimeClick('closeTime2')">
              <text>{{ settings.closeTime2 }}</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
        </view>
      </view>
      <view class="setting-card">
        <view class="timer-item">
          <view class="timer-header">
            <view class="timer-left">
              <text>定时计划3</text>
            </view>
          </view>
          <view class="timer-link">
            <text>开机</text>

            <view @click="onTimeClick('openTime3')">
              <text>{{ settings.openTime3 }}</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
          <view class="timer-link">
            <text>关机</text>
            <view @click="onTimeClick('closeTime3')">
              <text>{{ settings.closeTime3 }}</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
        </view>
      </view>
    </template>
    <template v-else>
      <view class="weekly-card">
        <view class="weekly-card__header">
          <text class="weekly-card__title">计划1定时开关周期</text>
          <view class="weekly-card__save" @tap="saveWeekPlan">保存</view>
        </view>

        <view class="weekly-card__grid">
          <view class="weekly-card__item" v-for="(w, i) in weekOptions" :key="w.value"
            @tap="toggleWeek(i, 'weekOptions')">
            <image v-if="w.checked" src="/static/images/icon-check.png" class="weekly-card__checkIcon"
              mode="widthFix" />
            <view v-else class="weekly-card__checkbox">
            </view>
            <text class="weekly-card__label">{{ w.label }}</text>
          </view>
        </view>
      </view>
      <view class="setting-card">
        <view class="timer-item">
          <view class="timer-header">
            <view class="timer-left">
              <text>计划1</text>
            </view>
          </view>
          <view class="timer-link">
            <text>开机</text>
            <view @click="onTimeClick('openTime1')">
              <text>{{ settings.openTime1 }}</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
          <view class="timer-link">
            <text>关机</text>
            <view @click="onTimeClick('closeTime1')">
              <text>{{ settings.closeTime1 }}</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
        </view>
      </view>

      <view class="weekly-card">
        <view class="weekly-card__header">
          <text class="weekly-card__title">计划2定时开关周期</text>
          <view class="weekly-card__save" @tap="saveWeekPlan">保存</view>
        </view>

        <view class="weekly-card__grid">
          <view class="weekly-card__item" v-for="(w, i) in weekOptions2" :key="w.value"
            @tap="toggleWeek(i, 'weekOptions2')">
            <image v-if="w.checked" src="/static/images/icon-check.png" class="weekly-card__checkIcon"
              mode="widthFix" />
            <view v-else class="weekly-card__checkbox">
            </view>
            <text class="weekly-card__label">{{ w.label }}</text>
          </view>
        </view>
      </view>
      <view class="setting-card">
        <view class="timer-item">
          <view class="timer-header">
            <view class="timer-left">
              <text>计划2</text>
            </view>
          </view>
          <view class="timer-link">
            <text>开机</text>

            <view @click="onTimeClick('openTime2')">
              <text>{{ settings.openTime2 }}</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
          <view class="timer-link">
            <text>关机</text>
            <view @click="onTimeClick('closeTime2')">
              <text>{{ settings.closeTime2 }}</text>
              <image src="/static/images/arrow-right.png" mode="aspectFit" class="arrow-icon" />
            </view>
          </view>
        </view>
      </view>
    </template>
    <xp-picker ref="picker" mode="hi" :value="timeStr" @confirm="onTimeConfirm">
      <text> </text>
    </xp-picker>
  </view>
</template>

<script setup>
import { reactive, ref } from "vue";
import { loadWorkTime, deviceCmdSet } from "@/api/dealer";
import { onLoad, onShow, onHide, onUnload } from "@dcloudio/uni-app";
import xpPicker from "@/components/xp-picker/xp-picker.vue";
let timeStr = ref("");
let timeKey = "";
let picker = ref(null);
let brandType = ref("");
const weekOptions = reactive([
  {
    label: "星期一",
    value: 1,
    checked: false,
  },
  {
    label: "星期二",
    value: 2,
    checked: false,
  },
  {
    label: "星期三",
    value: 3,
    checked: false,
  },
  {
    label: "星期四",
    value: 4,
    checked: false,
  },
  {
    label: "星期五",
    value: 5,
    checked: false,
  },
  {
    label: "星期六",
    value: 6,
    checked: false,
  },
  {
    label: "星期日",
    value: 7,
    checked: false,
  },
]);
const weekOptions2 = reactive([
  {
    label: "星期一",
    value: 1,
    checked: false,
  },
  {
    label: "星期二",
    value: 2,
    checked: false,
  },
  {
    label: "星期三",
    value: 3,
    checked: false,
  },
  {
    label: "星期四",
    value: 4,
    checked: false,
  },
  {
    label: "星期五",
    value: 5,
    checked: false,
  },
  {
    label: "星期六",
    value: 6,
    checked: false,
  },
  {
    label: "星期日",
    value: 7,
    checked: false,
  },
]);
const weekList = ref([
  {
    text: "周一",
    value: 1,
  },
  {
    text: "周二",
    value: 2,
  },
  {
    text: "周三",
    value: 3,
  },
  {
    text: "周四",
    value: 4,
  },
  {
    text: "周五",
    value: 5,
  },
  {
    text: "周六",
    value: 6,
  },
  {
    text: "周日",
    value: 7,
  },
]);
// 设置数据
const settings = reactive({
  openTime2: "",
  openTime1: "",
  closeTime3: "",
  closeTime2: "",
  closeTime1: "",
  openTime3: "",
  workBeginDay: "",
  workEndDay: "",
});
let deviceId = "";
let timer = null;
onLoad(async ({ id }) => {
  deviceId = id;
});
onShow(() => {
  clearTimer();
  getDetail();
  timer = setInterval(() => {
    getDetail();
  }, 5000);
});
const getDetail = async () => {
  const { timingPlan, brandCode } = await loadWorkTime(
    { deviceId: deviceId },
    { loading: false }
  );
  settings.deviceId = deviceId;
  brandType.value = brandCode;
  if (timingPlan) {
    settings.openTime2 = timingPlan.openTime2;
    settings.openTime1 = timingPlan.openTime1;
    settings.closeTime3 = timingPlan.closeTime3;
    settings.closeTime2 = timingPlan.closeTime2;
    settings.closeTime1 = timingPlan.closeTime1;
    settings.openTime3 = timingPlan.openTime3;
    settings.workBeginDay = timingPlan.workBeginDay;
    settings.workEndDay = timingPlan.workEndDay;
  }
};
const clearTimer = () => {
  if (timer) {
    clearInterval(timer);
  }
};
const openTimer = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    getDetail();
  }, 5000);
};
const onTimeConfirm = (e) => {
  timeStr.value = e;
  onTimeChange({ detail: { value: timeStr.value } }, timeKey);
};
const onTimeClick = (flag) => {
  timeKey = flag;
  timeStr.value = settings[flag];
  setTimeout(() => {
    picker.value.show();
  }, 100);
};

onHide(() => {
  clearInterval(timer);
});
onUnload(() => {
  clearInterval(timer);
});
const getText = (val) => {
  const item = weekList.value.find((item) => item.value == val);
  return item ? item.text : "";
};
const onTimeChange = async (e, key) => {
  settings[key] = e.detail.value;
  let params = {
    key: "SetWorkTime",
    deviceId: settings.deviceId,
    ...settings,
  }
  if (brandType.value === 'SWJSJV002') {
    params = {
      key: "SetWorkTime",
      deviceId: settings.deviceId,
      opentime1: JSON.stringify({
        week: weekOptions.filter(w => w.checked).map(w => w.value).join(','),
        openTime: settings.openTime1,
        closeTime: settings.closeTime1,
      }),
      opentime2: JSON.stringify({
        week: weekOptions2.filter(w => w.checked).map(w => w.value).join(','),
        openTime: settings.openTime2,
        closeTime: settings.closeTime2,
      })
    }
  }
  const resp = await deviceCmdSet(params,
    { raw: true }
  );
  uni.showToast({
    title: resp.msg,
    icon: "none",
  });
};
const onWeekChange = async (e, key) => {
  console.log(e.detail.value, key);
  settings[key] = Number(e.detail.value) + 1;
  const resp = await deviceCmdSet(
    {
      key: "SetWorkTime",
      deviceId: settings.deviceId,
      ...settings,
    },
    { raw: true }
  );
  uni.showToast({
    title: resp.msg,
    icon: "none",
  });
};

const toggleWeek = (index, key) => {
  if (key === 'weekOptions') {
    weekOptions[index].checked = !weekOptions[index].checked;
  } else if (key === 'weekOptions2') {
    weekOptions2[index].checked = !weekOptions2[index].checked;
  }
}
const saveWeekPlan = async () => {
  let params = {
    key: "SetWorkTime",
    deviceId: settings.deviceId,
    opentime1: JSON.stringify({
      week: weekOptions.filter(w => w.checked).map(w => w.value).join(','),
      openTime: settings.openTime1,
      closeTime: settings.closeTime1,
    }),
    opentime2: JSON.stringify({
      week: weekOptions2.filter(w => w.checked).map(w => w.value).join(','),
      openTime: settings.openTime2,
      closeTime: settings.closeTime2,
    })
  }
  const resp = await deviceCmdSet(params,
    { raw: true }
  );
  uni.showToast({
    title: resp.msg,
    icon: "none",
  });
}
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
    border-radius: 18rpx;
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

.weekly-card {
  background: linear-gradient(180deg, #324a70ff 0%, #324a7033 100%);
  border-radius: 18rpx;
  padding: 40rpx 40rpx 10rpx;
  color: #ffffff;
  margin-bottom: 25rpx;
  font-size: 25rpx;
}

.weekly-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30rpx;
}

.weekly-card__title {
  font-size: 25rpx;
  font-weight: 600;
  color: #eaf3ff;
}

.weekly-card__save {
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

.weekly-card__grid {
  display: flex;
  margin-left: -10rpx;
  flex-wrap: wrap;
}

.weekly-card__item {
  width: 25%;
  display: flex;
  padding-left: 10rpx;
  // justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.weekly-card__checkbox {
  width: 25rpx;
  height: 25rpx;
  border-radius: 4rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weekly-card__checkIcon {
  width: 25rpx;
  height: 25rpx;
}

.weekly-card__label {
  margin-left: 24rpx;
  font-size: 26rpx;
  color: #dbe7f3;
}
</style>
