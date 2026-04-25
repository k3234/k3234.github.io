// 多邻国AI系统实现
// 基于多邻国的Birdbrain认知引擎和生成式AI引擎混合架构

// 知识点掌握状态模型
class KnowledgeState {
  constructor(knowledgeId, initialMastery = 0) {
    this.knowledgeId = knowledgeId;
    this.mastery = initialMastery; // 0-100
    this.halfLife = 7; // 默认半衰期为7天
    this.lastPracticeTime = null;
    this.reactionTime = []; // 反应时间记录
    this.errorPatterns = []; // 错误模式
  }

  // 更新掌握度
  updateMastery(correct, reactionTime) {
    const now = Date.now();
    const timeSinceLastPractice = this.lastPracticeTime ? (now - this.lastPracticeTime) / (1000 * 60 * 60 * 24) : 0;
    
    // 考虑时间衰减
    const decayFactor = Math.exp(-Math.log(2) * timeSinceLastPractice / this.halfLife);
    let newMastery = this.mastery * decayFactor;
    
    // 根据答题结果调整掌握度
    if (correct) {
      // 答对：根据反应时间调整提升幅度
      const speedBonus = Math.max(0, 1 - reactionTime / 10); // 10秒为基准
      newMastery = Math.min(100, newMastery + 10 * speedBonus);
      // 调整半衰期：答对会延长半衰期
      this.halfLife = Math.min(30, this.halfLife * 1.1);
    } else {
      // 答错：降低掌握度
      newMastery = Math.max(0, newMastery - 15);
      // 调整半衰期：答错会缩短半衰期
      this.halfLife = Math.max(1, this.halfLife * 0.8);
      // 记录错误模式
      this.errorPatterns.push({
        timestamp: now,
        type: 'incorrect'
      });
    }
    
    // 记录反应时间
    this.reactionTime.push(reactionTime);
    if (this.reactionTime.length > 10) {
      this.reactionTime.shift(); // 只保留最近10次
    }
    
    this.mastery = newMastery;
    this.lastPracticeTime = now;
    
    return newMastery;
  }

  // 预测遗忘概率
  predictForgettingProbability() {
    if (!this.lastPracticeTime) return 0.5;
    
    const now = Date.now();
    const timeSinceLastPractice = (now - this.lastPracticeTime) / (1000 * 60 * 60 * 24);
    const decayFactor = Math.exp(-Math.log(2) * timeSinceLastPractice / this.halfLife);
    
    // 遗忘概率 = 1 - 掌握度 * 衰减因子
    return Math.min(1, 1 - (this.mastery / 100) * decayFactor);
  }

  // 计算推荐优先级
  calculatePriority() {
    const forgettingProbability = this.predictForgettingProbability();
    const avgReactionTime = this.reactionTime.length > 0 
      ? this.reactionTime.reduce((sum, time) => sum + time, 0) / this.reactionTime.length 
      : 5;
    
    // 优先级 = 遗忘概率 * 1.5 + (平均反应时间 / 10) * 0.5
    // 遗忘概率权重更高，反应时间作为辅助
    return Math.min(1, forgettingProbability * 1.5 + (avgReactionTime / 10) * 0.5);
  }
}

// Birdbrain认知引擎
class BirdbrainEngine {
  constructor() {
    this.userKnowledgeStates = new Map(); // userId -> Map(knowledgeId -> KnowledgeState)
    this.questionBank = new Map(); // questionId -> question
    this.knowledgeBank = new Map(); // knowledgeId -> knowledge
  }

  // 初始化用户知识状态
  initializeUserState(userId) {
    if (!this.userKnowledgeStates.has(userId)) {
      this.userKnowledgeStates.set(userId, new Map());
    }
  }

  // 添加知识点
  addKnowledge(knowledge) {
    this.knowledgeBank.set(knowledge.id, knowledge);
  }

  // 添加题目
  addQuestion(question) {
    this.questionBank.set(question.id, question);
  }

  // 记录用户互动
  recordInteraction(userId, questionId, correct, reactionTime) {
    this.initializeUserState(userId);
    const userState = this.userKnowledgeStates.get(userId);
    const question = this.questionBank.get(questionId);
    
    if (question) {
      // 更新相关知识点的掌握状态
      question.knowledgePoints.forEach(knowledgeId => {
        if (!userState.has(knowledgeId)) {
          userState.set(knowledgeId, new KnowledgeState(knowledgeId));
        }
        const knowledgeState = userState.get(knowledgeId);
        knowledgeState.updateMastery(correct, reactionTime);
      });
    }
  }

  // 预测用户成功概率
  predictSuccessProbability(userId, questionId) {
    this.initializeUserState(userId);
    const userState = this.userKnowledgeStates.get(userId);
    const question = this.questionBank.get(questionId);
    
    if (!question) return 0.5;
    
    // 计算相关知识点的平均掌握度
    let totalMastery = 0;
    let count = 0;
    
    question.knowledgePoints.forEach(knowledgeId => {
      if (userState.has(knowledgeId)) {
        totalMastery += userState.get(knowledgeId).mastery;
        count++;
      }
    });
    
    if (count === 0) return 0.5;
    
    const avgMastery = totalMastery / count / 100;
    // 考虑题目难度
    const difficultyFactor = {
      'easy': 1.2,
      'medium': 1.0,
      'hard': 0.8
    }[question.difficulty] || 1.0;
    
    // 成功概率 = 平均掌握度 * 难度因子
    return Math.min(1, Math.max(0, avgMastery * difficultyFactor));
  }

  // 选择最优题目
  selectOptimalQuestions(userId, subject, count = 5) {
    this.initializeUserState(userId);
    
    // 筛选该学科的题目
    const subjectQuestions = Array.from(this.questionBank.values())
      .filter(q => q.subject === subject);
    
    if (subjectQuestions.length === 0) return [];
    
    // 计算每个题目的推荐分数
    const scoredQuestions = subjectQuestions.map(question => {
      const successProbability = this.predictSuccessProbability(userId, question.id);
      // 目标成功概率在50%-80%之间
      const targetProbability = 0.65;
      const probabilityScore = 1 - Math.abs(successProbability - targetProbability);
      
      // 计算知识点优先级分数
      let knowledgePriorityScore = 0;
      const userState = this.userKnowledgeStates.get(userId);
      
      question.knowledgePoints.forEach(knowledgeId => {
        if (userState.has(knowledgeId)) {
          knowledgePriorityScore += userState.get(knowledgeId).calculatePriority();
        } else {
          // 新知识点，给予较高优先级
          knowledgePriorityScore += 0.8;
        }
      });
      
      knowledgePriorityScore /= question.knowledgePoints.length;
      
      // 综合分数：概率分数 * 0.6 + 知识点优先级 * 0.4
      const totalScore = probabilityScore * 0.6 + knowledgePriorityScore * 0.4;
      
      return {
        question,
        score: totalScore,
        successProbability
      };
    });
    
    // 按分数排序，选择前count个
    scoredQuestions.sort((a, b) => b.score - a.score);
    
    return scoredQuestions.slice(0, count).map(item => item.question);
  }

  // 生成个性化学习路径
  generateLearningPath(userId, subject) {
    this.initializeUserState(userId);
    const userState = this.userKnowledgeStates.get(userId);
    
    // 获取该学科的知识点
    const subjectKnowledge = Array.from(this.knowledgeBank.values())
      .filter(k => k.subject === subject);
    
    // 计算每个知识点的优先级
    const prioritizedKnowledge = subjectKnowledge.map(knowledge => {
      let priority = 0;
      
      if (userState.has(knowledge.id)) {
        const knowledgeState = userState.get(knowledge.id);
        priority = knowledgeState.calculatePriority();
      } else {
        // 新知识点，根据难度调整优先级
        const difficultyPriority = {
          'easy': 0.7,
          'medium': 0.5,
          'hard': 0.3
        }[knowledge.difficulty] || 0.5;
        priority = difficultyPriority;
      }
      
      return {
        knowledge,
        priority
      };
    });
    
    // 按优先级排序
    prioritizedKnowledge.sort((a, b) => b.priority - a.priority);
    
    // 生成学习路径
    const learningPath = prioritizedKnowledge.map(item => ({
      id: item.knowledge.id,
      title: item.knowledge.title,
      difficulty: item.knowledge.difficulty,
      priority: item.priority,
      mastery: userState.has(item.knowledge.id) ? userState.get(item.knowledge.id).mastery : 0
    }));
    
    return learningPath;
  }

  // 获取用户知识状态
  getUserKnowledgeState(userId) {
    this.initializeUserState(userId);
    const userState = this.userKnowledgeStates.get(userId);
    
    const state = {};
    userState.forEach((knowledgeState, knowledgeId) => {
      state[knowledgeId] = {
        mastery: knowledgeState.mastery,
        halfLife: knowledgeState.halfLife,
        lastPracticeTime: knowledgeState.lastPracticeTime,
        forgettingProbability: knowledgeState.predictForgettingProbability(),
        priority: knowledgeState.calculatePriority()
      };
    });
    
    return state;
  }
}

// 生成式AI引擎
class GenerativeAIEngine {
  constructor() {
    // 模拟生成式AI功能
    this.responseTemplates = {
      roleplay: [
        "你正在练习{topic}。试着用{language}回答下面的问题：{question}",
        "想象你在{scenario}，用{language}怎么说：{question}",
        "让我们练习{topic}。请用{language}回答：{question}"
      ],
      explanation: [
        "你错在{error}。正确的应该是{correct}，因为{reason}",
        "这个问题的正确答案是{correct}。原因是{reason}",
        "让我解释一下：{correct}。这是因为{reason}"
      ],
      feedback: [
        "做得很好！你掌握了{knowledge}的核心概念",
        "不错的尝试！再注意一下{point}会更好",
        "很好的进步！继续保持这种学习状态"
      ]
    };
  }

  // 生成角色扮演对话
  generateRoleplay(topic, scenario, question, language = '中文') {
    const template = this.responseTemplates.roleplay[Math.floor(Math.random() * this.responseTemplates.roleplay.length)];
    return template
      .replace('{topic}', topic)
      .replace('{scenario}', scenario)
      .replace('{question}', question)
      .replace('{language}', language);
  }

  // 生成错题解释
  generateExplanation(question, userAnswer, correctAnswer, reason) {
    const template = this.responseTemplates.explanation[Math.floor(Math.random() * this.responseTemplates.explanation.length)];
    return template
      .replace('{error}', userAnswer || '理解有误')
      .replace('{correct}', correctAnswer)
      .replace('{reason}', reason);
  }

  // 生成学习反馈
  generateFeedback(knowledge, performance) {
    const template = this.responseTemplates.feedback[Math.floor(Math.random() * this.responseTemplates.feedback.length)];
    return template
      .replace('{knowledge}', knowledge)
      .replace('{point}', performance.point || '细节');
  }

  // 生成练习题目
  generatePracticeQuestion(knowledge, difficulty) {
    // 这里只是模拟，实际应用中会使用更复杂的生成逻辑
    return {
      id: `generated-${Date.now()}`,
      content: `关于${knowledge.title}的${difficulty}难度题目`,
      options: [],
      answer: '正确答案',
      explanation: `这道题考查${knowledge.title}的核心概念`,
      difficulty: difficulty,
      subject: knowledge.subject,
      knowledgePoints: [knowledge.id]
    };
  }
}

// 多邻国AI系统主类
class DuolingoAISystem {
  constructor() {
    this.birdbrain = new BirdbrainEngine();
    this.generativeAI = new GenerativeAIEngine();
  }

  // 初始化系统
  initialize() {
    console.log('多邻国AI系统初始化完成');
  }

  // 添加知识点
  addKnowledge(knowledge) {
    this.birdbrain.addKnowledge(knowledge);
  }

  // 添加题目
  addQuestion(question) {
    this.birdbrain.addQuestion(question);
  }

  // 记录用户互动
  recordInteraction(userId, questionId, correct, reactionTime) {
    this.birdbrain.recordInteraction(userId, questionId, correct, reactionTime);
  }

  // 获取个性化练习题目
  getPersonalizedQuestions(userId, subject, count = 5) {
    return this.birdbrain.selectOptimalQuestions(userId, subject, count);
  }

  // 获取个性化学习路径
  getLearningPath(userId, subject) {
    return this.birdbrain.generateLearningPath(userId, subject);
  }

  // 获取用户知识状态
  getUserKnowledgeState(userId) {
    return this.birdbrain.getUserKnowledgeState(userId);
  }

  // 生成角色扮演对话
  generateRoleplay(topic, scenario, question, language = '中文') {
    return this.generativeAI.generateRoleplay(topic, scenario, question, language);
  }

  // 生成错题解释
  generateExplanation(question, userAnswer, correctAnswer, reason) {
    return this.generativeAI.generateExplanation(question, userAnswer, correctAnswer, reason);
  }

  // 生成学习反馈
  generateFeedback(knowledge, performance) {
    return this.generativeAI.generateFeedback(knowledge, performance);
  }

  // 生成练习题目
  generatePracticeQuestion(knowledge, difficulty) {
    return this.generativeAI.generatePracticeQuestion(knowledge, difficulty);
  }
}

// 导出单例实例
export const duolingoAI = new DuolingoAISystem();

// 初始化函数
export const initializeDuolingoAI = () => {
  duolingoAI.initialize();
  console.log('多邻国AI系统初始化完成');
};

// 测试函数
export const testDuolingoAI = () => {
  console.log('测试多邻国AI系统...');
  
  // 模拟知识点
  const knowledgePoints = [
    { id: 'math-1', title: '函数的单调性', difficulty: 'medium', subject: 'math' },
    { id: 'math-2', title: '三角函数的图像', difficulty: 'medium', subject: 'math' },
    { id: 'math-3', title: '立体几何', difficulty: 'hard', subject: 'math' },
    { id: 'physics-1', title: '牛顿运动定律', difficulty: 'medium', subject: 'physics' }
  ];
  
  // 模拟题目
  const questions = [
    {
      id: 'math-q1',
      content: '已知函数f(x) = x³ - 3x，讨论其单调性。',
      options: [],
      answer: '求导得f\'(x) = 3x² - 3 = 3(x² - 1)，令f\'(x) > 0，解得x > 1或x < -1，此时函数单调递增；令f\'(x) < 0，解得-1 < x < 1，此时函数单调递减。',
      explanation: '利用导数判断函数单调性是高考重点内容，需要掌握导数的计算和符号判断。',
      difficulty: 'medium',
      subject: 'math',
      knowledgePoints: ['math-1']
    },
    {
      id: 'math-q2',
      content: '画出函数y = 2sin(2x + π/3)的图像，并指出其周期、振幅和相位。',
      options: [],
      answer: '周期T = 2π/2 = π，振幅A = 2，相位φ = π/3。图像可以通过将y = sinx的图像先向左平移π/3个单位，再将横坐标压缩为原来的1/2，最后将纵坐标拉伸为原来的2倍得到。',
      explanation: '三角函数的图像变换是高考高频考点，需要掌握平移、伸缩等变换规律。',
      difficulty: 'medium',
      subject: 'math',
      knowledgePoints: ['math-2']
    },
    {
      id: 'physics-q1',
      content: '一个质量为2kg的物体，在水平面上受到水平向右的拉力F = 10N，物体与水平面间的动摩擦因数μ = 0.2，求物体的加速度。',
      options: [],
      answer: '物体受到的摩擦力f = μmg = 0.2 × 2 × 9.8 = 3.92N，根据牛顿第二定律，F - f = ma，解得a = (10 - 3.92)/2 = 3.04m/s²。',
      explanation: '牛顿运动定律是力学的核心内容，需要掌握受力分析和加速度计算。',
      difficulty: 'medium',
      subject: 'physics',
      knowledgePoints: ['physics-1']
    }
  ];
  
  // 添加知识点和题目
  knowledgePoints.forEach(kp => duolingoAI.addKnowledge(kp));
  questions.forEach(q => duolingoAI.addQuestion(q));
  
  // 模拟用户交互
  const userId = 'user1';
  duolingoAI.recordInteraction(userId, 'math-q1', false, 8); // 答错，反应时间8秒
  duolingoAI.recordInteraction(userId, 'math-q1', true, 5); // 答对，反应时间5秒
  duolingoAI.recordInteraction(userId, 'math-q2', true, 3); // 答对，反应时间3秒
  
  // 测试个性化题目选择
  console.log('个性化题目选择:', duolingoAI.getPersonalizedQuestions(userId, 'math', 2));
  
  // 测试学习路径生成
  console.log('学习路径生成:', duolingoAI.getLearningPath(userId, 'math'));
  
  // 测试用户知识状态
  console.log('用户知识状态:', duolingoAI.getUserKnowledgeState(userId));
  
  // 测试生成式AI功能
  console.log('角色扮演生成:', duolingoAI.generateRoleplay('函数单调性', '课堂提问', '如何判断函数的单调性？'));
  console.log('错题解释生成:', duolingoAI.generateExplanation('math-q1', '求导错误', '正确答案', '导数计算错误，应该是3x² - 3'));
  console.log('学习反馈生成:', duolingoAI.generateFeedback('函数的单调性', { point: '导数符号的判断' }));
  
  return {
    personalizedQuestions: duolingoAI.getPersonalizedQuestions(userId, 'math', 2),
    learningPath: duolingoAI.getLearningPath(userId, 'math'),
    userKnowledgeState: duolingoAI.getUserKnowledgeState(userId)
  };
};