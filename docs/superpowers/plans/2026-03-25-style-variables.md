# 样式变量统一管理 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 43 个 vue/scss 文件中的硬编码颜色/尺寸值提取为 SCSS 变量，集中在 `style/theme.scss` 管理，不改变视觉效果。

**Architecture:** 新建 `style/theme.scss` 作为唯一变量来源；`uni.scss` 通过 `@import` 将变量注入全局，使所有 `<style lang="scss">` 均可访问；`style/index.scss` import theme 并移除重复声明；43 个 vue 文件逐一替换硬编码值为变量引用。

**Tech Stack:** uni-app, Vue 2, SCSS (HBuilderX 编译)

---

## 文件变更清单

| 操作 | 文件 | 说明 |
|------|------|------|
| 新建 | `style/theme.scss` | 全部变量定义（唯一真相来源） |
| 修改 | `uni.scss` | 删末尾4变量，加 @import |
| 修改 | `style/index.scss` | 加 @import，删变量块，替换内部引用 |
| 修改 | `pages/login/*.vue` (7个) | 替换硬编码 |
| 修改 | `pages/index/index.vue` + 5个子页 | 替换硬编码 |
| 修改 | `pages/index/customer/*.vue` (3个) | 替换硬编码 |
| 修改 | `pages/device/index.vue` + renewal + param (4个) | 替换硬编码 |
| 修改 | `pages/device/edit + detail + stat` (3个) | 替换硬编码 |
| 修改 | `pages/device/authorize + filter` (3个) | 替换硬编码 |
| 修改 | `pages/device/setting/*.vue` (4个) | 替换硬编码 |
| 修改 | `pages/device/data + share` (4个) | 替换硬编码 |
| 修改 | `pages/case/*.vue` (2个) | 替换硬编码 |
| 修改 | `pages/message + news` (4个) | 替换硬编码 |
| 修改 | `components/*.vue` (3个) | 替换硬编码 |

## 变量速查表（实施时参考）

```
#1c2431                          → $bg-color
#152136 / #152136ff              → $bg-color-dark
#233657                          → $bg-color-medium
#324a70 / #324a70ff / #2d3c58   → $bg-color-card
#f7f9fb / #f4f6f9ff              → $bg-color-light
#fff / #ffffff / #ffffffff       → $bg-color-white (背景) 或 $text-white (文字色)
rgba(50,74,112,0.2) / #324a7033 → $border-color-card
rgba(255,255,255,0.1)            → $border-color
#cccccc / #ccc / #c7c7c7         → $border-color-light
#e0d7d7 / #e0d7d7ff              → $border-color-input
#d68f01 / #D68F01 / #d28b0a     → $accent-color
#0ecbf7 / #1ecfff                → $link-color
rgba(14,203,247,1)               → $link-color
#13337c / #13337cff              → $nav-bg
rgba(19,51,124,1)                → $nav-bg
#223a7a / #1a3769                → $nav-bg-alt
#333 / #333333                   → $text-primary
#999 / #999999                   → $text-secondary
#666                             → $text-disabled
#a5bfe8 / #a5abb7                → $text-light-blue
#52c41a / #08d521 / #08B014      → $success-color
#faad14 / #f39b11 / #CFA008      → $warning-color
#ff4d4f / #D43030 / #f76260     → $error-color
#ed7358 / #ED7358                → $danger-color
```

> **保留硬编码**：`device/detail` 中的状态机专属色（`#019B7A`、`#013A2D`、`#05510D` 等），属一次性使用，不提取。

---

### Task 1: 新建 style/theme.scss

**Files:**
- Create: `style/theme.scss`

- [ ] **Step 1: 创建文件并写入全部变量**

```scss
// ─── 背景色 ───
$bg-color:          #1c2431;                   // 主背景（深色）
$bg-color-dark:     #152136;                   // 更深背景
$bg-color-medium:   #233657;                   // 中间层背景
$bg-color-card:     #324a70;                   // 卡片/容器背景
$bg-color-light:    #f7f9fb;                   // 浅色背景（表单区域）
$bg-color-white:    #ffffff;                   // 纯白背景

// ─── 边框/分割 ───
$border-color:       rgba(255, 255, 255, 0.1); // 深色主题边框
$border-color-card:  rgba(50, 74, 112, 0.2);   // 卡片边框（原 #324a7033）
$border-color-light: #cccccc;                  // 浅色场景边框
$border-color-input: #e0d7d7;                  // 输入框边框

// ─── 功能色 ───
$accent-color:    #d68f01;   // 金色强调
$link-color:      #0ecbf7;   // 青色链接/高亮
$success-color:   #52c41a;   // 成功绿
$warning-color:   #faad14;   // 警告黄
$error-color:     #ff4d4f;   // 错误红
$danger-color:    #ed7358;   // 危险橙红

// ─── 向后兼容别名 ───
$active-color:    $accent-color;   // 兼容旧引用，后续可移除

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

- [ ] **Step 2: 验证文件存在**

```bash
ls -la style/theme.scss
```

- [ ] **Step 3: Commit**

```bash
git add style/theme.scss
git commit -m "feat(style): 新建 theme.scss 统一变量定义"
```

---

### Task 2: 修改 uni.scss

**Files:**
- Modify: `uni.scss`

背景：`uni.scss` 末尾有4个项目变量（`$bg-color: #152136`、`$active-color`、`$link-color`、`$danger-color`），需删除并改为 import。`uni.scss` 被 HBuilderX 自动注入每个 `<style lang="scss">` 块，因此 import 后全局可用。

- [ ] **Step 1: 删除 uni.scss 末尾4行变量，添加 import**

删除末尾这4行：
```scss
$bg-color: #152136;
$active-color: #D68F01;
$link-color: #0ECBF7;
$danger-color: #ED7358;
```

替换为：
```scss
@import "./style/theme.scss";
```

- [ ] **Step 2: 验证 uni.scss 末尾内容正确**

```bash
tail -5 uni.scss
```

预期最后一行为 `@import "./style/theme.scss";`

- [ ] **Step 3: Commit**

```bash
git add uni.scss
git commit -m "feat(style): uni.scss 切换为 import theme.scss"
```

---

### Task 3: 修改 style/index.scss

**Files:**
- Modify: `style/index.scss`

- [ ] **Step 1: 在文件第1行（@import "./common.scss" 之后）加入 import**

在 `@import "./common.scss";` 之后加一行：
```scss
@import "./theme.scss";
```

- [ ] **Step 2: 删除原有变量声明块**

删除 `style/index.scss` 中第3~35行的变量声明（从 `// 主题颜色` 注释到 `$border-color: rgba(...)` 这一整块14个变量声明）。

- [ ] **Step 3: 替换文件内部 $secondary-color 引用**

将3处 `$secondary-color` 替换为 `$bg-color-card`：
- `.card { background: $secondary-color; ... }` → `$bg-color-card`
- `.btn .default { background: $secondary-color; }` → `$bg-color-card`
- `.bg-secondary { background-color: $secondary-color; }` → `$bg-color-card`

- [ ] **Step 4: 替换 .empty 中的硬编码 #fff**

```scss
// 修改前
.empty {
  text-align: center;
  color: #fff;
  ...
}

// 修改后
.empty {
  text-align: center;
  color: $text-white;
  ...
}
```

- [ ] **Step 5: Commit**

```bash
git add style/index.scss
git commit -m "feat(style): index.scss 切换为 import theme.scss，清理重复变量"
```

---

### Task 4: login 模块（7个文件）

**Files:**
- Modify: `pages/login/index.vue`
- Modify: `pages/login/cancel/index.vue`
- Modify: `pages/login/result/index.vue`
- Modify: `pages/login/privacy/index.vue`
- Modify: `pages/login/agreement/index.vue`
- Modify: `pages/login/register/index.vue`
- Modify: `pages/login/forget/index.vue`

> 对每个文件：找到 `<style lang="scss">` 块，用变量速查表替换所有硬编码颜色。

- [ ] **Step 1: 替换 pages/login/index.vue**

该文件硬编码：`#000`, `#0ecbf7`, `#1c2431`, `#999`, `#a5bfe8`, `#d68f01`, `#fff`

替换：`#000` → `$text-primary`（作为深色文字用）、`#0ecbf7` → `$link-color`、`#1c2431` → `$bg-color`、`#999` → `$text-secondary`、`#a5bfe8` → `$text-light-blue`、`#d68f01` → `$accent-color`、`#fff` → 根据上下文选 `$text-white` 或 `$bg-color-white`

- [ ] **Step 2: 替换 pages/login/cancel/index.vue**

硬编码：`#1a3769`, `#2a64d9`, `#2c405a`, `#333`, `#fff`

替换：`#1a3769` → `$nav-bg-alt`、`#2a64d9` → `$nav-bg`（近似）、`#2c405a` → `$bg-color-card`（近似，保留注释）、`#333` → `$text-primary`、`#fff` → `$text-white` 或 `$bg-color-white`

- [ ] **Step 3: 替换 pages/login/result/index.vue**

硬编码：`#D68F01`, `#fff`

替换：`#D68F01` → `$accent-color`、`#fff` → 按上下文

- [ ] **Step 4: 替换 pages/login/privacy/index.vue**

硬编码：`#333`, `#666`, `#fff`

替换：`#333` → `$text-primary`、`#666` → `$text-disabled`、`#fff` → 按上下文

- [ ] **Step 5: 替换 pages/login/agreement/index.vue**

硬编码：`#333`, `#666`, `#fff`（同上）

- [ ] **Step 6: 替换 pages/login/register/index.vue**

硬编码：`#999`, `#fff`

替换：`#999` → `$text-secondary`、`#fff` → 按上下文

- [ ] **Step 7: 替换 pages/login/forget/index.vue**

硬编码：`#999`, `#fff`（同上）

- [ ] **Step 8: Commit**

```bash
git add pages/login/
git commit -m "refactor(style): login 模块替换硬编码为 SCSS 变量"
```

---

### Task 5: index 主页 + 子页（6个文件）

**Files:**
- Modify: `pages/index/index.vue`
- Modify: `pages/index/record/index.vue`
- Modify: `pages/index/scan/index.vue`
- Modify: `pages/index/scan/result/index.vue`
- Modify: `pages/index/scan/detail/index.vue`
- Modify: `pages/index/info/index.vue`

> `pages/index/index.vue` 硬编码最多，约20种颜色，需逐一对照速查表。

- [ ] **Step 1: 替换 pages/index/index.vue**

主要硬编码（按速查表替换）：
- `#152136` / `#152136ff` → `$bg-color-dark`
- `#2D3C58` / `#2d3c58` → `$bg-color-card`
- `#324a70` / `#324a70ff` / `#324a7033` → `$bg-color-card` / `$border-color-card`
- `#13337cff` → `$nav-bg`
- `#0ecbf7ff` → `$link-color`
- `#d68f01` → `$accent-color`
- `#c7c7c7` / `#c7c7c7ff` → `$border-color-light`
- `#999` → `$text-secondary`
- `#000000` → `$text-primary`
- `#fff` → 按上下文
- `#61d4cc`, `#629cde`, `#a5bfe8`, `#cfb55f`, `#fa927a`, `#e5e9f2` — 这些是图表/标签专属色，**保留硬编码**，加注释 `// chart color`
- `rgba(50, 74, 112, 1)` → `$bg-color-card`

- [ ] **Step 2: 替换 pages/index/record/index.vue**

- `#223a7a` → `$nav-bg-alt`
- `#324A70FF` / `#324A7033` → `$bg-color-card` / `$border-color-card`
- `#D68F01FF` → `$accent-color`
- `#C7C7C7FF` → `$border-color-light`
- `#F4F6F9FF` → `$bg-color-light`
- `#0000003F` → 保留（黑色半透明遮罩）
- `#808080` → `$text-disabled`（灰色）
- `#fff` → 按上下文

- [ ] **Step 3: 替换 pages/index/scan/index.vue**

- `#324a7033` / `#324a70ff` → `$border-color-card` / `$bg-color-card`
- `#1ecfff` → `$link-color`
- `#d28b0a` → `$accent-color`
- `#333` → `$text-primary`
- `#cccccc` → `$border-color-light`
- `#f7f9fb` → `$bg-color-light`
- `#fff` → 按上下文

- [ ] **Step 4: 替换 pages/index/scan/result/index.vue**

- `#d68f01ff` → `$accent-color`
- `rgba(14, 203, 247, 1)` → `$link-color`
- `rgba(255, 255, 255, 1)` → `$bg-color-white`
- `#fff` → 按上下文

- [ ] **Step 5: 替换 pages/index/scan/detail/index.vue**

- `#13337CFF` → `$nav-bg`
- `#152136` → `$bg-color-dark`
- `#333` / `#333333FF` → `$text-primary`
- `#999999FF` → `$text-secondary`
- `#D68F01` / `#D68F01FF` → `$accent-color`
- `#E0D7D7FF` → `$border-color-input`
- `#F4F6F9FF` → `$bg-color-light`
- `rgba(14, 203, 247, 1)` → `$link-color`
- `#fff` → 按上下文

- [ ] **Step 6: 替换 pages/index/info/index.vue**

- `#1ecfff` → `$link-color`
- `#223a7a` → `$nav-bg-alt`
- `#333` → `$text-primary`
- `#cccccc` → `$border-color-light`
- `#e5e5e5` → `$border-color-light`（近似）
- `#f7f9fb` → `$bg-color-light`
- `#fff` → 按上下文

- [ ] **Step 7: Commit**

```bash
git add pages/index/
git commit -m "refactor(style): index 模块替换硬编码为 SCSS 变量"
```

---

### Task 6: index/customer 模块（3个文件）

**Files:**
- Modify: `pages/index/customer/index.vue`
- Modify: `pages/index/customer/edit/index.vue`
- Modify: `pages/index/customer/bindPhone/index.vue`

- [ ] **Step 1: 替换 pages/index/customer/index.vue**

硬编码与 `pages/index/index.vue` 基本相同（含图表色），图表色保留。

- [ ] **Step 2: 替换 pages/index/customer/edit/index.vue**

- `#13337cff` → `$nav-bg`
- `#333` / `#333333` → `$text-primary`
- `#cccccc` → `$border-color-light`
- `#e0d7d7ff` → `$border-color-input`
- `#f7f9fb` → `$bg-color-light`
- `#fff` → 按上下文

- [ ] **Step 3: 替换 pages/index/customer/bindPhone/index.vue**

同 edit（硬编码完全一致）

- [ ] **Step 4: Commit**

```bash
git add pages/index/customer/
git commit -m "refactor(style): customer 模块替换硬编码为 SCSS 变量"
```

---

### Task 7: device 基础页（4个文件）

**Files:**
- Modify: `pages/device/index.vue`
- Modify: `pages/device/renewal/index.vue`
- Modify: `pages/device/renewal/record/index.vue`
- Modify: `pages/device/param/index.vue`

- [ ] **Step 1: 确认 pages/device/index.vue 无需替换**

该文件为空骨架（仅含空 template/script/style），无硬编码颜色，跳过。

- [ ] **Step 2: 替换 pages/device/renewal/index.vue**

- `#13337cff` → `$nav-bg`
- `#152136ff` → `$bg-color-dark`
- `#333` → `$text-primary`
- `#999999` → `$text-secondary`
- `#cccccc` → `$border-color-light`
- `#f4f6f9ff` → `$bg-color-light`
- `rgba(19, 51, 124, 1)` → `$nav-bg`
- `#fff` → 按上下文

- [ ] **Step 3: 替换 pages/device/renewal/record/index.vue**

- `#0000003f` → 保留（遮罩）
- `#1ecfff` → `$link-color`
- `#324a7033` / `#324a70ff` → `$border-color-card` / `$bg-color-card`
- `#bfc9d6` → `$text-light-blue`（近似浅蓝灰）
- `#fff` → 按上下文

- [ ] **Step 4: 替换 pages/device/param/index.vue**

- `#005cf0` → `$nav-bg`（近似蓝，保留注释）
- `#152136` → `$bg-color-dark`
- `#233657` → `$bg-color-medium`
- `#fff` → 按上下文

- [ ] **Step 5: Commit**

```bash
git add pages/device/index.vue pages/device/renewal/ pages/device/param/
git commit -m "refactor(style): device 基础页替换硬编码为 SCSS 变量"
```

---

### Task 8: device/edit + detail + stat（3个文件）

**Files:**
- Modify: `pages/device/edit/index.vue`
- Modify: `pages/device/detail/index.vue`
- Modify: `pages/device/stat/index.vue`

> `device/detail` 含大量状态机专属色，**只替换速查表中列出的值**，其余保留。

- [ ] **Step 1: 替换 pages/device/edit/index.vue**

同 customer/edit（硬编码完全一致）

- [ ] **Step 2: 替换 pages/device/detail/index.vue**

仅替换速查表中的值：
- `#13337c` / `#13337cff` → `$nav-bg`
- `#152136` → `$bg-color-dark`
- `#324a7033` / `#324a70ff` → `$border-color-card` / `$bg-color-card`
- `#333333` → `$text-primary`
- `#d68f01` / `#d68f01ff` → `$accent-color`
- `#0ecbf7` → `$link-color`
- `rgba(50, 74, 112, 1)` → `$bg-color-card`
- `rgba(26, 71, 156, 1)` / `#1a479cff` → `$nav-bg`（近似）
- `rgba(0, 0, 0, 0.12)` / `rgba(0, 0, 0, 0.3)` → 保留（通用透明黑）
- 状态机色（`#013A2D`, `#019B7A`, `#05510D`, `#08B014`, `#4f3500ff` 等）→ **保留硬编码，加注释 `// status color`**

- [ ] **Step 3: 替换 pages/device/stat/index.vue**

- `#233657` → `$bg-color-medium`
- `#324A70` → `$bg-color-card`
- `#35568FFF` → `$nav-bg`（近似）
- `#A5BFE8` → `$text-light-blue`
- `#CCCCCC` → `$border-color-light`
- `#fff` → 按上下文

- [ ] **Step 4: Commit**

```bash
git add pages/device/edit/ pages/device/detail/ pages/device/stat/
git commit -m "refactor(style): device/edit+detail+stat 替换硬编码为 SCSS 变量"
```

---

### Task 9: device/authorize + filter（3个文件）

**Files:**
- Modify: `pages/device/authorize/index.vue`
- Modify: `pages/device/filter/index.vue`
- Modify: `pages/device/filter/record/index.vue`

- [ ] **Step 1: 替换 pages/device/authorize/index.vue**

- `#13337c` / `#13337cff` → `$nav-bg`
- `#223a7a` → `$nav-bg-alt`
- `#333` → `$text-primary`
- `#999999` / `#999999ff` → `$text-secondary`
- `#a5bfe8ff` → `$text-light-blue`
- `#cccccc` → `$border-color-light`
- `#d68f01ff` → `$accent-color`
- `#eee` → `$border-color-light`（近似）
- `#f7f9fb` → `$bg-color-light`
- `rgba(14, 203, 247, 1)` → `$link-color`
- `#fff` / `#ffffffff` → 按上下文

- [ ] **Step 2: 替换 pages/device/filter/index.vue**

- `#13337c` / `#13337cff` → `$nav-bg`
- `#152136ff` → `$bg-color-dark`
- `#808080` / `#898989` / `#999999` → `$text-secondary` 或 `$text-disabled`
- `#a5abb7` → `$text-light-blue`
- `#ccc` → `$border-color-light`
- `#f4f6f9ff` → `$bg-color-light`
- `#057f13` / `#08d521` → `$success-color`（近似，统一）
- `#da0707` / `#f89090` → `$error-color`（本色和浅色版，浅色版加注释）

- [ ] **Step 3: 替换 pages/device/filter/record/index.vue**

- `#0000003f` → 保留（遮罩）
- `#1ecfff` → `$link-color`
- `#324a7033` / `#324a70ff` → `$border-color-card` / `$bg-color-card`
- `#c7c7c7ff` → `$border-color-light`
- `#fff` → 按上下文

- [ ] **Step 4: Commit**

```bash
git add pages/device/authorize/ pages/device/filter/
git commit -m "refactor(style): device/authorize+filter 替换硬编码为 SCSS 变量"
```

---

### Task 10: device/setting 模块（4个文件）

**Files:**
- Modify: `pages/device/setting/index.vue`
- Modify: `pages/device/setting/sterilize/index.vue`
- Modify: `pages/device/setting/wash/index.vue`
- Modify: `pages/device/setting/run/index.vue`

> 4个文件硬编码高度相似。

- [ ] **Step 1: 替换 pages/device/setting/index.vue**

- `#0ECBF7` → `$link-color`
- `#324a70` / `#324a70ff` / `#324a7033` → `$bg-color-card` / `$border-color-card`
- `#a5bfe8ff` → `$text-light-blue`
- `#d68f01` → `$accent-color`
- `rgba(255, 255, 255, 0.1)` → `$border-color`
- `#fff` / `#ffffffff` → 按上下文

- [ ] **Step 2: 替换 pages/device/setting/sterilize/index.vue**

- `#324a70` / `#324a70ff` / `#324a7033` → 同上
- `#d68f01` → `$accent-color`
- `#dbe7f3` → `$bg-color-light`（近似）
- `#eaf3ff` → `$bg-color-light`（近似，加注释）
- `rgba(255, 255, 255, 0.1)` → `$border-color`
- `#fff` / `#ffffff` → 按上下文

- [ ] **Step 3: 替换 pages/device/setting/wash/index.vue**

同 sterilize（无 dbe7f3/eaf3ff）

- [ ] **Step 4: 替换 pages/device/setting/run/index.vue**

同 sterilize

- [ ] **Step 5: Commit**

```bash
git add pages/device/setting/
git commit -m "refactor(style): device/setting 模块替换硬编码为 SCSS 变量"
```

---

### Task 11: device/data + share 模块（4个文件）

**Files:**
- Modify: `pages/device/data/index.vue`
- Modify: `pages/device/share/index.vue`
- Modify: `pages/device/share/detail/index.vue`
- Modify: `pages/device/share/add/index.vue`

- [ ] **Step 1: 替换 pages/device/data/index.vue**

- `#324a7033` / `#324a70ff` → `$border-color-card` / `$bg-color-card`
- `#a5bfe8` → `$text-light-blue`
- `#fff` → 按上下文

- [ ] **Step 2: 替换 pages/device/share/index.vue**

- `#333333` → `$text-primary`
- `#4a90e2` → `$nav-bg`（近似蓝）
- `#c7c7cc` / `#cdcdcd` → `$border-color-light`
- `#f4f6f9ff` → `$bg-color-light`
- `rgba(19, 51, 124, 1)` → `$nav-bg`
- `rgba(21, 33, 54, 1)` → `$bg-color-dark`
- `rgba(224, 215, 215, 1)` → `$border-color-input`
- `rgba(244, 246, 249, 1)` → `$bg-color-light`
- `#fff` / `#ffffff` → 按上下文

- [ ] **Step 3: 替换 pages/device/share/detail/index.vue**

- `#1c2431` → `$bg-color`
- `#223a7a` → `$nav-bg-alt`
- `#333` → `$text-primary`
- `#d28b0a` → `$accent-color`
- `#eeeeee` → `$border-color-light`
- `#f76260` → `$error-color`
- `#fff` → 按上下文

- [ ] **Step 4: 替换 pages/device/share/add/index.vue**

- `#1c2431` → `$bg-color`
- `#223a7a` → `$nav-bg-alt`
- `#cccccc` → `$border-color-light`
- `#eeeeee` → `$border-color-light`
- `rgba(214, 143, 1, 1)` → `$accent-color`
- `rgba(237, 115, 88, 1)` → `$danger-color`
- `#fff` → 按上下文

- [ ] **Step 5: Commit**

```bash
git add pages/device/data/ pages/device/share/
git commit -m "refactor(style): device/data+share 替换硬编码为 SCSS 变量"
```

---

### Task 12: case 模块（2个文件）

**Files:**
- Modify: `pages/case/index.vue`
- Modify: `pages/case/detail/index.vue`

- [ ] **Step 1: 替换 pages/case/index.vue**

- `#0ecbf7ff` → `$link-color`
- `#324a7033` / `#324a70ff` → `$border-color-card` / `$bg-color-card`
- `#a5bfe8` / `#a5bfe8ff` → `$text-light-blue`
- `#fff` → 按上下文

- [ ] **Step 2: 替换 pages/case/detail/index.vue**

- `#000000` → `$text-primary`
- `#333333` / `#444444` → `$text-primary`（444 可用 $text-primary 或保留，按上下文）
- `#a6a6a6` → `$text-secondary`
- `#fff` → 按上下文

- [ ] **Step 3: Commit**

```bash
git add pages/case/
git commit -m "refactor(style): case 模块替换硬编码为 SCSS 变量"
```

---

### Task 13: message + news 模块（4个文件）

**Files:**
- Modify: `pages/message/index.vue`
- Modify: `pages/message/detail/index.vue`
- Modify: `pages/news/index.vue`
- Modify: `pages/news/detail/index.vue`

- [ ] **Step 1: 替换 pages/message/index.vue**

- `#000000` → `$text-primary`
- `#324a7033` / `#324a70ff` → `$border-color-card` / `$bg-color-card`
- `#c7c7c7` → `$border-color-light`
- `#fff` / `#ffffffff` → 按上下文

- [ ] **Step 2: 替换 pages/message/detail/index.vue**

- `#0000003f` → 保留（遮罩）
- `#324a7033` / `#324a70ff` → `$border-color-card` / `$bg-color-card`
- `#4a9fee` → `$nav-bg`（近似蓝，加注释）
- `#c7c7c7ff` → `$border-color-light`
- `#d68f01` → `$accent-color`
- `#ff4d4f` → `$error-color`
- `#fff` → 按上下文

- [ ] **Step 3: 替换 pages/news/index.vue**

- `#324a7033` / `#324a70ff` → `$border-color-card` / `$bg-color-card`
- `#c7c7c7ff` → `$border-color-light`
- `#fff` → 按上下文

- [ ] **Step 4: 替换 pages/news/detail/index.vue**

- `#333333` / `#333333ff` / `#444444` → `$text-primary`
- `#a6a6a6` → `$text-secondary`
- `#fff` → 按上下文

- [ ] **Step 5: Commit**

```bash
git add pages/message/ pages/news/
git commit -m "refactor(style): message+news 模块替换硬编码为 SCSS 变量"
```

---

### Task 14: components（3个文件）

**Files:**
- Modify: `components/cityPicker/index.vue`
- Modify: `components/xp-picker/xp-picker.vue`
- Modify: `components/Switch/index.vue`

- [ ] **Step 1: 替换 components/cityPicker/index.vue**

- `rgba(0, 0, 0, .5)` → 保留（通用遮罩）
- `#fff` → 按上下文

- [ ] **Step 2: 替换 components/xp-picker/xp-picker.vue**

- `#007aff` → `$nav-bg`（近似蓝）
- `#324a70` → `$bg-color-card`
- `#999` → `$text-secondary`
- `#e5e5e5` → `$border-color-light`
- `#f5f5f5` → `$bg-color-light`（近似）
- `#ff0000` → `$error-color`
- `rgb(0, 0, 0)` → `$text-primary`
- `#fff` → 按上下文

- [ ] **Step 3: 替换 components/Switch/index.vue**

- `#0ecbf7ff` → `$link-color`
- `#a5bfe8ff` → `$text-light-blue`
- `rgba(0, 0, 0, 0.08)` → 保留（通用阴影）
- `#fff` → 按上下文

- [ ] **Step 4: Commit**

```bash
git add components/
git commit -m "refactor(style): components 替换硬编码为 SCSS 变量"
```

---

### Task 15: 最终验证

- [ ] **Step 1: 确认无残留硬编码（主要颜色）**

```bash
# 检查是否还有高频硬编码颜色
grep -rn --include="*.vue" --include="*.scss" \
  -E "(#d68f01|#0ecbf7|#324a70|#13337c|#152136|#1c2431)" \
  pages/ components/ style/ \
  | grep -v "theme.scss" | grep -v ".md"
```

预期：无输出（或只剩注释中的颜色说明）

- [ ] **Step 2: 确认 theme.scss 可被正确 import**

```bash
grep -n "theme.scss" uni.scss style/index.scss
```

预期：两个文件各有一行 import

- [ ] **Step 3: 最终 Commit**

```bash
git add -A
git status  # 确认无意外修改
git commit -m "refactor(style): 完成样式变量统一管理，消除硬编码颜色值"
```
