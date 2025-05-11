<template>
    <view class="add-device-container">
        <view class="device-card">
            <image class="device-img" src="/static/images/device.png" />
            <view class="device-info">
                <view class="row bright">
                    <text class="label">SN：</text>
                    <text class="sn" @click="copySn">{{ device.sn }}</text>
                    <image v-if="status == 'fail'" class="signal-icon" src="/static/images/signal-low.png" />
                    <image v-else class="signal-icon" src="/static/images/signal-full.png" />
                </view>
                <view class="row">
                    <text class="label">型号：</text>
                    <text class="value">{{ device.model }}</text>
                </view>
                <view class="row">
                    <text class="label">IMEI：</text>
                    <text class="value">{{ device.imei }}</text>
                </view>
            </view>
        </view>
        <view class="info-tip" v-if="status === 'fail'">
            <view>设备离线</view>
            <view> 请检查设备的联网情况</view>
            <view class="refresh-btn">
                刷新网络
            </view>
        </view>

        <template v-else>
            <view class="info-list">
                <view class="info-item">
                    <text class="info-label">所在地区：</text>
                    <text class="info-value">{{ device.region }}</text>
                </view>
                <view class="info-item">
                    <text class="info-label">详细地址：</text>
                    <text class="info-value">{{ device.address }}</text>
                </view>
                <view class="info-item">
                    <text class="info-label">安装位置：</text>
                    <text class="info-value">{{ device.installPos }}</text>
                </view>
            </view>
            <view class="confirm-btn" @click="handleAdd">确认添加</view>
        </template>

    </view>
</template>

<script setup>
import { ref } from 'vue'

const status = ref('success')
const device = ref({
    sn: '4533095668934',
    model: '商务饮水机 S808',
    imei: '9845789948778980',
    region: '广东省-佛山市-禅城区',
    address: '海运八路302号富业大厦A305',
    installPos: '产业展厅'
})

const handleBack = () => {
    uni.navigateBack()
}

const copySn = () => {
    uni.setClipboardData({
        data: device.value.sn,
        success: () => {
            uni.showToast({ title: '已复制', icon: 'success' })
        }
    })
}

const handleAdd = () => {
    uni.navigateTo(
        {
            url: '/pages/index/scan/result/index?from=success'
        }
    )
    // uni.showToast({
    //     title: '添加成功',
    //     icon: 'success'
    // })
    // 这里可以添加实际的添加逻辑
}
</script>

<style lang="scss" scoped>
.add-device-container {
    background: $bg-color;
    padding: 24rpx;
}


.device-card {
    padding: 43rpx 24rpx 24rpx 24rpx;
    display: flex;
    align-items: flex-start;
    height: 196rx;
    border-radius: 18rpx;
    background: #F4F6F9FF;

    .device-img {
        margin-right: 30rpx;
        width: 106rpx;
        height: 106rpx;
        object-fit: contain;
    }

    .device-info {
        flex: 1;
        position: relative;

        .row {
            display: flex;
            align-items: center;
            margin-bottom: 12rpx;
            font-size: 22rpx;
            color: #999999FF;


            .label {}

            .sn {
                margin-right: 12rpx;
            }

            .value {
                // color: #152136;
            }

            .signal-icon {
                position: absolute;
                right: 10rpx;
                top: 0rpx;
                width: 36rpx;
                height: 36rpx;
                margin-left: 12rpx;
            }
        }

        .bright {
            font-size: 25rpx;
            color: #13337CFF !important;
        }
    }
}

.info-list {
    border-radius: 18rpx;
    background: #F4F6F9FF;
    margin-top: 27rpx;

    .info-item {
        display: flex;
        align-items: center;
        padding: 0 30rpx;
        height: 89rpx;
        border-bottom: 2rpx solid #E0D7D7FF;

        &:last-child {
            border-bottom: none;
        }

        .info-label {
            color: #13337CFF;
            font-size: 25rpx;
            width: 180rpx;
        }

        .info-value {
            color: #333333FF;
            font-size: 25rpx;
            flex: 1;
            text-align: right;
        }
    }
}

.info-tip {
    margin-top: 90rpx;
    font-size: 28rpx;
    text-align: center;
    color: rgba(14, 203, 247, 1);
}

.confirm-btn {
    margin-top: 179rpx;
    height: 90rpx;
    background: #D68F01;
    color: #fff;
    font-size: 32rpx;
    text-align: center;
    line-height: 90rpx;
    display: block;
    font-size: 28rpx;
    width: 688rpx;
    height: 90rpx;
    border-radius: 18rpx;
    background: #D68F01FF;
}

.refresh-btn {
    margin: 67rpx auto 0;
    width: 181rpx;
    color: #fff;
    font-size: 22rpx;
    height: 72.46rpx;
    border-radius: 90rpx;
    line-height: 72rpx;
    text-align: center;
    background: #13337CFF;
}
</style>