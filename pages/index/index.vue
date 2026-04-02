<template>
  <view class="index-page">
    <view class="header">
      <image class="logo" src="/static/images/app-logo.png" mode="aspectFit" />
      <view class="user-info">
        <text class="user-name">测试人: {{ userInfo.name || userInfo.phone }}</text>
        <text class="logout-btn" @tap="logout">退出</text>
      </view>
    </view>

    <view class="menu-list">
      <view class="menu-item" @tap="navTo('/pages/bind/index')">
        <uni-icons type="scan" size="30" color="#1a3a6e" />
        <text class="menu-label">设备绑定</text>
      </view>
      <view class="menu-item" @tap="navTo('/pages/test/index')">
        <uni-icons type="checkbox" size="30" color="#1a3a6e" />
        <text class="menu-label">产品测试</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const userInfo = computed(() => store.state.userInfo || {})

function navTo(url) {
  uni.navigateTo({ url })
}

function logout() {
  store.commit('setUserInfo', { token: '' })
  uni.setStorageSync('token', '')
  uni.setStorageSync('userInfo', {})
  uni.reLaunch({ url: '/pages/login/index' })
}
</script>

<style lang="scss">
.index-page {
  min-height: 100vh;
  background: #DFF1FB;
  padding: 180rpx 60rpx;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 280rpx;

    .logo {
      width: 200rpx;
      height: 70rpx;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 16rpx;

      .user-name {
        font-size: 26rpx;
        color: #1a3a6e;
      }

      .logout-btn {
        font-size: 28rpx;
        color: #e53935;
        font-weight: 600;
      }
    }
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    gap: 30rpx;
  }

  .menu-item {
    background: #fff;
    border-radius: 14rpx;
    padding: 30rpx 40rpx 30rpx 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 48rpx;
    box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);

    .menu-label {
      font-size: 36rpx;
      color: #1a3a6e;
      font-weight: 600;
    }
  }
}
</style>
