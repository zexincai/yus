<template>
  <view class="authorize-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back" @click="handleBack">
        <text class="iconfont icon-back">&#xe8ef;</text>
      </view>
      <text class="title">设备授权</text>
    </view>

    <!-- 设备信息卡片 -->
    <view class="device-card">
      <image
        class="device-img"
        src="/static/images/device-s808.png"
        mode="aspectFit"
      ></image>
      <view class="device-info">
        <view class="sn-row">
          <text class="sn-label">SN：</text>
          <text class="sn-value">4533095668934</text>
        </view>
        <view class="model-row">
          <text class="model-label">型号：</text>
          <text class="model-value">商务饮水机 S808</text>
        </view>
        <view class="imei-row">
          <text class="imei-label">IMEI：</text>
          <text class="imei-value">9845789948778980</text>
        </view>
      </view>
      <view class="signal-icon">
        <text class="iconfont">&#xe8c4;</text>
      </view>
    </view>

    <!-- 授权表单 -->
    <view class="form-card">
      <view class="form-item">
        <text class="label">手机号码：</text>
        <text class="value">17688978904</text>
      </view>
      <view class="form-item">
        <text class="label">客户姓名：</text>
        <text class="value">陈霞</text>
      </view>
      <view class="form-item">
        <text class="label">客户备注：</text>
        <input
          class="input"
          type="text"
          v-model="form.remark"
          placeholder="请输入"
          placeholder-class="placeholder"
        />
      </view>
      <view class="form-item">
        <text class="label">所在地区：</text>
        <text class="value">广东省-佛山市-禅城区</text>
      </view>
      <view class="form-item">
        <text class="label">详细地址：</text>
        <text class="value">海运八路302号富业大厦A305</text>
      </view>
      <view class="form-item">
        <text class="label">安装位置：</text>
        <text class="value">产业展厅</text>
      </view>
      <view class="form-item sale-mode">
        <text class="label">销售模式：</text>
        <label class="radio-label">
          <radio
            value="租赁"
            :checked="form.saleMode === '租赁'"
            color="#D28B0A"
            @click="form.saleMode = '租赁'"
          />租赁
        </label>
        <label class="radio-label">
          <radio
            value="买断"
            :checked="form.saleMode === '买断'"
            color="#D28B0A"
            @click="form.saleMode = '买断'"
          />买断
        </label>
      </view>
      <view class="form-item date-picker-row">
        <text class="label">到期日期：</text>
        <view class="date-picker" @click="showDatePicker">
          <text class="value">{{ form.expireDate }}</text>
          <text class="iconfont icon-arrow">&#xe65c;</text>
        </view>
      </view>
    </view>

    <!-- 滤芯更换周期 -->
    <view class="section-title">滤芯更换周期（天）：</view>
    <view class="filter-cycle-card">
      <view class="filter-row" v-for="(cycle, idx) in filterCycles" :key="idx">
        <text class="filter-label">{{ cycle.name }}：</text>
        <input
          class="filter-input"
          type="number"
          v-model="cycle.value"
          placeholder="请输入"
          placeholder-class="placeholder"
        />
      </view>
    </view>

    <!-- 确认按钮 -->
    <button class="confirm-btn" @click="handleConfirm">确认授权</button>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

const form = reactive({
  remark: "",
  saleMode: "租赁",
  expireDate: "2025-07-30",
});

const filterCycles = ref([
  { name: "精密PP棉", value: 100 },
  { name: "活性炭", value: 150 },
  { name: "RO反渗透膜", value: 80 },
]);

const handleBack = () => {
  uni.navigateBack();
};

const showDatePicker = () => {
  uni.showDatePicker({
    mode: "date",
    value: form.expireDate,
    success: (res) => {
      form.expireDate = res.value;
    },
  });
};

const handleConfirm = () => {
  // TODO: 提交授权信息
  uni.showToast({
    title: "授权成功",
    icon: "success",
  });
};
</script>

<style lang="scss" scoped>
.authorize-container {
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
  margin: 30rpx 30rpx 0 30rpx;
  background: #f7f9fb;
  border-radius: 20rpx;
  padding: 30rpx;
  display: flex;
  align-items: center;
  position: relative;
  .device-img {
    width: 90rpx;
    height: 180rpx;
    margin-right: 24rpx;
  }
  .device-info {
    flex: 1;
    .sn-row,
    .model-row,
    .imei-row {
      display: flex;
      align-items: center;
      margin-bottom: 10rpx;
      .sn-label,
      .model-label,
      .imei-label {
        color: #223a7a;
        font-size: 28rpx;
      }
      .sn-value {
        color: #223a7a;
        font-size: 28rpx;
        font-weight: bold;
      }
      .model-value,
      .imei-value {
        color: #bfc9d6;
        font-size: 26rpx;
      }
    }
  }
  .signal-icon {
    color: #00c8b4;
    font-size: 40rpx;
    position: absolute;
    right: 30rpx;
    top: 30rpx;
  }
}

.form-card {
  margin: 30rpx;
  background: #f7f9fb;
  border-radius: 20rpx;
  padding: 0 0 10rpx 0;
  .form-item {
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    height: 80rpx;
    border-bottom: 1rpx solid #eee;
    &:last-child {
      border-bottom: none;
    }
    .label {
      color: #223a7a;
      font-size: 28rpx;
      width: 180rpx;
      flex-shrink: 0;
    }
    .value {
      color: #333;
      font-size: 28rpx;
      flex: 1;
      text-align: right;
    }
    .input {
      flex: 1;
      font-size: 28rpx;
      color: #333;
      text-align: right;
      background: transparent;
      border: none;
      outline: none;
    }
    &.sale-mode {
      .radio-label {
        margin-right: 40rpx;
        font-size: 28rpx;
        color: #223a7a;
        display: flex;
        align-items: center;
      }
    }
    &.date-picker-row {
      .date-picker {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .value {
          color: #333;
          font-size: 28rpx;
        }
        .icon-arrow {
          font-size: 28rpx;
          color: #c7c7cc;
          margin-left: 10rpx;
        }
      }
    }
  }
}

.section-title {
  color: #fff;
  font-size: 28rpx;
  margin: 30rpx 30rpx 10rpx 30rpx;
}

.filter-cycle-card {
  margin: 0 30rpx;
  background: #f7f9fb;
  border-radius: 20rpx;
  padding: 10rpx 0;
  .filter-row {
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    height: 80rpx;
    border-bottom: 1rpx solid #eee;
    &:last-child {
      border-bottom: none;
    }
    .filter-label {
      color: #223a7a;
      font-size: 28rpx;
      width: 180rpx;
      flex-shrink: 0;
    }
    .filter-input {
      flex: 1;
      font-size: 28rpx;
      color: #333;
      text-align: right;
      background: transparent;
      border: none;
      outline: none;
    }
  }
}

.confirm-btn {
  margin: 60rpx 30rpx;
  background: #d28b0a;
  color: #fff;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 12rpx;
  font-size: 32rpx;
}

.placeholder {
  color: #cccccc;
}

// iconfont样式
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
  content: "\e65c";
}
</style>
