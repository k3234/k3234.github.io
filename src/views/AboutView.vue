<template>
  <PageLayout title="关于我们" description="了解高中生学习平台的使命、愿景和价值观">
    <div class="about-container">
      <section class="about-hero">
        <div class="hero-content">
          <h2>我们的使命</h2>
          <p>通过游戏化的学习方式，让高中学习变得有趣而上瘾，帮助学生轻松掌握高考重难点，实现学业目标。</p>
        </div>
      </section>
      
      <section class="about-story">
        <h3>我们的故事</h3>
        <p>高中生学习平台成立于2026年，由一群热爱教育的专业人士创建。我们深知传统学习方式的枯燥和低效，因此致力于通过游戏化设计和人工智能技术，打造一个让学习变得有趣、高效的平台。</p>
        <p>我们的团队由教育专家、软件开发工程师和设计人员组成，共同致力于为高中生提供最优质的学习体验。我们相信，每个学生都有潜力取得优异的成绩，只要给予正确的引导和工具。</p>
      </section>
      
      <section class="about-features">
        <h3>我们的特色</h3>
        <BaseGrid cols="auto" gap="lg">
          <BaseCard variant="default" elevated class="feature-card hover-lift">
            <div class="feature-icon">🎮</div>
            <h4 class="feature-title">游戏化学习</h4>
            <p class="feature-description">通过闯关、积分、成就等游戏元素，让学习变得有趣而上瘾</p>
          </BaseCard>
          <BaseCard variant="default" elevated class="feature-card hover-lift">
            <div class="feature-icon">🤖</div>
            <h4 class="feature-title">AI个性化推荐</h4>
            <p class="feature-description">基于学生的学习数据，智能推荐适合的学习内容和练习</p>
          </BaseCard>
          <BaseCard variant="default" elevated class="feature-card hover-lift">
            <div class="feature-icon">📚</div>
            <h4 class="feature-title">多学科覆盖</h4>
            <p class="feature-description">物理、数学、化学、生物等学科全面覆盖，满足学生的多样化需求</p>
          </BaseCard>
          <BaseCard variant="default" elevated class="feature-card hover-lift">
            <div class="feature-icon">📈</div>
            <h4 class="feature-title">新高考内容</h4>
            <p class="feature-description">及时跟进新高考改革，提供最新的学习资料和考试策略</p>
          </BaseCard>
        </BaseGrid>
      </section>
      
      <section class="about-team">
        <h3>我们的团队</h3>
        <BaseGrid cols="auto" gap="lg">
          <div class="team-member">
            <div class="member-avatar">👨‍💼</div>
            <h4 class="member-name">张明</h4>
            <p class="member-role">创始人 & CEO</p>
            <p class="member-bio">教育心理学博士，曾在知名教育机构担任教学总监</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">👩‍💻</div>
            <h4 class="member-name">李华</h4>
            <p class="member-role">技术总监</p>
            <p class="member-bio">软件工程硕士，曾在知名科技公司担任高级工程师</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">👨‍🎨</div>
            <h4 class="member-name">王芳</h4>
            <p class="member-role">设计总监</p>
            <p class="member-bio">视觉设计专业，曾在知名设计公司担任创意总监</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">👩‍🎓</div>
            <h4 class="member-name">赵强</h4>
            <p class="member-role">教育顾问</p>
            <p class="member-bio">特级教师，拥有20年教学经验</p>
          </div>
        </BaseGrid>
      </section>
      
      <section class="about-values">
        <h3>我们的价值观</h3>
        <div class="values-grid">
          <div class="value-item">
            <div class="value-icon">🎯</div>
            <h4 class="value-title">以学生为中心</h4>
            <p class="value-description">一切以学生的需求和利益为出发点</p>
          </div>
          <div class="value-item">
            <div class="value-icon">💡</div>
            <h4 class="value-title">创新精神</h4>
            <p class="value-description">不断探索和创新，提供更好的学习体验</p>
          </div>
          <div class="value-item">
            <div class="value-icon">🌟</div>
            <h4 class="value-title">卓越品质</h4>
            <p class="value-description">追求卓越，提供最优质的学习内容和服务</p>
          </div>
          <div class="value-item">
            <div class="value-icon">🤝</div>
            <h4 class="value-title">合作共赢</h4>
            <p class="value-description">与学生、家长和教育机构建立良好的合作关系</p>
          </div>
        </div>
      </section>
    </div>
  </PageLayout>
</template>

<script setup>
import PageLayout from '../components/PageLayout.vue';
import BaseCard from '../components/BaseCard.vue';
import BaseGrid from '../components/BaseGrid.vue';
</script>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
  margin-top: var(--spacing-xl);
}

.about-hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: var(--spacing-3xl);
  border-radius: var(--border-radius-2xl);
  text-align: center;
  box-shadow: var(--shadow-xl);
}

.hero-content h2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-lg);
}

.hero-content p {
  font-size: var(--font-size-lg);
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.95;
  line-height: 1.6;
}

.about-story {
  background-color: var(--background-white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
}

.about-story h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

.about-story p {
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
  line-height: 1.6;
}

.about-features h3,
.about-team h3,
.about-values h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-xl);
  color: var(--text-primary);
  text-align: center;
}

.feature-card {
  text-align: center;
}

.feature-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-lg);
}

.feature-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: var(--font-size-sm);
}

.team-member {
  background-color: var(--background-white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: all var(--transition-normal);
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.member-avatar {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-lg);
}

.member-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.member-role {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
}

.member-bio {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  line-height: 1.5;
}

.about-values {
  background-color: var(--background-white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.value-item {
  text-align: center;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-normal);
}

.value-item:hover {
  background-color: var(--background-light);
  transform: translateY(-3px);
}

.value-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
}

.value-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.value-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 响应式 */
@media (max-width: 768px) {
  .about-hero {
    padding: var(--spacing-2xl);
  }
  
  .hero-content h2 {
    font-size: var(--font-size-2xl);
  }
  
  .hero-content p {
    font-size: var(--font-size-base);
  }
  
  .about-story,
  .about-values {
    padding: var(--spacing-lg);
  }
  
  .about-story h3,
  .about-features h3,
  .about-team h3,
  .about-values h3 {
    font-size: var(--font-size-xl);
  }
  
  .team-member {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 640px) {
  .hero-content h2 {
    font-size: var(--font-size-xl);
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>