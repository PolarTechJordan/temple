import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 状态变量
  const loading = ref(false)
  const currentUser = ref(null)
  const walletConnected = ref(false)
  const walletAddress = ref('')
  const walletType = ref('') // 'metamask', 'walletconnect', etc.
  const userWish = ref('')
  const fortuneResult = ref(null)
  const meritPoints = ref(0)
  const userLevel = ref(1)
  const dailyFortune = ref(null)
  const incenseHistory = ref([])
  const shareHistory = ref([])
  const airdropHistory = ref([])
  const currentLanguage = ref('zh-CN')
  const theme = ref('light')
  
  // 用户等级配置
  const levelConfig = ref({
    1: { name: 'beginner', minPoints: 0, maxPoints: 100 },
    2: { name: 'devotee', minPoints: 101, maxPoints: 500 },
    3: { name: 'believer', minPoints: 501, maxPoints: 1000 },
    4: { name: 'enlightened', minPoints: 1001, maxPoints: 5000 },
    5: { name: 'sage', minPoints: 5001, maxPoints: Infinity }
  })
  
  // 支持的币种配置
  const supportedCurrencies = ref([
    { symbol: 'SOL', name: 'Solana', icon: 'sol.png', decimals: 9 },
    { symbol: 'USDT', name: 'Tether', icon: 'usdt.png', decimals: 6 },
    { symbol: 'BTC', name: 'Bitcoin', icon: 'btc.png', decimals: 8 },
    { symbol: 'ETH', name: 'Ethereum', icon: 'eth.png', decimals: 18 },
    { symbol: 'BNB', name: 'Binance Coin', icon: 'bnb.png', decimals: 18 }
  ])
  
  // 计算属性
  const isAuthenticated = computed(() => {
    return walletConnected.value && walletAddress.value
  })
  
  const isWalletConnected = computed(() => {
    return walletConnected.value
  })
  
  const currentLevelInfo = computed(() => {
    return levelConfig.value[userLevel.value] || levelConfig.value[1]
  })
  
  const nextLevelInfo = computed(() => {
    const nextLevel = userLevel.value + 1
    return levelConfig.value[nextLevel] || null
  })
  
  const levelProgress = computed(() => {
    const current = currentLevelInfo.value
    const next = nextLevelInfo.value
    
    if (!next) return 100 // 已达到最高级别
    
    const currentProgress = meritPoints.value - current.minPoints
    const totalNeeded = next.minPoints - current.minPoints
    
    return Math.min(100, Math.max(0, (currentProgress / totalNeeded) * 100))
  })
  
  const userStats = computed(() => {
    return {
      totalIncense: incenseHistory.value.length,
      totalShares: shareHistory.value.length,
      totalAirdrops: airdropHistory.value.length,
      totalMerit: meritPoints.value,
      level: userLevel.value,
      levelName: currentLevelInfo.value.name
    }
  })
  
  // 操作方法
  const setLoading = (status) => {
    loading.value = status
  }
  
  const connectWallet = (address, type) => {
    walletConnected.value = true
    walletAddress.value = address
    walletType.value = type
    localStorage.setItem('walletConnected', 'true')
    localStorage.setItem('walletAddress', address)
    localStorage.setItem('walletType', type)
  }
  
  const disconnectWallet = () => {
    walletConnected.value = false
    walletAddress.value = ''
    walletType.value = ''
    localStorage.removeItem('walletConnected')
    localStorage.removeItem('walletAddress')
    localStorage.removeItem('walletType')
  }
  
  const saveUserWish = (wish) => {
    userWish.value = wish
    localStorage.setItem('userWish', wish)
  }
  
  const saveFortuneResult = (result) => {
    fortuneResult.value = result
    localStorage.setItem('fortuneResult', JSON.stringify(result))
  }
  
  const addMeritPoints = (points) => {
    meritPoints.value += points
    updateUserLevel()
    localStorage.setItem('meritPoints', meritPoints.value.toString())
  }
  
  const updateUserLevel = () => {
    for (const [level, config] of Object.entries(levelConfig.value)) {
      if (meritPoints.value >= config.minPoints && meritPoints.value <= config.maxPoints) {
        userLevel.value = parseInt(level)
        break
      }
    }
  }
  
  const setDailyFortune = (fortune) => {
    dailyFortune.value = fortune
    localStorage.setItem('dailyFortune', JSON.stringify(fortune))
  }
  
  const addIncenseRecord = (record) => {
    incenseHistory.value.push({
      ...record,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('incenseHistory', JSON.stringify(incenseHistory.value))
  }
  
  const addShareRecord = (record) => {
    shareHistory.value.push({
      ...record,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('shareHistory', JSON.stringify(shareHistory.value))
  }
  
  const addAirdropRecord = (record) => {
    airdropHistory.value.push({
      ...record,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('airdropHistory', JSON.stringify(airdropHistory.value))
  }
  
  const setLanguage = (lang) => {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
  }
  
  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }
  
  const initializeFromStorage = () => {
    // 从本地存储恢复状态
    const savedWalletConnected = localStorage.getItem('walletConnected')
    const savedWalletAddress = localStorage.getItem('walletAddress')
    const savedWalletType = localStorage.getItem('walletType')
    const savedUserWish = localStorage.getItem('userWish')
    const savedFortuneResult = localStorage.getItem('fortuneResult')
    const savedMeritPoints = localStorage.getItem('meritPoints')
    const savedDailyFortune = localStorage.getItem('dailyFortune')
    const savedIncenseHistory = localStorage.getItem('incenseHistory')
    const savedShareHistory = localStorage.getItem('shareHistory')
    const savedAirdropHistory = localStorage.getItem('airdropHistory')
    const savedLanguage = localStorage.getItem('language')
    const savedTheme = localStorage.getItem('theme')
    
    if (savedWalletConnected === 'true' && savedWalletAddress) {
      walletConnected.value = true
      walletAddress.value = savedWalletAddress
      walletType.value = savedWalletType || ''
    }
    
    if (savedUserWish) {
      userWish.value = savedUserWish
    }
    
    if (savedFortuneResult) {
      try {
        fortuneResult.value = JSON.parse(savedFortuneResult)
      } catch (e) {
        console.error('Failed to parse fortune result:', e)
      }
    }
    
    if (savedMeritPoints) {
      meritPoints.value = parseInt(savedMeritPoints) || 0
      updateUserLevel()
    }
    
    if (savedDailyFortune) {
      try {
        dailyFortune.value = JSON.parse(savedDailyFortune)
      } catch (e) {
        console.error('Failed to parse daily fortune:', e)
      }
    }
    
    if (savedIncenseHistory) {
      try {
        incenseHistory.value = JSON.parse(savedIncenseHistory)
      } catch (e) {
        console.error('Failed to parse incense history:', e)
      }
    }
    
    if (savedShareHistory) {
      try {
        shareHistory.value = JSON.parse(savedShareHistory)
      } catch (e) {
        console.error('Failed to parse share history:', e)
      }
    }
    
    if (savedAirdropHistory) {
      try {
        airdropHistory.value = JSON.parse(savedAirdropHistory)
      } catch (e) {
        console.error('Failed to parse airdrop history:', e)
      }
    }
    
    if (savedLanguage) {
      currentLanguage.value = savedLanguage
    }
    
    if (savedTheme) {
      theme.value = savedTheme
    }
  }
  
  const clearUserData = () => {
    // 清除用户数据
    userWish.value = ''
    fortuneResult.value = null
    meritPoints.value = 0
    userLevel.value = 1
    dailyFortune.value = null
    incenseHistory.value = []
    shareHistory.value = []
    airdropHistory.value = []
    
    // 清除本地存储
    localStorage.removeItem('userWish')
    localStorage.removeItem('fortuneResult')
    localStorage.removeItem('meritPoints')
    localStorage.removeItem('dailyFortune')
    localStorage.removeItem('incenseHistory')
    localStorage.removeItem('shareHistory')
    localStorage.removeItem('airdropHistory')
  }
  
  const getCurrencyBySymbol = (symbol) => {
    return supportedCurrencies.value.find(currency => currency.symbol === symbol)
  }
  
  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }
  
  const formatNumber = (num) => {
    if (num < 1000) return num.toString()
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
    if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M'
    return (num / 1000000000).toFixed(1) + 'B'
  }
  
  // 返回所有状态和方法
  return {
    // 状态
    loading,
    currentUser,
    walletConnected,
    walletAddress,
    walletType,
    userWish,
    fortuneResult,
    meritPoints,
    userLevel,
    dailyFortune,
    incenseHistory,
    shareHistory,
    airdropHistory,
    currentLanguage,
    theme,
    levelConfig,
    supportedCurrencies,
    
    // 计算属性
    isAuthenticated,
    isWalletConnected,
    currentLevelInfo,
    nextLevelInfo,
    levelProgress,
    userStats,
    
    // 方法
    setLoading,
    connectWallet,
    disconnectWallet,
    saveUserWish,
    saveFortuneResult,
    addMeritPoints,
    updateUserLevel,
    setDailyFortune,
    addIncenseRecord,
    addShareRecord,
    addAirdropRecord,
    setLanguage,
    setTheme,
    initializeFromStorage,
    clearUserData,
    getCurrencyBySymbol,
    formatAddress,
    formatNumber
  }
}) 