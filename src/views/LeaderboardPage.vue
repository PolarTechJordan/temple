<template>
  <div class="leaderboard-page">
    <div class="container">
      <h1>功德排行榜</h1>
      <div class="leaderboard-container">
        <div class="leaderboard-table">
          <div class="table-header">
            <div class="rank">排名</div>
            <div class="user">用户</div>
            <div class="score">功德分</div>
            <div class="level">等级</div>
          </div>
          <div v-for="(user, index) in leaderboard" :key="user.id" class="table-row">
            <div class="rank">{{ index + 1 }}</div>
            <div class="user">{{ user.name }}</div>
            <div class="score">{{ user.score }}</div>
            <div class="level">{{ user.level }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardPage',
  data() {
    return {
      leaderboard: [
        { id: 1, name: '善缘居士', score: 2500, level: 'Level 5' },
        { id: 2, name: '慈悲心', score: 2000, level: 'Level 4' },
        { id: 3, name: '福德金刚', score: 1800, level: 'Level 4' },
        { id: 4, name: '智慧如海', score: 1500, level: 'Level 3' },
        { id: 5, name: '普度众生', score: 1200, level: 'Level 3' }
      ]
    }
  }
}
</script>

<style scoped>
.leaderboard-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.leaderboard-container {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.leaderboard-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #333;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.table-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.rank {
  text-align: center;
  font-weight: 600;
  color: #667eea;
}

.user {
  font-weight: 600;
}

.score {
  text-align: center;
  color: #28a745;
  font-weight: 600;
}

.level {
  text-align: center;
  color: #dc3545;
  font-weight: 600;
}
</style> 