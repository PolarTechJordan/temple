<template>
  <div class="daily-fortune-page">
    <div class="container">
      <h1>每日运势</h1>
      
      <div class="fortune-container">
        <!-- 今日黄道吉日 -->
        <div class="auspicious-section">
          <h2>黄道吉日</h2>
          <div class="date-display">
            <div class="lunar-date">
              <span class="date">{{ currentDate }}</span>
              <span class="lunar">{{ lunarDate }}</span>
            </div>
            <div class="auspicious-level" :class="auspiciousLevel">
              {{ auspiciousText }}
            </div>
          </div>
        </div>

        <!-- 宜忌事项 -->
        <div class="recommendations">
          <div class="suitable-section">
            <h3>宜</h3>
            <div class="items-grid">
              <div v-for="item in suitableActivities" :key="item" class="item">
                {{ item }}
              </div>
            </div>
          </div>

          <div class="unsuitable-section">
            <h3>忌</h3>
            <div class="items-grid">
              <div v-for="item in unsuitableActivities" :key="item" class="item">
                {{ item }}
              </div>
            </div>
          </div>
        </div>

        <!-- 运势详情 -->
        <div class="fortune-details">
          <div class="fortune-category">
            <h3>财运</h3>
            <div class="stars">
              <span v-for="n in fortuneRatings.wealth" :key="n" class="star filled">★</span>
              <span v-for="n in (5 - fortuneRatings.wealth)" :key="n + 5" class="star">☆</span>
            </div>
            <p>{{ fortuneTexts.wealth }}</p>
          </div>

          <div class="fortune-category">
            <h3>事业</h3>
            <div class="stars">
              <span v-for="n in fortuneRatings.career" :key="n" class="star filled">★</span>
              <span v-for="n in (5 - fortuneRatings.career)" :key="n + 5" class="star">☆</span>
            </div>
            <p>{{ fortuneTexts.career }}</p>
          </div>

          <div class="fortune-category">
            <h3>感情</h3>
            <div class="stars">
              <span v-for="n in fortuneRatings.love" :key="n" class="star filled">★</span>
              <span v-for="n in (5 - fortuneRatings.love)" :key="n + 5" class="star">☆</span>
            </div>
            <p>{{ fortuneTexts.love }}</p>
          </div>

          <div class="fortune-category">
            <h3>健康</h3>
            <div class="stars">
              <span v-for="n in fortuneRatings.health" :key="n" class="star filled">★</span>
              <span v-for="n in (5 - fortuneRatings.health)" :key="n + 5" class="star">☆</span>
            </div>
            <p>{{ fortuneTexts.health }}</p>
          </div>
        </div>

        <!-- 幸运提醒 -->
        <div class="lucky-tips">
          <h3>今日幸运</h3>
          <div class="tips-grid">
            <div class="tip-item">
              <span class="label">幸运颜色:</span>
              <span class="value" :style="{ color: luckyColor }">{{ luckyColor }}</span>
            </div>
            <div class="tip-item">
              <span class="label">幸运数字:</span>
              <span class="value">{{ luckyNumber }}</span>
            </div>
            <div class="tip-item">
              <span class="label">幸运方位:</span>
              <span class="value">{{ luckyDirection }}</span>
            </div>
            <div class="tip-item">
              <span class="label">吉时:</span>
              <span class="value">{{ luckyTime }}</span>
            </div>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>正在生成每日运势...</p>
        </div>

        <!-- 返回按钮 -->
        <div class="action-buttons">
          <button @click="goBack" class="back-btn">返回</button>
          <button @click="refreshFortune" :disabled="loading" class="refresh-btn">
            {{ loading ? '生成中...' : '刷新运势' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import deepSeekService from '@/services/deepseekService'

export default {
  name: 'DailyFortunePage',
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
    
    return {
      router,
      appStore,
      navigateTo
    }
  },
  data() {
    return {
      currentDate: '',
      lunarDate: '',
      auspiciousLevel: 'good',
      auspiciousText: '宜',
      suitableActivities: [],
      unsuitableActivities: [],
      fortuneRatings: {
        wealth: 4,
        career: 3,
        love: 5,
        health: 4
      },
      fortuneTexts: {
        wealth: '今日财运亨通，适合投资理财，但需谨慎选择项目。',
        career: '工作方面有贵人相助，但需要主动出击，把握机会。',
        love: '感情运势极佳，单身者有望遇到心仪对象，恋人关系和睦。',
        health: '身体状况良好，适合户外运动，注意饮食均衡。'
      },
      luckyColor: '金色',
      luckyNumber: '8',
      luckyDirection: '东南',
      luckyTime: '09:00-11:00',
      dailyFortuneData: null,
      loading: false
    }
  },
  async mounted() {
    this.updateCurrentDate()
    await this.loadDailyFortune()
  },
  methods: {
    updateCurrentDate() {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const date = String(today.getDate()).padStart(2, '0')
      this.currentDate = `${year}年${month}月${date}日`
      
      // 获取农历日期
      this.lunarDate = deepSeekService.getLunarDate(today)
    },

    async loadDailyFortune() {
      // 检查store中是否有今日运势数据
      const today = new Date().toISOString().split('T')[0]
      const existingFortune = this.appStore.dailyFortune
      
      if (existingFortune && existingFortune.date === today) {
        // 已有今日运势，直接使用
        this.dailyFortuneData = existingFortune
        this.updateFortuneDisplay()
        return
      }
      
      // 需要生成新的运势
      this.loading = true
      
      try {
        const fortuneData = await deepSeekService.generateDailyFortune(today, this.lunarDate)
        this.dailyFortuneData = fortuneData
        
        // 保存到store
        this.appStore.setDailyFortune(fortuneData)
        
        this.updateFortuneDisplay()
        console.log('每日运势已加载:', fortuneData)
        
      } catch (error) {
        console.error('加载每日运势失败:', error)
        
        // 使用默认运势
        this.dailyFortuneData = deepSeekService.generateDefaultDailyFortune(today, this.lunarDate)
        this.updateFortuneDisplay()
        
      } finally {
        this.loading = false
      }
    },

    updateFortuneDisplay() {
      if (!this.dailyFortuneData) return
      
      const data = this.dailyFortuneData
      
      // 更新运势评级
      this.fortuneRatings = {
        wealth: data.wealth?.rating || 4,
        career: data.career?.rating || 3,
        love: data.love?.rating || 5,
        health: data.health?.rating || 4
      }
      
      // 更新运势文本
      this.fortuneTexts = {
        wealth: data.wealth?.description || '财运平稳，适合稳健投资。',
        career: data.career?.description || '工作运势良好，适合积极行动。',
        love: data.love?.description || '感情运势不错，单身者有机会遇到心仪对象。',
        health: data.health?.description || '身体状况良好，注意适当休息。'
      }
      
      // 更新幸运元素
      this.luckyColor = data.lucky_color || '金色'
      this.luckyNumber = (data.lucky_numbers && data.lucky_numbers.length > 0) 
        ? data.lucky_numbers.join(', ') 
        : '8'
      
      // 更新宜忌事项
      this.suitableActivities = data.suitable_activities || ['祈福上香', '学习进修', '拜访朋友']
      this.unsuitableActivities = data.avoid_activities || ['冲动消费', '争执', '熬夜']
      
      // 设置整体吉凶程度
      const overallRating = data.overall_rating || 4
      if (overallRating >= 4) {
        this.auspiciousLevel = 'good'
        this.auspiciousText = '吉'
      } else if (overallRating >= 3) {
        this.auspiciousLevel = 'neutral'
        this.auspiciousText = '平'
      } else {
        this.auspiciousLevel = 'bad'
        this.auspiciousText = '凶'
      }
    },
    
    generateDailyFortune() {
      // 保留原始的随机生成方法作为备用
      const today = new Date()
      const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
      const random = (seed * 9301 + 49297) % 233280 / 233280
      
      // 根据随机数生成各种运势数据
      this.fortuneRatings = {
        wealth: Math.floor(random * 5) + 1,
        career: Math.floor((random * 1.2) % 1 * 5) + 1,
        love: Math.floor((random * 1.5) % 1 * 5) + 1,
        health: Math.floor((random * 1.8) % 1 * 5) + 1
      }
      
      // 随机选择幸运元素
      const colors = ['金色', '红色', '紫色', '蓝色', '绿色', '银色']
      const numbers = ['1', '3', '6', '8', '9', '18', '28', '38']
      const directions = ['东', '南', '西', '北', '东南', '西南', '东北', '西北']
      const times = ['06:00-08:00', '09:00-11:00', '14:00-16:00', '19:00-21:00']
      
      this.luckyColor = colors[Math.floor(random * colors.length)]
      this.luckyNumber = numbers[Math.floor((random * 1.3) % 1 * numbers.length)]
      this.luckyDirection = directions[Math.floor((random * 1.7) % 1 * directions.length)]
      this.luckyTime = times[Math.floor((random * 2.1) % 1 * times.length)]
      
      // 根据整体运势设置吉凶
      const totalRating = Object.values(this.fortuneRatings).reduce((sum, val) => sum + val, 0)
      if (totalRating >= 16) {
        this.auspiciousLevel = 'excellent'
        this.auspiciousText = '大吉'
      } else if (totalRating >= 12) {
        this.auspiciousLevel = 'good'
        this.auspiciousText = '吉'
      } else {
        this.auspiciousLevel = 'normal'
        this.auspiciousText = '平'
      }
    },
    
    async refreshFortune() {
      // 清除缓存并重新生成运势
      this.loading = true
      
      try {
        const today = new Date().toISOString().split('T')[0]
        
        // 清除DeepSeek服务的缓存
        deepSeekService.clearCache()
        
        // 重新生成运势
        const fortuneData = await deepSeekService.generateDailyFortune(today, this.lunarDate)
        this.dailyFortuneData = fortuneData
        
        // 更新store
        this.appStore.setDailyFortune(fortuneData)
        
        this.updateFortuneDisplay()
        console.log('运势已刷新:', fortuneData)
        
      } catch (error) {
        console.error('刷新运势失败:', error)
        alert('刷新运势失败，请稍后重试')
      } finally {
        this.loading = false
      }
    },
    
    goBack() {
      this.navigateTo('/merit')
    }
  }
}
</script>

<style scoped>
.daily-fortune-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.fortune-container {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.auspicious-section {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-radius: 15px;
}

.auspicious-section h2 {
  color: #856404;
  margin-bottom: 1rem;
}

.date-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lunar-date {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.date {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.lunar {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}

.auspicious-level {
  font-size: 2rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 10px;
}

.auspicious-level.excellent {
  background: #d4edda;
  color: #155724;
}

.auspicious-level.good {
  background: #d1ecf1;
  color: #0c5460;
}

.auspicious-level.normal {
  background: #f8d7da;
  color: #721c24;
}

.recommendations {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.suitable-section h3 {
  color: #28a745;
  margin-bottom: 1rem;
  text-align: center;
}

.unsuitable-section h3 {
  color: #dc3545;
  margin-bottom: 1rem;
  text-align: center;
}

.items-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.item {
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid #e9ecef;
}

.suitable-section .item {
  border-color: #28a745;
  color: #28a745;
}

.unsuitable-section .item {
  border-color: #dc3545;
  color: #dc3545;
}

.fortune-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.fortune-category {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
  text-align: center;
}

.fortune-category h3 {
  color: #333;
  margin-bottom: 1rem;
}

.stars {
  margin-bottom: 1rem;
}

.star {
  font-size: 1.2rem;
  margin: 0 2px;
}

.star.filled {
  color: #ffc107;
}

.star:not(.filled) {
  color: #dee2e6;
}

.fortune-category p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

.lucky-tips {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 15px;
}

.lucky-tips h3 {
  color: #0d47a1;
  margin-bottom: 1rem;
  text-align: center;
}

.tips-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.tip-item {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}

.label {
  color: #495057;
  font-weight: 500;
}

.value {
  font-weight: bold;
  color: #0d47a1;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.back-btn,
.refresh-btn {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn {
  background: #6c757d;
  color: white;
}

.refresh-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.back-btn:hover,
.refresh-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-state {
  text-align: center;
  padding: 2rem;
  margin: 2rem 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: #666;
  font-size: 1rem;
  margin: 0;
}

@media (max-width: 768px) {
  .date-display {
    flex-direction: column;
    gap: 1rem;
  }

  .recommendations,
  .fortune-details,
  .tips-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style> 