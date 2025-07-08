<template>
  <div class="store-page">
    <div class="container">
      <h1>法物商城</h1>
      <div class="store-container">
        <div class="store-grid">
          <div v-for="item in storeItems" :key="item.id" class="store-item">
            <img :src="item.image" :alt="item.name" class="item-image" />
            <h3>{{ item.name }}</h3>
            <p class="item-price">{{ item.price }}</p>
            <button class="buy-btn">购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StorePage',
  data() {
    return {
      storeItems: [
        { id: 1, name: '平安符', price: '10 SOL', image: '/images/amulet.png' },
        { id: 2, name: '招财猫', price: '20 SOL', image: '/images/cat.png' },
        { id: 3, name: '佛珠', price: '15 SOL', image: '/images/beads.png' },
        { id: 4, name: '香炉', price: '30 SOL', image: '/images/incense.png' }
      ]
    }
  }
}
</script>

<style scoped>
.store-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
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

.store-container {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.store-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.store-item {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.store-item:hover {
  transform: translateY(-5px);
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.item-price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #667eea;
  margin: 1rem 0;
}

.buy-btn {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}
</style> 