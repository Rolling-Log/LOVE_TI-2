export const personalities = [
  {
    code: 'SIMP-er',
    name: '供养型恋爱人格',
    description: '别人谈恋爱带脑子，你谈恋爱带贡品。',
    detail:
      '你对关系的投入速度常常快过剧情更新，只要一点回应就能把喜欢放大成长期工程。你愿意给、愿意陪、愿意补位，但很容易把自己忙成感情后勤部。',
    advice: '喜欢可以很满，但别把自我价值外包给对方的反馈。',
    matcher: {
      requiredHigh: ['ATTACH', 'INPUT'],
      preferredLow: ['CONTROL'],
      priority: 88,
    },
  },
  {
    code: 'CTRL',
    name: '控制型恋爱人格',
    description: '你不是在恋爱，你是在给关系排甘特图。',
    detail:
      '你需要可预期、可执行、可复盘的关系节奏。你不是不真诚，只是太怕失控，所以总想通过安排、规则和节奏感来确认这段关系没跑偏。',
    advice: '稳定很重要，但不是所有亲密都靠控制换来。',
    matcher: {
      requiredHigh: ['CONTROL'],
      preferredHigh: ['STRATEGY'],
      priority: 104,
    },
  },
  {
    code: 'OVER',
    name: '过载型恋爱人格',
    description: '你不是在心动，你是在感情里直接超频。',
    detail:
      '一旦喜欢上头，你会同时输出依赖、投入和情绪。你给得很多，也感受得很多，容易把普通恋爱玩成高功率沉浸式体验。',
    advice: '热烈没问题，但记得给关系留一点散热空间。',
    matcher: {
      requiredHigh: ['ATTACH', 'INPUT', 'RESPONSE'],
      priority: 97,
    },
  },
  {
    code: 'GHOST',
    name: '幽灵型恋爱人格',
    description: '你人还在对话框里，灵魂已经下线了。',
    detail:
      '你不是完全无情，只是投入成本一高，你的撤退速度会比解释速度更快。你习惯把情绪静音，把存在感调低，不知不觉就演成了若即若离。',
    advice: '想抽离可以直说，别让别人靠猜测给你配字幕。',
    matcher: {
      requiredLow: ['INPUT', 'RESPONSE'],
      preferredLow: ['ATTACH'],
      priority: 74,
    },
  },
  {
    code: 'REPLAY',
    name: '复盘型恋爱人格',
    description: '别人睡前放白噪音，你睡前回放聊天记录。',
    detail:
      '你会把关系里的细节存档、拆解、回看，既想确认爱意，也想提前防止翻车。你不是纯感性，更像情感侦探，擅长从蛛丝马迹里寻找信号。',
    advice: '复盘能给你安全感，但别把每个细节都判成证据。',
    matcher: {
      requiredHigh: ['ATTACH', 'STRATEGY'],
      preferredHigh: ['RESPONSE'],
      priority: 90,
    },
  },
  {
    code: 'TESTER',
    name: '试探型恋爱人格',
    description: '你嘴上说随便，背地里已经出了三道判断题。',
    detail:
      '你不轻易明牌，更习惯通过细节、反应和小测试判断对方靠不靠谱。你在关系里像隐形考官，外表风平浪静，内心已经打完第一轮分。',
    advice: '试探可以保护你，但别让对方永远活在答题环节。',
    matcher: {
      requiredHigh: ['CONTROL', 'STRATEGY'],
      preferredLow: ['INPUT'],
      priority: 96,
    },
  },
  {
    code: 'EMO',
    name: '情绪流恋爱人格',
    description: '你谈恋爱像开了氛围滤镜，感受比事实更先到场。',
    detail:
      '你非常吃感觉，也很愿意投入。当关系顺的时候你能甜得离谱，但一旦风向不对，你的情绪也会立刻收到并扩大。',
    advice: '感受很真实，但不是每一次波动都等于关系出事。',
    matcher: {
      requiredHigh: ['RESPONSE', 'INPUT'],
      preferredLow: ['STRATEGY'],
      priority: 83,
    },
  },
  {
    code: 'BURST',
    name: '爆冲型恋爱人格',
    description: '你的情绪像弹射起步，恋爱里全是瞬时峰值。',
    detail:
      '你感受强、反应快、爆发力足。开心能把人甜晕，不爽也能当场点燃气氛。你不是故意戏剧化，只是情绪经常比理智更早一步拿到麦克风。',
    advice: '表达情绪没问题，但别让关系总靠爆点推动。',
    matcher: {
      requiredHigh: ['RESPONSE'],
      preferredLow: ['CONTROL'],
      priority: 110,
    },
  },
  {
    code: 'MASK',
    name: '面具型恋爱人格',
    description: '你的情绪不是没有，只是都被你锁进后台了。',
    detail:
      '你习惯表现得冷静、稳妥、有分寸，哪怕心里已经起浪，也会先把表情管理做好。你不想把自己交出去太多，所以常用克制感维持体面。',
    advice: '会藏不代表必须一直藏，亲密需要一点可见的真心。',
    matcher: {
      requiredLow: ['RESPONSE'],
      preferredHigh: ['CONTROL', 'STRATEGY'],
      priority: 82,
    },
  },
  {
    code: 'LOOP',
    name: '循环型恋爱人格',
    description: '你最擅长的不是放下，是反复打开旧窗口。',
    detail:
      '你越在意，越容易在感受里打转。对方一个表情、一句语气、一次延迟，都可能让你重新回到上一轮情绪循环里。',
    advice: '有些关系问题需要沟通，不是靠脑内重播解决。',
    matcher: {
      requiredHigh: ['ATTACH', 'RESPONSE'],
      preferredLow: ['CONTROL'],
      priority: 87,
    },
  },
  {
    code: 'SOLO',
    name: '单机型恋爱人格',
    description: '你不是不会爱，你只是懒得把人生改成双人模式。',
    detail:
      '你对关系的依赖和投入都偏低，不代表冷血，只是你的自我系统运转得太完整，恋爱很难成为你的主线任务。',
    advice: '独立是优点，但关系也需要一点主动上线。',
    matcher: {
      requiredLow: ['ATTACH', 'INPUT'],
      priority: 108,
    },
  },
  {
    code: 'LOGIC',
    name: '理智型恋爱人格',
    description: '你谈恋爱像做案例分析，情绪先排队，逻辑先讲话。',
    detail:
      '你非常重视因果、边界和判断，情绪波动不会轻易劫持你。你习惯先理解局面，再决定要不要靠近，所以总给人一种清醒得过头的感觉。',
    advice: '清醒很好，但别让关系变成纯推理题。',
    matcher: {
      requiredHigh: ['STRATEGY'],
      requiredLow: ['RESPONSE'],
      priority: 95,
    },
  },
  {
    code: 'SAFE',
    name: '保守型恋爱人格',
    description: '你不是慢热，你是怕翻车所以手刹一直没松。',
    detail:
      '你愿意投入，但方式偏稳。你不喜欢戏剧化，也不喜欢关系失控，所以总会先确认安全，再释放更多热情。',
    advice: '谨慎能保护你，但别把所有好感都卡在审核流程。',
    matcher: {
      requiredLow: ['RESPONSE'],
      preferredHigh: ['CONTROL', 'INPUT'],
      priority: 80,
    },
  },
  {
    code: 'PLAYER',
    name: '玩家型恋爱人格',
    description: '别人谈恋爱靠真心，你谈恋爱顺手还看了一眼胜率。',
    detail:
      '你很会观察局势，也很懂节奏和手感。你不一定坏，只是很少毫无保留地进场，总会给自己留后手和退路。',
    advice: '会玩不等于要一直玩，真诚偶尔比技巧更有效。',
    matcher: {
      requiredHigh: ['STRATEGY'],
      requiredLow: ['ATTACH'],
      preferredLow: ['INPUT'],
      priority: 93,
    },
  },
  {
    code: 'ACTOR',
    name: '表演型恋爱人格',
    description: '你的喜欢是真的，只是表达方式多少带点舞台感。',
    detail:
      '你会投入，也会经营氛围，懂得什么时候该出现、该说什么、该怎么制造戏剧张力。你并非虚假，只是太擅长包装情绪。',
    advice: '氛围感很迷人，但关系最终还是要落回真实。',
    matcher: {
      requiredHigh: ['INPUT', 'STRATEGY'],
      preferredLow: ['ATTACH'],
      priority: 89,
    },
  },
  {
    code: 'NPC',
    name: '路人型恋爱人格',
    description: '你在恋爱剧情里最大作用，是提醒主角该自己成长了。',
    detail:
      '你的五维表现相对平均，或者整体波动不大，很难被某一种极端恋爱风格定义。你不像谁，也就很像普通人，稳定得有点像系统默认设置。',
    advice: '普通并不无聊，说明你没把恋爱玩成灾难片。',
    matcher: {
      priority: 0,
    },
  },
];
