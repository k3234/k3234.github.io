// 学习内容组织服务

// 课程标准内容
const curriculumContent = {
  'high-school-1': {
    math: {
      modules: [
        {
          id: 'math-1-1',
          title: '集合与常用逻辑用语',
          knowledgePoints: [
            '集合的概念与运算',
            '常用逻辑用语',
            '充分条件与必要条件'
          ],
          difficulty: 'easy'
        },
        {
          id: 'math-1-2',
          title: '函数的概念与性质',
          knowledgePoints: [
            '函数的定义',
            '函数的单调性',
            '函数的奇偶性',
            '函数的周期性'
          ],
          difficulty: 'medium'
        },
        {
          id: 'math-1-3',
          title: '基本初等函数',
          knowledgePoints: [
            '指数函数',
            '对数函数',
            '幂函数'
          ],
          difficulty: 'medium'
        },
        {
          id: 'math-1-4',
          title: '三角函数',
          knowledgePoints: [
            '三角函数的定义',
            '三角函数的图像',
            '三角函数的性质'
          ],
          difficulty: 'medium'
        },
        {
          id: 'math-1-5',
          title: '立体几何初步',
          knowledgePoints: [
            '空间几何体',
            '空间点线面关系',
            '空间向量'
          ],
          difficulty: 'medium'
        }
      ]
    },
    physics: {
      modules: [
        {
          id: 'physics-1-1',
          title: '运动的描述',
          knowledgePoints: [
            '质点、参考系',
            '位移、速度、加速度',
            '运动图像'
          ],
          difficulty: 'easy'
        },
        {
          id: 'physics-1-2',
          title: '相互作用',
          knowledgePoints: [
            '重力、弹力、摩擦力',
            '力的合成与分解',
            '共点力平衡'
          ],
          difficulty: 'medium'
        },
        {
          id: 'physics-1-3',
          title: '牛顿运动定律',
          knowledgePoints: [
            '牛顿第一定律',
            '牛顿第二定律',
            '牛顿第三定律',
            '牛顿定律的应用'
          ],
          difficulty: 'medium'
        },
        {
          id: 'physics-1-4',
          title: '曲线运动',
          knowledgePoints: [
            '曲线运动的基本概念',
            '平抛运动',
            '圆周运动'
          ],
          difficulty: 'medium'
        },
        {
          id: 'physics-1-5',
          title: '机械能守恒定律',
          knowledgePoints: [
            '功和功率',
            '动能和动能定理',
            '重力势能',
            '机械能守恒定律'
          ],
          difficulty: 'medium'
        }
      ]
    },
    chemistry: {
      modules: [
        {
          id: 'chemistry-1-1',
          title: '化学计量',
          knowledgePoints: [
            '物质的量',
            '摩尔质量',
            '气体摩尔体积',
            '物质的量浓度'
          ],
          difficulty: 'easy'
        },
        {
          id: 'chemistry-1-2',
          title: '物质的分类与变化',
          knowledgePoints: [
            '物质的分类',
            '离子反应',
            '氧化还原反应'
          ],
          difficulty: 'medium'
        },
        {
          id: 'chemistry-1-3',
          title: '金属及其化合物',
          knowledgePoints: [
            '钠及其化合物',
            '铝及其化合物',
            '铁及其化合物'
          ],
          difficulty: 'medium'
        },
        {
          id: 'chemistry-1-4',
          title: '非金属及其化合物',
          knowledgePoints: [
            '氯及其化合物',
            '硫及其化合物',
            '氮及其化合物'
          ],
          difficulty: 'medium'
        },
        {
          id: 'chemistry-1-5',
          title: '元素周期表',
          knowledgePoints: [
            '元素周期表的结构',
            '元素周期律',
            '化学键'
          ],
          difficulty: 'medium'
        }
      ]
    },
    biology: {
      modules: [
        {
          id: 'biology-1-1',
          title: '细胞的分子组成',
          knowledgePoints: [
            '蛋白质',
            '核酸',
            '糖类和脂质'
          ],
          difficulty: 'easy'
        },
        {
          id: 'biology-1-2',
          title: '细胞的结构',
          knowledgePoints: [
            '细胞膜',
            '细胞器',
            '细胞核'
          ],
          difficulty: 'medium'
        },
        {
          id: 'biology-1-3',
          title: '细胞的代谢',
          knowledgePoints: [
            '酶',
            'ATP',
            '光合作用',
            '细胞呼吸'
          ],
          difficulty: 'medium'
        },
        {
          id: 'biology-1-4',
          title: '细胞的生命历程',
          knowledgePoints: [
            '细胞增殖',
            '细胞分化',
            '细胞衰老和凋亡'
          ],
          difficulty: 'medium'
        },
        {
          id: 'biology-1-5',
          title: '遗传的基本规律',
          knowledgePoints: [
            '孟德尔遗传定律',
            '基因与染色体的关系',
            '伴性遗传'
          ],
          difficulty: 'medium'
        }
      ]
    }
  },
  'high-school-2': {
    math: {
      modules: [
        {
          id: 'math-2-1',
          title: '导数及其应用',
          knowledgePoints: [
            '导数的定义',
            '导数的计算',
            '导数的应用'
          ],
          difficulty: 'hard'
        },
        {
          id: 'math-2-2',
          title: '解析几何',
          knowledgePoints: [
            '直线的方程',
            '圆的方程',
            '圆锥曲线'
          ],
          difficulty: 'hard'
        },
        {
          id: 'math-2-3',
          title: '概率统计',
          knowledgePoints: [
            '随机事件的概率',
            '古典概型',
            '几何概型',
            '统计图表',
            '回归分析'
          ],
          difficulty: 'medium'
        },
        {
          id: 'math-2-4',
          title: '数列',
          knowledgePoints: [
            '等差数列',
            '等比数列',
            '数列求和'
          ],
          difficulty: 'medium'
        },
        {
          id: 'math-2-5',
          title: '不等式',
          knowledgePoints: [
            '不等式的性质',
            '一元二次不等式',
            '基本不等式'
          ],
          difficulty: 'medium'
        }
      ]
    },
    physics: {
      modules: [
        {
          id: 'physics-2-1',
          title: '静电场',
          knowledgePoints: [
            '库仑定律',
            '电场强度',
            '电势',
            '电势能'
          ],
          difficulty: 'hard'
        },
        {
          id: 'physics-2-2',
          title: '恒定电流',
          knowledgePoints: [
            '欧姆定律',
            '电阻定律',
            '电功率',
            '闭合电路欧姆定律'
          ],
          difficulty: 'medium'
        },
        {
          id: 'physics-2-3',
          title: '磁场',
          knowledgePoints: [
            '磁感应强度',
            '安培力',
            '洛伦兹力',
            '带电粒子在磁场中的运动'
          ],
          difficulty: 'hard'
        },
        {
          id: 'physics-2-4',
          title: '电磁感应',
          knowledgePoints: [
            '电磁感应现象',
            '法拉第电磁感应定律',
            '楞次定律',
            '电磁感应的应用'
          ],
          difficulty: 'hard'
        },
        {
          id: 'physics-2-5',
          title: '热学',
          knowledgePoints: [
            '分子动理论',
            '内能',
            '热力学定律',
            '理想气体状态方程'
          ],
          difficulty: 'medium'
        }
      ]
    },
    chemistry: {
      modules: [
        {
          id: 'chemistry-2-1',
          title: '化学反应速率',
          knowledgePoints: [
            '化学反应速率的计算',
            '影响化学反应速率的因素'
          ],
          difficulty: 'medium'
        },
        {
          id: 'chemistry-2-2',
          title: '化学平衡',
          knowledgePoints: [
            '化学平衡的建立',
            '化学平衡常数',
            '影响化学平衡的因素'
          ],
          difficulty: 'hard'
        },
        {
          id: 'chemistry-2-3',
          title: '水溶液中的离子平衡',
          knowledgePoints: [
            '弱电解质的电离',
            '水的电离和溶液的pH',
            '盐类的水解',
            '沉淀溶解平衡'
          ],
          difficulty: 'hard'
        },
        {
          id: 'chemistry-2-4',
          title: '电化学基础',
          knowledgePoints: [
            '原电池',
            '电解池',
            '金属的腐蚀与防护'
          ],
          difficulty: 'hard'
        },
        {
          id: 'chemistry-2-5',
          title: '有机化学基础',
          knowledgePoints: [
            '有机物的结构和性质',
            '烃及其衍生物',
            '有机合成'
          ],
          difficulty: 'hard'
        }
      ]
    },
    biology: {
      modules: [
        {
          id: 'biology-2-1',
          title: '基因的本质',
          knowledgePoints: [
            'DNA是主要的遗传物质',
            'DNA的结构',
            'DNA的复制'
          ],
          difficulty: 'medium'
        },
        {
          id: 'biology-2-2',
          title: '基因的表达',
          knowledgePoints: [
            '转录',
            '翻译',
            '基因对性状的控制'
          ],
          difficulty: 'medium'
        },
        {
          id: 'biology-2-3',
          title: '基因突变及其他变异',
          knowledgePoints: [
            '基因突变',
            '基因重组',
            '染色体变异'
          ],
          difficulty: 'medium'
        },
        {
          id: 'biology-2-4',
          title: '从杂交育种到基因工程',
          knowledgePoints: [
            '杂交育种',
            '诱变育种',
            '基因工程'
          ],
          difficulty: 'medium'
        },
        {
          id: 'biology-2-5',
          title: '现代生物进化理论',
          knowledgePoints: [
            '达尔文的自然选择学说',
            '现代生物进化理论的主要内容',
            '物种的形成'
          ],
          difficulty: 'medium'
        }
      ]
    }
  },
  'high-school-3': {
    math: {
      modules: [
        {
          id: 'math-3-1',
          title: '函数与导数综合',
          knowledgePoints: [
            '函数的单调性与极值',
            '函数的最值',
            '导数的综合应用'
          ],
          difficulty: 'hard'
        },
        {
          id: 'math-3-2',
          title: '圆锥曲线综合',
          knowledgePoints: [
            '椭圆',
            '双曲线',
            '抛物线',
            '圆锥曲线的综合应用'
          ],
          difficulty: 'hard'
        },
        {
          id: 'math-3-3',
          title: '数列综合',
          knowledgePoints: [
            '等差数列与等比数列的综合',
            '数列的通项公式',
            '数列求和的综合应用'
          ],
          difficulty: 'hard'
        },
        {
          id: 'math-3-4',
          title: '立体几何综合',
          knowledgePoints: [
            '空间几何体的表面积和体积',
            '空间点线面的位置关系',
            '空间向量的应用'
          ],
          difficulty: 'medium'
        },
        {
          id: 'math-3-5',
          title: '概率统计综合',
          knowledgePoints: [
            '概率的综合应用',
            '统计的综合应用',
            '回归分析与独立性检验'
          ],
          difficulty: 'medium'
        }
      ]
    },
    physics: {
      modules: [
        {
          id: 'physics-3-1',
          title: '力学综合',
          knowledgePoints: [
            '牛顿运动定律的综合应用',
            '动量守恒定律的综合应用',
            '机械能守恒定律的综合应用'
          ],
          difficulty: 'hard'
        },
        {
          id: 'physics-3-2',
          title: '电磁学综合',
          knowledgePoints: [
            '电场与磁场的综合',
            '电磁感应的综合应用',
            '电路的综合应用'
          ],
          difficulty: 'hard'
        },
        {
          id: 'physics-3-3',
          title: '热学综合',
          knowledgePoints: [
            '热力学定律的综合应用',
            '理想气体状态方程的综合应用'
          ],
          difficulty: 'medium'
        },
        {
          id: 'physics-3-4',
          title: '光学综合',
          knowledgePoints: [
            '光的折射与全反射',
            '光的干涉与衍射'
          ],
          difficulty: 'medium'
        },
        {
          id: 'physics-3-5',
          title: '近代物理综合',
          knowledgePoints: [
            '光电效应',
            '原子结构',
            '核反应'
          ],
          difficulty: 'medium'
        }
      ]
    },
    chemistry: {
      modules: [
        {
          id: 'chemistry-3-1',
          title: '化学反应原理综合',
          knowledgePoints: [
            '化学反应速率与化学平衡的综合',
            '水溶液中的离子平衡综合',
            '电化学的综合应用'
          ],
          difficulty: 'hard'
        },
        {
          id: 'chemistry-3-2',
          title: '有机化学综合',
          knowledgePoints: [
            '有机物的结构与性质',
            '有机合成与推断',
            '有机反应类型'
          ],
          difficulty: 'hard'
        },
        {
          id: 'chemistry-3-3',
          title: '元素化合物综合',
          knowledgePoints: [
            '金属及其化合物的综合应用',
            '非金属及其化合物的综合应用'
          ],
          difficulty: 'medium'
        },
        {
          id: 'chemistry-3-4',
          title: '化学实验综合',
          knowledgePoints: [
            '实验设计与评价',
            '实验数据的分析与处理'
          ],
          difficulty: 'medium'
        },
        {
          id: 'chemistry-3-5',
          title: '化学计算综合',
          knowledgePoints: [
            '物质的量的计算',
            '化学方程式的计算',
            '平衡常数的计算'
          ],
          difficulty: 'medium'
        }
      ]
    },
    biology: {
      modules: [
        {
          id: 'biology-3-1',
          title: '遗传与进化综合',
          knowledgePoints: [
            '遗传规律的综合应用',
            '基因的本质与表达',
            '生物进化'
          ],
          difficulty: 'hard'
        },
        {
          id: 'biology-3-2',
          title: '稳态与调节综合',
          knowledgePoints: [
            '神经调节',
            '体液调节',
            '免疫调节'
          ],
          difficulty: 'medium'
        },
        {
          id: 'biology-3-3',
          title: '生态系统综合',
          knowledgePoints: [
            '生态系统的结构',
            '生态系统的功能',
            '生态系统的稳定性'
          ],
          difficulty: 'medium'
        },
        {
          id: 'biology-3-4',
          title: '生物技术实践',
          knowledgePoints: [
            '微生物的培养与应用',
            '酶的应用',
            'DNA技术'
          ],
          difficulty: 'medium'
        },
        {
          id: 'biology-3-5',
          title: '现代生物科技专题',
          knowledgePoints: [
            '基因工程',
            '细胞工程',
            '胚胎工程'
          ],
          difficulty: 'medium'
        }
      ]
    }
  }
};

// 高考重难点模块
const gaokaoKeyPoints = {
  math: {
    keyPoints: [
      {
        id: 'math-gaokao-1',
        title: '函数与导数',
        description: '高考数学的核心内容，占分比例高，难度大',
        knowledgePoints: [
          '函数的单调性与极值',
          '函数的最值',
          '导数的综合应用',
          '函数与方程'
        ],
        difficulty: 'hard',
        importance: 'high'
      },
      {
        id: 'math-gaokao-2',
        title: '圆锥曲线',
        description: '高考数学的重要内容，计算量大，综合性强',
        knowledgePoints: [
          '椭圆',
          '双曲线',
          '抛物线',
          '圆锥曲线的综合应用'
        ],
        difficulty: 'hard',
        importance: 'high'
      },
      {
        id: 'math-gaokao-3',
        title: '立体几何',
        description: '高考数学的必考内容，注重空间想象能力',
        knowledgePoints: [
          '空间几何体的表面积和体积',
          '空间点线面的位置关系',
          '空间向量的应用'
        ],
        difficulty: 'medium',
        importance: 'high'
      },
      {
        id: 'math-gaokao-4',
        title: '数列',
        description: '高考数学的重要内容，规律性强',
        knowledgePoints: [
          '等差数列与等比数列',
          '数列的通项公式',
          '数列求和'
        ],
        difficulty: 'medium',
        importance: 'high'
      },
      {
        id: 'math-gaokao-5',
        title: '概率统计',
        description: '高考数学的必考内容，与实际生活联系紧密',
        knowledgePoints: [
          '概率的计算',
          '统计图表',
          '回归分析与独立性检验'
        ],
        difficulty: 'medium',
        importance: 'high'
      }
    ]
  },
  physics: {
    keyPoints: [
      {
        id: 'physics-gaokao-1',
        title: '力学综合',
        description: '高考物理的核心内容，占分比例高',
        knowledgePoints: [
          '牛顿运动定律的综合应用',
          '动量守恒定律的综合应用',
          '机械能守恒定律的综合应用'
        ],
        difficulty: 'hard',
        importance: 'high'
      },
      {
        id: 'physics-gaokao-2',
        title: '电磁学综合',
        description: '高考物理的重要内容，综合性强',
        knowledgePoints: [
          '电场与磁场的综合',
          '电磁感应的综合应用',
          '电路的综合应用'
        ],
        difficulty: 'hard',
        importance: 'high'
      },
      {
        id: 'physics-gaokao-3',
        title: '热学',
        description: '高考物理的必考内容，难度适中',
        knowledgePoints: [
          '热力学定律',
          '理想气体状态方程'
        ],
        difficulty: 'medium',
        importance: 'medium'
      },
      {
        id: 'physics-gaokao-4',
        title: '光学',
        description: '高考物理的必考内容，难度适中',
        knowledgePoints: [
          '光的折射与全反射',
          '光的干涉与衍射'
        ],
        difficulty: 'medium',
        importance: 'medium'
      },
      {
        id: 'physics-gaokao-5',
        title: '近代物理',
        description: '高考物理的必考内容，难度适中',
        knowledgePoints: [
          '光电效应',
          '原子结构',
          '核反应'
        ],
        difficulty: 'medium',
        importance: 'medium'
      }
    ]
  },
  chemistry: {
    keyPoints: [
      {
        id: 'chemistry-gaokao-1',
        title: '化学反应原理',
        description: '高考化学的核心内容，占分比例高',
        knowledgePoints: [
          '化学反应速率与化学平衡',
          '水溶液中的离子平衡',
          '电化学'
        ],
        difficulty: 'hard',
        importance: 'high'
      },
      {
        id: 'chemistry-gaokao-2',
        title: '有机化学',
        description: '高考化学的重要内容，规律性强',
        knowledgePoints: [
          '有机物的结构与性质',
          '有机合成与推断',
          '有机反应类型'
        ],
        difficulty: 'hard',
        importance: 'high'
      },
      {
        id: 'chemistry-gaokao-3',
        title: '元素化合物',
        description: '高考化学的基础内容，与其他模块联系紧密',
        knowledgePoints: [
          '金属及其化合物',
          '非金属及其化合物'
        ],
        difficulty: 'medium',
        importance: 'high'
      },
      {
        id: 'chemistry-gaokao-4',
        title: '化学实验',
        description: '高考化学的必考内容，注重实验能力',
        knowledgePoints: [
          '实验设计与评价',
          '实验数据的分析与处理'
        ],
        difficulty: 'medium',
        importance: 'high'
      },
      {
        id: 'chemistry-gaokao-5',
        title: '化学计算',
        description: '高考化学的必考内容，与其他模块联系紧密',
        knowledgePoints: [
          '物质的量的计算',
          '化学方程式的计算',
          '平衡常数的计算'
        ],
        difficulty: 'medium',
        importance: 'medium'
      }
    ]
  },
  biology: {
    keyPoints: [
      {
        id: 'biology-gaokao-1',
        title: '遗传与进化',
        description: '高考生物的核心内容，占分比例高',
        knowledgePoints: [
          '遗传规律',
          '基因的本质与表达',
          '生物进化'
        ],
        difficulty: 'hard',
        importance: 'high'
      },
      {
        id: 'biology-gaokao-2',
        title: '稳态与调节',
        description: '高考生物的重要内容，与实际生活联系紧密',
        knowledgePoints: [
          '神经调节',
          '体液调节',
          '免疫调节'
        ],
        difficulty: 'medium',
        importance: 'high'
      },
      {
        id: 'biology-gaokao-3',
        title: '生态系统',
        description: '高考生物的必考内容，难度适中',
        knowledgePoints: [
          '生态系统的结构',
          '生态系统的功能',
          '生态系统的稳定性'
        ],
        difficulty: 'medium',
        importance: 'high'
      },
      {
        id: 'biology-gaokao-4',
        title: '细胞代谢',
        description: '高考生物的基础内容，与其他模块联系紧密',
        knowledgePoints: [
          '光合作用',
          '细胞呼吸',
          '酶与ATP'
        ],
        difficulty: 'medium',
        importance: 'high'
      },
      {
        id: 'biology-gaokao-5',
        title: '生物技术',
        description: '高考生物的必考内容，与现代科技联系紧密',
        knowledgePoints: [
          '基因工程',
          '细胞工程',
          '胚胎工程'
        ],
        difficulty: 'medium',
        importance: 'medium'
      }
    ]
  }
};

// 最近学习的困难概念
const recentDifficultConcepts = {
  math: [
    {
      id: 'math-difficult-1',
      title: '导数的综合应用',
      description: '导数与函数、不等式等知识的综合应用',
      difficulty: 'hard',
      relatedKnowledge: ['函数的单调性', '函数的极值', '函数的最值']
    },
    {
      id: 'math-difficult-2',
      title: '圆锥曲线的综合应用',
      description: '圆锥曲线与直线、圆等知识的综合应用',
      difficulty: 'hard',
      relatedKnowledge: ['椭圆', '双曲线', '抛物线']
    },
    {
      id: 'math-difficult-3',
      title: '数列的通项公式',
      description: '通过递推关系求数列的通项公式',
      difficulty: 'medium',
      relatedKnowledge: ['等差数列', '等比数列', '递推数列']
    }
  ],
  physics: [
    {
      id: 'physics-difficult-1',
      title: '电磁感应的综合应用',
      description: '电磁感应与力学、电路等知识的综合应用',
      difficulty: 'hard',
      relatedKnowledge: ['法拉第电磁感应定律', '楞次定律', '安培力']
    },
    {
      id: 'physics-difficult-2',
      title: '动量守恒定律的应用',
      description: '动量守恒定律与能量守恒定律的综合应用',
      difficulty: 'hard',
      relatedKnowledge: ['动量', '冲量', '碰撞']
    },
    {
      id: 'physics-difficult-3',
      title: '带电粒子在复合场中的运动',
      description: '带电粒子在电场、磁场和重力场中的运动',
      difficulty: 'hard',
      relatedKnowledge: ['电场强度', '磁感应强度', '洛伦兹力']
    }
  ],
  chemistry: [
    {
      id: 'chemistry-difficult-1',
      title: '水溶液中的离子平衡',
      description: '弱电解质的电离、盐类的水解等平衡问题',
      difficulty: 'hard',
      relatedKnowledge: ['弱电解质的电离', '水的电离', '盐类的水解']
    },
    {
      id: 'chemistry-difficult-2',
      title: '有机合成与推断',
      description: '根据有机物的性质和反应推断结构',
      difficulty: 'hard',
      relatedKnowledge: ['有机物的结构', '有机反应类型', '官能团的性质']
    },
    {
      id: 'chemistry-difficult-3',
      title: '化学平衡的移动',
      description: '影响化学平衡移动的因素及应用',
      difficulty: 'medium',
      relatedKnowledge: ['化学平衡常数', '勒夏特列原理', '平衡转化率']
    }
  ],
  biology: [
    {
      id: 'biology-difficult-1',
      title: '遗传规律的综合应用',
      description: '基因的分离定律和自由组合定律的综合应用',
      difficulty: 'hard',
      relatedKnowledge: ['孟德尔遗传定律', '伴性遗传', '基因的连锁与交换']
    },
    {
      id: 'biology-difficult-2',
      title: '光合作用与细胞呼吸',
      description: '光合作用与细胞呼吸的过程及影响因素',
      difficulty: 'medium',
      relatedKnowledge: ['光合作用的过程', '细胞呼吸的过程', '影响光合作用的因素']
    },
    {
      id: 'biology-difficult-3',
      title: '基因的表达',
      description: 'DNA的转录和翻译过程',
      difficulty: 'medium',
      relatedKnowledge: ['DNA的结构', '转录', '翻译']
    }
  ]
};

// 获取课程标准内容
export const getCurriculumContent = (grade, subject) => {
  return curriculumContent[grade]?.[subject] || null;
};

// 获取高考重难点
export const getGaokaoKeyPoints = (subject) => {
  return gaokaoKeyPoints[subject]?.keyPoints || [];
};

// 获取最近学习的困难概念
export const getRecentDifficultConcepts = (subject) => {
  return recentDifficultConcepts[subject] || [];
};

// 生成学习内容
export const generateLearningContent = (grade, subject) => {
  const curriculum = getCurriculumContent(grade, subject);
  const gaokaoPoints = getGaokaoKeyPoints(subject);
  const difficultConcepts = getRecentDifficultConcepts(subject);
  
  return {
    curriculum,
    gaokaoPoints,
    difficultConcepts
  };
};

// 测试函数
export const testContentOrganization = () => {
  console.log('测试学习内容组织服务...');
  console.log('高一数学课程内容:', getCurriculumContent('high-school-1', 'math'));
  console.log('数学高考重难点:', getGaokaoKeyPoints('math'));
  console.log('数学最近学习的困难概念:', getRecentDifficultConcepts('math'));
  console.log('生成学习内容:', generateLearningContent('high-school-1', 'math'));
  return {
    curriculum: getCurriculumContent('high-school-1', 'math'),
    gaokaoPoints: getGaokaoKeyPoints('math'),
    difficultConcepts: getRecentDifficultConcepts('math'),
    generatedContent: generateLearningContent('high-school-1', 'math')
  };
};