<template>
  <PageLayout title="AI学习分析" description="基于人工智能的学习数据分析和洞察">
    <div class="ai-learning-analysis">
      <div class="analysis-header">
        <h2>AI学习分析</h2>
        <p>通过人工智能分析您的学习数据，提供个性化的学习洞察和建议</p>
      </div>

      <!-- 学习概览 -->
      <div class="overview-section">
        <h3>学习概览</h3>
        <BaseGrid cols="auto" gap="lg">
          <BaseCard variant="default" elevated class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-content">
              <h4>总学习时长</h4>
              <p class="stat-value">{{ totalLearningTime }} 小时</p>
            </div>
          </BaseCard>
          <BaseCard variant="default" elevated class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
              <h4>完成题目数</h4>
              <p class="stat-value">{{ completedQuestions }}</p>
            </div>
          </BaseCard>
          <BaseCard variant="default" elevated class="stat-card">
            <div class="stat-icon">📈</div>
            <div class="stat-content">
              <h4>正确率</h4>
              <p class="stat-value">{{ correctRate.toFixed(1) }}%</p>
            </div>
          </BaseCard>
          <BaseCard variant="default" elevated class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-content">
              <h4>掌握知识点数</h4>
              <p class="stat-value">{{ masteredKnowledgePoints }}</p>
            </div>
          </BaseCard>
        </BaseGrid>
      </div>

      <!-- 学习趋势分析 -->
      <div class="trend-section">
        <h3>学习趋势分析</h3>
        <BaseCard variant="default" elevated>
          <div class="chart-container">
            <div class="chart-placeholder">
              <div class="chart-bar" v-for="(day, index) in learningTrend" :key="index" :style="{ height: day.hours * 10 + '%' }"></div>
            </div>
            <div class="chart-labels">
              <span v-for="(day, index) in learningTrend" :key="index">{{ day.date }}</span>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- 学科表现分析 -->
      <div class="subject-section">
        <h3>学科表现分析</h3>
        <BaseGrid cols="auto" gap="lg">
          <BaseCard variant="default" elevated v-for="subject in subjectPerformance" :key="subject.name" class="subject-card">
            <div class="subject-header">
              <div class="subject-icon">{{ subject.icon }}</div>
              <h4>{{ subject.name }}</h4>
            </div>
            <div class="subject-stats">
              <div class="stat-row">
                <span class="stat-label">正确率</span>
                <span class="stat-value">{{ subject.correctRate.toFixed(1) }}%</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">掌握程度</span>
                <span class="stat-value">{{ subject.masteryLevel.toFixed(1) }}%</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">学习时长</span>
                <span class="stat-value">{{ subject.learningTime }} 小时</span>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: subject.masteryLevel + '%' }"></div>
              </div>
              <span class="progress-text">{{ subject.masteryLevel.toFixed(0) }}% 掌握</span>
            </div>
          </BaseCard>
        </BaseGrid>
      </div>

      <!-- 知识点掌握分析 -->
      <div class="knowledge-section">
        <h3>知识点掌握分析</h3>
        <BaseCard variant="default" elevated>
          <div class="knowledge-table">
            <table>
              <thead>
                <tr>
                  <th>知识点</th>
                  <th>学科</th>
                  <th>掌握程度</th>
                  <th>错误率</th>
                  <th>建议</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="knowledgePoint in knowledgePoints" :key="knowledgePoint.id">
                  <td>{{ knowledgePoint.title }}</td>
                  <td>{{ knowledgePoint.subject }}</td>
                  <td>
                    <div class="mastery-indicator" :class="getMasteryLevelClass(knowledgePoint.masteryLevel)">
                      {{ knowledgePoint.masteryLevel.toFixed(0) }}%
                    </div>
                  </td>
                  <td>
                    <div class="error-indicator" :class="getErrorLevelClass(knowledgePoint.errorRate)">
                      {{ (knowledgePoint.errorRate * 100).toFixed(0) }}%
                    </div>
                  </td>
                  <td>
                    <button class="suggestion-btn" @click="showSuggestion(knowledgePoint.id)">
                      查看建议
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </div>

      <!-- 学习建议 -->
      <div class="suggestion-section">
        <h3>AI学习建议</h3>
        <BaseCard variant="default" elevated>
          <div class="suggestion-list">
            <div class="suggestion-item" v-for="(suggestion, index) in learningSuggestions" :key="index">
              <div class="suggestion-icon">{{ suggestion.icon }}</div>
              <div class="suggestion-content">
                <h4>{{ suggestion.title }}</h4>
                <p>{{ suggestion.description }}</p>
                <button class="action-btn" @click="applySuggestion(index)">
                  {{ suggestion.action }}
                </button>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- 学习计划 -->
      <div class="plan-section">
        <h3>个性化学习计划</h3>
        <BaseCard variant="default" elevated>
          <div class="plan-content">
            <div class="plan-header">
              <h4>本周学习计划</h4>
              <button class="generate-btn" @click="generatePlan">
                生成新计划
              </button>
            </div>
            <div class="plan-items">
              <div class="plan-item" v-for="(item, index) in weeklyPlan" :key="index">
                <div class="plan-day">{{ item.day }}</div>
                <div class="plan-tasks">
                  <div class="task" v-for="(task, taskIndex) in item.tasks" :key="taskIndex">
                    <div class="task-checkbox">
                      <input type="checkbox" :id="`task-${index}-${taskIndex}`" v-model="task.completed">
                      <label :for="`task-${index}-${taskIndex}`"></label>
                    </div>
                    <div class="task-content">
                      <h5>{{ task.title }}</h5>
                      <p>{{ task.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import PageLayout from '../components/PageLayout.vue';
import BaseCard from '../components/BaseCard.vue';
import BaseGrid from '../components/BaseGrid.vue';
import { aiKnowledgeManager } from '../services/aiKnowledgeManagement';

const userId = 'user1';

// 学习概览数据
const totalLearningTime = ref(0);
const completedQuestions = ref(0);
const correctRate = ref(0);
const masteredKnowledgePoints = ref(0);

// 学习趋势数据
const learningTrend = ref([]);

// 学科表现数据
const subjectPerformance = ref([]);

// 知识点掌握数据
const knowledgePoints = ref([]);

// 学习建议
const learningSuggestions = ref([]);

// 周学习计划
const weeklyPlan = ref([]);

// 获取掌握程度的样式类
const getMasteryLevelClass = (level) => {
  if (level >= 80) return 'mastery-high';
  if (level >= 60) return 'mastery-medium';
  if (level >= 40) return 'mastery-low';
  return 'mastery-none';
};

// 获取错误率的样式类
const getErrorLevelClass = (errorRate) => {
  if (errorRate >= 0.6) return 'error-high';
  if (errorRate >= 0.4) return 'error-medium';
  if (errorRate >= 0.2) return 'error-low';
  return 'error-none';
};

// 显示知识点建议
const showSuggestion = (knowledgePointId) => {
  console.log('查看知识点建议:', knowledgePointId);
  // 这里可以添加显示建议的逻辑
};

// 应用学习建议
const applySuggestion = (index) => {
  console.log('应用学习建议:', index);
  // 这里可以添加应用建议的逻辑
};

// 生成学习计划
const generatePlan = () => {
  console.log('生成新的学习计划');
  // 这里可以添加生成学习计划的逻辑
};

// 加载知识点数据
const loadKnowledgePoints = () => {
  // 从AI知识管理系统获取知识点数据
  const knowledgePointsData = Array.from(aiKnowledgeManager.knowledgePoints.values());
  const userProfile = aiKnowledgeManager.getUserProfile(userId);
  
  if (userProfile) {
    knowledgePoints.value = knowledgePointsData.map(kp => {
      return {
        ...kp,
        masteryLevel: userProfile.masteryLevels.get(kp.id) || 0,
        errorRate: kp.errorRate || 0
      };
    });
  } else {
    knowledgePoints.value = knowledgePointsData.map(kp => {
      return {
        ...kp,
        masteryLevel: 0,
        errorRate: 0
      };
    });
  }
};

onMounted(() => {
  // 初始化数据
  loadKnowledgePoints();
});
</script>

<style scoped>
.ai-learning-analysis {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
  margin-top: var(--spacing-xl);
}

.analysis-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.analysis-header h2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.analysis-header p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-xl);
  color: var(--text-primary);
}

/* 统计卡片样式 */
.stat-card {
  text-align: center;
  padding: var(--spacing-xl);
  transition: all var(--transition-normal);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
}

.stat-content h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-sm);
  color: var(--text-secondary);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  margin: 0;
}

/* 趋势图表样式 */
.chart-container {
  position: relative;
  height: 300px;
  padding: var(--spacing-lg);
}

.chart-placeholder {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 80%;
  margin-bottom: var(--spacing-md);
}

.chart-bar {
  width: 40px;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
  transition: all var(--transition-normal);
}

.chart-bar:hover {
  background-color: var(--primary-dark);
  transform: scaleY(1.05);
}

.chart-labels {
  display: flex;
  justify-content: space-around;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* 学科卡片样式 */
.subject-card {
  padding: var(--spacing-lg);
  transition: all var(--transition-normal);
}

.subject-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.subject-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.subject-icon {
  font-size: var(--font-size-2xl);
}

.subject-header h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.subject-stats {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-row .stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.stat-row .stat-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.subject-progress {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: var(--background-light);
  border-radius: var(--border-radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-full);
  transition: width var(--transition-normal);
}

.progress-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  min-width: 80px;
  text-align: right;
}

/* 知识点表格样式 */
.knowledge-table {
  overflow-x: auto;
}

.knowledge-table table {
  width: 100%;
  border-collapse: collapse;
}

.knowledge-table th,
.knowledge-table td {
  padding: var(--spacing-md);
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.knowledge-table th {
  background-color: var(--background-light);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.knowledge-table tr:hover {
  background-color: var(--background-light);
}

.mastery-indicator,
.error-indicator {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.mastery-high {
  background-color: var(--success-light);
  color: var(--success-color);
}

.mastery-medium {
  background-color: var(--warning-light);
  color: var(--warning-color);
}

.mastery-low {
  background-color: var(--error-light);
  color: var(--error-color);
}

.mastery-none {
  background-color: var(--background-light);
  color: var(--text-secondary);
}

.error-high {
  background-color: var(--error-light);
  color: var(--error-color);
}

.error-medium {
  background-color: var(--warning-light);
  color: var(--warning-color);
}

.error-low {
  background-color: var(--success-light);
  color: var(--success-color);
}

.error-none {
  background-color: var(--background-light);
  color: var(--text-secondary);
}

.suggestion-btn {
  background-color: var(--primary-light);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.suggestion-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

/* 学习建议样式 */
.suggestion-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.suggestion-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: var(--background-light);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-normal);
}

.suggestion-item:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-md);
}

.suggestion-icon {
  font-size: var(--font-size-2xl);
  flex-shrink: 0;
  margin-top: 2px;
}

.suggestion-content {
  flex: 1;
}

.suggestion-content h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.suggestion-content p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
}

.action-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

/* 学习计划样式 */
.plan-content {
  padding: var(--spacing-lg);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.plan-header h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.generate-btn {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.generate-btn:hover {
  background-color: var(--secondary-dark);
  transform: translateY(-2px);
}

.plan-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.plan-item {
  display: flex;
  gap: var(--spacing-lg);
}

.plan-day {
  width: 80px;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  flex-shrink: 0;
}

.plan-tasks {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.task {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--background-light);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
}

.task:hover {
  background-color: var(--background-lighter);
}

.task-checkbox {
  position: relative;
  margin-top: 2px;
}

.task-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.task-checkbox label {
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  user-select: none;
}

.task-checkbox label:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: white;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
}

.task-checkbox input[type="checkbox"]:checked + label:before {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.task-checkbox label:after {
  content: "";
  position: absolute;
  display: none;
  left: 7px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.task-checkbox input[type="checkbox"]:checked + label:after {
  display: block;
}

.task-content h5 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.task-content p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .analysis-header h2 {
    font-size: var(--font-size-2xl);
  }
  
  .analysis-header p {
    font-size: var(--font-size-base);
  }
  
  .stat-card {
    padding: var(--spacing-lg);
  }
  
  .stat-value {
    font-size: var(--font-size-xl);
  }
  
  .chart-container {
    height: 250px;
  }
  
  .chart-bar {
    width: 30px;
  }
  
  .knowledge-table {
    font-size: var(--font-size-sm);
  }
  
  .knowledge-table th,
  .knowledge-table td {
    padding: var(--spacing-sm);
  }
  
  .plan-item {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .plan-day {
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: var(--spacing-sm);
  }
}

@media (max-width: 640px) {
  .ai-learning-analysis {
    gap: var(--spacing-xl);
  }
  
  .stat-card {
    padding: var(--spacing-md);
  }
  
  .stat-icon {
    font-size: var(--font-size-2xl);
  }
  
  .subject-card {
    padding: var(--spacing-md);
  }
  
  .suggestion-item {
    flex-direction: column;
    padding: var(--spacing-md);
  }
  
  .suggestion-icon {
    align-self: center;
  }
  
  .plan-content {
    padding: var(--spacing-md);
  }
  
  .plan-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
}
</style>