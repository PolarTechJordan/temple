<template>
  <div class="share-page">
    <div class="container">
      <h1>分享福报</h1>
      <div class="share-container">
        <h2>分享您的好运给朋友</h2>
        <div class="share-buttons">
          <button @click="shareToTwitter" class="share-btn twitter">
            分享到Twitter
          </button>
          <button @click="shareToWeChat" class="share-btn wechat">
            分享到微信
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SharePage',
  methods: {
    shareToTwitter() {
      console.log('分享到Twitter')
    },
    shareToWeChat() {
      console.log('分享到微信')
    }
  }
}
</script>

<style scoped>
.share-page {
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

.share-container {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  text-align: center;
}

.share-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.share-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.twitter {
  background: #1da1f2;
  color: white;
}

.wechat {
  background: #07c160;
  color: white;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
</style> 