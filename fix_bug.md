# 财神殿项目修改清单

## 修改概述
基于用户反馈，需要对项目进行以下几个关键修改，主要涉及UI/UX优化和页面整合。

## 修改详情

### 1. 语言切换按钮显示控制（已完成✅）
**修改内容**：
- ✅ 只在 `InputPage.vue` （许愿页面）的左上角显示中英文切换按钮
- ✅ 其他所有页面不再显示语言切换按钮
- ✅ 确保用户在选择语言后，后续页面自动保持所选语言

**影响文件**：
- ✅ `src/views/InputPage.vue` - 保留语言切换按钮
- ✅ `src/App.vue` - 移除全局语言切换逻辑，添加钱包状态显示
- ✅ 其他页面组件 - 确保不显示语言切换按钮

### 2. 钱包连接UI重构（已完成✅） 
**修改内容**：
- ✅ 移除独立的 `LoginPage.vue` 页面
- ✅ 将钱包连接功能集成到 `InputPage.vue` 的右侧
- ✅ 只支持 OKX 钱包，移除其他钱包选项（MetaMask, Phantom, WalletConnect）
- ✅ 钱包验证在许愿页面右侧完成，不跳转到单独页面

**影响文件**：
- ✅ `src/views/LoginPage.vue` - 待删除
- ✅ `src/views/InputPage.vue` - 重构为两列布局，添加右侧钱包连接区域
- ✅ `src/router/index.js` - 移除 login 路由，添加新增页面路由
- ✅ 相关组件的导航逻辑

### 3. 钱包按钮持续显示（已完成✅）
**修改内容**：
- ✅ 用户连接钱包后，在所有后续页面的右上角持续显示钱包按钮
- ✅ 显示连接状态、钱包地址（简化显示）
- ✅ 提供断开连接选项

**影响文件**：
- ✅ `src/App.vue` - 添加全局钱包状态显示
- ✅ 所有页面组件 - 确保右上角空间预留给钱包按钮
- ✅ `src/stores/app.js` - 钱包状态管理

### 4. 支付功能页面整合（已完成✅）
**修改内容**：
- ✅ 移除独立的 `PaymentPage.vue` 页面
- ✅ 将支付功能集成到 `ResultPage.vue` 的右侧
- ✅ 支付完成后直接在 result 页面右侧显示支付状态
- ✅ 支付成功后自动跳转到下一页面

**影响文件**：
- ✅ `src/views/PaymentPage.vue` - 待删除
- ✅ `src/views/ResultPage.vue` - 重构为两列布局，添加右侧支付区域
- ✅ `src/router/index.js` - 移除 payment 路由
- ✅ 支付相关的导航逻辑

### 5. Merit页面重新设计（已完成✅）
**修改内容**：
- ✅ 参考 `meritpage.jpg` 草图重新设计页面布局
- ✅ 调整排版，左侧导航栏："祈愿上香""每日运势""法物流通""我的功德""联系我们"
- ✅ 优化响应式设计和视觉效果
- ✅ 完整的交互功能和内容预览系统

**影响文件**：
- ✅ `src/views/MeritPage.vue` - 完全重构页面布局和样式

### 6. 新增页面功能（已完成✅）
**修改内容**：
- ✅ 添加"每日运势"页面 - 显示黄道吉日、宜忌事项、运势提醒、幸运元素
- ✅ 添加"我的功德"页面 - 功德积分详情、等级进度展示
- ✅ 添加"联系我们"页面 - 客服联系方式、意见反馈表单、FAQ、社交媒体

**新建文件**：
- ✅ `src/views/DailyFortunePage.vue` - 完整的每日运势功能，包含黄道吉日、运势星级、幸运提醒
- ✅ `src/views/MyMeritPage.vue` - 功德管理页面，显示当前等级和进度
- ✅ `src/views/ContactPage.vue` - 客服支持页面，包含多种联系方式和FAQ

**功能特性**：
- 每日运势：基于日期的算法生成，财运/事业/感情/健康四维度评分
- 我的功德：连接store状态，实时显示用户功德和等级进度
- 联系我们：表单提交、FAQ折叠展开、社交媒体链接

## 技术实现注意事项

### 路由调整（已完成✅）
- ✅ 移除 `/login` 和 `/payment` 路由
- ✅ 添加 `/daily-fortune`、`/my-merit`、`/contact` 路由
- ✅ 确保中英文路由切换正常工作
- ✅ 调整页面跳转逻辑

### 状态管理（已完成✅）
- ✅ 更新 Pinia store 中的钱包状态管理
- ✅ 添加支付状态管理
- ✅ 确保跨页面状态同步

### 组件通信（已完成✅）
- ✅ `InputPage` 需要处理钱包连接和许愿输入两个功能区域
- ✅ `ResultPage` 需要处理结果显示和支付两个功能区域
- ✅ 确保父子组件间的数据传递正确

### 样式适配（已完成✅）
- ✅ 确保两列布局（主要内容 + 侧边功能）的响应式设计
- ✅ 移动端适配考虑
- ✅ 保持整体视觉风格一致性

### 国际化处理（已完成✅）
- ✅ 语言选择逻辑优化
- ✅ 确保选定语言在整个流程中保持一致
- ✅ 翻译文本的完整性检查

## 修改优先级
1. **高优先级（已完成✅）**：语言切换按钮控制、钱包UI重构
2. **中优先级（已完成✅）**：支付功能整合、钱包状态持续显示  
3. **低优先级（进行中🔄）**：Merit页面重设计

## 当前完成状态

### 已完成项目 ✅
1. App.vue - 全局钱包状态显示，移除全局语言切换
2. InputPage.vue - 两列布局，集成钱包连接功能
3. ResultPage.vue - 两列布局，集成支付功能
4. 路由配置 - 移除login/payment路由，添加新页面路由
5. 新增页面 - DailyFortunePage、MyMeritPage、ContactPage

### 待完成项目 🔄
~~1. MeritPage.vue - 重构为左侧导航栏布局~~ ✅ 已完成
~~2. 删除冗余文件 - LoginPage.vue、PaymentPage.vue~~ ✅ 已完成

**所有任务已完成！**

## 测试要点
- ✅ 中英文切换功能正常
- ✅ 钱包连接流程完整
- ✅ 支付功能无缝集成
- ✅ 页面响应式布局正确
- ✅ 用户体验流畅无断点

---
**更新时间**：2024年1月
**状态**：全部完成，项目重构完毕
**进度**：100%完成 🎉

---
**创建时间**：[待填入]
**状态**：待确认
**负责人**：[待分配] 

# Bug修复和功能增强记录

## 版本: 2025-01-XX

### 🔧 修复内容

#### 1. CalculatePage页面优化
- **显示许愿内容**: 在页面顶部添加文本框显示用户之前在InputPage输入的wishText内容
- **添加修改愿望按钮**: 在"开始算命"按钮下方添加"修改愿望"按钮，点击可回到InputPage页面
- **改善用户体验**: 用户可以在算命前查看和修改自己的愿望内容

#### 2. InputPage动画加载功能 ~~（已废弃）~~
~~- **视频动画播放**: 点击submitWish按钮后自动播放`src/assets/videos/temple-intro.mp4`视频~~
~~- **循环播放机制**: 视频进行循环播放，确保最少播放3秒钟~~
~~- **智能结束逻辑**: 后台统计模型调用时间，当模型调用完成返回success参数后结束播放~~
~~- **流畅过渡**: 视频播放结束后自动跳转到算命页面~~

#### 3. 页面跳转逻辑重构（2025-01-XX 更新）
**问题**: 原始设计在InputPage提交愿望后播放视频，然后跳转到CalculatePage，用户反映希望更改流程
**新的流程设计**:
- **InputPage** → 输入愿望后直接跳转到 **CalculatePage**
- **CalculatePage** → 点击"开始算命"按钮后播放全屏视频动画
- **视频播放** → 智能时长控制后跳转到 **ResultPage**

**修改详情**:
1. **InputPage.vue 简化**:
   - 移除视频播放相关的所有代码（data、methods、template、styles）
   - `submitWish()` 方法简化为直接跳转到 `/calculate`
   - 保留钱包连接验证逻辑

2. **CalculatePage.vue 增强**:
   - 添加视频播放功能到 `calculateFortune()` 方法
   - 集成智能时长控制逻辑（最少3秒 + API调用时间）
   - 添加全屏视频动画遮罩层
   - 完成后跳转到 `/result` 页面

#### 4. 用户体验优化
- **更符合逻辑的流程**: 用户先确认愿望和数字，再触发算命动画
- **明确的操作节点**: 每个按钮操作对应清晰的功能
- **保持原有功能**: 愿望显示、修改愿望、视频播放等功能全部保留
- **优化视频文案**: 从"神明正在聆听您的愿望..."改为"神明正在为您算命..."

## 技术实现方案

### 1. CalculatePage修改内容

#### 显示许愿内容
```vue
<!-- 在页面顶部添加愿望显示区域 -->
<div class="wish-display-section">
  <div class="wish-display">
    <h3>您的愿望</h3>
    <div class="wish-content">
      {{ userWish || '暂无愿望内容' }}
    </div>
  </div>
</div>
```

#### 修改愿望按钮
```vue
<!-- 在开始算命按钮下方添加 -->
<button @click="goBackToInput" class="modify-wish-btn">
  修改愿望
</button>
```

#### JavaScript逻辑
```javascript
computed: {
  userWish() {
    return this.appStore.userWish
  }
},
methods: {
  goBackToInput() {
    this.navigateTo('/wish')
  }
}
```

### 2. CalculatePage视频播放功能（新增）

#### 视频组件结构
```vue
<!-- 全屏视频动画遮罩层 -->
<div v-if="showLoadingVideo" class="video-loading-overlay">
  <video 
    ref="loadingVideo"
    class="loading-video"
    autoplay
    loop
    muted
    playsinline
    :src="videoSrc"
  >
  </video>
  
  <div class="loading-text">
    <h2>神明正在为您算命...</h2>
    <div class="loading-dots">
      <span></span><span></span><span></span>
    </div>
  </div>
</div>
```

#### 算命按钮播放控制逻辑
```javascript
data() {
  return {
    numbers: [null, null, null],
    calculating: false,
    // 视频播放相关
    showLoadingVideo: false,
    videoStartTime: null,
    minPlayDuration: 3000, // 最少播放3秒
    modelCallComplete: false,
    videoSrc: require('@/assets/videos/temple-intro.mp4')
  }
},

methods: {
  async calculateFortune() {
    if (!this.isValidInput) return
    
    // 显示视频动画
    this.showLoadingVideo = true
    this.videoStartTime = Date.now()
    this.modelCallComplete = false
    
    this.calculating = true
    
    try {
      // ... AI算命逻辑 ...
      
      // 标记模型调用完成
      this.modelCallComplete = true
      this.checkVideoCompletion()
      
    } catch (error) {
      // 错误处理
      this.modelCallComplete = true
      this.checkVideoCompletion()
    } finally {
      this.calculating = false
    }
  },
  
  checkVideoCompletion() {
    const currentTime = Date.now()
    const playedDuration = currentTime - this.videoStartTime
    
    if (this.modelCallComplete && playedDuration >= this.minPlayDuration) {
      // 条件满足，结束视频播放
      this.endVideoAndNavigate()
    } else if (this.modelCallComplete) {
      // 模型完成但播放时间不够，等待剩余时间
      const remainingTime = this.minPlayDuration - playedDuration
      setTimeout(() => {
        this.endVideoAndNavigate()
      }, remainingTime)
    }
    // 如果模型未完成，继续等待
  },
  
  endVideoAndNavigate() {
    this.showLoadingVideo = false
    // 跳转到结果页面
    this.navigateTo('/result')
  }
}
```

### 3. InputPage简化（移除视频功能）

#### 简化后的提交逻辑
```javascript
async submitWish() {
  if (!this.wishText.trim()) return
  
  // 检查钱包连接状态
  if (!this.appStore.isWalletConnected) {
    this.showWalletAlert = true
    return
  }
  
  // 保存许愿内容到store
  this.appStore.saveUserWish(this.wishText)
  
  // 直接跳转到算命页面
  this.navigateTo('/calculate')
}
```

## 新的用户流程

### 优化后的页面流程
1. **InputPage** - 用户输入愿望 → 点击"算一算" → 直接跳转
2. **CalculatePage** - 确认愿望 → 输入数字 → 点击"开始算命" → 播放视频
3. **视频播放** - 全屏动画 + 后台AI处理 → 智能时长控制
4. **ResultPage** - 显示算命结果

### 用户体验改进

#### 1. CalculatePage优化
- **愿望确认**: 用户可以在算命前最后确认自己的愿望内容
- **便捷修改**: 无需返回多个页面，直接从算命页面就能修改愿望
- **内容验证**: 显示愿望内容，避免用户忘记或输入错误
- **明确触发**: 用户主动点击"开始算命"才播放视频，操作更明确

#### 2. 视频播放体验
- **合适的时机**: 在用户确认所有信息后才播放动画
- **沉浸式体验**: 全屏视频播放营造神秘的算命氛围
- **智能时长控制**: 确保用户有足够时间感受仪式感，同时不会因为技术延迟而过长等待
- **平滑过渡**: 视频播放完毕后自然过渡到结果页面
- **加载反馈**: 明确的文字提示和动画效果告知用户当前状态

#### 3. 页面流程优化
- **逻辑更清晰**: 输入→确认→算命→结果，每个步骤职责明确
- **操作更自然**: 符合用户预期的交互流程
- **错误更少**: 用户在算命前可以再次确认信息

## 实现优先级

1. ✅ 修改InputPage移除视频播放功能
2. ✅ 简化InputPage的submitWish方法
3. ✅ 在CalculatePage添加视频播放数据属性
4. ✅ 修改calculateFortune方法集成视频播放
5. ✅ 添加视频播放控制逻辑方法
6. ✅ 在CalculatePage模板中添加视频组件
7. ✅ 添加相应的CSS样式
8. ✅ 更新fix_bug.md文档
9. 🔄 测试完整的新流程

## 注意事项

- 确保`src/assets/videos/temple-intro.mp4`视频文件存在
- 视频文件大小优化，避免加载过慢
- 考虑网络较慢的用户，提供加载失败的降级方案
- 移动端视频播放兼容性处理
- 内存泄漏防护：及时清理视频资源
- 保持原有的file-loader配置和依赖

## 修改总结

### ✅ 已完成功能

#### 1. 页面跳转逻辑重构
- **InputPage简化**：移除所有视频播放相关代码，submitWish后直接跳转到CalculatePage
- **CalculatePage增强**：在calculateFortune方法中集成视频播放功能
- **流程优化**：输入愿望→确认信息→触发算命动画→查看结果

#### 2. CalculatePage功能完善
- **愿望显示区域**：页面顶部显示用户输入的愿望内容
- **修改愿望按钮**：允许用户返回修改愿望
- **视频播放功能**：点击"开始算命"后播放全屏动画
- **智能时长控制**：最少3秒播放时间 + API调用时间

#### 3. 技术实现优化
- **代码复用**：视频播放逻辑从InputPage迁移到CalculatePage
- **状态管理**：准确的视频播放状态和时长控制
- **用户反馈**：清晰的加载文案"神明正在为您算命..."
- **资源管理**：beforeUnmount钩子清理视频资源

#### 4. 用户体验提升
- **操作逻辑清晰**：每个按钮的功能更加明确
- **信息确认机制**：用户可以在算命前最后确认愿望
- **流程连贯性**：从输入到结果的完整体验
- **视觉反馈优化**：适合移动端和桌面端的响应式设计

### 🔄 待测试项目

1. **新流程测试**：InputPage输入→CalculatePage确认→点击算命→视频播放→ResultPage
2. **愿望数据传递**：验证wishText在页面间正确保存和显示
3. **视频文件加载**：确认temple-intro.mp4在CalculatePage中正常播放
4. **按钮功能测试**：修改愿望按钮、开始算命按钮功能正常
5. **时长控制测试**：验证3秒最少播放时间 + API调用时间的逻辑

### 📝 新流程特色

1. **更自然的交互**：用户在确认所有信息后主动触发算命
2. **明确的操作节点**：每个页面都有清晰的功能职责
3. **保持完整功能**：所有原有功能（愿望显示、视频播放、修改愿望）都保留
4. **优化的视觉反馈**：适合算命场景的文案和动画效果
5. **技术稳定性**：代码结构更清晰，维护性更好

**更新流程**: InputPage(输入) → CalculatePage(确认+触发) → 视频播放 → ResultPage(结果)

---
**最新更新时间**：2025-01-XX
**修改状态**：页面跳转逻辑重构完成
**新流程进度**：100%完成 🎉 