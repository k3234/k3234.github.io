<template>
  <div class="app">
    <header class="app-header">
      <div class="header-container">
        <BaseNav :links="navLinks">
          <template #brand>
            <div class="header-brand">
              <div class="brand-icon">📚</div>
              <h1>高中生学习平台</h1>
            </div>
          </template>
          <template #actions>
            <router-link v-if="!isAuthenticated" to="/auth" class="auth-link">
              <BaseButton variant="primary" size="small">
                <span class="auth-icon">🔐</span>
                <span>登录</span>
              </BaseButton>
            </router-link>
            <div v-else class="user-menu">
              <BaseButton variant="outline" size="small" @click="logout">
                <span class="auth-icon">🚪</span>
                <span>登出</span>
              </BaseButton>
            </div>
          </template>
        </BaseNav>
      </div>
    </header>
    <main class="app-main">
      <div class="main-container">
        <router-view />
      </div>
    </main>
    <footer class="app-footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-brand">
              <div class="brand-icon">📚</div>
              <h3>高中生学习平台</h3>
            </div>
            <p class="footer-tagline">让学习变得有趣而上瘾</p>
            <div class="footer-social">
              <a href="#" class="social-link">📧</a>
              <a href="#" class="social-link">📱</a>
              <a href="#" class="social-link">🌐</a>
            </div>
          </div>
          <div class="footer-section">
            <h4>快速链接</h4>
            <ul class="footer-links">
              <li><router-link to="/" class="footer-link">首页</router-link></li>
              <li><router-link to="/pre-assessment" class="footer-link">预评估</router-link></li>
              <li><router-link to="/learning-content" class="footer-link">学习内容</router-link></li>
              <li><router-link to="/learning-path" class="footer-link">学习路径</router-link></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>资源中心</h4>
            <ul class="footer-links">
              <li><router-link to="/subjects" class="footer-link">学科资源</router-link></li>
              <li><router-link to="/ai-recommendation" class="footer-link">AI推荐</router-link></li>
              <li><router-link to="/ai-learning-analysis" class="footer-link">学习分析</router-link></li>
              <li><router-link to="/progress" class="footer-link">学习进度</router-link></li>
              <li><router-link to="/profile" class="footer-link">个人中心</router-link></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>支持</h4>
            <ul class="footer-links">
              <li><router-link to="/usage-help" class="footer-link">使用帮助</router-link></li>
              <li><router-link to="/privacy-policy" class="footer-link">隐私政策</router-link></li>
              <li><router-link to="/contact" class="footer-link">联系我们</router-link></li>
              <li><router-link to="/about" class="footer-link">关于我们</router-link></li>
            </ul>
          </div>
        </div>
        <div class="footer-copyright">
          <p>&copy; 2026 高中生学习平台 版权所有</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { authService } from './services/authService';
import BaseNav from './components/BaseNav.vue';
import BaseButton from './components/BaseButton.vue';

const isAuthenticated = computed(() => {
  return authService.isAuthenticated();
});

const navLinks = [
  { path: '/', text: '首页', icon: '🏠' },
  { path: '/pre-assessment', text: '预评估', icon: '📋' },
  { path: '/learning-content', text: '学习内容', icon: '📚' },
  { path: '/learning-path', text: '学习路径', icon: '🧭' },
  { path: '/subjects', text: '学科', icon: '📖' },
  { path: '/ai-recommendation', text: 'AI推荐', icon: '🤖' },
  { path: '/ai-learning-analysis', text: '学习分析', icon: '📈' },
  { path: '/progress', text: '学习进度', icon: '📊' },
  { path: '/profile', text: '个人中心', icon: '👤' }
];

const logout = () => {
  authService.logout();
  // 可以添加登出成功的提示
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: var(--font-family);
  background-color: var(--background-light);
}

.app-header {
  background-color: var(--background-white);
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
  transition: all var(--transition-normal);
}

.header-container {
  max-width: var(--max-content-width);
  margin: 0 auto;
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
}

.header-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  transition: transform var(--transition-fast);
  color: var(--text-primary);
}

.header-brand:hover {
  transform: scale(1.02);
}

.brand-icon {
  font-size: var(--font-size-2xl);
  line-height: 1;
}

.header-brand h1 {
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.auth-link {
  text-decoration: none;
}

.auth-icon {
  font-size: var(--font-size-sm);
  line-height: 1;
}

.app-main {
  flex: 1;
  background-color: var(--background-light);
  min-height: 0;
}

.main-container {
  max-width: var(--max-content-width);
  margin: 0 auto;
  width: 100%;
  padding: var(--spacing-xl);
}

.app-footer {
  background-color: var(--text-primary);
  color: white;
  margin-top: auto;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
}

.footer-container {
  max-width: var(--max-content-width);
  margin: 0 auto;
  width: 100%;
  padding: var(--spacing-xl);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.footer-brand .brand-icon {
  font-size: var(--font-size-xl);
}

.footer-brand h3 {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: white;
}

.footer-tagline {
  margin: 0;
  font-size: var(--font-size-sm);
  opacity: 0.8;
}

.footer-social {
  display: flex;
  gap: var(--spacing-md);
}

.social-link {
  font-size: var(--font-size-lg);
  color: white;
  opacity: 0.8;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.social-link:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.footer-section h4 {
  margin: 0;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: white;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-link {
  color: white;
  text-decoration: none;
  font-size: var(--font-size-sm);
  opacity: 0.8;
  transition: all var(--transition-fast);
  display: inline-block;
}

.footer-link:hover {
  opacity: 1;
  transform: translateX(4px);
}

.footer-copyright {
  margin-top: var(--spacing-xl);
  text-align: center;
  padding-top: var(--spacing-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-copyright p {
  margin: 0;
  font-size: var(--font-size-xs);
  opacity: 0.7;
}

/* 响应式 */
@media (max-width: 1024px) {
  .header-container {
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .main-container {
    padding: var(--spacing-lg);
  }
  
  .footer-container {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: var(--spacing-md);
  }
  
  .main-container {
    padding: var(--spacing-md);
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .footer-section {
    align-items: center;
    text-align: center;
  }
  
  .footer-links {
    align-items: center;
  }
  
  .footer-link {
    margin: 0 var(--spacing-sm);
  }
}
</style>