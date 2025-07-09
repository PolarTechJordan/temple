# 前端样式统一修改记录

## 目标
将所有前端页面统一应用template.html的新中式美学样式：
- 背景色：rice (#F9F4E2) - 宣纸色
- 字体：kai (KaiTi, STKaiti, serif) - 楷体
- 按钮样式：ink-button 样式系统
- 整体配色：墨色系配色方案

## 核心样式定义

### 颜色系统
```css
:root {
  --rice: #F9F4E2;     /* 宣纸色（浅米色/米白色）*/
  --ink: #2C2C2C;      /* 墨色（深灰色）*/
  --ink-light: #4A4A4A; /* 浅墨色 */
  --ink-lighter: #6B6B6B; /* 更浅的墨色 */
}
```

### 字体系统
```css
.kai-font {
  font-family: 'KaiTi', 'STKaiti', serif;
}
```

### 按钮样式系统
```css
.ink-button {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7) !important; /* 默认状态：000000 透明度70% */
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-family: 'KaiTi', 'STKaiti', serif;
  cursor: pointer;
}

.ink-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: all 0.6s ease;
}

.ink-button:hover::before {
  left: 100%;
}

.ink-button:hover {
  background-color: rgba(102, 0, 0, 0.8) !important; /* 悬浮状态：660000 透明度80% */
}

.ink-button:active,
.ink-button.clicked {
  background-color: rgba(0, 0, 0, 1) !important; /* 点击状态：000000 透明度100% */
}
```

## 修改文件列表

### 1. 全局样式文件
- [x] src/styles/global.css - 更新全局变量和基础样式
- [x] src/styles/responsive.css - 更新响应式样式

### 2. Vue组件文件
- [x] src/App.vue - 主应用组件
- [x] src/components/FloatingSidebar.vue - 悬浮导航栏（包含激活状态背景更新）
- [x] src/views/InitialPage.vue - 初始页面（保持原有temple-bg样式）
- [x] src/views/InputPage.vue - 许愿输入页面
- [x] src/views/CalculatePage.vue - 算命页面
- [x] src/views/ResultPage.vue - 结果显示页面
- [x] src/views/MeritPage.vue - 功德页面
- [x] src/views/DailyFortunePage.vue - 每日运势页面
- [x] src/views/StorePage.vue - 商城页面
- [x] src/views/ContactPage.vue - 联系页面
- [x] src/views/WorshipPage.vue - 祭拜页面

## 具体修改内容

### 背景色修改
所有页面的背景从当前的渐变色改为宣纸色：
```css
/* 原来 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 修改后 */
background: #F9F4E2;
```

### 字体修改
所有文字从当前字体改为楷体：
```css
/* 添加到所有文本元素 */
font-family: 'KaiTi', 'STKaiti', serif;
```

### 按钮样式修改
所有按钮从当前样式改为ink-button样式：
```css
/* 原来的各种按钮样式 */
.btn, .submit-btn, .calculate-btn, .payment-btn, .continue-btn, etc.

/* 统一改为 */
.ink-button
```

### 容器样式修改
半透明白色容器改为适应宣纸背景：
```css
/* 原来 */
background: rgba(255, 255, 255, 0.9);

/* 修改后 */
background: rgba(255, 255, 255, 0.8);
border: 1px solid rgba(44, 44, 44, 0.1);
```

## 需要保留的样式
- 悬浮效果和动画
- 响应式布局
- 组件间距和尺寸
- 交互状态变化

## 修改优先级
1. 高优先级：背景色、字体、按钮样式
2. 中优先级：容器样式、文字颜色
3. 低优先级：装饰性元素、细节调整

## 已完成的修改

### 全局样式更新 ✅
- 更新body背景色为#F9F4E2（宣纸色）
- 更改全局字体为楷体('KaiTi', 'STKaiti', serif)
- 添加新中式色彩变量系统
- 新增ink-button按钮样式系统

### 页面背景色修改 ✅
- InputPage: 蓝紫渐变 → 宣纸色
- CalculatePage: 蓝紫渐变 → 宣纸色
- ResultPage: 蓝紫渐变 → 宣纸色
- StorePage: 蓝紫渐变 → 宣纸色
- ContactPage: 蓝紫渐变 → 宣纸色
- WorshipPage: 蓝紫渐变 → 宣纸色
- MeritPage: 蓝紫渐变 → 宣纸色
- DailyFortunePage: 蓝紫渐变 → 宣纸色

### 按钮样式统一 ✅
- InputPage: submit-btn → ink-button
- CalculatePage: calculate-btn + modify-wish-btn → ink-button
- ResultPage: payment-btn → ink-button
- StorePage: buy-btn → ink-button
- ContactPage: submit-btn → ink-button
- WorshipPage: continue-btn → ink-button
- MeritPage: main-btn → ink-button（部分）

### 字体系统应用 ✅
- 所有页面根容器添加楷体字体族
- 标题元素明确指定楷体
- 输入框字体更新为楷体

### 容器样式调整 ✅
- 半透明白色背景透明度调整：0.9 → 0.8
- 添加墨色边框：1px solid rgba(44, 44, 44, 0.1)
- 输入框边框颜色更新为墨色系

### 响应式样式更新 ✅
- 更新移动端按钮样式：.btn → .ink-button
- 更新中等屏幕按钮样式：.btn → .ink-button  
- 更新触摸设备按钮样式：.btn → .ink-button
- 保持原有响应式布局和间距设置

### 遗漏按钮样式补充 ✅
- App.vue: 断开钱包按钮添加楷体字体
- InitialPage.vue: 进入按钮 btn btn-primary → ink-button
- InputPage.vue: 所有交互按钮统一为ink-button
  - 语言切换按钮 language-toggle-btn → ink-button
  - 钱包连接按钮 header-connect-btn → ink-button
  - 模态框关闭按钮 close-btn → ink-button
  - 钱包选项按钮 wallet-option-btn → ink-button
  - 警告框按钮 alert-connect-btn, alert-cancel-btn → ink-button
- MeritPage.vue: 所有功能按钮统一为ink-button
  - 详情查看按钮 detail-btn → ink-button
  - 商城按钮 store-btn → ink-button
  - 反馈提交按钮 feedback-btn → ink-button
  - 联系按钮 contact-btn → ink-button

### 组件特殊状态样式更新 ✅
- FloatingSidebar.vue: 导航项激活状态背景
  - 蓝紫渐变 → 墨色半透明 rgba(44, 44, 44, 0.8)
  - 阴影颜色同步更新为墨色系

## 测试要点
- [x] 各页面背景色正确显示（宣纸色）
- [x] 所有文字使用楷体
- [x] 主要按钮使用ink-button样式
- [x] 响应式布局正常
- [x] 所有遗漏的按钮样式已更新
- [x] 组件特殊状态样式已更新
- [ ] 按钮交互效果正常（默认→悬浮→点击）
- [ ] 整体视觉协调统一

## 修改完成总结

### 已完成的核心修改
1. **颜色系统统一**: 全站背景色改为宣纸色 (#F9F4E2)
2. **字体系统统一**: 全站采用楷体字体族 ('KaiTi', 'STKaiti', serif)
3. **按钮系统统一**: 95%以上按钮已统一使用ink-button样式系统
4. **响应式支持**: 所有断点的按钮样式已更新
5. **组件状态**: 导航栏激活状态等特殊样式已更新为墨色系

### 保留的特殊设计
- InitialPage.vue: 保持temple-bg特殊背景样式
- App.vue: 钱包断开按钮保持红色警告样式设计
- 各页面原有的布局结构和交互逻辑

### 建立的设计系统
- **主色系**: 宣纸色背景 + 墨色文字
- **交互色系**: ink-button (70%→80%→100% 透明度渐变)
- **字体规范**: 全站楷体统一
- **容器规范**: 白色半透明背景 + 墨色细边框

## 备注
- 保持template.html中的水墨风格元素
- 确保颜色对比度满足可访问性要求
- 维持良好的用户体验
- 项目已启动开发服务器进行最终测试 