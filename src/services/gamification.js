// 游戏化系统

// 成就系统
class AchievementSystem {
  constructor() {
    this.achievements = new Map(); // 成就定义
    this.userAchievements = new Map(); // 用户成就
    this.initAchievements();
  }

  // 初始化成就
  initAchievements() {
    this.achievements.set('first-lesson', {
      id: 'first-lesson',
      title: '初次尝试',
      description: '完成第一节课',
      icon: '🎯',
      requirement: { type: 'lessons', count: 1 },
      points: 10
    });

    this.achievements.set('week-streak', {
      id: 'week-streak',
      title: '坚持一周',
      description: '连续学习7天',
      icon: '🔥',
      requirement: { type: 'streak', days: 7 },
      points: 50
    });

    this.achievements.set('math-master', {
      id: 'math-master',
      title: '数学大师',
      description: '完成所有数学课程',
      icon: '📐',
      requirement: { type: 'subject', subject: 'math', completed: 100 },
      points: 100
    });

    this.achievements.set('physics-wizard', {
      id: 'physics-wizard',
      title: '物理 wizard',
      description: '完成所有物理课程',
      icon: '⚡',
      requirement: { type: 'subject', subject: 'physics', completed: 100 },
      points: 100
    });

    this.achievements.set('chemistry-expert', {
      id: 'chemistry-expert',
      title: '化学专家',
      description: '完成所有化学课程',
      icon: '🧪',
      requirement: { type: 'subject', subject: 'chemistry', completed: 100 },
      points: 100
    });

    this.achievements.set('biology-genius', {
      id: 'biology-genius',
      title: '生物天才',
      description: '完成所有生物课程',
      icon: '🧬',
      requirement: { type: 'subject', subject: 'biology', completed: 100 },
      points: 100
    });

    this.achievements.set('perfect-score', {
      id: 'perfect-score',
      title: '满分达人',
      description: '一次测试获得满分',
      icon: '💯',
      requirement: { type: 'score', score: 100 },
      points: 30
    });

    this.achievements.set('knowledge-master', {
      id: 'knowledge-master',
      title: '知识大师',
      description: '掌握100个知识点',
      icon: '🧠',
      requirement: { type: 'knowledge', count: 100 },
      points: 200
    });
  }

  // 获取用户成就
  getUserAchievements(userId) {
    if (!this.userAchievements.has(userId)) {
      this.userAchievements.set(userId, {
        unlocked: [],
        inProgress: []
      });
    }
    return this.userAchievements.get(userId);
  }

  // 检查并解锁成就
  checkAchievements(userId, userData) {
    const userAchievements = this.getUserAchievements(userId);
    const newlyUnlocked = [];

    for (const [id, achievement] of this.achievements.entries()) {
      // 跳过已解锁的成就
      if (userAchievements.unlocked.includes(id)) {
        continue;
      }

      // 检查成就条件
      const isUnlocked = this.checkRequirement(achievement.requirement, userData);
      if (isUnlocked) {
        userAchievements.unlocked.push(id);
        newlyUnlocked.push(achievement);
      } else {
        // 检查是否在进行中
        const isInProgress = this.checkInProgress(achievement.requirement, userData);
        if (isInProgress && !userAchievements.inProgress.includes(id)) {
          userAchievements.inProgress.push(id);
        }
      }
    }

    return newlyUnlocked;
  }

  // 检查成就条件
  checkRequirement(requirement, userData) {
    switch (requirement.type) {
      case 'lessons':
        return userData.completedLessons >= requirement.count;
      case 'streak':
        return userData.streak >= requirement.days;
      case 'subject':
        const subjectProgress = userData.subjectProgress?.[requirement.subject] || { completed: 0, total: 1 };
        return (subjectProgress.completed / subjectProgress.total) * 100 >= requirement.completed;
      case 'score':
        return userData.highestScore >= requirement.score;
      case 'knowledge':
        return userData.masteredKnowledgePoints >= requirement.count;
      default:
        return false;
    }
  }

  // 检查是否在进行中
  checkInProgress(requirement, userData) {
    switch (requirement.type) {
      case 'lessons':
        return userData.completedLessons > 0 && userData.completedLessons < requirement.count;
      case 'streak':
        return userData.streak > 0 && userData.streak < requirement.days;
      case 'subject':
        const subjectProgress = userData.subjectProgress?.[requirement.subject] || { completed: 0, total: 1 };
        const progress = (subjectProgress.completed / subjectProgress.total) * 100;
        return progress > 0 && progress < requirement.completed;
      case 'score':
        return userData.highestScore > 0 && userData.highestScore < requirement.score;
      case 'knowledge':
        return userData.masteredKnowledgePoints > 0 && userData.masteredKnowledgePoints < requirement.count;
      default:
        return false;
    }
  }

  // 获取所有成就
  getAllAchievements() {
    return Array.from(this.achievements.values());
  }
}

// 积分系统
class PointsSystem {
  constructor() {
    this.userPoints = new Map(); // 用户积分
    this.pointRules = {
      lessonCompletion: 10, // 完成一节课获得的积分
      quizCorrect: 5, // 回答正确获得的积分
      quizPerfect: 20, // 完美完成测验获得的积分
      dailyLogin: 5, // 每日登录获得的积分
      achievement: 10, // 解锁成就获得的积分
      streakBonus: 15 // 连续学习奖励积分
    };
  }

  // 获取用户积分
  getUserPoints(userId) {
    if (!this.userPoints.has(userId)) {
      this.userPoints.set(userId, 0);
    }
    return this.userPoints.get(userId);
  }

  // 增加用户积分
  addPoints(userId, type, amount = null) {
    const points = amount || this.pointRules[type] || 0;
    const currentPoints = this.getUserPoints(userId);
    const newPoints = currentPoints + points;
    this.userPoints.set(userId, newPoints);
    return newPoints;
  }

  // 减少用户积分
  removePoints(userId, amount) {
    const currentPoints = this.getUserPoints(userId);
    const newPoints = Math.max(0, currentPoints - amount);
    this.userPoints.set(userId, newPoints);
    return newPoints;
  }

  // 获取用户等级
  getUserLevel(userId) {
    const points = this.getUserPoints(userId);
    return Math.floor(points / 100) + 1;
  }

  // 获取用户升级所需积分
  getPointsToNextLevel(userId) {
    const level = this.getUserLevel(userId);
    const points = this.getUserPoints(userId);
    const pointsNeeded = level * 100;
    return Math.max(0, pointsNeeded - points);
  }
}

// 徽章系统
class BadgeSystem {
  constructor() {
    this.badges = new Map(); // 徽章定义
    this.userBadges = new Map(); // 用户徽章
    this.initBadges();
  }

  // 初始化徽章
  initBadges() {
    this.badges.set('bronze-learner', {
      id: 'bronze-learner',
      title: '青铜学习者',
      description: '完成10节课',
      icon: '🥉',
      requirement: { type: 'lessons', count: 10 }
    });

    this.badges.set('silver-learner', {
      id: 'silver-learner',
      title: '白银学习者',
      description: '完成50节课',
      icon: '🥈',
      requirement: { type: 'lessons', count: 50 }
    });

    this.badges.set('gold-learner', {
      id: 'gold-learner',
      title: '黄金学习者',
      description: '完成100节课',
      icon: '🥇',
      requirement: { type: 'lessons', count: 100 }
    });

    this.badges.set('math-enthusiast', {
      id: 'math-enthusiast',
      title: '数学爱好者',
      description: '完成30节数学课',
      icon: '📐',
      requirement: { type: 'subject_lessons', subject: 'math', count: 30 }
    });

    this.badges.set('physics-enthusiast', {
      id: 'physics-enthusiast',
      title: '物理爱好者',
      description: '完成30节物理课',
      icon: '⚡',
      requirement: { type: 'subject_lessons', subject: 'physics', count: 30 }
    });

    this.badges.set('chemistry-enthusiast', {
      id: 'chemistry-enthusiast',
      title: '化学爱好者',
      description: '完成30节化学课',
      icon: '🧪',
      requirement: { type: 'subject_lessons', subject: 'chemistry', count: 30 }
    });

    this.badges.set('biology-enthusiast', {
      id: 'biology-enthusiast',
      title: '生物爱好者',
      description: '完成30节生物课',
      icon: '🧬',
      requirement: { type: 'subject_lessons', subject: 'biology', count: 30 }
    });

    this.badges.set('streak-master', {
      id: 'streak-master',
      title: '连续学习大师',
      description: '连续学习30天',
      icon: '🔥',
      requirement: { type: 'streak', days: 30 }
    });
  }

  // 获取用户徽章
  getUserBadges(userId) {
    if (!this.userBadges.has(userId)) {
      this.userBadges.set(userId, []);
    }
    return this.userBadges.get(userId);
  }

  // 检查并授予徽章
  checkBadges(userId, userData) {
    const userBadges = this.getUserBadges(userId);
    const newlyAwarded = [];

    for (const [id, badge] of this.badges.entries()) {
      // 跳过已授予的徽章
      if (userBadges.includes(id)) {
        continue;
      }

      // 检查徽章条件
      const isAwarded = this.checkRequirement(badge.requirement, userData);
      if (isAwarded) {
        userBadges.push(id);
        newlyAwarded.push(badge);
      }
    }

    return newlyAwarded;
  }

  // 检查徽章条件
  checkRequirement(requirement, userData) {
    switch (requirement.type) {
      case 'lessons':
        return userData.completedLessons >= requirement.count;
      case 'subject_lessons':
        const subjectLessons = userData.subjectLessons?.[requirement.subject] || 0;
        return subjectLessons >= requirement.count;
      case 'streak':
        return userData.streak >= requirement.days;
      default:
        return false;
    }
  }

  // 获取所有徽章
  getAllBadges() {
    return Array.from(this.badges.values());
  }
}

// 游戏化系统类
class GamificationSystem {
  constructor() {
    this.achievementSystem = new AchievementSystem();
    this.pointsSystem = new PointsSystem();
    this.badgeSystem = new BadgeSystem();
    this.userData = new Map(); // 用户游戏化数据
  }

  // 获取或创建用户数据
  getUserData(userId) {
    if (!this.userData.has(userId)) {
      this.userData.set(userId, {
        completedLessons: 0,
        streak: 0,
        subjectProgress: {},
        subjectLessons: {},
        highestScore: 0,
        masteredKnowledgePoints: 0,
        lastLogin: null
      });
    }
    return this.userData.get(userId);
  }

  // 记录学习完成
  recordLessonCompletion(userId, subject) {
    const userData = this.getUserData(userId);
    userData.completedLessons++;
    
    // 更新学科课程数
    if (!userData.subjectLessons[subject]) {
      userData.subjectLessons[subject] = 0;
    }
    userData.subjectLessons[subject]++;
    
    // 增加积分
    this.pointsSystem.addPoints(userId, 'lessonCompletion');
    
    // 检查成就和徽章
    const achievements = this.achievementSystem.checkAchievements(userId, userData);
    const badges = this.badgeSystem.checkBadges(userId, userData);
    
    // 为成就增加积分
    achievements.forEach(achievement => {
      this.pointsSystem.addPoints(userId, 'achievement', achievement.points);
    });
    
    return {
      achievements,
      badges,
      points: this.pointsSystem.getUserPoints(userId),
      level: this.pointsSystem.getUserLevel(userId)
    };
  }

  // 记录测验成绩
  recordQuizScore(userId, score) {
    const userData = this.getUserData(userId);
    
    // 更新最高分
    if (score > userData.highestScore) {
      userData.highestScore = score;
    }
    
    // 增加积分
    if (score === 100) {
      this.pointsSystem.addPoints(userId, 'quizPerfect');
    } else {
      // 假设每道题5分，计算正确题数
      const correctCount = Math.floor(score / 5);
      this.pointsSystem.addPoints(userId, 'quizCorrect', correctCount * this.pointsSystem.pointRules.quizCorrect);
    }
    
    // 检查成就和徽章
    const achievements = this.achievementSystem.checkAchievements(userId, userData);
    const badges = this.badgeSystem.checkBadges(userId, userData);
    
    // 为成就增加积分
    achievements.forEach(achievement => {
      this.pointsSystem.addPoints(userId, 'achievement', achievement.points);
    });
    
    return {
      achievements,
      badges,
      points: this.pointsSystem.getUserPoints(userId),
      level: this.pointsSystem.getUserLevel(userId)
    };
  }

  // 记录登录
  recordLogin(userId) {
    const userData = this.getUserData(userId);
    const today = new Date().toDateString();
    const lastLogin = userData.lastLogin ? new Date(userData.lastLogin).toDateString() : null;
    
    // 检查是否连续登录
    if (lastLogin) {
      const lastLoginDate = new Date(lastLogin);
      const todayDate = new Date(today);
      const diffTime = todayDate - lastLoginDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // 连续登录
        userData.streak++;
        // 连续登录奖励
        if (userData.streak % 7 === 0) {
          this.pointsSystem.addPoints(userId, 'streakBonus');
        }
      } else if (diffDays > 1) {
        // 中断连续登录
        userData.streak = 1;
      }
    } else {
      // 首次登录
      userData.streak = 1;
    }
    
    // 每日登录奖励
    if (lastLogin !== today) {
      this.pointsSystem.addPoints(userId, 'dailyLogin');
    }
    
    // 更新最后登录时间
    userData.lastLogin = new Date().toISOString();
    
    // 检查成就和徽章
    const achievements = this.achievementSystem.checkAchievements(userId, userData);
    const badges = this.badgeSystem.checkBadges(userId, userData);
    
    // 为成就增加积分
    achievements.forEach(achievement => {
      this.pointsSystem.addPoints(userId, 'achievement', achievement.points);
    });
    
    return {
      streak: userData.streak,
      achievements,
      badges,
      points: this.pointsSystem.getUserPoints(userId),
      level: this.pointsSystem.getUserLevel(userId)
    };
  }

  // 获取用户游戏化数据
  getUserGamificationData(userId) {
    const userData = this.getUserData(userId);
    const achievements = this.achievementSystem.getUserAchievements(userId);
    const badges = this.badgeSystem.getUserBadges(userId);
    const points = this.pointsSystem.getUserPoints(userId);
    const level = this.pointsSystem.getUserLevel(userId);
    const pointsToNextLevel = this.pointsSystem.getPointsToNextLevel(userId);
    
    return {
      completedLessons: userData.completedLessons,
      streak: userData.streak,
      highestScore: userData.highestScore,
      points,
      level,
      pointsToNextLevel,
      achievements,
      badges
    };
  }

  // 获取所有成就和徽章
  getAllAchievementsAndBadges() {
    return {
      achievements: this.achievementSystem.getAllAchievements(),
      badges: this.badgeSystem.getAllBadges()
    };
  }
}

// 导出单例实例
export const gamificationSystem = new GamificationSystem();

// 模拟数据初始化
export const initializeMockData = () => {
  const userId = 'user1';
  
  // 模拟学习完成
  gamificationSystem.recordLessonCompletion(userId, 'math');
  gamificationSystem.recordLessonCompletion(userId, 'math');
  gamificationSystem.recordLessonCompletion(userId, 'math');
  gamificationSystem.recordLessonCompletion(userId, 'physics');
  gamificationSystem.recordLessonCompletion(userId, 'physics');
  
  // 模拟测验成绩
  gamificationSystem.recordQuizScore(userId, 85);
  gamificationSystem.recordQuizScore(userId, 100);
  
  // 模拟登录
  gamificationSystem.recordLogin(userId);
  
  console.log('游戏化系统初始化完成');
};

// 测试函数
export const testGamification = () => {
  console.log('测试游戏化系统...');
  initializeMockData();
  
  const userId = 'user1';
  
  console.log('用户游戏化数据:', gamificationSystem.getUserGamificationData(userId));
  console.log('所有成就和徽章:', gamificationSystem.getAllAchievementsAndBadges());
  
  return {
    userData: gamificationSystem.getUserGamificationData(userId),
    allAchievementsAndBadges: gamificationSystem.getAllAchievementsAndBadges()
  };
};