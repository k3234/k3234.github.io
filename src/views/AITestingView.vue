<template>
  <div class="ai-testing-container">
    <div class="ai-testing-header">
      <h1>AI学习能力测试</h1>
      <p>执行100次跨学科问答测试，评估和训练AI的学习能力</p>
    </div>
    
    <div class="ai-testing-content">
      <!-- 测试配置 -->
      <div class="test-config">
        <h2>测试配置</h2>
        <div class="config-form">
          <div class="form-group">
            <label for="model-select">选择AI模型</label>
            <select id="model-select" v-model="selectedModel">
              <option value="llama3">Llama 3</option>
              <option value="deepseek">DeepSeek</option>
              <option value="gemma">Gemma</option>
            </select>
          </div>
          <div class="form-group">
            <label for="iterations">测试迭代次数</label>
            <input 
              type="number" 
              id="iterations" 
              v-model.number="iterations" 
              min="1" 
              max="1000"
            />
          </div>
          <button 
            class="start-test-btn" 
            @click="startTesting" 
            :disabled="isTesting"
          >
            {{ isTesting ? '测试进行中...' : '开始测试' }}
          </button>
        </div>
      </div>
      
      <!-- 测试进度 -->
      <div v-if="isTesting" class="test-progress">
        <h2>测试进度</h2>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
        <p class="progress-text">
          测试 {{ currentTest }} / {{ iterations }}: {{ currentSubject }} - {{ currentQuestion }}
        </p>
      </div>
      
      <!-- 测试结果 -->
      <div v-if="testReport" class="test-results">
        <h2>测试结果报告</h2>
        
        <!-- 总体摘要 -->
        <div class="test-summary">
          <h3>总体摘要</h3>
          <div class="summary-grid">
            <div class="summary-item">
              <span class="summary-label">总测试次数</span>
              <span class="summary-value">{{ testReport.testSummary.totalTests }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">正确次数</span>
              <span class="summary-value">{{ testReport.testSummary.totalCorrect }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">准确率</span>
              <span class="summary-value">{{ testReport.testSummary.overallAccuracy }}%</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">平均响应时间</span>
              <span class="summary-value">{{ testReport.testSummary.averageResponseTime }}ms</span>
            </div>
          </div>
        </div>
        
        <!-- 学科分析 -->
        <div class="subject-analysis">
          <h3>学科分析</h3>
          <div class="subject-grid">
            <div 
              v-for="(report, subject) in testReport.subjectReports" 
              :key="subject"
              class="subject-card"
            >
              <h4>{{ report.name }}</h4>
              <div class="subject-stats">
                <div class="stat-item">
                  <span class="stat-label">测试次数</span>
                  <span class="stat-value">{{ report.total }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">正确次数</span>
                  <span class="stat-value">{{ report.correct }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">准确率</span>
                  <span class="stat-value">{{ report.accuracy }}%</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">平均响应时间</span>
                  <span class="stat-value">{{ report.averageResponseTime }}ms</span>
                </div>
              </div>
              <div v-if="report.errors.length > 0" class="error-list">
                <h5>错误问题:</h5>
                <ul>
                  <li v-for="(error, index) in report.errors.slice(0, 3)" :key="index">
                    {{ error }}
                  </li>
                  <li v-if="report.errors.length > 3">...</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 知识Gap -->
        <div v-if="Object.keys(testReport.knowledgeGaps).length > 0" class="knowledge-gaps">
          <h3>知识Gap分析</h3>
          <div class="gaps-list">
            <div 
              v-for="(gap, subject) in testReport.knowledgeGaps" 
              :key="subject"
              class="gap-item"
            >
              <h4>{{ gap.subject }}</h4>
              <p>错误率: {{ gap.errorRate }}% ({{ gap.errorCount }}/{{ testReport.subjectReports[subject].total }})</p>
              <div class="gap-questions">
                <h5>错误问题:</h5>
                <ul>
                  <li v-for="(question, index) in gap.errorQuestions.slice(0, 3)" :key="index">
                    {{ question }}
                  </li>
                  <li v-if="gap.errorQuestions.length > 3">...</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 改进建议 -->
        <div v-if="testReport.recommendations.length > 0" class="recommendations">
          <h3>改进建议</h3>
          <ul class="recommendation-list">
            <li v-for="(recommendation, index) in testReport.recommendations" :key="index">
              <span class="recommendation-type">{{ recommendation.type }}:</span>
              {{ recommendation.description }}
            </li>
          </ul>
        </div>
        
        <!-- 详细结果 -->
        <div class="detailed-results">
          <h3>详细结果</h3>
          <div class="results-table">
            <table>
              <thead>
                <tr>
                  <th>测试编号</th>
                  <th>学科</th>
                  <th>问题</th>
                  <th>结果</th>
                  <th>响应时间</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(result, index) in testReport.detailedResults" 
                  :key="index"
                  :class="{ 'result-correct': result.isCorrect, 'result-incorrect': !result.isCorrect }"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ getSubjectName(result.subject) }}</td>
                  <td>{{ result.question }}</td>
                  <td>{{ result.isCorrect ? '正确' : '错误' }}</td>
                  <td>{{ result.responseTime }}ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { aiModelIntegration } from '../services/aiModelIntegration';
import { runAITests } from '../services/aiTestingFramework';

// 状态
const selectedModel = ref('llama3');
const iterations = ref(100);
const isTesting = ref(false);
const testReport = ref(null);
const currentTest = ref(0);
const currentSubject = ref('');
const currentQuestion = ref('');

// 计算属性
const progressPercentage = computed(() => {
  if (iterations.value === 0) return 0;
  return (currentTest.value / iterations.value) * 100;
});

// 获取学科名称
function getSubjectName(subject) {
  const subjectNames = {
    math: '数学',
    physics: '物理',
    chemistry: '化学',
    biology: '生物'
  };
  return subjectNames[subject] || subject;
}

// 开始测试
async function startTesting() {
  isTesting.value = true;
  testReport.value = null;
  currentTest.value = 0;
  
  // 选择模型
  aiModelIntegration.selectModel(selectedModel.value);
  
  // 重写控制台日志，捕获测试进度
  const originalLog = console.log;
  console.log = function(...args) {
    originalLog(...args);
    
    // 解析测试进度
    const message = args[0];
    if (typeof message === 'string' && message.startsWith('测试 ')) {
      const match = message.match(/测试 (\d+): (.+) - (.+)/);
      if (match) {
        currentTest.value = parseInt(match[1]);
        currentSubject.value = match[2];
        currentQuestion.value = match[3];
      }
    }
  };
  
  try {
    // 执行测试
    const report = await runAITests(aiModelIntegration, iterations.value);
    testReport.value = report;
  } catch (error) {
    console.error('测试失败:', error);
  } finally {
    isTesting.value = false;
    // 恢复原始控制台日志
    console.log = originalLog;
  }
}
</script>

<style scoped>
.ai-testing-container {
  min-height: 100vh;
  background: var(--background-light);
  padding: var(--spacing-xl) var(--spacing-lg);
}

.ai-testing-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  animation: fadeInUp var(--transition-slow) ease-out;
}

.ai-testing-header h1 {
  font-size: var(--font-size-2xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-bold);
}

.ai-testing-header p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.ai-testing-content {
  max-width: 1200px;
  margin: 0 auto;
}

.test-config,
.test-progress,
.test-results {
  background-color: var(--background-white);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  animation: fadeInUp var(--transition-slow) ease-out;
}

.test-config h2,
.test-progress h2,
.test-results h2 {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-weight: var(--font-weight-bold);
  position: relative;
  padding-bottom: var(--spacing-sm);
}

.test-config h2::after,
.test-progress h2::after,
.test-results h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-full);
}

.config-form {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  align-items: end;
}

.form-group {
  flex: 1;
  min-width: 200px;
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
.form-group select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  background-color: var(--background-white);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.start-test-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-width: 120px;
}

.start-test-btn:hover:not(:disabled) {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.start-test-btn:disabled {
  background-color: var(--border-color);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: var(--background-light);
  border-radius: var(--border-radius-full);
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-full);
  transition: width var(--transition-fast);
}

.progress-text {
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.test-summary {
  margin-bottom: var(--spacing-xl);
}

.test-summary h3,
.subject-analysis h3,
.knowledge-gaps h3,
.recommendations h3,
.detailed-results h3 {
  font-size: var(--font-size-lg);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-semibold);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.summary-item {
  background-color: var(--background-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  text-align: center;
  border: 1px solid var(--border-color);
}

.summary-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.summary-value {
  display: block;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
}

.subject-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.subject-card {
  background-color: var(--background-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.subject-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.subject-card h4 {
  font-size: var(--font-size-lg);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-semibold);
}

.subject-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.stat-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.error-list {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
}

.error-list h5 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.error-list ul {
  list-style: disc;
  padding-left: var(--spacing-md);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.error-list li {
  margin-bottom: var(--spacing-xs);
}

.gaps-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-lg);
}

.gap-item {
  background-color: var(--background-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-color);
  border-left: 4px solid var(--error-color);
}

.gap-item h4 {
  font-size: var(--font-size-lg);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-semibold);
}

.gap-item p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-sm);
}

.gap-questions h5 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.gap-questions ul {
  list-style: disc;
  padding-left: var(--spacing-md);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.gap-questions li {
  margin-bottom: var(--spacing-xs);
}

.recommendation-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recommendation-list li {
  background-color: var(--background-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-left: 4px solid var(--primary-color);
  color: var(--text-primary);
}

.recommendation-type {
  font-weight: var(--font-weight-semibold);
  margin-right: var(--spacing-sm);
}

.results-table {
  overflow-x: auto;
}

.results-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.results-table th,
.results-table td {
  padding: var(--spacing-sm);
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.results-table th {
  background-color: var(--background-light);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.results-table tr:hover {
  background-color: var(--background-light);
}

.results-table tr.result-correct {
  background-color: var(--success-light);
}

.results-table tr.result-incorrect {
  background-color: var(--error-light);
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
  .ai-testing-container {
    padding: var(--spacing-lg) var(--spacing-md);
  }
  
  .test-config,
  .test-progress,
  .test-results {
    padding: var(--spacing-lg);
  }
  
  .config-form {
    flex-direction: column;
    align-items: stretch;
  }
  
  .form-group {
    min-width: 100%;
  }
  
  .summary-grid,
  .subject-grid,
  .gaps-list {
    grid-template-columns: 1fr;
  }
  
  .subject-stats {
    grid-template-columns: 1fr;
  }
}
</style>