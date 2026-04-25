<template>
  <div class="subject-detail">
    <div class="subject-header">
      <div class="subject-info">
        <div class="subject-icon">{{ currentSubject.icon }}</div>
        <h2>{{ currentSubject.name }}</h2>
        <p>{{ currentSubject.description }}</p>
      </div>
      <div class="subject-stats">
        <div class="stat-item">
          <span class="stat-value">{{ currentSubject.progress }}%</span>
          <span class="stat-label">完成度</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ currentSubject.modules.length }}</span>
          <span class="stat-label">模块</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ currentSubject.points }}</span>
          <span class="stat-label">学习点数</span>
        </div>
      </div>
    </div>

    <div class="modules-section">
      <h3>学习模块</h3>
      <div class="modules-list">
        <div class="module-card" v-for="(module, index) in currentSubject.modules" :key="module.id">
          <div class="module-header">
            <h4>模块 {{ index + 1 }}: {{ module.title }}</h4>
            <span class="module-progress">{{ module.progress }}%</span>
          </div>
          <div class="module-content">
            <p>{{ module.description }}</p>
            <div class="lessons-list">
              <div class="lesson-item" v-for="(lesson, lessonIndex) in module.lessons" :key="lesson.id">
                <div class="lesson-info">
                  <span class="lesson-number">{{ lessonIndex + 1 }}</span>
                  <span class="lesson-title">{{ lesson.title }}</span>
                </div>
                <div class="lesson-status">
                  <span v-if="lesson.completed" class="status-completed">✓ 已完成</span>
                  <span v-else class="status-pending">待学习</span>
                </div>
              </div>
            </div>
            <button class="start-module-btn" @click="startModule(module.id)">开始学习</button>
          </div>
        </div>
      </div>
    </div>

    <div class="practice-section">
      <h3>练习与测试</h3>
      <div class="practice-cards">
        <div class="practice-card">
          <h4>每日练习</h4>
          <p>完成今日练习，获得额外点数</p>
          <button class="practice-btn">开始练习</button>
        </div>
        <div class="practice-card">
          <h4>单元测试</h4>
          <p>测试你对当前单元的掌握程度</p>
          <button class="practice-btn">开始测试</button>
        </div>
        <div class="practice-card">
          <h4>模拟考试</h4>
          <p>体验真实考试环境，评估学习效果</p>
          <button class="practice-btn">开始模拟</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const subjectId = computed(() => route.params.subject)

const subjects = ref([
  {
    id: 'math',
    name: '数学',
    icon: '📐',
    description: '函数、几何、概率等核心内容',
    progress: 30,
    points: 1200,
    modules: [
      {
        id: 'math-module-1',
        title: '函数基础',
        description: '学习函数的基本概念、性质和图像',
        progress: 100,
        lessons: [
          { id: 'math-lesson-1', title: '函数的定义', completed: true },
          { id: 'math-lesson-2', title: '函数的性质', completed: true },
          { id: 'math-lesson-3', title: '函数的图像', completed: true }
        ]
      },
      {
        id: 'math-module-2',
        title: '三角函数',
        description: '学习三角函数的定义、性质和应用',
        progress: 50,
        lessons: [
          { id: 'math-lesson-4', title: '三角函数的定义', completed: true },
          { id: 'math-lesson-5', title: '三角函数的图像', completed: false },
          { id: 'math-lesson-6', title: '三角函数的应用', completed: false }
        ]
      },
      {
        id: 'math-module-3',
        title: '立体几何',
        description: '学习空间几何体的性质和计算',
        progress: 0,
        lessons: [
          { id: 'math-lesson-7', title: '空间几何体', completed: false },
          { id: 'math-lesson-8', title: '空间点线面关系', completed: false },
          { id: 'math-lesson-9', title: '空间向量', completed: false }
        ]
      }
    ]
  },
  {
    id: 'physics',
    name: '物理',
    icon: '⚡',
    description: '力学、电磁学、热学等基础概念',
    progress: 15,
    points: 800,
    modules: [
      {
        id: 'physics-module-1',
        title: '牛顿运动定律',
        description: '学习牛顿三大定律及其应用',
        progress: 100,
        lessons: [
          { id: 'physics-lesson-1', title: '牛顿第一定律', completed: true },
          { id: 'physics-lesson-2', title: '牛顿第二定律', completed: true },
          { id: 'physics-lesson-3', title: '牛顿第三定律', completed: true }
        ]
      },
      {
        id: 'physics-module-2',
        title: '动能与动量',
        description: '学习动能定理和动量守恒定律',
        progress: 0,
        lessons: [
          { id: 'physics-lesson-4', title: '动能定理', completed: false },
          { id: 'physics-lesson-5', title: '动量守恒定律', completed: false },
          { id: 'physics-lesson-6', title: '碰撞问题', completed: false }
        ]
      }
    ]
  },
  {
    id: 'chemistry',
    name: '化学',
    icon: '🧪',
    description: '化学反应、元素周期表、有机化学',
    progress: 25,
    points: 1000,
    modules: [
      {
        id: 'chemistry-module-1',
        title: '化学计量',
        description: '学习物质的量、摩尔质量等基本概念',
        progress: 100,
        lessons: [
          { id: 'chemistry-lesson-1', title: '物质的量', completed: true },
          { id: 'chemistry-lesson-2', title: '摩尔质量', completed: true },
          { id: 'chemistry-lesson-3', title: '气体摩尔体积', completed: true }
        ]
      },
      {
        id: 'chemistry-module-2',
        title: '元素周期表',
        description: '学习元素周期表的结构和元素性质',
        progress: 50,
        lessons: [
          { id: 'chemistry-lesson-4', title: '元素周期表的结构', completed: true },
          { id: 'chemistry-lesson-5', title: '元素性质的周期性', completed: false },
          { id: 'chemistry-lesson-6', title: '化学键', completed: false }
        ]
      }
    ]
  },
  {
    id: 'biology',
    name: '生物',
    icon: '🧬',
    description: '细胞、遗传、生态等生命科学',
    progress: 20,
    points: 900,
    modules: [
      {
        id: 'biology-module-1',
        title: '细胞结构',
        description: '学习细胞的基本结构和功能',
        progress: 100,
        lessons: [
          { id: 'biology-lesson-1', title: '细胞的基本结构', completed: true },
          { id: 'biology-lesson-2', title: '细胞膜', completed: true },
          { id: 'biology-lesson-3', title: '细胞器', completed: true }
        ]
      },
      {
        id: 'biology-module-2',
        title: '细胞代谢',
        description: '学习细胞的能量代谢过程',
        progress: 0,
        lessons: [
          { id: 'biology-lesson-4', title: '光合作用', completed: false },
          { id: 'biology-lesson-5', title: '细胞呼吸', completed: false },
          { id: 'biology-lesson-6', title: 'ATP与能量', completed: false }
        ]
      }
    ]
  }
])

const currentSubject = computed(() => {
  return subjects.value.find(subject => subject.id === subjectId.value) || subjects.value[0]
})

const startModule = (moduleId) => {
  // 这里可以实现开始学习模块的逻辑
  console.log('开始学习模块:', moduleId)
}

onMounted(() => {
  // 可以在这里加载用户的学习进度和相关数据
})
</script>

<style scoped>
.subject-detail {
  max-width: 1200px;
  margin: 0 auto;
}

.subject-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.subject-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.subject-icon {
  font-size: 4rem;
}

.subject-info h2 {
  font-size: 2rem;
  margin: 0;
  color: #333;
}

.subject-info p {
  margin: 0.5rem 0 0 0;
  color: #666;
}

.subject-stats {
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

.modules-section {
  margin-bottom: 3rem;
}

.modules-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.modules-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.module-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.module-card:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.module-header {
  background-color: #f0f0f0;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.module-header h4 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.module-progress {
  font-size: 0.9rem;
  color: #666;
  font-weight: bold;
}

.module-content {
  padding: 1.5rem;
}

.module-content p {
  margin: 0 0 1rem 0;
  color: #666;
}

.lessons-list {
  margin-bottom: 1.5rem;
}

.lesson-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.lesson-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lesson-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #4CAF50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}

.lesson-title {
  font-size: 0.95rem;
  color: #333;
}

.lesson-status {
  font-size: 0.85rem;
}

.status-completed {
  color: #4CAF50;
  font-weight: bold;
}

.status-pending {
  color: #999;
}

.start-module-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.start-module-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.practice-section {
  margin-bottom: 2rem;
}

.practice-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.practice-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.practice-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.practice-card h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.practice-card p {
  margin: 0 0 1.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.practice-btn {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.practice-btn:hover {
  background-color: #0b7dda;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .subject-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .subject-stats {
    width: 100%;
    justify-content: space-around;
  }
}
</style>