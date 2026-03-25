<template>
    <view class="add-device-container">
        <view class="device-card">
            <image
                class="device-img"
                :src="deviceData.productUrl || '/static/images/device.png'"
            />
            <view class="device-info">
                <view class="row bright">
                <text class="label">SN：</text>
                <text class="sn" @click="copySn">{{ deviceData.mes }}</text>
                <image class="signal-icon" :src="deviceData.rssiUrl" />
                <!-- <image v-else class="signal-icon" src="/static/images/signal-full.png" /> -->
                </view>
                <view class="row">
                <text class="label">型号：</text>
                <text class="value">{{
                    deviceData.model || deviceData.modelName
                }}</text>
                </view>
                <view class="row">
                <text class="label">IMEI：</text>
                <text class="value">{{ deviceData.imei }}</text>
                </view>
            </view>
        </view>
        <view @click="loadData" class="info-tip" v-if="deviceData.online == 0">
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
                    <text @click="cityVisible = true" :style="!form.region ? 'color:#333' : ''" class="info-value">{{
                        form.region ||
                        '请选择'
                        }}</text>
                </view>
                <view class="info-item">
                    <text class="info-label">详细地址：</text>
                    <!-- <text class="info-value">{{ device.address }}</text> -->
                    <input class="info-value" type="text" v-model="form.address" placeholder="请输入"
                        placeholder-class="placeholder" />
                </view>
                <view class="info-item">
                    <text class="info-label">安装位置：</text>
                    <!-- <text class="info-value">{{ device.installPos }}</text> -->
                    <input class="info-value" type="text" v-model="form.location" placeholder="请输入"
                        placeholder-class="placeholder" />
                </view>
            </view>
            <view class="confirm-btn" @click="handleAdd">确认添加</view>
        </template>
        <CityPicker :column="3" :default-value="defaultValue" :mask-close-able="true" @confirm="onCityConfirm"
            @cancel="onCityCancel" :visible="cityVisible" />
    </view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CityPicker from "@/components/cityPicker/index.vue";
import { addCustomerDevice, devicelLoadDeviceBaseInfo } from "@/api/dealer";
const defaultValue = ref("");
const cityVisible = ref(false);
const deviceData = ref({
    sn: '',
    model: '',
    imei: '',
})

const form = reactive({
    region: '',
    address: '',
    location: ''
})


onLoad(() => {
    // 从缓存中获取设备信息
    const deviceInfo = uni.getStorageSync("deviceInfo");
    if (deviceInfo) {
        deviceData.value = deviceInfo;
    }
});
const copySn = () => {
    uni.setClipboardData({
        data: deviceData.value.mes,
        success: () => {
            uni.showToast({ title: '已复制', icon: 'success' })
        }
    })
}
const loadData = () => {
    devicelLoadDeviceBaseInfo({
        mes: deviceData.value.mes,
    }).then(res => {
        deviceData.value = res
    })
}
const handleAdd = async () => {
    if (!form.region) {
        uni.showToast({ title: '请选择所在地区', icon: 'none' })
        return
    }
    if (!form.address) {
        uni.showToast({ title: '请输入详细地址', icon: 'none' })
        return
    }
    if (!form.location) {
        uni.showToast({ title: '请输入安装位置', icon: 'none' })
        return
    }
    try {
        await addCustomerDevice({
            deviceId: deviceData.value.deviceId,
            area: form.region,
            address: form.address,
            location: form.location
        })
        uni.navigateTo(
            {
                url: '/pages/index/scan/result/index?from=success'
            }
        )
    } catch (error) {
        uni.navigateTo(
            {
                url: '/pages/index/scan/result/index?from=fail&msg=' + error.msg
            }
        )
    }


    // uni.showToast({
    //     title: '添加成功',
    //     icon: 'success'
    // })
    // 这里可以添加实际的添加逻辑
}
const onCityConfirm = (e) => {
    form.region = `${e.provinceName},${e.cityName},${e.areaName}`;
    cityVisible.value = false;
};
const onCityCancel = () => {
    cityVisible.value = false;
};
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
    background: $bg-color-light;

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
            color: $text-secondary;


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
            color: $nav-bg !important;
        }
    }
}

.info-list {
    border-radius: 18rpx;
    background: $bg-color-light;
    margin-top: 27rpx;

    .info-item {
        display: flex;
        align-items: center;
        padding: 0 30rpx;
        height: 89rpx;
        border-bottom: 2rpx solid $border-color-input;

        &:last-child {
            border-bottom: none;
        }

        .info-label {
            color: $nav-bg;
            font-size: 25rpx;
            width: 180rpx;
        }

        .info-value {
            color: $text-primary;
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
    color: $link-color;
}

.confirm-btn {
    margin-top: 179rpx;
    height: 90rpx;
    background: $accent-color;
    color: $text-white;
    font-size: 32rpx;
    text-align: center;
    line-height: 90rpx;
    display: block;
    font-size: 28rpx;
    width: 688rpx;
    height: 90rpx;
    border-radius: 18rpx;
    background: $accent-color;
}

.refresh-btn {
    margin: 67rpx auto 0;
    width: 181rpx;
    color: $text-white;
    font-size: 22rpx;
    height: 72.46rpx;
    border-radius: 90rpx;
    line-height: 72rpx;
    text-align: center;
    background: $nav-bg;
}

.placeholder {
    color: $text-primary;
}
</style>