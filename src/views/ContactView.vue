<template>
  <PageLayout title="联系我们" description="如果您有任何问题或建议，欢迎与我们联系">
    <div class="contact-container">
      <div class="contact-info">
        <h3>联系方式</h3>
        <p>如果您有任何问题、建议或反馈，欢迎通过以下方式与我们联系：</p>
        <div class="contact-details">
          <div class="contact-item">
            <div class="contact-icon">📧</div>
            <div class="contact-content">
              <h4>电子邮件</h4>
              <p>contact@highschoollearning.com</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📱</div>
            <div class="contact-content">
              <h4>电话</h4>
              <p>400-123-4567</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">🌐</div>
            <div class="contact-content">
              <h4>网站</h4>
              <p>www.highschoollearning.com</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📍</div>
            <div class="contact-content">
              <h4>地址</h4>
              <p>北京市海淀区中关村大街1号</p>
            </div>
          </div>
        </div>
      </div>
      <div class="contact-form">
        <h3>发送消息</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">姓名</label>
            <BaseInput 
              id="name" 
              v-model="formData.name" 
              placeholder="请输入您的姓名" 
              required
            />
          </div>
          <div class="form-group">
            <label for="email">邮箱</label>
            <BaseInput 
              id="email" 
              type="email" 
              v-model="formData.email" 
              placeholder="请输入您的邮箱" 
              required
            />
          </div>
          <div class="form-group">
            <label for="subject">主题</label>
            <BaseInput 
              id="subject" 
              v-model="formData.subject" 
              placeholder="请输入消息主题" 
              required
            />
          </div>
          <div class="form-group">
            <label for="message">消息内容</label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              placeholder="请输入您的消息内容" 
              rows="5" 
              required
              class="form-textarea"
            ></textarea>
          </div>
          <BaseButton type="submit" variant="primary" size="medium" class="submit-btn">
            发送消息
          </BaseButton>
        </form>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref } from 'vue';
import PageLayout from '../components/PageLayout.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const submitForm = () => {
  // 模拟表单提交
  console.log('Form submitted:', formData.value);
  alert('消息发送成功！我们会尽快回复您。');
  // 重置表单
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
};
</script>

<style scoped>
.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  margin-top: var(--spacing-xl);
}

.contact-info {
  background-color: var(--background-white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
}

.contact-info h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

.contact-info p {
  margin-bottom: var(--spacing-xl);
  color: var(--text-secondary);
  line-height: 1.6;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-normal);
}

.contact-item:hover {
  background-color: var(--background-light);
  transform: translateX(5px);
}

.contact-icon {
  font-size: var(--font-size-xl);
  line-height: 1;
  margin-top: 2px;
}

.contact-content h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.contact-content p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.contact-form {
  background-color: var(--background-white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
}

.contact-form h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.form-textarea {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  resize: vertical;
  transition: all var(--transition-normal);
}

.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 var(--focus-ring-offset) var(--focus-ring);
}

.submit-btn {
  margin-top: var(--spacing-md);
  width: 100%;
}

/* 响应式 */
@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
  
  .contact-info,
  .contact-form {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 640px) {
  .contact-info h3,
  .contact-form h3 {
    font-size: var(--font-size-lg);
  }
}
</style>