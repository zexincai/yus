<template>
  <view class="reset-container">
    <!-- Device Info Card -->
    <view class="device-card">
      <view class="device-info">
        <text class="label">SN:</text>
        <text class="sn">{{ detail.sn }}</text>
        <image class="signal-icon" :src="detail.rssiUrl" />
      </view>
      <view class="imei-info">
        <text class="imei-label">IMEI:</text>
        <text class="imei-value">{{ detail.imei }}</text>
      </view>
      <view class="date-info">
        <text class="date-label">到期日期:</text>
        <text class="date-value">{{ detail.expireDate }}</text>
      </view>
    </view>

    <!-- Filter List Card -->
    <view class="filter-card">
      <view class="filter-header">
        <text class="filter-title">可更换滤芯：</text>
        <text class="filter-code">滤芯码：{{ detail.chipSn }}</text>
      </view>
      <view class="filter-list">
        <view @click="toggleCheck(idx)" v-for="(item, idx) in detail.chips" :key="idx" class="filter-item">
          <image src="/static/images/check.png" class="filter-check-img" v-if="item.checked"></image>
          <view v-else class="filter-checkbox">
          </view>
          <view class="filter-info">
            <text class="filter-name">{{ item.chipName }}</text>
            <view class="progress-bar">
              <view class="progress-inner" :class="{
                'progress-yellow': item.red,
              }" :style="{ width: item.percent + '%' }"></view>
            </view>
          </view>
          <text class="percent" :class="{ disabled: item.disabled }">{{ item.percent }}%</text>
        </view>
      </view>
    </view>
    <view class="button-wrapper">
      <button :class="{ 'disabled': btnDisabled }" class="confirm-btn" @click="handleConfirm">确认重置滤芯</button>
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { resetChipConfig } from "@/api/dealer";

const btnDisabled = ref(true);
const detail = ref({
  deviceId: 5,
  sn: "",
  rssiUrl: "",
  chipSnId: "",
  chipSn: "",
  imei: "",
  buyout: "",
  expireDate: "",
  chips: [{}],
});

onLoad(() => {
  const filterResetData = uni.getStorageSync("filterResetData");
  if (filterResetData) {
    filterResetData.chips = (filterResetData.chips || []).map((v) => ({
      ...v, checked: false,
      red: Number(v.percent) <= 10,
    }))
    detail.value = filterResetData;
  }
});

const toggleCheck = (idx) => {
  const filters = detail.value.chips;
  if (!filters[idx].disabled) {
    filters[idx].checked = !filters[idx].checked;
  }
  detail.value = { ...detail.value, chips: filters };
  isSubmitDisabled()
};
const checkBoxChange = (target) => {
  console.log('checkBoxChange', target.detail.value);
  const checkIds = target.detail.value || []
  if (!checkIds.length) {
    btnDisabled.value = true;
    return;
  }
  // setTimeout(() => {
  let filters = detail.value.chips;
  filters = filters.map((v, i) => {
    console.log('checkBoxChange', v, i, checkIds.includes(String(i)));
    return ({
      ...v,
      checked: checkIds.includes(String(i)),
    })
  })

  detail.value = { ...detail.value, chips: filters };
  isSubmitDisabled()
  // }, 1)
}

const isSubmitDisabled = () => {
  const checkList = detail.value.chips.filter((v) => v.checked);
  if (!checkList.length) {
    btnDisabled.value = true;
    return;
  }
  btnDisabled.value = checkList.some((v) => Number(v.percent) > 10);
}
const handleConfirm = () => {
  let chipIndex = detail.value.chips
    .filter((v) => v.checked)
    .map((item) => item.index);
  if (!chipIndex.length) {
    uni.showToast({
      title: "请选择需要重置的滤芯",
      icon: "none",
    });
    return;
  }
  if (btnDisabled.value) return

  const params = {
    deviceId: detail.value.deviceId,
    chipIndex,
  };
  if (detail.value.chipResetType !== 0) {
    params.chipSnId = detail.value.chipSnId;
  }
  resetChipConfig(params).then((res) => {
    uni.showToast({
      title: "重置成功",
      icon: "success",
    });
    setTimeout(() => {
      uni.navigateBack();
    }, 1000);
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
  background: #f4f6f9ff;
  border-radius: 18rpx;
  padding: 32rpx 30rpx 20rpx;
  position: relative;

  .device-info {
    display: flex;
    align-items: center;
    margin-bottom: 18rpx;
    font-size: 25rpx;

    .label {
      color: #13337c;
      margin-right: 20rpx;
    }

    .sn {
      color: #13337c;
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
  background: #f4f6f9ff;
  font-size: 25rpx;

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18rpx;

    .filter-title {
      color: #13337cff;
    }

    .filter-code {
      color: #152136ff;
    }
  }

  .filter-list {

    // 帮我写一个复选框样式☑️的
    .filter-checkbox {
      width: 38rpx;
      height: 38rpx;
      border-radius: 6rpx;
      border: 1rpx solid #898989;
      margin-right: 2rpx
    }

    .filter-check-img {
      width: 40rpx;
      height: 40rpx;
    }

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
            background: linear-gradient(180deg, #08d521 0%, #057f13 100%);
            border-radius: 90rpx;
          }

          .progress-yellow {
            background: linear-gradient(180deg, #f89090 0%, #da0707 100%);
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

  .disabled {
    background: #ccc;
  }
}
</style>
