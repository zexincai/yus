<template>
    <view class="custom-switch" :class="{ 'is-checked': innerValue, 'is-disabled': disabled }" @click="toggle">
        <view class="switch-track"></view>
        <view class="switch-thumb"></view>
    </view>
</template>

<script setup>
import { computed, watch, ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    activeColor: {
        type: String,
        default: '#0ECBF7'
    },
    inactiveColor: {
        type: String,
        default: '#A5BFE8'
    }
})

const emits = defineEmits(['update:modelValue', 'change'])

const innerValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
    innerValue.value = val
})

const toggle = () => {
    if (props.disabled) return
    innerValue.value = !innerValue.value
    emits('update:modelValue', innerValue.value)
    emits('change', { value: innerValue.value })
}

const trackStyle = computed(() => ({
    background: innerValue.value ? props.activeColor : props.inactiveColor
}))
</script>

<style scoped>
.custom-switch {
    width: 108rpx;
    height: 54rpx;
    border-radius: 24rpx;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    transition: opacity 0.2s;
}

.custom-switch.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.switch-track {
    width: 100%;
    height: 100%;
    border-radius: 54rpx;
    background: #A5BFE8FF;
    transition: background 0.2s;
}

.custom-switch.is-checked .switch-track {
    background: #0ECBF7FF;
}

.switch-thumb {
    position: absolute;
    top: 5rpx;
    left: 6rpx;
    width: 44rpx;
    height: 44rpx;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
    transition: left 0.2s;
}

.custom-switch.is-checked .switch-thumb {
    left: 58rpx;
}
</style>