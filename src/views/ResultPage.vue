<template>
  <div class="result-page">
    <div class="container">
      <h1>{{ $t('result.title') }}</h1>
      
      <div class="main-content">
        <!-- 上方：算命结果 -->
        <div class="result-section">
          <div class="fortune-result">
            <h2>神算结果</h2>
            
            <!-- 算命详情 -->
            <div v-if="fortuneDetails" class="fortune-details">
              <div class="input-info">
                <p><strong>您的愿望：</strong>{{ fortuneDetails.wish }}</p>
                <p><strong>神算数字：</strong>{{ fortuneDetails.numbers.join(', ') }}</p>
                <div v-if="fortuneDetails.aiGenerated" class="ai-badge">
                  <span>🤖 AI神算</span>
                </div>
              </div>
              
              <div class="fortune-metrics">
                <div class="metric-item">
                  <span class="metric-label">运势指数</span>
                  <div class="metric-value">
                    <span class="score">{{ fortuneDetails.luckScore }}</span>
                    <div class="score-bar">
                      <div class="score-fill" :style="{ width: fortuneDetails.luckScore + '%' }"></div>
                    </div>
                  </div>
                </div>
                <div class="trend-items">
                  <div class="trend-item">
                    <span class="trend-icon">💰</span>
                    <span class="trend-label">财运</span>
                    <span class="trend-value">{{ fortuneDetails.wealthTrend }}</span>
                  </div>
                  <div class="trend-item">
                    <span class="trend-icon">📈</span>
                    <span class="trend-label">事业</span>
                    <span class="trend-value">{{ fortuneDetails.careerTrend }}</span>
                  </div>
                  <div class="trend-item">
                    <span class="trend-icon">🏥</span>
                    <span class="trend-label">健康</span>
                    <span class="trend-value">{{ fortuneDetails.healthTrend }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="result-content">
              <pre class="fortune-text">{{ fortuneResult }}</pre>
            </div>
          </div>
          
          <div class="blessing-hint">
            <h3>六神已定，虔诚上香，神明护佑</h3>
            <p>请在下方选择香火数量并完成支付，诚心上香获得神明护佑。</p>
          </div>
        </div>

        <!-- 下方：支付功能 -->
        <div class="payment-section">
          <div class="payment-form">
            <h2>香火支付</h2>
            <p class="payment-description">选择香火数量，虔诚支付获得护佑</p>
            
            <div class="incense-selection">
              <div class="input-group">
                <label>香火数量</label>
                <input
                  type="number"
                  v-model.number="incenseCount"
                  min="1"
                  max="100"
                  placeholder="请输入香火数量"
                  class="count-input"
                />
              </div>
              
              <div class="input-group">
                <label>选择币种</label>
                <select v-model="selectedCurrency" class="currency-select">
                  <option value="SOL">SOL</option>
                  <option value="USDT">USDT</option>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                </select>
              </div>
            </div>
            
            <div class="price-display">
              <p>总价: <span class="price">{{ totalPrice }} {{ selectedCurrency }}</span></p>
            </div>
            
            <button 
              @click="processPayment"
              :disabled="!isValidSelection || processing"
              class="payment-btn"
            >
              {{ processing ? '支付中...' : '立即支付' }}
            </button>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

export default {
  name: 'ResultPage',
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
      incenseCount: 1,
      selectedCurrency: 'SOL',
      currencyRates: {
        SOL: 0.01,
        USDT: 1,
        BTC: 0.00001,
        ETH: 0.0003
      },
      processing: false,
      error: null
    }
  },
  computed: {
    fortuneResult() {
      // 从store获取算命结果
      const result = this.appStore.fortuneResult
      if (result && result.result) {
        const { title, description, advice } = result.result
        return `【${title}】\n\n${description}\n\n💡 神明指引：\n${advice}`
      }
      return '根据您提供的数字，神明指示：前路光明，贵人相助，但需谨慎行事，避免冲动。近期财运亨通，事业有成，感情和睦。建议多行善事，积累功德。'
    },
    fortuneDetails() {
      // 显示详细的算命信息
      const result = this.appStore.fortuneResult
      if (result && result.result) {
        return {
          numbers: result.numbers || [],
          wish: result.wish || '',
          luckScore: result.result.luck_score || 0,
          wealthTrend: result.result.wealth_trend || '',
          careerTrend: result.result.career_trend || '',
          healthTrend: result.result.health_trend || '',
          aiGenerated: result.aiGenerated || false,
          timestamp: result.timestamp || ''
        }
      }
      return null
    },
    totalPrice() {
      return (this.incenseCount * this.currencyRates[this.selectedCurrency]).toFixed(8)
    },
    isValidSelection() {
      return this.incenseCount > 0 && this.incenseCount <= 100 && this.selectedCurrency
    }
  },

  methods: {
    async processPayment() {
      if (!this.isValidSelection) return
      
      this.processing = true
      this.error = null
      
      try {
        // 模拟支付处理
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // 添加功德分
        this.appStore.addMeritPoints(this.incenseCount * 10)
        
        // 添加上香记录
        this.appStore.addIncenseRecord({
          count: this.incenseCount,
          currency: this.selectedCurrency,
          amount: this.totalPrice,
          meritGained: this.incenseCount * 10
        })
        
        // 支付成功后直接跳转到上香页面
        this.navigateTo('/worship')
        
      } catch (error) {
        this.error = '支付失败，请重试'
        console.error('支付失败:', error)
        this.processing = false
      }
    }
  }
}
</script>

<style scoped>
.result-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.result-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.fortune-result {
  margin-bottom: 2rem;
}

.fortune-result h2 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.result-content {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

/* Fortune details styles */
.fortune-details {
  margin-bottom: 1.5rem;
}

.input-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.input-info p {
  margin: 0.5rem 0;
  color: #555;
  font-size: 0.95rem;
}

.ai-badge {
  display: inline-block;
  margin-top: 0.5rem;
}

.ai-badge span {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.fortune-metrics {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.metric-item {
  margin-bottom: 1rem;
}

.metric-label {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.metric-value {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.score {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  min-width: 3rem;
}

.score-bar {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.trend-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.trend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.trend-icon {
  font-size: 1.2rem;
}

.trend-label {
  color: #666;
  font-size: 0.9rem;
}

.trend-value {
  color: #333;
  font-weight: 600;
  margin-left: auto;
}

.fortune-text {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
  font-family: inherit;
}

.result-content p {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
}

.blessing-hint {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-radius: 10px;
}

.blessing-hint h3 {
  color: #856404;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.blessing-hint p {
  color: #856404;
  margin: 0;
}

.payment-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.payment-form h2,
.payment-success h2 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.payment-description {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.incense-selection {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.count-input,
.currency-select {
  padding: 0.8rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.count-input:focus,
.currency-select:focus {
  outline: none;
  border-color: #667eea;
}

.price-display {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.price-display p {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.price {
  font-weight: bold;
  color: #667eea;
}

.payment-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.payment-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  padding: 1rem;
  background: #ffe6e6;
  color: #cc0000;
  border-radius: 8px;
  text-align: center;
}

@media (max-width: 768px) {
  .main-content {
    gap: 1rem;
  }

  .incense-selection {
    gap: 1rem;
  }
}
</style> 