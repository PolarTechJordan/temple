<template>
  <div class="initial-page fullscreen temple-bg">
    <!-- 背景视频 -->
    <div class="video-container" v-if="!videoLoaded">
      <div class="loading-placeholder">
        <div class="loading-spinner"></div>
        <p>{{ $t('initial.loadingVideo') }}</p>
      </div>
    </div>
    
    <!-- 主要内容 -->
    <div class="content-wrapper" v-show="videoLoaded">
      <div class="video-section">
        <video
          ref="videoElement"
          class="intro-video"
          :src="videoSrc"
          muted
          preload="auto"
          @loadeddata="onVideoLoaded"
          @ended="onVideoEnded"
        />
        
        <!-- 涟漪效果覆盖层 -->
        <div 
          class="ripple-overlay"
          :class="{ 'show-ripple': showRipple }"
          @click="handleClick"
          @mouseenter="startRipple"
          @mouseleave="stopRipple"
        >
          <div class="ripple-effect" ref="rippleElement"></div>
        </div>
      </div>
      
      <!-- 标题和描述 -->
      <div class="title-section">
        <h1 class="main-title">{{ $t('initial.title') }}</h1>
        <h2 class="subtitle">{{ $t('initial.subtitle') }}</h2>
        <p class="description">{{ $t('initial.description') }}</p>
        
        <!-- 进入按钮 -->
        <button 
          class="enter-btn btn btn-primary btn-lg ripple"
          :class="{ 'show': canEnter }"
          @click="enterSite"
          :disabled="!canEnter"
        >
          {{ $t('initial.enterPrompt') }}
        </button>
      </div>
    </div>
    
    <!-- 粒子效果背景 -->
    <div class="particles-background" ref="particlesContainer"></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'

export default {
  name: 'InitialPage',
  setup() {
    const router = useRouter()
    const { locale } = useI18n()
    const appStore = useAppStore()
    
    // 响应式数据
    const videoElement = ref(null)
    const rippleElement = ref(null)
    const particlesContainer = ref(null)
    const videoLoaded = ref(false)
    const videoEnded = ref(false)
    const showRipple = ref(false)
    const canEnter = ref(false)
    
    // 视频源路径 - 这里先用占位符，等用户上传后替换
    const videoSrc = ref('/videos/temple-intro.mp4')
    
    let rippleTimer = null
    let particles = []
    let animationFrame = null
    
    // 视频加载完成
    const onVideoLoaded = () => {
      videoLoaded.value = true
      // 自动播放视频
      setTimeout(() => {
        if (videoElement.value) {
          videoElement.value.play().catch(error => {
            console.log('视频自动播放失败:', error)
            // 如果自动播放失败，显示进入按钮
            canEnter.value = true
          })
        }
      }, 500)
    }
    
    // 视频播放结束
    const onVideoEnded = () => {
      videoEnded.value = true
      canEnter.value = true
      showRipple.value = true
    }
    
    // 开始涟漪效果
    const startRipple = () => {
      if (!canEnter.value) return
      
      showRipple.value = true
      rippleTimer = setInterval(() => {
        createRipple()
      }, 1000)
    }
    
    // 停止涟漪效果
    const stopRipple = () => {
      showRipple.value = false
      if (rippleTimer) {
        clearInterval(rippleTimer)
        rippleTimer = null
      }
    }
    
    // 创建涟漪
    const createRipple = () => {
      if (!rippleElement.value) return
      
      const ripple = document.createElement('div')
      ripple.className = 'ripple-wave'
      rippleElement.value.appendChild(ripple)
      
      // 动画完成后移除元素
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple)
        }
      }, 2000)
    }
    
    // 处理点击事件
    const handleClick = () => {
      if (canEnter.value) {
        enterSite()
      } else if (videoElement.value && videoElement.value.paused) {
        // 如果视频暂停，点击播放
        videoElement.value.play()
      }
    }
    
    // 进入网站
    const enterSite = () => {
      appStore.setLoading(true)
      
      // 添加退场动画
      const content = document.querySelector('.content-wrapper')
      if (content) {
        content.style.transform = 'scale(1.1)'
        content.style.opacity = '0'
      }
      
      setTimeout(() => {
        appStore.setLoading(false)
        const nextRoute = locale.value === 'en-US' ? '/en/wish' : '/wish'
        router.push(nextRoute)
      }, 1000)
    }
    
    // 初始化粒子效果
    const initParticles = () => {
      if (!particlesContainer.value) return
      
      const container = particlesContainer.value
      const particleCount = 50
      
      for (let i = 0; i < particleCount; i++) {
        const particle = {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2
        }
        particles.push(particle)
        
        const particleElement = document.createElement('div')
        particleElement.className = 'particle'
        particleElement.style.cssText = `
          position: absolute;
          width: ${particle.size}px;
          height: ${particle.size}px;
          background: radial-gradient(circle, rgba(212, 175, 55, ${particle.opacity}) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        `
        container.appendChild(particleElement)
      }
      
      animateParticles()
    }
    
    // 粒子动画
    const animateParticles = () => {
      const container = particlesContainer.value
      if (!container) return
      
      const particleElements = container.children
      
      particles.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // 边界检测
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.speedY *= -1
        }
        
        // 更新DOM元素位置
        const element = particleElements[index]
        if (element) {
          element.style.left = particle.x + 'px'
          element.style.top = particle.y + 'px'
        }
      })
      
      animationFrame = requestAnimationFrame(animateParticles)
    }
    
    // 组件挂载
    onMounted(() => {
      // 初始化应用状态
      appStore.initializeFromStorage()
      
      // 初始化粒子效果
      setTimeout(() => {
        initParticles()
      }, 1000)
      
      // 如果没有视频文件，直接显示进入按钮
      setTimeout(() => {
        if (!videoLoaded.value) {
          videoLoaded.value = true
          canEnter.value = true
        }
      }, 3000)
    })
    
    // 组件卸载
    onUnmounted(() => {
      if (rippleTimer) {
        clearInterval(rippleTimer)
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    })
    
    return {
      videoElement,
      rippleElement,
      particlesContainer,
      videoLoaded,
      videoEnded,
      showRipple,
      canEnter,
      videoSrc,
      onVideoLoaded,
      onVideoEnded,
      startRipple,
      stopRipple,
      handleClick,
      enterSite
    }
  }
}
</script>

<style lang="scss" scoped>
.initial-page {
  background: linear-gradient(135deg, 
    #d4af37 0%, 
    #f4d03f 25%, 
    #d4af37 50%, 
    #b8860b 75%, 
    #d4af37 100%
  );
  overflow: hidden;
  position: relative;
}

.video-container,
.content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loading-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  
  .loading-spinner {
    margin-bottom: 1rem;
  }
}

.video-section {
  position: relative;
  max-width: 80%;
  max-height: 60%;
  margin-bottom: 2rem;
}

.intro-video {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
}

.ripple-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: var(--border-radius-xl);
  transition: opacity var(--transition-normal);
  
  &.show-ripple {
    background: rgba(255, 255, 255, 0.1);
  }
}

.ripple-effect {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: var(--border-radius-xl);
}

.ripple-wave {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: rippleAnimation 2s ease-out infinite;
}

@keyframes rippleAnimation {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(20);
    opacity: 0;
  }
}

.title-section {
  text-align: center;
  color: white;
  max-width: 600px;
  padding: 0 2rem;
}

.main-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease-out;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease-out 0.2s both;
}

.description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.enter-btn {
  opacity: 0;
  transform: translateY(20px);
  transition: all var(--transition-normal);
  
  &.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
}

.particles-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .video-section {
    max-width: 95%;
    max-height: 50%;
    margin-bottom: 1.5rem;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .description {
    font-size: 1rem;
  }
  
  .title-section {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.75rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .description {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
}
</style> 