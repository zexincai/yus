<template>
  <view class="container">
    <!-- 顶部标题和操作按钮 -->
    <view class="header">
      <text class="title">消息：{{ messageCount }}</text>
      <view class="actions">
        <view class="action-btn" @click="handleReadAll">
          <view class="icon-clear flex-center">
            <image
              src="/static/images/icon-clear.png"
              mode="aspectFit"
              class="action-icon"
            />
          </view>
          <text>全部已读</text>
        </view>
        <view class="action-btn" @click="handleDeleteAll">
          <view class="icon-delete flex-center">
            <image
              src="/static/images/icon-delete.png"
              mode="aspectFit"
              class="action-icon"
            />
          </view>
          <text>全部删除</text>
        </view>
      </view>
    </view>

    <!-- 消息列表 -->
    <view class="message-list">
      <view
        v-for="(message, index) in messageList"
        :key="index"
        class="message-item"
        @click="handleMessageClick(message)"
      >
        <image :src="message.icon" mode="aspectFit" class="device-icon" />
        <view class="message-info">
          <text class="device-name">{{ message.name }}</text>
          <text class="device-sn">SN:{{ message.sn }}</text>
        </view>
        <view class="message-right">
          <text class="message-time">{{ message.time }}</text>
          <view v-if="message.unread" class="unread-badge">{{
            message.unread
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

// 消息总数
const messageCount = ref(4);

// 消息列表数据
const messageList = reactive([
  {
    name: "一楼前台",
    sn: "34523487679890",
    icon: "/static/images/device1.png",
    time: "2025-06-20 14:20",
    unread: 3,
  },
  {
    name: "企业展厅",
    sn: "34523487679821",
    icon: "/static/images/device1.png",
    time: "2025-06-20 11:30",
    unread: 1,
  },
  {
    name: "会议室",
    sn: "34523487675680",
    icon: "/static/images/device1.png",
    time: "2025-06-16 09:30",
    unread: 0,
  },
]);

// 处理消息点击
const handleMessageClick = (message) => {
  uni.navigateTo({
    url: `/pages/message/detail/index?sn=${message.sn}`,
  });
};

// 全部已读
const handleReadAll = () => {
  messageList.forEach((item) => {
    item.unread = 0;
  });
  messageCount.value = 0;
  uni.showToast({
    title: "操作成功",
    icon: "none",
  });
};

// 全部删除
const handleDeleteAll = () => {
  messageList.length = 0;
  messageCount.value = 0;
  uni.showToast({
    title: "操作成功",
    icon: "none",
  });
};
</script>

<style lang="scss" scoped>
.container {
  // min-height: 100vh;
  background-color: $bg-color;
  padding: 40rpx 24rpx;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
  font-size: 29rpx;
  .title {
    color: #fff;
  }

  .actions {
    display: flex;
    align-items: center;

    .action-btn {
      display: flex;
      align-items: center;
      margin-left: 40rpx;
      .icon-clear,
      .icon-delete {
        width: 36.23rpx;
        height: 36.23rpx;
        border-radius: 50%;
        background: $active-color;
        margin-right: 10rpx;
      }
      .icon-delete {
        background: $danger-color;
      }
      .action-icon {
        width: 21.74rpx;
        height: 21.74rpx;
      }

      text {
        color: #fff;
      }
    }
  }
}

.message-list {
  .message-item {
    padding: 30rpx 30rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    border-radius: 18rpx;
    box-shadow: 0rpx 4rpx 8rpx #000000;
    background: linear-gradient(90deg, #324a70ff 0%, #324a7033 100%);
    .device-icon {
      width: 106rpx;
      height: 106rpx;
      margin-right: 20rpx;
    }

    .message-info {
      flex: 1;

      .device-name {
        position: relative;
        top: -4rpx;
        color: #fff;
        font-size: 29rpx;
        margin-bottom: 20rpx;
        display: block;
      }

      .device-sn {
        color: #ffffffff;
        font-size: 24rpx;
      }
    }

    .message-right {
      min-height: 100rpx;

      text-align: right;

      .message-time {
        color: #c7c7c7;
        font-size: 24rpx;
        display: block;
        margin-bottom: 28rpx;
      }

      .unread-badge {
        display: inline-block;
        min-width: 36rpx;
        height: 44rpx;
        line-height: 44rpx;
        text-align: center;
        background: $danger-color;
        color: #fff;
        font-size: 24rpx;
        border-radius: 50%;
        padding: 0 14rpx;
      }
    }
  }
}
</style>
