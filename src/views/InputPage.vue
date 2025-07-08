<template>
  <div class="input-page">
    <!-- 语言切换按钮（只在这个页面显示） -->
    <div class="language-switcher">
      <button @click="toggleLanguage" class="language-toggle-btn">
        {{ currentLocale === 'zh-CN' ? '中' : 'EN' }}
      </button>
    </div>

    <!-- 右上角钱包连接按钮 -->
    <div v-if="!appStore.isWalletConnected" class="wallet-header">
      <button 
        @click="showWalletModal = true"
        class="header-connect-btn"
      >
        Connect
      </button>
    </div>



    <div class="container">
      <h1>{{ $t('input.title') }}</h1>
      
      <div class="main-content">
        <!-- 许愿池 -->
        <div class="wish-section">
          <div class="wish-pool">
            <div class="pool-container">
              <textarea
                v-model="wishText"
                :placeholder="$t('input.placeholder')"
                class="wish-input"
                rows="6"
                maxlength="200"
              ></textarea>
              <div class="char-counter">{{ wishText.length }}/200</div>
            </div>
            <button 
              @click="submitWish"
              :disabled="!wishText.trim()"
              class="submit-btn"
            >
              {{ $t('input.submit') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 钱包连接模态框 -->
    <div v-if="showWalletModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>连接钱包</h2>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        
        <div class="modal-body">
          <p class="modal-description">连接您的钱包开始祈福之旅</p>
          
          <!-- OKX 钱包选项 -->
          <button 
            @click="connectWallet"
            :disabled="connecting"
            class="wallet-option-btn"
            :class="{ 'connecting': connecting }"
          >
            <!-- NEW 标签 -->
            <div class="new-badge">NEW!</div>
            
            <!-- 钱包图标 -->
            <div class="wallet-icon-container">
              <div class="wallet-icon-bg">
                🏺
              </div>
            </div>
            
            <!-- 钱包信息 -->
            <div class="wallet-info-modern">
              <p class="wallet-title">OKX 财神钱包</p>
              <p class="wallet-desc">祈福专用，安全可靠！</p>
            </div>
            
            <!-- 装饰性SVG背景 -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 303 54" fill="none" class="wallet-bg-svg">
              <defs>
                <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.1" />
                  <stop offset="50%" style="stop-color:#764ba2;stop-opacity:0.2" />
                  <stop offset="100%" style="stop-color:#667eea;stop-opacity:0.1" />
                </linearGradient>
              </defs>
              <path d="M0 27C50 10, 100 44, 150 27C200 10, 250 44, 303 27V54H0V27Z" fill="url(#walletGradient)"/>
            </svg>
          </button>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </div>
      </div>
    </div>

    <!-- 钱包连接提示框 -->
    <div v-if="showWalletAlert" class="alert-overlay" @click="closeAlert">
      <div class="alert-content" @click.stop>
        <div class="alert-icon">🔗</div>
        <h3>需要连接钱包</h3>
        <p>请先连接钱包才能提交许愿</p>
        <div class="alert-actions">
          <button @click="openWalletFromAlert" class="alert-connect-btn">
            连接钱包
          </button>
          <button @click="closeAlert" class="alert-cancel-btn">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'

export default {
  name: 'InputPage',
  setup() {
    const { t, locale } = useI18n()
    const router = useRouter()
    const appStore = useAppStore()

    // 当前语言
    const currentLocale = computed(() => locale.value)

    // 切换语言
    const toggleLanguage = () => {
      const newLang = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
      locale.value = newLang
      // 根据语言切换路由
      const currentRoute = router.currentRoute.value
      if (newLang === 'en-US') {
        // 切换到英文路由
        if (!currentRoute.path.startsWith('/en')) {
          router.push('/en' + currentRoute.path)
        }
      } else {
        // 切换到中文路由
        if (currentRoute.path.startsWith('/en')) {
          router.push(currentRoute.path.replace('/en', ''))
        }
      }
    }

    // 语言感知的导航函数
    const navigateTo = (path) => {
      const currentPath = router.currentRoute.value.path
      const isEnglish = currentPath.startsWith('/en')
      const targetPath = isEnglish ? `/en${path}` : path
      router.push(targetPath)
    }

    return {
      t,
      router,
      appStore,
      navigateTo,
      currentLocale,
      toggleLanguage
    }
  },
  data() {
    return {
      wishText: '',
      connecting: false,
      error: null,
      showWalletModal: false,
      showWalletAlert: false
    }
  },
  methods: {
    async connectWallet() {
      this.connecting = true
      this.error = null
      
      try {
        // 模拟OKX钱包连接
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 这里应该实际连接OKX钱包
        console.log('连接OKX钱包')
        
        // 使用 Pinia store 保存连接状态
        const mockAddress = '0x' + Math.random().toString(16).substr(2, 40)
        this.appStore.connectWallet(mockAddress, 'OKX')
        
        // 连接成功后关闭模态框
        this.showWalletModal = false
        
      } catch (error) {
        this.error = '连接失败，请重试'
        console.error('钱包连接失败:', error)
      } finally {
        this.connecting = false
      }
    },
    

    
    submitWish() {
      if (!this.wishText.trim()) return
      
      // 检查钱包连接状态
      if (!this.appStore.isWalletConnected) {
        // 显示连接钱包提示框
        this.showWalletAlert = true
        return
      }
      
      // 保存许愿内容到store
      this.appStore.saveUserWish(this.wishText)
      // 直接跳转到算命页面
      this.navigateTo('/calculate')
    },
    
    closeModal() {
      this.showWalletModal = false
      this.error = null
    },
    
    closeAlert() {
      this.showWalletAlert = false
    },
    
    openWalletFromAlert() {
      this.showWalletAlert = false
      this.showWalletModal = true
    }
  }
}
</script>

<style scoped>
.input-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
}

.language-switcher {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

.language-toggle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 1);
    border-color: #667eea;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

/* 右上角钱包区域 */
.wallet-header {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-connect-btn {
  height: 2rem;
  border-radius: 9999px;
  border: 1px solid #171717;
  background: #171717;
  padding: 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    border-color: #667eea;
    background: #0a0a0a;
    transform: translateY(-1px);
  }
}

@media (min-width: 768px) {
  .header-connect-btn {
    height: 2.25rem;
    font-size: 0.875rem;
  }
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
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.wish-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 600px;
}

.wish-pool {
  width: 100%;
}

.pool-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.wish-input {
  width: 100%;
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  font-size: 1.1rem;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

.wish-input:focus {
  outline: none;
  border-color: #667eea;
}

.char-counter {
  position: absolute;
  bottom: 10px;
  right: 15px;
  color: #888;
  font-size: 0.9rem;
}

.submit-btn {
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

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.close-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: #f8f9fa;
  color: #666;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e9ecef;
    color: #333;
  }
}

.modal-body {
  padding: 2rem;
}

.modal-description {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 1rem;
}



/* 钱包选项按钮样式 */
.wallet-option-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 0.75rem;
  border: 1px solid #262626;
  background: #171717;
  font-size: 0.75rem;
  height: 6rem;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #e5e5e5;
  overflow: hidden;
  
  &:hover:not(:disabled) {
    border-color: #404040;
    background: #1a1a1a;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

@media (min-width: 768px) {
  .wallet-option-btn {
    font-size: 0.875rem;
  }
}

/* NEW 徽章 */
.new-badge {
  position: absolute;
  top: -0.375rem;
  right: 1rem;
  border-radius: 0.25rem;
  background: #667eea;
  padding: 0.125rem 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(7, 9, 15, 0.75);
  z-index: 10;
}

/* 钱包图标容器 */
.wallet-icon-container {
  display: flex;
  width: 2.625rem;
  height: 2.625rem;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.wallet-icon-bg {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

/* 钱包信息区域 */
.wallet-info-modern {
  flex: 1;
  text-align: left;
  z-index: 10;
  position: relative;
}

.wallet-title {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  color: #e5e5e5;
  margin: 0 0 0.125rem 0;
}

.wallet-desc {
  position: relative;
  z-index: 10;
  max-width: 10.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #737373;
  margin: 0;
}

/* 装饰性SVG背景 */
.wallet-bg-svg {
  position: absolute;
  right: -1.25rem;
  width: 13.75rem;
  height: 3.375rem;
  pointer-events: none;
}

@media (min-width: 768px) {
  .wallet-bg-svg {
    width: 18.75rem;
  }
}

/* 提示框样式 */
.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(3px);
}

.alert-content {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.alert-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.alert-content h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.3rem;
}

.alert-content p {
  margin: 0 0 2rem 0;
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
}

.alert-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.alert-connect-btn {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
}

.alert-cancel-btn {
  padding: 0.8rem 1.5rem;
  background: #f8f9fa;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e9ecef;
    border-color: #ccc;
  }
}

.error-message {
  margin-top: 1rem;
  padding: 1rem;
  background: #ffe6e6;
  color: #cc0000;
  border-radius: 8px;
  text-align: center;
}

/* 连接状态动画 */
.wallet-option-btn.connecting .wallet-icon-bg {
  animation: pulse 1s infinite;
}

.wallet-option-btn.connecting {
  border-color: #667eea;
  background: #1e1b4b;
}

@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}

@media (max-width: 768px) {
  .language-switcher {
    top: 10px;
    left: 10px;
  }
  
  .language-toggle-btn {
    width: 35px;
    height: 35px;
    font-size: 12px;
  }

  .wallet-header {
    top: 10px;
    right: 10px;
  }

  .main-content {
    min-height: 50vh;
    padding: 1rem;
  }

  .wish-section {
    padding: 1.5rem;
    max-width: 100%;
  }
  
  .wallet-option-btn {
    height: 5rem;
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .wallet-title {
    font-size: 0.875rem;
  }
  
  .wallet-desc {
    font-size: 0.625rem;
    max-width: 8rem;
  }
  
  .wallet-bg-svg {
    width: 11rem;
    right: -0.5rem;
  }

  .modal-content {
    width: 95%;
    max-width: none;
  }

  .modal-header {
    padding: 1rem 1.5rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .alert-content {
    width: 95%;
    padding: 1.5rem;
  }

  .alert-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style> 