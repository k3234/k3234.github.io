<template>
  <div class="progress">
    <h2>学习进度</h2>
    
    <div class="overall-progress">
      <h3>总体进度</h3>
      <div class="progress-card">
        <div class="progress-circle">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e0e0e0" stroke-width="10" />
            <circle 
              cx="60" cy="60" r="50" fill="none" 
              stroke="#4CAF50" 
              stroke-width="10" 
              stroke-linecap="round" 
              :stroke-dasharray="circumference" 
              :stroke-dashoffset="dashOffset" 
              transform="rotate(-90 60 60)" 
            />
            <text x="60" y="60" text-anchor="middle" dominant-baseline="middle" class="progress-text">{{ overallProgress }}%</text>
          </svg>
        </div>
        <div class="progress-stats">
          <div class="stat-item">
            <span class="stat-value">{{ totalPoints }}</span>
            <span class="stat-label">学习点数</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ completedLessons }}</span>
            <span class="stat-label">已完成课程</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ totalLessons }}</span>
            <span class="stat-label">总课程数</span>
          </div>
        </div>
      </div>
    </div>

    <div class="subject-progress">
      <h3>学科进度</h3>
      <div class="subject-progress-list">
        <div class="subject-progress-item" v-for="subject in subjects" :key="subject.id">
          <div class="subject-info">
            <div class="subject-icon">{{ subject.icon }}</div>
            <span class="subject-name">{{ subject.name }}</span>
          </div>
          <div class="subject-progress-bar">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: subject.progress + '%' }"></div>
            </div>
            <span class="progress-percentage">{{ subject.progress }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="learning-history">
      <h3>学习历史</h3>
      <div class="history-card">
        <div class="history-header">
          <span>日期</span>
          <span>学习时长</span>
          <span>完成课程</span>
          <span>获得点数</span>
        </div>
        <div class="history-body">
          <div class="history-item" v-for="(item, index) in learningHistory" :key="index">
            <span>{{ item.date }}</span>
            <span>{{ item.duration }}</span>
            <span>{{ item.completedLessons }}</span>
            <span>{{ item.points }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="learning-goals">
      <h3>学习目标</h3>
      <div class="goals-card">
        <div class="goal-item">
          <span class="goal-label">每日学习</span>
          <span class="goal-status" :class="{ 'goal-completed': dailyGoal.completed }">
            {{ dailyGoal.progress }}/{{ dailyGoal.target }} 分钟
          </span>
          <div class="goal-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: (dailyGoal.progress / dailyGoal.target) * 100 + '%' }"></div>
            </div>
          </div>
        </div>
        <div class="goal-item">
          <span class="goal-label">每周学习</span>
          <span class="goal-status" :class="{ 'goal-completed': weeklyGoal.completed }">
            {{ weeklyGoal.progress }}/{{ weeklyGoal.target }} 分钟
          </span>
          <div class="goal-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: (weeklyGoal.progress / weeklyGoal.target) * 100 + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const subjects = ref([
  { id: 'math', name: '数学', icon: '📐', progress: 30 },
  { id: 'physics', name: '物理', icon: '⚡', progress: 15 },
  { id: 'chemistry', name: '化学', icon: '🧪', progress: 25 },
  { id: 'biology', name: '生物', icon: '🧬', progress: 20 }
])

const overallProgress = computed(() => {
  const totalProgress = subjects.value.reduce((sum, subject) => sum + subject.progress, 0)
  return Math.round(totalProgress / subjects.value.length)
})

const totalPoints = ref(3900)
const completedLessons = ref(12)
const totalLessons = ref(48)

const circumference = 2 * Math.PI * 50
const dashOffset = computed(() => {
  return circumference - (overallProgress.value / 100) * circumference
})

const learningHistory = ref([
  { date: '2026-04-11', duration: '45分钟', completedLessons: 2, points: 150 },
  { date: '2026-04-10', duration: '60分钟', completedLessons: 3, points: 200 },
  { date: '2026-04-09', duration: '30分钟', completedLessons: 1, points: 100 },
  { date: '2026-04-08', duration: '75分钟', completedLessons: 4, points: 250 },
  { date: '2026-04-07', duration: '45分钟', completedLessons: 2, points: 150 }
])

const dailyGoal = ref({ target: 60, progress: 45, completed: false })
const weeklyGoal = ref({ target: 300, progress: 255, completed: false })
</script>

<style scoped>
.progress {
  max-width: 1200px;
  margin: 0 auto;
}

.progress h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.overall-progress {
  margin-bottom: 3rem;
}

.overall-progress h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.progress-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 2rem;
}

.progress-circle {
  flex-shrink: 0;
}

.progress-text {
  font-size: 1.5rem;
  font-weight: bold;
  fill: #333;
}

.progress-stats {
  display: flex;
  gap: 3rem;
  flex: 1;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4CAF50;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #666;
}

.subject-progress {
  margin-bottom: 3rem;
}

.subject-progress h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.subject-progress-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.subject-progress-item {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subject-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.subject-icon {
  font-size: 1.5rem;
}

.subject-name {
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
}

.subject-progress-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 40%;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-percentage {
  font-size: 0.9rem;
  color: #666;
  font-weight: bold;
  min-width: 40px;
}

.learning-history {
  margin-bottom: 3rem;
}

.learning-history h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.history-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.history-header {
  background-color: #f0f0f0;
  padding: 1rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  font-weight: bold;
  color: #333;
}

.history-body {
  padding: 0 1.5rem;
}

.history-item {
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  color: #666;
}

.history-item:last-child {
  border-bottom: none;
}

.learning-goals {
  margin-bottom: 2rem;
}

.learning-goals h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.goals-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.goal-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.goal-label {
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
}

.goal-status {
  font-size: 0.9rem;
  color: #666;
}

.goal-completed {
  color: #4CAF50 !important;
  font-weight: bold;
}

.goal-progress {
  width: 100%;
}

@media (max-width: 768px) {
  .progress-card {
    flex-direction: column;
    text-align: center;
  }
  
  .progress-stats {
    justify-content: space-around;
    width: 100%;
  }
  
  .subject-progress-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .subject-progress-bar {
    width: 100%;
  }
  
  .history-header,
  .history-item {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
}
</style>