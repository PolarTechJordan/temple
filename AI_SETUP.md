# AI服务集成设置说明

## DeepSeek AI 集成配置

### 1. 获取API密钥

1. 访问 [DeepSeek平台](https://platform.deepseek.com/)
2. 注册并登录账户
3. 在控制台中创建API密钥
4. 复制您的API密钥

### 2. 环境变量配置

在项目根目录创建 `.env` 文件（请勿提交到版本控制），添加以下配置：

```bash
# DeepSeek AI 配置
VUE_APP_DEEPSEEK_API_KEY=sk-your-deepseek-api-key-here

# API 基础URL（可选，默认为官方地址）
VUE_APP_DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
```

### 3. 功能说明

#### 3.1 小六壬算命功能
- **位置**: `CalculatePage.vue` -> `ResultPage.vue`
- **功能**: 根据用户输入的愿望和3个数字，使用小六壬算法生成算命结果
- **AI提示词**: 包含完整的小六壬算法说明和结果格式要求

#### 3.2 每日运势功能
- **位置**: `MeritPage.vue` -> `DailyFortunePage.vue`
- **功能**: 基于日期生成当日运势，包含财运、事业、感情、健康等方面
- **缓存机制**: 同一日期的运势会被缓存，避免重复调用API

### 4. 文件结构

```
src/
├── services/
│   └── deepseekService.js        # AI服务核心文件
├── views/
│   ├── CalculatePage.vue         # 算命输入页面
│   ├── ResultPage.vue            # 算命结果展示页面
│   ├── MeritPage.vue             # 功德页面（包含每日运势预览）
│   └── DailyFortunePage.vue      # 详细每日运势页面
└── stores/
    └── app.js                    # 状态管理（存储运势数据）
```

### 5. API调用说明

#### 5.1 算命结果生成
```javascript
const result = await deepSeekService.generateFortuneResult(userWish, numbers)
```

#### 5.2 每日运势生成
```javascript
const fortune = await deepSeekService.generateDailyFortune(date, lunarDate)
```

### 6. 错误处理

- 如果API调用失败，系统会自动使用默认的算命结果
- 运势缓存确保即使网络问题也能显示当日运势
- 所有错误都会在控制台记录，便于调试

### 7. 开发注意事项

1. **API密钥安全**: 请确保不要将API密钥提交到代码仓库
2. **API限制**: 注意DeepSeek API的调用限制和费用
3. **缓存策略**: 每日运势具有缓存机制，同一天只会调用一次API
4. **降级策略**: 如果AI服务不可用，会使用本地生成的默认内容

### 8. 测试建议

1. 先设置一个测试API密钥
2. 在开发环境中测试算命和运势功能
3. 验证缓存机制是否正常工作
4. 测试网络异常情况下的降级处理

### 9. 生产环境部署

1. 确保生产环境的环境变量正确设置
2. 监控API调用量和费用
3. 设置适当的错误告警机制
4. 定期备份用户运势数据 