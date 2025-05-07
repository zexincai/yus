<template>
  <view class="share-detail-container">
    <!-- 表单区域 -->
    <view class="form-card">
      <view class="form-item">
        <text class="label">姓名：</text>
        <text class="value">{{ form.name }}</text>
      </view>
      <view class="divider"></view>
      <view class="form-item">
        <text class="label">手机号码：</text>
        <text class="value">{{ form.phone }}</text>
      </view>
    </view>

    <!-- 操作按钮 -->
    <button class="save-btn" @click="handleSave">保存</button>
    <button class="delete-btn" @click="handleDelete">删除</button>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

// 表单数据
const form = reactive({
  name: "李梅",
  phone: "15645789900",
});

// 获取路由参数
const getRouteParams = () => {
  const eventChannel = getOpenerEventChannel();
  if (eventChannel) {
    eventChannel.on("shareData", (data) => {
      if (data) {
        form.name = data.name || "李梅";
        form.phone = data.phone || "15645789900";
      }
    });
  }
};

// 返回上一页
const handleBack = () => {
  uni.navigateBack();
};

// 保存修改
const handleSave = () => {
  // TODO: 调用保存API
  uni.showLoading({
    title: "保存中...",
  });

  // 模拟API调用
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: "保存成功",
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

// 删除共享账号
const handleDelete = () => {
  uni.showModal({
    title: "提示",
    content: "确定要删除该共享账号吗？",
    confirmColor: "#F76260",
    success: (res) => {
      if (res.confirm) {
        // 确认删除
        uni.showLoading({
          title: "删除中...",
        });

        // 模拟API调用
        setTimeout(() => {
          uni.hideLoading();
          uni.showToast({
            title: "删除成功",
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
      }
    },
  });
};

// 页面加载时获取路由参数
onMounted(() => {
  try {
    getRouteParams();
  } catch (e) {
    console.error("获取路由参数失败", e);
  }
});
</script>

<style lang="scss" scoped>
.share-detail-container {
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

    .value {
      flex: 1;
      font-size: 30rpx;
      color: #333;
      text-align: right;
    }
  }

  .divider {
    height: 1rpx;
    background-color: #eeeeee;
    margin: 0 30rpx;
  }
}

.save-btn {
  margin: 60rpx 30rpx 30rpx;
  background: #d28b0a;
  color: #fff;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 12rpx;
  font-size: 32rpx;
}

.delete-btn {
  margin: 0 30rpx;
  background: #f76260;
  color: #fff;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 12rpx;
  font-size: 32rpx;
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
