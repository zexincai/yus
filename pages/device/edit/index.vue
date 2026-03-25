<template>
  <view class="customer-edit-container">
    <!-- 信息卡片 -->
    <view class="info-card">
      <view class="info-row">
        <text class="label">所在地区：</text>
        <text @click="visible = true" class="value">{{ province }}{{ city }}{{ zone }}</text>
      </view>
      <view class="info-row">
        <text class="label">详细地址：</text>
        <input class="input" type="text" v-model="detail.address" placeholder="请输入" placeholder-class="placeholder" />
      </view>
      <view class="info-row">
        <text class="label">安装位置：</text>
        <input class="input" type="text" v-model="detail.location" placeholder="请输入" placeholder-class="placeholder" />
      </view>
    </view>
    <CityPicker :column="3" :default-value="defaultValue" :mask-close-able="true" @confirm="confirm" @cancel="cancel"
      :visible="visible" />
    <!-- 保存按钮 -->
    <button class="save-btn" @click="handleSave">保存</button>
  </view>
</template>

<script setup>
import CityPicker from "@/components/cityPicker/index.vue";
import { ref, reactive } from "vue";
import { editLocation } from "@/api/dealer";
import { onLoad } from "@dcloudio/uni-app";

const detail = reactive({
  location: "",
  address: "",
  deviceId: "",
});
const province = ref("");
const city = ref("");
const zone = ref("");
const defaultValue = ref("");
const visible = ref(false);

onLoad(() => {
  const res = uni.getStorageSync("lastPageData");
  detail.deviceId = res.deviceId;
  detail.location = res.location;
  detail.address = res.address;
  const list = res.area.split(" ");
  if (list.length > 0) {
    province.value = list[0];
    city.value = list[1];
    zone.value = list[2];
  }
});
const confirm = (e) => {
  province.value = e.provinceName;
  city.value = e.cityName;
  zone.value = e.areaName;
  visible.value = false;
};
const cancel = () => {
  visible.value = false;
};
const handleSave = async () => {
  await editLocation({
    deviceId: detail.deviceId,
    address: detail.address,
    location: detail.location,
    province: province.value,
    city: city.value,
    zone: zone.value,
  });
  uni.showToast({
    title: "保存成功",
    icon: "success",
  });
};
</script>

<style lang="scss" scoped>
.customer-edit-container {
  min-height: 100vh;
  background: $bg-color;
  padding: 30rpx;
}

.info-card {
  margin-top: 20rpx;
  background: $bg-color-light;
  border-radius: 20rpx;

  .info-row {
    display: flex;
    align-items: center;
    height: 90rpx;
    border-bottom: 1rpx solid $border-color-input;
    margin: 0 30rpx;

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
      text-align: right;
      background: transparent;
      border: none;
      outline: none;
      padding: 0;
    }

    .placeholder {
      color: $border-color-light;
    }
  }
}

.save-btn {
  color: $text-white;
  margin-top: 172rpx;
  height: 90rpx;
  font-size: 29rpx;
  border-radius: 18rpx;
  line-height: 90rpx;
  background: $active-color;
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
</style>
