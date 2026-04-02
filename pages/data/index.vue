<template>
  <view class="page">
    <!-- 设备信息卡 -->
    <view v-if="deviceData" class="device-card">
      <view class="card-model">
        <image class="device-icon" src="/static/images/param.png" mode="aspectFit" />
        <text class="model-name">{{ deviceData.modelName }}</text>
      </view>
      <view class="card-row">
        <text class="row-label">SN：</text>
        <text class="row-val">{{ deviceData.sn }}</text>
      </view>
      <view class="card-row">
        <text class="row-label">IMEI：</text>
        <text class="row-val">{{ deviceData.imei }}</text>
      </view>
    </view>

    <!-- 网络状态 -->
    <view v-if="deviceData" class="network-card">
      <view class="network-left">
        <text class="network-title">网络状态</text>
        <image
          v-if="deviceData.rssiUrl"
          :src="deviceData.rssiUrl"
          class="rssi-icon"
          mode="aspectFit"
        />
        <uni-icons v-else type="wifi" size="20" color="#4caf50" />
      </view>
      <text class="sync-btn" @tap="loadData">同步参数</text>
    </view>

    <!-- 参数设置 -->
    <view v-if="deviceData" class="params-section">
      <text class="params-title">参数设置</text>
      <scroll-view scroll-y class="params-list">
        <view v-for="row in deviceData.rows" :key="row.key" class="param-row">
          <view class="param-info">
            <text class="param-label">{{ row.title }}</text>
            <text class="param-value">{{ row.value }}</text>
          </view>
          <text v-if="row.editable" class="modify-btn" @tap="openEdit(row)">修改</text>
        </view>
      </scroll-view>
    </view>

    <!-- 加载中 -->
    <view v-if="!deviceData" class="loading">加载中...</view>

    <!-- 修改弹窗 -->
    <view v-if="editRow" class="modal-mask" @tap.self="closeEdit">
      <view class="modal">
        <text class="modal-title">修改数据</text>

        <view v-if="editRow.type === 'radio'" class="radio-list">
          <!-- 当前值选项 -->
          <view class="radio-item" @tap="editValue = editRow.value">
            <view class="radio-circle" :class="{ checked: editValue === editRow.value }">
              <uni-icons v-if="editValue === editRow.value" type="checkmarkempty" size="16" color="#fff" />
            </view>
            <text class="radio-label">{{ editRow.value }}</text>
          </view>
          <!-- 其他选项 -->
          <view
            v-for="opt in editRow.options"
            :key="opt.id"
            class="radio-item"
            @tap="editValue = opt.text"
          >
            <view class="radio-circle" :class="{ checked: editValue === opt.text }">
              <uni-icons v-if="editValue === opt.text" type="checkmarkempty" size="16" color="#fff" />
            </view>
            <text class="radio-label">{{ opt.text }}</text>
          </view>
        </view>

        <view v-else class="input-edit">
          <input
            v-model="editValue"
            class="edit-input"
            :placeholder="'请输入' + editRow.title"
            placeholder-style="color:#aaa"
          />
        </view>

        <view class="modal-actions">
          <text class="modal-confirm" @tap="doEdit">确认</text>
          <text class="modal-cancel" @tap="closeEdit">取消</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { deviceData as getDeviceData, cmdPost } from '@/api/api.js'

const pages = getCurrentPages()
const curPage = pages[pages.length - 1]
const options = curPage.$page?.options || curPage.options || {}

const deviceId = ref(options.deviceId || '')
const deviceData = ref(null)
const editRow = ref(null)
const editValue = ref('')

async function loadData() {
  try {
    const res = await getDeviceData({ deviceId: deviceId.value })
    deviceData.value = res
  } catch (e) {}
}

function openEdit(row) {
  editRow.value = row
  editValue.value = String(row.value)
}

function closeEdit() {
  editRow.value = null
  editValue.value = ''
}

async function doEdit() {
  try {
    await cmdPost({
      deviceId: deviceId.value,
      key: editRow.value.key,
      value: editValue.value
    })
    uni.showToast({ title: '指令下发成功', icon: 'none' })
    closeEdit()
    await loadData()
  } catch (e) {}
}


onMounted(loadData)
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #DFF1FB;
  padding-top: 24rpx;

  .device-card {
    margin: 0 32rpx 20rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 28rpx 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);

    .card-model {
      display: flex;
      align-items: center;
      gap: 16rpx;
      margin-bottom: 16rpx;

      .device-icon {
        width: 48rpx;
        height: 48rpx;
      }

      .model-name {
        font-size: 32rpx;
        font-weight: 700;
        color: #222;
      }
    }

    .card-row {
      padding: 8rpx 0;

      .row-label {
        font-size: 26rpx;
        color: #888;
        display: block;
      }

      .row-val {
        font-size: 30rpx;
        color: #1a9de4;
        display: block;
        margin-top: 4rpx;
      }
    }
  }

  .network-card {
    margin: 0 32rpx 20rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);

    .network-left {
      display: flex;
      align-items: center;
      gap: 12rpx;

      .network-title {
        font-size: 30rpx;
        font-weight: 700;
        color: #222;
      }

      .rssi-icon {
        width: 40rpx;
        height: 40rpx;
      }
    }

    .sync-btn {
      background: #1a9de4;
      color: #fff;
      border-radius: 40rpx;
      padding: 12rpx 28rpx;
      font-size: 26rpx;
    }
  }

  .params-section {
    margin: 0 32rpx;

    .params-title {
      font-size: 28rpx;
      color: #888;
      display: block;
      margin-bottom: 16rpx;
    }
  }

  .params-list {
    height: calc(100vh - 580rpx);
    background: #fff;
    border-radius: 16rpx;
    padding: 0 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);

    .param-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24rpx 12rpx;
      border-bottom: 1rpx solid #DFF1FB;

      &:last-child {
        border-bottom: none;
      }

      .param-info {
        display: flex;
        align-items: center;
        flex: 1;
        gap: 12rpx;
        flex-wrap: wrap;

        .param-label {
          font-size: 28rpx;
          color: #333;
        }

        .param-value {
          font-size: 28rpx;
          color: #1a9de4;
        }
      }

      .modify-btn {
        font-size: 26rpx;
        color: #1a9de4;
        border: 1rpx solid #1a9de4;
        border-radius: 30rpx;
        padding: 8rpx 20rpx;
        white-space: nowrap;
        margin-left: 16rpx;
        flex-shrink: 0;
      }
    }
  }

  .loading {
    text-align: center;
    padding: 80rpx 0;
    font-size: 28rpx;
    color: #aaa;
  }

  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .modal {
    background: #fff;
    border-radius: 24rpx;
    padding: 48rpx 40rpx 36rpx;
    width: 560rpx;

    .modal-title {
      font-size: 32rpx;
      font-weight: 700;
      color: #222;
      display: block;
      text-align: center;
      margin-bottom: 40rpx;
    }

    .radio-list {
      display: flex;
      flex-direction: column;
      gap: 24rpx;
      margin-bottom: 40rpx;

      .radio-item {
        display: flex;
        align-items: center;
        gap: 20rpx;

        .radio-circle {
          width: 48rpx;
          height: 48rpx;
          border-radius: 50%;
          border: 2rpx solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;

          &.checked {
            background: #1a9de4;
            border-color: #1a9de4;
          }
        }

        .radio-label {
          font-size: 30rpx;
          color: #222;
        }
      }
    }

    .input-edit {
      margin-bottom: 40rpx;

      .edit-input {
        border: 1rpx solid #ddd;
        border-radius: 12rpx;
        padding: 20rpx 24rpx;
        font-size: 28rpx;
        color: #222;
        width: 100%;
        box-sizing: border-box;
      }
    }

    .modal-actions {
      display: flex;
      gap: 24rpx;

      .modal-confirm {
        flex: 1;
        background: #1a9de4;
        color: #fff;
        border-radius: 12rpx;
        padding: 24rpx 0;
        text-align: center;
        font-size: 30rpx;
        font-weight: 600;
      }

      .modal-cancel {
        flex: 1;
        border: 1rpx solid #1a9de4;
        color: #1a9de4;
        border-radius: 12rpx;
        padding: 24rpx 0;
        text-align: center;
        font-size: 30rpx;
      }
    }
  }
}
</style>
