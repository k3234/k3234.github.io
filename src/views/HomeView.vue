<template>
  <PageLayout>
    <!-- 英雄区域 -->
    <section class="hero animate-fade-in-up">
      <div class="hero-content">
        <h2 class="hero-title">欢迎来到高中生学习平台</h2>
        <p class="hero-subtitle">游戏化闯关学习系统，让学习变得有趣而上瘾，轻松掌握高考重难点</p>
        <BaseButton variant="primary" size="large" @click="startLearning" class="start-btn">
          <span class="btn-icon">🚀</span>
          开始学习
        </BaseButton>
      </div>
      <div class="hero-visual">
        <div class="visual-element"></div>
        <div class="visual-element"></div>
        <div class="visual-element"></div>
      </div>
    </section>
    
    <!-- 核心功能 -->
    <section class="features">
      <h3 class="section-title">核心功能</h3>
      <BaseGrid cols="auto" gap="lg">
        <BaseCard variant="default" elevated class="feature-card hover-lift">
          <div class="feature-icon">📚</div>
          <h4 class="feature-title">多学科覆盖</h4>
          <p class="feature-description">物理、数学、化学、生物等学科全面覆盖</p>
        </BaseCard>
        <BaseCard variant="default" elevated class="feature-card hover-lift">
          <div class="feature-icon">🎯</div>
          <h4 class="feature-title">个性化学习</h4>
          <p class="feature-description">根据你的学习进度和能力自动调整内容</p>
        </BaseCard>
        <BaseCard variant="default" elevated class="feature-card hover-lift">
          <div class="feature-icon">🎮</div>
          <h4 class="feature-title">成瘾性学习</h4>
          <p class="feature-description">游戏化设计，让学习变得有趣而持续</p>
        </BaseCard>
        <BaseCard variant="default" elevated class="feature-card hover-lift">
          <div class="feature-icon">📈</div>
          <h4 class="feature-title">新高考内容</h4>
          <p class="feature-description">及时跟进新高考改革，提供最新的学习资料</p>
        </BaseCard>
      </BaseGrid>
    </section>
    
    <!-- 热门学科 -->
    <section class="subjects-preview">
      <h3 class="section-title">热门学科</h3>
      <BaseGrid cols="auto" gap="lg">
        <div class="subject-card hover-lift" v-for="subject in subjects" :key="subject.id" @click="goToSubject(subject.id)">
          <div class="subject-icon">{{ subject.icon }}</div>
          <h4 class="subject-title">{{ subject.name }}</h4>
          <p class="subject-description">{{ subject.description }}</p>
          <div class="subject-hover-effect"></div>
        </div>
      </BaseGrid>
    </section>
  </PageLayout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import PageLayout from '../components/PageLayout.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseCard from '../components/BaseCard.vue'
import BaseGrid from '../components/BaseGrid.vue'

const router = useRouter()

const subjects = [
  { id: 'math', name: '数学', icon: '📐', description: '函数、几何、概率等核心内容' },
  { id: 'physics', name: '物理', icon: '⚡', description: '力学、电磁学、热学等基础概念' },
  { id: 'chemistry', name: '化学', icon: '🧪', description: '化学反应、元素周期表、有机化学' },
  { id: 'biology', name: '生物', icon: '🧬', description: '细胞、遗传、生态等生命科学' }
]

const startLearning = () => {
  router.push('/subjects')
}

const goToSubject = (subjectId) => {
  router.push(`/subjects/${subjectId}`)
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: var(--spacing-3xl);
  border-radius: var(--border-radius-2xl);
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  box-shadow: var(--shadow-xl);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xl);
}

.hero-content {
  flex: 1;
  z-index: 1;
}

.hero-title {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-lg);
  font-weight: var(--font-weight-bold);
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  animation: slideInLeft var(--transition-slow) ease-out 0.2s both;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-2xl);
  opacity: 0.95;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  animation: slideInLeft var(--transition-slow) ease-out 0.4s both;
}

.start-btn {
  animation: slideInLeft var(--transition-slow) ease-out 0.6s both;
}

.btn-icon {
  font-size: var(--font-size-xl);
  line-height: 1;
}

.hero-visual {
  flex: 1;
  position: relative;
  height: 300px;
  animation: fadeIn var(--transition-slow) ease-out 0.8s both;
}

.visual-element {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float var(--transition-slow) ease-in-out infinite alternate;
}

.visual-element:nth-child(1) {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.visual-element:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 20%;
  animation-delay: 0.3s;
}

.visual-element:nth-child(3) {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 40%;
  animation-delay: 0.6s;
}

@keyframes float {
  from {
    transform: translateY(0) scale(1);
  }
  to {
    transform: translateY(-20px) scale(1.05);
  }
}

.features {
  margin-bottom: var(--spacing-3xl);
}

.section-title {
  text-align: center;
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-2xl);
  color: var(--text-primary);
  position: relative;
  padding-bottom: var(--spacing-sm);
}

.section-title::after {
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

.feature-card {
  text-align: center;
  border-top: 4px solid var(--primary-color);
}

.feature-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-lg);
  transition: all var(--transition-normal);
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-title {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: var(--font-size-sm);
}

.subjects-preview {
  margin-bottom: var(--spacing-3xl);
}

.subject-card {
  background-color: var(--background-white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.subject-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
}

.subject-card:hover {
  border-color: var(--primary-light);
}

.subject-card:hover .subject-hover-effect {
  opacity: 1;
  transform: scale(1);
}

.subject-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
  opacity: 0;
  transform: scale(0.8);
  transition: all var(--transition-normal);
  pointer-events: none;
}

.subject-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-lg);
  transition: all var(--transition-normal);
}

.subject-card:hover .subject-icon {
  transform: scale(1.1) rotate(5deg);
}

.subject-title {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
}

.subject-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
}



@keyframes slideIn {
  from {
    width: 0;
  }
  to {
    width: 100px;
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

/* 响应式 */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    padding: var(--spacing-2xl) var(--spacing-md);
    text-align: center;
  }
  
  .hero-content {
    order: 2;
  }
  
  .hero-visual {
    order: 1;
    height: 200px;
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .section-title {
    font-size: var(--font-size-xl);
  }
  
  .testimonial {
    padding: var(--spacing-xl);
  }
  
  .testimonial-text p {
    font-size: var(--font-size-base);
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: var(--font-size-2xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-base);
  }
}
</style>