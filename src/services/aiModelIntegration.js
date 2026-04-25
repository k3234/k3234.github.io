// AI模型集成服务
// 基于LLM.js和MathJax，提供成本效益高的AI学习功能

class AIModelIntegration {
  constructor() {
    this.models = {
      // 开源模型配置
      'llama3': {
        name: 'Llama 3',
        type: 'open-source',
        url: 'https://api.groq.com/openai/v1/chat/completions', // Groq提供的Llama 3 API
        cost: 'low',
        features: ['math', 'reasoning', 'education']
      },
      'deepseek': {
        name: 'DeepSeek',
        type: 'open-source',
        url: 'https://api.deepseek.com/v1/chat/completions',
        cost: 'low',
        features: ['math', 'coding', 'education']
      },
      'gemma': {
        name: 'Gemma',
        type: 'open-source',
        url: 'https://api.groq.com/openai/v1/chat/completions', // Groq提供的Gemma API
        cost: 'low',
        features: ['education', 'reasoning']
      }
    };
    
    this.defaultModel = 'llama3';
    this.apiKeys = {};
    this.memory = new Map(); // 用于存储对话历史
  }

  // 配置API密钥
  setApiKey(model, key) {
    this.apiKeys[model] = key;
  }

  // 选择模型
  selectModel(modelName) {
    if (this.models[modelName]) {
      this.defaultModel = modelName;
      return true;
    }
    return false;
  }

  // 生成数学题
  async generateMathProblem(topic, difficulty = 'medium') {
    try {
      const model = this.models[this.defaultModel];
      const prompt = `生成一道${this.getDifficultyText(difficulty)}难度的${topic}题目，包含题目描述和详细解答。题目用LaTeX格式表示，解答步骤清晰。`;
      
      const response = await this.generate(prompt);
      return this.parseMathProblem(response);
    } catch (error) {
      console.error('生成数学题失败:', error);
      return null;
    }
  }

  // 解答数学题
  async solveMathProblem(problem) {
    try {
      const prompt = `解答以下数学题，提供详细的步骤和最终答案：\n${problem}`;
      const response = await this.generate(prompt);
      return response;
    } catch (error) {
      console.error('解答数学题失败:', error);
      return null;
    }
  }

  // 解释概念
  async explainConcept(concept, gradeLevel = 'high-school') {
    try {
      const prompt = `用${this.getGradeLevelText(gradeLevel)}学生能理解的语言，解释${concept}概念，包含定义、例子和应用。`;
      const response = await this.generate(prompt);
      return response;
    } catch (error) {
      console.error('解释概念失败:', error);
      return null;
    }
  }

  // 生成学习建议
  async generateLearningSuggestions(subject, weakPoints) {
    try {
      const prompt = `针对${subject}学科，学生在${weakPoints.join('、')}等方面存在薄弱环节，请提供具体的学习建议和练习方法。`;
      const response = await this.generate(prompt);
      return response;
    } catch (error) {
      console.error('生成学习建议失败:', error);
      return null;
    }
  }

  // 核心生成函数
  async generate(prompt, model = this.defaultModel, temperature = 0.7) {
    try {
      const modelConfig = this.models[model];
      if (!modelConfig) {
        throw new Error('模型不存在');
      }

      // 这里使用fetch调用API，实际项目中可以使用axios等库
      const response = await fetch(modelConfig.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKeys[model] || ''}`
        },
        body: JSON.stringify({
          model: this.getModelIdentifier(model),
          messages: [
            {
              role: 'system',
              content: '你是一个专业的教育AI助手，擅长解答数学、物理、化学、生物等学科的问题，提供清晰、准确的解答和学习建议。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: temperature,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`API调用失败: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI生成失败:', error);
      // 降级处理：使用本地模拟数据
      return this.getMockResponse(prompt);
    }
  }

  // 获取模型标识符
  getModelIdentifier(model) {
    const identifiers = {
      'llama3': 'llama3-70b-8192',
      'deepseek': 'deepseek-chat',
      'gemma': 'gemma-7b-it'
    };
    return identifiers[model] || 'llama3-70b-8192';
  }

  // 获取难度文本
  getDifficultyText(difficulty) {
    const texts = {
      'easy': '简单',
      'medium': '中等',
      'hard': '困难'
    };
    return texts[difficulty] || '中等';
  }

  // 获取年级水平文本
  getGradeLevelText(gradeLevel) {
    const texts = {
      'middle-school': '初中',
      'high-school': '高中',
      'college': '大学'
    };
    return texts[gradeLevel] || '高中';
  }

  // 解析数学题
  parseMathProblem(response) {
    // 简单的解析逻辑，实际项目中可能需要更复杂的解析
    return {
      problem: response.split('解答:')[0].trim(),
      solution: response.split('解答:')[1]?.trim() || '暂无解答'
    };
  }

  // 模拟响应（降级处理）
  getMockResponse(prompt) {
    // 简单的模拟响应，实际项目中可以根据需要扩展
    if (prompt.includes('生成') && prompt.includes('数学题')) {
      return '题目：已知二次函数 f(x) = ax² + bx + c 的图像经过点 (0, 3)，且在 x=1 处取得最小值 2，求该二次函数的解析式。\n\n解答：\n1. 由题意知，二次函数在 x=1 处取得最小值，因此顶点坐标为 (1, 2)\n2. 设二次函数的顶点式为 f(x) = a(x-1)² + 2\n3. 将点 (0, 3) 代入得：3 = a(0-1)² + 2，解得 a=1\n4. 因此，二次函数的解析式为 f(x) = (x-1)² + 2 = x² - 2x + 3';
    } else if (prompt.includes('解答') && prompt.includes('数学题')) {
      return '解答：\n1. 首先，我们需要理解题目要求\n2. 然后，应用相关的数学知识进行分析\n3. 最后，得出正确的结论\n\n具体步骤会根据题目内容而变化。';
    } else if (prompt.includes('解释')) {
      return '概念解释：\n1. 定义：这是一个重要的数学概念\n2. 特点：具有以下几个特点\n3. 应用：在实际问题中有广泛的应用\n\n具体解释会根据概念内容而变化。';
    } else if (prompt.includes('学习建议')) {
      return '学习建议：\n1. 理解基本概念：确保掌握核心定义和定理\n2. 多做练习：通过大量练习巩固知识\n3. 总结归纳：定期总结知识点，形成知识体系\n4. 解决问题：尝试解决各种类型的问题，提高应用能力\n\n具体建议会根据学科和薄弱环节而变化。';
    } else {
      return '我是一个教育AI助手，可以帮助你解答数学、物理、化学、生物等学科的问题，提供学习建议和概念解释。请具体描述你的问题，我会尽力帮助你。';
    }
  }

  // 初始化MathJax
  initMathJax() {
    // 只在浏览器环境中初始化MathJax
    if (typeof window !== 'undefined' && !window.MathJax) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      script.id = 'MathJax-script';
      script.setAttribute('data-config', JSON.stringify({
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']]
        },
        svg: {
          fontCache: 'global'
        }
      }));
      document.head.appendChild(script);
    }
  }

  // 渲染数学公式
  renderMathInElement(element) {
    if (typeof window !== 'undefined' && window.MathJax) {
      window.MathJax.typesetPromise([element]).catch(err => console.error('MathJax渲染失败:', err));
    }
  }
}

// 导出单例实例
export const aiModelIntegration = new AIModelIntegration();

// 初始化函数
export function initializeAIModel() {
  const ai = aiModelIntegration;
  ai.initMathJax();
  console.log('AI模型集成服务初始化完成');
  return ai;
}

// 测试函数
export function testAIModel() {
  const ai = aiModelIntegration;
  
  // 测试生成数学题
  ai.generateMathProblem('二次函数', 'medium').then(result => {
    console.log('生成的数学题:', result);
  });
  
  // 测试解释概念
  ai.explainConcept('导数', 'high-school').then(result => {
    console.log('概念解释:', result);
  });
  
  // 测试生成学习建议
  ai.generateLearningSuggestions('数学', ['二次函数', '三角函数']).then(result => {
    console.log('学习建议:', result);
  });
  
  console.log('AI模型集成服务测试完成');
}