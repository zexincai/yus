<template>
  <view class="container">
    <!-- 顶部标题和操作按钮 -->
    <view class="header">
      <text class="title">消息：{{ messageCount }}</text>
      <view class="actions">
        <view class="action-btn" @click="handleReadAll('READ')">
          <view class="icon-clear flex-center">
            <image src="/static/images/icon-clear.png" mode="aspectFit" class="action-icon" />
          </view>
          <text>全部已读</text>
        </view>
        <view class="action-btn" @click="handleDeleteAll('DEL')">
          <view class="icon-delete flex-center">
            <image src="/static/images/icon-delete.png" mode="aspectFit" class="action-icon" />
          </view>
          <text>全部删除</text>
        </view>
      </view>
    </view>

    <!-- 消息列表 -->
    <view v-if="messageList.length" class="message-list">
      <view v-for="(message, index) in messageList" :key="index" class="message-item"
        @click="handleMessageClick(message)">
        <image :src="message.productUrl" mode="aspectFit" class="device-icon" />
        <view class="message-info">
          <text class="device-name">{{ message.location }}</text>
          <text class="device-sn">SN:{{ message.sn }}</text>
        </view>
        <view class="message-right">
          <text class="message-time">{{ message.createTime }}</text>
          <view v-if="message.msgNum" class="unread-badge">{{
            message.msgNum
          }}</view>
        </view>
      </view>
    </view>
    <view v-else class="empty">
      <image src="/static/images/empty.png" mode="aspectFit" class="empty-img" />
      <view class="empty-text"> 当前暂无消息 </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { deviceGroupMsg, operaDeviceMsg } from "@/api/dealer";
import { onShow } from "@dcloudio/uni-app";

// 消息总数
const messageCount = ref(0);

// 消息列表数据
const messageList = ref([]);

// 处理消息点击
const handleMessageClick = (message) => {
  uni.navigateTo({
    url: `/pages/message/detail/index?id=${message.id}`,
  });
};

// 全部已读
const handleReadAll = async (action) => {
  try {
    await operaDeviceMsg({ action })
    uni.showToast({
      title: "操作成功",
      icon: "none",
    });
    initMessageList()
  } catch (error) {
  }

};

// 全部删除
const handleDeleteAll = (action) => {
  uni.showModal({
    title: "提示",
    content: "确认删除全部消息吗？",
    success: async (res) => {
      if (res.confirm) {
        handleReadAll(action)
      }
    }
  })
};
// 计算未读消息数量
const calculateUnreadCount = () => {
  let count = 0;
  messageList.value.forEach((item) => {
    count += item.msgNum;
  });
  messageCount.value = count;
}

const initMessageList = async () => {
  messageList.value = await deviceGroupMsg()
  calculateUnreadCount()
}
onShow(() => {
  // 初始化消息列表
  initMessageList();
});


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
    color: $text-white;
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
        color: $text-white;
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
    background: linear-gradient(90deg, $bg-color-card 0%, $border-color-card 100%);

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
        color: $text-white;
        font-size: 29rpx;
        margin-bottom: 20rpx;
        display: block;
      }

      .device-sn {
        color: $text-white;
        font-size: 24rpx;
      }
    }

    .message-right {
      min-height: 100rpx;

      text-align: right;

      .message-time {
        color: $border-color-light;
        font-size: 24rpx;
        display: block;
        margin-bottom: 28rpx;
      }

      .unread-badge {
        display: inline-block;
        min-width: 42rpx;
        height: 42rpx;
        line-height: 42rpx;
        text-align: center;
        background: $danger-color;
        color: $text-white;
        font-size: 24rpx;
        border-radius: 50%;
        padding: 0 8rpx;
      }
    }
  }
}
</style>
