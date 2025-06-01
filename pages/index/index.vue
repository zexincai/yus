<template>
  <view class="container">
    <!-- 顶部用户信息 -->
    <view class="header">
      <view class="logo">
        <image class="logo-img" src="/static/images/header-logo.png" mode="aspectFit" />
      </view>
      <view v-if="loginType == 'ROLE_DEALER'" class="dear-info">
        <view class="greeting flex-between">
          <view @click="goToInfo" class="name">
            Hi,{{ userInfo.name }}
            <image class="icon" src="/static/images/setting-active.png" />
          </view>
          <view class="user-id">
            <text class="tag">经销商</text>
            <text>{{ userInfo.phone }}</text>
          </view>
        </view>
      </view>
      <view v-else class="user-info">
        <view class="greeting flex-between">
          <view @click="goToInfo" class="name">
            Hi,{{ userInfo.name }}
            <image class="icon" src="/static/images/setting-active.png" />
          </view>
          <view class="user-id">
            <text class="tag">用户</text>
            <text>{{ userInfo.phone }}</text>
          </view>
        </view>
      </view>
      <image @click="handelbanner" src="/static/images/banner.png" mode="aspectFill" class="banner" />
    </view>
    <view v-if="loginType == 'ROLE_DEALER'" class="nav-list">
      <view v-for="(tab, index) in navTabs" :key="index" class="nav-item" :class="{ active: currentNav === tab.value }"
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
        <input v-if="currentNav == 'log'" type="text" placeholder="订单" placeholder-class="placeholder" />
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

      <picker @change="onBrandPickerChange" :value="brandIndex" :range="brandList">
        <view class="type"> {{ brandList[brandIndex] }} </view>
      </picker>
    </view>
    <!-- 设备状态标签 -->
    <scroll-view v-if="
      !(
        loginType == 'ROLE_DEALER' &&
        (currentNav == 'device' || currentNav == 'log')
      )
    " scroll-x class="status-tabs" :show-scrollbar="false">
      <view class="tab-list">
        <view v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: currentTab === tab.value }"
          @tap="handleTabChange(tab.value)">
          {{ tab.label }}
        </view>
      </view>
    </scroll-view>


    <view v-if="loginType == 'ROLE_CUSTOMER'" class="device-num">设备：{{ deviceList.length }}</view>
    <view v-if="loginType == 'ROLE_DEALER' && currentNav == 'customer'" class="device-num">
      客户:
      <view style="display: inline-block; margin-right: 20rpx">{{
        customerData.customerNum
      }}</view>
      设备：{{ customerData.deviceNum }}
    </view>

    <view v-if="loginType == 'ROLE_DEALER' && currentNav == 'device'" class="auth-status-tabs">
      <text v-if="!isAuthorized" class="auth-status-label">未授权设备：0</text>
      <text v-if="isAuthorized" class="auth-status-label">已授权设备：{{ deviceList.length }}</text>
      <view class="status-btn-group">
        <view :class="['status-btn', { active: !isAuthorized }]" @click="isAuthorized = false">未授权</view>
        <view :class="['status-btn', { active: isAuthorized }]" @click="isAuthorized = true">已授权</view>
      </view>
    </view>
    <view v-if="loginType == 'ROLE_DEALER' && currentNav == 'log'" class="device-num">出库订单：0</view>
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
          <view @tap="handleCustomerClick(item)" class="customer-item" v-for="item in customerData.users"
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
        <template v-if="!isAuthorized">
          <view class="empty">
            <image src="/static/images/empty.png" mode="aspectFit" class="empty-img" />
            <view class="empty-text"> 暂无数据 </view>
          </view>
        </template>
        <view v-else @tap="handleDeviceAuthorizeClick(item)" class="device-item1" v-for="item in deviceList"
          :key="item.sn">
          <image class="device-img" :src="item.productUrl || '/static/images/device.png'" />
          <view class="device-info">
            <text class="device-title">{{ item.brand }}</text>
            <text class="device-sn">SN:{{ item.sn }}</text>
            <text class="device-order">订单：{{ item.orderNo || "--" }}</text>
          </view>
          <image class="signal-icon" :src="item.rssiUrl" />
          <button class="auth-action-btn" v-if="!isAuthorized">授权</button>
          <view :class="{ blue: item.buyout != 1 }" class="auth-status" v-else>{{ item.label }}</view>
        </view>
      </view>
      <view v-if="currentNav === 'log'" class="customer-list">
        <template v-if="false">
          <view @tap="handleCustomerClick(item)" class="customer-item" v-for="item in customerData.users"
            :key="item.phone">
            <view class="avatar">
              <image src="/static/images/avatar.png" class="avatar-img" />
            </view>
            <view class="customer-info">
              <view class="name-row">
                <text class="name">订单：{{ item.name }}</text>
                <image src="/static/images/icon-edit.png" class="edit-icon" />
              </view>
              <text class="phone">出库时间：{{ item.phone }}</text>
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
import { ref, computed } from "vue";
import store from "@/store";
import { onShow, onLoad } from "@dcloudio/uni-app";
import { equipmentStatistics, loadBrands, searchDevices, customerDevices } from "@/api/dealer";
// 从缓存里获取登录类型
let loginType = ref("");
let userInfo = ref({});
let searchKey = ref("");
let page = ref(1);
let brand = ref("");
const brandList = ref([]);
const brandIndex = ref(0);

const tabs = ref([
  { label: "全部", value: "0", count: 12 },
  { label: "正常", value: "1", count: 8 },
  { label: "离线", value: "2", count: 2 },
  { label: "停用", value: "3", count: 0 },
  { label: "故障", value: "4", count: 1 },
  { label: "换芯", value: "5", count: 1 },
]);

const navTabs = ref([
  { label: "我的客户", value: "customer" },
  { label: "授权设备", value: "device" },
  { label: "出库记录", value: "log" },
]);
const customers = ref([
  { id: 1, name: "陈霞", phone: "13467458906", deviceCount: 16 },
  { id: 2, name: "张国莉", phone: "17834902226", deviceCount: 8 },
]);

const customerData = ref({
  customerNum: 0,
  deviceNum: 0,
  users: [],
});
const currentTab = ref("0");
const currentNav = ref("customer");
const isAuthorized = ref(true);
const deviceList = ref([
]);
const devices = ref([
  {
    id: 1,
    name: "一楼前台",
    model: "S800-2",
    icon: "/static/images/device.png",
    status: "normal",
    signalIcon: "/static/images/signal-full.png",
    tags: [],
  },
  {
    id: 2,
    name: "茶水间",
    model: "RO508",
    icon: "/static/images/device.png",
    status: "change",
    signalIcon: "/static/images/signal-full.png",
    tags: [{ type: "change", text: "换芯" }],
  },
  {
    id: 3,
    name: "会议室",
    model: "S800-2",
    icon: "/static/images/device.png",
    status: "error",
    signalIcon: "/static/images/signal-full.png",
    tags: [
      { type: "error", text: "故障" },
      { type: "warning", text: "到期" },
      { type: "change", text: "换芯" },
    ],
  },
  {
    id: 4,
    name: "企业展厅",
    model: "RO508",
    icon: "/static/images/device.png",
    status: "error",
    signalIcon: "/static/images/signal-low.png",
    tags: [{ type: "error", text: "故障" }],
  },
]);


const isRefreshing = ref(false);

const getEquipmentStatistics = () => {
  equipmentStatistics({ tab: currentTab.value, arg: searchKey.value }).then(
    (res) => {
      console.log("res", res);
      customerData.value = res;
    }
  );
};
const getDeviceList = () => {
  if (loginType.value === 'ROLE_DEALER') {
    searchDevices({
      tab: isAuthorized.value ? 1 : 0,
      arg: searchKey.value,
      current: page.value,
      size: 10,
    }).then((res) => {
      deviceList.value = res;
      if (res.length) {
        page.value++;
      }
    });
  } else {
    customerDevices({
      tab: currentTab.value,
      arg: searchKey.value,
      brand: brandIndex.value != 0 ? brandList.value[brandIndex.value] : "",
      current: page.value,
      size: 10,
    }).then((res) => {
      deviceList.value = res
      if (res.length) {
        page.value++;
      }
    })
  }
};

const onSearch = () => {
  if (currentNav.value == "customer") {
    getEquipmentStatistics();
  }
  if (currentNav.value == "device") {
    page.value = 1;
    getDeviceList();
  }
};
const onBrandPickerChange = (e) => {
  brandIndex.value = e.detail.value;
  onSearch();
};
const handleTabChange = (tab) => {
  currentTab.value = tab;
  if (loginType.value == 'ROLE_CUSTOMER') {
    page.value = 1;
    getDeviceList();
  } else {
    getEquipmentStatistics();
  }
};

const handleNavChange = (tab) => {
  currentNav.value = tab;
  searchKey.value = "";
  currentTab.value = "0";
  if (currentNav.value == "device") {
    page.value = 1;
    getDeviceList();
  }
  if (currentNav.value == "customer") {
    getEquipmentStatistics();
  }
};

const handleAddDevice = () => {
  uni.navigateTo({
    url: "/pages/index/scan/index",
  });
};

const handleDeviceClick = (device) => {
  uni.navigateTo({
    url: `/pages/device/detail/index?id=${device.deviceId}`,
  });
};

const handleCustomerClick = (item) => {
  uni.setStorageSync("customerDetail", item);
  uni.navigateTo({
    url: `/pages/index/customer/index?phone=${item.phone}`,
  });
};
const handleDeviceAuthorizeClick = (item) => {
  uni.navigateTo({
    url: `/pages/device/detail/index?id=${item.deviceId}`,
  });
};

const handelbanner = (device) => {
  // uni.navigateTo({
  //   url: `/pages/device/detail/index?id=${device.id}`,
  // });
};

const goToInfo = () => {
  uni.navigateTo({
    url: `/pages/index/info/index`,
  });
};

const onRefresh = async () => {
  isRefreshing.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } finally {
    isRefreshing.value = false;
  }
};
onLoad(() => {
  loadBrands().then((res) => {
    brandList.value = ["全部类型", ...(res || [])];
  });
})
onShow(() => {
  const data = uni.getStorageSync("userInfo");
  if (data) {
    userInfo.value = data;
    loginType.value = data.role;
  }
  if (loginType.value == 'ROLE_CUSTOMER') {
    currentNav.value = "device";
  }
  onSearch();
});
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
    background: #13337cff;
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
  background: #d68f01;
  color: #fff;
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  margin-right: 10rpx;
}

.user-id text {
  color: #c7c7c7;
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
  background: #2d3c58;
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
  background: #d68f01;
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
    content: "";
    // 画一个向下的箭头
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 10rpx solid transparent;
    border-right: 10rpx solid transparent;
    border-top: 12rpx solid #61d4cc;
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
    color: #a5bfe8;
    position: relative;
    cursor: pointer;
  }

  .nav-item.active {
    color: $active-color;
  }

  .nav-item.active::after {
    content: "";
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
    border-radius: 8rpx;
    overflow: hidden;

    .status-btn {
      background: #152136ff;
      color: #fff;
      font-size: 22rpx;
      // border-radius: 12rpx;
      padding: 0 32rpx;
      height: 56rpx;
      line-height: 52rpx;
      border: 4rpx solid #fff;

      &.active {
        background: #fff;
        color: #152136;
      }
    }
  }
}

.tab-item {
  padding: 24rpx 30rpx;
  color: #a5bfe8;
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
  content: "";
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
  background: #2d3c58;
  border-radius: 12rpx;
  padding: 60rpx 30rpx 30rpx;
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
  width: 336rpx;
  height: 180rpx;
  border-radius: 18rpx;
  background: linear-gradient(90deg, #324a70 0%, #324a70 100%);
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
  color: #c7c7c7;
  font-size: 24rpx;
}

.device-list {
  .device-info .name {
    color: #fff;
    font-size: 28rpx;
    margin-bottom: 40rpx;
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
    color: #fff;
  }

  .tag.tag-1 {
    background: #cfb55f;
  }

  .tag.tag-0 {
    background: #fa927a;
  }

  .tag.tag-2 {
    background: #629cde;
  }

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
        font-size: 29rpx;
        margin-bottom: 8rpx;
      }

      .device-sn,
      .device-order {
        color: #c7c7c7ff;
        font-size: 25rpx;
        margin-top: 10rpx;
        margin-bottom: 4rpx;
        display: block;
      }

      .device-sn {
        color: #fff;
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
      color: #d68f01;
      font-size: 25rpx;
      position: absolute;
      right: 24rpx;
      bottom: 32rpx;
    }

    .blue {
      color: #0ecbf7ff;
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
  background: #cfb55f;
}

.status-tags .tag.error {
  background: #fa927a;
}

.status-tags .tag.change {
  background: #629cde;
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
        color: #c7c7c7ff;
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
