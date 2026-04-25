<template>
  <div class="page-layout">
    <div class="page-header" v-if="title">
      <h1 class="page-title">{{ title }}</h1>
      <p class="page-description" v-if="description">{{ description }}</p>
    </div>
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.page-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.page-title {
  margin: 0;
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  line-height: 1.2;
}

.page-description {
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  line-height: 1.5;
}

.page-content {
  flex: 1;
  width: 100%;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-header {
    gap: var(--spacing-xs);
    padding-bottom: var(--spacing-md);
  }
  
  .page-title {
    font-size: var(--font-size-2xl);
  }
  
  .page-description {
    font-size: var(--font-size-base);
  }
}

@media (max-width: 640px) {
  .page-title {
    font-size: var(--font-size-xl);
  }
  
  .page-description {
    font-size: var(--font-size-sm);
  }
}
</style>