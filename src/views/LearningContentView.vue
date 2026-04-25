<template>
  <div class="learning-content">
    <h2>学习内容</h2>
    
    <!-- 学科选择 -->
    <div class="subject-selector">
      <h3>选择学科</h3>
      <div class="subject-buttons">
        <button 
          v-for="subject in subjects" 
          :key="subject.value"
          :class="['subject-btn', { active: selectedSubject === subject.value }]"
          @click="selectSubject(subject.value)"
        >
          {{ subject.label }}
        </button>
      </div>
    </div>
    
    <!-- 内容类型选择 -->
    <div class="content-type-selector">
      <h3>内容类型</h3>
      <div class="content-type-buttons">
        <button 
          v-for="type in contentTypes" 
          :key="type.value"
          :class="['content-type-btn', { active: selectedContentType === type.value }]"
          @click="selectContentType(type.value)"
        >
          {{ type.label }}
        </button>
      </div>
    </div>
    
    <!-- 学习内容展示 -->
    <div class="content-display">
      <!-- 课程标准内容 -->
      <div v-if="selectedContentType === 'curriculum'" class="curriculum-content">
        <h3>课程标准内容</h3>
        <div class="grade-tabs">
          <button 
            v-for="grade in grades" 
            :key="grade.value"
            :class="['grade-tab', { active: selectedGrade === grade.value }]"
            @click="selectGrade(grade.value)"
          >
            {{ grade.label }}
          </button>
        </div>
        
        <div class="modules-container">
          <div 
            v-for="module in currentCurriculumModules" 
            :key="module.id"
            class="module-card"
          >
            <h4>{{ module.title }}</h4>
            <div class="module-meta">
              <span class="difficulty" :class="module.difficulty">
                {{ getDifficultyLabel(module.difficulty) }}
              </span>
            </div>
            <ul class="knowledge-points">
              <li v-for="(point, index) in module.knowledgePoints" :key="index">
                {{ point }}
              </li>
            </ul>
            <button class="learn-btn">开始学习</button>
          </div>
          
          <div v-if="currentCurriculumModules.length === 0" class="empty-state">
            <p>暂无课程内容</p>
          </div>
        </div>
      </div>
      
      <!-- 高考重难点 -->
      <div v-else-if="selectedContentType === 'gaokao'" class="gaokao-content">
        <h3>高考重难点</h3>
        <div class="key-points-container">
          <div 
            v-for="point in currentGaokaoKeyPoints" 
            :key="point.id"
            class="key-point-card"
          >
            <h4>{{ point.title }}</h4>
            <p class="point-description">{{ point.description }}</p>
            <div class="point-meta">
              <span class="difficulty" :class="point.difficulty">
                {{ getDifficultyLabel(point.difficulty) }}
              </span>
              <span class="importance" :class="point.importance">
                {{ getImportanceLabel(point.importance) }}
              </span>
            </div>
            <ul class="knowledge-points">
              <li v-for="(knowledge, index) in point.knowledgePoints" :key="index">
                {{ knowledge }}
              </li>
            </ul>
            <button class="learn-btn">开始学习</button>
          </div>
          
          <div v-if="currentGaokaoKeyPoints.length === 0" class="empty-state">
            <p>暂无高考重难点内容</p>
          </div>
        </div>
      </div>
      
      <!-- 最近学习的困难概念 -->
      <div v-else-if="selectedContentType === 'difficult'" class="difficult-content">
        <h3>最近学习的困难概念</h3>
        <div class="difficult-concepts-container">
          <div 
            v-for="concept in currentDifficultConcepts" 
            :key="concept.id"
            class="concept-card"
          >
            <h4>{{ concept.title }}</h4>
            <p class="concept-description">{{ concept.description }}</p>
            <div class="concept-meta">
              <span class="difficulty" :class="concept.difficulty">
                {{ getDifficultyLabel(concept.difficulty) }}
              </span>
            </div>
            <div class="related-knowledge">
              <h5>相关知识</h5>
              <ul>
                <li v-for="(knowledge, index) in concept.relatedKnowledge" :key="index">
                  {{ knowledge }}
                </li>
              </ul>
            </div>
            <button class="learn-btn">开始学习</button>
          </div>
          
          <div v-if="currentDifficultConcepts.length === 0" class="empty-state">
            <p>暂无困难概念内容</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurriculumContent, getGaokaoKeyPoints, getRecentDifficultConcepts } from '../services/contentOrganization';

// 学科列表
const subjects = [
  { label: '数学', value: 'math' },
  { label: '物理', value: 'physics' },
  { label: '化学', value: 'chemistry' },
  { label: '生物', value: 'biology' }
];

// 内容类型
const contentTypes = [
  { label: '课程标准', value: 'curriculum' },
  { label: '高考重难点', value: 'gaokao' },
  { label: '困难概念', value: 'difficult' }
];

// 年级列表
const grades = [
  { label: '高一', value: 'high-school-1' },
  { label: '高二', value: 'high-school-2' },
  { label: '高三', value: 'high-school-3' }
];

// 选中的学科
const selectedSubject = ref('math');
// 选中的内容类型
const selectedContentType = ref('curriculum');
// 选中的年级
const selectedGrade = ref('high-school-1');

// 选择学科
const selectSubject = (subject) => {
  selectedSubject.value = subject;
};

// 选择内容类型
const selectContentType = (type) => {
  selectedContentType.value = type;
};

// 选择年级
const selectGrade = (grade) => {
  selectedGrade.value = grade;
};

// 获取当前课程内容模块
const currentCurriculumModules = computed(() => {
  const curriculum = getCurriculumContent(selectedGrade.value, selectedSubject.value);
  return curriculum?.modules || [];
});

// 获取当前高考重难点
const currentGaokaoKeyPoints = computed(() => {
  return getGaokaoKeyPoints(selectedSubject.value) || [];
});

// 获取当前困难概念
const currentDifficultConcepts = computed(() => {
  return getRecentDifficultConcepts(selectedSubject.value) || [];
});

// 获取难度标签
const getDifficultyLabel = (difficulty) => {
  const labels = {
    'easy': '简单',
    'medium': '中等',
    'hard': '困难'
  };
  return labels[difficulty] || difficulty;
};

// 获取重要性标签
const getImportanceLabel = (importance) => {
  const labels = {
    'high': '重要',
    'medium': '一般',
    'low': '次要'
  };
  return labels[importance] || importance;
};

// 组件挂载时初始化
onMounted(() => {
  console.log('学习内容页面加载完成');
});
</script>

<style scoped>
.learning-content {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeInUp var(--transition-slow) ease-out;
}

.learning-content h2 {
  text-align: center;
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-xl);
  color: var(--text-primary);
  position: relative;
  padding-bottom: var(--spacing-sm);
}

.learning-content h2::after {
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

.learning-content h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
}

.learning-content h4 {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
}

.learning-content h5 {
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
  color: var(--text-secondary);
  font-weight: var(--font-weight-semibold);
}

/* 学科选择器 */
.subject-selector {
  margin-bottom: var(--spacing-xl);
  animation: slideInUp var(--transition-normal) ease-out;
}

.subject-buttons {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.subject-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--background-white);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.subject-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.subject-btn.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  box-shadow: var(--shadow-md);
}

/* 内容类型选择器 */
.content-type-selector {
  margin-bottom: var(--spacing-xl);
  animation: slideInUp var(--transition-normal) ease-out 0.1s;
}

.content-type-buttons {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.content-type-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--background-white);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.content-type-btn:hover {
  border-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.content-type-btn.active {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: white;
  box-shadow: var(--shadow-md);
}

/* 内容展示区域 */
.content-display {
  animation: slideInUp var(--transition-normal) ease-out 0.2s;
}

/* 年级标签 */
.grade-tabs {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

.grade-tab {
  padding: var(--spacing-xs) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-full);
  background-color: var(--background-white);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.grade-tab:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.grade-tab.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

/* 模块卡片 */
.modules-container,
.key-points-container,
.difficult-concepts-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.module-card,
.key-point-card,
.concept-card {
  background-color: var(--background-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
  animation: fadeInUp var(--transition-normal) ease-out;
}

.module-card:hover,
.key-point-card:hover,
.concept-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* 元数据 */
.module-meta,
.point-meta,
.concept-meta {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
}

.difficulty,
.importance {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.difficulty.easy {
  background-color: var(--success-light);
  color: var(--success-color);
}

.difficulty.medium {
  background-color: var(--warning-light);
  color: var(--warning-color);
}

.difficulty.hard {
  background-color: var(--error-light);
  color: var(--error-color);
}

.importance.high {
  background-color: var(--primary-light);
  color: var(--primary-color);
}

.importance.medium {
  background-color: var(--secondary-light);
  color: var(--secondary-color);
}

/* 知识点列表 */
.knowledge-points {
  margin-bottom: var(--spacing-md);
  padding-left: var(--spacing-lg);
}

.knowledge-points li {
  margin-bottom: var(--spacing-xs);
  color: var(--text-secondary);
  line-height: 1.4;
  position: relative;
}

.knowledge-points li::before {
  content: '•';
  color: var(--primary-color);
  font-weight: bold;
  position: absolute;
  left: -15px;
}

/* 描述文本 */
.point-description,
.concept-description {
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: var(--font-size-sm);
}

/* 相关知识 */
.related-knowledge {
  margin-bottom: var(--spacing-md);
}

.related-knowledge ul {
  padding-left: var(--spacing-lg);
}

.related-knowledge li {
  margin-bottom: var(--spacing-xs);
  color: var(--text-secondary);
  line-height: 1.4;
  font-size: var(--font-size-sm);
  position: relative;
}

.related-knowledge li::before {
  content: '→';
  color: var(--secondary-color);
  position: absolute;
  left: -15px;
}

/* 学习按钮 */
.learn-btn {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-lg);
  background-color: var(--primary-color);
  color: white;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.learn-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* 空状态 */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--spacing-2xl);
  background-color: var(--background-light);
  border-radius: var(--border-radius-lg);
  border: 2px dashed var(--border-color);
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

/* 动画 */
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
    width: 100px;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modules-container,
  .key-points-container,
  .difficult-concepts-container {
    grid-template-columns: 1fr;
  }
  
  .subject-buttons,
  .content-type-buttons,
  .grade-tabs {
    justify-content: center;
  }
  
  .learning-content h2 {
    font-size: var(--font-size-xl);
  }
  
  .learning-content h3 {
    font-size: var(--font-size-base);
  }
  
  .module-card,
  .key-point-card,
  .concept-card {
    padding: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .subject-btn,
  .content-type-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
  }
  
  .grade-tab {
    padding: var(--spacing-xs);
    font-size: var(--font-size-xs);
  }
  
  .learn-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
  }
}
</style>