# 样式变量统一管理设计文档

## 概述

将项目中 43 个文件（40 页面 + 3 组件）的 `<style>` 块硬编码颜色/尺寸值，统一提取为 SCSS 变量，集中管理，支持快速回滚。

## 目标

- 消除重复硬编码颜色值
- 建立唯一变量真相来源（`style/theme.scss`）
- 支持回滚：只改 `theme.scss` 即可全局切换主题
- 不改变任何视觉效果（部分近似色有意合并，见注意事项）

## 文件结构变更

```
style/
  theme.scss      ← 新建：全部变量定义
  index.scss      ← 头部加 @import "./theme.scss"，移除原有内联变量声明，
                     同时将内部 $secondary-color 引用替换为 $bg-color-card
  common.scss     ← 不动

uni.scss          ← 移除末尾 $bg-color/$active-color/$link-color/$danger-color，
                     改为 @import "./style/theme.scss"
```

## 变量定义（style/theme.scss）

```scss
// ─── 背景色 ───
$bg-color:          #1c2431;                   // 主背景（深色）
$bg-color-dark:     #152136;                   // 更深背景
$bg-color-medium:   #233657;                   // 中间层背景
$bg-color-card:     #324a70;                   // 卡片/容器背景（原 $secondary-color #2d3c58 统一为此）
$bg-color-light:    #f7f9fb;                   // 浅色背景（表单区域，#f4f6f9 有意合并至此）
$bg-color-white:    #ffffff;                   // 纯白背景

// ─── 边框/分割 ───
$border-color:       rgba(255, 255, 255, 0.1); // 深色主题边框
$border-color-card:  rgba(50, 74, 112, 0.2);   // 卡片边框（原 #324a7033）
$border-color-light: #cccccc;                  // 浅色场景边框
$border-color-input: #e0d7d7;                  // 输入框边框

// ─── 功能色 ───
$accent-color:    #d68f01;   // 金色强调（原 $active-color，全局重命名）
$link-color:      #0ecbf7;   // 青色链接/高亮（原 uni.scss $link-color:#0ECBF7，
                              // index.scss 旧 $link-color:#0a84ff 为未使用值，废弃）
$success-color:   #52c41a;   // 成功绿
$warning-color:   #faad14;   // 警告黄
$error-color:     #ff4d4f;   // 错误红
$danger-color:    #ed7358;   // 危险橙红

// ─── 向后兼容别名（避免编译错误，后续可逐步移除）───
$active-color:    $accent-color;   // 兼容旧 $active-color 引用

// ─── 文字色 ───
$text-primary:    #333333;   // 主要文字
$text-secondary:  #999999;   // 次要文字
$text-disabled:   #666666;   // 禁用文字
$text-white:      #ffffff;   // 白色文字
$text-light-blue: #a5bfe8;   // 浅蓝说明文字

// ─── 导航/头部 ───
$nav-bg:          #13337c;   // 导航栏背景
$nav-bg-alt:      #223a7a;   // 导航栏备用

// ─── 字体大小（rpx）───
$font-size-small:   24rpx;
$font-size-base:    28rpx;
$font-size-large:   32rpx;
$font-size-xlarge:  36rpx;
$font-size-xxlarge: 40rpx;

// ─── 间距（rpx）───
$spacing-mini:   10rpx;
$spacing-small:  20rpx;
$spacing-base:   30rpx;
$spacing-large:  40rpx;

// ─── 圆角（rpx）───
$border-radius-small:  8rpx;
$border-radius-base:   12rpx;
$border-radius-large:  16rpx;
```

## 替换映射表

| 硬编码值 | 替换为变量 | 备注 |
|---|---|---|
| `#1c2431` | `$bg-color` | 主背景 |
| `#152136` / `#152136ff` | `$bg-color-dark` | 更深背景 |
| `#233657` | `$bg-color-medium` | 中层背景 |
| `#324a70` / `#324a70ff` | `$bg-color-card` | 卡片背景 |
| `#2d3c58` / `#2D3C58` | `$bg-color-card` | 同义，统一 |
| `#f7f9fb` / `#f4f6f9ff` / `#F4F6F9FF` | `$bg-color-light` | 有意合并（两值差3点，视觉无感知） |
| `#fff` / `#ffffff` / `#ffffffff` / `#FFFFFF` | `$bg-color-white` 或 `$text-white` | 背景用 bg，文字色用 text |
| `rgba(50, 74, 112, 0.2)` / `#324a7033` | `$border-color-card` | 卡片边框 |
| `rgba(255, 255, 255, 0.1)` | `$border-color` | 深色主题分割线 |
| `#cccccc` / `#ccc` / `#c7c7c7` / `#c7c7c7ff` / `#C7C7C7FF` | `$border-color-light` | 浅色边框 |
| `#e0d7d7` / `#e0d7d7ff` / `#E0D7D7FF` | `$border-color-input` | 输入框边框 |
| `#d68f01` / `#D68F01` / `#d68f01ff` / `#D68F01FF` | `$accent-color` | 金色强调 |
| `#d28b0a` | `$accent-color` | 近似金色，统一 |
| `rgb(241, 161, 0)` / `rgba(214, 143, 1, 1)` | `$accent-color` | 同义 |
| `#0ecbf7` / `#0ECBF7` / `#0ecbf7ff` | `$link-color` | 青色高亮 |
| `#1ecfff` | `$link-color` | 近似青色，统一 |
| `rgba(14, 203, 247, 1)` | `$link-color` | 同义 |
| `#13337c` / `#13337cff` / `#13337CFF` | `$nav-bg` | 导航背景 |
| `rgba(19, 51, 124, 1)` | `$nav-bg` | 同义 |
| `#223a7a` / `#1a3769` | `$nav-bg-alt` | 导航备用 |
| `#333` / `#333333` / `#333333ff` / `#333333FF` | `$text-primary` | 主文字 |
| `#999` / `#999999` / `#999999ff` / `#999999FF` | `$text-secondary` | 次文字 |
| `#666` | `$text-disabled` | 禁用文字 |
| `#a5bfe8` / `#a5bfe8ff` / `#A5BFE8` / `#a5abb7` | `$text-light-blue` | 浅蓝文字 |
| `#52c41a` / `#08d521` / `#08B014` | `$success-color` | 成功绿 |
| `#faad14` / `#f39b11` / `#CFA008` | `$warning-color` | 警告黄 |
| `#ff4d4f` / `#D43030` / `#f76260` / `#da0707` | `$error-color` | 错误红 |
| `#ed7358` / `#ED7358` / `rgba(237, 115, 88, 1)` | `$danger-color` | 危险橙红 |
| `$secondary-color`（index.scss 内部引用） | `$bg-color-card` | 变量重命名，仅在 index.scss 内替换 |

## 替换文件列表（43个）

### 页面（40个）
- `pages/message/index.vue`
- `pages/message/detail/index.vue`
- `pages/news/index.vue`
- `pages/news/detail/index.vue`
- `pages/index/index.vue`
- `pages/index/record/index.vue`
- `pages/index/scan/index.vue`
- `pages/index/scan/result/index.vue`
- `pages/index/scan/detail/index.vue`
- `pages/index/info/index.vue`
- `pages/index/customer/index.vue`
- `pages/index/customer/edit/index.vue`
- `pages/index/customer/bindPhone/index.vue`
- `pages/case/index.vue`
- `pages/case/detail/index.vue`
- `pages/device/index.vue`
- `pages/device/renewal/index.vue`
- `pages/device/renewal/record/index.vue`
- `pages/device/param/index.vue`
- `pages/device/edit/index.vue`
- `pages/device/detail/index.vue`
- `pages/device/stat/index.vue`
- `pages/device/authorize/index.vue`
- `pages/device/filter/index.vue`
- `pages/device/filter/record/index.vue`
- `pages/device/setting/index.vue`
- `pages/device/setting/sterilize/index.vue`
- `pages/device/setting/wash/index.vue`
- `pages/device/setting/run/index.vue`
- `pages/device/data/index.vue`
- `pages/device/share/index.vue`
- `pages/device/share/detail/index.vue`
- `pages/device/share/add/index.vue`
- `pages/login/index.vue`
- `pages/login/cancel/index.vue`
- `pages/login/result/index.vue`
- `pages/login/privacy/index.vue`
- `pages/login/agreement/index.vue`
- `pages/login/register/index.vue`
- `pages/login/forget/index.vue`

### 组件（3个）
- `components/cityPicker/index.vue`
- `components/xp-picker/xp-picker.vue`
- `components/Switch/index.vue`

### 样式文件（2个）

- `style/index.scss`（移除重复变量声明，加 import，替换内部 $secondary-color，替换内部 `#fff`）
- `uni.scss`（移除末尾4个变量，加 import）

## 执行顺序

1. 新建 `style/theme.scss`，写入全部变量（含 `$active-color` 兼容别名）
2. 修改 `uni.scss`：删除末尾 `$bg-color`/`$active-color`/`$link-color`/`$danger-color`，末尾加 `@import "./style/theme.scss"`
   - **说明**：原 `uni.scss` 的 `$bg-color: #152136` 与 `index.scss` 的 `$bg-color: #1c2431` 存在变量遮盖，迁移后统一由 `theme.scss` 的 `#1c2431` 定义，遮盖消除，此为有意行为。
3. 修改 `style/index.scss`：
   - 头部加 `@import "./theme.scss"`
   - 删除原有变量声明块（`$bg-color` ~ `$border-color` 共14行）
   - 将文件内部 `$secondary-color` 引用替换为 `$bg-color-card`（3处：`.card`、`.btn.default`、`.bg-secondary`）
   - 将 `.empty { color: #fff }` 替换为 `$text-white`
4. 逐文件替换 43 个 vue 文件中的硬编码值，按模块顺序进行（login → index → device → case → message → news → components）

## 回滚方式

**主题回滚**（仅改颜色值）：修改 `style/theme.scss` 中对应变量值，全局生效。

**完全回滚**（还原所有改动）：`git checkout` 所有被修改文件。仅还原 `style/` 和 `uni.scss` 不足以完全回滚，因为 43 个 vue 文件中的硬编码值已被替换为变量名。

## 注意事项

- `#f4f6f9`
 与 `#f7f9fb` 有意合并为 `$bg-color-light: #f7f9fb`，差值 3/255，视觉无感知，属于颜色规范化
- `index.scss` 旧 `$link-color: #0a84ff` 经核查在所有 vue 文件中均无使用，废弃，不保留别名
- `$active-color` 在 theme.scss 保留别名 `$active-color: $accent-color`，防止编译错误，后续可移除
- 少数一次性特殊颜色（如 `device/detail` 中的状态机颜色 `#019B7A`、`#013A2D` 等）保留硬编码，不强制提取
- 大小写变体（`#d68f01` / `#D68F01`）需全部替换
