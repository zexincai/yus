<template>
  <view class="add-share-container">
    <!-- 表单区域 -->
    <view class="form-card">
      <view class="form-item">
        <text class="label">姓名：</text>
        <input
          type="text"
          v-model="form.name"
          placeholder="请输入"
          placeholder-class="placeholder"
        />
      </view>
      <view class="divider"></view>
      <view class="form-item">
        <text class="label">手机号码：</text>
        <input
          type="number"
          v-model="form.phone"
          placeholder="请输入"
          placeholder-class="placeholder"
          maxlength="11"
        />
      </view>
    </view>

    <!-- 确认按钮 -->
    <button class="confirm-btn" @click="handleConfirm">确认添加</button>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

// 表单数据
const form = reactive({
  name: "",
  phone: "",
});

// 返回上一页
const handleBack = () => {
  uni.navigateBack();
};

// 确认添加
const handleConfirm = () => {
  // 表单验证
  if (!form.name.trim()) {
    uni.showToast({
      title: "请输入姓名",
      icon: "none",
    });
    return;
  }

  if (!form.phone || !/^1\d{10}$/.test(form.phone)) {
    uni.showToast({
      title: "请输入正确的手机号码",
      icon: "none",
    });
    return;
  }

  // TODO: 调用添加共享账号的API
  uni.showLoading({
    title: "添加中...",
  });

  // 模拟API调用
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: "添加成功",
      icon: "success",
      duration: 1500,
      success: () => {
        // 延迟返回上一页
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      },
    });
  }, 1000);
};
</script>

<style lang="scss" scoped>
.add-share-container {
  min-height: 100vh;
  background-color: #1c2431;
  padding-top: var(--status-bar-height);
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

.form-card {
  margin: 30rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;

  .form-item {
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    height: 100rpx;

    .label {
      color: #223a7a;
      font-size: 30rpx;
      width: 180rpx;
    }

    input {
      flex: 1;
      height: 100%;
      font-size: 30rpx;
    }
  }

  .divider {
    height: 1rpx;
    background-color: #eeeeee;
    margin: 0 30rpx;
  }
}

.confirm-btn {
  margin: 60rpx 30rpx;
  background: #d28b0a;
  color: #fff;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 12rpx;
  font-size: 32rpx;
}

.placeholder {
  color: #cccccc;
}

// iconfont样式
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-back:before {
  content: "\e8ef";
}
</style>
