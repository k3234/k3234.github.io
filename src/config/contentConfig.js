// 学习内容配置文件
// 用于管理知识点和题目数据

// 知识点配置
export const knowledgePointsConfig = {
  math: [
    {
      id: 'math-1',
      title: '函数的单调性',
      content: '函数单调性的定义和判断方法',
      difficulty: 'medium',
      tags: ['core', 'gaokao']
    },
    {
      id: 'math-2',
      title: '三角函数的图像',
      content: '三角函数的图像和性质',
      difficulty: 'medium',
      tags: ['core', 'gaokao']
    },
    {
      id: 'math-3',
      title: '立体几何',
      content: '空间几何体的性质和计算',
      difficulty: 'hard',
      tags: ['gaokao']
    },
    {
      id: 'math-4',
      title: '圆锥曲线',
      content: '椭圆、双曲线、抛物线的性质和应用',
      difficulty: 'hard',
      tags: ['core', 'gaokao', 'difficult']
    },
    {
      id: 'math-5',
      title: '数列',
      content: '等差数列、等比数列的性质和求和',
      difficulty: 'medium',
      tags: ['core', 'gaokao']
    }
  ],
  physics: [
    {
      id: 'physics-1',
      title: '牛顿运动定律',
      content: '牛顿三大定律及其应用',
      difficulty: 'medium',
      tags: ['core', 'gaokao']
    },
    {
      id: 'physics-2',
      title: '电磁感应',
      content: '电磁感应现象和法拉第定律',
      difficulty: 'hard',
      tags: ['gaokao', 'difficult']
    },
    {
      id: 'physics-3',
      title: '动量守恒定律',
      content: '动量守恒定律的应用',
      difficulty: 'medium',
      tags: ['core', 'gaokao']
    },
    {
      id: 'physics-4',
      title: '能量守恒定律',
      content: '动能、势能和机械能守恒',
      difficulty: 'medium',
      tags: ['core', 'gaokao']
    },
    {
      id: 'physics-5',
      title: '电路分析',
      content: '串并联电路和欧姆定律',
      difficulty: 'medium',
      tags: ['core']
    }
  ],
  chemistry: [
    {
      id: 'chemistry-1',
      title: '化学计量',
      content: '物质的量和摩尔质量',
      difficulty: 'easy',
      tags: ['core']
    },
    {
      id: 'chemistry-2',
      title: '元素周期表',
      content: '元素周期表的结构和元素性质',
      difficulty: 'medium',
      tags: ['core', 'gaokao']
    },
    {
      id: 'chemistry-3',
      title: '化学反应速率',
      content: '化学反应速率的计算和影响因素',
      difficulty: 'medium',
      tags: ['core', 'gaokao']
    },
    {
      id: 'chemistry-4',
      title: '化学平衡',
      content: '化学平衡的建立和移动',
      difficulty: 'hard',
      tags: ['gaokao', 'difficult']
    },
    {
      id: 'chemistry-5',
      title: '有机化学',
      content: '有机物的结构和性质',
      difficulty: 'hard',
      tags: ['gaokao', 'difficult']
    }
  ],
  biology: [
    {
      id: 'biology-1',
      title: '细胞结构',
      content: '细胞的基本结构和功能',
      difficulty: 'easy',
      tags: ['core']
    },
    {
      id: 'biology-2',
      title: '遗传规律',
      content: '孟德尔遗传定律和基因工程',
      difficulty: 'hard',
      tags: ['core', 'gaokao', 'difficult']
    },
    {
      id: 'biology-3',
      title: '光合作用',
      content: '光合作用的过程和影响因素',
      difficulty: 'medium',
      tags: ['core', 'gaokao']
    },
    {
      id: 'biology-4',
      title: '细胞呼吸',
      content: '有氧呼吸和无氧呼吸',
      difficulty: 'medium',
      tags: ['core']
    },
    {
      id: 'biology-5',
      title: '生态系统',
      content: '生态系统的结构和功能',
      difficulty: 'medium',
      tags: ['gaokao']
    }
  ]
};

// 题目配置
export const questionsConfig = {
  math: [
    {
      id: 'math-q1',
      content: '已知函数f(x) = x³ - 3x，讨论其单调性。',
      options: [],
      answer: '求导得f\'(x) = 3x² - 3 = 3(x² - 1)，令f\'(x) > 0，解得x > 1或x < -1，此时函数单调递增；令f\'(x) < 0，解得-1 < x < 1，此时函数单调递减。',
      explanation: '利用导数判断函数单调性是高考重点内容，需要掌握导数的计算和符号判断。',
      difficulty: 'medium',
      knowledgePoints: ['math-1']
    },
    {
      id: 'math-q2',
      content: '画出函数y = 2sin(2x + π/3)的图像，并指出其周期、振幅和相位。',
      options: [],
      answer: '周期T = 2π/2 = π，振幅A = 2，相位φ = π/3。图像可以通过将y = sinx的图像先向左平移π/3个单位，再将横坐标压缩为原来的1/2，最后将纵坐标拉伸为原来的2倍得到。',
      explanation: '三角函数的图像变换是高考高频考点，需要掌握平移、伸缩等变换规律。',
      difficulty: 'medium',
      knowledgePoints: ['math-2']
    },
    {
      id: 'math-q3',
      content: '已知椭圆的长轴长为8，焦距为4，求椭圆的标准方程。',
      options: [],
      answer: '长轴长2a = 8，所以a = 4；焦距2c = 4，所以c = 2。根据b² = a² - c²，得b² = 16 - 4 = 12。当焦点在x轴上时，标准方程为x²/16 + y²/12 = 1；当焦点在y轴上时，标准方程为y²/16 + x²/12 = 1。',
      explanation: '椭圆的标准方程是圆锥曲线的基础内容，需要掌握a、b、c之间的关系。',
      difficulty: 'medium',
      knowledgePoints: ['math-4']
    }
  ],
  physics: [
    {
      id: 'physics-q1',
      content: '一个质量为2kg的物体，在水平面上受到水平向右的拉力F = 10N，物体与水平面间的动摩擦因数μ = 0.2，求物体的加速度。',
      options: [],
      answer: '物体受到的摩擦力f = μmg = 0.2 × 2 × 9.8 = 3.92N，根据牛顿第二定律，F - f = ma，解得a = (10 - 3.92)/2 = 3.04m/s²。',
      explanation: '牛顿运动定律是力学的核心内容，需要掌握受力分析和加速度计算。',
      difficulty: 'medium',
      knowledgePoints: ['physics-1']
    },
    {
      id: 'physics-q2',
      content: '一个闭合线圈在匀强磁场中以角速度ω匀速转动，线圈面积为S，磁感应强度为B，求线圈中产生的感应电动势的最大值。',
      options: [],
      answer: '感应电动势的最大值Emax = BSω，其中B是磁感应强度，S是线圈面积，ω是角速度。',
      explanation: '电磁感应是高考重点内容，需要掌握法拉第电磁感应定律和感应电动势的计算。',
      difficulty: 'medium',
      knowledgePoints: ['physics-2']
    }
  ],
  chemistry: [
    {
      id: 'chemistry-q1',
      content: '计算0.1mol/L NaOH溶液的pH值。',
      options: [],
      answer: 'NaOH是强电解质，完全电离，所以c(OH-) = 0.1mol/L。根据Kw = c(H+) × c(OH-) = 10^-14，得c(H+) = 10^-13mol/L，pH = -log10(c(H+)) = 13。',
      explanation: 'pH值的计算是化学计量的重要内容，需要掌握水的离子积常数和pH的定义。',
      difficulty: 'easy',
      knowledgePoints: ['chemistry-1']
    },
    {
      id: 'chemistry-q2',
      content: '写出乙烯与溴水反应的化学方程式，并指出反应类型。',
      options: [],
      answer: 'CH2=CH2 + Br2 → CH2BrCH2Br，反应类型为加成反应。',
      explanation: '有机反应类型是有机化学的基础内容，需要掌握常见的有机反应类型。',
      difficulty: 'medium',
      knowledgePoints: ['chemistry-5']
    }
  ],
  biology: [
    {
      id: 'biology-q1',
      content: '简述DNA复制的过程。',
      options: [],
      answer: 'DNA复制过程包括：1. 解旋：DNA双螺旋结构在解旋酶的作用下解开；2. 引物合成：RNA聚合酶合成RNA引物；3. 延伸：DNA聚合酶以母链为模板，合成子链；4. 终止：DNA聚合酶切除RNA引物，填补缺口，DNA连接酶连接片段。',
      explanation: 'DNA复制是遗传规律的基础内容，需要掌握复制的过程和特点。',
      difficulty: 'medium',
      knowledgePoints: ['biology-2']
    },
    {
      id: 'biology-q2',
      content: '简述光合作用的光反应和暗反应过程。',
      options: [],
      answer: '光反应：在叶绿体的类囊体薄膜上，光能被吸收并转化为ATP和NADPH，同时释放氧气。暗反应：在叶绿体基质中，利用光反应产生的ATP和NADPH，将CO2固定并还原为有机物。',
      explanation: '光合作用是生物代谢的重要内容，需要掌握光反应和暗反应的过程和联系。',
      difficulty: 'medium',
      knowledgePoints: ['biology-3']
    }
  ]
};

// 高考重难点配置
export const gaokaoKeyPointsConfig = {
  math: [
    { id: 'math-1', title: '函数的单调性', importance: 'high' },
    { id: 'math-4', title: '圆锥曲线', importance: 'high' },
    { id: 'math-5', title: '数列', importance: 'medium' }
  ],
  physics: [
    { id: 'physics-1', title: '牛顿运动定律', importance: 'high' },
    { id: 'physics-2', title: '电磁感应', importance: 'high' },
    { id: 'physics-3', title: '动量守恒定律', importance: 'medium' }
  ],
  chemistry: [
    { id: 'chemistry-3', title: '化学反应速率', importance: 'medium' },
    { id: 'chemistry-4', title: '化学平衡', importance: 'high' },
    { id: 'chemistry-5', title: '有机化学', importance: 'high' }
  ],
  biology: [
    { id: 'biology-2', title: '遗传规律', importance: 'high' },
    { id: 'biology-3', title: '光合作用', importance: 'medium' },
    { id: 'biology-5', title: '生态系统', importance: 'medium' }
  ]
};

// 困难概念配置
export const difficultConceptsConfig = {
  math: ['math-3', 'math-4'],
  physics: ['physics-2'],
  chemistry: ['chemistry-4', 'chemistry-5'],
  biology: ['biology-2']
};

// 导出配置
export default {
  knowledgePoints: knowledgePointsConfig,
  questions: questionsConfig,
  gaokaoKeyPoints: gaokaoKeyPointsConfig,
  difficultConcepts: difficultConceptsConfig
};