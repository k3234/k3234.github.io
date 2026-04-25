// 综合测试脚本
import axios from 'axios';

// 测试配置
const TEST_COUNT = 100;
const API_BASE_URL = 'http://localhost:3000/api';

// 测试结果
const testResults = {
  totalTests: TEST_COUNT,
  passedTests: 0,
  failedTests: 0,
  testDetails: [],
  performanceMetrics: {
    login: [],
    getContent: [],
    getExams: [],
    submitExam: []
  },
  errors: []
};

// 测试用例
const testCases = [
  {
    name: '用户登录',
    execute: async () => {
      const startTime = Date.now();
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email: 'admin@example.com',
        password: 'admin123'
      });
      const endTime = Date.now();
      return {
        success: response.status === 200,
        response: response.data,
        time: endTime - startTime
      };
    }
  },
  {
    name: '获取学习内容',
    execute: async (token) => {
      const startTime = Date.now();
      const response = await axios.get(`${API_BASE_URL}/content`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const endTime = Date.now();
      return {
        success: response.status === 200,
        response: response.data,
        time: endTime - startTime
      };
    }
  },
  {
    name: '获取考试列表',
    execute: async (token) => {
      const startTime = Date.now();
      const response = await axios.get(`${API_BASE_URL}/exams`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const endTime = Date.now();
      return {
        success: response.status === 200,
        response: response.data,
        time: endTime - startTime
      };
    }
  },
  {
    name: '提交考试答案',
    execute: async (token) => {
      const startTime = Date.now();
      const response = await axios.post(`${API_BASE_URL}/exams/1/submit`, {
        answers: ['x = -3 或 x = 1/2']
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const endTime = Date.now();
      return {
        success: response.status === 200,
        response: response.data,
        time: endTime - startTime
      };
    }
  },
  {
    name: '获取学习统计',
    execute: async (token) => {
      const startTime = Date.now();
      const response = await axios.get(`${API_BASE_URL}/progress/stats/summary`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const endTime = Date.now();
      return {
        success: response.status === 200,
        response: response.data,
        time: endTime - startTime
      };
    }
  }
];

// 执行单次测试
async function runSingleTest(testIndex) {
  console.log(`执行测试 ${testIndex + 1}/${TEST_COUNT}`);
  
  try {
    // 1. 登录
    const loginResult = await testCases[0].execute();
    testResults.performanceMetrics.login.push(loginResult.time);
    
    if (!loginResult.success) {
      throw new Error('登录失败');
    }
    
    const token = loginResult.response.token;
    
    // 2. 测试其他功能
    const testDetails = [];
    
    for (let i = 1; i < testCases.length; i++) {
      const testCase = testCases[i];
      const result = await testCase.execute(token);
      
      // 记录性能指标
      switch (testCase.name) {
        case '获取学习内容':
          testResults.performanceMetrics.getContent.push(result.time);
          break;
        case '获取考试列表':
          testResults.performanceMetrics.getExams.push(result.time);
          break;
        case '提交考试答案':
          testResults.performanceMetrics.submitExam.push(result.time);
          break;
      }
      
      testDetails.push({
        name: testCase.name,
        success: result.success,
        time: result.time
      });
      
      if (!result.success) {
        throw new Error(`${testCase.name} 失败`);
      }
    }
    
    // 测试通过
    testResults.passedTests++;
    testResults.testDetails.push({
      testIndex,
      success: true,
      details: testDetails
    });
    
  } catch (error) {
    // 测试失败
    testResults.failedTests++;
    testResults.testDetails.push({
      testIndex,
      success: false,
      error: error.message
    });
    testResults.errors.push({
      testIndex,
      error: error.message
    });
  }
}

// 计算平均值
function calculateAverage(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
}

// 生成测试报告
function generateTestReport() {
  const report = {
    testSummary: {
      totalTests: testResults.totalTests,
      passedTests: testResults.passedTests,
      failedTests: testResults.failedTests,
      passRate: (testResults.passedTests / testResults.totalTests * 100).toFixed(2) + '%'
    },
    performanceMetrics: {
      login: {
        averageTime: calculateAverage(testResults.performanceMetrics.login).toFixed(2) + 'ms',
        minTime: Math.min(...testResults.performanceMetrics.login) + 'ms',
        maxTime: Math.max(...testResults.performanceMetrics.login) + 'ms'
      },
      getContent: {
        averageTime: calculateAverage(testResults.performanceMetrics.getContent).toFixed(2) + 'ms',
        minTime: Math.min(...testResults.performanceMetrics.getContent) + 'ms',
        maxTime: Math.max(...testResults.performanceMetrics.getContent) + 'ms'
      },
      getExams: {
        averageTime: calculateAverage(testResults.performanceMetrics.getExams).toFixed(2) + 'ms',
        minTime: Math.min(...testResults.performanceMetrics.getExams) + 'ms',
        maxTime: Math.max(...testResults.performanceMetrics.getExams) + 'ms'
      },
      submitExam: {
        averageTime: calculateAverage(testResults.performanceMetrics.submitExam).toFixed(2) + 'ms',
        minTime: Math.min(...testResults.performanceMetrics.submitExam) + 'ms',
        maxTime: Math.max(...testResults.performanceMetrics.submitExam) + 'ms'
      }
    },
    errors: testResults.errors,
    recommendations: [
      '优化登录响应时间',
      '增加错误处理和用户提示',
      '优化数据库查询性能',
      '添加更多的测试用例覆盖边缘情况',
      '实现更详细的日志记录'
    ]
  };
  
  return report;
}

// 执行所有测试
async function runAllTests() {
  console.log(`开始执行 ${TEST_COUNT} 次综合测试...`);
  
  for (let i = 0; i < TEST_COUNT; i++) {
    await runSingleTest(i);
  }
  
  console.log('测试完成，生成测试报告...');
  
  const report = generateTestReport();
  console.log('\n=== 测试报告 ===');
  console.log(JSON.stringify(report, null, 2));
  
  // 保存测试报告到文件
  const fs = await import('fs');
  fs.writeFileSync('test-report.json', JSON.stringify(report, null, 2));
  console.log('\n测试报告已保存到 test-report.json');
}

// 运行测试
runAllTests();