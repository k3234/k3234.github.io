<template>
  <div class="subjects">
    <h2>选择学科</h2>
    <div class="subjects-grid">
      <div class="subject-card" v-for="subject in subjects" :key="subject.id" @click="goToSubject(subject.id)">
        <div class="subject-icon">{{ subject.icon }}</div>
        <h3>{{ subject.name }}</h3>
        <p>{{ subject.description }}</p>
        <div class="subject-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: subject.progress + '%' }"></div>
          </div>
          <span>{{ subject.progress }}% 完成</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const subjects = [
  { id: 'math', name: '数学', icon: '📐', description: '函数、几何、概率等核心内容', progress: 30 },
  { id: 'physics', name: '物理', icon: '⚡', description: '力学、电磁学、热学等基础概念', progress: 15 },
  { id: 'chemistry', name: '化学', icon: '🧪', description: '化学反应、元素周期表、有机化学', progress: 25 },
  { id: 'biology', name: '生物', icon: '🧬', description: '细胞、遗传、生态等生命科学', progress: 20 }
]

const goToSubject = (subjectId) => {
  router.push(`/subjects/${subjectId}`)
}
</script>

<style scoped>
.subjects {
  max-width: 1200px;
  margin: 0 auto;
}

.subjects h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.subject-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.subject-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.subject-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
}

.subject-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
  text-align: center;
}

.subject-card p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
  text-align: center;
}

.subject-progress {
  margin-top: 1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.subject-progress span {
  font-size: 0.8rem;
  color: #666;
  display: block;
  text-align: right;
}
</style>