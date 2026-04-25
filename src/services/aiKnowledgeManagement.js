// AI知识管理系统

// 导入配置文件
import { knowledgePointsConfig, questionsConfig } from '../config/contentConfig';

// 知识点模型
class KnowledgePoint {
  constructor(id, title, content, difficulty, subject, tags = []) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.difficulty = difficulty; // easy, medium, hard
    this.subject = subject;
    this.tags = tags;
    this.errorRate = 0; // 错误率
    this.masteryLevel = 0; // 掌握程度 0-100
    this.relatedQuestions = [];
  }
}

// 题目模型
class Question {
  constructor(id, content, options, answer, explanation, difficulty, subject, knowledgePoints = []) {
    this.id = id;
    this.content = content;
    this.options = options;
    this.answer = answer;
    this.explanation = explanation;
    this.difficulty = difficulty;
    this.subject = subject;
    this.knowledgePoints = knowledgePoints;
    this.errorRate = 0;
    this.attemptCount = 0;
    this.correctCount = 0;
  }
}

// 用户交互数据模型
class UserInteraction {
  constructor(userId, contentId, contentType, action, timestamp, result = null) {
    this.userId = userId;
    this.contentId = contentId;
    this.contentType = contentType; // knowledge, question
    this.action = action; // view, attempt, answer
    this.timestamp = timestamp;
    this.result = result; // correct, incorrect, null
  }
}

// AI知识管理系统类
class AIKnowledgeManagement {
  constructor() {
    this.knowledgePoints = new Map(); // 知识点集合
    this.questions = new Map(); // 题目集合
    this.userInteractions = []; // 用户交互数据
    this.userProfiles = new Map(); // 用户档案
  }

  // 收集知识点
  addKnowledgePoint(knowledgePoint) {
    this.knowledgePoints.set(knowledgePoint.id, knowledgePoint);
  }

  // 收集题目
  addQuestion(question) {
    this.questions.set(question.id, question);
    // 更新相关知识点的题目关联
    question.knowledgePoints.forEach(kpId => {
      const kp = this.knowledgePoints.get(kpId);
      if (kp) {
        kp.relatedQuestions.push(question.id);
      }
    });
  }

  // 记录用户交互
  recordInteraction(interaction) {
    this.userInteractions.push(interaction);
    
    // 更新用户档案
    this.updateUserProfile(interaction);
    
    // 更新内容数据
    this.updateContentData(interaction);
  }

  // 更新用户档案
  updateUserProfile(interaction) {
    const { userId, contentId, contentType, result } = interaction;
    
    if (!this.userProfiles.has(userId)) {
      this.userProfiles.set(userId, {
        id: userId,
        masteryLevels: new Map(), // 知识点掌握程度
        errorPatterns: [], // 错误模式
        learningHistory: [], // 学习历史
        preferences: {} // 学习偏好
      });
    }
    
    const userProfile = this.userProfiles.get(userId);
    
    // 更新学习历史
    userProfile.learningHistory.push(interaction);
    
    // 更新知识点掌握程度
    if (contentType === 'question') {
      const question = this.questions.get(contentId);
      if (question) {
        question.knowledgePoints.forEach(kpId => {
          const currentLevel = userProfile.masteryLevels.get(kpId) || 0;
          let newLevel = currentLevel;
          
          if (result === 'correct') {
            newLevel = Math.min(100, currentLevel + 10);
          } else if (result === 'incorrect') {
            newLevel = Math.max(0, currentLevel - 5);
            // 记录错误模式
            userProfile.errorPatterns.push({
              knowledgePointId: kpId,
              questionId: contentId,
              timestamp: interaction.timestamp
            });
          }
          
          userProfile.masteryLevels.set(kpId, newLevel);
        });
      }
    }
  }

  // 更新内容数据
  updateContentData(interaction) {
    const { contentId, contentType, result } = interaction;
    
    if (contentType === 'question') {
      const question = this.questions.get(contentId);
      if (question) {
        question.attemptCount++;
        if (result === 'correct') {
          question.correctCount++;
        }
        // 更新错误率
        question.errorRate = (question.attemptCount - question.correctCount) / question.attemptCount;
        
        // 更新相关知识点的错误率
        question.knowledgePoints.forEach(kpId => {
          const kp = this.knowledgePoints.get(kpId);
          if (kp) {
            // 简单计算：基于相关题目的平均错误率
            const relatedQuestions = kp.relatedQuestions.map(id => this.questions.get(id)).filter(q => q);
            if (relatedQuestions.length > 0) {
              const avgErrorRate = relatedQuestions.reduce((sum, q) => sum + q.errorRate, 0) / relatedQuestions.length;
              kp.errorRate = avgErrorRate;
            }
          }
        });
      }
    }
  }

  // 分析用户错误模式
  analyzeErrorPatterns(userId) {
    const userProfile = this.userProfiles.get(userId);
    if (!userProfile) return [];
    
    // 按知识点分组错误
    const errorGroups = {};
    
    userProfile.errorPatterns.forEach(error => {
      if (!errorGroups[error.knowledgePointId]) {
        errorGroups[error.knowledgePointId] = [];
      }
      errorGroups[error.knowledgePointId].push(error);
    });
    
    // 计算每个知识点的错误频率
    const errorPatterns = Object.entries(errorGroups).map(([kpId, errors]) => {
      const knowledgePoint = this.knowledgePoints.get(kpId);
      return {
        knowledgePointId: kpId,
        knowledgePointTitle: knowledgePoint ? knowledgePoint.title : 'Unknown',
        errorCount: errors.length,
        lastErrorTimestamp: Math.max(...errors.map(e => e.timestamp))
      };
    });
    
    // 按错误频率排序
    return errorPatterns.sort((a, b) => b.errorCount - a.errorCount);
  }

  // 内容优先级排序
  prioritizeContent(userId) {
    const userProfile = this.userProfiles.get(userId);
    if (!userProfile) return [];
    
    // 1. 收集用户易错概念和题目
    const errorPatterns = this.analyzeErrorPatterns(userId);
    const errorProneContent = errorPatterns.map(pattern => ({
      type: 'knowledge',
      id: pattern.knowledgePointId,
      title: pattern.knowledgePointTitle,
      priority: 'high',
      reason: '易错概念'
    }));
    
    // 2. 收集核心重点知识
    const coreKnowledge = Array.from(this.knowledgePoints.values())
      .filter(kp => kp.tags.includes('core'))
      .map(kp => ({
        type: 'knowledge',
        id: kp.id,
        title: kp.title,
        priority: 'medium',
        reason: '核心知识'
      }));
    
    // 3. 收集难点内容
    const difficultContent = Array.from(this.knowledgePoints.values())
      .filter(kp => kp.difficulty === 'hard')
      .map(kp => ({
        type: 'knowledge',
        id: kp.id,
        title: kp.title,
        priority: 'low',
        reason: '难点内容'
      }));
    
    // 合并并去重
    const allContent = [...errorProneContent, ...coreKnowledge, ...difficultContent];
    const uniqueContent = [];
    const seenIds = new Set();
    
    for (const content of allContent) {
      if (!seenIds.has(content.id)) {
        seenIds.add(content.id);
        uniqueContent.push(content);
      }
    }
    
    // 按优先级排序
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return uniqueContent.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  // 生成个性化学习推荐
  generatePersonalizedRecommendations(userId) {
    const userProfile = this.userProfiles.get(userId);
    if (!userProfile) return [];
    
    // 获取优先级排序的内容
    const prioritizedContent = this.prioritizeContent(userId);
    
    // 为每个内容生成推荐理由
    const recommendations = prioritizedContent.map(content => {
      let recommendationReason = '';
      
      if (content.priority === 'high') {
        recommendationReason = '您在该知识点上有较多错误，建议重点复习';
      } else if (content.priority === 'medium') {
        recommendationReason = '这是核心知识点，对考试非常重要';
      } else {
        recommendationReason = '这是难点内容，需要加强理解';
      }
      
      return {
        ...content,
        recommendationReason
      };
    });
    
    return recommendations;
  }

  // 获取知识点详情
  getKnowledgePoint(id) {
    return this.knowledgePoints.get(id);
  }

  // 获取题目详情
  getQuestion(id) {
    return this.questions.get(id);
  }

  // 获取用户档案
  getUserProfile(userId) {
    return this.userProfiles.get(userId);
  }
}

// 导出单例实例
export const aiKnowledgeManager = new AIKnowledgeManagement();

// 初始化数据
export const initializeData = () => {
  // 初始化知识点
  Object.entries(knowledgePointsConfig).forEach(([subject, points]) => {
    points.forEach(point => {
      const knowledgePoint = new KnowledgePoint(
        point.id,
        point.title,
        point.content,
        point.difficulty,
        subject,
        point.tags
      );
      aiKnowledgeManager.addKnowledgePoint(knowledgePoint);
    });
  });
  
  // 初始化题目
  Object.entries(questionsConfig).forEach(([subject, qs]) => {
    qs.forEach(q => {
      const question = new Question(
        q.id,
        q.content,
        q.options,
        q.answer,
        q.explanation,
        q.difficulty,
        subject,
        q.knowledgePoints
      );
      aiKnowledgeManager.addQuestion(question);
    });
  });
  
  // 模拟用户交互数据
  const userId = 'user1';
  const timestamp = Date.now();
  
  // 模拟用户错误
  aiKnowledgeManager.recordInteraction(new UserInteraction(userId, 'math-q1', 'question', 'answer', timestamp - 3600000, 'incorrect'));
  aiKnowledgeManager.recordInteraction(new UserInteraction(userId, 'math-q1', 'question', 'answer', timestamp - 1800000, 'incorrect'));
  aiKnowledgeManager.recordInteraction(new UserInteraction(userId, 'math-q2', 'question', 'answer', timestamp - 1200000, 'correct'));
  aiKnowledgeManager.recordInteraction(new UserInteraction(userId, 'physics-q1', 'question', 'answer', timestamp - 600000, 'incorrect'));
  
  console.log('AI知识管理系统初始化完成');
};

// 模拟数据初始化（保持向后兼容）
export const initializeMockData = initializeData;

// 测试函数
export const testAIKnowledgeManagement = () => {
  console.log('测试AI知识管理系统...');
  initializeMockData();
  
  const userId = 'user1';
  
  console.log('用户错误模式分析:', aiKnowledgeManager.analyzeErrorPatterns(userId));
  console.log('内容优先级排序:', aiKnowledgeManager.prioritizeContent(userId));
  console.log('个性化学习推荐:', aiKnowledgeManager.generatePersonalizedRecommendations(userId));
  
  return {
    errorPatterns: aiKnowledgeManager.analyzeErrorPatterns(userId),
    prioritizedContent: aiKnowledgeManager.prioritizeContent(userId),
    recommendations: aiKnowledgeManager.generatePersonalizedRecommendations(userId)
  };
};