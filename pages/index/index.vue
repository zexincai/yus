<template>
  <view class="container">
    <!-- 顶部用户信息 -->
    <view class="header">
      <view class="logo">
        <image class="logo-img" src="/static/image/app-logo.png" mode="aspectFit" />
        <view class="logo-text">水灵汐智慧净水平台</view>
      </view>
      <view v-if="loginType == 'ROLE_DEALER'" class="dear-info">
        <view class="greeting">
          <view class="name">
            Hi,{{ userInfo.name }}
          </view>
          <view class="user-id">
            <text class="tag">经销商</text>
            <text>{{ userInfo.phone }}</text>
            <view class="setting">
              <view class="setting-item" @click="goToInfo">
                设置
                <image class="icon" src="/static/image/icon-setting-blue.png" />
              </view>
              <view class="setting-item" @click="goToMessage">
                <view class="message-count">{{ messageCount }}</view>
                消息
                <image class="icon" src="/static/image/icon-message-warn.png" />
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="user-info">
        <view class="greeting">
          <view class="name">
            Hi,{{ userInfo.name }}
          </view>
          <view class="user-id">
            <text class="tag">用户</text>
            <text>{{ userInfo.phone }}</text>

            <view class="setting">
              <view class="setting-item" @click="goToInfo">
                设置
                <image class="icon" src="/static/image/icon-setting-blue.png" />
              </view>
              <view class="setting-item" @click="goToMessage">
                <view class="message-count">{{ messageCount }}</view>
                消息
                <image class="icon" src="/static/image/icon-message-warn.png" />
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- <image @click="handelbanner" src="/static/images/banner.png" mode="aspectFill" class="banner" /> -->
      <swiper @change="onSwiperChange" class="banner" circular autoplay interval="5000" duration="500">
        <swiper-item @click="handleCaseClick(item)" v-for="(item, index) in bannerList" :key="index">
          <image :src="item.imgUrl" mode="aspectFill" class="banner-image" />
        </swiper-item>
      </swiper>
    </view>
    <view v-if="loginType == 'ROLE_DEALER'" class="nav-list">
      <view v-for="(tab, index) in navTabs" :key="index" hover-class="none" class="nav-item" :class="{ active: currentNav === tab.value }"
        @tap="handleNavChange(tab.value)">
        {{ tab.label }}
      </view>
    </view>
    <!-- 搜索和添加设备 -->
    <view v-if="loginType === 'ROLE_DEALER'" class="search-bar flex-between">
      <view class="search-input flex-center">
        <image src="/static/images/icon-search.png" mode="aspectFit" class="icon small" />
        <input v-model="searchKey" @confirm="onSearch" v-if="currentNav == 'customer'" type="text"
          placeholder="客户/手机号/SN码/安装位置" placeholder-class="placeholder" />
        <input v-model="searchKey" v-if="currentNav == 'device'" type="text" placeholder="类型/SN码/订单"
          placeholder-class="placeholder" @confirm="onSearch" />
        <input v-if="currentNav == 'log'" v-model="searchKey" @confirm="onSearch" type="text" placeholder="订单"
          placeholder-class="placeholder" />
      </view>

      <view v-if="currentNav == 'device'" class="btn primary" style="width: 217rpx" @click="handleAddDevice">
        <image src="/static/images/icon-scan.png" mode="aspectFit" class="icon small" />
        <text>授权设备</text>
      </view>
    </view>
    <!-- 搜索和添加设备 -->
    <view v-else class="search-bar flex-between">
      <view class="search-input flex-center">
        <image src="/static/images/icon-search.png" mode="aspectFit" class="icon small" />
        <input v-model="searchKey" @confirm="onSearch" type="text" placeholder="SN码/安装位置"
          placeholder-class="placeholder" />
      </view>
      <view class="btn primary" @click="handleAddDevice">
        <image src="/static/images/icon-scan.png" mode="aspectFit" class="icon small" />
        <text>添加/前往设备</text>
      </view>
    </view>
    <view v-if="loginType !== 'ROLE_DEALER'" class="flex-between">
      <view class="my"> 我的设备 </view>
      <!-- <view class="type"> 全部类型 </view> -->

      <!-- <picker @change="onBrandPickerChange" :value="brandIndex" :range="brandList">
        <view class="type"> {{ brandList[brandIndex] }} </view>
      </picker> -->
    </view>
    <!-- 设备状态标签 -->
    <scroll-view v-if="!(loginType == 'ROLE_DEALER' && (currentNav == 'device' || currentNav == 'log'))" scroll-x
      class="status-tabs" :show-scrollbar="false">
      <view class="tab-list">
        <view v-for="(tab, index) in tabs" :key="index" hover-class="none" class="tab-item"
          :class="{ active: currentTab === tab.value }" @tap="handleTabChange(tab.value)">
          {{ tab.label }}
        </view>
      </view>
    </scroll-view>

    <view v-if="loginType == 'ROLE_CUSTOMER'" class="device-num">设备：{{ deviceList.length }}</view>
    <view v-if="loginType == 'ROLE_DEALER' && currentNav == 'customer'" class="device-num">
      客户:
      <view style="display: inline-block; margin-right: 20rpx">{{ customerData.customerNum }}</view>
      设备：{{ customerData.deviceNum }}
    </view>

    <view v-if="loginType == 'ROLE_DEALER' && currentNav == 'device'" class="auth-status-tabs">
      <text v-if="!isAuthorized" class="auth-status-label">未授权设备：{{ deviceList.length }}</text>
      <text v-if="isAuthorized" class="auth-status-label">已授权设备：{{ deviceList.length }}</text>
      <view class="status-btn-group">
        <view :class="['status-btn', { active: !isAuthorized }]" @click="isAuthorized = false">未授权</view>
        <view :class="['status-btn', { active: isAuthorized }]" @click="isAuthorized = true">已授权</view>
      </view>
    </view>

    <!-- 日期选择 -->
    <view v-if="currentNav == 'log' && loginType === 'ROLE_DEALER'" class="date-picker">
      <picker mode="date" :valLue="startDate" @change="hanldeStartDateChange">
        <view class="picker-item">
          <text>{{ startDate }}</text>
          <image src="/static/images/arrow-down.png" mode="aspectFit" class="arrow-icon" />
        </view>
      </picker>
      <text class="picker-separator">至</text>
      <picker mode="date" :valLue="endDate" @change="hanldeEndDateChange">
        <view class="picker-item">
          <text>{{ endDate }}</text>
          <image src="/static/images/arrow-down.png" mode="aspectFit" class="arrow-icon" />
        </view>
      </picker>
      <button class="confirm-btn" @click="handleConfirm">确定</button>
    </view>
    <view v-if="loginType == 'ROLE_DEALER' && currentNav == 'log'" style="font-size: 29rpx" class="device-num">出库订单：
      {{ logList.length }}
    </view>
    <!-- 设备列表 -->
    <!-- <scroll-view  class="device-scroll" scroll-y refresher-enabled
      :refresher-triggered="isRefreshing" @refresherrefresh="onRefresh"> -->
    <view v-if="loginType == 'ROLE_CUSTOMER'" class="device-list">
      <view v-for="(device, index) in deviceList" :key="index" class="device-item" @tap="handleDeviceClick(device)">
        <image :src="device.productUrl" mode="aspectFit" class="device-icon" />
        <view class="device-info">
          <text class="name">{{ device.location }}</text>
          <text class="model">{{ device.modelName }}</text>
        </view>
        <view class="device-status">
          <view v-if="device.labels && device.labels.length" class="status-tags">
            <text v-for="(tag, idx) in device.labels" :key="idx" class="tag" :class="'tag-' + idx">{{ tag }}</text>
          </view>
        </view>
        <image :src="device.rssiUrl" mode="aspectFit" class="icon small" />
      </view>
    </view>
    <view v-if="loginType == 'ROLE_CUSTOMER' && !deviceList.length" class="empty">
      <image src="/static/images/empty.png" mode="aspectFit" class="empty-img" />
      <view class="empty-text"> 暂无数据 </view>
    </view>
    <!-- </scroll-view> -->
    <div v-if="loginType == 'ROLE_DEALER'" class="device-scroll">
      <view v-if="currentNav === 'customer'" class="customer-list">
        <template v-if="customerData.users.length">
          <view @tap="handleCustomerClick(item)" class="customer-item box-shadow" v-for="item in customerData.users"
            :key="item.phone">
            <view class="avatar">
              <image src="/static/images/avatar.png" class="avatar-img" />
            </view>
            <view class="customer-info">
              <view class="name-row">
                <text class="name">{{ item.name }}</text>
                <image src="/static/images/icon-edit.png" class="edit-icon" />
              </view>
              <text class="phone">{{ item.phone }}</text>
            </view>
            <view class="device-count">
              <text>{{ item.num }}台</text>
              <view class="right-arrow"></view>
            </view>
          </view>
        </template>
        <view v-else class="empty">
          <image src="/static/images/empty.png" mode="aspectFit" class="empty-img" />
          <view class="empty-text"> 暂无数据 </view>
        </view>
      </view>
      <view v-if="currentNav === 'device'" class="device-list1">
        <view v-if="deviceList.length" @tap="handleDeviceAuthorizeClick(item)" class="device-item1 box-shadow"
          v-for="item in deviceList" :key="item.sn">
          <image class="device-img" :src="item.productUrl || '/static/images/device.png'" />
          <view class="device-info">
            <text class="device-title">{{ item.brand }}</text>
            <text class="device-sn">SN:{{ item.sn }}</text>
            <text class="device-order">订单：{{ item.orderNo || '--' }}</text>
          </view>
          <image class="signal-icon" :src="item.rssiUrl" />
          <button class="auth-action-btn" v-if="!isAuthorized">授权</button>
          <view :class="{ blue: item.buyout != 1 }" class="auth-status" v-else>{{ item.label }}</view>
        </view>
        <template v-else>
          <view class="empty">
            <image src="/static/images/empty.png" mode="aspectFit" class="empty-img" />
            <view class="empty-text"> 暂无数据 </view>
          </view>
        </template>
      </view>
      <view v-if="currentNav === 'log'" class="customer-list">
        <template v-if="logList.length">
          <view @tap="handleOrderClick(item)" class="customer-item box-shadow" v-for="item in logList"
            :key="item.phone">
            <view class="avatar">
              <image src="/static/images/order-icon.png" class="avatar-img" />
            </view>
            <view class="customer-info">
              <view class="name-row">
                <text class="name">订单：{{ item.orderNo }}</text>
              </view>
              <text style="margin-top: 50rpx" class="phone">出库时间：{{ item.createTime }}</text>
            </view>
            <view class="device-count">
              <view class="right-arrow"></view>
            </view>
          </view>
        </template>
        <view v-else class="empty">
          <image src="/static/images/empty.png" mode="aspectFit" class="empty-img" />
          <view class="empty-text"> 暂无数据 </view>
        </view>
      </view>
    </div>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { onShow, onLoad, onReachBottom } from '@dcloudio/uni-app'
import { equipmentStatistics, getBusinessCasePage, deviceGroupMsg, loadBrands, searchDevices, customerDevices, devicelLoadDeviceBaseInfo, loadDeviceBaseInfo, getOrderList } from '@/api/dealer'
import DateUtil from '@/utils/date'

// 从缓存里获取登录类型
let loginType = ref('')
let userInfo = ref({})
let searchKey = ref('')
let page = ref(1)
const brandList = ref([])
const brandIndex = ref(0)
let bannerList = ref([{
  imgUrl: '/static/image/banner.png',
}])
let logList = ref([])
// 日期范围
let messageCount = ref(0)
const startDate = ref('2024-04-01')
const endDate = ref('2024-04-30')
const tabs = ref([
  { label: '全部', value: '0', count: 12 },
  { label: '正常', value: '1', count: 8 },
  { label: '离线', value: '2', count: 2 },
  { label: '停用', value: '3', count: 0 },
  { label: '故障', value: '4', count: 1 },
  { label: '换芯', value: '5', count: 1 },
])

const navTabs = ref([
  { label: '我的客户', value: 'customer' },
  { label: '授权设备', value: 'device' },
  { label: '出库记录', value: 'log' },
])

const customerData = ref({
  customerNum: 0,
  deviceNum: 0,
  users: [],
})
const currentTab = ref('0')
const currentNav = ref('customer')
const isAuthorized = ref(true)
const deviceList = ref([])
const isRefreshing = ref(false)
const brandListMap = {}
const getEquipmentStatistics = () => {
  equipmentStatistics({ tab: currentTab.value, arg: searchKey.value }).then((res) => {
    customerData.value = res
  })
}
// 获取设备列表
const getDeviceList = () => {
  if (loginType.value === 'ROLE_DEALER') {
    searchDevices({
      tab: isAuthorized.value ? 1 : 0,
      arg: searchKey.value,
      current: page.value,
      size: 20,
    }).then((res) => {
      if (page.value == 1) {
        deviceList.value = res
      } else {
        deviceList.value = [...deviceList.value, ...res]
      }
      if (res.length) {
        page.value++
      }
    })
  } else {
    customerDevices({
      tab: currentTab.value,
      arg: searchKey.value,
      brand: brandIndex.value != 0 ? brandListMap[brandList.value[brandIndex.value]] : '',
      current: page.value,
      size: 20,
    }).then((res) => {
      deviceList.value = res
      if (res.length) {
        page.value++
      }
    })
  }
}

const onSearch = () => {
  if (currentNav.value == 'customer') {
    getEquipmentStatistics()
  }
  if (currentNav.value == 'device') {
    page.value = 1
    getDeviceList()
  }
  if (currentNav.value == 'log') {
    getLogList()
  }
}
// 全部类型
const onBrandPickerChange = (e) => {
  brandIndex.value = e.detail.value
  onSearch()
}
const handleTabChange = (tab) => {
  currentTab.value = tab
  if (loginType.value == 'ROLE_CUSTOMER') {
    page.value = 1
    getDeviceList()
  } else {
    getEquipmentStatistics()
  }
}
const goToMessage = () => {
  uni.navigateTo({
    url: '/pages/message/index',
  })
}

// 监听isAuthorized变化
watch(isAuthorized, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    page.value = 1
    getDeviceList()
  }
})

onReachBottom(() => {
  // if (currentNav.value == "log") {
  //   getLogList()
  // }
  if (currentNav.value == 'device') {
    getDeviceList()
  }
  // if (currentNav.value == "customer") {
  //   getEquipmentStatistics();
  // }
})

const handleNavChange = (tab) => {
  currentNav.value = tab
  searchKey.value = ''
  currentTab.value = '0'
  if (currentNav.value == 'device') {
    page.value = 1
    getDeviceList()
  }
  if (currentNav.value == 'customer') {
    getEquipmentStatistics()
  }
  if (currentNav.value == 'log') {
    getLogList()
  }
}
const onSwiperChange = () => { }
const handleAddDevice = () => {
  uni.navigateTo({
    url: '/pages/index/scan/index',
  })
}

const handleDeviceClick = (device) => {
  uni.navigateTo({
    url: `/pages/device/detail/index?id=${device.deviceId}`,
  })
}
const handleOrderClick = (item) => {
  uni.setStorageSync('orderDetail', item)
  uni.navigateTo({
    url: `/pages/index/record/index`,
  })
}
const handleCustomerClick = (item) => {
  uni.setStorageSync('customerDetail', item)
  uni.navigateTo({
    url: `/pages/index/customer/index?phone=${item.phone}`,
  })
}

const hanldeStartDateChange = (e) => {
  startDate.value = e.detail.value
  if (new Date(startDate.value).getTime() > new Date(endDate.value).getTime()) {
    endDate.value = startDate.value
  }
}
const hanldeEndDateChange = (e) => {
  endDate.value = e.detail.value
  if (new Date(startDate.value).getTime() > new Date(endDate.value).getTime()) {
    startDate.value = endDate.value
  }
}
const getLogList = () => {
  getOrderList({
    arg: searchKey.value,
    startDate: startDate.value,
    endDate: endDate.value,
  }).then((res) => {
    logList.value = res
  })
}
const handleConfirm = () => {
  page.value = 1
  getLogList()
}
const handleDeviceAuthorizeClick = (item) => {
  if (!isAuthorized.value) {
    const func = loginType.value === 'ROLE_CUSTOMER' ? devicelLoadDeviceBaseInfo : loadDeviceBaseInfo
    func({ mes: item.sn }).then((res) => {
      if (loginType.value === 'ROLE_CUSTOMER') {
        uni.setStorageSync('deviceInfo', res)
        uni.navigateTo({
          url: '/pages/index/scan/detail/index',
        })
      } else {
        if (res.activeState == 2) {
          uni.showToast({
            title: '设备已激活',
            icon: 'none',
          })
        } else {
          uni.setStorageSync('deviceInfo', res)
          uni.navigateTo({
            url: '/pages/device/authorize/index',
          })
        }
      }
    })
  } else {
    uni.navigateTo({
      url: `/pages/device/detail/index?id=${item.deviceId}`,
    })
  }
}

// 处理案例点击
const handleCaseClick = (item) => {
  if (item.caseId) {
    uni.navigateTo({
      url: `/pages/case/detail/index?id=${item.caseId}`,
    })
  }
}

const goToInfo = () => {
  uni.navigateTo({
    url: `/pages/index/info/index`,
  })
}

const onRefresh = async () => {
  isRefreshing.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  } finally {
    isRefreshing.value = false
  }
}

onLoad(() => {
  if (uni.getStorageSync('token')) {
    loadBrands().then((res) => {
      brandList.value = [
        '全部类型',
        ...(res.map((v) => {
          brandListMap[v.text] = v.id
          return v.text
        }) || []),
      ]
    })
    deviceGroupMsg({}, { raw: true }).then((res) => {
      messageCount.value = res.total
    })
  }

  // 获取取这个月的第一天跟今天
  endDate.value = DateUtil.today()
  startDate.value = DateUtil.getFirstDayOfMonth()

})
const getBannerList = async () => {
  const data = await getBusinessCasePage()
  bannerList.value = data.homeSliderSet
}
onShow(() => {
  const data = uni.getStorageSync('userInfo')
  if (data) {
    userInfo.value = data
    loginType.value = data.role
    // #ifdef APP-IOS
    if (!data.phone && !uni.getStorageSync('navBindPhoneFlag')) {
      uni.navigateTo({
        url: '/pages/index/customer/bindPhone/index',
      })
    }
    // #endif
  }
  if (loginType.value == 'ROLE_CUSTOMER') {
    currentNav.value = 'device'
  } else {
    // currentNav.value = "customer";
  }
  if (data && data.token) {
    onSearch()
    // getBannerList()
  }
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: $bg-color;
  padding: 30rpx;
  padding-top: calc(var(--status-bar-height) + 40rpx);
}

.header {
  margin-bottom: 30rpx;

  .logo {
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid $bg-color-white;
  }

  .logo-img {
    // margin-left: -20rpx;
    width: 72.46rpx;
    height: 72.46rpx;
  }

  .logo-text {
    margin-left: 20rpx;
    font-size: 29rpx;
    color: $text-dark;
    margin-left: 10rpx;
  }
}

.user-info {
  margin-top: 42rpx;
}

.dear-info {
  margin-top: 24rpx;

  .user-id .tag {
    border-radius: 6rpx;
    background: $nav-bg;
    color: $text-white;
    font-size: 22rpx;
    padding: 4rpx 12rpx;
    border-radius: 6rpx;
    margin-right: 16rpx;
  }
}

.greeting {
  display: flex;
  flex-direction: column;
  // align-items: center;
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
  color: $active-color;
  display: flex;
  align-items: center;
  font-size: 44rpx;
}

.user-id {
  position: relative;
  margin-top: 10rpx;
  display: flex;
  align-items: center;
}

.setting {
  position: absolute;
  top: 0rpx;
  right: 0rpx;
  display: flex;
  align-items: center;
}

.setting-item {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: $warning-color;
  position: relative;

  .message-count {
    position: absolute;
    top: -16rpx;
    right: -10rpx;
    height: 36rpx;
    min-width: 36rpx;
    line-height: 36rpx;
    font-size: 22rpx;
    border-radius: 50%;
    padding: 0rpx 12rpx;
    background: $error-color;
    color: $text-white;
  }
}

.setting-item:first-child {
  margin-right: 20rpx;
  color: $active-color;
}

.setting-item .icon {
  margin-left: 10rpx;
  width: 44rpx;
  height: 44rpx;
}

.user-id .tag {
  background: $warning-color;
  color: $text-white;
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  margin-right: 10rpx;
}

.user-id text {
  color: $text-secondary;
  font-size: 28rpx;
}

.banner {
  width: 100%;
  height: 320rpx;
  border-radius: 12rpx;
  margin-top: 36rpx;
  object-fit: cover;

  .banner-image {
    width: 100%;
    height: 100%;
    border-radius: 12rpx;
  }
}

.search-bar {
  margin-bottom: 0rpx;
  display: flex;
  align-items: center;
}

.search-input {
  flex: 1;
  background: $bg-color-card;
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
  color: $text-dark;
  font-size: 26rpx;
  background: transparent;
  border: none;
}

.btn.primary {
  width: 260rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $accent-color;
  color: $text-white;
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
  color: $active-color;
  font-size: 32rpx;
}

.type {
  margin-top: 52rpx;
  color: $active-color;
  font-size: 25rpx;

  &::after {
    content: '';
    // 画一个向下的箭头
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 10rpx solid transparent;
    border-right: 10rpx solid transparent;
    border-top: 12rpx solid #61d4cc; // chart color
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
  margin-top: 14rpx;
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
    color: $text-secondary;
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
    background: $error-color;
  }
}

.auth-status-tabs {
  height: 100rpx;
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin: 4rpx 0rpx 24rpx 0rpx;

  .auth-status-label {
    color: $active-color;
    font-size: 29rpx;
    margin-right: 32rpx;
  }

  .status-btn-group {
    display: flex;
    border-radius: 8rpx;
    overflow: hidden;

    .status-btn {
      background: $text-white;
      color: $active-color;
      font-size: 22rpx;
      // border-radius: 12rpx;
      padding: 0 32rpx;
      height: 56rpx;
      line-height: 52rpx;
      border: 4rpx solid $active-color;

      &.active {
        background: $active-color;
        color: $text-white;
      }
    }
  }
}

.tab-item {
  padding: 24rpx 30rpx;
  color: $text-secondary;
  font-size: 28rpx;
  position: relative;
  cursor: pointer;
}

.tab-item .count {
  color: $text-secondary;
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
  height: 6rpx;
  background: $error-color;
}

.device-num {
  margin-top: 33rpx;
  color: $text-secondary;
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
  background: $bg-color-card;
  border-radius: 12rpx;
  padding: 60rpx 30rpx 30rpx;
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
  width: 336rpx;
  height: 180rpx;
  border-radius: 18rpx;
  background: #fff;
  // box-shadow: 0px 4rpx 8rpx #00000024;
  box-shadow: 0rpx 4rpx 10rpx #00000050;

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
  color: $active-color;
  font-size: 28rpx;
  margin-bottom: 10rpx;
  display: block;
}

.device-info .model {
  color: $border-color-light;
  font-size: 24rpx;
  max-width: 160rpx;
  // 两行省略号
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.device-list {
  .device-info .name {
    color: $active-color;
    font-size: 28rpx;
    min-height: 60rpx;
    margin-bottom: 0rpx;
    display: block;
  }

  .device-info .model {
    margin-bottom: 20rpx;
  }
}

.device-status {
  position: absolute;
  display: flex;
  top: 0px;
  align-items: center;

  .tag {
    padding: 2rpx 12rpx;
    border-radius: 0rpx;
    font-size: 24rpx;
    color: $active-color;
  }

  .tag.tag-1 {
    background: #cfb55f; // chart color
  }

  .tag.tag-0 {
    background: #fa927a; // chart color
  }

  .tag.tag-2 {
    background: #629cde; // chart color
  }
}

.device-list1 {
  .device-item1 {
    background: $text-white;
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
        color: $active-color;
        font-size: 29rpx;
        margin-bottom: 8rpx;
      }

      .device-sn {
        color: $border-color-light;
        font-size: 25rpx;
        margin-top: 10rpx;
        margin-bottom: 4rpx;
        display: block;
      }

      .device-order {
        color: $text-secondary;
        font-size: 25rpx;
        margin-top: 10rpx;
        margin-bottom: 4rpx;
        display: block;
      }

      .device-sn {
        color: $text-secondary;
        // margin-top: 10rpx;
      }
    }

    .signal-icon {
      width: 36rpx;
      height: 36rpx;
      margin-left: 12rpx;
      margin-bottom: 80rpx;
    }

    .auth-action-btn {
      background: $warning-color;
      color: $text-white;
      font-size: 22rpx;
      border-radius: 36rpx;
      width: 108rpx;
      height: 54rpx;
      line-height: 54rpx;
      border: none;
      position: absolute;
      right: 24rpx;
      bottom: 24rpx;
    }

    .auth-status {
      color: $accent-color;
      font-size: 25rpx;
      position: absolute;
      right: 24rpx;
      bottom: 32rpx;
    }

    .blue {
      color: $link-color;
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
  color: $active-color;
}

.status-tags .tag.warning {
  background: #cfb55f; // chart color
}

.status-tags .tag.error {
  background: #fa927a; // chart color
}

.status-tags .tag.change {
  background: #629cde; // chart color
}

.placeholder {
  color: $text-secondary;
}

.customer-list {
  // margin: 24rpx 24rpx 0 24rpx;

  .customer-item {
    background: $text-white;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    padding: 30rpx;
    margin-bottom: 24rpx;

    .avatar {
      width: 90rpx;
      height: 90rpx;
      border-radius: 50%;
      background: #e5e9f2; // chart color
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
        margin-bottom: 10rpx;
        margin-top: -2rpx;

        .name {
          color: $active-color;
          font-size: 29rpx;
          margin-right: 31rpx;
        }

        .edit-icon {
          width: 36rpx;
          height: 36rpx;
        }
      }

      .phone {
        color: $text-secondary;
        font-size: 25rpx;
        margin-top: 20rpx;
      }
    }

    .device-count {
      color: $text-secondary;
      font-size: 36rpx;
      display: flex;
      align-items: center;

      .right-arrow {
        margin-left: 10rpx;
        width: 14rpx;
        height: 14rpx;
        border-top: 2rpx solid $text-secondary;
        border-right: 2rpx solid $text-secondary;
        // border-left: 18rpx solid #fff;
        transform: rotate(45deg);
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}

.date-picker {
  // margin: 12rpx;
  margin-top: 34rpx;
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;

  .picker-item {
    min-width: 224rpx;
    flex: 1;
    height: 65.22rpx;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    border-radius: 9rpx;
    background: $bg-color-card;

    text {
      color: $text-secondary;
      font-size: 25rpx;
    }

    .arrow-icon {
      // 箭头图标样式
      width: 0;
      height: 0;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      border-top: 12rpx solid $border-color-light;
      margin-left: 4rpx;
      display: inline-block;
      vertical-align: middle;
    }
  }

  .picker-separator {
    color: $text-secondary;
    font-size: 28rpx;
    padding: 0 20rpx;
  }

  .confirm-btn {
    color: $text-white;
    font-size: 25rpx;
    border-radius: 12rpx;
    margin-left: 40rpx;
    text-align: center;
    width: 130rpx;
    line-height: 65rpx;
    height: 65rpx;
    border-radius: 36rpx;
    background: $active-color;
  }
}
</style>
