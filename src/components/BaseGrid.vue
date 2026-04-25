<template>
  <div 
    :class="[
      'base-grid',
      `base-grid--${cols}`,
      `base-grid--${gap}`
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  cols: {
    type: String,
    default: 'auto',
    validator: (value) => ['auto', '1', '2', '3', '4', '5', '6'].includes(value)
  },
  gap: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
});
</script>

<style scoped>
.base-grid {
  display: grid;
  width: 100%;
}

/* 列数 */
.base-grid--auto {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.base-grid--1 {
  grid-template-columns: 1fr;
}

.base-grid--2 {
  grid-template-columns: repeat(2, 1fr);
}

.base-grid--3 {
  grid-template-columns: repeat(3, 1fr);
}

.base-grid--4 {
  grid-template-columns: repeat(4, 1fr);
}

.base-grid--5 {
  grid-template-columns: repeat(5, 1fr);
}

.base-grid--6 {
  grid-template-columns: repeat(6, 1fr);
}

/* 间距 */
.base-grid--sm {
  gap: var(--spacing-sm);
}

.base-grid--md {
  gap: var(--spacing-md);
}

.base-grid--lg {
  gap: var(--spacing-lg);
}

.base-grid--xl {
  gap: var(--spacing-xl);
}

/* 响应式 */
@media (max-width: 1024px) {
  .base-grid--4,
  .base-grid--5,
  .base-grid--6 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .base-grid--3,
  .base-grid--4,
  .base-grid--5,
  .base-grid--6 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .base-grid--2,
  .base-grid--3,
  .base-grid--4,
  .base-grid--5,
  .base-grid--6 {
    grid-template-columns: 1fr;
  }
}
</style>