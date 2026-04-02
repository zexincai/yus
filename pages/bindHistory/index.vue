<template>
  <view class="page">
    <view class="search-bar">
      <uni-icons type="search" size="18" color="#999" />
      <input class="search-input" v-model="keyword" placeholder="搜索SN/IMEI/型号/机型ID" placeholder-style="color:#999"
        @confirm="doSearch" />
      <text class="search-btn" @tap="doSearch">搜索</text>
    </view>

    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <view v-for="item in list" :key="item.id" class="list-item">
        <view class="item-row">
          <text class="item-label">型号：</text>
          <text class="item-val">{{ item.modelName }}</text>
        </view>
        <view class="item-row">
          <text class="item-label">SN：</text>
          <text class="item-val">{{ item.mes }}</text>
        </view>
        <view class="item-row">
          <text class="item-label">IMEI：</text>
          <text class="item-val">{{ item.imei }}</text>
        </view>
        <view class="item-row">
          <text class="item-label">状态：</text>
          <text class="item-val">{{ item.activeDesc }}</text>
        </view>
        <view class="item-row">
          <text class="item-label">生产时间：</text>
          <text class="item-val">{{ item.createTime }}</text>
        </view>
        <text class="delete-btn" @tap="confirmDelete(item)">删除设备</text>
      </view>

      <view v-if="list.length === 0" class="empty">暂无记录</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { bindDevices, removeDevice } from '@/api/api.js'
import { onLoad } from '@dcloudio/uni-app'

const keyword = ref('')
const list = ref([])
const current = ref(1)
const size = 10
const machineId = ref('')
let rawList = []
function getArgType(kw) {
  if (!kw) return 'mes'
  return /^\d{15}$/.test(kw) ? 'imei' : 'mes'
}

async function doSearch() {
  console.log(keyword.value, rawList)
  if (!keyword.value) return list.value = [...rawList]
  list.value = rawList.filter(d => d.modelName.includes(keyword.value) || d.mes.includes(keyword.value) || d.imei.includes(keyword.value))
}

async function fetchData() {
  try {
    const params = {
      arg: machineId.value || '',
      current: current.value,
      size
    }
    const res = await bindDevices(params)
    if (current.value === 1) {
      list.value = res || []
    } else {
      list.value = [...list.value, ...(res || [])]
    }
  } catch (e) { } finally {
    rawList = [...list.value]
  }
}

function loadMore() {
  current.value++
  fetchData()
}

function confirmDelete(item) {
  uni.showModal({
    title: '提示',
    content: '是否删除设备',
    success: async ({ confirm }) => {
      if (confirm) {
        try {
          await removeDevice({ deviceId: item.id })
          list.value = list.value.filter(d => d.id !== item.id)
          uni.showToast({ title: '已删除', icon: 'success' })
        } catch (e) { }
      }
    }
  })
}

onLoad((options) => {
  machineId.value = options.machineId || ''
  fetchData()
})
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #DFF1FB;
  padding-top: 24rpx;

  .search-bar {
    margin: 0 32rpx 28rpx;
    background: #fff;
    border-radius: 60rpx;
    padding: 20rpx 32rpx;
    display: flex;
    align-items: center;
    gap: 16rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);

    .search-input {
      flex: 1;
      font-size: 28rpx;
      color: #222;
    }

    .search-btn {
      font-size: 28rpx;
      color: #1a9de4;
      font-weight: 600;
    }
  }

  .list {
    height: calc(100vh - 180rpx);
    padding: 0 32rpx;
    box-sizing: border-box;
  }

  .list-item {
    display: flex;
    flex-direction: column;
    // align-items: center;
    box-sizing: border-box;
    background: #fff;
    border-radius: 16rpx;
    padding: 28rpx 32rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);

    .item-row {
      width: 100%;
      display: flex;
      padding: 6rpx 0;
      justify-content: flex-start;

      .item-label {
        font-size: 28rpx;
        color: #888;
        width: 160rpx;
        flex-shrink: 0;
      }

      .item-val {
        font-size: 28rpx;
        color: #222;
        flex: 1;
      }
    }

    .delete-btn {
      display: block;
      width: 100%;
      text-align: right;
      margin-top: 16rpx;
      font-size: 28rpx;
      color: #e53935;
      font-weight: 600;
    }
  }

  .empty {
    text-align: center;
    padding: 80rpx 0;
    font-size: 28rpx;
    color: #aaa;
  }
}
</style>
