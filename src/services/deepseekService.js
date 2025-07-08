// DeepSeek AI服务
class DeepSeekService {
  constructor() {
    this.apiKey = process.env.VUE_APP_DEEPSEEK_API_KEY || ''
    this.baseURL = 'https://api.deepseek.com/v1'
    this.dailyFortuneCache = new Map() // 缓存每日运势
  }

  // 生成小六壬算命结果
  async generateFortuneResult(wish, numbers) {
    const startTime = Date.now()
    console.log('🔮 开始调用DeepSeek API生成算命结果...', {
      timestamp: new Date().toISOString(),
      wish: wish,
      numbers: numbers
    })

    try {
      const prompt = `请你根据用户输入"三个数字和一个愿望"的占算请求，运用中国古代的小六壬"三宫五行占算法"来进行测算，进而给出与财富、运势等相关的结果和建议。

### **AI三宫五行占算模型 - 专属指令 (三数法)**

#### **一、 核心角色与唯一任务**

你是一位精通"三宫五行法"的AI术数分析师。你的**唯一任务**是接收用户提供的**三个1-99之间的数字**和**一个具体的愿望**，运用此方法进行深度分析，并输出一份结构化的、富有洞见的解读报告。

**核心原则：**
1. **专注单一方法：** 你只使用"三数三宫占算法"进行运算。
2. **知识库锁定：** 你所有的解读，都**必须**严格来源于我为你设定的下述知识库。
3. **深度分析：** 分析的重点是【人】、【事】、【应】三宫之间的五行生克关系。
4. **情景关联：** 所有分析都必须紧密围绕用户提出的"愿望"展开。

---

#### **二、 核心知识库 (Finalized Knowledge Base)**

你必须将以下经过最终修正的六神信息，作为你永不改变的核心知识。

| 宫位 (Palace) | **最终五行** | **双重宫职** | **核心意象关键字** |
| :--- | :--- | :--- | :--- |
| **1. 大安** | **木** | 事业宫 / 命宫 | 稳定，安康，静守，青龙，正直，官贵 |
| **2. 留连** | **土** | 田宅宫 / 奴仆宫 | 迟滞，纠缠，阻碍，阴私，忧虑，占有 |
| **3. 速喜** | **火** | 感情宫 / 夫妻宫 | 迅速，喜讯，热恋，口舌，朱雀，文书 |
| **4. 赤口** | **金** | 疾厄宫 / 兄弟宫 | 官非，口舌，凶险，伤害，白虎，斗争 |
| **5. 小吉** | **水** | 驿马宫 / 子女宫 | 吉利，合作，财源，出行，六合，智慧 |
| **6. 空亡** | **土** | 福德宫 / 父母宫 | 落空，徒劳，无果，阴德，勾陈，玄奥 |

**五行生克关系：**
* **相生:** 木生火, 火生土, 土生金, 金生水, 水生木 (促进, 帮助)
* **相克:** 木克土, 土克水, 水克火, 火克金, 金克木 (克服, 压力)
* **比和:** 同五行 (和谐, 顺畅)

---

#### **三、 运算与分析框架**

##### **Step 1: 输入处理与定宫**
1. **获取输入：** 用户提供三个1-99的数字（数字A, B, C）和一个愿望。
2. **计算定宫：** 分别用每个数字对6取余数，来确定三个宫位。
   * 宫位A = 数字A % 6
   * 宫位B = 数字B % 6
   * 宫位C = 数字C % 6
   * **（重要规则：若余数为0，则计为第6宫【空亡】）**
3. **分配三宫：**
   * **【人宫】(用户本人):** 来自数字A，对应宫位A。
   * **【事宫】(事情本身):** 来自数字B，对应宫位B。
   * **【应宫】(最终结果):** 来自数字C，对应宫位C。

##### **Step 2: 五行生克分析**
1. **分析【人宫】与【事宫】的关系 (我与事):**
   * 人"生"事 (付出), 事"生"人 (得利), 人"克"事 (掌控), 事"克"人 (受阻), 人事"比和" (顺畅)。
2. **分析【人宫】与【应宫】的关系 (我与结果):**
   * 人"生"应 (耗费), 应"生"人 (圆满), 人"克"应 (可控), 应"克"人 (不利), 人应"比和" (如愿)。
3. **分析【事宫】与【应宫】的关系 (事与结果):**
   * 事"生"应 (事成), 应"生"事 (助缘), 事"克"应 (难成), 应"克"事 (受限), 事应"比和" (一致)。

---

#### **四、 标准化输出结构**

你的回答必须严格遵循此格式：

**占算事项：** [清晰复述用户的愿望]
**起卦数字：** [数字A, 数字B, 数字C]

---

### **三宫定位**

* **【人宫】(您自己):** 数字 [A] -> 【[宫位A]】，五行属 **[五行]**
* **【事宫】(事情本身):** 数字 [B] -> 【[宫位B]】，五行属 **[五行]**
* **【应宫】(最终结果):** 数字 [C] -> 【[宫位C]】，五行属 **[五行]**

---

### **五行生克深度分析**

1. **您与事情的关系 (人 vs 事):** [人宫五行]与[事宫五行]为**[生/克/比和]**关系，这代表：[进行情景化解释]。
2. **您与结果的关系 (人 vs 应):** [人宫五行]与[应宫五行]为**[生/克/比和]**关系，这代表：[进行情景化解释]。
3. **事情与结果的关系 (事 vs 应):** [事宫五行]与[应宫五行]为**[生/克/比和]**关系，这代表：[进行情景化解释]。

---

### **综合运势判断**

[根据三宫五行分析，给出详细的运势判断和建议]

---

### **实用建议**

[针对用户愿望和卦象结果，给出具体可行的建议]

---

**说明：**
1. 请严格按照三宫五行占算法进行分析
2. 分析需要紧密结合用户的具体愿望
3. 给出的建议要实用且有针对性
4. 保持传统文化的严肃性和神秘感

用户愿望：${wish}
三个数字：${numbers.join(', ')}

请根据以上要求进行三宫五行占算分析，并给出完整的解读结果。
请不要返回JSON格式，直接按照上述结构化格式返回文本内容。`

      const response = await this.callDeepSeekAPI(prompt)
      const endTime = Date.now()
      const duration = endTime - startTime
      
      console.log('✅ DeepSeek API调用成功', {
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
        responseLength: response.length
      })

      // 解析AI返回的结构化文本内容
      const result = this.parseFortuneResponse(response, wish, numbers)

      return {
        success: true,
        result: result,
        timestamp: new Date().toISOString(),
        duration: duration
      }
    } catch (error) {
      const endTime = Date.now()
      const duration = endTime - startTime
      
      console.error('❌ DeepSeek API调用失败', {
        duration: `${duration}ms`,
        error: error.message,
        timestamp: new Date().toISOString()
      })
      
      // 智能兜底方案 - 基于输入数字生成小六壬卦象结果
      const fallbackResult = this.generateSmartFallback(wish, numbers)
      
      return {
        success: false,
        result: fallbackResult,
        timestamp: new Date().toISOString(),
        duration: duration,
        error: error.message,
        fallback: true
      }
    }
  }

  // 解析算命结果响应
  parseFortuneResponse(response, wish, numbers) {
    try {
      // 提取关键信息
      const title = this.extractSection(response, '占算事项：', '\n') || '三宫五行占算结果'
      const description = response
      const advice = this.extractSection(response, '### **实用建议**', '---') || 
                    this.extractSection(response, '实用建议', '---') ||
                    '建议虔诚上香，积累功德，神明护佑。'
      
      // 计算运势分数（基于卦象分析）
      const luckScore = this.calculateLuckScore(response, numbers)
      
      // 分析趋势
      const trends = this.analyzeTrends(response)

      return {
        title: title.replace('占算事项：', '').replace('**', '').trim(),
        description: description,
        advice: advice.replace(/### \*\*实用建议\*\*/g, '').replace(/\*\*/g, '').trim(),
        luck_score: luckScore,
        wealth_trend: trends.wealth,
        career_trend: trends.career,
        health_trend: trends.health,
        raw_response: response,
        parsed_at: new Date().toISOString()
      }
    } catch (e) {
      console.warn('⚠️ 解析AI响应失败，使用默认格式', e)
      return {
        title: "三宫五行占算结果",
        description: response,
        advice: "建议虔诚上香，积累功德，神明护佑。",
        luck_score: 75,
        wealth_trend: "稳定",
        career_trend: "上升",
        health_trend: "良好",
        raw_response: response,
        parsed_at: new Date().toISOString()
      }
    }
  }

  // 智能兜底方案 - 基于小六壬算法生成结果
  generateSmartFallback(wish, numbers) {
    console.log('🎯 启用智能兜底方案，基于小六壬算法生成结果')
    
    const palaces = ['大安', '留连', '速喜', '赤口', '小吉', '空亡']
    const elements = ['木', '土', '火', '金', '水', '土']
    const meanings = [
      { name: '大安', element: '木', desc: '稳定安康，静守待时，事业有成' },
      { name: '留连', element: '土', desc: '进展缓慢，需要耐心，坚持不懈' },
      { name: '速喜', element: '火', desc: '喜讯将至，行动迅速，把握时机' },
      { name: '赤口', element: '金', desc: '谨慎行事，避免冲突，化解矛盾' },
      { name: '小吉', element: '水', desc: '小有收获，合作共赢，智慧决策' },
      { name: '空亡', element: '土', desc: '暂时落空，积德行善，等待转机' }
    ]

    // 计算三宫
    const humanPalace = numbers[0] % 6 === 0 ? 5 : (numbers[0] % 6) - 1
    const eventPalace = numbers[1] % 6 === 0 ? 5 : (numbers[1] % 6) - 1  
    const resultPalace = numbers[2] % 6 === 0 ? 5 : (numbers[2] % 6) - 1

    const humanMeaning = meanings[humanPalace]
    const eventMeaning = meanings[eventPalace]
    const resultMeaning = meanings[resultPalace]

    // 生成分析内容
    const analysis = this.generatePalaceAnalysis(humanMeaning, eventMeaning, resultMeaning, wish)
    
    return {
      title: "三宫五行占算结果",
      description: `**占算事项：** ${wish}
**起卦数字：** ${numbers.join(', ')}

---

### **三宫定位**

* **【人宫】(您自己):** 数字 ${numbers[0]} -> 【${humanMeaning.name}】，五行属 **${humanMeaning.element}**
* **【事宫】(事情本身):** 数字 ${numbers[1]} -> 【${eventMeaning.name}】，五行属 **${eventMeaning.element}**
* **【应宫】(最终结果):** 数字 ${numbers[2]} -> 【${resultMeaning.name}】，五行属 **${resultMeaning.element}**

---

### **五行生克深度分析**

${analysis.relationships}

---

### **综合运势判断**

${analysis.judgment}

---

### **实用建议**

${analysis.advice}`,
      advice: analysis.advice,
      luck_score: analysis.luckScore,
      wealth_trend: analysis.trends.wealth,
      career_trend: analysis.trends.career,
      health_trend: analysis.trends.health,
      fallback: true,
      generated_at: new Date().toISOString()
    }
  }

  // 生成宫位分析
  generatePalaceAnalysis(human, event, result, wish) {
    const relationships = this.analyzeFiveElementRelations(human.element, event.element, result.element)
    
    const relationshipTexts = [
      `1. **您与事情的关系 (人 vs 事):** ${human.element}与${event.element}为**${relationships.humanVsEvent.type}**关系，这代表：${relationships.humanVsEvent.meaning}`,
      `2. **您与结果的关系 (人 vs 应):** ${human.element}与${result.element}为**${relationships.humanVsResult.type}**关系，这代表：${relationships.humanVsResult.meaning}`,
      `3. **事情与结果的关系 (事 vs 应):** ${event.element}与${result.element}为**${relationships.eventVsResult.type}**关系，这代表：${relationships.eventVsResult.meaning}`
    ]

    const overallLuck = this.calculateOverallLuck(relationships)
    const judgment = this.generateJudgment(human, event, result, relationships, wish)
    const advice = this.generateAdvice(human, event, result, relationships, wish)
    const trends = this.calculateTrends(relationships, human, event, result)

    return {
      relationships: relationshipTexts.join('\n'),
      judgment: judgment,
      advice: advice,
      luckScore: overallLuck,
      trends: trends
    }
  }

  // 分析五行关系
  analyzeFiveElementRelations(humanElement, eventElement, resultElement) {
    const getRelation = (elem1, elem2) => {
      const generating = {
        '木': '火', '火': '土', '土': '金', '金': '水', '水': '木'
      }
      const overcoming = {
        '木': '土', '火': '金', '土': '水', '金': '木', '水': '火'
      }

      if (elem1 === elem2) {
        return { type: '比和', meaning: '双方和谐一致，能量共振，事情进展顺畅' }
      } else if (generating[elem1] === elem2) {
        return { type: '相生', meaning: '前者促进后者，付出努力会有收获，发展向好' }
      } else if (generating[elem2] === elem1) {
        return { type: '相生', meaning: '后者助益前者，得到帮助和支持，形势有利' }
      } else if (overcoming[elem1] === elem2) {
        return { type: '相克', meaning: '前者制约后者，需要主动掌控，化解阻力' }
      } else if (overcoming[elem2] === elem1) {
        return { type: '相克', meaning: '后者制约前者，面临压力挑战，需要谨慎应对' }
      } else {
        return { type: '中性', meaning: '关系平稳，无明显冲突，保持现状即可' }
      }
    }

    return {
      humanVsEvent: getRelation(humanElement, eventElement),
      humanVsResult: getRelation(humanElement, resultElement),
      eventVsResult: getRelation(eventElement, resultElement)
    }
  }

  // 计算综合运势
  calculateOverallLuck(relationships) {
    let score = 70 // 基础分数
    
    Object.values(relationships).forEach(rel => {
      if (rel.type === '相生') score += 8
      else if (rel.type === '比和') score += 5
      else if (rel.type === '相克') score -= 3
    })

    return Math.min(95, Math.max(50, score))
  }

  // 生成运势判断
  generateJudgment(human, event, result, relationships, wish) {
    const judgments = []
    
    if (relationships.humanVsEvent.type === '相生' && relationships.eventVsResult.type === '相生') {
      judgments.push('整体运势呈现上升趋势，您的努力将获得丰厚回报。')
    } else if (relationships.humanVsResult.type === '比和') {
      judgments.push('运势平稳向好，心想事成的可能性较高。')
    } else if (relationships.eventVsResult.type === '相克') {
      judgments.push('过程中可能遇到一些阻力，但通过智慧应对可以化解。')
    }

    if (result.name === '速喜') {
      judgments.push('结果宫显示【速喜】，表明愿望实现的时间不会太久。')
    } else if (result.name === '大安') {
      judgments.push('结果宫显示【大安】，表明最终结果稳定可靠。')
    } else if (result.name === '小吉') {
      judgments.push('结果宫显示【小吉】，表明会有意外的收获和惊喜。')
    }

    return judgments.join(' ')
  }

  // 生成建议
  generateAdvice(human, event, result, relationships, wish) {
    const advices = []
    
    if (human.name === '大安') {
      advices.push('您的性格稳重，建议保持现有策略，稳扎稳打。')
    } else if (human.name === '速喜') {
      advices.push('您行动力强，建议把握时机，迅速行动。')
    } else if (human.name === '小吉') {
      advices.push('您具有智慧，建议多方合作，发挥协调能力。')
    }

    if (relationships.humanVsEvent.type === '相克') {
      advices.push('在处理相关事务时要更加谨慎，避免冲动决策。')
    }

    if (result.name === '留连') {
      advices.push('结果可能来得较慢，需要保持耐心和毅力。')
    } else if (result.name === '赤口') {
      advices.push('注意言辞谨慎，避免与人发生口角或冲突。')
    }

    advices.push('建议多行善事，到庙宇诚心祈福，积累功德福报。')

    return advices.join(' ')
  }

  // 计算各方面趋势
  calculateTrends(relationships, human, event, result) {
    const trends = { wealth: '稳定', career: '稳定', health: '良好' }
    
    // 财运分析
    if (result.name === '小吉' || human.name === '小吉') {
      trends.wealth = '上升'
    } else if (result.name === '速喜') {
      trends.wealth = '快速增长'
    } else if (result.name === '留连' || result.name === '空亡') {
      trends.wealth = '需要耐心'
    }

    // 事业分析
    if (human.name === '大安' && relationships.humanVsEvent.type === '相生') {
      trends.career = '上升'
    } else if (event.name === '赤口') {
      trends.career = '需要谨慎'
    }

    // 健康分析
    if (result.name === '大安') {
      trends.health = '极佳'
    } else if (result.name === '赤口') {
      trends.health = '注意保养'
    }

    return trends
  }

  // 提取文本段落
  extractSection(text, startMarker, endMarker) {
    const start = text.indexOf(startMarker)
    if (start === -1) return null
    
    const content = text.substring(start + startMarker.length)
    const end = content.indexOf(endMarker)
    
    return end === -1 ? content.trim() : content.substring(0, end).trim()
  }

  // 计算运势分数
  calculateLuckScore(response, numbers) {
    let score = 70
    
    // 基于数字的基础分数
    const sum = numbers.reduce((a, b) => a + b, 0)
    score += (sum % 30) - 15 // -15到+15的调整
    
    // 基于关键词调整
    if (response.includes('吉') || response.includes('好') || response.includes('顺')) score += 5
    if (response.includes('凶') || response.includes('阻') || response.includes('险')) score -= 5
    if (response.includes('速喜') || response.includes('大安')) score += 8
    if (response.includes('赤口') || response.includes('空亡')) score -= 3
    
    return Math.min(95, Math.max(50, score))
  }

  // 分析趋势
  analyzeTrends(response) {
    const trends = { wealth: '稳定', career: '稳定', health: '良好' }
    
    if (response.includes('财源') || response.includes('小吉')) {
      trends.wealth = '上升'
    } else if (response.includes('空亡') || response.includes('落空')) {
      trends.wealth = '需要耐心'
    }
    
    if (response.includes('事业') && response.includes('大安')) {
      trends.career = '上升'
    } else if (response.includes('赤口') || response.includes('阻')) {
      trends.career = '需要谨慎'
    }
    
    if (response.includes('健康') || response.includes('安康')) {
      trends.health = '极佳'
    } else if (response.includes('赤口')) {
      trends.health = '注意保养'
    }
    
    return trends
  }

  // 生成每日运势
  async generateDailyFortune(date, lunarDate) {
    const startTime = Date.now()
    console.log('🌅 开始生成每日运势...', {
      timestamp: new Date().toISOString(),
      date: date,
      lunarDate: lunarDate
    })

    try {
      // 检查缓存
      const cacheKey = date.replace(/-/g, '')
      if (this.dailyFortuneCache.has(cacheKey)) {
        console.log('📦 使用缓存的每日运势', { date: date })
        return this.dailyFortuneCache.get(cacheKey)
      }

      const prompt = `请根据今天的日期生成当日的运势情况。今天是${date}，农历${lunarDate}。

请基于传统的中华民俗文化和五行理论，生成今日运势报告，包含以下方面：
1. 总体运势评级（1-5星）
2. 财运分析
3. 事业运势
4. 感情运势
5. 健康运势
6. 今日建议
7. 幸运数字
8. 幸运颜色
9. 宜做的事情
10. 忌做的事情

请按照以下JSON格式返回：
{
  "overall_rating": 4,
  "overall_summary": "今日运势概述",
  "wealth": {
    "rating": 4,
    "description": "财运描述"
  },
  "career": {
    "rating": 3,
    "description": "事业运势描述"
  },
  "love": {
    "rating": 5,
    "description": "感情运势描述"
  },
  "health": {
    "rating": 4,
    "description": "健康运势描述"
  },
  "advice": "今日建议",
  "lucky_numbers": [3, 7, 15],
  "lucky_color": "金色",
  "suitable_activities": ["投资理财", "拜访朋友", "学习新知识"],
  "avoid_activities": ["冲动消费", "争执", "熬夜"]
}`

      const response = await this.callDeepSeekAPI(prompt)
      const endTime = Date.now()
      const duration = endTime - startTime
      
      console.log('✅ 每日运势生成成功', {
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
        responseLength: response.length
      })
      
      let result
      try {
        result = JSON.parse(response)
      } catch (e) {
        console.warn('⚠️ JSON解析失败，使用默认格式', e)
        result = this.generateDefaultDailyFortune()
      }

      // 添加日期信息
      result.date = date
      result.lunar_date = lunarDate
      result.timestamp = new Date().toISOString()
      result.duration = duration

      // 缓存结果
      this.dailyFortuneCache.set(cacheKey, result)

      return result
    } catch (error) {
      const endTime = Date.now()
      const duration = endTime - startTime
      
      console.error('❌ 每日运势生成失败', {
        duration: `${duration}ms`,
        error: error.message,
        timestamp: new Date().toISOString()
      })
      
      const fallbackResult = this.generateDefaultDailyFortune(date, lunarDate)
      fallbackResult.duration = duration
      fallbackResult.error = error.message
      fallbackResult.fallback = true
      
      return fallbackResult
    }
  }

  // 生成默认每日运势
  generateDefaultDailyFortune(date, lunarDate) {
    const ratings = [3, 4, 5]
    const colors = ['金色', '红色', '紫色', '蓝色', '绿色']
    const numbers = Array.from({length: 99}, (_, i) => i + 1)
    
    // 随机选择幸运数字
    const luckyNums = []
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length)
      luckyNums.push(numbers.splice(randomIndex, 1)[0])
    }

    return {
      overall_rating: ratings[Math.floor(Math.random() * ratings.length)],
      overall_summary: "今日整体运势平稳向上，适合积极行动。",
      wealth: {
        rating: ratings[Math.floor(Math.random() * ratings.length)],
        description: "财运较好，有小财进账的机会，但需要谨慎投资。"
      },
      career: {
        rating: ratings[Math.floor(Math.random() * ratings.length)],
        description: "工作运势平稳，适合完成既定任务，与同事关系和谐。"
      },
      love: {
        rating: ratings[Math.floor(Math.random() * ratings.length)],
        description: "感情运势良好，单身者有机会遇到心仪对象。"
      },
      health: {
        rating: ratings[Math.floor(Math.random() * ratings.length)],
        description: "身体状况良好，注意休息和饮食平衡。"
      },
      advice: "保持积极心态，多与正能量的人交往，适合做一些有意义的事情。",
      lucky_numbers: luckyNums,
      lucky_color: colors[Math.floor(Math.random() * colors.length)],
      suitable_activities: ["祈福上香", "拜访长辈", "学习新技能", "整理房间"],
      avoid_activities: ["冲动购物", "与人争执", "熬夜", "过度饮食"],
      date: date || new Date().toISOString().split('T')[0],
      lunar_date: lunarDate || "农历日期",
      timestamp: new Date().toISOString()
    }
  }

  // 调用DeepSeek API
  async callDeepSeekAPI(prompt) {
    if (!this.apiKey) {
      throw new Error('DeepSeek API密钥未配置，请检查.env文件中的VUE_APP_DEEPSEEK_API_KEY设置')
    }

    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API请求失败: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API响应格式错误，缺少必要字段')
    }

    return data.choices[0].message.content
  }

  // 获取农历日期（简单实现，实际项目中建议使用专门的农历库）
  getLunarDate(date = new Date()) {
    // 这里是一个简化的农历转换，实际项目中应该使用专门的农历计算库
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    
    // 简单的农历月份名称
    const lunarMonths = [
      "正月", "二月", "三月", "四月", "五月", "六月",
      "七月", "八月", "九月", "十月", "十一月", "腊月"
    ]
    
    // 简单的农历日期名称
    const lunarDays = [
      "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
      "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
      "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"
    ]
    
    // 这里使用简化的计算方式，实际应该使用准确的农历转换算法
    const lunarMonth = ((month + 10) % 12)
    const lunarDay = ((day + 15) % 30)
    
    return `${lunarMonths[lunarMonth]}${lunarDays[lunarDay]}`
  }

  // 清理缓存（可以在每天0点调用）
  clearCache() {
    console.log('🧹 清理每日运势缓存')
    this.dailyFortuneCache.clear()
  }

  // 获取缓存状态
  getCacheStatus() {
    return {
      size: this.dailyFortuneCache.size,
      keys: Array.from(this.dailyFortuneCache.keys())
    }
  }
}

// 创建单例实例
const deepSeekService = new DeepSeekService()

export default deepSeekService
export { DeepSeekService } 