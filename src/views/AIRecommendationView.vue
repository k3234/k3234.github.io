<template>
  <div class="ai-recommendation">
    <h2>AI个性化学习推荐</h2>
    
    <div class="recommendation-header">
      <div class="user-stats">
        <div class="stat-item">
          <span class="stat-value">{{ userStats.completedLessons }}</span>
          <span class="stat-label">已完成课程</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ userStats.errorRate.toFixed(1) }}%</span>
          <span class="stat-label">错误率</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ userStats.masteryLevel.toFixed(1) }}%</span>
          <span class="stat-label">平均掌握程度</span>
        </div>
      </div>
      <button class="refresh-btn" @click="refreshRecommendations">
        刷新推荐
      </button>
    </div>

    <div class="error-patterns">
      <h3>易错概念分析</h3>
      <div class="error-list">
        <div class="error-item" v-for="pattern in errorPatterns" :key="pattern.knowledgePointId">
          <div class="error-info">
            <h4>{{ pattern.knowledgePointTitle }}</h4>
            <span class="error-count">错误次数: {{ pattern.errorCount }}</span>
          </div>
          <div class="error-action">
            <button class="review-btn" @click="reviewKnowledgePoint(pattern.knowledgePointId)">
              复习
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="recommendations">
      <h3>个性化学习推荐</h3>
      <div class="recommendation-list">
        <div class="recommendation-item" v-for="(recommendation, index) in recommendations" :key="recommendation.id">
          <div class="recommendation-rank">{{ index + 1 }}</div>
          <div class="recommendation-content">
            <h4>{{ recommendation.title }}</h4>
            <p class="recommendation-reason">{{ recommendation.recommendationReason }}</p>
            <div class="recommendation-meta">
              <span class="priority-tag" :class="recommendation.priority">{{ getPriorityLabel(recommendation.priority) }}</span>
            </div>
          </div>
          <div class="recommendation-action">
            <button class="start-btn" @click="startLearning(recommendation.id, recommendation.type)">
              开始学习
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="knowledge-map">
      <h3>知识掌握地图</h3>
      <div class="map-container">
        <div class="knowledge-item" v-for="kp in knowledgePoints" :key="kp.id">
          <div class="knowledge-dot" :class="getMasteryLevelClass(kp.masteryLevel)"></div>
          <span class="knowledge-title">{{ kp.title }}</span>
          <div class="knowledge-mastery">
            <div class="mastery-bar">
              <div class="mastery-fill" :style="{ width: kp.masteryLevel + '%' }"></div>
            </div>
            <span class="mastery-percentage">{{ kp.masteryLevel.toFixed(0) }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { aiKnowledgeManager } from '../services/aiKnowledgeManagement'

const userId = 'user1'

const errorPatterns = ref([])
const recommendations = ref([])
const knowledgePoints = ref([])
const userStats = ref({
  completedLessons: 0,
  errorRate: 0,
  masteryLevel: 0
})

const getPriorityLabel = (priority) => {
  const labels = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级'
  }
  return labels[priority] || priority
}

const getMasteryLevelClass = (level) => {
  if (level >= 80) return 'mastery-high'
  if (level >= 60) return 'mastery-medium'
  if (level >= 40) return 'mastery-low'
  return 'mastery-none'
}

const refreshRecommendations = () => {
  loadData()
}

const reviewKnowledgePoint = (knowledgePointId) => {
  // 跳转到知识点详情页面
  console.log('复习知识点:', knowledgePointId)
}

const startLearning = (contentId, contentType) => {
  // 开始学习内容
  console.log('开始学习:', contentType, contentId)
}

const loadData = () => {
  // 加载用户错误模式
  errorPatterns.value = aiKnowledgeManager.analyzeErrorPatterns(userId)
  
  // 加载个性化推荐
  recommendations.value = aiKnowledgeManager.generatePersonalizedRecommendations(userId)
  
  // 加载知识点掌握情况
  const userProfile = aiKnowledgeManager.getUserProfile(userId)
  if (userProfile) {
    knowledgePoints.value = Array.from(aiKnowledgeManager.knowledgePoints.values()).map(kp => {
      return {
        ...kp,
        masteryLevel: userProfile.masteryLevels.get(kp.id) || 0
      }
    })
    
    // 计算用户统计数据
    const totalAttempts = userProfile.learningHistory.filter(h => h.contentType === 'question').length
    const incorrectAttempts = userProfile.learningHistory.filter(h => h.contentType === 'question' && h.result === 'incorrect').length
    const totalMastery = Array.from(userProfile.masteryLevels.values()).reduce((sum, level) => sum + level, 0)
    const masteryCount = userProfile.masteryLevels.size
    
    userStats.value = {
      completedLessons: userProfile.learningHistory.filter(h => h.action === 'answer' && h.result === 'correct').length,
      errorRate: totalAttempts > 0 ? (incorrectAttempts / totalAttempts) * 100 : 0,
      masteryLevel: masteryCount > 0 ? totalMastery / masteryCount : 0
    }
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.ai-recommendation {
  max-width: 1200px;
  margin: 0 auto;
}

.ai-recommendation h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.recommendation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.user-stats {
  display: flex;
  gap: 2rem;
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

.refresh-btn {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  background-color: #0b7dda;
  transform: translateY(-2px);
}

.error-patterns {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.error-patterns h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.error-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  border-left: 4px solid #f44336;
}

.error-info h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.error-count {
  font-size: 0.9rem;
  color: #666;
}

.review-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.review-btn:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
}

.recommendations {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.recommendations h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.recommendation-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recommendation-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.recommendation-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.recommendation-rank {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #4CAF50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
  flex-shrink: 0;
}

.recommendation-content {
  flex: 1;
}

.recommendation-content h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.recommendation-reason {
  margin: 0 0 0.75rem 0;
  color: #666;
  font-size: 0.9rem;
}

.recommendation-meta {
  display: flex;
  gap: 0.5rem;
}

.priority-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.priority-tag.high {
  background-color: #ffebee;
  color: #c62828;
}

.priority-tag.medium {
  background-color: #fff3e0;
  color: #ef6c00;
}

.priority-tag.low {
  background-color: #e8f5e8;
  color: #2e7d32;
}

.recommendation-action {
  margin-left: 1rem;
}

.start-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.start-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.knowledge-map {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.knowledge-map h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.map-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.knowledge-item {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.knowledge-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  align-self: flex-start;
}

.mastery-high {
  background-color: #4CAF50;
}

.mastery-medium {
  background-color: #ff9800;
}

.mastery-low {
  background-color: #ffc107;
}

.mastery-none {
  background-color: #9e9e9e;
}

.knowledge-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
}

.knowledge-mastery {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mastery-bar {
  flex: 1;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.mastery-fill {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.mastery-percentage {
  font-size: 0.8rem;
  color: #666;
  min-width: 40px;
  text-align: right;
}

@media (max-width: 768px) {
  .recommendation-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .user-stats {
    width: 100%;
    justify-content: space-around;
  }
  
  .recommendation-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .recommendation-action {
    margin-left: 0;
    align-self: flex-start;
  }
}
</style>