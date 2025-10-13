<template>
  <view class="scan-container">
    <!-- 扫码区域 -->
    <view class="scan-card" @click="handleScan">
      <image class="scan-icon" src="/static/images/scan.png" />
      <text class="scan-text">扫描二维码</text>
    </view>

    <!-- SN码输入 -->
    <view class="sn-row">
      <input class="sn-input" v-model="sn" placeholder="输入设备SN码" placeholder-class="placeholder" />
      <button class="confirm-btn" @click="handleConfirm">确定</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { loadDeviceBaseInfo, devicelLoadDeviceBaseInfo } from '@/api/dealer'
import { onLoad } from '@dcloudio/uni-app'

const sn = ref('')
const loginType = ref('')
const handleBack = () => {
  uni.navigateBack()
}
onLoad(() => {
  const data = uni.getStorageSync('userInfo')
  if (data) {
    loginType.value = data.role
  }
})

const handleScan = () => {
  uni.scanCode({
    success: (res) => {
      sn.value = res.result
      uni.showToast({ title: '扫码成功', icon: 'success' })
      handleConfirm()
    },
    fail: (e) => {
      console.log(e)
      uni.showToast({ title: '扫码失败', icon: 'none' })
    },
  })
  // uni.showModal({
  //   title: '允许App访问你的相机?',
  //   content: '用于实现读取设备SN编号',
  //   cancelText: '不允许',
  //   confirmText: '允许',
  //   success: async (res) => {
  //     if (res.confirm) {
  //       uni.scanCode({
  //         success: (res) => {
  //           sn.value = res.result
  //           uni.showToast({ title: '扫码成功', icon: 'success' })
  //           handleConfirm()
  //         },
  //         fail: (e) => {
  //           console.log(e)
  //           uni.showToast({ title: '扫码失败', icon: 'none' })
  //         },
  //       })
  //     }
  //   },
  //   fail: (err) => { },
  // })
}

const handleConfirm = () => {
  if (!sn.value.trim()) {
    uni.showToast({ title: '请输入SN码', icon: 'none' })
    return
  }
  const func =
    loginType.value === 'ROLE_CUSTOMER'
      ? devicelLoadDeviceBaseInfo
      : loadDeviceBaseInfo
  func({ mes: sn.value }).then((res) => {
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

  // if (!sn.value.trim()) {
  //   uni.showToast({ title: "请输入SN码", icon: "none" });
  //   return;
  // }
  // TODO: 处理SN码逻辑
  // uni.showToast({ title: "SN码已提交", icon: "success" });
}
</script>

<style lang="scss" scoped>
.scan-container {
  padding: 30rpx;
  background: $bg-color;
}

.scan-card {
  height: 260rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 18rpx;
  background: linear-gradient(90deg, #324a70ff 0%, #324a7033 100%);
  height: 434rpx;

  .scan-icon {
    display: inline-block;
    width: 206rpx;
    height: 206rpx;
    margin-bottom: 10rpx;
  }

  .scan-text {
    color: #1ecfff;
    font-size: 32rpx;
  }
}

.sn-row {
  display: flex;
  align-items: center;
  margin-top: 26rpx;

  .sn-input {
    flex: 1;
    height: 80rpx;
    background: #f7f9fb;
    border-radius: 16rpx;
    font-size: 28rpx;
    color: #333;
    padding: 0 24rpx;
    border: none;
    outline: none;
  }

  .placeholder {
    color: #cccccc;
  }

  .confirm-btn {
    margin-left: 30rpx;
    height: 80rpx;
    width: 145rpx;
    background: #d28b0a;
    color: #fff;
    font-size: 32rpx;
    border-radius: 16rpx;
    line-height: 80rpx;
    text-align: center;
  }
}

.iconfont {
  font-family: 'iconfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-back:before {
  content: '\e8ef';
}

.icon-scan:before {
  content: '\e6a1';
}
</style>
