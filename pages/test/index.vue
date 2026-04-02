<template>
  <view class="page">
    <view class="scan-area">
      <view class="phone-mock">
        <uni-icons type="scan" size="80" color="#1a9de4" />
      </view>
      <text class="scan-title">扫码测试设备</text>
      <text class="scan-desc">请扫描饮水器上的SN码进行设备测试</text>
    </view>

    <button class="action-btn" @tap="doScan">
      <uni-icons type="scan" size="22" color="#fff" />
      扫码
    </button>
  </view>
</template>

<script setup>
import { scanMachineMes } from '@/api/api.js'


async function doScan() {
  uni.scanCode({
    onlyFromCamera: true,
    async success(res) {
      try {
        const data = await scanMachineMes({ mes: res.result })
        const modelName = encodeURIComponent(data.modelName || '')
        const mes = encodeURIComponent(data.mes || '')
        const imei = encodeURIComponent(data.imei || '')
        uni.navigateTo({
          url: `/pages/test/result?deviceId=${data.id}&modelName=${modelName}&mes=${mes}&imei=${imei}`
        })
      } catch (e) {}
    },
    fail() {
      uni.showToast({ title: '扫码取消', icon: 'none' })
    }
  })
}
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #DFF1FB;
  padding-top: 24rpx;

  .scan-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80rpx 0 60rpx;

    .phone-mock {
      width: 280rpx;
      height: 360rpx;
      border-radius: 40rpx;
      background: rgba(26, 157, 228, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40rpx;
    }

    .scan-title {
      font-size: 36rpx;
      font-weight: 700;
      color: #222;
      margin-bottom: 16rpx;
    }

    .scan-desc {
      font-size: 28rpx;
      color: #666;
    }
  }

  .action-btn {
    margin: 0 120rpx;
    background: #1a9de4;
    color: #fff;
    border-radius: 60rpx;
    font-size: 32rpx;
    padding: 26rpx 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    border: none;
    box-shadow: 0 4rpx 16rpx rgba(26,157,228,0.35);
  }
}
</style>
