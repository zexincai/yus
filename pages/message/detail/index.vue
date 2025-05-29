<template>
  <view class="container">
    <!-- 设备信息卡片 -->
    <view class="device-header">
      <view class="device-title">
        <text>企业展厅</text>
        <image src="/static/images/icon-edit.png" mode="aspectFit" class="edit-icon" />
      </view>
      <view class="view-device" @click="handleViewDevice">
        <text>查看设备 >></text>
      </view>
    </view>
    <view class="device-card">
      <view class="device-info">
        <view class="info-item">
          <text class="label">SN:</text>
          <text class="value">34523456712801</text>
          <text @click="onCopySn" class="tag">复制</text>
        </view>
        <view class="info-item">
          <text class="label">型号:</text>
          <text class="value">S800-2</text>
        </view>
        <view class="info-item">
          <text class="label">类型:</text>
          <text class="value">商务饮水机</text>
        </view>
        <view class="info-item">
          <text class="label">客户:</text>
          <text class="value">焦靖国 15677893456</text>
        </view>
        <view class="info-item">
          <text class="label">地区:</text>
          <text class="value">广东省广州市天河区</text>
        </view>
        <view class="info-item">
          <text class="label">地址:</text>
          <text class="value">工业大道58号福福大厦209室</text>
        </view>
      </view>

      <image src="/static/images/device.png" mode="aspectFit" class="device-image" />
    </view>

    <!-- 消息列表 -->
    <view class="message-section">
      <view class="message-header">
        <text>消息: {{ messageCount }}</text>
        <view class="delete-all" @click="handleDeleteAll">
          <!-- <view class="delete-icon">
            <image src="/static/images/icon-delete.png" mode="aspectFit" />
          </view> -->
          <!-- <text>全部删除</text> -->
        </view>
      </view>

      <view v-if="false" class="message-list">
        <view v-for="(message, index) in messages" :key="index" class="message-item" :class="message.type">
          <view class="message-title">
            <text>{{ message.title }}</text>
            <text class="message-time">{{ message.time }}</text>
            <text class="delete-btn" @click="handleDeleteMessage(index)">
              删除
            </text>
          </view>
          <view class="message-content">{{ message.content }}</view>
        </view>
      </view>

      <view v-else class="empty">
        <image src="/static/images/empty.png" mode="aspectFit" class="empty-img" />
        <view class="empty-text"> 暂无数据 </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

// 消息数量
const messageCount = ref(0);

// 消息列表
const messages = reactive([
  {
    type: "error",
    title: "故障提醒",
    time: "2025-06-16 09:30",
    content: "进水口缺水",
  },
  {
    type: "warning",
    title: "租赁到期提醒",
    time: "2025-06-16 09:30",
    content: "到期日期: 2025-06-15",
  },
  {
    type: "info",
    title: "滤芯更换提醒",
    time: "2025-06-16 09:30",
    content: "滤芯剩余低于10%",
  },
]);

// 查看设备详情
const handleViewDevice = () => {
  uni.navigateTo({
    url: "/pages/device/detail",
  });
};

// 删除单条消息
const handleDeleteMessage = (index) => {
  messages.splice(index, 1);
  messageCount.value--;
  uni.showToast({
    title: "删除成功",
    icon: "none",
  });
};

// 删除全部消息
const handleDeleteAll = () => {
  messages.length = 0;
  messageCount.value = 0;
  uni.showToast({
    title: "删除成功",
    icon: "none",
  });
};

// 复制SN
const onCopySn = () => {
  uni.setClipboardData({
    data: "34523456712801",
    success: function () {
      uni.showToast({
        title: "复制成功",
        icon: "success",
        duration: 2000,
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.container {
  // min-height: 100vh;
  background-color: $bg-color;
  padding: 40rpx 24rx 24rpx;
}

.device-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;

  .device-title {
    display: flex;
    align-items: center;

    text {
      color: #fff;
      font-size: 43.48rpx;
      margin-right: 34rpx;
    }

    .edit-icon {
      width: 36rpx;
      height: 36rpx;
    }
  }

  .view-device {
    text {
      color: $link-color;
      font-size: 26rpx;
    }
  }
}

.device-card {
  background: linear-gradient(90deg, #324a70ff 0%, #324a7033 100%);
  border-radius: 18rpx;
  padding: 30rpx 34rpx;
  margin-bottom: 46rpx;
  position: relative;

  .device-info {
    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 12rpx;

      .label {
        color: #fff;
        font-size: 25rpx;
        margin-right: 20rpx;
      }

      .value {
        color: #fff;
        font-size: 25rpx;
      }

      .tag {
        margin-left: 12rpx;
        text-align: center;
        font-size: 18rpx;
        color: #fff;
        // width: 72rpx;
        padding: 0 10rpx;
        height: 36rpx;
        line-height: 36rpx;
        border-radius: 36rpx;
        background: $active-color;
      }
    }
  }

  .device-image {
    position: absolute;
    right: 30rpx;
    top: 50%;
    transform: translateY(-50%);
    width: 181.16rpx;
    height: 181.16rpx;
  }
}

.message-section {
  .message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;

    text {
      color: #fff;
      font-size: 29rpx;
    }

    .delete-all {
      display: flex;
      align-items: center;

      .delete-icon {
        width: 36rpx;
        height: 36rpx;
        background: $danger-color;
        border-radius: 50%;
        margin-right: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        image {
          width: 22rpx;
          height: 22rpx;
        }
      }

      text {
        color: #fff;
        font-size: 29rpx;
      }
    }
  }

  .message-list {
    .message-item {
      border-radius: 18rpx;
      background: linear-gradient(90deg, #324a70ff 0%, #324a7033 100%);
      box-shadow: 0rpx 4rpx 8rpx #0000003f;
      padding: 30rpx 30rpx 44rpx;
      margin-bottom: 20rpx;
      font-size: 29rpx;

      .message-title {
        display: flex;
        flex-direction: column;
        margin-bottom: 20rpx;
        position: relative;

        text {
          color: #fff;
        }

        .message-time {
          color: #c7c7c7ff;
          font-size: 25rpx;
          margin-top: 10rpx;
          flex: 1;
        }

        .delete-btn {
          position: absolute;
          right: 0rpx;
          top: 20rpx;
          font-size: 25rpx;
          background: $danger-color;
          width: 72rpx;
          height: 36rpx;
          font-size: 18rpx;
          line-height: 36rpx;
          text-align: center;
          border-radius: 36rpx;
        }
      }

      .message-content {
        padding-top: 20rpx;
        color: #fff;
        font-size: 28rpx;
        text-align: center;
        width: 100%;
      }

      &.error {
        .message-title text:first-child {
          color: #ff4d4f;
        }
      }

      &.warning {
        .message-title text:first-child {
          color: #d68f01;
        }
      }

      &.info {
        .message-title text:first-child {
          color: #4a9fee;
        }
      }
    }
  }
}
</style>
