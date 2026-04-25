// 进度监控系统

// 用户学习数据模型
class UserLearningData {
  constructor(userId) {
    this.userId = userId;
    this.learningSessions = []; // 学习会话记录
    this.knowledgeMastery = new Map(); // 知识点掌握程度
    this.gradeProgress = new Map(); // 年级进度
    this.subjectProgress = new Map(); // 学科进度
    this.weakAreas = []; // 薄弱环节
    this.strongAreas = []; // 优势环节
  }

  // 记录学习会话
  addLearningSession(session) {
    this.learningSessions.push(session);
    // 更新知识点掌握程度
    this.updateKnowledgeMastery(session);
    // 更新年级和学科进度
    this.updateProgress(session);
    // 分析薄弱环节
    this.analyzeWeakAreas();
    // 分析优势环节
    this.analyzeStrongAreas();
  }

  // 更新知识点掌握程度
  updateKnowledgeMastery(session) {
    const { knowledgePoints, performance } = session;
    knowledgePoints.forEach((knowledgePoint, index) => {
      const currentMastery = this.knowledgeMastery.get(knowledgePoint) || 0;
      const newMastery = Math.min(100, currentMastery + (performance[index] * 10));
      this.knowledgeMastery.set(knowledgePoint, newMastery);
    });
  }

  // 更新年级和学科进度
  updateProgress(session) {
    const { grade, subject, completedLessons, totalLessons } = session;
    
    // 更新年级进度
    const gradeKey = grade;
    const currentGradeProgress = this.gradeProgress.get(gradeKey) || { completed: 0, total: 0 };
    currentGradeProgress.completed += completedLessons;
    currentGradeProgress.total += totalLessons;
    this.gradeProgress.set(gradeKey, currentGradeProgress);
    
    // 更新学科进度
    const subjectKey = `${grade}-${subject}`;
    const currentSubjectProgress = this.subjectProgress.get(subjectKey) || { completed: 0, total: 0 };
    currentSubjectProgress.completed += completedLessons;
    currentSubjectProgress.total += totalLessons;
    this.subjectProgress.set(subjectKey, currentSubjectProgress);
  }

  // 分析薄弱环节
  analyzeWeakAreas() {
    this.weakAreas = [];
    for (const [knowledgePoint, mastery] of this.knowledgeMastery.entries()) {
      if (mastery < 60) {
        this.weakAreas.push({ knowledgePoint, mastery });
      }
    }
    // 按掌握程度排序
    this.weakAreas.sort((a, b) => a.mastery - b.mastery);
  }

  // 分析优势环节
  analyzeStrongAreas() {
    this.strongAreas = [];
    for (const [knowledgePoint, mastery] of this.knowledgeMastery.entries()) {
      if (mastery >= 80) {
        this.strongAreas.push({ knowledgePoint, mastery });
      }
    }
    // 按掌握程度排序
    this.strongAreas.sort((a, b) => b.mastery - a.mastery);
  }

  // 生成学习报告
  generateLearningReport() {
    const totalSessions = this.learningSessions.length;
    const totalStudyTime = this.learningSessions.reduce((sum, session) => sum + session.duration, 0);
    const averageSessionDuration = totalSessions > 0 ? totalStudyTime / totalSessions : 0;
    
    // 计算总体掌握程度
    const totalMastery = Array.from(this.knowledgeMastery.values()).reduce((sum, mastery) => sum + mastery, 0);
    const averageMastery = this.knowledgeMastery.size > 0 ? totalMastery / this.knowledgeMastery.size : 0;
    
    // 计算年级和学科进度
    const gradeProgress = {};
    for (const [grade, progress] of this.gradeProgress.entries()) {
      gradeProgress[grade] = {
        completed: progress.completed,
        total: progress.total,
        percentage: progress.total > 0 ? (progress.completed / progress.total) * 100 : 0
      };
    }
    
    const subjectProgress = {};
    for (const [key, progress] of this.subjectProgress.entries()) {
      subjectProgress[key] = {
        completed: progress.completed,
        total: progress.total,
        percentage: progress.total > 0 ? (progress.completed / progress.total) * 100 : 0
      };
    }
    
    return {
      userId: this.userId,
      totalSessions,
      totalStudyTime,
      averageSessionDuration,
      averageMastery,
      gradeProgress,
      subjectProgress,
      weakAreas: this.weakAreas.slice(0, 5), // 前5个薄弱环节
      strongAreas: this.strongAreas.slice(0, 5), // 前5个优势环节
      recentSessions: this.learningSessions.slice(-5) // 最近5次学习会话
    };
  }

  // 生成学习建议
  generateLearningRecommendations() {
    const recommendations = [];
    
    // 基于薄弱环节的建议
    if (this.weakAreas.length > 0) {
      recommendations.push({
        type: 'weak_areas',
        title: '加强薄弱环节',
        description: '建议重点学习以下薄弱环节',
        items: this.weakAreas.slice(0, 3).map(item => item.knowledgePoint)
      });
    }
    
    // 基于学习时间的建议
    const totalStudyTime = this.learningSessions.reduce((sum, session) => sum + session.duration, 0);
    if (totalStudyTime < 300) { // 少于5小时
      recommendations.push({
        type: 'study_time',
        title: '增加学习时间',
        description: '建议每天至少学习30分钟，提高学习效果',
        items: ['每天固定学习时间', '制定学习计划', '利用碎片时间学习']
      });
    }
    
    // 基于学习频率的建议
    const recentSessions = this.learningSessions.filter(session => {
      const sessionDate = new Date(session.timestamp);
      const today = new Date();
      const daysDiff = Math.floor((today - sessionDate) / (1000 * 60 * 60 * 24));
      return daysDiff <= 7;
    });
    
    if (recentSessions.length < 3) {
      recommendations.push({
        type: 'study_frequency',
        title: '提高学习频率',
        description: '建议增加学习频率，保持学习连续性',
        items: ['每天坚持学习', '设置学习提醒', '加入学习小组']
      });
    }
    
    return recommendations;
  }
}

// 进度监控系统类
class ProgressMonitoringSystem {
  constructor() {
    this.users = new Map(); // 用户数据
  }

  // 获取或创建用户数据
  getUserData(userId) {
    if (!this.users.has(userId)) {
      this.users.set(userId, new UserLearningData(userId));
    }
    return this.users.get(userId);
  }

  // 记录学习会话
  recordLearningSession(userId, session) {
    const userData = this.getUserData(userId);
    userData.addLearningSession(session);
  }

  // 生成用户学习报告
  generateUserReport(userId) {
    const userData = this.getUserData(userId);
    return userData.generateLearningReport();
  }

  // 生成用户学习建议
  generateUserRecommendations(userId) {
    const userData = this.getUserData(userId);
    return userData.generateLearningRecommendations();
  }

  // 获取用户薄弱环节
  getUserWeakAreas(userId) {
    const userData = this.getUserData(userId);
    return userData.weakAreas;
  }

  // 获取用户优势环节
  getUserStrongAreas(userId) {
    const userData = this.getUserData(userId);
    return userData.strongAreas;
  }

  // 获取用户进度
  getUserProgress(userId) {
    const userData = this.getUserData(userId);
    const report = userData.generateLearningReport();
    return {
      averageMastery: report.averageMastery,
      gradeProgress: report.gradeProgress,
      subjectProgress: report.subjectProgress
    };
  }
}

// 导出单例实例
export const progressMonitor = new ProgressMonitoringSystem();

// 模拟数据初始化
export const initializeMockData = () => {
  // 模拟用户学习数据
  const userId = 'user1';
  
  // 模拟学习会话
  const sessions = [
    {
      id: 'session-1',
      timestamp: new Date('2026-04-10').getTime(),
      duration: 45, // 分钟
      grade: 'high-school-1',
      subject: 'math',
      knowledgePoints: ['函数的定义', '函数的单调性', '函数的奇偶性'],
      performance: [0.8, 0.6, 0.7], // 0-1之间的表现评分
      completedLessons: 3,
      totalLessons: 3
    },
    {
      id: 'session-2',
      timestamp: new Date('2026-04-11').getTime(),
      duration: 60,
      grade: 'high-school-1',
      subject: 'math',
      knowledgePoints: ['三角函数的定义', '三角函数的图像', '三角函数的性质'],
      performance: [0.7, 0.5, 0.6],
      completedLessons: 3,
      totalLessons: 3
    },
    {
      id: 'session-3',
      timestamp: new Date('2026-04-12').getTime(),
      duration: 30,
      grade: 'high-school-1',
      subject: 'physics',
      knowledgePoints: ['牛顿第一定律', '牛顿第二定律', '牛顿第三定律'],
      performance: [0.9, 0.7, 0.8],
      completedLessons: 3,
      totalLessons: 3
    }
  ];
  
  // 记录学习会话
  sessions.forEach(session => {
    progressMonitor.recordLearningSession(userId, session);
  });
  
  console.log('进度监控系统初始化完成');
};

// 测试函数
export const testProgressMonitoring = () => {
  console.log('测试进度监控系统...');
  initializeMockData();
  
  const userId = 'user1';
  
  console.log('用户学习报告:', progressMonitor.generateUserReport(userId));
  console.log('用户学习建议:', progressMonitor.generateUserRecommendations(userId));
  console.log('用户薄弱环节:', progressMonitor.getUserWeakAreas(userId));
  console.log('用户优势环节:', progressMonitor.getUserStrongAreas(userId));
  console.log('用户进度:', progressMonitor.getUserProgress(userId));
  
  return {
    report: progressMonitor.generateUserReport(userId),
    recommendations: progressMonitor.generateUserRecommendations(userId),
    weakAreas: progressMonitor.getUserWeakAreas(userId),
    strongAreas: progressMonitor.getUserStrongAreas(userId),
    progress: progressMonitor.getUserProgress(userId)
  };
};