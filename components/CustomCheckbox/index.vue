<template>
  <view class="custom-checkbox" :class="{ 'is-checked': isChecked, 'is-disabled': disabled }" :style="boxStyle"
    @tap="toggle" @click="toggle">
    <text class="custom-checkbox__check" :style="checkStyle">
      {{ isChecked ? "✓" : " " }}
    </text>
  </view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  checked: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 28,
  },
  borderWidth: {
    type: Number,
    default: 2,
  },
  borderRadius: {
    type: Number,
    default: 4,
  },
  round: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: "#FFFFFF",
  },
  borderColor: {
    type: String,
    default: "#D1D5DB",
  },
  activeBackgroundColor: {
    type: String,
    default: "#0ECBF7",
  },
  activeBorderColor: {
    type: String,
    default: "",
  },
  checkColor: {
    type: String,
    default: "#FFFFFF",
  },
});

const emits = defineEmits(["update:modelValue", "update:checked", "change", "click"]);

const isChecked = computed(() => {
  if (typeof props.modelValue === "boolean") return props.modelValue;
  if (typeof props.checked === "boolean") return props.checked;
  return false;
});

const resolvedActiveBorderColor = computed(() => props.activeBorderColor || props.activeBackgroundColor);

const boxStyle = computed(() => ({
  width: `${props.size}rpx`,
  height: `${props.size}rpx`,
  borderWidth: `${props.borderWidth}rpx`,
  borderStyle: "solid",
  borderColor: isChecked.value ? resolvedActiveBorderColor.value : props.borderColor,
  borderRadius: `${props.round ? props.size / 2 : props.borderRadius}rpx`,
  backgroundColor: isChecked.value ? props.activeBackgroundColor : props.backgroundColor,
}));

const checkStyle = computed(() => ({
  color: props.checkColor,
  fontSize: `${Math.round(props.size * 0.75)}rpx`,
  lineHeight: `${props.size}rpx`,
}));

const toggle = () => {
  if (props.disabled) return;
  const next = !isChecked.value;
  emits("update:modelValue", next);
  emits("update:checked", next);
  emits("change", next);
  emits("click", next);
};
</script>

<style scoped lang="scss">
.custom-checkbox {
  margin-right: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 28rpx;
  min-height: 28rpx;
  /* 关闭点击高亮，防止抖动 */
  -webkit-tap-highlight-color: transparent;
}

.custom-checkbox.is-disabled {
  opacity: 0.5;
}

.custom-checkbox__check {
  font-weight: 700;
  text-align: center;
}
</style>
