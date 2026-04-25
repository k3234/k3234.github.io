// AI测试脚本
// 用于生成100000次知识点和题目展示结果

// 导入知识管理系统
import fs from 'fs';
import path from 'path';

// 模拟知识管理系统的简化版本
class MockAIKnowledgeManager {
  constructor() {
    this.knowledgePoints = new Map();
    this.questions = new Map();
    this.userInteractions = [];
    this.userProfiles = new Map();
    this.initializeData();
  }

  // 初始化数据
  initializeData() {
    // 模拟知识点数据
    const knowledgePoints = [
      { id: 'math-1', title: '函数的单调性', difficulty: 'medium', subject: 'math' },
      { id: 'math-2', title: '三角函数的图像', difficulty: 'medium', subject: 'math' },
      { id: 'math-3', title: '立体几何', difficulty: 'hard', subject: 'math' },
      { id: 'math-4', title: '圆锥曲线', difficulty: 'hard', subject: 'math' },
      { id: 'math-5', title: '数列', difficulty: 'medium', subject: 'math' },
      { id: 'physics-1', title: '牛顿运动定律', difficulty: 'medium', subject: 'physics' },
      { id: 'physics-2', title: '电磁感应', difficulty: 'hard', subject: 'physics' },
      { id: 'physics-3', title: '动量守恒定律', difficulty: 'medium', subject: 'physics' },
      { id: 'physics-4', title: '能量守恒定律', difficulty: 'medium', subject: 'physics' },
      { id: 'physics-5', title: '电路分析', difficulty: 'medium', subject: 'physics' },
      { id: 'chemistry-1', title: '化学计量', difficulty: 'easy', subject: 'chemistry' },
      { id: 'chemistry-2', title: '元素周期表', difficulty: 'medium', subject: 'chemistry' },
      { id: 'chemistry-3', title: '化学反应速率', difficulty: 'medium', subject: 'chemistry' },
      { id: 'chemistry-4', title: '化学平衡', difficulty: 'hard', subject: 'chemistry' },
      { id: 'chemistry-5', title: '有机化学', difficulty: 'hard', subject: 'chemistry' },
      { id: 'biology-1', title: '细胞结构', difficulty: 'easy', subject: 'biology' },
      { id: 'biology-2', title: '遗传规律', difficulty: 'hard', subject: 'biology' },
      { id: 'biology-3', title: '光合作用', difficulty: 'medium', subject: 'biology' },
      { id: 'biology-4', title: '细胞呼吸', difficulty: 'medium', subject: 'biology' },
      { id: 'biology-5', title: '生态系统', difficulty: 'medium', subject: 'biology' }
    ];

    // 模拟题目数据
    const questions = [
      { id: 'math-q1', content: '已知函数f(x) = x³ - 3x，讨论其单调性。', difficulty: 'medium', subject: 'math', knowledgePoints: ['math-1'] },
      { id: 'math-q2', content: '画出函数y = 2sin(2x + π/3)的图像，并指出其周期、振幅和相位。', difficulty: 'medium', subject: 'math', knowledgePoints: ['math-2'] },
      { id: 'math-q3', content: '已知椭圆的长轴长为8，焦距为4，求椭圆的标准方程。', difficulty: 'medium', subject: 'math', knowledgePoints: ['math-4'] },
      { id: 'physics-q1', content: '一个质量为2kg的物体，在水平面上受到水平向右的拉力F = 10N，物体与水平面间的动摩擦因数μ = 0.2，求物体的加速度。', difficulty: 'medium', subject: 'physics', knowledgePoints: ['physics-1'] },
      { id: 'physics-q2', content: '一个闭合线圈在匀强磁场中以角速度ω匀速转动，线圈面积为S，磁感应强度为B，求线圈中产生的感应电动势的最大值。', difficulty: 'medium', subject: 'physics', knowledgePoints: ['physics-2'] },
      { id: 'chemistry-q1', content: '计算0.1mol/L NaOH溶液的pH值。', difficulty: 'easy', subject: 'chemistry', knowledgePoints: ['chemistry-1'] },
      { id: 'chemistry-q2', content: '写出乙烯与溴水反应的化学方程式，并指出反应类型。', difficulty: 'medium', subject: 'chemistry', knowledgePoints: ['chemistry-5'] },
      { id: 'biology-q1', content: '简述DNA复制的过程。', difficulty: 'medium', subject: 'biology', knowledgePoints: ['biology-2'] },
      { id: 'biology-q2', content: '简述光合作用的光反应和暗反应过程。', difficulty: 'medium', subject: 'biology', knowledgePoints: ['biology-3'] }
    ];

    // 初始化知识点
    knowledgePoints.forEach(kp => {
      this.knowledgePoints.set(kp.id, {
        ...kp,
        errorRate: 0,
        masteryLevel: 0,
        relatedQuestions: []
      });
    });

    // 初始化题目
    questions.forEach(q => {
      this.questions.set(q.id, {
        ...q,
        errorRate: 0,
        attemptCount: 0,
        correctCount: 0
      });
      
      // 更新相关知识点的题目关联
      q.knowledgePoints.forEach(kpId => {
        const kp = this.knowledgePoints.get(kpId);
        if (kp) {
          kp.relatedQuestions.push(q.id);
        }
      });
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
        masteryLevels: new Map(),
        errorPatterns: [],
        learningHistory: [],
        preferences: {}
      });
    }
    
    const userProfile = this.userProfiles.get(userId);
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
        question.errorRate = (question.attemptCount - question.correctCount) / question.attemptCount;
        
        // 更新相关知识点的错误率
        question.knowledgePoints.forEach(kpId => {
          const kp = this.knowledgePoints.get(kpId);
          if (kp) {
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

  // 获取用户档案
  getUserProfile(userId) {
    return this.userProfiles.get(userId);
  }
}

// 生成随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成随机时间戳
function getRandomTimestamp() {
  const now = Date.now();
  const daysAgo = getRandomInt(0, 30);
  return now - (daysAgo * 24 * 60 * 60 * 1000);
}

// 生成随机用户ID
function getRandomUserId() {
  return `user${getRandomInt(1, 1000)}`;
}

// 生成随机知识点ID
function getRandomKnowledgePointId() {
  const subjects = ['math', 'physics', 'chemistry', 'biology'];
  const subject = subjects[getRandomInt(0, subjects.length - 1)];
  const kpId = `${subject}-${getRandomInt(1, 5)}`;
  return kpId;
}

// 生成随机题目ID
function getRandomQuestionId() {
  const subjects = ['math', 'physics', 'chemistry', 'biology'];
  const subject = subjects[getRandomInt(0, subjects.length - 1)];
  const qId = `${subject}-q${getRandomInt(1, 3)}`;
  return qId;
}

// 生成随机结果
function getRandomResult() {
  const results = ['correct', 'incorrect'];
  return results[getRandomInt(0, 1)];
}

// 生成随机动作
function getRandomAction() {
  const actions = ['view', 'attempt', 'answer'];
  return actions[getRandomInt(0, 2)];
}

// 生成随机内容类型
function getRandomContentType() {
  const types = ['knowledge', 'question'];
  return types[getRandomInt(0, 1)];
}

// 模拟知识点和题目展示
function simulateContentDisplay() {
  // 初始化知识管理系统
  const aiKnowledgeManager = new MockAIKnowledgeManager();
  
  console.log('开始模拟100000次知识点和题目展示...');
  
  const startTime = Date.now();
  
  // 模拟100000次展示
  for (let i = 0; i < 100000; i++) {
    // 生成随机用户ID
    const userId = getRandomUserId();
    
    // 随机选择内容类型
    const contentType = getRandomContentType();
    
    // 根据内容类型生成相应的ID
    let contentId;
    if (contentType === 'knowledge') {
      contentId = getRandomKnowledgePointId();
    } else {
      contentId = getRandomQuestionId();
    }
    
    // 生成随机动作
    const action = getRandomAction();
    
    // 生成随机时间戳
    const timestamp = getRandomTimestamp();
    
    // 生成随机结果（仅当动作为answer时）
    let result = null;
    if (action === 'answer') {
      result = getRandomResult();
    }
    
    // 创建用户交互对象
    const interaction = {
      userId,
      contentId,
      contentType,
      action,
      timestamp,
      result
    };
    
    // 记录交互
    try {
      aiKnowledgeManager.recordInteraction(interaction);
    } catch (error) {
      // 忽略无效的内容ID
      continue;
    }
    
    // 每10000次展示输出一次进度
    if ((i + 1) % 10000 === 0) {
      console.log(`已完成 ${i + 1} 次展示`);
    }
  }
  
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  
  console.log(`模拟完成，耗时 ${duration.toFixed(2)} 秒`);
  
  // 分析结果
  analyzeResults(aiKnowledgeManager);
}

// 分析结果
function analyzeResults(aiKnowledgeManager) {
  console.log('\n分析结果：');
  
  // 获取所有用户ID
  const userIds = Array.from(aiKnowledgeManager.userProfiles.keys());
  console.log(`总用户数：${userIds.length}`);
  
  // 统计知识点和题目数量
  console.log(`知识点数量：${aiKnowledgeManager.knowledgePoints.size}`);
  console.log(`题目数量：${aiKnowledgeManager.questions.size}`);
  
  // 统计用户交互次数
  console.log(`总交互次数：${aiKnowledgeManager.userInteractions.length}`);
  
  // 统计每种内容类型的交互次数
  const contentTypeStats = {
    knowledge: 0,
    question: 0
  };
  
  aiKnowledgeManager.userInteractions.forEach(interaction => {
    contentTypeStats[interaction.contentType]++;
  });
  
  console.log('内容类型分布：');
  console.log(`知识点：${contentTypeStats.knowledge}次`);
  console.log(`题目：${contentTypeStats.question}次`);
  
  // 统计每种动作的次数
  const actionStats = {
    view: 0,
    attempt: 0,
    answer: 0
  };
  
  aiKnowledgeManager.userInteractions.forEach(interaction => {
    actionStats[interaction.action]++;
  });
  
  console.log('动作分布：');
  console.log(`查看：${actionStats.view}次`);
  console.log(`尝试：${actionStats.attempt}次`);
  console.log(`回答：${actionStats.answer}次`);
  
  // 统计题目回答结果
  const answerStats = {
    correct: 0,
    incorrect: 0
  };
  
  aiKnowledgeManager.userInteractions.forEach(interaction => {
    if (interaction.action === 'answer' && interaction.result) {
      answerStats[interaction.result]++;
    }
  });
  
  console.log('回答结果分布：');
  console.log(`正确：${answerStats.correct}次`);
  console.log(`错误：${answerStats.incorrect}次`);
  
  // 计算正确率
  if (answerStats.correct + answerStats.incorrect > 0) {
    const correctRate = (answerStats.correct / (answerStats.correct + answerStats.incorrect)) * 100;
    console.log(`正确率：${correctRate.toFixed(2)}%`);
  }
  
  // 分析用户掌握程度
  console.log('\n用户掌握程度分析：');
  
  // 计算平均掌握程度
  let totalMastery = 0;
  let masteryCount = 0;
  
  userIds.forEach(userId => {
    const userProfile = aiKnowledgeManager.getUserProfile(userId);
    if (userProfile && userProfile.masteryLevels.size > 0) {
      userProfile.masteryLevels.forEach(level => {
        totalMastery += level;
        masteryCount++;
      });
    }
  });
  
  if (masteryCount > 0) {
    const avgMastery = totalMastery / masteryCount;
    console.log(`所有用户的平均掌握程度：${avgMastery.toFixed(2)}%`);
  }
  
  // 分析题目错误率
  console.log('\n题目错误率分析：');
  
  let totalErrorRate = 0;
  let errorRateCount = 0;
  
  aiKnowledgeManager.questions.forEach((question, id) => {
    if (question.attemptCount > 0) {
      const errorRate = (1 - question.correctCount / question.attemptCount) * 100;
      totalErrorRate += errorRate;
      errorRateCount++;
      console.log(`题目 ${id} 的错误率：${errorRate.toFixed(2)}%`);
    }
  });
  
  if (errorRateCount > 0) {
    const avgErrorRate = totalErrorRate / errorRateCount;
    console.log(`所有题目的平均错误率：${avgErrorRate.toFixed(2)}%`);
  }
  
  // 分析知识点错误率
  console.log('\n知识点错误率分析：');
  
  let totalKpErrorRate = 0;
  let kpErrorRateCount = 0;
  
  aiKnowledgeManager.knowledgePoints.forEach((knowledgePoint, id) => {
    const errorRate = knowledgePoint.errorRate * 100;
    totalKpErrorRate += errorRate;
    kpErrorRateCount++;
    console.log(`知识点 ${id} 的错误率：${errorRate.toFixed(2)}%`);
  });
  
  if (kpErrorRateCount > 0) {
    const avgKpErrorRate = totalKpErrorRate / kpErrorRateCount;
    console.log(`所有知识点的平均错误率：${avgKpErrorRate.toFixed(2)}%`);
  }
  
  // 保存结果到文件
  saveResults(aiKnowledgeManager);
}

// 保存结果到文件
function saveResults(aiKnowledgeManager) {
  const results = {
    totalUsers: aiKnowledgeManager.userProfiles.size,
    totalInteractions: aiKnowledgeManager.userInteractions.length,
    knowledgePointsCount: aiKnowledgeManager.knowledgePoints.size,
    questionsCount: aiKnowledgeManager.questions.size,
    contentDistribution: {
      knowledge: aiKnowledgeManager.userInteractions.filter(i => i.contentType === 'knowledge').length,
      question: aiKnowledgeManager.userInteractions.filter(i => i.contentType === 'question').length
    },
    actionDistribution: {
      view: aiKnowledgeManager.userInteractions.filter(i => i.action === 'view').length,
      attempt: aiKnowledgeManager.userInteractions.filter(i => i.action === 'attempt').length,
      answer: aiKnowledgeManager.userInteractions.filter(i => i.action === 'answer').length
    },
    answerResults: {
      correct: aiKnowledgeManager.userInteractions.filter(i => i.action === 'answer' && i.result === 'correct').length,
      incorrect: aiKnowledgeManager.userInteractions.filter(i => i.action === 'answer' && i.result === 'incorrect').length
    },
    questionsErrorRate: {},
    knowledgePointsErrorRate: {}
  };
  
  // 计算正确率
  if (results.answerResults.correct + results.answerResults.incorrect > 0) {
    results.correctRate = (results.answerResults.correct / (results.answerResults.correct + results.answerResults.incorrect)) * 100;
  }
  
  // 计算题目错误率
  aiKnowledgeManager.questions.forEach((question, id) => {
    if (question.attemptCount > 0) {
      results.questionsErrorRate[id] = (1 - question.correctCount / question.attemptCount) * 100;
    }
  });
  
  // 计算知识点错误率
  aiKnowledgeManager.knowledgePoints.forEach((knowledgePoint, id) => {
    results.knowledgePointsErrorRate[id] = knowledgePoint.errorRate * 100;
  });
  
  // 保存到文件
  const outputPath = path.join('src', 'data', 'ai_test_results.json');
  
  // 确保目录存在
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n测试结果已保存到：${outputPath}`);
}

// 执行模拟
simulateContentDisplay();

// 导出函数
export { simulateContentDisplay, analyzeResults };