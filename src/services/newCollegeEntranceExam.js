// 新高考内容和教材改编题目服务

// 新高考省份信息
const newCollegeEntranceExamProvinces = [
  '山东', '广东', '福建', '湖南', '湖北', '河北', '江苏', '江西', '安徽', '河南', '浙江'
];

// 新高考题型结构
const examStructure = {
  math: {
    singleChoice: 8,
    multipleChoice: 3,
    fillBlank: 3,
   解答题: 5
  },
  physics: {
    singleChoice: 8,
    multipleChoice: 4,
    experimental: 2,
   计算题: 2
  },
  chemistry: {
    singleChoice: 7,
    multipleChoice: 3,
   填空题: 4,
   实验题: 1,
   计算题: 1
  },
  biology: {
    singleChoice: 6,
    multipleChoice: 4,
   填空题: 3,
   实验题: 1,
   简答题: 2
  }
};

// 核心考点
const coreTopics = {
  math: [
    '函数与导数', '解析几何', '立体几何', '概率统计', '数列', '三角函数', '基础模块'
  ],
  physics: [
    '力学', '电磁学', '热学', '光学', '近代物理'
  ],
  chemistry: [
    '化学计量', '元素周期表', '化学反应', '有机化学', '实验化学'
  ],
  biology: [
    '细胞结构', '细胞代谢', '遗传', '生态', '生物技术'
  ]
};

// 教材改编题目示例
const textbookAdaptedQuestions = {
  math: [
    {
      id: 'math-1',
      title: '函数的单调性',
      source: '人教A版必修一第237页例1',
      difficulty: 'medium',
      content: '已知函数f(x) = x³ - 3x，讨论其单调性。',
      solution: '求导得f\'(x) = 3x² - 3 = 3(x² - 1)，令f\'(x) > 0，解得x > 1或x < -1，此时函数单调递增；令f\'(x) < 0，解得-1 < x < 1，此时函数单调递减。'
    },
    {
      id: 'math-2',
      title: '三角函数的图像',
      source: '人教A版必修一第255页习题第15题',
      difficulty: 'medium',
      content: '画出函数y = 2sin(2x + π/3)的图像，并指出其周期、振幅和相位。',
      solution: '周期T = 2π/2 = π，振幅A = 2，相位φ = π/3。图像可以通过将y = sinx的图像先向左平移π/3个单位，再将横坐标压缩为原来的1/2，最后将纵坐标拉伸为原来的2倍得到。'
    }
  ],
  physics: [
    {
      id: 'physics-1',
      title: '牛顿运动定律',
      source: '人教A版必修一第45页例2',
      difficulty: 'medium',
      content: '一个质量为2kg的物体，在水平面上受到水平向右的拉力F = 10N，物体与水平面间的动摩擦因数μ = 0.2，求物体的加速度。',
      solution: '物体受到的摩擦力f = μmg = 0.2 × 2 × 9.8 = 3.92N，根据牛顿第二定律，F - f = ma，解得a = (10 - 3.92)/2 = 3.04m/s²。'
    }
  ],
  chemistry: [
    {
      id: 'chemistry-1',
      title: '化学计量',
      source: '人教A版必修一第12页例1',
      difficulty: 'easy',
      content: '计算1mol H₂O的质量。',
      solution: 'H₂O的摩尔质量为18g/mol，因此1mol H₂O的质量为18g。'
    }
  ],
  biology: [
    {
      id: 'biology-1',
      title: '细胞结构',
      source: '人教A版必修一第45页例1',
      difficulty: 'easy',
      content: '简述动物细胞和植物细胞的主要区别。',
      solution: '动物细胞没有细胞壁、叶绿体和液泡，而植物细胞有；动物细胞有中心体，而高等植物细胞没有。'
    }
  ]
};

// 新高考真题示例
const examQuestions = {
  math: [
    {
      id: 'exam-math-1',
      year: 2025,
      province: '全国卷',
      type: 'singleChoice',
      content: '已知集合A = {x | x² - 3x + 2 = 0}，B = {x | x² - 4x + 3 = 0}，则A ∩ B = ( )',
      options: ['{1}', '{2}', '{3}', '{1, 2, 3}'],
      answer: '{1}',
      explanation: '解集合A得x=1或x=2，解集合B得x=1或x=3，因此A ∩ B = {1}。'
    }
  ],
  physics: [
    {
      id: 'exam-physics-1',
      year: 2025,
      province: '全国卷',
      type: 'multipleChoice',
      content: '关于电磁感应，下列说法正确的是( )',
      options: [
        '感应电流的方向总是阻碍引起感应电流的磁通量的变化',
        '感应电动势的大小与磁通量的变化率成正比',
        '闭合回路中的磁通量越大，感应电动势越大',
        '闭合回路中的磁通量变化越快，感应电动势越大'
      ],
      answer: ['感应电流的方向总是阻碍引起感应电流的磁通量的变化', '感应电动势的大小与磁通量的变化率成正比', '闭合回路中的磁通量变化越快，感应电动势越大'],
      explanation: '根据楞次定律，感应电流的方向总是阻碍引起感应电流的磁通量的变化；根据法拉第电磁感应定律，感应电动势的大小与磁通量的变化率成正比，与磁通量的大小无关。'
    }
  ]
};

// 获取教材改编题目
export const getTextbookAdaptedQuestions = (subject, difficulty = 'all') => {
  const questions = textbookAdaptedQuestions[subject] || [];
  if (difficulty === 'all') {
    return questions;
  }
  return questions.filter(q => q.difficulty === difficulty);
};

// 获取新高考真题
export const getExamQuestions = (subject, year = 'all') => {
  const questions = examQuestions[subject] || [];
  if (year === 'all') {
    return questions;
  }
  return questions.filter(q => q.year === year);
};

// 获取核心考点
export const getCoreTopics = (subject) => {
  return coreTopics[subject] || [];
};

// 获取考试结构
export const getExamStructure = (subject) => {
  return examStructure[subject] || {};
};

// 获取新高考省份
export const getNewCollegeEntranceExamProvinces = () => {
  return newCollegeEntranceExamProvinces;
};

// 测试函数
export const testNewCollegeEntranceExam = () => {
  console.log('测试新高考内容服务...');
  console.log('新高考省份:', getNewCollegeEntranceExamProvinces());
  console.log('数学核心考点:', getCoreTopics('math'));
  console.log('数学教材改编题目:', getTextbookAdaptedQuestions('math'));
  console.log('数学考试结构:', getExamStructure('math'));
  return {
    provinces: getNewCollegeEntranceExamProvinces(),
    coreTopics: getCoreTopics('math'),
    textbookQuestions: getTextbookAdaptedQuestions('math'),
    examStructure: getExamStructure('math')
  };
};