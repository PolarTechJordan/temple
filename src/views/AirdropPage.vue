<template>
  <div class="airdrop-page">
    <div class="container">
      <h1>好运空投</h1>
      <div class="airdrop-container">
        <div class="airdrop-info">
          <h2>基于功德分的随机空投</h2>
          <p>您的功德分越高，获得空投的概率和金额越大</p>
          <div class="merit-display">
            <span>当前功德分：</span>
            <span class="merit-score">{{ meritScore }}</span>
          </div>
        </div>
        
        <div class="airdrop-action">
          <button 
            @click="claimAirdrop"
            :disabled="claiming || !canClaim"
            class="claim-btn"
          >
            <span v-if="claiming">抽取中...</span>
            <span v-else-if="!canClaim">今日已抽取</span>
            <span v-else>抽取空投</span>
          </button>
        </div>
        
        <div v-if="airdropResult" class="airdrop-result">
          <h3>{{ airdropResult.success ? '恭喜获得空投！' : '很遗憾，今日无缘' }}</h3>
          <p v-if="airdropResult.success">
            {{ airdropResult.amount }} {{ airdropResult.currency }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AirdropPage',
  data() {
    return {
      meritScore: 100,
      claiming: false,
      canClaim: true,
      airdropResult: null
    }
  },
  methods: {
    async claimAirdrop() {
      if (!this.canClaim) return
      
      this.claiming = true
      this.airdropResult = null
      
      try {
        // 模拟抽取过程
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 随机抽取结果
        const success = Math.random() < 0.3 // 30% 概率
        const currencies = ['SOL', 'USDT', 'BTC', 'ETH']
        const amounts = [0.01, 0.05, 0.1, 0.5, 1]
        
        this.airdropResult = {
          success,
          amount: success ? amounts[Math.floor(Math.random() * amounts.length)] : 0,
          currency: success ? currencies[Math.floor(Math.random() * currencies.length)] : null
        }
        
        this.canClaim = false
        
      } catch (error) {
        console.error('空投失败:', error)
        alert('空投失败，请重试')
      } finally {
        this.claiming = false
      }
    }
  }
}
</script>

<style scoped>
.airdrop-page {
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

.airdrop-container {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  text-align: center;
}

.airdrop-info {
  margin-bottom: 2rem;
}

.airdrop-info h2 {
  color: #333;
  margin-bottom: 1rem;
}

.airdrop-info p {
  color: #666;
  margin-bottom: 1rem;
}

.merit-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  color: #333;
}

.merit-score {
  font-weight: bold;
  color: #667eea;
  font-size: 1.5rem;
}

.claim-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.claim-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.claim-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.airdrop-result {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
}

.airdrop-result h3 {
  color: #333;
  margin-bottom: 1rem;
}

.airdrop-result p {
  color: #667eea;
  font-size: 1.2rem;
  font-weight: 600;
}
</style> 