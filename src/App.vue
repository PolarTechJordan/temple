<template>
  <div id="app">
    <!-- 钱包状态显示（连接后在右上角显示） -->
    <div v-if="appStore.isWalletConnected" class="wallet-status">
      <div class="wallet-info">
        <span class="wallet-address">{{ shortAddress }}</span>
        <button @click="disconnectWallet" class="disconnect-btn">断开</button>
      </div>
    </div>

    <!-- 路由视图 -->
    <router-view />

    <!-- 全局加载动画 -->
    <div v-if="loading" class="global-loading">
      <div class="loading-spinner"></div>
      <p>{{ $t('common.loading') }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useAppStore } from './stores/app'

export default {
  name: 'App',
  setup() {
    const appStore = useAppStore()

    const loading = ref(false)

    // 简化的钱包地址显示
    const shortAddress = computed(() => {
      if (appStore.walletAddress) {
        return appStore.walletAddress.slice(0, 6) + '...' + appStore.walletAddress.slice(-4)
      }
      return ''
    })

    // 断开钱包连接
    const disconnectWallet = () => {
      appStore.disconnectWallet()
    }

    return {
      loading,
      appStore,
      shortAddress,
      disconnectWallet
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'KaiTi', 'STKaiti', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  position: relative;
  background: #F9F4E2;
}

.wallet-status {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;

  .wallet-info {
  display: flex;
    align-items: center;
  gap: 10px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 25px;
    padding: 8px 16px;
    backdrop-filter: blur(10px);
    border: 1px solid #e0e0e0;

    .wallet-address {
      font-size: 0.9rem;
      color: #333;
      font-weight: 500;
    }

    .disconnect-btn {
      padding: 4px 12px;
      border: 1px solid #dc3545;
      background: white;
      color: #dc3545;
      border-radius: 15px;
      cursor: pointer;
      font-size: 0.8rem;
      font-family: 'KaiTi', 'STKaiti', serif;
      transition: all 0.3s;

      &:hover {
        background: #dc3545;
        color: white;
      }
    }
  }
}

.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: white;

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .wallet-status {
    top: 10px;
    right: 10px;
    
    .wallet-info {
      padding: 6px 12px;
      
      .wallet-address {
        font-size: 0.8rem;
      }
      
      .disconnect-btn {
        padding: 3px 8px;
        font-size: 0.7rem;
      }
    }
  }
}
</style> 