// AI学习推流测试脚本
// 模拟用户学习过程中AI的学习推流100次的结果

import { aiModelIntegration, initializeAIModel } from './src/services/aiModelIntegration.js';
import { runAITests } from './src/services/aiTestingFramework.js';

// 初始化AI模型
initializeAIModel();

async function testAILearningStream() {
  console.log('开始测试AI学习推流...');
  
  // 选择默认模型
  aiModelIntegration.selectModel('llama3');
  
  // 执行100次测试
  const report = await runAITests(aiModelIntegration, 100);
  
  // 输出测试报告
  console.log('\n=== AI学习推流测试报告 ===');
  console.log('\n1. 总体摘要');
  console.log(`总测试次数: ${report.testSummary.totalTests}`);
  console.log(`正确次数: ${report.testSummary.totalCorrect}`);
  console.log(`准确率: ${report.testSummary.overallAccuracy}%`);
  console.log(`平均响应时间: ${report.testSummary.averageResponseTime}ms`);
  
  console.log('\n2. 学科分析');
  Object.keys(report.subjectReports).forEach(subject => {
    const subReport = report.subjectReports[subject];
    console.log(`\n${subReport.name}:`);
    console.log(`  测试次数: ${subReport.total}`);
    console.log(`  正确次数: ${subReport.correct}`);
    console.log(`  准确率: ${subReport.accuracy}%`);
    console.log(`  平均响应时间: ${subReport.averageResponseTime}ms`);
    if (subReport.errors.length > 0) {
      console.log(`  错误问题: ${subReport.errors.length}个`);
      console.log(`  前3个错误问题: ${subReport.errors.slice(0, 3).join('; ')}`);
    }
  });
  
  console.log('\n3. 知识Gap分析');
  if (Object.keys(report.knowledgeGaps).length > 0) {
    Object.keys(report.knowledgeGaps).forEach(subject => {
      const gap = report.knowledgeGaps[subject];
      console.log(`\n${gap.subject}:`);
      console.log(`  错误率: ${gap.errorRate}%`);
      console.log(`  错误问题: ${gap.errorQuestions.slice(0, 3).join('; ')}`);
    });
  } else {
    console.log('  未发现明显的知识Gap');
  }
  
  console.log('\n4. 改进建议');
  if (report.recommendations.length > 0) {
    report.recommendations.forEach((recommendation, index) => {
      console.log(`\n${index + 1}. ${recommendation.type}: ${recommendation.description}`);
    });
  } else {
    console.log('  暂无改进建议');
  }
  
  console.log('\n测试完成！');
  return report;
}

// 执行测试
testAILearningStream().catch(console.error);