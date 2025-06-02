<template>
  <view class="customer-detail-container">
    <!-- 客户信息 -->
    <view class="customer-info">
      <image class="avatar" src="/static/images/avatar.png" mode="aspectFit"></image>
      <view class="info">
        <text class="name">{{ customerData.detail.remark }}</text>
        <text class="phone">{{ customerData.detail.phone }}</text>
      </view>
      <image src="/static/images/icon-edit.png" class="edit-btn" @click="handleEdit">
      </image>
    </view>
    <view class="search-bar flex-between">
      <view class="search-input flex-center">
        <image src="/static/images/icon-search.png" mode="aspectFit" class="icon small" />
        <input type="text" v-model="searchKeyword" @confirm="handleSearch" placeholder="SN码/安装位置"
          placeholder-class="placeholder" />
      </view>
    </view>
    <view class="flex-between">
      <view class="my"> 客户设备 </view>

      <picker @change="onBrandPickerChange" :value="brandIndex" :range="brandList">
        <view class="type"> {{ brandList[brandIndex] }} </view>
      </picker>
    </view>
    <!-- 设备状态标签 -->
    <scroll-view scroll-x class="status-tabs" :show-scrollbar="false">
      <view class="tab-list">
        <view v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: currentTab === tab.value }"
          @tap="handleTabChange(tab.value)">
          {{ tab.label }}
          <!-- <text v-if="tab.count" class="count">({{ tab.count }})</text> -->
        </view>
      </view>
    </scroll-view>
    <view class="device-num">设备：{{ customerData.list.length }} </view>
    <!-- <scroll-view
      class="device-scroll"
      scroll-y
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
    > -->
    <view v-if="customerData.list.length" class="device-list">
      <view v-for="(device, index) in customerData.list" :key="index" class="device-item"
        @tap="handleDeviceClick(device)">
        <image :src="device.productUrl || '/static/images/device.png'" mode="aspectFit" class="device-icon" />
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
    <view v-if="!customerData.list.length" class="empty">
      <image src="/static/images/empty.png" mode="aspectFit" class="empty-img" />
      <view class="empty-text"> 暂无设备 </view>
    </view>
    <!-- </scroll-view> -->
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getCustomerDevices, loadBrands, getCustomerInfo } from "@/api/dealer";
import { onLoad, onShow } from "@dcloudio/uni-app";
// import store from "@/store";
// 从缓存里获取登录类型
const searchKeyword = ref("");
const customerData = reactive({
  detail: { name: "", phone: "" },
  list: [],
});
const brandList = ref([]);
const brandIndex = ref(0);
const brandListMap = {}

onLoad(() => {
  const customerDetail = uni.getStorageSync("customerDetail");
  customerData.detail = customerDetail;

  getCustomerDevicesList();

  loadBrands().then((res) => {
    brandList.value = ["全部类型", ...(res.map(v => {
      brandListMap[v.text] = v.id
      return v.text
    }) || [])];
  });
});

onShow(() => {
  getCustomerInfo({ phone: customerData.detail.phone }).then((res) => {
    customerData.detail = res;
  });
});

const tabs = ref([
  { label: "全部", value: "0", count: 12 },
  { label: "正常", value: "1", count: 8 },
  { label: "离线", value: "2", count: 2 },
  { label: "停用", value: "3", count: 0 },
  { label: "故障", value: "4", count: 1 },
  { label: "换芯", value: "5", count: 1 },
]);

const currentTab = ref("0");

const isRefreshing = ref(false);

const getCustomerDevicesList = async () => {
  try {
    const res = await getCustomerDevices({
      phone: customerData.detail.phone,
      tab: currentTab.value,
      arg: searchKeyword.value,
      brand: brandIndex.value != 0 ? brandListMap[brandList.value[brandIndex.value]] : "",
    });
    customerData.list = res;
  } catch (error) {
    console.error("获取设备列表失败", error);
  }
};
const onBrandPickerChange = (e) => {
  brandIndex.value = e.detail.value;
  getCustomerDevicesList();
};
const handleTabChange = (tab) => {
  currentTab.value = tab;
  getCustomerDevicesList();
};

const handleSearch = () => {
  getCustomerDevicesList();
};

const handleEdit = () => {
  uni.navigateTo({
    url: `/pages/index/customer/edit/index?phone=${customerData.detail.phone}`,
  });
};

const handleDeviceClick = (device) => {
  uni.navigateTo({
    url: `/pages/device/detail/index?id=${device.deviceId}`,
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
</script>

<style lang="scss" scoped>
.customer-detail-container {
  min-height: 100vh;
  padding: 26rpx;
  background: $bg-color;
}

.customer-info {
  display: flex;
  align-items: center;
  padding: 20rpx 10rpx 30rpx 0rpx;

  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background: #2d3c58;
    margin-right: 24rpx;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;

    .name {
      color: #fff;
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 8rpx;
    }

    .phone {
      color: #bfc9d6;
      font-size: 26rpx;
    }
  }

  .edit-btn {
    margin-bottom: 40rpx;
    width: 36rpx;
    height: 36rpx;
  }
}

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
  margin-bottom: 40rpx;
  display: flex;
  align-items: center;
}

.search-input {
  flex: 1;
  background: #2d3c58;
  height: 80rpx;
  border-radius: 90rpx;
  padding: 0 30rpx;
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
  margin-top: 10rpx;
  color: #fff;
  font-size: 32rpx;
}

.type {
  margin-top: 10rpx;
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
  margin-bottom: 33rpx;
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
  margin-bottom: 40rpx;
  display: block;
  // 省略号
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.device-info .model {
  color: #c7c7c7;
  font-size: 24rpx;
}

.device-status {
  position: absolute;
  display: flex;
  top: 0px;
  align-items: center;
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

.status-tags .tag.tag-1 {
  background: #cfb55f;
}

.status-tags .tag.tag-0 {
  background: #fa927a;
}

.status-tags .tag.tag-2 {
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
