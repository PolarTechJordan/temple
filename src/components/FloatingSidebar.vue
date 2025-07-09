<template>
  <div>
    <!-- 悬浮导航栏（条件显示） -->
    <div 
      v-if="shouldShow" 
      class="floating-sidebar"
      :class="{ 'visible': navVisible }"
      @mouseenter="showNav"
      @mouseleave="hideNavDelayed"
    >
      <div class="sidebar-header">
        <h2>功德殿堂</h2>
      </div>
      
      <nav class="sidebar-nav">
        <div 
          v-for="item in navItems" 
          :key="item.id"
          @click="handleNavClick(item.id)"
          class="nav-item"
          :class="{ active: item.id === activeNav }"
        >
          <div class="nav-icon">{{ item.icon }}</div>
          <span class="nav-label">{{ item.label }}</span>
          <div v-if="item.badge" class="nav-badge">{{ item.badge }}</div>
        </div>
      </nav>
    </div>

    <!-- 左侧触发区域 -->
    <div 
      v-if="shouldShow"
      class="nav-trigger-zone"
      @mouseenter="showNav"
    ></div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'FloatingSidebar',
  props: {
    activeNav: {
      type: String,
      default: null
    }
  },
  setup() {
    const router = useRouter()
    
    // 语言感知的导航函数
    const navigateTo = (path) => {
      const currentPath = router.currentRoute.value.path
      const isEnglish = currentPath.startsWith('/en')
      const targetPath = isEnglish ? `/en${path}` : path
      router.push(targetPath)
    }

    return {
      router,
      navigateTo
    }
  },
  data() {
    return {
      navVisible: false,
      hideNavTimer: null,
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
      ]
    }
  },
  computed: {
    shouldShow() {
      return this.$route.query.showNav === 'true'
    }
  },
  methods: {
    // 导航栏相关方法
    showNav() {
      // 清除隐藏定时器
      if (this.hideNavTimer) {
        clearTimeout(this.hideNavTimer)
        this.hideNavTimer = null
      }
      this.navVisible = true
    },

    hideNavDelayed() {
      // 延迟隐藏，避免鼠标快速移动时闪烁
      this.hideNavTimer = setTimeout(() => {
        this.navVisible = false
      }, 300)
    },

    handleNavClick(navId) {
      // 跳转到对应页面，保持导航栏显示
      let targetPath = ''
      switch (navId) {
        case 'incense':
          targetPath = '/wish?showNav=true'
          break
        case 'fortune':
          targetPath = '/daily-fortune?showNav=true'
          break
        case 'store':
          targetPath = '/store?showNav=true'
          break
        case 'contact':
          targetPath = '/contact?showNav=true'
          break
        default:
          return
      }
      
      this.navigateTo(targetPath)
    }
  },
  beforeUnmount() {
    // 清理定时器
    if (this.hideNavTimer) {
      clearTimeout(this.hideNavTimer)
    }
  }
}
</script>

<style scoped>
/* 悬浮导航栏 */
.floating-sidebar {
  position: fixed;
  left: -280px;
  top: 0;
  width: 280px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease-in-out;
  z-index: 1000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.floating-sidebar.visible {
  left: 0;
}

.sidebar-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.sidebar-header h2 {
  color: #333;
  margin: 0;
  font-size: 1.5rem;
}

.sidebar-nav {
  flex: 1;
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

/* 左侧触发区域 */
.nav-trigger-zone {
  position: fixed;
  left: 0;
  top: 0;
  width: 20px;
  height: 100vh;
  z-index: 999;
  background: transparent;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .floating-sidebar {
    width: 260px;
    left: -260px;
    padding: 1.5rem;
  }
  
  .nav-trigger-zone {
    width: 30px;
  }
  
  .nav-item {
    padding: 0.8rem;
  }
  
  .nav-icon {
    font-size: 1.3rem;
    margin-right: 0.8rem;
  }
  
  .nav-label {
    font-size: 0.9rem;
  }
}
</style> 