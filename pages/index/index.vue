<template>
  <view class="container">
    <!-- 顶部用户信息 -->
    <view class="header">
      <view class="logo">
        <image class="logo-img" src="/static/images/header-logo.png" mode="aspectFit" />
      </view>
      <view v-if="loginType == 'dealer'" class="dear-info">
        <view class="greeting flex-between">
          <view @click="goToInfo" class="name">
            Hi,陈理想
            <image class="icon" src="/static/images/setting-active.png" />
          </view>
          <view class="user-id">
            <text class="tag">经销商</text>
            <text>15956757809</text>
          </view>
        </view>
      </view>
      <view v-else class="user-info">
        <view class="greeting flex-between">
          <view @click="goToInfo" class="name">
            Hi,周芸
            <image class="icon" src="/static/images/setting-active.png" />
          </view>
          <view class="user-id">
            <text class="tag">用户</text>
            <text>15956757809</text>
          </view>
        </view>
      </view>
      <image @click="handelbanner" src="/static/images/banner.png" mode="aspectFill" class="banner" />
    </view>
    <view v-if="loginType == 'dealer'" class="nav-list">
      <view v-for="(tab, index) in navTabs" :key="index" class="nav-item" :class="{ active: currentNav === tab.value }"
        @tap="handleNavChange(tab.value)">
        {{ tab.label }}
      </view>
    </view>
    <!-- 搜索和添加设备 -->
    <view v-if="loginType === 'dealer'" class="search-bar flex-between">
      <view class="search-input flex-center">
        <image src="/static/images/icon-search.png" mode="aspectFit" class="icon small" />
        <input v-if="currentNav == 'customer'" type="text" placeholder="客户/手机号/SN码/安装位置"
          placeholder-class="placeholder" />
        <input v-if="currentNav == 'device'" type="text" placeholder="类型/SN码/订单" placeholder-class="placeholder" />
        <input v-if="currentNav == 'log'" type="text" placeholder="订单" placeholder-class="placeholder" />
      </view>
      <view v-if="currentNav == 'device'" class="btn primary" style="width: 217rpx;" @click="handleAddDevice">
        <image src="/static/images/icon-scan.png" mode="aspectFit" class="icon small" />
        <text>授权设备</text>
      </view>
    </view>
    <!-- 搜索和添加设备 -->
    <view v-else class="search-bar flex-between">
      <view class="search-input flex-center">
        <image src="/static/images/icon-search.png" mode="aspectFit" class="icon small" />
        <input type="text" placeholder="SN码/安装位置" placeholder-class="placeholder" />
      </view>
      <view class="btn primary" @click="handleAddDevice">
        <image src="/static/images/icon-scan.png" mode="aspectFit" class="icon small" />
        <text>添加/前往设备</text>
      </view>
    </view>
    <view v-if="loginType !== 'dealer'" class="flex-between">
      <view class="my">
        我的设备
      </view>
      <view class="type">
        全部类型
      </view>
    </view>
    <!-- 设备状态标签 -->
    <scroll-view v-if="!(loginType == 'dealer' && currentNav == 'device')" scroll-x class="status-tabs"
      :show-scrollbar="false">
      <view class="tab-list">
        <view v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: currentTab === tab.value }"
          @tap="handleTabChange(tab.value)">
          {{ tab.label }}
          <!-- <text v-if="tab.count" class="count">({{ tab.count }})</text> -->
        </view>
      </view>
    </scroll-view>
    <view v-if="loginType == 'user'" class="device-num">设备：24</view>
    <view v-if="loginType == 'dealer' && currentNav == 'customer'" class="device-num">客户:
      <view style="display: inline-block; margin-right: 20rpx;">2</view>设备：24
    </view>
    <view v-if="loginType == 'dealer' && currentNav == 'device'" class="auth-status-tabs">
      <text class="auth-status-label">未授权设备：5</text>
      <view class="status-btn-group">
        <view :class="['status-btn', { active: !isAuthorized }]" @click="isAuthorized = false">未授权</view>
        <view :class="['status-btn', { active: isAuthorized }]" @click="isAuthorized = true">已授权</view>
      </view>
    </view>
    <view v-if="loginType == 'dealer' && currentNav == 'log'" class="device-num">设备：24</view>
    <!-- 设备列表 -->
    <scroll-view v-if="loginType == 'user'" class="device-scroll" scroll-y refresher-enabled
      :refresher-triggered="isRefreshing" @refresherrefresh="onRefresh">
      <view class="device-list">
        <view v-for="(device, index) in filteredDevices" :key="index" class="device-item"
          @tap="handleDeviceClick(device)">
          <image :src="device.icon" mode="aspectFit" class="device-icon" />
          <view class="device-info">
            <text class="name">{{ device.name }}</text>
            <text class="model">{{ device.model }}</text>
          </view>
          <view class="device-status">
            <view v-if="device.tags && device.tags.length" class="status-tags">
              <text v-for="(tag, idx) in device.tags" :key="idx" class="tag" :class="tag.type">{{ tag.text }}</text>
            </view>
          </view>
          <image :src="device.signalIcon" mode="aspectFit" class="icon small" />
        </view>
      </view>
    </scroll-view>
    <scroll-view v-if="loginType == 'dealer'" class="device-scroll" scroll-y refresher-enabled
      :refresher-triggered="isRefreshing" @refresherrefresh="onRefresh">
      <view v-if="currentNav === 'customer'" class="customer-list">
        <view @tap="handleCustomerClick(item)" class="customer-item" v-for="item in customers" :key="item.id">
          <view class="avatar">
            <image src="/static/images/avatar.png" class="avatar-img" />
          </view>
          <view class="customer-info">
            <view class="name-row">
              <text class="name">{{ item.name }}</text>
              <image src="/static/images/edit.png" class="edit-icon" />
            </view>
            <text class="phone">{{ item.phone }}</text>
          </view>
          <view class="device-count">
            <text>{{ item.deviceCount }}台</text>
            <view class="right-arrow"></view>
          </view>
        </view>
      </view>
      <view v-else class="device-list1">
        <view @tap="handleDeviceAuthorizeClick(item)" class="device-item1" v-for="item in deviceList" :key="item.sn">
          <image class="device-img" :src="item.img" />
          <view class="device-info">
            <text class="device-title">{{ item.title }}</text>
            <text class="device-sn">SN:{{ item.sn }}</text>
            <text class="device-order">订单：{{ item.order }}</text>
          </view>
          <image class="signal-icon" :src="item.signal" />
          <button class="auth-action-btn" v-if="!isAuthorized">授权</button>
          <view class="auth-status" v-else>已授权</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
// 从缓存里获取登录类型
let loginType = ref('')
onShow(() => {
  loginType.value = uni.getStorageSync('loginType')
})

const tabs = ref([
  { label: '全部', value: 'all', count: 12 },
  { label: '正常', value: 'normal', count: 8 },
  { label: '离线', value: 'offline', count: 2 },
  { label: '停用', value: 'disabled', count: 0 },
  { label: '故障', value: 'error', count: 1 },
  { label: '换芯', value: 'change', count: 1 }
])

const navTabs = ref([
  { label: '我的客户', value: 'customer', },
  { label: '授权设备', value: 'device', },
  { label: '出库记录', value: 'log', },
])
const customers = ref([
  { id: 1, name: '陈霞', phone: '13467458906', deviceCount: 16 },
  { id: 2, name: '张国莉', phone: '17834902226', deviceCount: 8 }
])
const currentTab = ref('all')
const currentNav = ref('customer')
const isAuthorized = ref(false)
const deviceList = ref([
  {
    img: '/static/images/device1.png',
    title: '家用反渗透净水机',
    sn: '34523487679890',
    order: '20250623094950',
    signal: '/static/images/signal-full.png'
  },
  {
    img: '/static/images/device.png',
    title: '商用饮水机',
    sn: '34523487679821',
    order: '20250623094448',
    signal: '/static/images/signal-low.png'
  }
])
const devices = ref([
  {
    id: 1,
    name: '一楼前台',
    model: 'S800-2',
    icon: '/static/images/device.png',
    status: 'normal',
    signalIcon: '/static/images/signal-full.png',
    tags: []
  },
  {
    id: 2,
    name: '茶水间',
    model: 'RO508',
    icon: '/static/images/device.png',
    status: 'change',
    signalIcon: '/static/images/signal-full.png',
    tags: [{ type: 'change', text: '换芯' }]
  },
  {
    id: 3,
    name: '会议室',
    model: 'S800-2',
    icon: '/static/images/device.png',
    status: 'error',
    signalIcon: '/static/images/signal-full.png',
    tags: [
      { type: 'error', text: '故障' },
      { type: 'warning', text: '到期' },
      { type: 'change', text: '换芯' }
    ]
  },
  {
    id: 4,
    name: '企业展厅',
    model: 'RO508',
    icon: '/static/images/device.png',
    status: 'error',
    signalIcon: '/static/images/signal-low.png',
    tags: [{ type: 'error', text: '故障' }]
  }
])

const filteredDevices = computed(() => {
  if (currentTab.value === 'all') return devices.value
  return devices.value.filter(device => device.status === currentTab.value)
})

const isRefreshing = ref(false)

const handleTabChange = (tab) => {
  currentTab.value = tab
}

const handleNavChange = (tab) => {
  currentNav.value = tab
}

const handleAddDevice = () => {
  uni.navigateTo({
    url: '/pages/index/scan/index'
  })
}

const handleDeviceClick = (device) => {
  uni.navigateTo({
    url: `/pages/device/detail/index?id=${device.id}`
  })
}

const handleCustomerClick = (item) => {
  uni.navigateTo({
    url: `/pages/index/customer/index?id=${item.id}`
  })
}
const handleDeviceAuthorizeClick = (item) => {
  uni.navigateTo({
    url: `/pages/device/authorize/index?id=${item.id}`
  })
}

const handelbanner = (device) => {
  uni.navigateTo({
    url: `/pages/device/detail/index?id=${device.id}`
  })
}

const goToInfo = () => {
  uni.navigateTo({
    url: `/pages/index/info/index`
  })
}

const onRefresh = async () => {
  isRefreshing.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
  } finally {
    isRefreshing.value = false
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: $bg-color;
  padding: 30rpx;
  padding-top: calc(var(--status-bar-height) + 10rpx);
}

.header {
  margin-bottom: 40rpx;

  .logo {
    border-bottom: 1rpx solid #fff;
  }

  .logo-img {
    margin-left: -20rpx;
    width: 469rpx;
    height: 85rpx;
  }
}

.user-info {
  margin-top: 42rpx;
}

.dear-info {
  margin-top: 24rpx;

  .user-id .tag {
    border-radius: 6rpx;
    background: #13337CFF;
    color: #fff;
    font-size: 22rpx;
    padding: 4rpx 12rpx;
    border-radius: 6rpx;
    margin-right: 10rpx;
  }

}

.greeting {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.name {
  font-size: 44rpx;
  display: flex;
  align-items: center;

  .icon {
    margin-left: 34rpx;
    width: 44rpx;
    height: 44rpx;
  }
}

.greeting .name {
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 44rpx;
}

.user-id {
  display: flex;
  align-items: center;
}

.user-id .tag {
  background: #D68F01;
  color: #fff;
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  margin-right: 10rpx;
}

.user-id text {
  color: #C7C7C7;
  font-size: 28rpx;
}

.banner {
  width: 100%;
  height: 300rpx;
  border-radius: 12rpx;
  margin-top: 36rpx;
  object-fit: cover;
}

.search-bar {
  margin-bottom: 0rpx;
  display: flex;
  align-items: center;
}

.search-input {
  flex: 1;
  background: #2D3C58;
  height: 80rpx;
  border-radius: 90rpx;
  padding: 0 30rpx;
  // margin-right: 30rpx;
  display: flex;
  align-items: center;
}

.search-input input {
  flex: 1;
  line-height: 1;
  margin-left: 25rpx;
  color: #fff;
  font-size: 26rpx;
  background: transparent;
  border: none;
}

.btn.primary {
  width: 260rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #D68F01;
  color: #fff;
  margin-left: 30rpx;
  font-size: 25rpx;
  border-radius: 90rpx;
  height: 80rpx;
  line-height: 80rpx;
  border: none;
}

.btn.primary .icon {
  margin-right: 10rpx;
  width: 42rpx;
  height: 42rpx;
}

.my {
  margin-top: 52rpx;
  color: #fff;
  font-size: 32rpx;
}

.type {
  margin-top: 52rpx;
  color: #fff;
  font-size: 25rpx;

  &::after {
    content: '';
    // 画一个向下的箭头
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 10rpx solid transparent;
    border-right: 10rpx solid transparent;
    border-top: 12rpx solid #61D4CC;
    margin-left: 5rpx;
    // vertical-align: middle;
    margin-bottom: 2rpx;
  }
}

.status-tabs {
  // margin-bottom: 33rpx;
  white-space: nowrap;
}

.tab-list {
  margin-top: 20rpx;
  display: inline-flex;
  // padding-bottom: 2rpx;
  // border-bottom: 2rpx solid #2D3C58;
}

.nav-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 60rpx;

  .nav-item {
    font-size: 32rpx;
    margin: 0rpx 30rpx 40rpx;
    padding: 14rpx 0;
    color: #A5BFE8;
    position: relative;
    cursor: pointer;
  }

  .nav-item.active {
    color: $active-color;
  }

  .nav-item.active::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0rpx;
    width: 100%;
    height: 4rpx;
    background: $active-color;
  }


}

.auth-status-tabs {
  height: 100rpx;
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin: 4rpx 0rpx 24rpx 0rpx;

  .auth-status-label {
    color: #fff;
    font-size: 29rpx;
    margin-right: 32rpx;
  }

  .status-btn-group {
    display: flex;
    border-radius: 4rpx;
    overflow: hidden;


    .status-btn {
      background: #152136FF;
      color: #fff;
      font-size: 22rpx;
      // border-radius: 12rpx;
      padding: 0 32rpx;
      height: 56rpx;
      line-height: 56rpx;
      border: 2rpx solid #fff;

      &.active {
        background: #fff;
        color: #152136;
      }
    }
  }
}

.tab-item {
  padding: 24rpx 30rpx;
  color: #A5BFE8;
  font-size: 28rpx;
  position: relative;
  cursor: pointer;
}

.tab-item .count {
  color: #999;
  font-size: 24rpx;
  margin-left: 4rpx;
}

.tab-item.active {
  color: $active-color;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0rpx;
  width: 100%;
  height: 4rpx;
  background: $active-color;
}

.device-num {
  margin-top: 33rpx;
  color: #fff;
  font-size: 32rpx;
  margin-bottom: 30rpx;
}

.device-list {
  // height: calc(100vh - 600rpx);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.device-item {
  position: relative;
  background: #2D3C58;
  border-radius: 12rpx;
  padding: 60rpx 30rpx 30rpx;
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
  width: 336rpx;
  height: 180rpx;
  border-radius: 18rpx;
  background: linear-gradient(90deg, #324A70 0%, #324A70 100%);
  box-shadow: 0px 4rpx 8rpx #000000;


  .icon {
    position: absolute;
    top: 18rpx;
    right: 20rpx;
  }

  .icon.small {
    width: 25rpx;
    height: 25rpx;
  }
}

.device-icon {
  width: 106.88rpx;
  height: 106.88rpx;
  margin-right: 14rpx;
}

.device-info {
  flex: 1;
}

.device-info .name {
  color: #fff;
  font-size: 28rpx;
  margin-bottom: 10rpx;
  display: block;
}

.device-info .model {
  color: #C7C7C7;
  font-size: 24rpx;
}

.device-status {
  position: absolute;
  display: flex;
  top: 0px;
  align-items: center;
}

.device-list1 {
  .device-item1 {
    background: linear-gradient(90deg, #324a70ff 0%, #324a7033 100%);
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    padding: 24rpx;
    margin-bottom: 24rpx;
    position: relative;

    .device-img {
      width: 106rpx;
      height: 106rpx;
      margin-right: 18rpx;
      object-fit: contain;
    }

    .device-info {
      flex: 1;

      .device-title {
        color: #fff;
        font-size: 25rpx;
        margin-bottom: 8rpx;
      }

      .device-sn,
      .device-order {
        color: #C7C7C7FF;
        font-size: 25rpx;
        margin-bottom: 4rpx;
        display: block;
      }
    }

    .signal-icon {
      width: 36rpx;
      height: 36rpx;
      margin-left: 12rpx;
      margin-bottom: 80rpx;
    }

    .auth-action-btn {
      background: $active-color;
      color: #fff;
      font-size: 22rpx;
      border-radius: 12rpx;
      width: 108rpx;
      height: 54rpx;
      line-height: 54rpx;
      border: none;
      position: absolute;
      right: 24rpx;
      bottom: 24rpx;
    }

    .auth-status {
      color: #D68F01;
      font-size: 26rpx;
      position: absolute;
      right: 24rpx;
      bottom: 24rpx;
    }
  }
}

.status-tags {
  margin-right: 10rpx;
  display: flex;
  gap: 10rpx;
}

.status-tags .tag {
  padding: 4rpx 12rpx;
  border-radius: 0rpx;
  font-size: 24rpx;
  color: #fff;
}

.status-tags .tag.warning {
  background: #CFB55F;
}

.status-tags .tag.error {
  background: #FA927A;
}

.status-tags .tag.change {
  background: #629CDE;
}


.placeholder {
  color: #999;
}

.customer-list {
  // margin: 24rpx 24rpx 0 24rpx;

  .customer-item {
    background: linear-gradient(90deg, #324a70ff 0%, #324a7033 100%);
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    padding: 30rpx;
    margin-bottom: 24rpx;

    .avatar {
      width: 90rpx;
      height: 90rpx;
      border-radius: 50%;
      background: #e5e9f2;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 18rpx;

      .avatar-img {
        width: 90rpx;
        height: 90rpx;
      }
    }

    .customer-info {
      flex: 1;

      .name-row {
        display: flex;
        align-items: center;

        .name {
          color: #fff;
          font-size: 29rpx;
          font-weight: bold;
          margin-right: 31rpx;
        }

        .edit-icon {
          width: 36rpx;
          height: 36rpx;
        }
      }

      .phone {
        color: #C7C7C7FF;
        font-size: 25rpx;
        margin-top: 20rpx;
      }
    }

    .device-count {
      color: #fff;
      font-size: 36rpx;
      display: flex;
      align-items: center;

      .right-arrow {
        margin-left: 10rpx;
        width: 14rpx;
        height: 14rpx;
        border-top: 2rpx solid #fff;
        border-right: 2rpx solid #fff;
        // border-left: 18rpx solid #fff;
        transform: rotate(45deg);
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
