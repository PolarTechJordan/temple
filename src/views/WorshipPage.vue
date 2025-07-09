<template>
  <div class="worship-page">
    <div class="container">
      <h1>{{ $t('worship.title') }}</h1>
      <div class="worship-container">
        <div class="worship-video">
          <video
            ref="worshipVideo"
            :src="worshipVideoSrc"
            autoplay
            muted
            @ended="onVideoEnded"
            class="video-player"
          ></video>
        </div>
        <div class="worship-message">
          <h2>{{ worshipMessage }}</h2>
          <p>{{ worshipDescription }}</p>
        </div>
        <div v-if="showContinueButton" class="continue-section">
          <button @click="continueToMerit" class="ink-button">
            查看功德
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'

export default {
  name: 'WorshipPage',
  setup() {
    const router = useRouter()
    const { t } = useI18n()
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
      t,
      appStore,
      navigateTo
    }
  },
  data() {
    return {
      worshipVideoSrc: '/videos/worship.mp4',
      worshipMessage: '虔诚上香',
      worshipDescription: '正在为您上香祈福...',
      showContinueButton: false
    }
  },
  mounted() {
    // 如果没有视频文件，3秒后自动显示继续按钮
    setTimeout(() => {
      this.onVideoEnded()
    }, 3000)
  },
  methods: {
    onVideoEnded() {
      this.worshipMessage = '上香完成'
      this.worshipDescription = '神明已收到您的祈福，功德已增加！'
      this.showContinueButton = true
      
      // 增加额外的功德分（上香完成奖励）
      this.appStore.addMeritPoints(5)
    },
    continueToMerit() {
      this.navigateTo('/merit')
    }
  }
}
</script>

<style scoped>
.worship-page {
  min-height: 100vh;
  background: #F9F4E2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'KaiTi', 'STKaiti', serif;
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

.worship-container {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  text-align: center;
}

.worship-video {
  margin-bottom: 2rem;
}

.video-player {
  width: 100%;
  max-width: 400px;
  height: 300px;
  border-radius: 15px;
  object-fit: cover;
}

.worship-message {
  margin-bottom: 2rem;
}

.worship-message h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.worship-message p {
  color: #666;
  font-size: 1.1rem;
}

.continue-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}
</style> 