<template>
  <view class="page">
    <view class="scan-area">
      <view class="phone-mock">
        <uni-icons type="scan" size="80" color="#1a9de4" />
      </view>
      <text class="scan-title">扫码测试设备</text>
      <text class="scan-desc">请扫描饮水器上的SN码进行设备测试</text>
    </view>

    <!-- 扫码后显示设备信息卡片 -->
    <view v-if="deviceInfo" class="device-card">
      <view class="card-header">
        <uni-icons type="info" size="20" color="#1a9de4" />
        <text class="card-model">{{ deviceInfo.modelName || "未知型号" }}</text>
      </view>
      <view class="card-row">
        <text class="card-label">SN：</text>
        <text class="card-value">{{ deviceInfo.mes }}</text>
      </view>
      <view class="card-row">
        <text class="card-label">IMEI：</text>
        <text class="card-value">{{ deviceInfo.imei || "—" }}</text>
        <image
          class="signal-icon"
          v-if="deviceInfo.online"
          src="/static/images/signal-full.png"
          mode="widthFix"
        />
        <image
          class="signal-icon"
          v-else
          src="/static/images/signal-none.png"
          mode="widthFix"
        />
      </view>
    </view>

    <!-- 扫码前：单个扫码按钮 -->
    <button v-if="!deviceInfo" class="action-btn" @tap="doScan">
      <uni-icons type="scan" size="22" color="#fff" />
      扫码
    </button>

    <!-- 扫码后：重新扫码 + 开始测试 -->
    <view v-else class="btn-group">
      <button class="btn-outline" @tap="doScan">重新扫码</button>
      <button class="btn-primary" @tap="goTest">开始测试</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { scanMachineMes } from "@/api/api.js";

const deviceInfo = ref(null);

async function doScan() {
  // uni.scanCode({
  //   onlyFromCamera: true,
  //   async success(res) {
  const res = {
    result: "00184467",
  };
  try {
    const data = await scanMachineMes({ mes: res.result });
    deviceInfo.value = data;
  } catch (e) {}
  //   },
  //   fail() {
  //     uni.showToast({ title: "扫码取消", icon: "none" });
  //   },
  // });
}

function goTest() {
  const d = deviceInfo.value;
  if (!d) return;
  const modelName = encodeURIComponent(d.modelName || "");
  const mes = encodeURIComponent(d.mes || "");
  const imei = encodeURIComponent(d.imei || "");
  uni.navigateTo({
    url: `/pages/test/result?deviceId=${d.id}&modelName=${modelName}&mes=${mes}&imei=${imei}`,
  });
}
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #dff1fb;
  padding: 24rpx 0 60rpx;

  .scan-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100rpx;
    padding: 40rpx 0 20rpx;

    .phone-mock {
      width: 360rpx;
      height: 360rpx;
      border-radius: 40rpx;
      background: rgba(26, 157, 228, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32rpx;
    }

    .scan-title {
      font-size: 34rpx;
      font-weight: 700;
      color: #222;
      margin-bottom: 12rpx;
    }

    .scan-desc {
      font-size: 26rpx;
      color: #062a4c;
    }
  }

  .device-card {
    margin: 32rpx 32rpx 0;
    background: #fff;
    border-radius: 16rpx;
    padding: 28rpx 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);

    .card-header {
      display: flex;
      align-items: center;
      gap: 12rpx;
      margin-bottom: 20rpx;

      .card-model {
        font-size: 32rpx;
        font-weight: 700;
        color: #222;
      }
    }

    .card-row {
      display: flex;
      align-items: center;
      padding: 12rpx 0;

      .card-label {
        font-size: 28rpx;
        color: #888;
        width: 110rpx;
      }

      .card-value {
        flex: 1;
        font-size: 28rpx;
        color: #444;
      }
    }
  }

  .action-btn {
    margin: 80rpx auto 30rpx;
    background: #1a9de4;
    color: #fff;
    border-radius: 60rpx;
    font-size: 32rpx;
    height: 90rpx;
    width: 280rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    border: none;
    box-shadow: 0 4rpx 16rpx rgba(26, 157, 228, 0.35);
  }

  .btn-group {
    display: flex;
    justify-content: center;
    gap: 24rpx;
    margin: 40rpx 32rpx 0;

    .btn-outline {
      flex: 1;
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
      border-radius: 60rpx;
      font-size: 30rpx;
      color: #1a9de4;
      background: #fff;
      border: 2rpx solid #1a9de4;
    }

    .btn-primary {
      flex: 1;
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
      border-radius: 60rpx;
      font-size: 30rpx;
      color: #fff;
      background: #1a9de4;
      border: none;
      box-shadow: 0 4rpx 16rpx rgba(26, 157, 228, 0.35);
    }
  }
  .signal-icon {
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
