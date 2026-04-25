<template>
  <div class="base-input-wrapper">
    <label v-if="label" :for="id" class="base-input-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      class="base-input"
    />
    <div v-if="error" class="base-input-error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'email', 'password', 'number', 'tel', 'url'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue', 'focus', 'blur']);
</script>

<style scoped>
.base-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 100%;
}

.base-input-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  user-select: none;
}

.base-input {
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--background-white);
  color: var(--text-primary);
  transition: all var(--transition-normal);
  width: 100%;
  box-sizing: border-box;
}

.base-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 var(--focus-ring-offset) var(--focus-ring);
}

.base-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--background-light);
}

.base-input:readonly {
  background-color: var(--background-light);
  cursor: default;
}

.base-input-error {
  font-size: var(--font-size-xs);
  color: var(--error-color);
  margin-top: var(--spacing-xs);
}

/* 响应式 */
@media (max-width: 640px) {
  .base-input {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
  }
  
  .base-input-label {
    font-size: var(--font-size-xs);
  }
}
</style>