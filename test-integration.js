// 集成测试脚本
import axios from 'axios';

// 测试后端API
async function testBackendAPI() {
  console.log('=== 测试后端API ===');
  
  try {
    // 测试用户登录
    console.log('1. 测试用户登录...');
    const loginResponse = await axios.post('http://localhost:3000/api/users/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });
    console.log('登录成功:', loginResponse.data.message);
    
    const token = loginResponse.data.token;
    
    // 测试获取学习内容
    console.log('2. 测试获取学习内容...');
    const contentResponse = await axios.get('http://localhost:3000/api/content', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('获取内容成功，数量:', contentResponse.data.contents.length);
    
    // 测试获取考试列表
    console.log('3. 测试获取考试列表...');
    const examResponse = await axios.get('http://localhost:3000/api/exams', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('获取考试成功，数量:', examResponse.data.exams.length);
    
    // 测试获取学习统计
    console.log('4. 测试获取学习统计...');
    const statsResponse = await axios.get('http://localhost:3000/api/progress/stats/summary', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('获取统计成功:', statsResponse.data.stats);
    
    console.log('=== 后端API测试完成 ===');
  } catch (error) {
    console.error('测试失败:', error.message);
    if (error.response) {
      console.error('响应数据:', error.response.data);
      console.error('响应状态:', error.response.status);
    }
  }
}

// 运行测试
testBackendAPI();