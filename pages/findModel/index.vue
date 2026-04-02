<template>
  <view class="page">
    <view class="search-bar">
      <uni-icons type="search" size="18" color="#999" />
      <input
        class="search-input"
        v-model="keyword"
        placeholder="搜索型号/机型ID"
        placeholder-style="color:#999"
        @confirm="doSearch"
      />
      <text class="search-btn" @tap="doSearch">搜索</text>
    </view>

    <scroll-view scroll-y class="list">
      <view
        v-for="item in list"
        :key="item.id"
        class="list-item"
      >
        <view class="item-info">
          <text class="item-name">{{ item.modelName }}</text>
          <text class="item-id">ID：{{ item.id }}</text>
        </view>
        <text class="select-btn" @tap="selectModel(item)">选择</text>
      </view>
      <view v-if="list.length === 0" class="empty">暂无数据</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { loadMachineTypes } from '@/api/api.js'

const keyword = ref('')
const list = ref([])

async function doSearch() {
  try {
    const res = await loadMachineTypes({ name: keyword.value })
    list.value = res?.rows || []
  } catch (e) {}
}

function selectModel(item) {
  const pages = getCurrentPages()
  const prevPage = pages[pages.length - 2]
  if (prevPage) {
    prevPage.$vm.onModelSelected(item)
  }
  uni.navigateBack()
}

onMounted(() => {
  doSearch()
})
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #F5F5F5;
  padding-top: 24rpx;

  .search-bar {
    margin: 0 32rpx 28rpx;
    background: #fff;
    border-radius: 60rpx;
    padding: 20rpx 32rpx;
    display: flex;
    align-items: center;
    gap: 16rpx;
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);

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
    height: calc(100vh - 280rpx);
    padding: 0 32rpx;

    .list-item {
      background: #fff;
      border-radius: 16rpx;
      padding: 28rpx 32rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);

      .item-info {
        flex: 1;
        padding-right: 20rpx;

        .item-name {
          font-size: 30rpx;
          color: #222;
          font-weight: 600;
          display: block;
          margin-bottom: 8rpx;
        }

        .item-id {
          font-size: 26rpx;
          color: #888;
        }
      }

      .select-btn {
        font-size: 28rpx;
        color: #1a9de4;
        font-weight: 600;
        white-space: nowrap;
      }
    }

    .empty {
      text-align: center;
      padding: 80rpx 0;
      font-size: 28rpx;
      color: #aaa;
    }
  }
}
</style>
