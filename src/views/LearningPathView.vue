<template>
  <div class="learning-path">
    <h2>学习路径</h2>
    <p class="description">基于您的评估结果，为您定制的个性化学习路径</p>

    <!-- 学习路径概览 -->
    <div class="path-overview">
      <div class="overview-card">
        <h3>学习概览</h3>
        <div class="overview-stats">
          <div class="stat-item">
            <span class="stat-value">{{ currentLevel }}</span>
            <span class="stat-label">当前关卡</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ completedLevels }}</span>
            <span class="stat-label">已完成关卡</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ totalLevels }}</span>
            <span class="stat-label">总关卡数</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ masteryRate.toFixed(1) }}%</span>
            <span class="stat-label">掌握程度</span>
          </div>
        </div>
      </div>

      <!-- 知识掌握地图 -->
      <div class="knowledge-map">
        <h3>知识掌握地图</h3>
        <div class="map-container">
          <div class="knowledge-item" v-for="(knowledge, index) in knowledgeMastery" :key="index">
            <div class="knowledge-dot" :class="getMasteryLevelClass(knowledge.mastery)"></div>
            <span class="knowledge-title">{{ knowledge.title }}</span>
            <div class="knowledge-mastery">
              <div class="mastery-bar">
                <div class="mastery-fill" :style="{ width: knowledge.mastery + '%' }"></div>
              </div>
              <span class="mastery-percentage">{{ knowledge.mastery.toFixed(0) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 关卡列表 -->
    <div class="levels-section">
      <h3>学习关卡</h3>
      <div class="levels-list">
        <div 
          class="level-card" 
          v-for="(level, index) in levels" 
          :key="index"
          :class="{
            'level-completed': level.status === 'completed',
            'level-current': level.status === 'current',
            'level-locked': level.status === 'locked'
          }"
        >
          <div class="level-header">
            <div class="level-info">
              <div class="level-number">{{ index + 1 }}</div>
              <h4>{{ level.title }}</h4>
              <p class="level-description">{{ level.description }}</p>
            </div>
            <div class="level-status">
              <span v-if="level.status === 'completed'" class="status-completed">✓ 已完成</span>
              <span v-else-if="level.status === 'current'" class="status-current">当前关卡</span>
              <span v-else class="status-locked">🔒 未解锁</span>
            </div>
          </div>
          <div class="level-content">
            <div class="level-knowledge">
              <h5>知识点</h5>
              <ul>
                <li v-for="(knowledge, kIndex) in level.knowledgePoints" :key="kIndex">
                  {{ knowledge }}
                </li>
              </ul>
            </div>
            <div class="level-difficulty">
              <h5>难度</h5>
              <div class="difficulty-bar">
                <div class="difficulty-fill" :style="{ width: level.difficulty * 20 + '%' }"></div>
              </div>
              <span class="difficulty-text">{{ getDifficultyText(level.difficulty) }}</span>
            </div>
          </div>
          <div class="level-actions">
            <button 
              class="start-btn" 
              @click="startLevel(level.id)"
              :disabled="level.status === 'locked'"
            >
              {{ level.status === 'current' ? '开始学习' : level.status === 'completed' ? '复习' : '未解锁' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐学习 -->
    <div class="recommendations-section">
      <h3>推荐学习</h3>
      <div class="recommendations-list">
        <div class="recommendation-card" v-for="(recommendation, index) in recommendations" :key="index">
          <div class="recommendation-content">
            <h4>{{ recommendation.title }}</h4>
            <p>{{ recommendation.description }}</p>
            <div class="recommendation-reason">
              <span class="reason-label">推荐理由:</span>
              <span class="reason-text">{{ recommendation.reason }}</span>
            </div>
          </div>
          <div class="recommendation-action">
            <button class="recommend-btn" @click="startRecommendation(recommendation.id)">
              开始学习
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentLevel = ref(1)
const completedLevels = ref(0)
const totalLevels = ref(10)
const masteryRate = ref(65.5)

const knowledgeMastery = ref([
  { title: '函数的基本性质', mastery: 80 },
  { title: '三角函数', mastery: 60 },
  { title: '立体几何', mastery: 45 },
  { title: '导数及其应用', mastery: 30 },
  { title: '解析几何', mastery: 25 }
])

const levels = ref([
  {
    id: 'level-1',
    title: '函数基础',
    description: '掌握函数的基本性质和图像',
    status: 'current',
    knowledgePoints: ['函数的定义', '函数的单调性', '函数的奇偶性', '函数的周期性'],
    difficulty: 2
  },
  {
    id: 'level-2',
    title: '三角函数入门',
    description: '学习三角函数的基本概念和图像',
    status: 'locked',
    knowledgePoints: ['三角函数的定义', '三角函数的图像', '三角函数的性质'],
    difficulty: 3
  },
  {
    id: 'level-3',
    title: '立体几何基础',
    description: '掌握空间几何体的性质和计算',
    status: 'locked',
    knowledgePoints: ['空间几何体', '空间点线面关系', '空间向量'],
    difficulty: 3
  },
  {
    id: 'level-4',
    title: '导数初步',
    description: '学习导数的基本概念和应用',
    status: 'locked',
    knowledgePoints: ['导数的定义', '导数的计算', '导数的应用'],
    difficulty: 4
  },
  {
    id: 'level-5',
    title: '解析几何基础',
    description: '掌握直线和圆的方程',
    status: 'locked',
    knowledgePoints: ['直线的方程', '圆的方程', '直线与圆的位置关系'],
    difficulty: 4
  }
])

const recommendations = ref([
  {
    id: 'rec-1',
    title: '函数单调性专项练习',
    description: '针对函数单调性的专项练习，帮助您巩固这一知识点',
    reason: '您在函数单调性方面的掌握程度较低，需要加强练习'
  },
  {
    id: 'rec-2',
    title: '三角函数图像变换',
    description: '学习三角函数图像的变换规律和应用',
    reason: '三角函数是高考重点内容，需要重点掌握'
  },
  {
    id: 'rec-3',
    title: '立体几何空间想象',
    description: '通过立体几何的练习，提高空间想象能力',
    reason: '立体几何是您的薄弱环节，需要加强训练'
  }
])

const getMasteryLevelClass = (mastery) => {
  if (mastery >= 80) return 'mastery-high'
  if (mastery >= 60) return 'mastery-medium'
  if (mastery >= 40) return 'mastery-low'
  return 'mastery-none'
}

const getDifficultyText = (difficulty) => {
  const difficultyTexts = ['', '非常简单', '简单', '中等', '困难', '非常困难']
  return difficultyTexts[difficulty] || '中等'
}

const startLevel = (levelId) => {
  // 开始学习关卡
  console.log('开始学习关卡:', levelId)
  // 这里可以跳转到关卡详情页面
  router.push(`/level/${levelId}`)
}

const startRecommendation = (recommendationId) => {
  // 开始推荐学习
  console.log('开始推荐学习:', recommendationId)
}

onMounted(() => {
  // 从本地存储获取评估结果
  const assessmentResult = localStorage.getItem('preAssessment')
  if (assessmentResult) {
    const result = JSON.parse(assessmentResult)
    // 根据评估结果初始化学习路径
    console.log('评估结果:', result)
    // 这里可以根据评估结果调整学习路径
    // 处理多学科的情况
    if (result.subjects && Array.isArray(result.subjects)) {
      console.log('选中学科:', result.subjects)
      // 根据选中学科加载相应的学习内容
    }
  }
})
</script>

<style scoped>
.learning-path {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeInUp var(--transition-slow) ease-out;
}

.learning-path h2 {
  text-align: center;
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  position: relative;
  padding-bottom: var(--spacing-sm);
}

.learning-path h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-full);
  animation: slideIn var(--transition-normal) ease-out;
}

.description {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-lg);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.path-overview {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.overview-card {
  background-color: var(--background-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
  border: 1px solid var(--border-color);
  animation: slideInLeft var(--transition-normal) ease-out 0.2s both;
}

.overview-card h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.overview-card h3::before {
  content: '📊';
  font-size: var(--font-size-xl);
  line-height: 1;
}

.overview-stats {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background-color: var(--background-light);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
}

.stat-item:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
}

.stat-value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  transition: all var(--transition-fast);
}

.stat-item:hover .stat-value {
  transform: scale(1.05);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
}

.knowledge-map {
  background-color: var(--background-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
  border: 1px solid var(--border-color);
  animation: slideInRight var(--transition-normal) ease-out 0.4s both;
}

.knowledge-map h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.knowledge-map h3::before {
  content: '🧠';
  font-size: var(--font-size-xl);
  line-height: 1;
}

.map-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.knowledge-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--background-light);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
}

.knowledge-item:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

.knowledge-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.knowledge-item:hover .knowledge-dot {
  transform: scale(1.2);
}

.mastery-high {
  background-color: var(--success-color);
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
}

.mastery-medium {
  background-color: var(--warning-color);
  box-shadow: 0 0 8px rgba(255, 152, 0, 0.5);
}

.mastery-low {
  background-color: var(--accent-color);
  box-shadow: 0 0 8px rgba(255, 193, 7, 0.5);
}

.mastery-none {
  background-color: var(--text-muted);
  box-shadow: 0 0 8px rgba(158, 158, 158, 0.5);
}

.knowledge-title {
  flex: 1;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.knowledge-mastery {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 200px;
}

.mastery-bar {
  flex: 1;
  height: 8px;
  background-color: var(--border-color);
  border-radius: var(--border-radius-full);
  overflow: hidden;
  position: relative;
}

.mastery-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: var(--border-radius-full);
  transition: width var(--transition-normal);
  position: relative;
}

.mastery-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shine var(--transition-slow) ease-in-out infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.mastery-percentage {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  min-width: 40px;
  text-align: right;
  font-weight: var(--font-weight-medium);
}

.levels-section {
  margin-bottom: var(--spacing-2xl);
  animation: slideInUp var(--transition-normal) ease-out 0.6s both;
}

.levels-section h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  position: relative;
  padding-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.levels-section h3::before {
  content: '🎮';
  font-size: var(--font-size-lg);
  line-height: 1;
}

.levels-section h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-full);
  animation: slideIn var(--transition-normal) ease-out;
}

.levels-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.level-card {
  background-color: var(--background-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  transition: all var(--transition-normal);
  border-left: 4px solid var(--border-color);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.level-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: var(--border-color);
  transition: all var(--transition-normal);
}

.level-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.level-completed {
  border-left-color: var(--success-color);
  background-color: rgba(76, 175, 80, 0.05);
}

.level-completed::before {
  background-color: var(--success-color);
}

.level-current {
  border-left-color: var(--secondary-color);
  background-color: rgba(33, 150, 243, 0.05);
}

.level-current::before {
  background-color: var(--secondary-color);
}

.level-locked {
  border-left-color: var(--text-muted);
  background-color: var(--background-light);
  opacity: 0.8;
}

.level-locked::before {
  background-color: var(--text-muted);
}

.level-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.level-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.level-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--border-color);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
}

.level-card:hover .level-number {
  transform: scale(1.1);
}

.level-completed .level-number {
  background-color: var(--success-color);
  color: white;
  box-shadow: 0 0 12px rgba(76, 175, 80, 0.5);
}

.level-current .level-number {
  background-color: var(--secondary-color);
  color: white;
  box-shadow: 0 0 12px rgba(33, 150, 243, 0.5);
}

.level-info h4 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.level-description {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

.level-status {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-full);
  background-color: var(--background-light);
}

.status-completed {
  color: var(--success-color);
  background-color: rgba(76, 175, 80, 0.1);
}

.status-current {
  color: var(--secondary-color);
  background-color: rgba(33, 150, 243, 0.1);
}

.status-locked {
  color: var(--text-muted);
  background-color: rgba(158, 158, 158, 0.1);
}

.level-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: var(--background-light);
  border-radius: var(--border-radius-md);
}

.level-knowledge h5,
.level-difficulty h5 {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.level-knowledge ul {
  margin: 0;
  padding-left: var(--spacing-lg);
}

.level-knowledge li {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
}

.difficulty-bar {
  width: 100%;
  height: 10px;
  background-color: var(--border-color);
  border-radius: var(--border-radius-full);
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.difficulty-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-color), var(--accent-dark));
  border-radius: var(--border-radius-full);
  transition: width var(--transition-normal);
  position: relative;
}

.difficulty-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shine var(--transition-slow) ease-in-out infinite;
}

.difficulty-text {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
}

.level-actions {
  display: flex;
  justify-content: flex-end;
}

.start-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.start-btn:hover:not(:disabled) {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.start-btn:disabled {
  background-color: var(--text-muted);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.recommendations-section {
  margin-bottom: var(--spacing-xl);
  animation: slideInUp var(--transition-normal) ease-out 0.8s both;
}

.recommendations-section h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  position: relative;
  padding-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.recommendations-section h3::before {
  content: '🤖';
  font-size: var(--font-size-lg);
  line-height: 1;
}

.recommendations-section h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-full);
  animation: slideIn var(--transition-normal) ease-out;
}

.recommendations-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.recommendation-card {
  background-color: var(--background-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all var(--transition-normal);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.recommendation-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: var(--secondary-color);
}

.recommendation-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.recommendation-content {
  flex: 1;
  margin-right: var(--spacing-lg);
}

.recommendation-content h4 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.recommendation-content p {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

.recommendation-reason {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  font-size: var(--font-size-xs);
  padding: var(--spacing-sm);
  background-color: rgba(33, 150, 243, 0.05);
  border-radius: var(--border-radius-sm);
  border-left: 3px solid var(--secondary-color);
}

.reason-label {
  font-weight: var(--font-weight-semibold);
  color: var(--secondary-color);
  flex-shrink: 0;
  white-space: nowrap;
}

.reason-text {
  color: var(--text-secondary);
  flex: 1;
  line-height: 1.4;
}

.recommendation-action {
  flex-shrink: 0;
}

.recommend-btn {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.recommend-btn:hover {
  background-color: var(--secondary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
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

@keyframes slideIn {
  from {
    width: 0;
  }
  to {
    width: 80px;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .path-overview {
    grid-template-columns: 1fr;
  }
  
  .level-content {
    grid-template-columns: 1fr;
  }
  
  .recommendation-card {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }
  
  .recommendation-action {
    align-self: flex-end;
  }
  
  .knowledge-mastery {
    width: 150px;
  }
  
  .overview-card,
  .knowledge-map,
  .level-card,
  .recommendation-card {
    padding: var(--spacing-md);
  }
}
</style>