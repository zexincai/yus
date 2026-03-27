<template>
  <view class="add-share-container">
    <!-- 表单区域 -->
    <view class="form-card">
      <view class="form-item">
        <text class="label">姓名：</text>
        <input type="text" v-model="form.name" placeholder="请输入" placeholder-class="placeholder" />
      </view>
      <view class="divider"></view>
      <view class="form-item">
        <text class="label">手机号码：</text>
        <input type="number" v-model="form.phone" placeholder="请输入" placeholder-class="placeholder" maxlength="11" />
      </view>
    </view>

    <!-- 确认按钮 -->
    <button v-if="actionType == 'ADD'" class="confirm-btn" @click="handleConfirm('ADD')">
      确认添加
    </button>
    <template v-else>
      <button class="save-btn" @click="handleConfirm('EDIT')">保存</button>
      <button class="delete-btn" @click="handleConfirm('DEL')">删除</button>
    </template>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { operShareUser } from '@/api/dealer'

const deviceId = ref('')
const loading = ref(false)
const actionType = ref('ADD')
const shareType = ref('1')
// 表单数据
const form = reactive({
  name: '',
  phone: '',
  id: '',
})
onLoad(({ id, action, share }) => {
  deviceId.value = id
  if (action) {
    actionType.value = action
    shareType.value = share || '1'
    let shareUser = uni.getStorageSync('shareUser')
    form.id = shareUser.id
    form.name = shareUser.shareName
    form.phone = shareUser.sharePhone
    uni.setNavigationBarTitle({
      title: '共享账号',
    })
  }
})

// 返回上一页
const handleBack = () => {
  uni.navigateBack()
}

// 确认添加
const handleConfirm = (type) => {
  // 表单验证
  if (!form.name.trim()) {
    uni.showToast({
      title: '请输入姓名',
      icon: 'none',
    })
    return
  }

  if (!form.phone || !/^1\d{10}$/.test(form.phone)) {
    uni.showToast({
      title: '请输入正确的手机号码',
      icon: 'none',
    })
    return
  }
  if (loading.value) return
  loading.value = true
  // TODO: 调用添加共享账号的API
  uni.showLoading({
    title: '',
  })
  const params = {
    deviceId: deviceId.value,
    shareName: form.name,
    sharePhone: form.phone,
    action: type || actionType.value,
    shareType: shareType.value,
  }
  if (type != 'ADD') {
    params.id = form.id
  }

  operShareUser(params)
    .then((resp) => {
      uni.hideLoading()
      uni.showToast({
        title: '操作成功',
        icon: 'none',
      })
      setTimeout(() => {
        loading.value = false
        uni.navigateBack()
      }, 1000)
    })
    .catch(() => {
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
.add-share-container {
  min-height: 100vh;
  background-color: $bg-color;
  padding-top: var(--status-bar-height);
}

.nav-bar {
  position: relative;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-white;

  .back {
    position: absolute;
    left: 30rpx;
    font-size: 40rpx;
  }

  .title {
    font-size: 36rpx;
  }
}

.form-card {
  margin: 30rpx;
  background: $bg-color-card;
  border-radius: 16rpx;
  overflow: hidden;

  .form-item {
    display: flex;
    background-color: transparent;
    align-items: center;
    padding: 0 30rpx;
    height: 100rpx;

    .label {
      color: $active-color;
      font-size: 26rpx;
      width: 180rpx;
    }

    input {
      text-align: right;
      flex: 1;
      height: 100%;
      font-size: 26rpx;
    }
  }

  .divider {
    height: 1rpx;
    background-color: $border-color-light;
    margin: 0 30rpx;
  }
}

.confirm-btn {
  margin: 60rpx 30rpx;
  background: $accent-color;
  color: $text-white;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 18rpx;
  font-size: 29rpx;
}

.save-btn {
  margin: 60rpx 30rpx 30rpx;
  background: $accent-color;
  color: $text-white;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 12rpx;
  font-size: 29rpx;
}

.delete-btn {
  margin: 0 30rpx;
  color: $active-color;
  background-color: #fff;
  border: 2rpx solid $active-color;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 12rpx;
  font-size: 29rpx;
}

.placeholder {
  color: #cdcdcd !important;
}

// iconfont样式
.iconfont {
  font-family: 'iconfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-back:before {
  content: '\e8ef';
}
</style>
