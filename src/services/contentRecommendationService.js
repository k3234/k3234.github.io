// 学习知识推流系统

// 内容推荐服务类
class ContentRecommendationService {
  constructor() {
    this.userInteractions = JSON.parse(localStorage.getItem('userInteractions')) || {};
    this.contentScores = JSON.parse(localStorage.getItem('contentScores')) || {};
  }

  // 记录用户交互
  recordInteraction(userId, contentId, interactionType, duration = 0) {
    if (!this.userInteractions[userId]) {
      this.userInteractions[userId] = [];
    }

    this.userInteractions[userId].push({
      contentId,
      interactionType, // view, complete, like, share, comment
      timestamp: new Date().toISOString(),
      duration // 停留时间（秒）
    });

    // 限制交互记录数量
    if (this.userInteractions[userId].length > 1000) {
      this.userInteractions[userId] = this.userInteractions[userId].slice(-1000);
    }

    localStorage.setItem('userInteractions', JSON.stringify(this.userInteractions));

    // 更新内容评分
    this.updateContentScore(contentId, interactionType, duration);
  }

  // 更新内容评分
  updateContentScore(contentId, interactionType, duration) {
    if (!this.contentScores[contentId]) {
      this.contentScores[contentId] = {
        viewCount: 0,
        completeCount: 0,
        likeCount: 0,
        shareCount: 0,
        commentCount: 0,
        totalDuration: 0,
        averageDuration: 0,
        score: 0
      };
    }

    const score = this.contentScores[contentId];

    switch (interactionType) {
      case 'view':
        score.viewCount++;
        score.totalDuration += duration;
        score.averageDuration = score.totalDuration / score.viewCount;
        break;
      case 'complete':
        score.completeCount++;
        break;
      case 'like':
        score.likeCount++;
        break;
      case 'share':
        score.shareCount++;
        break;
      case 'comment':
        score.commentCount++;
        break;
    }

    // 计算综合评分
    score.score = (
      score.viewCount * 0.1 +
      score.completeCount * 0.3 +
      score.likeCount * 0.2 +
      score.shareCount * 0.2 +
      score.commentCount * 0.1 +
      (score.averageDuration / 60) * 0.1 // 平均停留时间（分钟）
    );

    localStorage.setItem('contentScores', JSON.stringify(this.contentScores));
  }

  // 获取用户兴趣标签
  getUserInterestTags(userId) {
    const interactions = this.userInteractions[userId] || [];
    const tagScores = {};

    // 从内容交互中提取标签
    interactions.forEach(interaction => {
      // 这里简化处理，实际应用中应从内容元数据中获取标签
      // 假设contentId格式为 "subject-topic-id"，如 "math-function-1"
      const parts = interaction.contentId.split('-');
      if (parts.length >= 2) {
        const subject = parts[0];
        const topic = parts[1];
        
        tagScores[subject] = (tagScores[subject] || 0) + 1;
        tagScores[topic] = (tagScores[topic] || 0) + 0.8;
      }
    });

    // 按分数排序，返回前5个标签
    return Object.entries(tagScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag, score]) => ({
        tag,
        score
      }));
  }

  // 生成个性化推荐
  generateRecommendations(userId, contentPool, limit = 10) {
    const userInteractions = this.userInteractions[userId] || [];
    const userInterestTags = this.getUserInterestTags(userId);
    const viewedContent = new Set(userInteractions.map(interaction => interaction.contentId));

    // 计算每个内容的推荐分数
    const scoredContent = contentPool
      .filter(content => !viewedContent.has(content.id))
      .map(content => {
        let score = 0;

        // 基于用户兴趣标签的匹配
        userInterestTags.forEach(({ tag, score: tagScore }) => {
          if (content.id.includes(tag) || 
              (content.tags && content.tags.includes(tag))) {
            score += tagScore * 0.5;
          }
        });

        // 基于内容质量评分
        const contentScore = this.contentScores[content.id]?.score || 0;
        score += contentScore * 0.3;

        // 基于内容难度与用户水平的匹配
        // 假设用户水平可以从用户资料中获取
        // 这里简化处理，实际应用中应根据用户的知识掌握程度计算
        score += 0.2; // 基础分

        // 基于内容新鲜度
        const now = new Date();
        const contentDate = new Date(content.createdAt || now);
        const daysDiff = (now - contentDate) / (1000 * 60 * 60 * 24);
        const freshnessScore = Math.max(0, 1 - daysDiff / 30); // 30天内的内容有新鲜度加分
        score += freshnessScore * 0.1;

        return {
          content,
          score
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.content);

    return scoredContent;
  }

  // 获取热门内容
  getPopularContent(contentPool, limit = 10) {
    return contentPool
      .map(content => ({
        content,
        score: this.contentScores[content.id]?.score || 0
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.content);
  }

  // 获取相关内容
  getRelatedContent(contentId, contentPool, limit = 5) {
    const targetContent = contentPool.find(content => content.id === contentId);
    if (!targetContent) return [];

    return contentPool
      .filter(content => content.id !== contentId)
      .map(content => {
        let score = 0;

        // 基于相同主题
        if (content.id.split('-')[1] === targetContent.id.split('-')[1]) {
          score += 0.5;
        }

        // 基于相同学科
        if (content.id.split('-')[0] === targetContent.id.split('-')[0]) {
          score += 0.3;
        }

        // 基于内容质量
        score += (this.contentScores[content.id]?.score || 0) * 0.2;

        return {
          content,
          score
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.content);
  }

  // 生成学习路径推荐
  generateLearningPathRecommendations(userId, grade, subjects) {
    // 这里简化处理，实际应用中应根据用户的学习进度和知识掌握程度生成
    const recommendations = [];

    subjects.forEach(subject => {
      // 假设每个学科有不同的学习模块
      const modules = this.getSubjectModules(subject, grade);
      recommendations.push(...modules);
    });

    return recommendations;
  }

  // 获取学科模块（模拟数据）
  getSubjectModules(subject, grade) {
    const modules = {
      math: {
        'high-school-1': [
          { id: 'math-function-1', title: '函数的基本概念', difficulty: 'easy' },
          { id: 'math-function-2', title: '函数的单调性', difficulty: 'medium' },
          { id: 'math-trig-1', title: '三角函数的基本概念', difficulty: 'medium' }
        ],
        'high-school-2': [
          { id: 'math-calculus-1', title: '导数的基本概念', difficulty: 'medium' },
          { id: 'math-calculus-2', title: '导数的应用', difficulty: 'hard' },
          { id: 'math-geometry-1', title: '立体几何', difficulty: 'medium' }
        ],
        'high-school-3': [
          { id: 'math-calculus-3', title: '微积分综合应用', difficulty: 'hard' },
          { id: 'math-geometry-2', title: '解析几何', difficulty: 'hard' },
          { id: 'math-probability-1', title: '概率统计', difficulty: 'medium' }
        ]
      },
      physics: {
        'high-school-1': [
          { id: 'physics-mechanics-1', title: '运动学', difficulty: 'easy' },
          { id: 'physics-mechanics-2', title: '牛顿运动定律', difficulty: 'medium' },
          { id: 'physics-mechanics-3', title: '机械能', difficulty: 'medium' }
        ],
        'high-school-2': [
          { id: 'physics-electricity-1', title: '静电场', difficulty: 'medium' },
          { id: 'physics-electricity-2', title: '恒定电流', difficulty: 'medium' },
          { id: 'physics-magnetism-1', title: '磁场', difficulty: 'hard' }
        ],
        'high-school-3': [
          { id: 'physics-electricity-3', title: '电磁感应', difficulty: 'hard' },
          { id: 'physics-optics-1', title: '光学', difficulty: 'medium' },
          { id: 'physics-modern-1', title: '近代物理', difficulty: 'medium' }
        ]
      },
      chemistry: {
        'high-school-1': [
          { id: 'chemistry-basic-1', title: '化学计量', difficulty: 'easy' },
          { id: 'chemistry-basic-2', title: '物质的分类', difficulty: 'easy' },
          { id: 'chemistry-inorganic-1', title: '金属及其化合物', difficulty: 'medium' }
        ],
        'high-school-2': [
          { id: 'chemistry-inorganic-2', title: '非金属及其化合物', difficulty: 'medium' },
          { id: 'chemistry-organic-1', title: '有机化学基础', difficulty: 'medium' },
          { id: 'chemistry-physical-1', title: '化学反应速率', difficulty: 'medium' }
        ],
        'high-school-3': [
          { id: 'chemistry-physical-2', title: '化学平衡', difficulty: 'hard' },
          { id: 'chemistry-organic-2', title: '有机化学综合', difficulty: 'hard' },
          { id: 'chemistry-analytical-1', title: '化学实验', difficulty: 'medium' }
        ]
      },
      biology: {
        'high-school-1': [
          { id: 'biology-cell-1', title: '细胞的基本结构', difficulty: 'easy' },
          { id: 'biology-cell-2', title: '细胞的代谢', difficulty: 'medium' },
          { id: 'biology-genetics-1', title: '遗传的基本规律', difficulty: 'medium' }
        ],
        'high-school-2': [
          { id: 'biology-genetics-2', title: '基因的本质', difficulty: 'medium' },
          { id: 'biology-evolution-1', title: '生物进化', difficulty: 'medium' },
          { id: 'biology-ecology-1', title: '生态系统', difficulty: 'medium' }
        ],
        'high-school-3': [
          { id: 'biology-physiology-1', title: '人体生理', difficulty: 'medium' },
          { id: 'biology-genetics-3', title: '现代生物技术', difficulty: 'hard' },
          { id: 'biology-ecology-2', title: '环境保护', difficulty: 'medium' }
        ]
      }
    };

    return modules[subject]?.[grade] || [];
  }

  // 导出用户交互数据
  exportUserInteractions(userId) {
    return this.userInteractions[userId] || [];
  }

  // 导入用户交互数据
  importUserInteractions(userId, interactions) {
    this.userInteractions[userId] = interactions;
    localStorage.setItem('userInteractions', JSON.stringify(this.userInteractions));
  }

  // 清除用户数据
  clearUserData(userId) {
    delete this.userInteractions[userId];
    localStorage.setItem('userInteractions', JSON.stringify(this.userInteractions));
  }
}

// 导出单例实例
export const recommendationService = new ContentRecommendationService();

// 初始化函数
export const initializeRecommendationService = () => {
  console.log('学习知识推流系统初始化完成');
};

// 测试函数
export const testRecommendationService = () => {
  console.log('测试学习知识推流系统...');
  
  const userId = 'test-user-1';
  const contentPool = [
    { id: 'math-function-1', title: '函数的基本概念', tags: ['math', 'function'], createdAt: new Date().toISOString() },
    { id: 'math-function-2', title: '函数的单调性', tags: ['math', 'function'], createdAt: new Date().toISOString() },
    { id: 'math-trig-1', title: '三角函数的基本概念', tags: ['math', 'trig'], createdAt: new Date().toISOString() },
    { id: 'physics-mechanics-1', title: '运动学', tags: ['physics', 'mechanics'], createdAt: new Date().toISOString() },
    { id: 'physics-mechanics-2', title: '牛顿运动定律', tags: ['physics', 'mechanics'], createdAt: new Date().toISOString() },
    { id: 'chemistry-basic-1', title: '化学计量', tags: ['chemistry', 'basic'], createdAt: new Date().toISOString() },
    { id: 'biology-cell-1', title: '细胞的基本结构', tags: ['biology', 'cell'], createdAt: new Date().toISOString() }
  ];

  // 模拟用户交互
  recommendationService.recordInteraction(userId, 'math-function-1', 'view', 60);
  recommendationService.recordInteraction(userId, 'math-function-1', 'complete', 120);
  recommendationService.recordInteraction(userId, 'math-function-2', 'view', 45);
  recommendationService.recordInteraction(userId, 'physics-mechanics-1', 'view', 30);
  recommendationService.recordInteraction(userId, 'physics-mechanics-1', 'like', 0);

  // 测试获取用户兴趣标签
  console.log('用户兴趣标签:', recommendationService.getUserInterestTags(userId));

  // 测试生成推荐
  console.log('个性化推荐:', recommendationService.generateRecommendations(userId, contentPool, 3));

  // 测试获取热门内容
  console.log('热门内容:', recommendationService.getPopularContent(contentPool, 3));

  // 测试获取相关内容
  console.log('相关内容:', recommendationService.getRelatedContent('math-function-1', contentPool, 2));

  // 测试生成学习路径推荐
  console.log('学习路径推荐:', recommendationService.generateLearningPathRecommendations(userId, 'high-school-1', ['math', 'physics']));

  console.log('学习知识推流系统测试完成');
};