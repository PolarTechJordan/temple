# 财神庙 (Rich Temple) - Web3祈福平台

> 一个融合传统文化与现代区块链技术的数字化祈福平台

## 项目概述

财神庙是一个基于Web3的创新祈福平台，将传统的祈福文化与现代区块链技术相结合，为用户提供：

- 🎋 数字化许愿祈福
- 🔮 AI算命服务（小六壬神算）
- 💰 Web3钱包集成和多币种支付
- 🕯️ 虚拟上香仪式
- ⭐ 功德积累和等级系统
- 🛍️ 法物商城
- 🎁 空投好运功能
- 📊 功德排行榜
- 🌐 中英文双语支持

## 技术架构

### 前端技术栈
- **Vue 3** - 组合式API
- **Vue Router 4** - 路由管理
- **Pinia** - 状态管理
- **Vue I18n** - 国际化
- **SCSS** - 样式预处理

### Web3集成
- **Web3.js** - 以太坊交互
- **Ethers.js** - 更现代的Web3库
- **WalletConnect** - 多钱包支持
- **多币种支持** - SOL, USDT, BTC, ETH, BNB

### AI服务
- **DeepSeek API** - 算命AI服务

### 响应式设计
- 移动端优先设计
- 支持所有主流设备
- 触摸友好的交互

## 项目结构

```
rich-temple/
├── public/                 # 静态资源
│   ├── index.html         # HTML模板
│   └── videos/            # 视频资源
├── src/
│   ├── assets/            # 资源文件
│   │   ├── images/        # 图片资源
│   │   ├── videos/        # 视频资源
│   │   └── animations/    # 动画资源
│   ├── components/        # 可复用组件
│   ├── views/             # 页面组件
│   │   ├── InitialPage.vue      # 初始动画页面 ✅
│   │   ├── InputPage.vue        # 许愿页面
│   │   ├── LoginPage.vue        # 钱包登录页面
│   │   ├── CalculatePage.vue    # 算命页面
│   │   ├── ResultPage.vue       # 结果页面
│   │   ├── PaymentPage.vue      # 支付页面
│   │   ├── WorshipPage.vue      # 上香页面
│   │   ├── MeritPage.vue        # 功德页面
│   │   ├── SharePage.vue        # 分享页面
│   │   ├── StorePage.vue        # 商城页面
│   │   ├── LeaderboardPage.vue  # 排行榜页面
│   │   └── AirdropPage.vue      # 空投页面
│   ├── stores/            # 状态管理
│   │   └── app.js         # 主要状态 ✅
│   ├── services/          # 服务层
│   │   ├── deepseekService.js   # AI服务
│   │   ├── web3Service.js       # Web3服务
│   │   └── apiService.js        # API服务
│   ├── router/            # 路由配置
│   │   └── index.js       # 路由定义 ✅
│   ├── styles/            # 样式文件
│   │   ├── global.css     # 全局样式 ✅
│   │   └── responsive.css # 响应式样式 ✅
│   ├── locales/           # 国际化
│   │   ├── zh.json        # 中文语言包 ✅
│   │   └── en.json        # 英文语言包 ✅
│   ├── utils/             # 工具函数
│   ├── App.vue            # 根组件 ✅
│   └── main.js            # 入口文件 ✅
├── package.json           # 依赖配置 ✅
├── vue.config.js          # Vue配置 ✅
└── design.md              # 设计文档 ✅
```

## 页面流程

### 1. 初始动画页面 ✅ 已完成
- 3秒MP4进场动画
- 涟漪悬停效果
- 粒子背景动画
- 多语言支持

### 2. 用户流程
1. **许愿池** → 用户输入祈福内容
2. **钱包连接** → Web3钱包登录
3. **小六壬神算** → AI算命服务
4. **结果展示** → 显示算命结果
5. **香火支付** → 选择币种和数量
6. **上香仪式** → 虚拟上香动画
7. **功德系统** → 积累功德和等级提升

### 3. 附加功能
- **分享系统** → Twitter病毒式营销
- **法物商城** → 实体/虚拟商品购买
- **空投系统** → 基于功德分的随机奖励
- **排行榜** → 功德排名展示

## 特色功能

### 🎨 视觉设计
- 金色主题色彩(#d4af37)
- 传统文化元素
- 现代化UI设计
- 流畅的动画效果

### 📱 移动端优化
- 响应式布局
- 触摸友好交互
- 移动端导航
- 全屏体验

### 🌐 多语言支持
- 中文：`https://fortunetemple.com`
- 英文：`https://fortunetemple.com/en`
- 动态语言切换

### ⚡ 性能优化
- 代码分割
- 懒加载
- 图片压缩
- PWA支持

## 开发状态

### ✅ 已完成 (阶段1)
- [x] 项目基础架构
- [x] Vue3 + Router + Pinia配置
- [x] 国际化(i18n)配置
- [x] 响应式样式系统
- [x] 初始动画页面
- [x] 状态管理架构
- [x] 路由配置(支持中英文)

### 🚧 开发中
- [ ] 许愿页面组件
- [ ] 钱包连接功能
- [ ] Web3服务集成

### 📋 待开发
- [ ] AI算命服务
- [ ] 支付系统
- [ ] 功德系统
- [ ] 商城功能
- [ ] 排行榜系统

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发环境
```bash
npm run serve
```

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0
- 现代浏览器（支持ES6+）
- Web3钱包（MetaMask等）

## 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交代码
4. 发起Pull Request

## 许可证

MIT License

## 联系我们

- 项目地址：[GitHub Repository]
- 网站：https://fortunetemple.com
- 邮箱：contact@fortunetemple.com

---

**财神庙 - 融合传统与未来的数字祈福平台** 🏯✨ 