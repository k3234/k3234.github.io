<template>
  <div class="cloudflare-guide">
    <h2>将网站托管到 Cloudflare Free 计划指南</h2>
    <div class="guide-content">
      <section>
        <h3>1. Cloudflare Free 计划简介</h3>
        <p>Cloudflare 提供了免费的网站托管服务，包括：</p>
        <ul>
          <li>免费的 Pages 托管服务，支持静态网站部署</li>
          <li>全球 CDN 加速，提高网站加载速度</li>
          <li>免费的 SSL 证书，确保网站安全</li>
          <li>DDoS 保护，提高网站安全性</li>
          <li>基本的分析工具，了解网站访问情况</li>
        </ul>
      </section>
      
      <section>
        <h3>2. 注册 Cloudflare 账户</h3>
        <p>首先，你需要注册一个 Cloudflare 账户：</p>
        <ol>
          <li>访问 <a href="https://www.cloudflare.com" target="_blank">Cloudflare 官网</a></li>
          <li>点击 "Sign Up" 或 "注册" 按钮</li>
          <li>输入你的电子邮件地址和密码</li>
          <li>完成邮箱验证</li>
        </ol>
      </section>
      
      <section>
        <h3>3. 部署网站到 Cloudflare Pages</h3>
        <p>Cloudflare Pages 是 Cloudflare 提供的静态网站托管服务，适合部署前端项目：</p>
        
        <h4>方法一：通过 GitHub/GitLab 集成部署</h4>
        <ol>
          <li>将你的项目代码推送到 GitHub 或 GitLab 仓库</li>
          <li>登录 Cloudflare 仪表板</li>
          <li>点击左侧菜单中的 "Pages"</li>
          <li>点击 "Create a project" 或 "创建项目"</li>
          <li>选择你的 GitHub 或 GitLab 仓库</li>
          <li>配置构建设置：
            <ul>
              <li>Framework: 选择 "Vue" 或 "Other"</li>
              <li>Build command: <code>npm run build</code></li>
              <li>Build output directory: <code>dist</code></li>
            </ul>
          </li>
          <li>点击 "Save and Deploy" 或 "保存并部署"</li>
          <li>等待部署完成，获取你的网站 URL</li>
        </ol>
        
        <h4>方法二：手动上传部署</h4>
        <ol>
          <li>在本地构建你的项目：<code>npm run build</code></li>
          <li>登录 Cloudflare 仪表板</li>
          <li>点击左侧菜单中的 "Pages"</li>
          <li>点击 "Upload assets" 或 "上传资产"</li>
          <li>选择构建生成的 <code>dist</code> 文件夹中的所有文件</li>
          <li>点击 "Deploy" 或 "部署"</li>
          <li>等待部署完成，获取你的网站 URL</li>
        </ol>
      </section>
      
      <section>
        <h3>4. 配置域名（可选）</h3>
        <p>如果你有自己的域名，可以将其配置到 Cloudflare：</p>
        <ol>
          <li>在 Cloudflare 仪表板中，点击左侧菜单中的 "Websites"</li>
          <li>点击 "Add a site" 或 "添加站点"</li>
          <li>输入你的域名，点击 "Add site"</li>
          <li>选择 "Free" 计划，点击 "Continue"</li>
          <li>更新你的域名注册商的 nameservers 为 Cloudflare 提供的 nameservers</li>
          <li>等待域名验证完成（通常需要 24-48 小时）</li>
          <li>在 Pages 项目设置中，添加你的自定义域名</li>
        </ol>
      </section>
      
      <section>
        <h3>5. 性能优化设置</h3>
        <p>在 Cloudflare 仪表板中，你可以启用以下性能优化：</p>
        <ul>
          <li><strong>Auto Minify</strong>：自动压缩 HTML、CSS 和 JavaScript 文件</li>
          <li><strong>Brotli Compression</strong>：启用 Brotli 压缩，减小文件大小</li>
          <li><strong>Cloudflare CDN</strong>：确保 CDN 已启用，加速全球访问</li>
          <li><strong>HTTP/3 (QUIC)</strong>：启用 HTTP/3 协议，提高加载速度</li>
        </ul>
      </section>
      
      <section>
        <h3>6. 安全设置</h3>
        <p>Cloudflare 提供了以下免费安全功能：</p>
        <ul>
          <li><strong>SSL/TLS</strong>：确保 SSL/TLS 加密已启用（设置为 "Full" 模式）</li>
          <li><strong>DDoS Protection</strong>：默认已启用，保护网站免受 DDoS 攻击</li>
          <li><strong>WAF (Web Application Firewall)</strong>：启用基本的 WAF 规则</li>
          <li><strong>Bot Management</strong>：启用基本的机器人管理功能</li>
        </ul>
      </section>
      
      <section>
        <h3>7. 常见问题及解决方案</h3>
        
        <h4>问题：部署失败</h4>
        <p>解决方案：检查构建命令和输出目录是否正确，确保项目能够在本地成功构建。</p>
        
        <h4>问题：网站加载缓慢</h4>
        <p>解决方案：启用 CDN、压缩和缓存，优化图片和资源文件。</p>
        
        <h4>问题：SSL 证书错误</h4>
        <p>解决方案：确保 SSL/TLS 设置为 "Full" 模式，等待证书签发完成。</p>
        
        <h4>问题：自定义域名无法访问</h4>
        <p>解决方案：检查域名 nameservers 是否正确更新，等待 DNS 传播完成。</p>
      </section>
      
      <section>
        <h3>8. 学生优惠</h3>
        <p>作为学生，你还可以申请 GitHub Student Pack，其中包含 Cloudflare 的额外优惠：</p>
        <ol>
          <li>访问 <a href="https://education.github.com/pack" target="_blank">GitHub Student Pack</a></li>
          <li>使用教育邮箱验证学生身份</li>
          <li>获得 Cloudflare 的额外 credits 和功能</li>
        </ol>
      </section>
      
      <section>
        <h3>9. 总结</h3>
        <p>Cloudflare Free 计划为学生开发者提供了一个强大、安全、免费的网站托管解决方案。通过本指南，你可以轻松将你的项目部署到 Cloudflare，并享受全球 CDN 加速和安全保护。</p>
        <p>如果你在部署过程中遇到任何问题，可以参考 <a href="https://developers.cloudflare.com/pages/" target="_blank">Cloudflare Pages 官方文档</a> 或 <a href="https://community.cloudflare.com/" target="_blank">Cloudflare 社区</a> 获取帮助。</p>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.cloudflare-guide {
  max-width: 1000px;
  margin: 0 auto;
  animation: fadeInUp var(--transition-slow) ease-out;
}

.cloudflare-guide h2 {
  text-align: center;
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-xl);
  color: var(--text-primary);
  position: relative;
  padding-bottom: var(--spacing-sm);
}

.cloudflare-guide h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-full);
  animation: slideIn var(--transition-normal) ease-out;
}

.guide-content {
  background-color: var(--background-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
  border: 1px solid var(--border-color);
}

.guide-content section {
  margin-bottom: var(--spacing-xl);
  animation: slideInUp var(--transition-normal) ease-out;
}

.guide-content h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.guide-content h4 {
  font-size: var(--font-size-base);
  margin: var(--spacing-md) 0 var(--spacing-sm) 0;
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
}

.guide-content p {
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: var(--font-size-base);
}

.guide-content ul,
.guide-content ol {
  margin-bottom: var(--spacing-md);
  padding-left: var(--spacing-lg);
  color: var(--text-secondary);
}

.guide-content li {
  margin-bottom: var(--spacing-sm);
  line-height: 1.5;
}

.guide-content code {
  background-color: var(--background-light);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-family: 'Courier New', Courier, monospace;
  font-size: var(--font-size-sm);
  color: var(--error-color);
}

.guide-content a {
  color: var(--secondary-color);
  text-decoration: none;
  transition: all var(--transition-fast);
  font-weight: var(--font-weight-medium);
}

.guide-content a:hover {
  color: var(--secondary-dark);
  text-decoration: underline;
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
    width: 0;
  }
  to {
    width: 100px;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .guide-content {
    padding: var(--spacing-lg);
  }
  
  .cloudflare-guide h2 {
    font-size: var(--font-size-xl);
  }
  
  .guide-content h3 {
    font-size: var(--font-size-base);
  }
  
  .guide-content h4 {
    font-size: var(--font-size-sm);
  }
  
  .guide-content p,
  .guide-content li {
    font-size: var(--font-size-sm);
  }
  
  .guide-content code {
    font-size: var(--font-size-xs);
  }
}
</style>