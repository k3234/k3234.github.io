<template>
  <div class="pre-assessment">
    <h2>预学习评估</h2>
    <p class="description">请完成以下评估，帮助我们为您定制个性化的学习计划</p>

    <div class="assessment-form">
      <!-- 年级信息收集 -->
      <div class="form-section">
        <h3>基本信息</h3>
        <div class="form-group">
          <label for="grade">当前年级</label>
          <select id="grade" v-model="userInfo.grade" @change="handleGradeChange">
            <option value="">请选择</option>
            <option value="high-school-1">高一</option>
            <option value="high-school-2">高二</option>
            <option value="high-school-3">高三</option>
          </select>
        </div>
        
        <div class="form-group" v-if="userInfo.grade">
          <label>目标学科（可多选）</label>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" v-model="userInfo.subjects" value="math" checked>
              数学
            </label>
            <label>
              <input type="checkbox" v-model="userInfo.subjects" value="physics" checked>
              物理
            </label>
            <label>
              <input type="checkbox" v-model="userInfo.subjects" value="chemistry" checked>
              化学
            </label>
            <label>
              <input type="checkbox" v-model="userInfo.subjects" value="biology" checked>
              生物
            </label>
          </div>
        </div>
      </div>

      <!-- 知识水平评估 -->
      <div class="form-section" v-if="userInfo.grade && userInfo.subjects.length > 0">
        <h3>知识水平评估</h3>
        <p class="section-description">请评估您对以下知识点的掌握程度</p>
        
        <div class="knowledge-assessment">
          <div class="knowledge-item" v-for="(knowledge, index) in assessmentKnowledge" :key="index">
            <div class="knowledge-info">
              <h4>{{ knowledge.title }}</h4>
              <p>{{ knowledge.description }}</p>
            </div>
            <div class="knowledge-rating">
              <label>
                <input type="radio" :name="'knowledge-' + index" value="1" v-model="knowledge.rating">
                完全不了解
              </label>
              <label>
                <input type="radio" :name="'knowledge-' + index" value="2" v-model="knowledge.rating">
                了解一点
              </label>
              <label>
                <input type="radio" :name="'knowledge-' + index" value="3" v-model="knowledge.rating">
                基本掌握
              </label>
              <label>
                <input type="radio" :name="'knowledge-' + index" value="4" v-model="knowledge.rating">
                熟练掌握
              </label>
              <label>
                <input type="radio" :name="'knowledge-' + index" value="5" v-model="knowledge.rating">
                精通
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- 学习需求 -->
      <div class="form-section" v-if="userInfo.grade && userInfo.subjects.length > 0">
        <h3>学习需求</h3>
        <div class="form-group">
          <label>您的学习目标</label>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" v-model="userInfo.goals" value="foundation">
              巩固基础知识
            </label>
            <label>
              <input type="checkbox" v-model="userInfo.goals" value="exam">
              备考高考
            </label>
            <label>
              <input type="checkbox" v-model="userInfo.goals" value="difficulty">
              攻克难点
            </label>
            <label>
              <input type="checkbox" v-model="userInfo.goals" value="competition">
              参加竞赛
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="difficulties">您遇到的困难</label>
          <textarea id="difficulties" v-model="userInfo.difficulties" placeholder="请描述您在学习中遇到的具体困难..."></textarea>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="form-actions" v-if="userInfo.grade && userInfo.subjects.length > 0">
        <button class="submit-btn" @click="submitAssessment">提交评估</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userInfo = ref({
  grade: '',
  subjects: ['math', 'physics', 'chemistry', 'biology'],
  goals: [],
  difficulties: ''
})

const assessmentKnowledge = ref([])

const handleGradeChange = () => {
  // 根据年级和学科加载相应的知识点评估
  if (userInfo.value.grade && userInfo.value.subjects.length > 0) {
    loadAssessmentKnowledge()
  }
}

const loadAssessmentKnowledge = () => {
  // 模拟根据年级和学科加载知识点
  const knowledgeMap = {
    'high-school-1': {
      math: [
        { title: '函数的基本性质', description: '包括单调性、奇偶性、周期性等', rating: '' },
        { title: '三角函数', description: '包括三角函数的定义、图像和性质', rating: '' },
        { title: '立体几何', description: '包括空间几何体的性质和计算', rating: '' }
      ],
      physics: [
        { title: '牛顿运动定律', description: '包括牛顿三大定律及其应用', rating: '' },
        { title: '动能与动量', description: '包括动能定理和动量守恒定律', rating: '' },
        { title: '机械能守恒', description: '包括机械能守恒定律及其应用', rating: '' }
      ],
      chemistry: [
        { title: '化学计量', description: '包括物质的量、摩尔质量等', rating: '' },
        { title: '元素周期表', description: '包括元素周期表的结构和元素性质', rating: '' },
        { title: '化学键', description: '包括离子键、共价键等', rating: '' }
      ],
      biology: [
        { title: '细胞结构', description: '包括细胞的基本结构和功能', rating: '' },
        { title: '细胞代谢', description: '包括光合作用和细胞呼吸', rating: '' },
        { title: '遗传规律', description: '包括孟德尔遗传定律', rating: '' }
      ]
    },
    'high-school-2': {
      math: [
        { title: '导数及其应用', description: '包括导数的计算和应用', rating: '' },
        { title: '解析几何', description: '包括直线、圆、圆锥曲线等', rating: '' },
        { title: '概率统计', description: '包括概率、统计图表、回归分析等', rating: '' }
      ],
      physics: [
        { title: '电磁学', description: '包括电场、磁场、电磁感应等', rating: '' },
        { title: '热学', description: '包括热力学定律、理想气体状态方程等', rating: '' },
        { title: '光学', description: '包括光的折射、反射、干涉等', rating: '' }
      ],
      chemistry: [
        { title: '化学反应速率', description: '包括反应速率的计算和影响因素', rating: '' },
        { title: '化学平衡', description: '包括化学平衡的建立和移动', rating: '' },
        { title: '有机化学', description: '包括有机物的结构和性质', rating: '' }
      ],
      biology: [
        { title: '基因表达', description: '包括DNA复制、转录、翻译等', rating: '' },
        { title: '生物进化', description: '包括进化论的基本原理', rating: '' },
        { title: '生态系统', description: '包括生态系统的结构和功能', rating: '' }
      ]
    },
    'high-school-3': {
      math: [
        { title: '函数与导数综合', description: '包括函数与导数的综合应用', rating: '' },
        { title: '圆锥曲线', description: '包括椭圆、双曲线、抛物线等', rating: '' },
        { title: '数列', description: '包括等差数列、等比数列及其应用', rating: '' }
      ],
      physics: [
        { title: '电磁感应', description: '包括电磁感应现象和法拉第定律', rating: '' },
        { title: '动量守恒', description: '包括动量守恒定律及其应用', rating: '' },
        { title: '近代物理', description: '包括相对论、量子力学初步等', rating: '' }
      ],
      chemistry: [
        { title: '有机合成', description: '包括有机物的合成和推断', rating: '' },
        { title: '化学实验', description: '包括实验设计和数据分析', rating: '' },
        { title: '化学反应原理', description: '包括热力学、动力学等', rating: '' }
      ],
      biology: [
        { title: '遗传变异', description: '包括基因突变、染色体变异等', rating: '' },
        { title: '生物技术', description: '包括基因工程、细胞工程等', rating: '' },
        { title: '生态环境', description: '包括环境保护和可持续发展', rating: '' }
      ]
    }
  }
  
  // 加载所有选中学科的知识点
  let allKnowledge = []
  userInfo.value.subjects.forEach(subject => {
    const subjectKnowledge = knowledgeMap[userInfo.value.grade][subject] || []
    allKnowledge = [...allKnowledge, ...subjectKnowledge]
  })
  assessmentKnowledge.value = allKnowledge
}

const submitAssessment = () => {
  // 验证评估数据
  const allRated = assessmentKnowledge.value.every(item => item.rating)
  if (!allRated) {
    alert('请完成所有知识点的评估')
    return
  }
  
  // 计算知识水平
  const totalRating = assessmentKnowledge.value.reduce((sum, item) => sum + parseInt(item.rating), 0)
  const averageRating = totalRating / assessmentKnowledge.value.length
  
  // 保存评估结果
  const assessmentResult = {
    ...userInfo.value,
    knowledgeLevel: averageRating,
    knowledgeDetails: assessmentKnowledge.value
  }
  
  // 存储评估结果到本地存储
  localStorage.setItem('preAssessment', JSON.stringify(assessmentResult))
  
  // 跳转到学习路径页面
  router.push('/learning-path')
}
</script>

<style scoped>
.pre-assessment {
  max-width: 1000px;
  margin: 0 auto;
  animation: fadeInUp var(--transition-slow) ease-out;
}

.pre-assessment h2 {
  text-align: center;
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  position: relative;
  padding-bottom: var(--spacing-sm);
}

.pre-assessment h2::after {
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

.assessment-form {
  background-color: var(--background-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
  border: 1px solid var(--border-color);
  animation: fadeIn var(--transition-slow) ease-out 0.2s both;
}

.form-section {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  animation: slideInUp var(--transition-normal) ease-out;
}

.form-section:last-child {
  border-bottom: none;
  margin-bottom: var(--spacing-md);
  padding-bottom: 0;
}

.form-section h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: var(--font-weight-semibold);
}

.form-section h3::before {
  content: '📋';
  font-size: var(--font-size-xl);
  line-height: 1;
}

.section-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  font-size: var(--font-size-base);
}

select {
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  background-color: var(--background-light);
  transition: all var(--transition-fast);
  font-family: var(--font-family);
}

select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.knowledge-assessment {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.knowledge-item {
  background-color: var(--background-light);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  border-left: 4px solid var(--primary-color);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
}

.knowledge-item:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

.knowledge-info h4 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--text-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
}

.knowledge-info p {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

.knowledge-rating {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  align-items: center;
}

.knowledge-rating label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: var(--font-weight-normal);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
}

.knowledge-rating label:hover {
  background-color: rgba(76, 175, 80, 0.1);
}

.knowledge-rating input[type="radio"] {
  accent-color: var(--primary-color);
  transform: scale(1.1);
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: var(--font-weight-normal);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
}

.checkbox-group label:hover {
  background-color: rgba(76, 175, 80, 0.1);
}

.checkbox-group input[type="checkbox"] {
  accent-color: var(--primary-color);
  transform: scale(1.1);
}

textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  min-height: 120px;
  resize: vertical;
  font-family: var(--font-family);
  background-color: var(--background-light);
  transition: all var(--transition-fast);
}

textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border-color);
}

.submit-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.submit-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.submit-btn:active {
  transform: translateY(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
    width: 100px;
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
  .assessment-form {
    padding: var(--spacing-lg);
  }
  
  .knowledge-rating {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: flex-start;
  }
  
  .knowledge-rating label {
    width: 100%;
    padding: var(--spacing-sm);
  }
  
  .checkbox-group {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .checkbox-group label {
    width: 100%;
    padding: var(--spacing-sm);
  }
  
  .submit-btn {
    padding: var(--spacing-md) var(--spacing-xl);
    font-size: var(--font-size-base);
    width: 100%;
    justify-content: center;
  }
}
</style>