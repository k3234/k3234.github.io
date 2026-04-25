<template>
  <button 
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      { 'base-button--full-width': fullWidth }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-family: var(--font-family);
  font-weight: var(--font-weight-medium);
  border: none;
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  user-select: none;
}

/* 尺寸变体 */
.base-button--small {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
  height: 32px;
}

.base-button--medium {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-base);
  height: 40px;
}

.base-button--large {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
  height: 48px;
}

/* 变体样式 */
.base-button--primary {
  background-color: var(--primary-color);
  color: white;
}

.base-button--primary:hover:not(:disabled) {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.base-button--primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.base-button--secondary {
  background-color: var(--secondary-color);
  color: white;
}

.base-button--secondary:hover:not(:disabled) {
  background-color: var(--secondary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.base-button--secondary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.base-button--outline {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.base-button--outline:hover:not(:disabled) {
  background-color: rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.base-button--outline:active:not(:disabled) {
  transform: translateY(0);
}

.base-button--ghost {
  background-color: transparent;
  color: var(--text-primary);
  border: none;
}

.base-button--ghost:hover:not(:disabled) {
  background-color: var(--background-light);
  transform: translateY(-1px);
}

.base-button--ghost:active:not(:disabled) {
  transform: translateY(0);
}

.base-button--danger {
  background-color: var(--error-color);
  color: white;
}

.base-button--danger:hover:not(:disabled) {
  background-color: #dc2626;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.base-button--danger:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.base-button--success {
  background-color: var(--success-color);
  color: white;
}

.base-button--success:hover:not(:disabled) {
  background-color: var(--secondary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.base-button--success:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.base-button--warning {
  background-color: var(--warning-color);
  color: white;
}

.base-button--warning:hover:not(:disabled) {
  background-color: var(--accent-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.base-button--warning:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* 状态 */
.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* 全宽 */
.base-button--full-width {
  width: 100%;
}

/* 加载状态 */
.base-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  opacity: 0;
  visibility: hidden;
}

.base-button.loading::after {
  opacity: 1;
  visibility: visible;
}

.base-button.loading {
  color: transparent;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 响应式 */
@media (max-width: 640px) {
  .base-button--large {
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: var(--font-size-base);
    height: 44px;
  }
  
  .base-button--full-width {
    width: 100%;
  }
}
</style>