# 产测APP 全页面实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现优口净水器产品测试APP的全部页面，包括登录、首页、设备绑定、查找型号、绑定记录、产品测试、测试执行、电控数据共8个页面。

**Architecture:** UniApp Vue3 项目，light-blue (#e8f4fd) 主题，白色圆角卡片，蓝色主色 (#1a9de4)。所有接口调用通过 api/api.js，用户状态通过 Vuex store 管理（token + userInfo）。页面间通过 uni.navigateTo 跳转，传参使用 query string。

**Tech Stack:** UniApp Vue3, SCSS, Vuex, uni.scanCode, uni.showModal

---

## 文件清单

| 操作 | 文件路径 | 说明 |
|------|---------|------|
| 修改 | `pages.json` | 注册所有新页面 |
| 重写 | `pages/login/index.vue` | 登录页 |
| 新建 | `pages/index/index.vue` | 首页 |
| 新建 | `pages/findModel/index.vue` | 查找型号 |
| 新建 | `pages/bind/index.vue` | 设备绑定 |
| 新建 | `pages/bindHistory/index.vue` | 绑定记录 |
| 新建 | `pages/test/index.vue` | 产品测试扫码入口 |
| 新建 | `pages/test/result.vue` | 测试执行/结果页 |
| 新建 | `pages/data/index.vue` | 电控数据页 |

---

## Task 1: 注册所有页面路由

**Files:**
- Modify: `pages.json`

- [ ] **Step 1: 更新 pages.json，注册所有页面**

```json
{
  "pages": [
    {
      "path": "pages/login/index",
      "style": {
        "navigationBarTitleText": "登录",
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页",
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/findModel/index",
      "style": {
        "navigationBarTitleText": "查找型号",
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/bind/index",
      "style": {
        "navigationBarTitleText": "设备绑定",
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/bindHistory/index",
      "style": {
        "navigationBarTitleText": "绑定记录",
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/test/index",
      "style": {
        "navigationBarTitleText": "产品测试",
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/test/result",
      "style": {
        "navigationBarTitleText": "产品测试",
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/data/index",
      "style": {
        "navigationBarTitleText": "电控数据",
        "navigationStyle": "custom"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "水灵夕",
    "navigationBarBackgroundColor": "#fff",
    "backgroundColor": "#e8f4fd"
  },
  "uniIdRouter": {}
}
```

- [ ] **Step 2: Commit**

```bash
git add pages.json
git commit -m "feat: 注册所有产测页面路由"
```

---

## Task 2: 登录页

**Files:**
- Modify: `pages/login/index.vue`

**Design reference:** `docs/screen/login.jpg`
- 浅蓝背景 (#e8f4fd)
- 顶部 logo (static/images/app-logo.png) + 品牌名 + 副标题
- "优口净水器产品测试工具" 文字
- 两个白色圆角输入框（手机号/密码），带图标
- 蓝色圆角登录按钮
- 登录成功 → 跳转首页（reLaunch）

- [ ] **Step 1: 创建/重写 pages/login/index.vue**

```vue
<template>
  <view class="login-page">
    <view class="logo-area">
      <image class="logo" src="/static/images/app-logo.png" mode="aspectFit" />
      <view class="brand-name">优口净水器产品测试工具</view>
    </view>

    <view class="form-area">
      <view class="input-row">
        <uni-icons type="person" size="22" color="#1a9de4" />
        <input
          class="input"
          v-model="account"
          type="number"
          placeholder="请输入手机号"
          placeholder-style="color:#aaa"
        />
      </view>
      <view class="input-row">
        <uni-icons type="locked" size="22" color="#1a9de4" />
        <input
          class="input"
          v-model="password"
          :password="true"
          placeholder="请输入密码"
          placeholder-style="color:#aaa"
        />
      </view>
    </view>

    <button class="login-btn" @tap="doLogin">登录</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { prodtestLogin } from '@/api/api.js'

const store = useStore()
const account = ref('')
const password = ref('')

async function doLogin() {
  if (!account.value || !password.value) {
    uni.showToast({ title: '请输入账号和密码', icon: 'none' })
    return
  }
  try {
    const res = await prodtestLogin({ account: account.value, password: password.value })
    store.commit('setUserInfo', res)
    uni.reLaunch({ url: '/pages/index/index' })
  } catch (e) {}
}
</script>

<style lang="scss">
.login-page {
  min-height: 100vh;
  background: #e8f4fd;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120rpx 60rpx 0;

  .logo-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80rpx;

    .logo {
      width: 360rpx;
      height: 120rpx;
    }

    .brand-name {
      margin-top: 24rpx;
      font-size: 32rpx;
      color: #1a237e;
      font-weight: 600;
    }
  }

  .form-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32rpx;
    margin-bottom: 60rpx;
  }

  .input-row {
    background: #fff;
    border-radius: 60rpx;
    padding: 28rpx 40rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;
    box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);

    .input {
      flex: 1;
      font-size: 30rpx;
      color: #222;
    }
  }

  .login-btn {
    width: 100%;
    background: #1a9de4;
    color: #fff;
    border-radius: 60rpx;
    font-size: 34rpx;
    font-weight: 600;
    padding: 28rpx 0;
    border: none;
    box-shadow: 0 4rpx 16rpx rgba(26,157,228,0.4);
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add pages/login/index.vue
git commit -m "feat: 实现登录页"
```

---

## Task 3: 首页

**Files:**
- Create: `pages/index/index.vue`

**Design reference:** `docs/screen/index.jpg`
- 浅蓝背景，顶部 logo 左，右侧"测试人: xxx 退出"
- 两张白色大卡片：设备绑定（扫码图标）、产品测试（checkbox图标）
- 退出 → 清除 store → reLaunch 登录页

- [ ] **Step 1: 创建 pages/index/index.vue**

```vue
<template>
  <view class="index-page">
    <view class="header">
      <image class="logo" src="/static/images/app-logo.png" mode="aspectFit" />
      <view class="user-info">
        <text class="user-name">测试人: {{ userInfo.name || userInfo.phone }}</text>
        <text class="logout-btn" @tap="logout">退出</text>
      </view>
    </view>

    <view class="menu-list">
      <view class="menu-item" @tap="navTo('/pages/bind/index')">
        <uni-icons type="scan" size="48" color="#1a3a6e" />
        <text class="menu-label">设备绑定</text>
      </view>
      <view class="menu-item" @tap="navTo('/pages/test/index')">
        <uni-icons type="checkbox" size="48" color="#1a3a6e" />
        <text class="menu-label">产品测试</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const userInfo = computed(() => store.state.userInfo || {})

function navTo(url) {
  uni.navigateTo({ url })
}

function logout() {
  store.commit('setUserInfo', { token: '' })
  uni.setStorageSync('token', '')
  uni.setStorageSync('userInfo', {})
  uni.reLaunch({ url: '/pages/login/index' })
}
</script>

<style lang="scss">
.index-page {
  min-height: 100vh;
  background: #e8f4fd;
  padding: 60rpx 40rpx;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 80rpx;

    .logo {
      width: 200rpx;
      height: 70rpx;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 16rpx;

      .user-name {
        font-size: 26rpx;
        color: #1a3a6e;
      }

      .logout-btn {
        font-size: 28rpx;
        color: #e53935;
        font-weight: 600;
      }
    }
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    gap: 28rpx;
  }

  .menu-item {
    background: #fff;
    border-radius: 20rpx;
    padding: 56rpx 40rpx;
    display: flex;
    align-items: center;
    gap: 36rpx;
    box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);

    .menu-label {
      font-size: 36rpx;
      color: #1a3a6e;
      font-weight: 600;
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add pages/index/index.vue
git commit -m "feat: 实现首页"
```

---

## Task 4: 查找型号页

**Files:**
- Create: `pages/findModel/index.vue`

**Design reference:** `docs/screen/findModel.jpg`
- 自定义导航栏（返回 + 查找型号）
- 搜索框（搜索型号/机型ID，点搜索按钮触发）
- 列表：每项显示型号名 + ID + 选择按钮
- 点选择 → 回传数据给设备绑定页（通过 EventChannel 或 globalData）

- [ ] **Step 1: 创建 pages/findModel/index.vue**

```vue
<template>
  <view class="page">
    <!-- 导航栏 -->
    <view class="nav-bar">
      <view class="nav-back" @tap="goBack">
        <uni-icons type="left" size="20" color="#333" />
      </view>
      <text class="nav-title">查找型号</text>
    </view>

    <!-- 搜索栏 -->
    <view class="search-bar">
      <uni-icons type="search" size="18" color="#999" />
      <input
        class="search-input"
        v-model="keyword"
        placeholder="搜索型号/机型ID"
        placeholder-style="color:#999"
        @confirm="doSearch"
      />
      <text class="search-btn" @tap="doSearch">搜索</text>
    </view>

    <!-- 列表 -->
    <scroll-view scroll-y class="list">
      <view
        v-for="item in list"
        :key="item.id"
        class="list-item"
      >
        <view class="item-info">
          <text class="item-name">{{ item.modelName }}</text>
          <text class="item-id">ID：{{ item.id }}</text>
        </view>
        <text class="select-btn" @tap="selectModel(item)">选择</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { loadMachineTypes } from '@/api/api.js'

const keyword = ref('')
const list = ref([])

async function doSearch() {
  try {
    const res = await loadMachineTypes({ name: keyword.value })
    list.value = res?.rows || []
  } catch (e) {}
}

function selectModel(item) {
  const pages = getCurrentPages()
  const prevPage = pages[pages.length - 2]
  if (prevPage) {
    prevPage.$vm.onModelSelected(item)
  }
  uni.navigateBack()
}

function goBack() {
  uni.navigateBack()
}

onMounted(() => {
  doSearch()
})
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #e8f4fd;

  .nav-bar {
    display: flex;
    align-items: center;
    padding: 80rpx 32rpx 24rpx;
    gap: 20rpx;

    .nav-back {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #222;
    }
  }

  .search-bar {
    margin: 0 32rpx 28rpx;
    background: #fff;
    border-radius: 60rpx;
    padding: 20rpx 32rpx;
    display: flex;
    align-items: center;
    gap: 16rpx;

    .search-input {
      flex: 1;
      font-size: 28rpx;
      color: #222;
    }

    .search-btn {
      font-size: 28rpx;
      color: #1a9de4;
      font-weight: 600;
    }
  }

  .list {
    height: calc(100vh - 280rpx);
    padding: 0 32rpx;

    .list-item {
      background: #fff;
      border-radius: 16rpx;
      padding: 28rpx 32rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .item-info {
        flex: 1;
        padding-right: 20rpx;

        .item-name {
          font-size: 30rpx;
          color: #222;
          font-weight: 600;
          display: block;
          margin-bottom: 8rpx;
        }

        .item-id {
          font-size: 26rpx;
          color: #888;
        }
      }

      .select-btn {
        font-size: 28rpx;
        color: #1a9de4;
        font-weight: 600;
        white-space: nowrap;
      }
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add pages/findModel/index.vue
git commit -m "feat: 实现查找型号页"
```

---

## Task 5: 设备绑定页

**Files:**
- Create: `pages/bind/index.vue`

**Design reference:** `docs/screen/bindDevice.jpg`, `docs/screen/bindDevice1.jpg`

**流程：**
1. 初始：型号未选择 + 扫码图示 + 扫码按钮
2. 扫第1码（SN）→ 显示设备信息卡（SN已填，IMEI待扫）→ "继续扫码"按钮
3. 扫第2码（IMEI）→ 调用 `bindMachineImei` → 成功提示 → 重置页面
4. 型号右侧 > 点击 → 跳转查找型号页
5. 删除按钮 → 清空 SN，回到初始状态
6. 绑定记录 链接 → 跳转绑定记录页
7. `onModelSelected(item)` 供查找型号页回调

**注意：**
- 第1次扫码获取 SN（调用 `scanMachineMes`），第2次扫码直接取结果中的 IMEI
- 实际上 `scanMachineMes` 的响应包含 `mes`（SN/流水码）和 `imei`
- 因此第1次扫完后，如果响应含 imei，则直接完成；否则需要第2次扫码（手动扫IMEI）
- 参考产品说明：第1次扫SN码，第2次扫IMEI码（两次扫码）

- [ ] **Step 1: 创建 pages/bind/index.vue**

```vue
<template>
  <view class="page">
    <!-- 导航栏 -->
    <view class="nav-bar">
      <view class="nav-back" @tap="goBack">
        <uni-icons type="left" size="20" color="#333" />
      </view>
      <text class="nav-title">设备绑定</text>
    </view>

    <!-- 型号选择 -->
    <view class="section-label">指定机型</view>
    <view class="model-row" @tap="toFindModel">
      <text class="model-key">型号</text>
      <view class="model-right">
        <text class="model-val" :class="{ placeholder: !selectedModel }">
          {{ selectedModel ? selectedModel.modelName : '未选择' }}
        </text>
        <uni-icons type="right" size="18" color="#888" />
      </view>
    </view>

    <!-- 扫码图示 -->
    <view class="scan-area">
      <view class="phone-mock">
        <uni-icons type="scan" size="80" color="#1a9de4" />
      </view>
      <text class="scan-title">扫码绑定设备</text>
      <text class="scan-desc">请扫描饮水器上的SN码进行设备绑定</text>
    </view>

    <!-- 设备信息卡（扫到SN后显示） -->
    <view v-if="snCode" class="device-card">
      <text class="card-title">设备信息</text>
      <view class="card-row">
        <text class="card-label">SN：</text>
        <text class="card-value">{{ snCode }}</text>
        <view class="delete-btn" @tap="clearScan">
          <uni-icons type="trash" size="20" color="#fff" />
        </view>
      </view>
      <view class="card-row">
        <text class="card-label">IMEI：</text>
        <text class="card-value placeholder">{{ imeiCode || '请扫描识别设备IMEI' }}</text>
      </view>
    </view>

    <!-- 操作按钮 -->
    <button class="action-btn" @tap="doScan">
      <uni-icons type="scan" size="22" color="#fff" />
      {{ snCode ? '继续扫码' : '扫码' }}
    </button>

    <!-- 绑定记录 -->
    <text class="history-link" @tap="toHistory">绑定记录</text>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { scanMachineMes, bindMachineImei } from '@/api/api.js'

const selectedModel = ref(null)
const snCode = ref('')
const imeiCode = ref('')
const deviceId = ref(null)

function toFindModel() {
  uni.navigateTo({ url: '/pages/findModel/index' })
}

function onModelSelected(item) {
  selectedModel.value = item
}

// 暴露给查找型号页回调
defineExpose({ onModelSelected })

function toHistory() {
  uni.navigateTo({ url: '/pages/bindHistory/index' })
}

function goBack() {
  uni.navigateBack()
}

function clearScan() {
  snCode.value = ''
  imeiCode.value = ''
  deviceId.value = null
}

async function doScan() {
  if (!selectedModel.value) {
    uni.showToast({ title: '请先选择机型', icon: 'none' })
    return
  }

  uni.scanCode({
    onlyFromCamera: true,
    async success(res) {
      const code = res.result
      if (!snCode.value) {
        // 第1次扫码 → SN，响应可能已包含IMEI
        try {
          const data = await scanMachineMes({ mes: code })
          snCode.value = data.mes || code
          imeiCode.value = data.imei || ''
          deviceId.value = data.id
          // 如果第1次扫码响应已包含IMEI，直接绑定
          if (data.imei) {
            await doBind()
          }
        } catch (e) {}
      } else {
        // 第2次扫码 → IMEI
        imeiCode.value = code
        await doBind()
      }
    },
    fail() {
      uni.showToast({ title: '扫码取消', icon: 'none' })
    }
  })
}

async function doBind() {
  if (!selectedModel.value || !snCode.value || !imeiCode.value) {
    uni.showToast({ title: '信息不完整', icon: 'none' })
    return
  }
  try {
    await bindMachineImei({
      machineId: selectedModel.value.id,
      mes: snCode.value,
      imei: imeiCode.value
    })
    uni.showToast({ title: '绑定成功', icon: 'success' })
    clearScan()
  } catch (e) {}
}
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #e8f4fd;
  padding-bottom: 60rpx;

  .nav-bar {
    display: flex;
    align-items: center;
    padding: 80rpx 32rpx 24rpx;
    gap: 20rpx;

    .nav-back {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
    }

    .nav-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #222;
    }
  }

  .section-label {
    padding: 0 40rpx 16rpx;
    font-size: 26rpx;
    color: #888;
  }

  .model-row {
    margin: 0 32rpx 32rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 28rpx 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);

    .model-key {
      font-size: 30rpx;
      font-weight: 600;
      color: #222;
    }

    .model-right {
      display: flex;
      align-items: center;
      gap: 8rpx;
    }

    .model-val {
      font-size: 28rpx;
      color: #222;

      &.placeholder {
        color: #aaa;
      }
    }
  }

  .scan-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40rpx 0 20rpx;

    .phone-mock {
      width: 280rpx;
      height: 360rpx;
      border-radius: 40rpx;
      background: rgba(26, 157, 228, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32rpx;
    }

    .scan-title {
      font-size: 34rpx;
      font-weight: 700;
      color: #222;
      margin-bottom: 12rpx;
    }

    .scan-desc {
      font-size: 26rpx;
      color: #666;
    }
  }

  .device-card {
    margin: 24rpx 32rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 28rpx 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);

    .card-title {
      font-size: 28rpx;
      color: #222;
      font-weight: 600;
      display: block;
      margin-bottom: 20rpx;
    }

    .card-row {
      display: flex;
      align-items: center;
      padding: 16rpx 0;
      border-bottom: 1rpx solid #f0f0f0;

      &:last-child { border-bottom: none; }

      .card-label {
        font-size: 28rpx;
        color: #666;
        width: 120rpx;
      }

      .card-value {
        flex: 1;
        font-size: 28rpx;
        color: #222;

        &.placeholder { color: #aaa; }
      }

      .delete-btn {
        width: 56rpx;
        height: 56rpx;
        border-radius: 50%;
        background: #e53935;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .action-btn {
    margin: 32rpx 80rpx 0;
    background: #1a9de4;
    color: #fff;
    border-radius: 60rpx;
    font-size: 32rpx;
    padding: 26rpx 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    border: none;
    box-shadow: 0 4rpx 16rpx rgba(26,157,228,0.35);
  }

  .history-link {
    display: block;
    text-align: center;
    margin-top: 32rpx;
    font-size: 28rpx;
    color: #1a9de4;
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add pages/bind/index.vue
git commit -m "feat: 实现设备绑定页"
```

---

## Task 6: 绑定记录页

**Files:**
- Create: `pages/bindHistory/index.vue`

**Design reference:** `docs/screen/bindHistory.jpg`, `docs/screen/delete.jpg`
- 搜索框（SN/IMEI/型号/机型ID，点搜索触发），默认以 `mes` 类型查询
- 列表：每项显示 型号、SN、IMEI、状态、生产时间，右下角红色"删除设备"按钮
- 删除 → uni.showModal 确认 → 调用 removeDevice → 刷新列表

- [ ] **Step 1: 创建 pages/bindHistory/index.vue**

```vue
<template>
  <view class="page">
    <view class="nav-bar">
      <view class="nav-back" @tap="goBack">
        <uni-icons type="left" size="20" color="#333" />
      </view>
      <text class="nav-title">绑定记录</text>
    </view>

    <view class="search-bar">
      <uni-icons type="search" size="18" color="#999" />
      <input
        class="search-input"
        v-model="keyword"
        placeholder="搜索SN/IMEI/型号/机型ID"
        placeholder-style="color:#999"
        @confirm="doSearch"
      />
      <text class="search-btn" @tap="doSearch">搜索</text>
    </view>

    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <view v-for="item in list" :key="item.id" class="list-item">
        <view class="item-row"><text class="item-label">型号：</text><text class="item-val">{{ item.modelName }}</text></view>
        <view class="item-row"><text class="item-label">SN：</text><text class="item-val">{{ item.mes }}</text></view>
        <view class="item-row"><text class="item-label">IMEI：</text><text class="item-val">{{ item.imei }}</text></view>
        <view class="item-row"><text class="item-label">状态：</text><text class="item-val">{{ item.activeDesc }}</text></view>
        <view class="item-row"><text class="item-label">生产时间：</text><text class="item-val">{{ item.createTime }}</text></view>
        <text class="delete-btn" @tap="confirmDelete(item)">删除设备</text>
      </view>

      <view v-if="list.length === 0" class="empty">暂无记录</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { bindDevices, removeDevice } from '@/api/api.js'

const keyword = ref('')
const list = ref([])
const current = ref(1)
const size = 10

async function doSearch() {
  current.value = 1
  list.value = []
  await fetchData()
}

// arg 是查询类型 (mes/imei)，keyword 是实际搜索值
// 根据 keyword 内容自动判断查询类型：纯数字长度>10视为IMEI，否则默认mes
function getArgType(kw) {
  if (!kw) return 'mes'
  return /^\d{15}$/.test(kw) ? 'imei' : 'mes'
}

async function fetchData() {
  try {
    const res = await bindDevices({
      arg: getArgType(keyword.value),
      keyword: keyword.value || undefined,
      current: current.value,
      size
    })
    if (current.value === 1) {
      list.value = res || []
    } else {
      list.value = [...list.value, ...(res || [])]
    }
  } catch (e) {}
}

function loadMore() {
  current.value++
  fetchData()
}

function confirmDelete(item) {
  uni.showModal({
    title: '提示',
    content: '是否删除设备',
    success: async ({ confirm }) => {
      if (confirm) {
        try {
          await removeDevice({ deviceId: item.id })
          list.value = list.value.filter(d => d.id !== item.id)
          uni.showToast({ title: '已删除', icon: 'success' })
        } catch (e) {}
      }
    }
  })
}

function goBack() {
  uni.navigateBack()
}

onMounted(fetchData)
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #e8f4fd;

  .nav-bar {
    display: flex;
    align-items: center;
    padding: 80rpx 32rpx 24rpx;
    gap: 20rpx;

    .nav-back {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
    }

    .nav-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #222;
    }
  }

  .search-bar {
    margin: 0 32rpx 28rpx;
    background: #fff;
    border-radius: 60rpx;
    padding: 20rpx 32rpx;
    display: flex;
    align-items: center;
    gap: 16rpx;

    .search-input {
      flex: 1;
      font-size: 28rpx;
      color: #222;
    }

    .search-btn {
      font-size: 28rpx;
      color: #1a9de4;
      font-weight: 600;
    }
  }

  .list {
    height: calc(100vh - 260rpx);
    padding: 0 32rpx;
  }

  .list-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 28rpx 32rpx;
    margin-bottom: 20rpx;
    position: relative;

    .item-row {
      display: flex;
      padding: 6rpx 0;

      .item-label {
        font-size: 28rpx;
        color: #888;
        width: 140rpx;
      }

      .item-val {
        font-size: 28rpx;
        color: #222;
        flex: 1;
      }
    }

    .delete-btn {
      display: block;
      text-align: right;
      margin-top: 16rpx;
      font-size: 28rpx;
      color: #e53935;
      font-weight: 600;
    }
  }

  .empty {
    text-align: center;
    padding: 80rpx 0;
    font-size: 28rpx;
    color: #aaa;
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add pages/bindHistory/index.vue
git commit -m "feat: 实现绑定记录页"
```

---

## Task 7: 产品测试扫码入口页

**Files:**
- Create: `pages/test/index.vue`

**Design reference:** `docs/screen/testDevice.jpg`
- 自定义导航
- 扫码图示（手机轮廓 + 扫码图标）
- "扫码测试设备" 标题 + 说明文字
- 扫码按钮 → 调用 `scanMachineMes` → 跳转测试执行页，传递 deviceId

- [ ] **Step 1: 创建 pages/test/index.vue**

```vue
<template>
  <view class="page">
    <view class="nav-bar">
      <view class="nav-back" @tap="goBack">
        <uni-icons type="left" size="20" color="#333" />
      </view>
      <text class="nav-title">产品测试</text>
    </view>

    <view class="scan-area">
      <view class="phone-mock">
        <uni-icons type="scan" size="80" color="#1a9de4" />
      </view>
      <text class="scan-title">扫码测试设备</text>
      <text class="scan-desc">请扫描饮水器上的SN码进行设备测试</text>
    </view>

    <button class="action-btn" @tap="doScan">
      <uni-icons type="scan" size="22" color="#fff" />
      扫码
    </button>
  </view>
</template>

<script setup>
import { scanMachineMes } from '@/api/api.js'

function goBack() {
  uni.navigateBack()
}

async function doScan() {
  uni.scanCode({
    onlyFromCamera: true,
    async success(res) {
      try {
        const data = await scanMachineMes({ mes: res.result })
        uni.navigateTo({
          url: `/pages/test/result?deviceId=${data.id}&modelName=${data.modelName}&mes=${data.mes}&imei=${data.imei}`
        })
      } catch (e) {}
    },
    fail() {
      uni.showToast({ title: '扫码取消', icon: 'none' })
    }
  })
}
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #e8f4fd;

  .nav-bar {
    display: flex;
    align-items: center;
    padding: 80rpx 32rpx 24rpx;
    gap: 20rpx;

    .nav-back {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
    }

    .nav-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #222;
    }
  }

  .scan-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80rpx 0 60rpx;

    .phone-mock {
      width: 280rpx;
      height: 360rpx;
      border-radius: 40rpx;
      background: rgba(26, 157, 228, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40rpx;
    }

    .scan-title {
      font-size: 36rpx;
      font-weight: 700;
      color: #222;
      margin-bottom: 16rpx;
    }

    .scan-desc {
      font-size: 28rpx;
      color: #666;
    }
  }

  .action-btn {
    margin: 0 120rpx;
    background: #1a9de4;
    color: #fff;
    border-radius: 60rpx;
    font-size: 32rpx;
    padding: 26rpx 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    border: none;
    box-shadow: 0 4rpx 16rpx rgba(26,157,228,0.35);
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add pages/test/index.vue
git commit -m "feat: 实现产品测试扫码入口页"
```

---

## Task 8: 测试执行/结果页

**Files:**
- Create: `pages/test/result.vue`

**Design reference:** `docs/screen/test.jpg`

**流程：**
- 进入时用 deviceId 调用 `resultTestDevice` 获取测试结果
- 顶部设备信息卡（型号名、SN、IMEI）+ 绿色"电控数据"按钮 + 蓝色"重新测试"按钮
- 测试数据区：展示各测试项（联网测试、激活测试、数据校验、数据复位）及其子项，每项显示通过/失败状态
- 右上角"继续测试"按钮：调用 `startTestDevice`（步骤按顺序：onlinetest → activedata → datavalidate → datareset），然后刷新
- 步骤顺序规则：找第一个 pass=false 的 row 作为下一步；如果全部 pass 则禁用按钮

**注意：** 步骤key顺序固定：onlinetest、activedata、datavalidate、datareset

- [ ] **Step 1: 创建 pages/test/result.vue**

```vue
<template>
  <view class="page">
    <view class="nav-bar">
      <view class="nav-back" @tap="goBack">
        <uni-icons type="left" size="20" color="#333" />
      </view>
      <text class="nav-title">产品测试</text>
    </view>

    <!-- 设备信息卡 -->
    <view v-if="deviceInfo" class="device-card">
      <view class="card-header">
        <view class="model-info">
          <image class="device-icon" src="/static/images/param.png" mode="aspectFit" />
          <text class="model-name">{{ deviceInfo.modelName }}</text>
        </view>
        <view class="card-actions">
          <text class="btn-data" @tap="toData">电控数据</text>
          <text class="btn-retest" @tap="loadResult">重新测试</text>
        </view>
      </view>
      <view class="card-sn">
        <text class="sn-label">SN：</text><text class="sn-val">{{ deviceInfo.mes }}</text>
      </view>
      <view class="card-sn">
        <text class="sn-label">IMEI：</text><text class="sn-val">{{ deviceInfo.imei }}</text>
      </view>
    </view>

    <!-- 测试数据 -->
    <view class="test-section-header">
      <text class="section-title">测试数据</text>
      <text
        class="continue-btn"
        :class="{ disabled: !nextStep }"
        @tap="continueTest"
      >继续测试</text>
    </view>

    <scroll-view scroll-y class="test-list">
      <view v-for="row in rows" :key="row.key" class="test-group">
        <view class="group-header">
          <text class="group-label">{{ row.label }}</text>
          <view class="pass-badge" :class="row.pass ? 'pass' : 'fail'">
            <uni-icons :type="row.pass ? 'checkmarkempty' : 'closeempty'" size="14" :color="row.pass ? '#4caf50' : '#e53935'" />
          </view>
        </view>
        <view v-if="row.childs && row.childs.length" class="child-list">
          <view v-for="child in row.childs" :key="child.key" class="child-row">
            <text class="child-label">{{ child.label }}</text>
            <view class="child-right">
              <text class="child-value" :class="child.pass ? 'pass' : 'fail'">{{ child.value }}</text>
              <uni-icons :type="child.pass ? 'checkmarkempty' : 'closeempty'" size="16" :color="child.pass ? '#4caf50' : '#e53935'" />
            </view>
          </view>
        </view>
        <view v-else class="child-row">
          <text class="child-label">{{ row.label }}</text>
          <text class="child-value" :class="row.pass ? 'pass' : 'fail'">{{ row.value }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { resultTestDevice, startTestDevice } from '@/api/api.js'

const props = defineProps({})

// 从路由获取参数
const pages = getCurrentPages()
const curPage = pages[pages.length - 1]
const options = curPage.$page?.options || curPage.options || {}

const deviceId = ref(options.deviceId || '')
const deviceInfo = ref(null)
const rows = ref([])

const stepOrder = ['onlinetest', 'activedata', 'datavalidate', 'datareset']

const nextStep = computed(() => {
  // 按固定顺序查找第一个未通过的步骤
  for (const key of stepOrder) {
    const row = rows.value.find(r => r.key === key)
    if (row && !row.pass) return key
  }
  return null
})

async function loadResult() {
  try {
    const res = await resultTestDevice({ deviceId: deviceId.value })
    deviceInfo.value = res
    rows.value = res.rows || []
  } catch (e) {}
}

async function continueTest() {
  if (!nextStep.value) return
  try {
    await startTestDevice({ step: nextStep.value, deviceId: deviceId.value })
    await loadResult()
  } catch (e) {}
}

function toData() {
  uni.navigateTo({
    url: `/pages/data/index?deviceId=${deviceId.value}&modelName=${deviceInfo.value?.modelName}&mes=${deviceInfo.value?.mes}&imei=${deviceInfo.value?.imei}`
  })
}

function goBack() {
  uni.navigateBack()
}

onMounted(() => {
  loadResult()
})
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #e8f4fd;

  .nav-bar {
    display: flex;
    align-items: center;
    padding: 80rpx 32rpx 24rpx;
    gap: 20rpx;

    .nav-back { width: 60rpx; height: 60rpx; display: flex; align-items: center; }
    .nav-title { font-size: 36rpx; font-weight: 600; color: #222; }
  }

  .device-card {
    margin: 0 32rpx 24rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 28rpx 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20rpx;

      .model-info {
        display: flex;
        align-items: center;
        gap: 16rpx;

        .device-icon { width: 56rpx; height: 56rpx; }
        .model-name { font-size: 32rpx; font-weight: 700; color: #222; }
      }

      .card-actions {
        display: flex;
        gap: 16rpx;

        .btn-data {
          background: #4caf50;
          color: #fff;
          border-radius: 40rpx;
          padding: 12rpx 24rpx;
          font-size: 26rpx;
          font-weight: 600;
        }

        .btn-retest {
          background: #1a9de4;
          color: #fff;
          border-radius: 40rpx;
          padding: 12rpx 24rpx;
          font-size: 26rpx;
          font-weight: 600;
        }
      }
    }

    .card-sn {
      display: flex;
      padding: 6rpx 0;
      .sn-label { font-size: 26rpx; color: #888; width: 100rpx; }
      .sn-val { font-size: 26rpx; color: #222; }
    }
  }

  .test-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40rpx 16rpx;

    .section-title { font-size: 30rpx; font-weight: 700; color: #555; }

    .continue-btn {
      font-size: 26rpx;
      color: #1a9de4;
      border: 1rpx solid #1a9de4;
      border-radius: 30rpx;
      padding: 8rpx 24rpx;

      &.disabled {
        color: #bbb;
        border-color: #ddd;
      }
    }
  }

  .test-list {
    height: calc(100vh - 520rpx);
    padding: 0 32rpx;
  }

  .test-group {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx 28rpx;
    margin-bottom: 20rpx;

    .group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16rpx;

      .group-label { font-size: 30rpx; font-weight: 700; color: #222; }

      .pass-badge {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &.pass { background: rgba(76,175,80,0.12); }
        &.fail { background: rgba(229,57,53,0.12); }
      }
    }

    .child-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10rpx 0;
      border-top: 1rpx solid #f5f5f5;

      .child-label { font-size: 26rpx; color: #555; flex: 1; }

      .child-right {
        display: flex;
        align-items: center;
        gap: 8rpx;
      }

      .child-value {
        font-size: 26rpx;
        &.pass { color: #4caf50; }
        &.fail { color: #e53935; }
      }
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add pages/test/result.vue
git commit -m "feat: 实现测试执行/结果页"
```

---

## Task 9: 电控数据页

**Files:**
- Create: `pages/data/index.vue`

**Design reference:** `docs/screen/data.jpg`, `docs/screen/data1.jpg`

**功能：**
- 顶部设备信息卡（型号、SN、IMEI）
- 网络状态（rssi图标）+ "同步参数"按钮（刷新）
- 参数设置列表：每行 label + 当前值 + 修改按钮
- 点修改 → 弹出修改弹窗：
  - type=radio：单选列表（options），选中后点确认 → 调用 `cmdPost`
  - type=其他（input）：输入框修改 → 调用 `cmdPost`
- 弹窗外 Toast 提示"指令下发成功"

- [ ] **Step 1: 创建 pages/data/index.vue**

```vue
<template>
  <view class="page">
    <view class="nav-bar">
      <view class="nav-back" @tap="goBack">
        <uni-icons type="left" size="20" color="#333" />
      </view>
      <text class="nav-title">电控数据</text>
    </view>

    <!-- 设备信息卡 -->
    <view v-if="deviceData" class="device-card">
      <view class="card-model">
        <image class="device-icon" src="/static/images/param.png" mode="aspectFit" />
        <text class="model-name">{{ deviceData.modelName }}</text>
      </view>
      <view class="card-row">
        <text class="sn-label">SN：</text>
        <text class="sn-val">{{ deviceData.sn }}</text>
      </view>
      <view class="card-row">
        <text class="sn-label">IMEI：</text>
        <text class="sn-val">{{ deviceData.imei }}</text>
      </view>
    </view>

    <!-- 网络状态 -->
    <view v-if="deviceData" class="network-card">
      <view class="network-left">
        <text class="network-title">网络状态</text>
        <image
          v-if="deviceData.rssiUrl"
          :src="deviceData.rssiUrl"
          class="rssi-icon"
          mode="aspectFit"
        />
        <uni-icons v-else type="wifi" size="20" color="#4caf50" />
      </view>
      <text class="sync-btn" @tap="loadData">同步参数</text>
    </view>

    <!-- 参数设置 -->
    <view v-if="deviceData" class="params-section">
      <text class="params-title">参数设置</text>
      <scroll-view scroll-y class="params-list">
        <view v-for="row in deviceData.rows" :key="row.key" class="param-row">
          <view class="param-info">
            <text class="param-label">{{ row.title }}</text>
            <text class="param-value">{{ row.value }}</text>
          </view>
          <text v-if="row.editable" class="modify-btn" @tap="openEdit(row)">修改</text>
        </view>
      </scroll-view>
    </view>

    <!-- 修改弹窗 -->
    <view v-if="editRow" class="modal-mask" @tap.self="closeEdit">
      <view class="modal">
        <text class="modal-title">修改数据</text>

        <!-- radio 类型 -->
        <view v-if="editRow.type === 'radio'" class="radio-list">
          <view
            v-for="opt in editRow.options"
            :key="opt.id"
            class="radio-item"
            @tap="editValue = String(opt.id)"
          >
            <view class="radio-circle" :class="{ checked: editValue === String(opt.id) }">
              <uni-icons v-if="editValue === String(opt.id)" type="checkmarkempty" size="16" color="#fff" />
            </view>
            <text class="radio-label">{{ opt.text }}</text>
          </view>
          <!-- 当前值也加入选项 -->
          <view
            v-if="!editRow.options.find(o => o.text === editRow.value)"
            class="radio-item"
            @tap="editValue = editRow.value"
          >
            <view class="radio-circle" :class="{ checked: editValue === editRow.value }">
              <uni-icons v-if="editValue === editRow.value" type="checkmarkempty" size="16" color="#fff" />
            </view>
            <text class="radio-label">{{ editRow.value }}</text>
          </view>
        </view>

        <!-- input 类型 -->
        <view v-else class="input-edit">
          <input
            v-model="editValue"
            class="edit-input"
            :placeholder="'请输入' + editRow.title"
          />
        </view>

        <view class="modal-actions">
          <text class="modal-confirm" @tap="doEdit">确认</text>
          <text class="modal-cancel" @tap="closeEdit">取消</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { deviceData as getDeviceData, cmdPost } from '@/api/api.js'

const pages = getCurrentPages()
const curPage = pages[pages.length - 1]
const options = curPage.$page?.options || curPage.options || {}

const deviceId = ref(options.deviceId || '')
const deviceData = ref(null)
const editRow = ref(null)
const editValue = ref('')

async function loadData() {
  try {
    const res = await getDeviceData({ deviceId: deviceId.value })
    deviceData.value = res
  } catch (e) {}
}

function openEdit(row) {
  editRow.value = row
  editValue.value = String(row.value)
}

function closeEdit() {
  editRow.value = null
  editValue.value = ''
}

async function doEdit() {
  try {
    await cmdPost({
      deviceId: deviceId.value,
      key: editRow.value.key,
      value: editValue.value
    })
    uni.showToast({ title: '指令下发成功', icon: 'none' })
    closeEdit()
    await loadData()
  } catch (e) {}
}

function goBack() {
  uni.navigateBack()
}

onMounted(loadData)
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #e8f4fd;

  .nav-bar {
    display: flex;
    align-items: center;
    padding: 80rpx 32rpx 24rpx;
    gap: 20rpx;

    .nav-back { width: 60rpx; height: 60rpx; display: flex; align-items: center; }
    .nav-title { font-size: 36rpx; font-weight: 600; color: #222; }
  }

  .device-card {
    margin: 0 32rpx 20rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 28rpx 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);

    .card-model {
      display: flex;
      align-items: center;
      gap: 16rpx;
      margin-bottom: 16rpx;

      .device-icon { width: 48rpx; height: 48rpx; }
      .model-name { font-size: 32rpx; font-weight: 700; color: #222; }
    }

    .card-row {
      padding: 8rpx 0;
      .sn-label { font-size: 26rpx; color: #888; }
      .sn-val { font-size: 30rpx; color: #1a9de4; display: block; margin-top: 4rpx; }
    }
  }

  .network-card {
    margin: 0 32rpx 20rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);

    .network-left {
      display: flex;
      align-items: center;
      gap: 12rpx;

      .network-title { font-size: 30rpx; font-weight: 700; color: #222; }
      .rssi-icon { width: 40rpx; height: 40rpx; }
    }

    .sync-btn {
      background: #1a9de4;
      color: #fff;
      border-radius: 40rpx;
      padding: 12rpx 28rpx;
      font-size: 26rpx;
    }
  }

  .params-section {
    margin: 0 32rpx;

    .params-title {
      font-size: 28rpx;
      color: #888;
      display: block;
      margin-bottom: 16rpx;
    }
  }

  .params-list {
    height: calc(100vh - 560rpx);
    background: #fff;
    border-radius: 16rpx;
    padding: 0 20rpx;

    .param-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24rpx 12rpx;
      border-bottom: 1rpx solid #f5f5f5;

      &:last-child { border-bottom: none; }

      .param-info {
        display: flex;
        align-items: center;
        flex: 1;
        gap: 12rpx;
        flex-wrap: wrap;

        .param-label { font-size: 28rpx; color: #333; }
        .param-value { font-size: 28rpx; color: #1a9de4; }
      }

      .modify-btn {
        font-size: 26rpx;
        color: #1a9de4;
        border: 1rpx solid #1a9de4;
        border-radius: 30rpx;
        padding: 8rpx 20rpx;
        white-space: nowrap;
        margin-left: 16rpx;
      }
    }
  }

  .modal-mask {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .modal {
    background: #fff;
    border-radius: 24rpx;
    padding: 48rpx 40rpx 36rpx;
    width: 560rpx;

    .modal-title {
      font-size: 32rpx;
      font-weight: 700;
      color: #222;
      display: block;
      text-align: center;
      margin-bottom: 40rpx;
    }

    .radio-list {
      display: flex;
      flex-direction: column;
      gap: 24rpx;
      margin-bottom: 40rpx;

      .radio-item {
        display: flex;
        align-items: center;
        gap: 20rpx;

        .radio-circle {
          width: 48rpx;
          height: 48rpx;
          border-radius: 50%;
          border: 2rpx solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;

          &.checked {
            background: #1a9de4;
            border-color: #1a9de4;
          }
        }

        .radio-label { font-size: 30rpx; color: #222; }
      }
    }

    .input-edit {
      margin-bottom: 40rpx;

      .edit-input {
        border: 1rpx solid #ddd;
        border-radius: 12rpx;
        padding: 20rpx 24rpx;
        font-size: 28rpx;
        color: #222;
        width: 100%;
      }
    }

    .modal-actions {
      display: flex;
      gap: 24rpx;

      .modal-confirm {
        flex: 1;
        background: #1a9de4;
        color: #fff;
        border-radius: 12rpx;
        padding: 24rpx 0;
        text-align: center;
        font-size: 30rpx;
        font-weight: 600;
      }

      .modal-cancel {
        flex: 1;
        border: 1rpx solid #1a9de4;
        color: #1a9de4;
        border-radius: 12rpx;
        padding: 24rpx 0;
        text-align: center;
        font-size: 30rpx;
      }
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add pages/data/index.vue
git commit -m "feat: 实现电控数据页"
```

---

## 完成验证

- [ ] 所有页面在 pages.json 中已注册
- [ ] 登录 → 首页 → 设备绑定/产品测试 导航流畅
- [ ] 设备绑定：型号选择回调正确、SN/IMEI 扫码流程正常
- [ ] 绑定记录：列表加载、删除确认弹窗正常
- [ ] 产品测试：扫码进入测试结果页
- [ ] 测试结果：继续测试按钮逻辑正确（找第一个 pass=false）
- [ ] 电控数据：参数列表、修改弹窗、cmdPost 调用正常
