<template>
  <div class="turnstile-container">
    <div 
      ref="turnstileRef"
      class="cf-turnstile"
      data-sitekey="YOUR_SITE_KEY"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const turnstileRef = ref(null);
const token = ref('');

// 暴露token给父组件
const emit = defineEmits(['token']);

onMounted(() => {
  // 加载Turnstile脚本
  if (typeof window !== 'undefined' && !window.turnstile) {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
  
  // 初始化Turnstile
  if (typeof window !== 'undefined' && window.turnstile) {
    initializeTurnstile();
  } else {
    // 等待脚本加载完成
    setTimeout(initializeTurnstile, 1000);
  }
});

function initializeTurnstile() {
  if (typeof window !== 'undefined' && window.turnstile && turnstileRef.value) {
    window.turnstile.render(turnstileRef.value, {
      sitekey: 'YOUR_SITE_KEY',
      theme: 'light',
      callback: (tokenValue) => {
        token.value = tokenValue;
        emit('token', tokenValue);
      },
      errorCallback: (error) => {
        console.error('Turnstile error:', error);
      }
    });
  }
}

// 重置Turnstile
function reset() {
  if (typeof window !== 'undefined' && window.turnstile) {
    window.turnstile.reset();
  }
}

// 暴露重置方法
defineExpose({
  reset
});
</script>

<style scoped>
.turnstile-container {
  margin: var(--spacing-md) 0;
  display: flex;
  justify-content: center;
}

.cf-turnstile {
  min-height: 60px;
}
</style>