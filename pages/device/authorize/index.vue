<template>
  <view class="authorize-container">
    <!-- 设备信息卡片 -->
    <view class="device-card">
      <image
        class="device-img"
        :src="deviceData.productUrl"
        mode="aspectFit"
      ></image>
      <view class="device-info">
        <view class="sn-row">
          <text class="sn-label">SN：</text>
          <text class="sn-value blue">{{ deviceData.mes }}</text>
        </view>
        <view class="model-row">
          <text class="model-label">型号：</text>
          <text class="model-value gray">{{ deviceData.modelName }} </text>
        </view>
        <view class="imei-row">
          <text class="imei-label">IMEI：</text>
          <text class="imei-value gray">{{ deviceData.imei }}</text>
        </view>
      </view>
      <image
        v-if="deviceData.rssiUrl"
        class="signal-icon"
        :src="deviceData.rssiUrl"
      />
    </view>
    <view class="info-tip" v-if="deviceData.online == 0">
      <view>设备离线</view>
      <view> 请检查设备的联网情况</view>
      <view @click="onRefresh" class="refresh-btn"> 刷新网络 </view>
    </view>

    <!-- 授权表单 -->
    <template v-else>
      <view class="form-card">
        <view class="form-item">
          <text class="label">手机号码：</text>
          <input
            maxlength="11"
            class="input"
            type="text"
            v-model="form.customerPhone"
            placeholder="请输入"
            placeholder-class="placeholder"
          />
        </view>
        <view class="form-item">
          <text class="label">客户姓名：</text>
          <input
            class="input"
            type="text"
            v-model="form.name"
            placeholder="请输入"
            placeholder-class="placeholder"
          />
        </view>
        <view class="form-item">
          <text class="label">客户备注：</text>
          <input
            class="input"
            type="text"
            v-model="form.customerRemark"
            placeholder="请输入"
            placeholder-class="placeholder"
          />
        </view>
        <view @click="cityVisible = true" class="form-item">
          <text class="label">所在地区：</text>
          <text
            :style="!form.area ? 'color:rgb(191 191 191)' : ''"
            class="value"
            >{{ form.area || "请选择" }}</text
          >
        </view>
        <view class="form-item">
          <text class="label">详细地址：</text>
          <input
            class="input"
            type="text"
            v-model="form.address"
            placeholder="请输入"
            placeholder-class="placeholder"
          />
        </view>
        <view class="form-item">
          <text class="label">安装位置：</text>
          <input
            class="input"
            type="text"
            v-model="form.location"
            placeholder="请输入"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="form-card">
        <view class="form-item sale-mode">
          <text class="label">销售模式：</text>
          <view style="display: flex">
            <label @click="form.saleMode = '租赁'" class="radio-label">
              <text :class="{ active: form.saleMode === '租赁' }"></text>
              租赁
            </label>
            <label @click="form.saleMode = '买断'" class="radio-label">
              <text :class="{ active: form.saleMode === '买断' }"></text>
              买断
            </label>
          </view>
        </view>
      </view>
      <view v-if="form.saleMode == '租赁'" class="form-card">
        <picker
          mode="date"
          :value="date"
          :start="startDate"
          @change="hanldeDateChange"
        >
          <view class="form-item date-picker-row">
            <text class="label">到期日期：</text>
            <view class="date-picker">
              <text v-if="form.expireDate" class="value">{{
                form.expireDate
              }}</text>
              <text v-else style="font-size: 25rpx" class="value">请选择</text>
              <text class="icon-arrow"></text>
            </view>
          </view>
        </picker>
      </view>
      <!-- 滤芯更换周期 -->
      <view class="section-title">滤芯更换周期：</view>
      <view class="filter-cycle-card">
        <view
          class="filter-row"
          v-for="(cycle, idx) in filterCycles"
          :key="idx"
        >
          <text class="filter-label">{{ cycle.name }}</text>
          <input
            :disabled="deviceData.enabledEditChip == 0"
            class="filter-input"
            type="number"
            v-model="cycle.periodValue"
            :placeholder="deviceData.enabledEditChip == 0 ? '' : '请输入'"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <!-- 确认按钮 -->
      <view class="confirm-btn" @click="handleConfirm">确认授权</view>
    </template>
    <CityPicker
      :column="3"
      :default-value="defaultValue"
      :mask-close-able="true"
      @confirm="onCityConfirm"
      @cancel="onCityCancel"
      :visible="cityVisible"
    />
  </view>
</template>

<script setup>
import CityPicker from "@/components/cityPicker/index.vue";
import DateUtil from "@/utils/date.js";
import { ref, reactive, watch } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import {
  activeCmd,
  activeCmdResult,
  activeDevice,
  loadDeviceBaseInfo,
  searchCustomerByPhone,
} from "@/api/dealer";
const defaultValue = ref("");
const cityVisible = ref(false);
let interval = null;
const form = reactive({
  name: "",
  customerRemark: "",
  saleMode: "租赁",
  expireDate: "",
  area: "",
  address: "",
  location: "",
  customerPhone: "",
});
// const startDate = new Date();
// 今天格式化为 yyyy-MM-dd
const startDate = DateUtil.format(new Date(), "yyyy-MM-dd");

const deviceData = ref({});
const filterCycles = ref([
  // { name: "精密PP棉", value: '' },
  // { name: "活性炭", value: '' },
  // { name: "RO反渗透膜", value: '' },
]);
onLoad(() => {
  // 从缓存中获取设备信息
  const deviceInfo = uni.getStorageSync("deviceInfo");
  if (deviceInfo) {
    deviceData.value = deviceInfo;
    filterCycles.value = deviceInfo.chipList.map((v, i) => ({
      name: v.name,
      periodValue: v.periodValue,
      index: v.index,
      key: v.key,
    }));
  }
});

watch(
  () => form.customerPhone,
  (newValue, oldValue) => {
    if (newValue.length == 11) {
      searchCustomerByPhone(
        { phone: form.customerPhone },
        { noTip: true }
      ).then((res) => {
        form.name = res.name;
      });
    }
  }
);

const hanldeDateChange = (e) => {
  form.expireDate = e.detail.value;
};
const onCityConfirm = (e) => {
  form.area = `${e.provinceName},${e.cityName},${e.areaName}`;
  cityVisible.value = false;
};
const onCityCancel = () => {
  cityVisible.value = false;
};
const handleConfirm = () => {
  if (!form.customerPhone) {
    uni.showToast({
      title: "请输入手机号码",
      icon: "none",
    });
    return;
  }
  if (!form.name) {
    uni.showToast({
      title: "请输入客户姓名",
      icon: "none",
    });
    return;
  }
  if (!form.area) {
    uni.showToast({
      title: "请选择所在地区",
      icon: "none",
    });
    return;
  }
  if (!form.address) {
    uni.showToast({
      title: "请输入详细地址",
      icon: "none",
    });
    return;
  }
  if (!form.location) {
    uni.showToast({
      title: "请输入安装位置",
      icon: "none",
    });
  }
  if (!form.expireDate && form.saleMode == "租赁") {
    uni.showToast({
      title: "请选择到期日期",
      icon: "none",
    });
    return;
  }
  // if (filterCycles.value.some((v) => !v.periodValue)) {
  //   uni.showToast({
  //     title: "请输入滤芯更换周期",
  //     icon: "none",
  //   });
  //   return;
  // }
  const params = {
    deviceId: deviceData.value.deviceId,
    buyout: form.saleMode === "租赁" ? 1 : 0,
    expireDate: form.expireDate,
    chipLifeJson: JSON.stringify(filterCycles.value),
  };
  activeCmd(params)
    .then((res) => {
      console.log(res);
      // 在十秒内每隔两秒调用activeCmdResult函数，如果成功几句调用activeDevice函数，超过十秒则提示失败
      let count = 0;
      if (interval) clearInterval(interval);
      const func = () => {
        uni.showLoading({});
        activeCmdResult(params, { noTip: true, loading: false })
          .then((res) => {
            uni.hideLoading();
            clearInterval(interval);
            activeDevice({
              deviceId: deviceData.value.deviceId,
              ...params,
              ...form,
            }).then((res) => {
              handleNavToPage("success", "");
            });
          })
          .catch((err) => {
            if (count > 3) {
              uni.hideLoading();
              handleNavToPage("fail", "授权失败");
            }
          })
          .finally(() => {
            count++;
          });
      };

      func();
      interval = setInterval(() => {
        if (count < 5) {
          func();
        } else {
          clearInterval(interval);
        }
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
    });
};
const handleNavToPage = (type, msg) => {
  uni.navigateTo({
    url: `/pages/index/scan/result/index?from=${type}&msg=${msg}`,
  });
};
const onRefresh = () => {
  loadDeviceBaseInfo({ mes: deviceData.value.mes }).then((res) => {
    deviceData.value = res;
  });
};
</script>

<style lang="scss" scoped>
.authorize-container {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: 60rpx;
}

.device-card {
  margin: 20rpx 30rpx 0 30rpx;
  background: $bg-color-light;
  border-radius: 20rpx;
  padding: 40rpx 30rpx 30rpx;
  display: flex;
  align-items: center;
  position: relative;

  .device-img {
    width: 106rpx;
    height: 106rpx;
    margin-right: 30rpx;
  }

  .device-info {
    flex: 1;

    .sn-row,
    .model-row,
    .imei-row {
      display: flex;
      align-items: center;
      margin-bottom: 10rpx;

      .sn-label {
        color: $nav-bg;
        font-size: 25rpx;
      }

      .model-label,
      .imei-label {
        color: $text-secondary;
        font-size: 22rpx;
      }

      .sn-value {
        color: $nav-bg;
        font-size: 25rpx;
      }

      .model-value,
      .imei-value {
        color: $text-secondary;
        font-size: 22rpx;
      }

      .blue {
        color: $nav-bg;
      }

      .gray {
        color: $text-secondary;
      }
    }
  }

  .signal-icon {
    width: 36rpx;
    height: 36rpx;
    position: absolute;
    right: 30rpx;
    top: 30rpx;
  }
}

.form-card {
  margin: 30rpx;
  background: $bg-color-light;
  border-radius: 18rpx;
  // padding: 0 0 10rpx 0;

  .form-item {
    background-color: $bg-color-light;
    border-radius: 0;
    display: flex;
    align-items: center;
    margin: 0 30rpx;
    padding: 0;
    height: 87rpx;
    border-bottom: 1rpx solid $border-color-light; // approx

    &:last-child {
      border-bottom: none;
    }

    .label {
      color: $nav-bg;
      font-size: 25rpx;
      width: 180rpx;
      flex-shrink: 0;
    }

    .value {
      color: $text-primary;
      font-size: 25rpx;
      flex: 1;
      text-align: right;
    }

    .input {
      flex: 1;
      font-size: 25rpx;
      color: $text-primary;
      padding: 0;
      text-align: right;
      background: transparent;
      border: none;
      outline: none;
    }

    &.sale-mode {
      justify-content: space-between;

      .radio-label {
        margin-left: 60rpx;
        // margin-right: 10rpx;
        font-size: 25rpx;
        color: $text-white;
        display: flex;
        align-items: center;

        text {
          border-radius: 50%;
          margin-right: 10rpx;
          display: inline-block;
          width: 29rpx;
          height: 29rpx;
          box-sizing: border-box;
          background: $bg-color-white;
          border: 4rpx solid $text-light-blue;
        }

        .active {
          border: 10rpx solid $accent-color;
        }
      }
    }

    &.date-picker-row {
      .date-picker {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .value {
          color: $text-primary;
          font-size: 28rpx;
        }

        .icon-arrow {
          // 向下的三角形
          margin-left: 10rpx;
          width: 0;
          height: 0;
          border-left: 10rpx solid transparent;
          border-right: 10rpx solid transparent;
          border-top: 12rpx solid $border-color-light;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
}

.section-title {
  color: $text-white;
  font-size: 28rpx;
  margin: 30rpx 30rpx 10rpx 30rpx;
}

.filter-cycle-card {
  margin: 0 30rpx;
  background: $bg-color-light;
  border-radius: 20rpx;
  padding: 10rpx 0;

  .filter-row {
    display: flex;
    align-items: center;
    margin: 0 30rpx;
    height: 87rpx;
    border-bottom: 1rpx solid $border-color-light; // approx

    &:last-child {
      border-bottom: none;
    }

    .filter-label {
      color: $nav-bg-alt;
      font-size: 25rpx;
      width: 280rpx;
      flex-shrink: 0;
    }

    .filter-input {
      flex: 1;
      font-size: 25rpx;
      color: $text-primary;
      text-align: right;
      background: transparent;
      border: none;
      outline: none;
    }
  }
}

.confirm-btn {
  margin: 60rpx 30rpx;
  background: $active-color;
  color: $text-white;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 18rpx;
  text-align: center;
  font-size: 25rpx;
}

.placeholder {
  color: $border-color-light;
}

.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-back:before {
  content: "\e8ef";
}

.icon-arrow:before {
  // content: "\e65c";
}

.info-tip {
  margin-top: 90rpx;
  font-size: 28rpx;
  text-align: center;
  color: $link-color;
}

.refresh-btn {
  margin: 67rpx auto 0;
  width: 181rpx;
  color: $text-white;
  font-size: 22rpx;
  height: 72.46rpx;
  border-radius: 90rpx;
  line-height: 72rpx;
  text-align: center;
  background: $nav-bg;
}
</style>
