<template>
  <view class="customer-detail-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back" @click="handleBack">
        <text class="iconfont icon-back">&#xe8ef;</text>
      </view>
      <text class="title">客户详情</text>
    </view>
    <!-- 客户信息 -->
    <view class="customer-info">
      <image
        class="avatar"
        src="/static/images/avatar-default.png"
        mode="aspectFit"
      ></image>
      <view class="info">
        <text class="name">{{ customer.name }}</text>
        <text class="phone">{{ customer.phone }}</text>
      </view>
      <view class="edit-btn" @click="handleEdit">
        <text class="iconfont">&#xe6e3;</text>
      </view>
    </view>
    <!-- 搜索框 -->
    <view class="search-bar">
      <text class="iconfont icon-search">&#xe65c;</text>
      <input
        class="search-input"
        type="text"
        v-model="search"
        placeholder="SN码/安装位置"
        placeholder-class="placeholder"
      />
    </view>

    <!-- 客户设备筛选 -->
    <view class="device-filter-row">
      <text class="section-title">客户设备</text>
      <view class="type-select" @click="showTypeSelect">
        <text>{{ currentType }}</text>
        <text class="iconfont icon-arrow">&#xe65c;</text>
      </view>
    </view>
    <view class="device-tabs">
      <view
        v-for="tab in tabs"
        :key="tab"
        :class="['tab', { active: tab === currentTab }]"
        @click="currentTab = tab"
      >
        {{ tab }}
      </view>
      <view
        class="tab-underline"
        :style="{
          left: `${(tabs.indexOf(currentTab) * 100) / tabs.length}%`,
          width: `${100 / tabs.length}%`,
        }"
      ></view>
    </view>
    <view class="device-count">设备：{{ deviceList.length }}</view>

    <!-- 设备卡片列表 -->
    <view class="device-list">
      <view v-for="(device, idx) in deviceList" :key="idx" class="device-card">
        <image class="device-img" :src="device.img" mode="aspectFit"></image>
        <view class="device-info">
          <view class="device-tags">
            <text
              v-for="tag in device.tags"
              :key="tag"
              :class="['tag', tagMap[tag]]"
              >{{ tag }}</text
            >
          </view>
          <text class="device-location">{{ device.location }}</text>
          <text class="device-model">{{ device.model }}</text>
        </view>
        <view class="signal-icon" :class="{ offline: device.offline }">
          <text class="iconfont">&#xe8c4;</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

const customer = reactive({
  name: "陈霞",
  phone: "13467458906",
});

const search = ref("");
const currentType = ref("全部类型");
const tabs = ["全部", "正常", "离线", "停用", "故障", "换芯"];
const currentTab = ref("全部");

const deviceList = reactive([
  {
    img: "/static/images/device1.png",
    tags: [],
    location: "一楼前台",
    model: "S800-2",
    offline: false,
  },
  {
    img: "/static/images/device2.png",
    tags: ["换芯"],
    location: "茶水间",
    model: "RO508",
    offline: false,
  },
  {
    img: "/static/images/device1.png",
    tags: ["故障", "到期", "换芯"],
    location: "会议室",
    model: "S800-2",
    offline: false,
  },
  {
    img: "/static/images/device3.png",
    tags: ["故障"],
    location: "企业展厅",
    model: "RO508",
    offline: true,
  },
]);

const tagMap = {
  故障: "tag-error",
  到期: "tag-expire",
  换芯: "tag-filter",
};

const handleBack = () => {
  uni.navigateBack();
};
const handleEdit = () => {
  uni.navigateTo({ url: "/pages/index/customer/edit/index" });
};
const showTypeSelect = () => {
  // TODO: 显示类型选择弹窗
};
</script>

<style lang="scss" scoped>
.customer-detail-container {
  min-height: 100vh;
  background: #1c2431;
  padding-bottom: 40rpx;
}
.nav-bar {
  position: relative;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  .back {
    position: absolute;
    left: 30rpx;
    font-size: 40rpx;
  }
  .title {
    font-size: 36rpx;
  }
}
.customer-info {
  display: flex;
  align-items: center;
  padding: 40rpx 30rpx 20rpx 30rpx;
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
    font-size: 36rpx;
    color: #bfc9d6;
    padding: 10rpx;
  }
}
.search-bar {
  margin: 0 30rpx 20rpx 30rpx;
  background: #2d3c58;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  height: 64rpx;
  .icon-search {
    font-size: 32rpx;
    color: #bfc9d6;
    margin-right: 16rpx;
  }
  .search-input {
    flex: 1;
    color: #fff;
    font-size: 28rpx;
    background: transparent;
    border: none;
    outline: none;
  }
  .placeholder {
    color: #bfc9d6;
  }
}
.device-filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 30rpx 0 30rpx;
  .section-title {
    color: #fff;
    font-size: 28rpx;
    font-weight: bold;
  }
  .type-select {
    color: #7ee6d2;
    font-size: 26rpx;
    display: flex;
    align-items: center;
    .icon-arrow {
      font-size: 24rpx;
      margin-left: 4rpx;
    }
  }
}
.device-tabs {
  display: flex;
  position: relative;
  margin: 20rpx 0 0 0;
  padding: 0 30rpx;
  background: transparent;
  .tab {
    flex: 1;
    text-align: center;
    color: #bfc9d6;
    font-size: 28rpx;
    padding: 18rpx 0 12rpx 0;
    position: relative;
    z-index: 1;
    &.active {
      color: #d28b0a;
      font-weight: bold;
    }
  }
  .tab-underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4rpx;
    background: #d28b0a;
    border-radius: 2rpx;
    transition: left 0.2s;
    z-index: 2;
  }
}
.device-count {
  color: #bfc9d6;
  font-size: 24rpx;
  margin: 0 30rpx 10rpx 30rpx;
}
.device-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
  padding: 0 30rpx;
  margin-top: 10rpx;
  .device-card {
    width: calc(50% - 12rpx);
    background: linear-gradient(135deg, #26314a 0%, #22304a 100%);
    border-radius: 16rpx;
    padding: 30rpx 24rpx 24rpx 24rpx;
    margin-bottom: 24rpx;
    position: relative;
    display: flex;
    flex-direction: column;
    .device-img {
      width: 100rpx;
      height: 120rpx;
      margin-bottom: 10rpx;
      align-self: center;
    }
    .device-info {
      .device-tags {
        margin-bottom: 8rpx;
        .tag {
          display: inline-block;
          padding: 2rpx 16rpx;
          border-radius: 8rpx;
          font-size: 22rpx;
          margin-right: 8rpx;
          color: #fff;
          &.tag-error {
            background: #ff7e7e;
          }
          &.tag-expire {
            background: #ffd16a;
            color: #b97a00;
          }
          &.tag-filter {
            background: #7ee6d2;
            color: #0a6c5c;
          }
        }
      }
      .device-location {
        color: #fff;
        font-size: 28rpx;
        font-weight: bold;
      }
      .device-model {
        color: #bfc9d6;
        font-size: 24rpx;
        margin-top: 2rpx;
      }
    }
    .signal-icon {
      position: absolute;
      top: 24rpx;
      right: 24rpx;
      color: #7ee6d2;
      font-size: 32rpx;
      &.offline {
        color: #ff7e7e;
      }
    }
  }
}
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-back:before {
  content: "\e8ef";
}
.icon-arrow:before {
  content: "\e65c";
}
</style>
