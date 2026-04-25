# 部署文档

## 项目概述

高中生学习平台是一个基于Vue 3和Express的现代化学习管理系统，提供个性化学习路径、AI推荐、学习分析等功能。

## 系统要求

### 前端
- Node.js 18.0+ 
- npm 9.0+ 或 yarn 1.22+

### 后端
- Node.js 18.0+ 
- MongoDB 4.0+ (可选，当前使用内存数据库模拟)

## 部署步骤

### 1. 克隆代码库

```bash
git clone <repository-url>
cd high-school-learning-platform
```

### 2. 前端部署

#### 安装依赖

```bash
npm install
```

#### 构建生产版本

```bash
npm run build
```

构建完成后，生成的静态文件会保存在 `dist` 目录中。

#### 部署静态文件

将 `dist` 目录中的文件部署到任何静态文件服务器，如 Nginx、Apache 或云存储服务。

##### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name example.com;
    
    location / {
        root /path/to/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

### 3. 后端部署

#### 安装依赖

```bash
cd backend
npm install
```

#### 配置环境变量

创建 `.env` 文件，配置以下环境变量：

```env
# 服务器配置
PORT=3000

# 数据库配置 (可选，当前使用内存数据库)
MONGO_URI=mongodb://localhost:27017/learning-platform

# JWT 密钥
JWT_SECRET=your-jwt-secret-key

# 跨域配置
CORS_ORIGIN=*
```

#### 启动服务器

```bash
# 生产环境
npm start

# 开发环境
npm run dev
```

### 4. 配置反向代理

如果前端和后端部署在同一服务器上，建议使用 Nginx 配置反向代理，将 API 请求转发到后端服务器。

```nginx
server {
    listen 80;
    server_name example.com;
    
    location / {
        root /path/to/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 项目结构

### 前端

```
├── public/              # 静态资源
├── src/
│   ├── assets/          # 资源文件
│   ├── components/      # 组件
│   ├── services/        # 服务
│   ├── views/           # 页面
│   ├── router/          # 路由
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── dist/                # 构建输出
├── package.json         # 项目配置
└── vite.config.js       # Vite 配置
```

### 后端

```
├── models/              # 数据模型
├── routes/              # 路由
├── server.js            # 服务器入口
└── package.json         # 项目配置
```

## 安全注意事项

1. **环境变量**：不要将 `.env` 文件提交到版本控制系统
2. **JWT 密钥**：使用强密钥并定期更换
3. **CORS 配置**：在生产环境中限制 CORS 来源
4. **输入验证**：对所有用户输入进行验证
5. **密码加密**：使用 bcrypt 等安全算法加密密码

## 性能优化

1. **前端**：
   - 使用 Vue 3 的 Composition API
   - 组件懒加载
   - 图片优化
   - 代码分割

2. **后端**：
   - 使用内存数据库模拟，减少数据库查询
   - 缓存热点数据
   - 优化 API 响应时间

## 故障排查

### 常见问题

1. **前端无法连接后端**：检查 CORS 配置和后端服务器状态
2. **构建失败**：检查依赖版本和 Node.js 版本
3. **服务器启动失败**：检查端口是否被占用，环境变量是否正确配置

### 日志查看

```bash
# 前端构建日志
npm run build

# 后端服务器日志
npm start
```

## 联系方式

如有部署问题，请联系项目维护者。
