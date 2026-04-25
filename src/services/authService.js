// 用户认证服务
// 使用后端API进行用户认证

import { apiService } from './apiService';

class AuthService {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    this.token = localStorage.getItem('token') || null;
  }

  // 注册新用户
  async register(userData) {
    try {
      const response = await apiService.register(userData);
      if (response && response.token) {
        this.currentUser = response.user;
        this.token = response.token;
        apiService.setToken(response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
      }
      return {
        success: true,
        message: response.message || '注册成功',
        userId: response.user?.id
      };
    } catch (error) {
      console.error('注册失败:', error);
      throw error;
    }
  }

  // 用户登录
  async login(email, password) {
    try {
      const response = await apiService.login({ email, password });
      if (response && response.token) {
        this.currentUser = response.user;
        this.token = response.token;
        apiService.setToken(response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
      }
      return {
        success: true,
        message: response.message || '登录成功',
        user: this.currentUser
      };
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    }
  }

  // 登出
  logout() {
    this.currentUser = null;
    this.token = null;
    apiService.clearToken();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    return {
      success: true,
      message: '登出成功'
    };
  }

  // 忘记密码
  async forgotPassword(email) {
    // 模拟发送验证码
    console.log('发送重置密码验证码到:', email);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('验证码:', code);
    return {
      success: true,
      message: '重置密码验证码已发送到您的邮箱',
      code
    };
  }

  // 重置密码
  async resetPassword(email, code, newPassword) {
    // 模拟重置密码
    console.log('重置密码:', email, code, newPassword);
    return {
      success: true,
      message: '密码重置成功'
    };
  }

  // 获取当前用户
  getCurrentUser() {
    return this.currentUser;
  }

  // 检查用户是否已登录
  isAuthenticated() {
    return !!this.token;
  }

  // 检查用户权限
  hasPermission(permission) {
    if (!this.currentUser) {
      return false;
    }

    // 角色权限映射
    const rolePermissions = {
      admin: ['manage_users', 'manage_content', 'view_analytics'],
      teacher: ['manage_content', 'view_students'],
      student: ['view_content', 'update_profile']
    };

    const permissions = rolePermissions[this.currentUser.role] || [];
    return permissions.includes(permission);
  }

  // 更新用户信息
  async updateUserProfile(userId, updates) {
    try {
      const response = await apiService.updateUser(updates);
      if (response && response.user) {
        this.currentUser = response.user;
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      }
      return {
        success: true,
        message: response.message || '用户信息更新成功',
        user: response.user
      };
    } catch (error) {
      console.error('更新用户信息失败:', error);
      throw error;
    }
  }

  // 获取用户列表（管理员功能）
  async getUsers() {
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      throw new Error('权限不足');
    }

    try {
      const response = await apiService.getUsers();
      return response.users || [];
    } catch (error) {
      console.error('获取用户列表失败:', error);
      throw error;
    }
  }
}

// 导出单例实例
export const authService = new AuthService();

// 初始化函数
export const initializeAuth = () => {
  console.log('认证服务初始化完成');
};

// 测试函数
export const testAuthService = async () => {
  console.log('测试认证服务...');
  
  try {
    // 测试登录
    console.log('测试登录...');
    const loginResult = await authService.login('admin@example.com', 'admin123');
    console.log('登录结果:', loginResult);

    // 测试获取当前用户
    console.log('测试获取当前用户...');
    const currentUser = authService.getCurrentUser();
    console.log('当前用户:', currentUser);

    // 测试登出
    console.log('测试登出...');
    const logoutResult = authService.logout();
    console.log('登出结果:', logoutResult);

    console.log('认证服务测试完成');
  } catch (error) {
    console.error('测试错误:', error);
  }
};