# Landing页面交互设计优化

## 设计目标
优化用户在财神殿平台的导航体验，实现更流畅的页面交互逻辑。

## 交互逻辑设计

### 1. 页面入口
- 用户首次访问 `/wish` (InputPage)
- 此时页面**不显示导航栏**，提供纯净的许愿体验
- **隐藏语言切换按钮**，简化界面

### 2. 导航栏显示逻辑
- 当用户从MeritPage点击"祈愿上香"或"再次祈愿上香"时
- 跳转到InputPage但携带导航栏显示参数
- 导航栏默认**隐藏在左侧边界**
- 当鼠标移动到**屏幕左侧边界**时，导航栏**弹出显示**
- 鼠标离开导航栏区域时，导航栏**自动隐藏**

### 3. 导航栏样式要求
- MeritPage中的导航栏需要**紧靠左边**
- 悬浮导航栏使用**半透明背景**
- 添加**平滑的动画过渡效果**

## 技术实现方案

### 1. 路由参数传递
```javascript
// 从MeritPage跳转到InputPage时携带参数
this.$router.push({
  path: '/wish',
  query: { showNav: 'true' }
})
```

### 2. InputPage组件结构
```vue
<template>
  <div class="input-page">
    <!-- 悬浮导航栏（条件显示） -->
    <SideNavigation 
      v-if="shouldShowNav" 
      :isVisible="navVisible"
      @mouse-enter="showNav"
      @mouse-leave="hideNav"
    />
    
    <!-- 左侧触发区域 -->
    <div 
      v-if="shouldShowNav"
      class="nav-trigger-zone"
      @mouseenter="showNav"
    ></div>
    
    <!-- 主要内容 -->
    <div class="main-content">
      <!-- 原有内容 -->
    </div>
  </div>
</template>
```

### 3. 导航栏动画效果
```css
.floating-sidebar {
  position: fixed;
  left: -280px; /* 默认隐藏 */
  transition: left 0.3s ease-in-out;
  z-index: 1000;
}

.floating-sidebar.visible {
  left: 0; /* 显示状态 */
}

.nav-trigger-zone {
  position: fixed;
  left: 0;
  top: 0;
  width: 20px;
  height: 100vh;
  z-index: 999;
}
```

### 4. 组件复用策略
- 提取MeritPage的导航栏逻辑为独立组件
- 在InputPage中复用该组件
- 保持导航功能的一致性

## 用户体验优化

### 1. 视觉反馈
- 鼠标悬停时显示微妙的视觉提示
- 导航栏弹出时有阴影效果
- 平滑的动画过渡

### 2. 响应式设计
- 移动端优化触发区域大小
- 平板端适配导航栏宽度
- 保证各设备的良好体验

### 3. 性能考虑
- 使用CSS transform而非position变化
- 防抖动处理鼠标事件
- 组件懒加载

## 扩展功能需求

### 5. 多页面悬浮导航栏
- **DailyFortunePage** 和 **StorePage** 也需要悬浮导航栏功能
- 从MeritPage的"每日运势"和"法物流通"跳转到对应页面时显示悬浮导航栏
- 保持与InputPage相同的交互逻辑和视觉效果

### 6. 导航状态管理
- 使用query参数 `showNav=true` 标识是否显示导航栏
- 统一的导航栏组件复用
- 保持导航状态在页面跳转间的连续性

## 技术实现扩展

### 1. 通用悬浮导航栏组件
```vue
<!-- src/components/FloatingSidebar.vue -->
<template>
  <div 
    v-if="shouldShow" 
    class="floating-sidebar"
    :class="{ 'visible': isVisible }"
    @mouseenter="showNav"
    @mouseleave="hideNavDelayed"
  >
    <!-- 导航内容 -->
  </div>
  
  <!-- 触发区域 -->
  <div 
    v-if="shouldShow"
    class="nav-trigger-zone"
    @mouseenter="showNav"
  ></div>
</template>
```

### 2. 页面集成方式
```javascript
// 在各页面中统一使用
export default {
  computed: {
    shouldShowNav() {
      return this.$route.query.showNav === 'true'
    }
  }
}
```

### 3. MeritPage跳转逻辑更新
```javascript
// 更新其他导航项的跳转逻辑
goToFortune() {
  this.navigateTo('/daily-fortune?showNav=true')
},

goToStore() {
  this.navigateTo('/store?showNav=true')
}
```

## 实现优先级
1. ✅ 修改MeritPage导航栏样式（紧靠左边）
2. ✅ 隐藏InputPage语言切换按钮
3. ✅ 创建悬浮导航栏组件（FloatingSidebar.vue）
4. ✅ 实现路由参数传递（showNav=true）
5. ✅ 添加鼠标悬停交互
6. ✅ 优化动画效果和响应式布局
7. ✅ 扩展多页面悬浮导航栏支持
8. ✅ 集成所有相关页面（InputPage、DailyFortunePage、StorePage、ContactPage）
9. ✅ 统一导航状态管理
9. ✅ 统一导航栏组件和交互逻辑

## 总结

✅ **完整功能实现**

本次更新成功实现了完整的悬浮导航栏功能系统：

### 🎯 核心功能
- **MeritPage导航栏优化**：紧靠左边布局，提升视觉体验
- **通用FloatingSidebar组件**：可复用的悬浮导航栏组件
- **智能显示逻辑**：根据路由参数动态显示/隐藏导航栏
- **流畅交互体验**：鼠标悬停触发，延迟隐藏防闪烁

### 📱 多页面支持
- **InputPage** (祈愿上香页面)
- **DailyFortunePage** (每日运势页面)  
- **StorePage** (法物流通页面)
- **ContactPage** (联系我们页面)

### 🔄 导航流程
1. 用户首次访问 `/wish` - 无导航栏，纯净体验
2. 从MeritPage点击导航按钮 - 跳转到对应页面且携带 `showNav=true` 参数
3. 悬浮导航栏自动加载 - 默认隐藏在左侧边界
4. 鼠标移动到左侧 - 导航栏平滑弹出
5. 导航项点击 - 保持导航状态在页面间传递

### ⚡ 技术亮点
- **Vue 3 Composition API** 结合传统Options API
- **响应式设计** 适配桌面端和移动端
- **路由参数管理** 统一的状态传递机制
- **动画优化** 平滑的CSS3过渡效果
- **组件复用** 单一FloatingSidebar组件支持所有页面

这个设计方案确保了用户在财神殿平台上获得流畅、直观的导航体验，通过巧妙的交互设计平衡了功能完整性和界面简洁性。悬浮导航栏的实现既保证了功能的可访问性，又不会干扰用户的主要任务。 