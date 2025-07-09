<template>
  <div class="contact-page">
    <!-- 悬浮导航栏组件 -->
    <FloatingSidebar activeNav="contact" />
    
    <div class="container">
      <h1>联系我们</h1>
      
      <div class="contact-container">
        <!-- 联系方式 -->
        <div class="contact-methods">
          <h2>联系方式</h2>
          <div class="methods-grid">
            <div class="method-item">
              <div class="method-icon">📧</div>
              <div class="method-info">
                <h3>邮箱</h3>
                <p>support@fortunetemple.com</p>
                <small>工作日24小时内回复</small>
              </div>
            </div>

            <div class="method-item">
              <div class="method-icon">💬</div>
              <div class="method-info">
                <h3>在线客服</h3>
                <p>微信: fortunetemple</p>
                <small>工作时间: 9:00-18:00</small>
              </div>
            </div>

            <div class="method-item">
              <div class="method-icon">📱</div>
              <div class="method-info">
                <h3>客服热线</h3>
                <p>400-888-8888</p>
                <small>7×24小时服务</small>
              </div>
            </div>
          </div>
        </div>

        <!-- 意见反馈 -->
        <div class="feedback-section">
          <h2>意见反馈</h2>
          <form @submit.prevent="submitFeedback" class="feedback-form">
            <div class="form-group">
              <label>反馈类型</label>
              <select v-model="feedback.type" required>
                <option value="">请选择反馈类型</option>
                <option value="bug">问题反馈</option>
                <option value="suggestion">功能建议</option>
                <option value="compliment">表扬建议</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div class="form-group">
              <label>联系邮箱</label>
              <input 
                type="email" 
                v-model="feedback.email" 
                placeholder="请输入您的邮箱"
                required
              />
            </div>

            <div class="form-group">
              <label>反馈内容</label>
              <textarea 
                v-model="feedback.content" 
                rows="6" 
                placeholder="请详细描述您的反馈内容"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="submitting"
              class="ink-button"
            >
              {{ submitting ? '提交中...' : '提交反馈' }}
            </button>
          </form>

          <div v-if="feedbackResult" class="feedback-result">
            {{ feedbackResult }}
          </div>
        </div>

        <!-- FAQ常见问题 -->
        <div class="faq-section">
          <h2>常见问题</h2>
          <div class="faq-list">
            <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
              <div 
                @click="toggleFaq(index)"
                class="faq-question"
                :class="{ active: activeFaq === index }"
              >
                <span>{{ faq.question }}</span>
                <span class="toggle-icon">{{ activeFaq === index ? '−' : '+' }}</span>
              </div>
              <div v-show="activeFaq === index" class="faq-answer">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>

        <!-- 社交媒体 -->
        <div class="social-section">
          <h2>关注我们</h2>
          <div class="social-links">
            <a href="#" class="social-link twitter">
              <div class="social-icon">🐦</div>
              <div class="social-info">
                <h3>Twitter</h3>
                <p>@FortuneTemple</p>
              </div>
            </a>

            <a href="#" class="social-link wechat">
              <div class="social-icon">💬</div>
              <div class="social-info">
                <h3>微信公众号</h3>
                <p>财神殿祈福平台</p>
              </div>
            </a>

            <a href="#" class="social-link telegram">
              <div class="social-icon">✈️</div>
              <div class="social-info">
                <h3>Telegram</h3>
                <p>@FortuneTempleOfficial</p>
              </div>
            </a>

            <a href="#" class="social-link discord">
              <div class="social-icon">🎮</div>
              <div class="social-info">
                <h3>Discord</h3>
                <p>Fortune Temple Community</p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import FloatingSidebar from '@/components/FloatingSidebar.vue'

export default {
  name: 'ContactPage',
  components: {
    FloatingSidebar
  },
  setup() {
    const router = useRouter()
    
    return {
      router
    }
  },
  data() {
    return {
      feedback: {
        type: '',
        email: '',
        content: ''
      },
      submitting: false,
      feedbackResult: '',
      activeFaq: null,
      faqs: [
        {
          question: '如何连接钱包？',
          answer: '在许愿页面右侧点击"连接钱包"，选择OKX钱包并按照提示完成连接。确保您已安装OKX钱包插件。'
        },
        {
          question: '支付失败怎么办？',
          answer: '请检查钱包余额是否充足，网络连接是否正常。如果问题持续存在，请联系客服获得帮助。'
        },
        {
          question: '功德分如何获得？',
          answer: '您可以通过上香祈福、分享福报、每日签到、完成成就等方式获得功德分。'
        },
        {
          question: '如何提升等级？',
          answer: '通过积累功德分可以提升等级。不同等级有不同的功德分要求，等级越高享受的特权越多。'
        },
        {
          question: '算命结果准确吗？',
          answer: '我们使用传统的小六壬算法结合AI技术生成算命结果，仅供娱乐参考，请理性对待。'
        },
        {
          question: '可以退款吗？',
          answer: '由于虚拟商品的特殊性，一般情况下不支持退款。如有特殊情况，请联系客服处理。'
        }
      ]
    }
  },
  methods: {
    async submitFeedback() {
      if (!this.feedback.type || !this.feedback.email || !this.feedback.content) {
        this.feedbackResult = '请填写完整的反馈信息'
        return
      }

      this.submitting = true
      this.feedbackResult = ''

      try {
        // 模拟提交反馈
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 这里应该发送到后端API
        console.log('提交反馈:', this.feedback)
        
        this.feedbackResult = '反馈提交成功！我们会尽快处理您的反馈。'
        
        // 清空表单
        this.feedback = {
          type: '',
          email: '',
          content: ''
        }
        
      } catch (error) {
        this.feedbackResult = '提交失败，请重试'
        console.error('反馈提交失败:', error)
      } finally {
        this.submitting = false
      }
    },
    
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index
    },
    
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: #F9F4E2;
  padding: 2rem;
  font-family: 'KaiTi', 'STKaiti', serif;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.contact-container {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.contact-methods,
.feedback-section,
.faq-section,
.social-section {
  margin-bottom: 3rem;
}

.contact-methods h2,
.feedback-section h2,
.faq-section h2,
.social-section h2 {
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.method-item {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.method-item:hover {
  transform: translateY(-2px);
}

.method-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
}

.method-info h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.method-info p {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.method-info small {
  color: #666;
  font-size: 0.9rem;
}

.feedback-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group select,
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  font-family: inherit;
}

.form-group select:focus,
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
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

.feedback-result {
  margin-top: 1rem;
  padding: 1rem;
  background: #d4edda;
  color: #155724;
  border-radius: 8px;
  text-align: center;
}

.faq-list {
  max-width: 700px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 0.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 600;
  color: #333;
}

.faq-question:hover {
  background: #e9ecef;
}

.faq-question.active {
  background: #667eea;
  color: white;
}

.toggle-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.faq-answer {
  padding: 1rem 1.5rem;
  background: white;
  color: #666;
  line-height: 1.6;
  border-top: 1px solid #e9ecef;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.social-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.social-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.social-info h3 {
  color: #333;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.social-info p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .methods-grid,
  .social-links {
    grid-template-columns: 1fr;
  }

  .method-item,
  .social-link {
    flex-direction: column;
    text-align: center;
  }

  .method-icon,
  .social-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style> 