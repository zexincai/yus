<template>
  <view class="page">
    <view class="section-label">指定机型</view>
    <view class="model-row" @tap="toFindModel">
      <text class="model-key">型号</text>
      <view class="model-right">
        <text class="model-val" :class="{ placeholder: !selectedModel }">
          {{ selectedModel ? selectedModel.modelName : '未选择' }}
        </text>
        <uni-icons type="right" size="18" color="#888" />
      </view>
    </view>

    <view class="scan-area">
      <view class="phone-mock">
        <uni-icons type="scan" size="80" color="#1a9de4" />
      </view>
      <text class="scan-title">扫码绑定设备</text>
      <text class="scan-desc">请扫描饮水器上的SN码进行设备绑定</text>
    </view>

    <view v-if="snCode" class="device-card">
      <text class="card-title">设备信息</text>
      <view class="card-row">
        <text class="card-label">SN：</text>
        <text class="card-value">{{ snCode }}</text>
        <view class="delete-btn" @tap="clearScan">
          <uni-icons type="trash" size="20" color="#fff" />
        </view>
      </view>
      <view class="card-row">
        <text class="card-label">IMEI：</text>
        <text class="card-value" :class="{ placeholder: !imeiCode }">
          {{ imeiCode || '请扫描识别设备IMEI' }}
        </text>
      </view>
    </view>

    <button class="action-btn" @tap="doScan">
      <uni-icons type="scan" size="22" color="#fff" />
      {{ snCode ? '继续扫码' : '扫码' }}
    </button>

    <text class="history-link" @tap="toHistory">绑定记录</text>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { scanMachineMes, bindMachineImei, loadMachineTypes } from '@/api/api.js'

const selectedModel = ref(null)

async function loadDefaultModel() {
  try {
    const res = await loadMachineTypes({ name: '' })
    const first = res?.rows?.[0]
    if (first) selectedModel.value = first
  } catch (e) {}
}

onMounted(loadDefaultModel)
const snCode = ref('')
const imeiCode = ref('')

function toFindModel() {
  uni.navigateTo({ url: '/pages/findModel/index' })
}

function onModelSelected(item) {
  selectedModel.value = item
}

defineExpose({ onModelSelected })

function toHistory() {
  uni.navigateTo({ url: '/pages/bindHistory/index' })
}

function clearScan() {
  snCode.value = ''
  imeiCode.value = ''
}

async function doBind() {
  if (!selectedModel.value || !snCode.value || !imeiCode.value) {
    uni.showToast({ title: '信息不完整', icon: 'none' })
    return
  }
  try {
    await bindMachineImei({
      machineId: selectedModel.value.id,
      mes: snCode.value,
      imei: imeiCode.value
    })
    uni.showToast({ title: '绑定成功', icon: 'success' })
    clearScan()
  } catch (e) {}
}

async function doScan() {
  if (!selectedModel.value) {
    uni.showToast({ title: '请先��择机型', icon: 'none' })
    return
  }

  uni.scanCode({
    onlyFromCamera: true,
    async success(res) {
      const code = res.result
      if (!snCode.value) {
        // 第1次扫码 → SN，响应可能已包含IMEI
        try {
          const data = await scanMachineMes({ mes: code })
          snCode.value = data.mes || code
          imeiCode.value = data.imei || ''
          // 如果第1次扫码响应已包含IMEI，直接绑定
          if (data.imei) {
            await doBind()
          }
        } catch (e) {}
      } else {
        // 第2次扫码 → IMEI
        imeiCode.value = code
        await doBind()
      }
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
  padding: 24rpx 0 60rpx;

  .section-label {
    padding: 0 40rpx 16rpx;
    font-size: 26rpx;
    color: #888;
  }

  .model-row {
    margin: 0 32rpx 32rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 28rpx 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);

    .model-key {
      font-size: 30rpx;
      width: 120rpx;
      font-weight: 600;
      color: #222;
    }

    .model-right {
      display: flex;
      align-items: center;
      gap: 8rpx;
    }

    .model-val {
      font-size: 28rpx;
      color: #222;

      &.placeholder {
        color: #aaa;
      }
    }
  }

  .scan-area {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin: 24rpx 32rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 28rpx 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);

    .card-title {
      font-size: 28rpx;
      color: #222;
      font-weight: 600;
      display: block;
      margin-bottom: 20rpx;
    }

    .card-row {
      display: flex;
      align-items: center;
      padding: 16rpx 0;
      border-bottom: 1rpx solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .card-label {
        font-size: 28rpx;
        color: #666;
        width: 120rpx;
      }

      .card-value {
        flex: 1;
        font-size: 28rpx;
        color: #222;

        &.placeholder {
          color: #aaa;
        }
      }

      .delete-btn {
        width: 56rpx;
        height: 56rpx;
        border-radius: 50%;
        background: #e53935;
        display: flex;
        align-items: center;
        justify-content: center;
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
    box-shadow: 0 4rpx 16rpx rgba(26,157,228,0.35);
  }

  .history-link {
    display: block;
    text-align: center;
    margin-top: 32rpx;
    font-size: 28rpx;
    color: #1a9de4;
  }
}
</style>
