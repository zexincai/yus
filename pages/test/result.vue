<template>
  <view class="page">
    <!-- 设备信息卡 -->
    <view v-if="deviceInfo" class="device-card">
      <view class="card-header">
        <view class="model-info">
          <image
            class="device-icon"
            src="/static/images/param.png"
            mode="aspectFit"
          />
          <text class="model-name">{{ deviceInfo.modelName }}</text>
        </view>
        <view class="card-actions">
          <text class="btn-data" @tap="toData">电控数据</text>
          <text class="btn-retest" @tap="loadResult">重新测试</text>
        </view>
      </view>
      <view class="card-sn">
        <text class="sn-label">SN：</text>
        <text class="sn-val">{{ deviceInfo.mes }}</text>
      </view>
      <view class="card-sn">
        <text class="sn-label">IMEI：</text>
        <text class="sn-val">{{ deviceInfo.imei }}</text>
      </view>
    </view>

    <!-- 测试数据 -->
    <view class="test-section-header">
      <text class="section-title">测试数据</text>
      <text
        class="continue-btn"
        :class="{ disabled: !nextStep }"
        @tap="continueTest"
        >继续测试</text
      >
    </view>

    <scroll-view scroll-y class="test-list">
      <view v-for="row in rows" :key="row.key" class="test-group">
        <view class="group-header">
          <text class="group-label">{{ row.label }}</text>
          <view
            class="pass-badge"
            :class="row.pass ? 'pass' : row.value ? 'fail' : 'pending'"
          >
            <uni-icons
              v-if="row.value"
              :type="row.pass ? 'checkmarkempty' : 'closeempty'"
              size="14"
              :color="row.pass ? '#4caf50' : '#e53935'"
            />
          </view>
        </view>

        <!-- 有子项 -->
        <template v-if="row.childs && row.childs.length">
          <view v-for="child in row.childs" :key="child.key" class="child-row">
            <text class="child-label">{{ child.label }}</text>
            <view class="child-right">
              <text class="child-value" :class="child.pass ? 'pass' : 'fail'">{{
                child.value
              }}</text>
              <uni-icons
                :type="child.pass ? 'checkmarkempty' : 'closeempty'"
                size="16"
                :color="child.pass ? '#4caf50' : '#e53935'"
              />
            </view>
          </view>
        </template>

        <!-- 无子项 -->
        <template v-else>
          <view v-if="row.value" class="child-row">
            <text class="child-label">{{ row.label }}</text>
            <text class="child-value" :class="row.pass ? 'pass' : 'fail'">{{
              row.value
            }}</text>
          </view>
          <view v-else class="child-row pending-row">
            <text class="child-label pending">等待测试...</text>
          </view>
        </template>
      </view>

      <view v-if="rows.length === 0" class="empty">加载测试数据...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { resultTestDevice, startTestDevice } from "@/api/api.js";

const pages = getCurrentPages();
const curPage = pages[pages.length - 1];
const options = curPage.$page?.options || curPage.options || {};

const deviceId = ref(options.deviceId || "");
const deviceInfo = ref(null);
const rows = ref([]);

const stepOrder = ["onlinetest", "activedata", "datavalidate", "datareset"];

const nextStep = computed(() => {
  for (const key of stepOrder) {
    const row = rows.value.find((r) => r.key === key);
    if (row && !row.pass) return key;
  }
  return null;
});

async function loadResult() {
  try {
    const res = await resultTestDevice({ deviceId: deviceId.value });
    deviceInfo.value = res;
    rows.value = res.rows || [];
  } catch (e) {}
}

async function continueTest() {
  if (!nextStep.value) return;
  try {
    await startTestDevice({ step: nextStep.value, deviceId: deviceId.value });
    await loadResult();
  } catch (e) {}
}

function toData() {
  const modelName = encodeURIComponent(deviceInfo.value?.modelName || "");
  const mes = encodeURIComponent(deviceInfo.value?.mes || "");
  const imei = encodeURIComponent(deviceInfo.value?.imei || "");
  uni.navigateTo({
    url: `/pages/data/index?deviceId=${deviceId.value}&modelName=${modelName}&mes=${mes}&imei=${imei}`,
  });
}

onMounted(loadResult);
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #dff1fb;
  padding-top: 24rpx;
  padding-bottom: 20rpx;

  .device-card {
    margin: 0 32rpx 24rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 28rpx 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20rpx;

      .model-info {
        display: flex;
        align-items: center;
        gap: 16rpx;

        .device-icon {
          width: 56rpx;
          height: 56rpx;
        }

        .model-name {
          font-size: 32rpx;
          font-weight: 700;
          color: #222;
        }
      }

      .card-actions {
        display: flex;
        gap: 16rpx;

        .btn-data {
          background: #4caf50;
          color: #fff;
          border-radius: 40rpx;
          padding: 12rpx 24rpx;
          font-size: 26rpx;
          font-weight: 600;
        }

        .btn-retest {
          background: #1a9de4;
          color: #fff;
          border-radius: 40rpx;
          padding: 12rpx 24rpx;
          font-size: 26rpx;
          font-weight: 600;
        }
      }
    }

    .card-sn {
      display: flex;
      padding: 6rpx 0;

      .sn-label {
        font-size: 26rpx;
        color: #888;
        width: 100rpx;
      }

      .sn-val {
        font-size: 26rpx;
        color: #222;
      }
    }
  }

  .test-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40rpx 16rpx;

    .section-title {
      font-size: 30rpx;
      font-weight: 700;
      color: #555;
    }

    .continue-btn {
      font-size: 26rpx;
      color: #1a9de4;
      border: 1rpx solid #1a9de4;
      border-radius: 30rpx;
      padding: 8rpx 24rpx;

      &.disabled {
        color: #bbb;
        border-color: #ddd;
      }
    }
  }

  .test-list {
    // height: calc(100vh - 340rpx);
    padding: 0 32rpx;
    margin-bottom: 20rpx;
    box-sizing: border-box;
  }

  .test-group {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx 28rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    .group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8rpx;

      .group-label {
        font-size: 30rpx;
        font-weight: 700;
        color: #222;
      }

      .pass-badge {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &.pass {
          background: rgba(76, 175, 80, 0.12);
        }

        &.fail {
          background: rgba(229, 57, 53, 0.12);
        }

        &.pending {
          background: #dff1fb;
        }
      }
    }

    .child-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10rpx 0;
      border-top: 1rpx solid #dff1fb;

      .child-label {
        font-size: 26rpx;
        color: #555;
        flex: 1;

        &.pending {
          color: #aaa;
          font-style: italic;
        }
      }

      .child-right {
        display: flex;
        align-items: center;
        gap: 8rpx;
      }

      .child-value {
        font-size: 26rpx;

        &.pass {
          color: #4caf50;
        }

        &.fail {
          color: #e53935;
        }
      }
    }

    .pending-row {
      border-top: 1rpx solid #dff1fb;
    }
  }

  .empty {
    text-align: center;
    padding: 60rpx 0;
    font-size: 28rpx;
    color: #aaa;
  }
}
</style>
