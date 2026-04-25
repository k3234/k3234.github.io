import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/variables.css'
import './assets/animations.css'
import { initializeMockData as initializeAI } from './services/aiKnowledgeManagement'
import { initializeMockData as initializeProgress } from './services/progressMonitoring'
import { initializeMockData as initializeGamification } from './services/gamification'
import { initializeDuolingoAI } from './services/duolingoAISystem'
import { initializeAuth } from './services/authService'
import { initializeRecommendationService } from './services/contentRecommendationService'
import { initializeAutonomousLearningAI } from './services/autonomousLearningAI'
import { initializeAIModel } from './services/aiModelIntegration'
import audioService from './services/audioService'

// 初始化AI知识管理系统
initializeAI()

// 初始化进度监控系统
initializeProgress()

// 初始化游戏化系统
initializeGamification()

// 初始化多邻国AI系统
initializeDuolingoAI()

// 初始化用户认证系统
initializeAuth()

// 初始化学习知识推流系统
initializeRecommendationService()

// 初始化自主学习与进化的AI逻辑模块
initializeAutonomousLearningAI()

// 初始化AI模型集成服务
import { aiModelIntegration } from './services/aiModelIntegration'
initializeAIModel()

// 设置DeepSeek API密钥
aiModelIntegration.setApiKey('deepseek', 'sk-1c6518f9bca34518a9328e78eb02b641')

// 初始化音效服务
audioService.preloadSounds()

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 全局注册音效服务
app.config.globalProperties.$audioService = audioService

app.mount('#app')