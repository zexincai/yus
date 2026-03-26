<template>
  <view class="share-account-container">
    <!-- 当前设备共享成员 -->
    <view class="current-members-section">
      <text class="section-title">当前设备共享成员：</text>
      <view v-if="detail.machineShares.length" class="info-list">
        <view
          @click="handleEditShareByPhone(item)"
          v-for="(item, index) in detail.machineShares"
          :key="index"
          class="info-item"
        >
          <view class="info-label">
            <image
              class="image"
              src="/static/images/user.png"
              mode="aspectFit"
            ></image>
            {{ item.shareName }}
          </view>
          <text class="info-value"></text>
        </view>
      </view>
      <view v-else class="empty-state">
        <image
          class="empty-image"
          src="/static/images/empty.png"
          mode="aspectFit"
        ></image>
        <text class="empty-text">当前尚未添加共享成员</text>
      </view>
    </view>

    <!-- 选择共享方式 -->
    <view class="share-method-section">
      <text class="section-title">选择共享方式：</text>
      <view
        v-for="(item, index) in detail.shareTypes"
        :key="index"
        class="method-item"
        @click="handleShareByPhone"
      >
        <image
          class="method-icon-wrapper"
          src="/static/images/phone.png"
          mode="aspectFit"
        />
        <text class="method-text">{{ item.name }}</text>
        <text class="iconfont arrow-icon"></text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getShareUserPage } from '@/api/dealer'

const deviceId = ref('')
const detail = ref({
  machineShares: [],
  shareTypes: [],
})
const getData = async () => {
  const resp = await getShareUserPage({
    deviceId: deviceId.value,
  })
  detail.value = resp
}

onLoad(({ id }) => {
  deviceId.value = id
})

onShow(() => {
  getData()
})
// 返回上一页
const handleBack = () => {
  uni.navigateBack()
}

// 处理通过手机号共享
const handleShareByPhone = () => {
  uni.navigateTo({
    url: `/pages/device/share/add/index?id=${deviceId.value}`,
  })
}

const handleEditShareByPhone = (res) => {
  uni.setStorageSync('shareUser', res)
  uni.navigateTo({
    url: `/pages/device/share/add/index?id=${deviceId.value}&action=EDIT`,
  })
}
</script>

<style lang="scss" scoped>
.share-account-container {
  min-height: 100vh;
  background-color: $bg-color-dark; // 深蓝色背景
  color: $text-white; // 白色文字
  padding-top: var(--status-bar-height); // 适配状态栏
}

.section-title {
  font-size: 28rpx;
  color: $text-white;
  padding: 30rpx;
}

.current-members-section {
  display: flex;
  flex-direction: column;

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60rpx 0;

    .empty-image {
      width: 240rpx;
      height: 240rpx;
      margin-bottom: 30rpx;
    }

    .empty-text {
      font-size: 28rpx;
      color: $text-dark;
    }
  }
}

.share-method-section {
  padding: 0 0rpx 20rpx;

  .method-item {
    margin: 40rpx 30rpx 0;
    // width: 688rpx;
    height: 90rpx;
    background: $bg-color-light;
    background-color: $bg-color-white;
    border-radius: 16rpx;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    color: $text-primary;

    .method-icon-wrapper {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      // background-color: #4a90e2;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;

      .iconfont {
        font-size: 32rpx;
        color: $text-white;
      }
    }

    .method-text {
      flex-grow: 1;
      font-size: 30rpx;
    }

    .icon-arrow-right {
      font-size: 28rpx;
      color: $border-color-light;
    }
    .arrow-icon {
      margin-left: 20rpx;
      width: 16rpx;
      height: 16rpx;
      border-top: 2rpx solid $border-color-light;
      border-right: 2rpx solid $border-color-light;
      // border-left: 18rpx solid #fff;
      transform: rotate(45deg);
      display: inline-block;
      vertical-align: middle;
    }
  }
}

// iconfont样式
.iconfont {
  font-family: 'iconfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.info-list {
  margin: 10rpx 30rpx 60rpx;
  border-radius: 18rpx;
  background: $bg-color-light;
  // margin-top: 27rpx;

  .info-item {
    display: flex;
    align-items: center;
    margin: 0 30rpx;
    height: 89rpx;
    border-bottom: 2rpx solid $border-color-input;
    justify-content: space-between;

    &:last-child {
      border-bottom: none;
    }

    .info-label {
      color: $nav-bg;
      font-size: 25rpx;
      display: flex;
      align-items: center;
      .image {
        margin-right: 14rpx;
        width: 44rpx;
        height: 44rpx;
      }
    }

    .info-value {
      margin-left: 20rpx;
      width: 16rpx;
      height: 16rpx;
      border-top: 2rpx solid $border-color-light;
      border-right: 2rpx solid $border-color-light;
      // border-left: 18rpx solid #fff;
      transform: rotate(45deg);
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
