<template>
  <div class="adsense-container">
    <div class="ad-label">广告</div>
    <!-- Google AdSense 广告单元 -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="XXXXXXXXXX"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </div>
</template>

<script setup>
// 组件挂载后加载 AdSense 脚本
import { onMounted } from 'vue';

onMounted(() => {
  // 加载 Google AdSense 脚本
  if (typeof window !== 'undefined' && !window.adsbygoogle) {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
  
  // 初始化广告
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    window.adsbygoogle.push({});
  }
});
</script>

<style scoped>
.adsense-container {
  margin: var(--spacing-xl) 0;
  padding: var(--spacing-md);
  background-color: var(--background-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.ad-label {
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  background-color: var(--background-light);
  padding: 2px var(--spacing-xs);
  border-radius: var(--border-radius-sm);
  z-index: 1;
}

.adsbygoogle {
  width: 100%;
  min-height: 250px;
}

@media (max-width: 768px) {
  .adsense-container {
    margin: var(--spacing-lg) 0;
    padding: var(--spacing-sm);
  }
  
  .adsbygoogle {
    min-height: 200px;
  }
}
</style>