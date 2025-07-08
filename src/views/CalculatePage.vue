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
        // 模拟AI计算过程
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // 生成模拟的算命结果
        const mockResult = {
          numbers: [...this.numbers],
          result: this.generateMockFortune(),
          timestamp: new Date().toISOString()
        }
        
        // 保存结果到store
        this.appStore.saveFortuneResult(mockResult)
        
        // 这里应该调用DeepSeek API
        console.log('计算数字:', this.numbers)
        
        // 跳转到结果页面
        this.navigateTo('/result')
        
      } catch (error) {
        console.error('算命失败:', error)
        alert('算命失败，请重试')
      } finally {
        this.calculating = false
      }
    },
    
    generateMockFortune() {
      const fortunes = [
        {
          title: '大吉',
          description: '今日运势极佳，事业顺利，财源广进。',
          advice: '宜：出行、投资、求财\n忌：懈怠、争吵',
          luck: 95
        },
        {
          title: '中吉',
          description: '运势平稳上升，贵人相助，心想事成。',
          advice: '宜：学习、交友、合作\n忌：冲动、决策',
          luck: 80
        },
        {
          title: '小吉',
          description: '运势一般，需要耐心等待时机。',
          advice: '宜：静心、储蓄、养生\n忌：冒险、借贷',
          luck: 65
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