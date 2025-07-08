import { createRouter, createWebHistory } from 'vue-router'

// 懒加载组件
const InitialPage = () => import('@/views/InitialPage.vue')
const InputPage = () => import('@/views/InputPage.vue')
const CalculatePage = () => import('@/views/CalculatePage.vue')
const ResultPage = () => import('@/views/ResultPage.vue')
const WorshipPage = () => import('@/views/WorshipPage.vue')
const MeritPage = () => import('@/views/MeritPage.vue')
const SharePage = () => import('@/views/SharePage.vue')
const StorePage = () => import('@/views/StorePage.vue')
const LeaderboardPage = () => import('@/views/LeaderboardPage.vue')
const AirdropPage = () => import('@/views/AirdropPage.vue')
const DailyFortunePage = () => import('@/views/DailyFortunePage.vue')
const ContactPage = () => import('@/views/ContactPage.vue')

// 中文路由配置
const chineseRoutes = [
  {
    path: '/',
    name: 'Initial',
    component: InitialPage,
    meta: { title: '财神殿 - 祈福平台' }
  },
  {
    path: '/wish',
    name: 'Input',
    component: InputPage,
    meta: { title: '许愿池 - 财神殿' }
  },
  {
    path: '/calculate',
    name: 'Calculate',
    component: CalculatePage,
    meta: { title: '小六壬神算 - 财神殿', requiresWallet: true }
  },
  {
    path: '/result',
    name: 'Result',
    component: ResultPage,
    meta: { title: '神算结果 - 财神殿', requiresWallet: true }
  },
  {
    path: '/worship',
    name: 'Worship',
    component: WorshipPage,
    meta: { title: '虔诚上香 - 财神殿', requiresWallet: true }
  },
  {
    path: '/merit',
    name: 'Merit',
    component: MeritPage,
    meta: { title: '功德积累 - 财神殿', requiresWallet: true }
  },
  {
    path: '/share',
    name: 'Share',
    component: SharePage,
    meta: { title: '分享福报 - 财神殿', requiresWallet: true }
  },
  {
    path: '/store',
    name: 'Store',
    component: StorePage,
    meta: { title: '法物商城 - 财神殿', requiresWallet: true }
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: LeaderboardPage,
    meta: { title: '功德排行 - 财神殿' }
  },
  {
    path: '/airdrop',
    name: 'Airdrop',
    component: AirdropPage,
    meta: { title: '空投好运 - 财神殿', requiresWallet: true }
  },
  {
    path: '/daily-fortune',
    name: 'DailyFortune',
    component: DailyFortunePage,
    meta: { title: '每日运势 - 财神殿' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
    meta: { title: '联系我们 - 财神殿' }
  }
]

// 英文路由配置
const englishRoutes = [
  {
    path: '/en',
    name: 'InitialEn',
    component: InitialPage,
    meta: { title: 'Rich Temple - Fortune Platform' }
  },
  {
    path: '/en/wish',
    name: 'InputEn',
    component: InputPage,
    meta: { title: 'Wish Pool - Rich Temple' }
  },
  {
    path: '/en/calculate',
    name: 'CalculateEn',
    component: CalculatePage,
    meta: { title: 'Fortune Telling - Rich Temple', requiresWallet: true }
  },
  {
    path: '/en/result',
    name: 'ResultEn',
    component: ResultPage,
    meta: { title: 'Fortune Result - Rich Temple', requiresWallet: true }
  },
  {
    path: '/en/worship',
    name: 'WorshipEn',
    component: WorshipPage,
    meta: { title: 'Worship - Rich Temple', requiresWallet: true }
  },
  {
    path: '/en/merit',
    name: 'MeritEn',
    component: MeritPage,
    meta: { title: 'Merit Points - Rich Temple', requiresWallet: true }
  },
  {
    path: '/en/share',
    name: 'ShareEn',
    component: SharePage,
    meta: { title: 'Share Blessing - Rich Temple', requiresWallet: true }
  },
  {
    path: '/en/store',
    name: 'StoreEn',
    component: StorePage,
    meta: { title: 'Sacred Store - Rich Temple', requiresWallet: true }
  },
  {
    path: '/en/leaderboard',
    name: 'LeaderboardEn',
    component: LeaderboardPage,
    meta: { title: 'Merit Ranking - Rich Temple' }
  },
  {
    path: '/en/airdrop',
    name: 'AirdropEn',
    component: AirdropPage,
    meta: { title: 'Lucky Airdrop - Rich Temple', requiresWallet: true }
  },
  {
    path: '/en/daily-fortune',
    name: 'DailyFortuneEn',
    component: DailyFortunePage,
    meta: { title: 'Daily Fortune - Rich Temple' }
  },
  {
    path: '/en/contact',
    name: 'ContactEn',
    component: ContactPage,
    meta: { title: 'Contact Us - Rich Temple' }
  }
]

// 合并路由
const routes = [...chineseRoutes, ...englishRoutes]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 页面跳转时滚动到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // 检查是否需要钱包连接
  if (to.meta.requiresWallet) {
    // 检查钱包连接状态
    const isWalletConnected = localStorage.getItem('walletConnected') === 'true'
    if (!isWalletConnected) {
      // 重定向到许愿页面，用户可以在那里连接钱包
      const wishRoute = to.path.startsWith('/en') ? '/en/wish' : '/wish'
      next({ path: wishRoute })
      return
    }
  }
  
  next()
})

// 路由错误处理
router.onError((error) => {
  console.error('路由错误:', error)
})

export default router 