<template>
  <nav class="base-nav">
    <div class="base-nav__brand" v-if="brand">
      <slot name="brand">{{ brand }}</slot>
    </div>
    <div class="base-nav__links">
      <router-link 
        v-for="link in links" 
        :key="link.path"
        :to="link.path"
        class="base-nav__link"
        :class="{ 'base-nav__link--active': $route.path === link.path }"
      >
        <span v-if="link.icon" class="base-nav__link-icon">{{ link.icon }}</span>
        <span class="base-nav__link-text">{{ link.text }}</span>
      </router-link>
      <div v-if="$slots.actions" class="base-nav__actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  brand: {
    type: String,
    default: ''
  },
  links: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.base-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.base-nav__brand {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.base-nav__brand:hover {
  transform: scale(1.02);
}

.base-nav__links {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.base-nav__link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-normal);
  position: relative;
  white-space: nowrap;
}

.base-nav__link:hover {
  color: var(--primary-color);
  background-color: var(--background-light);
  transform: translateY(-1px);
}

.base-nav__link--active {
  color: var(--primary-color);
  font-weight: var(--font-weight-semibold);
  background-color: var(--background-light);
}

.base-nav__link--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 2px;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-full);
  animation: slideIn var(--transition-normal) ease-out;
}

.base-nav__link-icon {
  font-size: var(--font-size-base);
  line-height: 1;
}

.base-nav__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

@keyframes slideIn {
  from {
    width: 0;
  }
  to {
    width: 80%;
  }
}

/* 响应式 */
@media (max-width: 1024px) {
  .base-nav__link-text {
    display: none;
  }
  
  .base-nav__link {
    padding: var(--spacing-sm);
  }
  
  .base-nav__link-icon {
    font-size: var(--font-size-lg);
  }
}

@media (max-width: 640px) {
  .base-nav {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }
  
  .base-nav__links {
    width: 100%;
    justify-content: space-between;
  }
  
  .base-nav__link {
    padding: var(--spacing-xs);
  }
}
</style>