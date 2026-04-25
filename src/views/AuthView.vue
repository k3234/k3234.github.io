<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>{{ activeTab === 'login' ? '登录' : activeTab === 'register' ? '注册' : '忘记密码' }}</h2>
        <div class="auth-tabs">
          <button 
            :class="['auth-tab', { active: activeTab === 'login' }]"
            @click="activeTab = 'login'"
          >
            登录
          </button>
          <button 
            :class="['auth-tab', { active: activeTab === 'register' }]"
            @click="activeTab = 'register'"
          >
            注册
          </button>
          <button 
            :class="['auth-tab', { active: activeTab === 'forgot' }]"
            @click="activeTab = 'forgot'"
          >
            忘记密码
          </button>
        </div>
      </div>
      
      <!-- 登录表单 -->
      <div v-if="activeTab === 'login'" class="auth-form">
        <div class="form-group">
          <label for="login-email">邮箱</label>
          <BaseInput 
            type="email" 
            id="login-email" 
            v-model="loginForm.email"
            placeholder="请输入您的邮箱"
            required
          />
        </div>
        <div class="form-group">
          <label for="login-password">密码</label>
          <BaseInput 
            type="password" 
            id="login-password" 
            v-model="loginForm.password"
            placeholder="请输入您的密码"
            required
          />
        </div>

        <div class="form-actions">
          <button class="auth-btn" @click="login">登录</button>
        </div>
        <div class="form-footer">
          <p>还没有账号？ <a href="#" @click.prevent="activeTab = 'register'">立即注册</a></p>
        </div>
      </div>
      
      <!-- 注册表单 -->
      <div v-else-if="activeTab === 'register'" class="auth-form">
        <div class="form-group">
          <label for="register-username">用户名</label>
          <BaseInput 
            type="text" 
            id="register-username" 
            v-model="registerForm.username"
            placeholder="请输入您的用户名"
            required
          />
        </div>
        <div class="form-group">
          <label for="register-email">邮箱</label>
          <BaseInput 
            type="email" 
            id="register-email" 
            v-model="registerForm.email"
            placeholder="请输入您的邮箱"
            required
          />
        </div>
        <div class="form-group">
          <label for="register-password">密码</label>
          <BaseInput 
            type="password" 
            id="register-password" 
            v-model="registerForm.password"
            placeholder="请输入您的密码"
            required
          />
        </div>
        <div class="form-group">
          <label for="register-grade">年级</label>
          <select id="register-grade" v-model="registerForm.grade" required>
            <option value="">请选择年级</option>
            <option value="high-school-1">高一</option>
            <option value="high-school-2">高二</option>
            <option value="high-school-3">高三</option>
          </select>
        </div>
        <div class="form-group">
          <label>学科</label>
          <div class="subject-checkboxes">
            <label v-for="subject in subjects" :key="subject.value">
              <input 
                type="checkbox" 
                :value="subject.value"
                v-model="registerForm.subjects"
              />
              {{ subject.label }}
            </label>
          </div>
        </div>

        <div class="form-actions">
          <button class="auth-btn" @click="register">注册</button>
        </div>
        <div class="form-footer">
          <p>已有账号？ <a href="#" @click.prevent="activeTab = 'login'">立即登录</a></p>
        </div>
      </div>
      
      <!-- 忘记密码表单 -->
      <div v-else-if="activeTab === 'forgot'" class="auth-form">
        <div class="form-group" v-if="!resetStep">
          <label for="forgot-email">邮箱</label>
          <BaseInput 
            type="email" 
            id="forgot-email" 
            v-model="forgotForm.email"
            placeholder="请输入您的邮箱"
            required
          />
        </div>
        <div v-else class="form-group">
          <label for="reset-code">验证码</label>
          <BaseInput 
            type="text" 
            id="reset-code" 
            v-model="forgotForm.code"
            placeholder="请输入邮箱收到的验证码"
            required
          />
        </div>
        <div class="form-group">
          <label for="reset-password">新密码</label>
          <BaseInput 
            type="password" 
            id="reset-password" 
            v-model="forgotForm.newPassword"
            placeholder="请输入新密码"
            required
          />
        </div>
        <div class="form-actions">
          <button class="auth-btn" @click="resetStep ? resetPassword : sendResetCode">
            {{ resetStep ? '重置密码' : '发送验证码' }}
          </button>
        </div>
        <div class="form-footer">
          <p>想起密码了？ <a href="#" @click.prevent="activeTab = 'login'">立即登录</a></p>
        </div>
      </div>
      
      <!-- 消息提示 -->
      <div v-if="message" :class="['message', messageType]">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/authService';
import BaseInput from '../components/BaseInput.vue';

const router = useRouter();

// 活跃标签
const activeTab = ref('login');

// 登录表单
const loginForm = ref({
  email: '',
  password: '',
  turnstileToken: ''
});

// 注册表单
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  grade: '',
  subjects: [],
  turnstileToken: ''
});

// 忘记密码表单
const forgotForm = ref({
  email: '',
  code: '',
  newPassword: ''
});

// 重置步骤
const resetStep = ref(false);

// 消息
const message = ref('');
const messageType = ref('');

// 学科选项
const subjects = [
  { label: '数学', value: 'math' },
  { label: '物理', value: 'physics' },
  { label: '化学', value: 'chemistry' },
  { label: '生物', value: 'biology' }
];

// 登录
const login = async () => {
  try {
    const result = await authService.login(loginForm.value.email, loginForm.value.password);
    message.value = result.message;
    messageType.value = 'success';
    // 登录成功后跳转到首页
    setTimeout(() => {
      router.push('/');
    }, 1000);
  } catch (error) {
    message.value = error.message;
    messageType.value = 'error';
  }
};

// 注册
const register = async () => {
  try {
    const result = await authService.register(registerForm.value);
    message.value = result.message;
    messageType.value = 'success';
    // 注册成功后跳转到登录
    setTimeout(() => {
      activeTab.value = 'login';
    }, 2000);
  } catch (error) {
    message.value = error.message;
    messageType.value = 'error';
  }
};

// 发送重置密码验证码
const sendResetCode = async () => {
  try {
    const result = await authService.forgotPassword(forgotForm.value.email);
    message.value = result.message;
    messageType.value = 'success';
    resetStep.value = true;
  } catch (error) {
    message.value = error.message;
    messageType.value = 'error';
  }
};

// 重置密码
const resetPassword = async () => {
  try {
    const result = await authService.resetPassword(
      forgotForm.value.email,
      forgotForm.value.code,
      forgotForm.value.newPassword
    );
    message.value = result.message;
    messageType.value = 'success';
    // 重置成功后跳转到登录
    setTimeout(() => {
      activeTab.value = 'login';
      resetStep.value = false;
    }, 1000);
  } catch (error) {
    message.value = error.message;
    messageType.value = 'error';
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%);
  padding: var(--spacing-lg);
}

.auth-card {
  background-color: var(--background-white);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-xl);
  padding: var(--spacing-xl);
  width: 100%;
  max-width: 400px;
  animation: fadeInUp var(--transition-slow) ease-out;
}

.auth-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.auth-header h2 {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-weight: var(--font-weight-bold);
}

.auth-tabs {
  display: flex;
  border-bottom: 2px solid var(--border-color);
  margin-bottom: var(--spacing-lg);
}

.auth-tab {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  position: relative;
}

.auth-tab:hover {
  color: var(--primary-color);
}

.auth-tab.active {
  color: var(--primary-color);
  font-weight: var(--font-weight-semibold);
}

.auth-tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
  transition: width var(--transition-normal);
}

.auth-form {
  animation: slideIn var(--transition-normal) ease-out;
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  background-color: var(--background-white);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.subject-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xs);
}

.subject-checkboxes label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  cursor: pointer;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.subject-checkboxes label:hover {
  color: var(--primary-color);
}

.subject-checkboxes input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.form-actions {
  margin-top: var(--spacing-lg);
}

.auth-btn {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.auth-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.form-footer {
  margin-top: var(--spacing-md);
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.form-footer a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.form-footer a:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.message {
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-sm);
  text-align: center;
  animation: fadeIn var(--transition-normal) ease-out;
}

.message.success {
  background-color: var(--success-light);
  color: var(--success-color);
  border: 1px solid var(--success-border);
}

.message.error {
  background-color: var(--error-light);
  color: var(--error-color);
  border: 1px solid var(--error-border);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 480px) {
  .auth-card {
    padding: var(--spacing-lg);
  }
  
  .auth-header h2 {
    font-size: var(--font-size-lg);
  }
  
  .form-group input,
  .form-group select {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
  }
  
  .auth-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
  }
}
</style>