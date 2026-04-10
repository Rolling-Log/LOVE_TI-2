export const DIMENSIONS = ['ATTACH', 'CONTROL', 'INPUT', 'RESPONSE', 'STRATEGY'];

export const EMPTY_SCORES = {
  ATTACH: 0,
  CONTROL: 0,
  INPUT: 0,
  RESPONSE: 0,
  STRATEGY: 0,
};

const score = (ATTACH, CONTROL, INPUT, RESPONSE, STRATEGY) => ({
  ATTACH,
  CONTROL,
  INPUT,
  RESPONSE,
  STRATEGY,
});

export const questions = [
  {
    id: 1,
    question: '对方回你一句“嗯嗯”，你的第一反应是？',
    options: [
      { text: '立刻补三条消息，把天聊活', score: score(3, 0, 3, 2, 0) },
      { text: '回个表情，装作自己也很忙', score: score(1, 1, 1, 1, 1) },
      { text: '收起手机，顺便给自己倒杯水', score: score(0, 2, 0, 0, 2) },
    ],
  },
  {
    id: 2,
    question: '刚确认关系三天，你更像哪一种？',
    options: [
      { text: '已经开始幻想见家长流程', score: score(3, 1, 2, 1, 0) },
      { text: '先谈着看，别演太快', score: score(1, 1, 1, 0, 1) },
      { text: '关系先放着，我人先活着', score: score(0, 1, 0, 0, 2) },
    ],
  },
  {
    id: 3,
    question: '对方说今晚早点睡，你会？',
    options: [
      { text: '嘴上说好，实际等他睡着再想他', score: score(3, 0, 2, 2, 0) },
      { text: '回一句晚安，体面收场', score: score(1, 1, 1, 0, 1) },
      { text: '好耶，终于能安静追剧了', score: score(0, 2, 0, 0, 2) },
    ],
  },
  {
    id: 4,
    question: '吵架后你最容易进入哪种状态？',
    options: [
      { text: '盯着对话框等他先来哄', score: score(3, 1, 1, 2, 0) },
      { text: '先冷静半小时，再决定怎么回', score: score(1, 2, 1, 1, 1) },
      { text: '情绪打包存档，第二天再说', score: score(0, 2, 0, 0, 2) },
    ],
  },
  {
    id: 5,
    question: '对方发朋友圈没屏蔽所有人，唯独没给你点赞，你会？',
    options: [
      { text: '开始脑补关系是不是凉了', score: score(3, 1, 1, 3, 0) },
      { text: '观察一下，不急着问', score: score(1, 1, 0, 1, 2) },
      { text: '朋友圈而已，我连自己都懒得点', score: score(0, 1, 0, 0, 2) },
    ],
  },
  {
    id: 6,
    question: '你对“安全感”的理解更接近？',
    options: [
      { text: '最好随时能找到人，不然我心慌', score: score(3, 1, 2, 2, 0) },
      { text: '有回应、有边界，就够了', score: score(1, 1, 1, 0, 1) },
      { text: '安全感主要靠自己，不靠恋爱发电', score: score(0, 2, 0, 0, 2) },
    ],
  },
  {
    id: 7,
    question: '一起出去玩时，你更习惯？',
    options: [
      { text: '我来定路线、时间、餐厅，效率最高', score: score(1, 3, 1, 0, 2) },
      { text: '一起商量，别谁都想当导演', score: score(1, 1, 1, 0, 1) },
      { text: '随便，能出门已经算努力了', score: score(0, 0, 0, 1, 0) },
    ],
  },
  {
    id: 8,
    question: '对象突然不按你们原计划来，你通常会？',
    options: [
      { text: '先不爽，因为你最烦临时变卦', score: score(1, 3, 0, 1, 2) },
      { text: '问清原因，再决定要不要改', score: score(1, 2, 1, 0, 2) },
      { text: '改就改吧，世界又不会爆炸', score: score(0, 0, 0, 1, 0) },
    ],
  },
  {
    id: 9,
    question: '你发消息最常带着哪种潜台词？',
    options: [
      { text: '最好按我说的来，这样最稳', score: score(1, 3, 1, 0, 2) },
      { text: '你也可以提意见，我们别互相指挥', score: score(1, 1, 1, 0, 1) },
      { text: '爱咋咋地，我只是通知一下', score: score(0, 1, 0, 1, 1) },
    ],
  },
  {
    id: 10,
    question: '恋爱里你最怕哪件事？',
    options: [
      { text: '事情脱轨，场面失控，没人听安排', score: score(1, 3, 0, 1, 2) },
      { text: '两个人各说各话，没共识', score: score(1, 2, 1, 1, 1) },
      { text: '怕什么，烂就一起烂', score: score(0, 0, 0, 2, 0) },
    ],
  },
  {
    id: 11,
    question: '对方总忘记你说过的话，你会？',
    options: [
      { text: '立刻建立提醒机制，顺便教育一下', score: score(1, 3, 1, 1, 2) },
      { text: '提醒一次，再看后续表现', score: score(1, 1, 1, 1, 1) },
      { text: '记不住就算了，我也不是培训老师', score: score(0, 0, 0, 0, 2) },
    ],
  },
  {
    id: 12,
    question: '恋爱里的“边界感”在你看来更像？',
    options: [
      { text: '清晰规则，不然关系迟早散架', score: score(1, 3, 0, 0, 3) },
      { text: '有默契就行，不必写制度', score: score(1, 1, 1, 0, 1) },
      { text: '边界这种事，想到再说', score: score(0, 0, 0, 1, 0) },
    ],
  },
  {
    id: 13,
    question: '对象随口说想吃某家店，你会？',
    options: [
      { text: '已经准备点单、预约、顺路带奶茶', score: score(2, 0, 3, 1, 0) },
      { text: '有空再去，别把生活搞成服务业', score: score(1, 1, 1, 0, 1) },
      { text: '记住了，但大概率只记到今晚', score: score(0, 0, 0, 0, 2) },
    ],
  },
  {
    id: 14,
    question: '为了对象改行程、改作息、改脑回路，你会？',
    options: [
      { text: '改，恋爱不就是为爱搬山吗', score: score(2, 0, 3, 2, 0) },
      { text: '能协调就协调，别两败俱伤', score: score(1, 1, 1, 0, 1) },
      { text: '不改，我的人生不是跟单系统', score: score(0, 2, 0, 0, 2) },
    ],
  },
  {
    id: 15,
    question: '约会前你通常准备到什么程度？',
    options: [
      { text: '妆造、路线、话题、备选方案都备齐', score: score(1, 1, 3, 0, 2) },
      { text: '正常出门，不至于像面试', score: score(1, 1, 1, 0, 1) },
      { text: '能准时到场已经是巅峰投入', score: score(0, 0, 0, 0, 1) },
    ],
  },
  {
    id: 16,
    question: '你表达喜欢的方式更像？',
    options: [
      { text: '持续投喂、持续出现、持续上头', score: score(2, 0, 3, 1, 0) },
      { text: '稳定回应，不搞太夸张', score: score(1, 1, 1, 0, 1) },
      { text: '嘴上挺会说，行动看心情', score: score(0, 1, 0, 1, 2) },
    ],
  },
  {
    id: 17,
    question: '如果是异地恋，你会更在意？',
    options: [
      { text: '频率和仪式感，少一点都像在失联', score: score(2, 0, 3, 2, 0) },
      { text: '沟通稳定最重要，其他慢慢磨', score: score(1, 1, 1, 0, 1) },
      { text: '异地本来就难，我先保命', score: score(0, 1, 0, 1, 2) },
    ],
  },
  {
    id: 18,
    question: '你最容易在哪方面“用力过猛”？',
    options: [
      { text: '把对方安排进我所有计划里', score: score(2, 1, 3, 1, 0) },
      { text: '偶尔热情，偶尔正常，还算像个人', score: score(1, 1, 1, 0, 1) },
      { text: '我更擅长嘴上说爱，行动等版本更新', score: score(0, 1, 0, 0, 2) },
    ],
  },
  {
    id: 19,
    question: '对方半天没回，你的情绪波动像？',
    options: [
      { text: '心率先炸，再脑补八百集', score: score(2, 0, 1, 3, 0) },
      { text: '会在意，但还能正常做人', score: score(1, 1, 1, 1, 1) },
      { text: '没回就没回，我先活自己的', score: score(0, 1, 0, 0, 2) },
    ],
  },
  {
    id: 20,
    question: '你在恋爱里哭点最低的场景是？',
    options: [
      { text: '他说话变冷一点，我就开始内伤', score: score(2, 0, 1, 3, 0) },
      { text: '真受委屈了才会难受', score: score(1, 1, 1, 1, 0) },
      { text: '哭倒不至于，主要会拉黑一下', score: score(0, 2, 0, 1, 1) },
    ],
  },
  {
    id: 21,
    question: '吵架时你的常见技能树是？',
    options: [
      { text: '输出过猛，自己都收不住', score: score(1, 0, 1, 3, 0) },
      { text: '说重点，不翻旧账', score: score(1, 1, 1, 1, 1) },
      { text: '冷处理，省得我说重话', score: score(0, 2, 0, 0, 2) },
    ],
  },
  {
    id: 22,
    question: '恋爱里最容易让你上头的是？',
    options: [
      { text: '一点点偏爱，我就能脑补永远', score: score(2, 0, 1, 3, 0) },
      { text: '稳定真诚，比花活更打动我', score: score(1, 1, 1, 1, 0) },
      { text: '我一般不上头，我只上班', score: score(0, 1, 0, 0, 2) },
    ],
  },
  {
    id: 23,
    question: '当对方说“你想多了”，你会？',
    options: [
      { text: '情绪先炸，再开始审判大会', score: score(1, 1, 0, 3, 1) },
      { text: '先问清楚到底是哪部分想多了', score: score(1, 1, 1, 1, 2) },
      { text: '行，那我懒得想了', score: score(0, 1, 0, 0, 1) },
    ],
  },
  {
    id: 24,
    question: '你处理失落感的方式通常是？',
    options: [
      { text: '反复回想细节，把自己越想越难受', score: score(2, 0, 1, 3, 1) },
      { text: '找人聊聊，消化一下', score: score(1, 0, 1, 1, 1) },
      { text: '把情绪关机，明天再看', score: score(0, 2, 0, 0, 2) },
    ],
  },
  {
    id: 25,
    question: '你更擅长哪种恋爱操作？',
    options: [
      { text: '提前预判、提前布局、提前拿捏', score: score(0, 1, 1, 0, 3) },
      { text: '顺着感觉走，但留一点脑子', score: score(1, 1, 1, 1, 1) },
      { text: '哪里需要操作，我直接随缘', score: score(0, 0, 0, 1, 0) },
    ],
  },
  {
    id: 26,
    question: '对方一个细节让你不舒服，你会？',
    options: [
      { text: '先记着，再看什么时候丢出来', score: score(1, 1, 0, 1, 3) },
      { text: '当下说清楚，不留后账', score: score(1, 1, 1, 1, 1) },
      { text: '懒得管，小事不值得我动脑', score: score(0, 0, 0, 0, 0) },
    ],
  },
  {
    id: 27,
    question: '如果要试探对方心意，你更像？',
    options: [
      { text: '会设计一点小测试，看他上不上钩', score: score(1, 2, 0, 0, 3) },
      { text: '直接问，比演戏省力', score: score(1, 0, 1, 1, 1) },
      { text: '不试探，爱不爱都别折腾我', score: score(0, 0, 0, 0, 1) },
    ],
  },
  {
    id: 28,
    question: '你对“欲擒故纵”的态度是？',
    options: [
      { text: '必要时很好用，恋爱也讲战术', score: score(0, 1, 0, 0, 3) },
      { text: '偶尔能玩，但别太伤人', score: score(1, 1, 1, 1, 1) },
      { text: '我不会，我只会真的消失', score: score(0, 0, 0, 1, 1) },
    ],
  },
  {
    id: 29,
    question: '对象突然开始热情，你第一反应是？',
    options: [
      { text: '先开心，再怀疑他是不是有事求我', score: score(1, 1, 0, 1, 3) },
      { text: '享受就好，不必过度解题', score: score(1, 0, 1, 1, 1) },
      { text: '热情太麻烦，我先观望', score: score(0, 1, 0, 0, 2) },
    ],
  },
  {
    id: 30,
    question: '如果恋爱是一局游戏，你更像哪类玩家？',
    options: [
      { text: '会研究机制，争取每一步都占先机', score: score(0, 1, 1, 0, 3) },
      { text: '边玩边学，输了也当体验卡', score: score(1, 1, 1, 1, 1) },
      { text: '我像路过的 NPC，路人剧情而已', score: score(0, 0, 0, 0, 0) },
    ],
  },
];

export const TOTAL_QUESTIONS = questions.length;
