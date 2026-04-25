<template>
  <div class="profile">
    <h2>个人中心</h2>
    
    <div class="profile-header">
      <div class="avatar">
        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=student%20avatar%20friendly%20smile&image_size=square" alt="用户头像">
      </div>
      <div class="user-info">
        <h3>张三</h3>
        <p>高中生 | 高三</p>
        <div class="user-stats">
          <span class="stat-item">
            <span class="stat-value">{{ totalPoints }}</span>
            <span class="stat-label">学习点数</span>
          </span>
          <span class="stat-item">
            <span class="stat-value">{{ studyDays }}</span>
            <span class="stat-label">连续学习</span>
          </span>
          <span class="stat-item">
            <span class="stat-value">{{ level }}</span>
            <span class="stat-label">等级</span>
          </span>
        </div>
      </div>
    </div>

    <div class="profile-content">
      <div class="settings-section">
        <h3>账号设置</h3>
        <div class="settings-card">
          <div class="setting-item">
            <span class="setting-label">用户名</span>
            <span class="setting-value">张三</span>
            <button class="edit-btn">编辑</button>
          </div>
          <div class="setting-item">
            <span class="setting-label">邮箱</span>
            <span class="setting-value">zhangsan@example.com</span>
            <button class="edit-btn">编辑</button>
          </div>
          <div class="setting-item">
            <span class="setting-label">密码</span>
            <span class="setting-value">••••••••</span>
            <button class="edit-btn">修改</button>
          </div>
        </div>
      </div>

      <div class="preferences-section">
        <h3>学习偏好</h3>
        <div class="settings-card">
          <div class="setting-item">
            <span class="setting-label">学习提醒</span>
            <label class="switch">
              <input type="checkbox" v-model="reminderEnabled">
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <span class="setting-label">每日学习目标</span>
            <select v-model="dailyGoal">
              <option value="30">30分钟</option>
              <option value="60">60分钟</option>
              <option value="90">90分钟</option>
              <option value="120">120分钟</option>
            </select>
          </div>
          <div class="setting-item">
            <span class="setting-label">学科优先级</span>
            <div class="priority-list">
              <div class="priority-item" v-for="(subject, index) in prioritySubjects" :key="subject.id">
                <span>{{ subject.name }}</span>
                <div class="priority-controls">
                  <button class="priority-btn" @click="movePriority(index, -1)" :disabled="index === 0">↑</button>
                  <button class="priority-btn" @click="movePriority(index, 1)" :disabled="index === prioritySubjects.length - 1">↓</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="achievements-section">
        <h3>成就徽章</h3>
        <div class="achievements-grid">
          <div class="achievement-card" v-for="achievement in achievements" :key="achievement.id">
            <div class="achievement-icon" :class="{ 'unlocked': achievement.unlocked }">
              {{ achievement.icon }}
            </div>
            <h4>{{ achievement.title }}</h4>
            <p>{{ achievement.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const totalPoints = ref(3900)
const studyDays = ref(15)
const level = ref(5)

const reminderEnabled = ref(true)
const dailyGoal = ref(60)

const prioritySubjects = ref([
  { id: 'math', name: '数学' },
  { id: 'physics', name: '物理' },
  { id: 'chemistry', name: '化学' },
  { id: 'biology', name: '生物' }
])

const movePriority = (index, direction) => {
  const newIndex = index + direction
  if (newIndex >= 0 && newIndex < prioritySubjects.value.length) {
    const [movedSubject] = prioritySubjects.value.splice(index, 1)
    prioritySubjects.value.splice(newIndex, 0, movedSubject)
  }
}

const achievements = ref([
  {
    id: 'first-lesson',
    title: '初次尝试',
    description: '完成第一节课',
    icon: '🎯',
    unlocked: true
  },
  {
    id: 'week-streak',
    title: '坚持一周',
    description: '连续学习7天',
    icon: '🔥',
    unlocked: true
  },
  {
    id: 'math-master',
    title: '数学大师',
    description: '完成所有数学课程',
    icon: '📐',
    unlocked: false
  },
  {
    id: 'physics-wizard',
    title: '物理 wizard',
    description: '完成所有物理课程',
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'chemistry-expert',
    title: '化学专家',
    description: '完成所有化学课程',
    icon: '🧪',
    unlocked: false
  },
  {
    id: 'biology-genius',
    title: '生物天才',
    description: '完成所有生物课程',
    icon: '🧬',
    unlocked: false
  }
])
</script>

<style scoped>
.profile {
  max-width: 1200px;
  margin: 0 auto;
}

.profile h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.user-info p {
  margin: 0 0 1rem 0;
  color: #666;
}

.user-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #4CAF50;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
}

.profile-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.settings-section,
.preferences-section,
.achievements-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1.5rem;
}

.achievements-section {
  grid-column: 1 / -1;
}

.settings-section h3,
.preferences-section h3,
.achievements-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.settings-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-label {
  font-size: 1rem;
  color: #333;
}

.setting-value {
  font-size: 0.9rem;
  color: #666;
}

.edit-btn {
  background-color: #f0f0f0;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background-color: #e0e0e0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4CAF50;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.priority-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.priority-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.priority-controls {
  display: flex;
  gap: 0.5rem;
}

.priority-btn {
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.priority-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.achievement-card {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.achievement-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.achievement-icon.unlocked {
  opacity: 1;
}

.achievement-card h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.achievement-card p {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-content {
    grid-template-columns: 1fr;
  }
  
  .user-stats {
    justify-content: space-around;
    width: 100%;
  }
}
</style>