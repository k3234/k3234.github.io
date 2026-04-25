<template>
  <div class="ai-config">
    <h2>AI学习系统配置</h2>
    
    <!-- 系统状态 -->
    <section class="status-section">
      <h3>系统状态</h3>
      <div class="status-grid">
        <div class="status-card">
          <h4>监控状态</h4>
          <p :class="{ 'status-active': systemStatus.monitoring?.enabled }">
            {{ systemStatus.monitoring?.enabled ? '已启用' : '已禁用' }}
          </p>
        </div>
        <div class="status-card">
          <h4>自我进化</h4>
          <p :class="{ 'status-active': systemStatus.selfEvolution?.enabled }">
            {{ systemStatus.selfEvolution?.enabled ? '已启用' : '已禁用' }}
          </p>
        </div>
        <div class="status-card">
          <h4>数据加密</h4>
          <p :class="{ 'status-active': systemStatus.security?.encryption?.enabled }">
            {{ systemStatus.security?.encryption?.enabled ? '已启用' : '已禁用' }}
          </p>
        </div>
        <div class="status-card">
          <h4>系统负载</h4>
          <p>{{ systemStatus.metrics ? `${systemStatus.metrics.cpu.usage.toFixed(2)}%` : 'N/A' }}</p>
        </div>
      </div>
    </section>
    
    <!-- 配置管理 -->
    <section class="config-section">
      <h3>配置管理</h3>
      <div class="config-form">
        <div class="form-group">
          <label>监控状态</label>
          <input type="checkbox" v-model="config.monitoring.enabled" />
        </div>
        <div class="form-group">
          <label>监控间隔 (毫秒)</label>
          <input type="number" v-model="config.monitoring.interval" min="1000" />
        </div>
        <div class="form-group">
          <label>CPU阈值 (%)</label>
          <input type="number" v-model="config.monitoring.thresholds.cpu" min="1" max="100" />
        </div>
        <div class="form-group">
          <label>内存阈值 (%)</label>
          <input type="number" v-model="config.monitoring.thresholds.memory" min="1" max="100" />
        </div>
        <div class="form-group">
          <label>磁盘阈值 (%)</label>
          <input type="number" v-model="config.monitoring.thresholds.disk" min="1" max="100" />
        </div>
        <div class="form-group">
          <label>自我进化状态</label>
          <input type="checkbox" v-model="config.selfEvolution.enabled" />
        </div>
        <div class="form-group">
          <label>学习率</label>
          <input type="number" v-model="config.selfEvolution.learningRate" step="0.01" min="0.01" max="1" />
        </div>
        <div class="form-group">
          <label>批处理大小</label>
          <input type="number" v-model="config.selfEvolution.batchSize" min="1" />
        </div>
        <div class="form-group">
          <label>数据加密</label>
          <input type="checkbox" v-model="config.security.encryption.enabled" />
        </div>
        <div class="form-group">
          <label>DeepSeek API密钥</label>
          <input type="password" v-model="config.aiModels.deepseek.apiKey" placeholder="请输入DeepSeek API密钥" />
        </div>
        <button class="btn-primary" @click="updateConfig">保存配置</button>
      </div>
    </section>
    
    <!-- 进化报告 -->
    <section class="report-section">
      <h3>进化报告</h3>
      <button class="btn-secondary" @click="generateReport">生成报告</button>
      <div v-if="evolutionReport" class="report-content">
        <div class="report-header">
          <h4>报告生成时间: {{ evolutionReport.timestamp }}</h4>
        </div>
        <div class="report-grid">
          <div class="report-card">
            <h5>用户行为洞察</h5>
            <ul>
              <li>总用户数: {{ evolutionReport.userBehaviorInsights.totalUsers }}</li>
              <li>活跃用户: {{ evolutionReport.userBehaviorInsights.activeUsers }}</li>
              <li>平均会话时间: {{ evolutionReport.userBehaviorInsights.averageSessionTime }}分钟</li>
            </ul>
          </div>
          <div class="report-card">
            <h5>知识图谱统计</h5>
            <ul>
              <li>节点数: {{ evolutionReport.knowledgeGraphStats.nodes }}</li>
              <li>边数: {{ evolutionReport.knowledgeGraphStats.edges }}</li>
              <li>更新时间: {{ evolutionReport.knowledgeGraphStats.updatedAt }}</li>
            </ul>
          </div>
        </div>
        <div class="report-suggestions">
          <h5>优化建议</h5>
          <ul>
            <li v-for="(suggestion, index) in evolutionReport.optimizationSuggestions" :key="index">
              {{ suggestion }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    
    <!-- 系统日志 -->
    <section class="logs-section">
      <h3>系统日志</h3>
      <div class="logs-content">
        <div v-for="(log, index) in systemStatus.logs" :key="index" class="log-entry">
          <span class="log-timestamp">{{ log.timestamp }}</span>
          <span class="log-event">{{ log.event }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { apiService } from '../services/apiService';

const systemStatus = ref({});
const config = ref({
  monitoring: {
    enabled: true,
    interval: 60000,
    thresholds: {
      cpu: 80,
      memory: 80,
      disk: 90
    }
  },
  selfEvolution: {
    enabled: true,
    learningRate: 0.01,
    batchSize: 32
  },
  security: {
    encryption: {
      enabled: true
    }
  },
  aiModels: {
    deepseek: {
      apiKey: 'sk-1c6518f9bca34518a9328e78eb02b641'
    }
  }
});
const evolutionReport = ref(null);

// 加载系统状态
const loadSystemStatus = async () => {
  try {
    const response = await apiService.get('/ai-config/status');
    systemStatus.value = response.data;
  } catch (error) {
    console.error('加载系统状态失败:', error);
  }
};

// 加载配置
const loadConfig = async () => {
  try {
    const response = await apiService.get('/ai-config/config');
    config.value = response.data;
  } catch (error) {
    console.error('加载配置失败:', error);
  }
};

// 更新配置
const updateConfig = async () => {
  try {
    const response = await apiService.put('/ai-config/config', config.value);
    alert('配置更新成功');
    loadSystemStatus();
  } catch (error) {
    console.error('更新配置失败:', error);
    alert('更新配置失败');
  }
};

// 生成进化报告
const generateReport = async () => {
  try {
    const response = await apiService.get('/ai-config/evolution-report');
    evolutionReport.value = response.data;
  } catch (error) {
    console.error('生成进化报告失败:', error);
    alert('生成进化报告失败');
  }
};

// 初始化
onMounted(() => {
  loadSystemStatus();
  loadConfig();
});
</script>

<style scoped>
.ai-config {
  padding: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.status-section,
.config-section,
.report-section,
.logs-section {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background-color: var(--background-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.status-card {
  padding: var(--spacing-md);
  background-color: var(--background-light);
  border-radius: var(--border-radius-md);
  text-align: center;
}

.status-active {
  color: var(--success-color);
  font-weight: var(--font-weight-semibold);
}

.config-form {
  margin-top: var(--spacing-md);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-group input[type="checkbox"] {
  align-self: flex-start;
  margin-top: 4px;
}

.btn-primary {
  grid-column: 1 / -1;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: var(--spacing-md);
}

.btn-secondary:hover {
  background-color: var(--secondary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.report-content {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--background-light);
  border-radius: var(--border-radius-md);
}

.report-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
  margin: var(--spacing-md) 0;
}

.report-card {
  padding: var(--spacing-md);
  background-color: var(--background-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
}

.report-suggestions {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--background-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
}

.logs-content {
  max-height: 300px;
  overflow-y: auto;
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--background-light);
  border-radius: var(--border-radius-md);
}

.log-entry {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color);
}

.log-timestamp {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .ai-config {
    padding: var(--spacing-lg);
  }
  
  .status-grid,
  .config-form,
  .report-grid {
    grid-template-columns: 1fr;
  }
}
</style>