<template>
  <div class="merit-page">
    <div class="container">
      <!-- 左侧导航栏 -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>功德殿堂</h2>
          <p class="user-level">{{ levelDisplayName }}</p>
        </div>
        
        <nav class="sidebar-nav">
          <div 
            v-for="item in navItems" 
            :key="item.id"
            @click="selectNav(item.id)"
            class="nav-item"
            :class="{ active: activeNav === item.id }"
          >
            <div class="nav-icon">{{ item.icon }}</div>
            <span class="nav-label">{{ item.label }}</span>
            <div v-if="item.badge" class="nav-badge">{{ item.badge }}</div>
          </div>
        </nav>

        <div class="user-summary">
          <div class="merit-score">
            <span class="score">{{ appStore.meritPoints }}</span>
            <span class="unit">功德分</span>
          </div>
          <div class="level-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
            </div>
            <div class="progress-text">
              距离下一级别：{{ nextLevelInfo ? (nextLevelInfo.minPoints - appStore.meritPoints) : 0 }}分
            </div>
          </div>
        </div>
      </aside>

      <!-- 右侧主要内容区 -->
      <main class="main-content">
        <!-- 祈愿上香 -->
        <div v-if="activeNav === 'incense'" class="content-section incense-section">
          <h1>祈愿上香</h1>
          <div class="incense-container">
            <div class="incense-altar">
              <div class="altar-image">
                <div class="incense-burner">🏺</div>
                <div class="flames">🔥</div>
              </div>
              <p class="altar-desc">虔诚上香，祈求神明护佑</p>
            </div>
            
            <div class="incense-options">
              <h3>选择香火</h3>
              <div class="incense-types">
                <div v-for="incense in incenseTypes" :key="incense.id" 
                     @click="selectIncense(incense)"
                     class="incense-type"
                     :class="{ selected: selectedIncense?.id === incense.id }">
                  <div class="incense-icon">{{ incense.icon }}</div>
                  <div class="incense-info">
                    <h4>{{ incense.name }}</h4>
                    <p>{{ incense.description }}</p>
                    <div class="incense-price">{{ incense.price }} SOL</div>
                  </div>
                </div>
              </div>
              
              <button 
                @click="startIncense" 
                :disabled="!selectedIncense"
                class="incense-btn"
              >
                开始上香
              </button>
            </div>
          </div>
        </div>

        <!-- 每日运势 -->
        <div v-if="activeNav === 'fortune'" class="content-section fortune-section">
          <h1>每日运势</h1>
          <div class="fortune-preview">
            <div class="today-fortune">
              <div class="fortune-date">
                <h2>{{ todayDate }}</h2>
                <p class="lunar-date">农历 {{ lunarDate }}</p>
              </div>
              <div class="fortune-summary">
                <div class="overall-rating">
                  <span class="rating-stars">
                    <span v-for="n in overallRating" :key="n" class="star">★</span>
                    <span v-for="n in (5 - overallRating)" :key="n + 5" class="star empty">☆</span>
                  </span>
                  <span class="rating-text">{{ getRatingText(overallRating) }}</span>
                </div>
                <p class="fortune-highlight">{{ todayHighlight }}</p>
              </div>
            </div>
            
            <button @click="goToFortune" class="detail-btn">
              查看详细运势
            </button>
          </div>
        </div>

        <!-- 法物流通 -->
        <div v-if="activeNav === 'store'" class="content-section store-section">
          <h1>法物流通</h1>
          <div class="store-container">
            <div class="store-categories">
              <div v-for="category in storeCategories" :key="category.id" class="category-item">
                <div class="category-icon">{{ category.icon }}</div>
                <h3>{{ category.name }}</h3>
                <p>{{ category.description }}</p>
                <div class="category-count">{{ category.count }}件商品</div>
              </div>
            </div>
            
            <div class="featured-items">
              <h3>精选法物</h3>
              <div class="items-grid">
                <div v-for="item in featuredItems" :key="item.id" class="store-item">
                  <div class="item-image">{{ item.image }}</div>
                  <div class="item-info">
                    <h4>{{ item.name }}</h4>
                    <p>{{ item.description }}</p>
                    <div class="item-price">{{ item.price }} SOL</div>
                  </div>
                </div>
              </div>
            </div>
            
            <button @click="goToStore" class="store-btn">
              进入法物商城
            </button>
          </div>
        </div>



        <!-- 功德排行榜 -->
        <div v-if="activeNav === 'leaderboard'" class="content-section leaderboard-section">
          <h1>功德排行榜</h1>
          <div class="leaderboard-preview">
            <div class="my-ranking">
              <div class="ranking-card">
                <div class="rank-badge">
                  <span class="rank-number">{{ getUserRank() }}</span>
                  <span class="rank-text">我的排名</span>
                </div>
                <div class="rank-details">
                  <div class="rank-score">{{ appStore.meritPoints }}分</div>
                  <div class="rank-level">{{ levelDisplayName }}</div>
                </div>
              </div>
            </div>
            
            <div class="top-users">
              <h3>功德榜前五名</h3>
              <div class="users-list">
                <div v-for="(user, index) in topUsers" :key="user.id" class="user-item">
                  <div class="user-rank">
                    <span v-if="index === 0" class="medal gold">🥇</span>
                    <span v-else-if="index === 1" class="medal silver">🥈</span>
                    <span v-else-if="index === 2" class="medal bronze">🥉</span>
                    <span v-else class="rank-num">{{ index + 1 }}</span>
                  </div>
                  <div class="user-info">
                    <div class="user-name">{{ user.name }}</div>
                    <div class="user-level">{{ user.level }}</div>
                  </div>
                  <div class="user-score">{{ user.score }}分</div>
                </div>
              </div>
            </div>
            
            <button @click="goToLeaderboard" class="leaderboard-btn">
              查看完整排行榜
            </button>
          </div>
        </div>

        <!-- 好运空投 -->
        <div v-if="activeNav === 'airdrop'" class="content-section airdrop-section">
          <h1>好运空投</h1>
          <div class="airdrop-preview">
            <div class="airdrop-info-card">
              <div class="airdrop-title">
                <h2>🎁 每日好运空投</h2>
                <p>基于功德分的随机奖励，功德越高，好运越多！</p>
              </div>
              
              <div class="airdrop-stats">
                <div class="stat-item">
                  <div class="stat-icon">🎯</div>
                  <div class="stat-info">
                    <span class="stat-value">{{ airdropStats.todayRemaining }}</span>
                    <span class="stat-label">今日剩余</span>
                  </div>
                </div>
                
                <div class="stat-item">
                  <div class="stat-icon">💰</div>
                  <div class="stat-info">
                    <span class="stat-value">{{ airdropStats.totalClaimed }}</span>
                    <span class="stat-label">本月获得</span>
                  </div>
                </div>
                
                <div class="stat-item">
                  <div class="stat-icon">⏰</div>
                  <div class="stat-info">
                    <span class="stat-value">{{ airdropStats.nextAirdropIn }}</span>
                    <span class="stat-label">下次空投</span>
                  </div>
                </div>
              </div>
              
              <div class="last-airdrop">
                <span class="last-label">上次获得：</span>
                <span class="last-amount">{{ airdropStats.lastAirdrop }}</span>
              </div>
            </div>
            
            <div class="quick-claim">
              <div class="claim-preview">
                <div class="your-chance">
                  <h3>您的中奖概率</h3>
                  <div class="chance-display">
                    <span class="chance-value">{{ getAirdropChance() }}%</span>
                    <div class="chance-bar">
                      <div class="chance-fill" :style="{ width: getAirdropChance() + '%' }"></div>
                    </div>
                  </div>
                  <p class="chance-desc">基于您的{{ appStore.meritPoints }}功德分计算</p>
                </div>
                
                <button 
                  @click="quickClaim" 
                  :disabled="!airdropStats.canClaim"
                  class="quick-claim-btn"
                >
                  <span v-if="airdropStats.canClaim">🎁 快速抽取</span>
                  <span v-else>明日再来</span>
                </button>
              </div>
            </div>
            
            <button @click="goToAirdrop" class="airdrop-btn">
              进入空投页面
            </button>
          </div>
        </div>

        <!-- 联系我们 -->
        <div v-if="activeNav === 'contact'" class="content-section contact-section">
          <h1>联系我们</h1>
          <div class="contact-preview">
            <div class="contact-methods">
              <div class="contact-item">
                <div class="contact-icon">📧</div>
                <div class="contact-info">
                  <h3>邮箱联系</h3>
                  <p>support@fortunetemple.com</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">💬</div>
                <div class="contact-info">
                  <h3>在线客服</h3>
                  <p>微信: fortunetemple</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">📱</div>
                <div class="contact-info">
                  <h3>客服热线</h3>
                  <p>400-888-8888</p>
                </div>
              </div>
            </div>
            
            <div class="quick-feedback">
              <h3>快速反馈</h3>
              <textarea 
                v-model="quickFeedback" 
                placeholder="请输入您的问题或建议..."
                class="feedback-input"
              ></textarea>
              <button @click="submitQuickFeedback" class="feedback-btn">
                提交反馈
              </button>
            </div>
            
            <button @click="goToContact" class="contact-btn">
              查看更多联系方式
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'

export default {
  name: 'MeritPage',
  setup() {
    const router = useRouter()
    const appStore = useAppStore()
    
    // 语言感知的导航函数
    const navigateTo = (path) => {
      const currentPath = router.currentRoute.value.path
      const isEnglish = currentPath.startsWith('/en')
      const targetPath = isEnglish ? `/en${path}` : path
      router.push(targetPath)
    }

    const currentLevelInfo = computed(() => appStore.currentLevelInfo)
    const nextLevelInfo = computed(() => appStore.nextLevelInfo)
    const progressPercentage = computed(() => appStore.levelProgress)
    
    return {
      router,
      appStore,
      navigateTo,
      currentLevelInfo,
      nextLevelInfo,
      progressPercentage
    }
  },
  data() {
    return {
      activeNav: 'incense',
      selectedIncense: null,
      quickFeedback: '',
      todayDate: '',
      lunarDate: '甲子年 丙寅月 戊戌日',
      overallRating: 4,
      todayHighlight: '今日财运亨通，适合投资理财，感情运势上佳。',
      navItems: [
        {
          id: 'incense',
          label: '祈愿上香',
          icon: '🕯️',
          badge: null
        },
        {
          id: 'fortune',
          label: '每日运势',
          icon: '🔮',
          badge: null
        },
        {
          id: 'leaderboard',
          label: '功德排行',
          icon: '🏆',
          badge: null
        },
        {
          id: 'airdrop',
          label: '好运空投',
          icon: '🎁',
          badge: 'HOT'
        },
        {
          id: 'store',
          label: '法物流通',
          icon: '🏪',
          badge: 'NEW'
        },
        {
          id: 'contact',
          label: '联系我们',
          icon: '📞',
          badge: null
        }
      ],
      incenseTypes: [
        {
          id: 1,
          name: '檀香',
          description: '提升财运，招财进宝',
          icon: '🕯️',
          price: 0.01
        },
        {
          id: 2,
          name: '沉香',
          description: '净化心灵，增强功德',
          icon: '🎋',
          price: 0.02
        },
        {
          id: 3,
          name: '龙涎香',
          description: '事业运势，贵人相助',
          icon: '🌿',
          price: 0.05
        }
      ],
      storeCategories: [
        {
          id: 1,
          name: '护身符',
          description: '辟邪护身，保平安',
          icon: '🧿',
          count: 15
        },
        {
          id: 2,
          name: '开运饰品',
          description: '增强运势，招好运',
          icon: '💍',
          count: 23
        },
        {
          id: 3,
          name: '祈福用品',
          description: '祈福法器，心诚则灵',
          icon: '🎐',
          count: 18
        }
      ],
      featuredItems: [
        {
          id: 1,
          name: '转运金珠',
          description: '纯金打造，转运招财',
          image: '🔸',
          price: 0.1
        },
        {
          id: 2,
          name: '平安玉佩',
          description: '天然翡翠，保平安',
          image: '🟢',
          price: 0.08
        }
      ],
      recentActivities: [
        {
          id: 1,
          icon: '🕯️',
          description: '上香祈福',
          time: '2小时前',
          points: 30
        },
        {
          id: 2,
          icon: '📱',
          description: '分享福报',
          time: '1天前',
          points: 10
        },
        {
          id: 3,
          icon: '✅',
          description: '每日签到',
          time: '1天前',
          points: 5
        }
      ],
      topUsers: [
        { id: 1, name: '善缘居士', score: 2500, level: '圣贤' },
        { id: 2, name: '慈悲心', score: 2000, level: '觉悟者' },
        { id: 3, name: '福德金刚', score: 1800, level: '觉悟者' },
        { id: 4, name: '智慧如海', score: 1500, level: '信徒' },
        { id: 5, name: '普度众生', score: 1200, level: '信徒' }
      ],
      airdropStats: {
        todayRemaining: 3,
        totalClaimed: 15,
        nextAirdropIn: '2小时',
        lastAirdrop: '0.05 SOL',
        canClaim: true
      }
    }
  },
  computed: {
    levelDisplayName() {
      const levelNames = {
        beginner: '初学者',
        devotee: '虔诚者',
        believer: '信徒',
        enlightened: '觉悟者',
        sage: '圣贤'
      }
      return levelNames[this.currentLevelInfo.name] || '未知等级'
    }
  },
  mounted() {
    this.updateTodayDate()
  },
  methods: {
    selectNav(navId) {
      this.activeNav = navId
    },
    
    selectIncense(incense) {
      this.selectedIncense = incense
    },
    
    async startIncense() {
      if (!this.selectedIncense) return
      
      // 模拟上香过程
      console.log('开始上香:', this.selectedIncense.name)
      // 这里可以添加上香动画和功德奖励逻辑
      this.appStore.addMeritPoints(30)
      alert(`${this.selectedIncense.name}上香成功！获得30功德分`)
    },
    
    updateTodayDate() {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const date = String(today.getDate()).padStart(2, '0')
      this.todayDate = `${year}年${month}月${date}日`
    },
    
    getRatingText(rating) {
      const texts = ['很差', '较差', '一般', '较好', '很好']
      return texts[rating - 1] || '一般'
    },
    
    async submitQuickFeedback() {
      if (!this.quickFeedback.trim()) {
        alert('请输入反馈内容')
        return
      }
      
      // 模拟提交反馈
      console.log('快速反馈:', this.quickFeedback)
      alert('反馈提交成功！感谢您的建议。')
      this.quickFeedback = ''
    },
    
    goToFortune() {
      this.navigateTo('/daily-fortune')
    },
    
    goToStore() {
      this.navigateTo('/store')
    },
    
    goToContact() {
      this.navigateTo('/contact')
    },
    
    getUserRank() {
      // 根据当前用户功德分计算在排行榜中的排名
      const currentScore = this.appStore.meritPoints
      let rank = 1
      for (const user of this.topUsers) {
        if (user.score > currentScore) {
          rank++
        }
      }
      return rank
    },
    
    getAirdropChance() {
      // 基于功德分计算中奖概率 (最低10%，最高70%)
      const baseChance = 10
      const bonusChance = Math.min(60, Math.floor(this.appStore.meritPoints / 50) * 5)
      return baseChance + bonusChance
    },
    
    async quickClaim() {
      if (!this.airdropStats.canClaim) return
      
      // 模拟快速抽取
      const success = Math.random() < (this.getAirdropChance() / 100)
      
      if (success) {
        const amounts = [0.01, 0.02, 0.05, 0.1]
        const currencies = ['SOL', 'USDT']
        const amount = amounts[Math.floor(Math.random() * amounts.length)]
        const currency = currencies[Math.floor(Math.random() * currencies.length)]
        
        alert(`🎉 恭喜！您获得了 ${amount} ${currency}`)
        this.airdropStats.lastAirdrop = `${amount} ${currency}`
        this.airdropStats.totalClaimed++
      } else {
        alert('😅 很遗憾，这次没有中奖，明天再来试试吧！')
      }
      
      this.airdropStats.todayRemaining--
      if (this.airdropStats.todayRemaining <= 0) {
        this.airdropStats.canClaim = false
      }
    },
    
    goToLeaderboard() {
      this.navigateTo('/leaderboard')
    },
    
    goToAirdrop() {
      this.navigateTo('/airdrop')
    }
  }
}
</script>

<style scoped>
.merit-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
}

.container {
  display: flex;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
}

/* 左侧导航栏 */
.sidebar {
  width: 300px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.sidebar-header h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.user-level {
  color: #667eea;
  font-weight: 600;
  margin: 0;
}

.sidebar-nav {
  flex: 1;
  margin-bottom: 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item:hover {
  background: #f8f9fa;
  transform: translateX(5px);
}

.nav-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateX(10px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.nav-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.nav-label {
  flex: 1;
  font-weight: 600;
}

.nav-badge {
  background: #ff4757;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-weight: bold;
}

.user-summary {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  padding: 1.5rem;
}

.merit-score {
  text-align: center;
  margin-bottom: 1rem;
}

.score {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
}

.unit {
  color: #666;
  margin-left: 0.5rem;
}

.level-progress {
  margin-bottom: 1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

/* 右侧主要内容区 */
.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.content-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.content-section h1 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
}

/* 祈愿上香区块 */
.incense-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.incense-altar {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-radius: 15px;
}

.altar-image {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.incense-burner {
  margin-bottom: 0.5rem;
}

.flames {
  animation: flicker 1.5s infinite alternate;
}

@keyframes flicker {
  0% { opacity: 0.8; }
  100% { opacity: 1; }
}

.altar-desc {
  color: #856404;
  font-weight: 600;
  margin: 0;
}

.incense-options h3 {
  color: #333;
  margin-bottom: 1rem;
}

.incense-types {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.incense-type {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.incense-type:hover {
  border-color: #667eea;
}

.incense-type.selected {
  border-color: #667eea;
  background: #f0f4ff;
}

.incense-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.incense-info {
  flex: 1;
}

.incense-info h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.incense-info p {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.incense-price {
  color: #667eea;
  font-weight: bold;
}

.incense-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.incense-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.incense-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 每日运势区块 */
.fortune-preview {
  max-width: 600px;
  margin: 0 auto;
}

.today-fortune {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 15px;
  margin-bottom: 2rem;
}

.fortune-date h2 {
  color: #0d47a1;
  margin-bottom: 0.5rem;
}

.lunar-date {
  color: #1565c0;
  margin: 0;
}

.fortune-summary {
  flex: 1;
}

.overall-rating {
  margin-bottom: 1rem;
}

.rating-stars {
  margin-right: 0.5rem;
}

.star {
  color: #ffc107;
  font-size: 1.2rem;
}

.star.empty {
  color: #dee2e6;
}

.rating-text {
  color: #0d47a1;
  font-weight: 600;
}

.fortune-highlight {
  color: #1565c0;
  margin: 0;
  line-height: 1.5;
}

/* 法物流通区块 */
.store-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-item {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.category-item:hover {
  transform: translateY(-5px);
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.category-item h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.category-item p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.category-count {
  color: #667eea;
  font-weight: 600;
}

.featured-items h3 {
  color: #333;
  margin-bottom: 1rem;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.store-item {
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
}

.store-item:hover {
  border-color: #667eea;
  transform: translateY(-3px);
}

.item-image {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.item-info h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.item-info p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.item-price {
  color: #667eea;
  font-weight: bold;
}

/* 我的功德区块 */
.merit-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
}

.stat-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
}

.stat-info h3 {
  color: #333;
  margin-bottom: 0.25rem;
  font-size: 1.5rem;
}

.stat-info p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.recent-activities {
  margin-bottom: 2rem;
}

.recent-activities h3 {
  color: #333;
  margin-bottom: 1rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.activity-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.activity-info {
  flex: 1;
}

.activity-info p {
  color: #333;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.activity-time {
  color: #666;
  font-size: 0.8rem;
}

.activity-points {
  color: #28a745;
  font-weight: bold;
}

/* 联系我们区块 */
.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
}

.contact-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.contact-info h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.contact-info p {
  color: #667eea;
  font-weight: 600;
  margin: 0;
}

.quick-feedback {
  margin-bottom: 2rem;
}

.quick-feedback h3 {
  color: #333;
  margin-bottom: 1rem;
}

.feedback-input {
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  margin-bottom: 1rem;
}

.feedback-input:focus {
  outline: none;
  border-color: #667eea;
}

/* 通用按钮样式 */
.detail-btn,
.store-btn,
.contact-btn,
.feedback-btn {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.detail-btn:hover,
.store-btn:hover,
.contact-btn:hover,
.feedback-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* 功德排行榜区块 */
.leaderboard-preview {
  max-width: 800px;
  margin: 0 auto;
}

.my-ranking {
  margin-bottom: 2rem;
}

.ranking-card {
  display: flex;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-radius: 15px;
  gap: 2rem;
}

.rank-badge {
  text-align: center;
}

.rank-number {
  display: block;
  font-size: 3rem;
  font-weight: bold;
  color: #667eea;
}

.rank-text {
  color: #856404;
  font-weight: 600;
}

.rank-details {
  flex: 1;
  text-align: center;
}

.rank-score {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.rank-level {
  color: #667eea;
  font-weight: 600;
  font-size: 1.2rem;
}

.top-users {
  margin-bottom: 2rem;
}

.top-users h3 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.users-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.user-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.user-rank {
  width: 50px;
  text-align: center;
  font-size: 1.5rem;
}

.medal {
  font-size: 2rem;
}

.rank-num {
  font-weight: bold;
  color: #667eea;
  font-size: 1.2rem;
}

.user-info {
  flex: 1;
  margin-left: 1rem;
}

.user-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

.user-level {
  color: #666;
  font-size: 0.9rem;
}

.user-score {
  color: #28a745;
  font-weight: bold;
  font-size: 1.1rem;
}

/* 好运空投区块 */
.airdrop-preview {
  max-width: 700px;
  margin: 0 auto;
}

.airdrop-info-card {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.airdrop-title {
  text-align: center;
  margin-bottom: 2rem;
}

.airdrop-title h2 {
  color: #0d47a1;
  margin-bottom: 0.5rem;
}

.airdrop-title p {
  color: #1565c0;
  margin: 0;
}

.airdrop-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.stat-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #0d47a1;
}

.stat-label {
  color: #1565c0;
  font-size: 0.9rem;
}

.last-airdrop {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.last-label {
  color: #1565c0;
  margin-right: 0.5rem;
}

.last-amount {
  color: #0d47a1;
  font-weight: bold;
  font-size: 1.2rem;
}

.quick-claim {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.your-chance {
  text-align: center;
  margin-bottom: 2rem;
}

.your-chance h3 {
  color: #333;
  margin-bottom: 1rem;
}

.chance-display {
  margin-bottom: 1rem;
}

.chance-value {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.chance-bar {
  width: 100%;
  height: 10px;
  background: #dee2e6;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.chance-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.chance-desc {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.quick-claim-btn {
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-claim-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
}

.quick-claim-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #dee2e6;
}

/* 通用按钮样式扩展 */
.leaderboard-btn,
.airdrop-btn {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.leaderboard-btn:hover,
.airdrop-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

@media (max-width: 1024px) {
  .container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    position: relative;
    padding: 1rem;
  }
  
  .sidebar-nav {
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .nav-item {
    flex-shrink: 0;
    margin-bottom: 0;
    min-width: 120px;
    justify-content: center;
    flex-direction: column;
    padding: 0.8rem;
  }
  
  .nav-label {
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
  
  .nav-icon {
    margin-right: 0;
    margin-bottom: 0.25rem;
  }
  
  .incense-container {
    grid-template-columns: 1fr;
  }
  
  .today-fortune {
    flex-direction: column;
    text-align: center;
  }
  
  .merit-stats,
  .store-categories,
  .items-grid,
  .contact-methods {
    grid-template-columns: 1fr;
  }
  
  .ranking-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .airdrop-stats {
    grid-template-columns: 1fr;
  }
}
</style> 