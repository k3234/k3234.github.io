<template>
  <div class="ai-test-container">
    <div class="ai-test-header">
      <h1>AI学习助手</h1>
      <p>使用AI模型生成学习内容和解答问题</p>
    </div>
    
    <div class="ai-test-content">
      <!-- 模型选择 -->
      <div class="model-selector">
        <h2>选择AI模型</h2>
        <div class="model-buttons">
          <button 
            v-for="(model, key) in models" 
            :key="key"
            :class="['model-btn', { active: selectedModel === key }]"
            @click="selectedModel = key"
          >
            {{ model.name }}
            <span class="model-cost">{{ model.cost }}</span>
          </button>
        </div>
      </div>
      
      <!-- 功能选择 -->
      <div class="feature-selector">
        <h2>选择功能</h2>
        <div class="feature-tabs">
          <button 
            v-for="feature in features" 
            :key="feature.key"
            :class="['feature-tab', { active: selectedFeature === feature.key }]"
            @click="selectedFeature = feature.key"
          >
            {{ feature.label }}
          </button>
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="input-section">
        <h3>{{ getFeatureTitle() }}</h3>
        
        <!-- 生成数学题 -->
        <div v-if="selectedFeature === 'generateMath'" class="input-form">
          <div class="form-group">
            <label for="math-topic">题目类型</label>
            <input 
              type="text" 
              id="math-topic" 
              v-model="mathTopic"
              placeholder="例如：二次函数、三角函数"
            />
          </div>
          <div class="form-group">
            <label for="math-difficulty">难度</label>
            <select id="math-difficulty" v-model="mathDifficulty">
              <option value="easy">简单</option>
              <option value="medium">中等</option>
              <option value="hard">困难</option>
            </select>
          </div>
          <button class="generate-btn" @click="generateMathProblem">生成题目</button>
        </div>
        
        <!-- 解答数学题 -->
        <div v-else-if="selectedFeature === 'solveMath'" class="input-form">
          <div class="form-group">
            <label for="math-problem">数学题</label>
            <textarea 
              id="math-problem" 
              v-model="mathProblem"
              placeholder="输入数学题，支持LaTeX格式"
              rows="4"
            ></textarea>
          </div>
          <button class="generate-btn" @click="solveMathProblem">解答题目</button>
        </div>
        
        <!-- 解释概念 -->
        <div v-else-if="selectedFeature === 'explainConcept'" class="input-form">
          <div class="form-group">
            <label for="concept">概念</label>
            <input 
              type="text" 
              id="concept" 
              v-model="concept"
              placeholder="例如：导数、电磁感应"
            />
          </div>
          <div class="form-group">
            <label for="grade-level">年级水平</label>
            <select id="grade-level" v-model="gradeLevel">
              <option value="middle-school">初中</option>
              <option value="high-school">高中</option>
              <option value="college">大学</option>
            </select>
          </div>
          <button class="generate-btn" @click="explainConcept">解释概念</button>
        </div>
        
        <!-- 生成学习建议 -->
        <div v-else-if="selectedFeature === 'learningSuggestions'" class="input-form">
          <div class="form-group">
            <label for="subject">学科</label>
            <input 
              type="text" 
              id="subject" 
              v-model="subject"
              placeholder="例如：数学、物理"
            />
          </div>
          <div class="form-group">
            <label for="weak-points">薄弱环节（用逗号分隔）</label>
            <input 
              type="text" 
              id="weak-points" 
              v-model="weakPoints"
              placeholder="例如：二次函数, 三角函数"
            />
          </div>
          <button class="generate-btn" @click="generateLearningSuggestions">生成建议</button>
        </div>
      </div>
      
      <!-- 结果区域 -->
      <div v-if="result" class="result-section">
        <h3>结果</h3>
        <div class="result-content" ref="resultContent">
          <div v-if="selectedFeature === 'generateMath'">
            <h4>题目</h4>
            <div class="problem">{{ result.problem }}</div>
            <h4>解答</h4>
            <div class="solution">{{ result.solution }}</div>
          </div>
          <div v-else>
            {{ result }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { aiModelIntegration } from '../services/aiModelIntegration';

// 模型列表
const models = {
  'llama3': {
    name: 'Llama 3',
    cost: '低成本'
  },
  'deepseek': {
    name: 'DeepSeek',
    cost: '低成本'
  },
  'gemma': {
    name: 'Gemma',
    cost: '低成本'
  }
};

// 功能列表
const features = [
  { key: 'generateMath', label: '生成数学题' },
  { key: 'solveMath', label: '解答数学题' },
  { key: 'explainConcept', label: '解释概念' },
  { key: 'learningSuggestions', label: '学习建议' }
];

// 状态
const selectedModel = ref('llama3');
const selectedFeature = ref('generateMath');
const mathTopic = ref('二次函数');
const mathDifficulty = ref('medium');
const mathProblem = ref('');
const concept = ref('导数');
const gradeLevel = ref('high-school');
const subject = ref('数学');
const weakPoints = ref('二次函数, 三角函数');
const result = ref(null);
const resultContent = ref(null);

// 选择模型
function selectModel(model) {
  selectedModel.value = model;
  aiModelIntegration.selectModel(model);
}

// 获取功能标题
function getFeatureTitle() {
  const featureMap = {
    'generateMath': '生成数学题',
    'solveMath': '解答数学题',
    'explainConcept': '解释概念',
    'learningSuggestions': '生成学习建议'
  };
  return featureMap[selectedFeature.value] || '选择功能';
}

// 生成数学题
async function generateMathProblem() {
  result.value = null;
  try {
    const problem = await aiModelIntegration.generateMathProblem(mathTopic.value, mathDifficulty.value);
    result.value = problem;
    // 渲染数学公式
    setTimeout(() => {
      if (resultContent.value) {
        aiModelIntegration.renderMathInElement(resultContent.value);
      }
    }, 100);
  } catch (error) {
    console.error('生成数学题失败:', error);
  }
}

// 解答数学题
async function solveMathProblem() {
  result.value = null;
  try {
    const solution = await aiModelIntegration.solveMathProblem(mathProblem.value);
    result.value = solution;
    // 渲染数学公式
    setTimeout(() => {
      if (resultContent.value) {
        aiModelIntegration.renderMathInElement(resultContent.value);
      }
    }, 100);
  } catch (error) {
    console.error('解答数学题失败:', error);
  }
}

// 解释概念
async function explainConcept() {
  result.value = null;
  try {
    const explanation = await aiModelIntegration.explainConcept(concept.value, gradeLevel.value);
    result.value = explanation;
  } catch (error) {
    console.error('解释概念失败:', error);
  }
}

// 生成学习建议
async function generateLearningSuggestions() {
  result.value = null;
  try {
    const points = weakPoints.value.split(',').map(point => point.trim());
    const suggestions = await aiModelIntegration.generateLearningSuggestions(subject.value, points);
    result.value = suggestions;
  } catch (error) {
    console.error('生成学习建议失败:', error);
  }
}

// 监听模型变化
watch(selectedModel, (newModel) => {
  selectModel(newModel);
});

// 组件挂载时初始化
onMounted(() => {
  // 选择默认模型
  selectModel(selectedModel.value);
});
</script>

<style scoped>
.ai-test-container {
  min-height: 100vh;
  background: var(--background-light);
  padding: var(--spacing-xl) var(--spacing-lg);
}

.ai-test-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  animation: fadeInUp var(--transition-slow) ease-out;
}

.ai-test-header h1 {
  font-size: var(--font-size-2xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-bold);
}

.ai-test-header p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.ai-test-content {
  max-width: 800px;
  margin: 0 auto;
}

.model-selector,
.feature-selector,
.input-section,
.result-section {
  background-color: var(--background-white);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  animation: fadeInUp var(--transition-slow) ease-out;
}

.model-selector h2,
.feature-selector h2,
.input-section h3,
.result-section h3 {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-weight: var(--font-weight-bold);
  position: relative;
  padding-bottom: var(--spacing-sm);
}

.model-selector h2::after,
.feature-selector h2::after,
.input-section h3::after,
.result-section h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-full);
}

.model-buttons {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.model-btn {
  flex: 1;
  min-width: 120px;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--background-white);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.model-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.model-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.model-cost {
  font-size: var(--font-size-sm);
  opacity: 0.8;
}

.feature-tabs {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.feature-tab {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--background-white);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.feature-tab:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.feature-tab.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.input-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-group label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  background-color: var(--background-white);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.generate-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  align-self: flex-start;
}

.generate-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.result-content {
  background-color: var(--background-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-color);
  line-height: var(--line-height-relaxed);
  color: var(--text-primary);
  white-space: pre-wrap;
}

.problem {
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
}

.solution {
  margin-top: var(--spacing-md);
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

@media (max-width: 768px) {
  .ai-test-container {
    padding: var(--spacing-lg) var(--spacing-md);
  }
  
  .model-selector,
  .feature-selector,
  .input-section,
  .result-section {
    padding: var(--spacing-lg);
  }
  
  .model-buttons,
  .feature-tabs {
    flex-direction: column;
  }
  
  .model-btn,
  .feature-tab {
    width: 100%;
  }
  
  .generate-btn {
    align-self: stretch;
  }
}
</style>