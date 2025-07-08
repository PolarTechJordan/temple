<template>
  <div class="calculate-page">
    <div class="container">
      <h1>{{ $t('calculate.title') }}</h1>
      <div class="calculate-container">
        <div class="description">
          <h2>小六壬神算</h2>
          <p>请输入三个数字（1-99），神明将为您指点迷津</p>
        </div>
        
        <div class="input-section">
          <div class="number-inputs">
            <div class="input-group">
              <label>第一个数字</label>
              <input
                type="number"
                v-model.number="numbers[0]"
                min="1"
                max="99"
                placeholder="1-99"
                class="number-input"
              />
            </div>
            <div class="input-group">
              <label>第二个数字</label>
              <input
                type="number"
                v-model.number="numbers[1]"
                min="1"
                max="99"
                placeholder="1-99"
                class="number-input"
              />
            </div>
            <div class="input-group">
              <label>第三个数字</label>
              <input
                type="number"
                v-model.number="numbers[2]"
                min="1"
                max="99"
                placeholder="1-99"
                class="number-input"
              />
            </div>
          </div>
          
          <button
            @click="calculateFortune"
            :disabled="!isValidInput || calculating"
            class="calculate-btn"
          >
            <span v-if="calculating">算命中...</span>
            <span v-else>开始算命</span>
          </button>
        </div>
        
        <div v-if="calculating" class="calculating-animation">
          <div class="spinner"></div>
          <p>神明正在为您指点迷津...</p>
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
  name: 'CalculatePage',
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
      numbers: [null, null, null],
      calculating: false
    }
  },
  computed: {
    isValidInput() {
      return this.numbers.every(num => 
        num !== null && 
        num >= 1 && 
        num <= 99 && 
        !isNaN(num)
      )
    }
  },
  methods: {
    async calculateFortune() {
      if (!this.isValidInput) return
      
      this.calculating = true
      
      try {
        // 获取用户的愿望
        const userWish = this.appStore.userWish || '祈求好运和财富'
        
        // 调用DeepSeek AI服务生成算命结果
        const aiResult = await deepSeekService.generateFortuneResult(userWish, this.numbers)
        
        const fortuneResult = {
          numbers: [...this.numbers],
          wish: userWish,
          result: aiResult.result,
          timestamp: aiResult.timestamp,
          aiGenerated: aiResult.success
        }
        
        // 保存结果到store
        this.appStore.saveFortuneResult(fortuneResult)
        
        console.log('AI算命结果:', fortuneResult)
        
        // 跳转到结果页面
        this.navigateTo('/result')
        
      } catch (error) {
        console.error('算命失败:', error)
        
        // 如果AI失败，使用默认结果
        const fallbackResult = {
          numbers: [...this.numbers],
          result: this.generateMockFortune(),
          timestamp: new Date().toISOString(),
          aiGenerated: false
        }
        
        this.appStore.saveFortuneResult(fallbackResult)
        this.navigateTo('/result')
        
      } finally {
        this.calculating = false
      }
    },
    
    generateMockFortune() {
      const fortunes = [
        {
          title: '大安卦象',
          description: '根据您提供的数字，神明指示：前路光明，贵人相助，但需谨慎行事，避免冲动。近期财运亨通，事业有成，感情和睦。',
          advice: '建议多行善事，积累功德，虔诚上香获得神明护佑。宜：投资理财、拜访朋友；忌：冲动决策、争执。',
          luck_score: 85,
          wealth_trend: '上升',
          career_trend: '稳定',
          health_trend: '良好'
        },
        {
          title: '速喜卦象',
          description: '卦象显示快速的好运即将来临，财富机会在前方等待，但需要把握时机，行动迅速。事业方面会有突破性进展。',
          advice: '建议提前做好规划，当机会来临时果断行动。宜：主动出击、寻求合作；忌：犹豫不决、错失良机。',
          luck_score: 90,
          wealth_trend: '快速上升',
          career_trend: '突破',
          health_trend: '优秀'
        },
        {
          title: '小吉卦象',
          description: '运势平稳向好，虽无大起大落，但稳中有进。需要耐心积累，持续努力，终将获得满意的回报。',
          advice: '建议保持耐心，稳扎稳打。宜：学习进修、储蓄理财；忌：急于求成、冒险投机。',
          luck_score: 75,
          wealth_trend: '稳步上升',
          career_trend: '平稳',
          health_trend: '良好'
        }
      ]
      
      // 根据数字生成结果
      const sum = this.numbers.reduce((a, b) => a + b, 0)
      const index = sum % fortunes.length
      
      return fortunes[index]
    }
  }
}
</script>

<style scoped>
.calculate-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.container {
  max-width: 600px;
  width: 100%;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.calculate-container {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.description {
  text-align: center;
  margin-bottom: 2rem;
}

.description h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.description p {
  color: #666;
  font-size: 1.1rem;
}

.input-section {
  margin-bottom: 2rem;
}

.number-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
  text-align: center;
}

.number-input {
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1.2rem;
  text-align: center;
  transition: border-color 0.3s ease;
}

.number-input:focus {
  outline: none;
  border-color: #667eea;
}

.calculate-btn {
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

.calculate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.calculate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.calculating-animation {
  text-align: center;
  padding: 2rem;
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

.calculating-animation p {
  color: #666;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .number-inputs {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .container {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style> 