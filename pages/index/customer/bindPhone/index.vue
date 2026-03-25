<template>
  <view class="customer-edit-container">
    <!-- 信息卡片 -->
    <view class="info-card">
      <view class="info-row">
        <text class="label">手机号码：</text>
        <input
          maxlength="11"
          class="input"
          type="number"
          v-model="detail.phone"
          placeholder="请输入"
          placeholder-class="placeholder"
        />
      </view>
    </view>

    <!-- 保存按钮 -->
    <button class="save-btn" @click="handleSave">保存</button>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { getCustomerInfo, resetPhone } from "@/api/dealer";
import { onLoad } from "@dcloudio/uni-app";

const detail = ref({ phone: "" });
const getCustomerInfoDetail = async (phone) => {
  // 从路由里获取 phone
  try {
    const res = await getCustomerInfo({
      phone,
    });
    detail.value = res;
  } catch (error) {
    console.error("获取详情失败", error);
  }
};

onLoad(({ phone }) => {
  uni.setStorageSync("navBindPhoneFlag", true);
});

const handleSave = async () => {
  if (!detail.value.phone || detail.value.phone.length !== 11) {
    return uni.showToast({
      title: "请输入正确的手机号码",
      icon: "none",
    });
  }
  await resetPhone({
    phone: detail.value.phone,
  });
  const userInfo = uni.getStorageSync("userInfo");
  userInfo.phone = detail.value.phone;
  uni.setStorageSync("userInfo", userInfo);
  uni.navigateTo({
    url: "/pages/index/scan/result/index?from=success",
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
  margin-top: 82rpx;
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
