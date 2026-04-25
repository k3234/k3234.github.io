// API服务
// 用于与后端API进行通信，实现前端与后端的集成

class ApiService {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api';
    this.token = localStorage.getItem('token');
  }

  // 设置token
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // 获取token
  getToken() {
    return this.token;
  }

  // 清除token
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // 构建请求头
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // 通用请求方法
  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = this.getHeaders();
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API请求错误:', error);
      throw error;
    }
  }

  // GET请求
  async get(endpoint, params = {}) {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, {
      method: 'GET'
    });
  }

  // POST请求
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT请求
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE请求
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  // 用户相关API
  async register(userData) {
    return this.post('/users/register', userData);
  }

  async login(credentials) {
    return this.post('/users/login', credentials);
  }

  async getUserInfo() {
    return this.get('/users/me');
  }

  async updateUser(userData) {
    return this.put('/users/me', userData);
  }

  // 学习内容相关API
  async getContents(params = {}) {
    return this.get('/content', params);
  }

  async getContentById(id) {
    return this.get(`/content/${id}`);
  }

  async createContent(contentData) {
    return this.post('/content', contentData);
  }

  async updateContent(id, contentData) {
    return this.put(`/content/${id}`, contentData);
  }

  async deleteContent(id) {
    return this.delete(`/content/${id}`);
  }

  // 学习进度相关API
  async getProgress(params = {}) {
    return this.get('/progress', params);
  }

  async getProgressById(id) {
    return this.get(`/progress/${id}`);
  }

  async createProgress(progressData) {
    return this.post('/progress', progressData);
  }

  async updateProgress(id, progressData) {
    return this.put(`/progress/${id}`, progressData);
  }

  async getProgressStats() {
    return this.get('/progress/stats/summary');
  }

  // 考试相关API
  async getExams(params = {}) {
    return this.get('/exams', params);
  }

  async getExamById(id) {
    return this.get(`/exams/${id}`);
  }

  async submitExam(id, answers) {
    return this.post(`/exams/${id}/submit`, answers);
  }

  // 管理员相关API
  async getUsers(params = {}) {
    return this.get('/admin/users', params);
  }

  async getSystemStats() {
    return this.get('/admin/stats');
  }
}

// 导出单例实例
export const apiService = new ApiService();