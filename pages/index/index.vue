<template>
  <view class="container">
    <!-- 顶部用户信息 -->
    <view class="header">
      <view class="user-info">
        <view class="greeting">
          <text>Hi,周芸</text>
          <image src="/static/images/vip.png" mode="aspectFit" class="vip-icon" />
        </view>
        <view class="user-id">
          <text>用户</text>
          <text class="id">15956757809</text>
        </view>
      </view>
      <image src="/static/images/banner.png" mode="aspectFit" class="banner" />
    </view>

    <!-- 搜索和添加设备 -->
    <view class="action-bar">
      <view class="search-box">
        <image src="/static/images/search.png" mode="aspectFit" class="search-icon" />
        <input type="text" placeholder="SN码/安装位置" placeholder-class="placeholder" />
      </view>
      <view class="add-device" @click="handleAddDevice">
        <image src="/static/images/add.png" mode="aspectFit" class="add-icon" />
        <text>添加/前往设备</text>
      </view>
    </view>

    <!-- 设备状态标签 -->
    <view class="status-tabs">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{ active: currentTab === tab.value }"
        @click="handleTabChange(tab.value)"
      >
        {{ tab.label }}
      </view>
    </view>

    <!-- 设备列表 -->
    <view class="device-list">
      <view class="device-item" v-for="(device, index) in deviceList" :key="index">
        <image :src="device.icon" mode="aspectFit" class="device-icon" />
        <view class="device-info">
          <text class="device-name">{{ device.name }}</text>
          <text class="device-model">{{ device.model }}</text>
        </view>
        <view class="device-status" :class="device.status">
          <text v-if="device.status === 'warning'" class="status-tag">到期</text>
          <text v-if="device.status === 'error'" class="status-tag">故障</text>
          <text v-if="device.status === 'change'" class="status-tag">换芯</text>
          <image :src="device.signalIcon" mode="aspectFit" class="signal-icon" />
        </view>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <view class="tab-bar">
      <view 
        v-for="(item, index) in tabBarList" 
        :key="index"
        class="tab-bar-item"
        :class="{ active: currentTabBar === item.value }"
        @click="handleTabBarChange(item.value)"
      >
        <image :src="item.icon" mode="aspectFit" class="tab-bar-icon" />
        <text>{{ item.label }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 标签页数据
const tabs = [
  { label: '全部', value: 'all' },
  { label: '正常', value: 'normal' },
  { label: '离线', value: 'offline' },
  { label: '停用', value: 'disabled' },
  { label: '故障', value: 'error' },
  { label: '换芯', value: 'change' }
]

// 当前选中的标签
const currentTab = ref('all')

// 底部导航栏数据
const tabBarList = [
  { label: '首页', value: 'home', icon: '/static/images/home.png' },
  { label: '消息', value: 'message', icon: '/static/images/message.png' },
  { label: '资讯', value: 'news', icon: '/static/images/news.png' },
  { label: '案例', value: 'case', icon: '/static/images/case.png' }
]

// 当前选中的底部导航
const currentTabBar = ref('home')

// 设备列表数据
const deviceList = reactive([
  {
    name: '一楼前台',
    model: 'S800-2',
    icon: '/static/images/device1.png',
    status: 'normal',
    signalIcon: '/static/images/signal-full.png'
  },
  {
    name: '茶水间',
    model: 'RO508',
    icon: '/static/images/device2.png',
    status: 'normal',
    signalIcon: '/static/images/signal-full.png'
  },
  {
    name: '会议室',
    model: 'S800-2',
    icon: '/static/images/device1.png',
    status: 'warning',
    signalIcon: '/static/images/signal-full.png'
  },
  {
    name: '企业展厅',
    model: 'RO508',
    icon: '/static/images/device2.png',
    status: 'error',
    signalIcon: '/static/images/signal-low.png'
  }
])

// 处理标签切换
const handleTabChange = (tab) => {
  currentTab.value = tab
}

// 处理底部导航切换
const handleTabBarChange = (tab) => {
  currentTabBar.value = tab
  if (tab !== 'home') {
    uni.switchTab({
      url: `/pages/${tab}/index`
    })
  }
}

// 处理添加设备
const handleAddDevice = () => {
  // TODO: 跳转到添加设备页面
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: $primary-color;
  padding: 20rpx;
}

.header {
  .user-info {
    margin-bottom: 30rpx;
    
    .greeting {
      display: flex;
      align-items: center;
      margin-bottom: 10rpx;
      
      text {
        color: #fff;
        font-size: 40rpx;
        margin-right: 10rpx;
      }
      
      .vip-icon {
        width: 40rpx;
        height: 40rpx;
      }
    }
    
    .user-id {
      display: flex;
      align-items: center;
      
      text {
        color: #D68F01;
        font-size: 24rpx;
        
        &.id {
          margin-left: 10rpx;
        }
      }
    }
  }
  
  .banner {
    width: 100%;
    height: 200rpx;
    border-radius: 20rpx;
  }
}

.action-bar {
  display: flex;
  margin: 30rpx 0;
  
  .search-box {
    flex: 1;
    background: #2D3C58;
    height: 80rpx;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    padding: 0 20rpx;
    margin-right: 20rpx;
    
    .search-icon {
      width: 40rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }
    
    input {
      flex: 1;
      color: #fff;
      font-size: 28rpx;
    }
  }
  
  .add-device {
    background: #D68F01;
    height: 80rpx;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    
    .add-icon {
      width: 40rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }
    
    text {
      color: #fff;
      font-size: 28rpx;
    }
  }
}

.status-tabs {
  display: flex;
  margin-bottom: 30rpx;
  border-bottom: 1rpx solid #2D3C58;
  
  .tab-item {
    padding: 20rpx 30rpx;
    color: #fff;
    font-size: 28rpx;
    position: relative;
    
    &.active {
      color: #D68F01;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2rpx;
        left: 0;
        width: 100%;
        height: 4rpx;
        background: #D68F01;
      }
    }
  }
}

.device-list {
  .device-item {
    background: #2D3C58;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    
    .device-icon {
      width: 80rpx;
      height: 80rpx;
      margin-right: 20rpx;
    }
    
    .device-info {
      flex: 1;
      
      .device-name {
        color: #fff;
        font-size: 32rpx;
        margin-bottom: 10rpx;
        display: block;
      }
      
      .device-model {
        color: #999;
        font-size: 24rpx;
      }
    }
    
    .device-status {
      display: flex;
      align-items: center;
      
      .status-tag {
        padding: 4rpx 12rpx;
        border-radius: 6rpx;
        font-size: 24rpx;
        margin-right: 10rpx;
      }
      
      &.warning .status-tag {
        background: #D68F01;
        color: #fff;
      }
      
      &.error .status-tag {
        background: #ff4d4f;
        color: #fff;
      }
      
      &.change .status-tag {
        background: #1890ff;
        color: #fff;
      }
      
      .signal-icon {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: #2D3C58;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
  
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .tab-bar-icon {
      width: 48rpx;
      height: 48rpx;
      margin-bottom: 6rpx;
    }
    
    text {
      color: #fff;
      font-size: 24rpx;
    }
    
    &.active {
      text {
        color: #D68F01;
      }
    }
  }
}

.placeholder {
  color: #999;
}
</style>
