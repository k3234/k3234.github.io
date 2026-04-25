<template>
  <div 
    :class="[
      'base-card',
      `base-card--${variant}`,
      { 'base-card--elevated': elevated }
    ]"
  >
    <div v-if="header" class="base-card__header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="base-card__content">
      <slot></slot>
    </div>
    <div v-if="footer" class="base-card__footer">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'outlined', 'filled'].includes(value)
  },
  header: {
    type: String,
    default: ''
  },
  footer: {
    type: String,
    default: ''
  },
  elevated: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.base-card {
  background-color: var(--background-white);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
}

/* 变体 */
.base-card--default {
  border: 1px solid var(--border-color);
}

.base-card--outlined {
  border: 2px solid var(--border-color);
  background-color: transparent;
}

.base-card--filled {
  background-color: var(--primary-light);
  border: 1px solid var(--primary-color);
}

/* 悬停效果 */
.base-card:hover {
  transform: translateY(-2px);
}

/* 阴影效果 */
.base-card--elevated {
  box-shadow: var(--shadow-lg);
}

.base-card--elevated:hover {
  box-shadow: var(--shadow-xl);
}

/* 卡片头部 */
.base-card__header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  color: var(--text-primary);
  background-color: var(--background-light);
}

/* 卡片内容 */
.base-card__content {
  padding: var(--spacing-lg);
  flex: 1;
}

/* 卡片底部 */
.base-card__footer {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  background-color: var(--background-light);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
}

/* 响应式 */
@media (max-width: 640px) {
  .base-card__header,
  .base-card__content,
  .base-card__footer {
    padding: var(--spacing-md);
  }
  
  .base-card__header {
    font-size: var(--font-size-base);
  }
}
</style>