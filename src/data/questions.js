import { EMPTY_SCORES } from './framework.js';

const score = (overrides) => ({
  ...EMPTY_SCORES,
  ...overrides,
});

export const questions = [
  {
    id: 1,
    model: 'bonding',
    question: '对方已读你 40 分钟没回，你的脑内弹幕先刷哪句？',
    options: [
      { text: '“是不是我刚那句太重了？”然后开始复盘聊天记录', score: score({ REASSURANCE: 4, RUMINATION: 3, CLOSENESS: 2 }) },
      { text: '先发个轻松梗图，顺便确认人还活着', score: score({ CLOSENESS: 3, SIGNAL: 2, TESTING: 1 }) },
      { text: '忙就忙吧，晚点再聊，先去干自己的事', score: score({ AUTONOMY: 2, EXIT: 1, REACTIVITY: 1 }) },
      { text: '我也原地消失，谁先急谁输', score: score({ AUTONOMY: 3, EXIT: 3, TESTING: 1 }) },
    ],
  },
  {
    id: 2,
    model: 'bonding',
    question: '暧昧刚第三天，你已经把关系想到了哪一集？',
    options: [
      { text: '已经在想一起过节、一起旅行、一起挑窗帘', score: score({ FUSION: 4, CLOSENESS: 3, REASSURANCE: 1 }) },
      { text: '先再聊聊，别把番外脑补成大结局', score: score({ SIGNAL: 1, RULE: 1, AUTONOMY: 1 }) },
      { text: '我会期待，但不会自动把人写进日程表', score: score({ CLOSENESS: 2, FUSION: 1, CONSISTENCY: 1 }) },
      { text: '恋爱线还没开，我的主线剧情不能停', score: score({ AUTONOMY: 3, EXIT: 2, FUSION: 0 }) },
    ],
  },
  {
    id: 3,
    model: 'bonding',
    question: '对方说“我今天想一个人待会儿”，你第一反应更像？',
    options: [
      { text: '嘴上说好，心里已经开始问“是不是要凉”', score: score({ REASSURANCE: 4, REACTIVITY: 2, RUMINATION: 2 }) },
      { text: '会问一句需不需要我陪着，但尊重他的节奏', score: score({ CLOSENESS: 3, REPAIR: 1, RULE: 1 }) },
      { text: '挺正常，我也需要自己的安静角落', score: score({ AUTONOMY: 2, RULE: 1, CLOSENESS: 1 }) },
      { text: '太好了，我终于可以无负担刷剧了', score: score({ AUTONOMY: 3, EXIT: 2 }) },
    ],
  },
  {
    id: 4,
    model: 'bonding',
    question: '朋友圈里他给所有人点赞，唯独没点你，你会？',
    options: [
      { text: '表面风平浪静，心里已经拉出嫌疑人名单', score: score({ REASSURANCE: 3, SIGNAL: 2, RUMINATION: 3 }) },
      { text: '先看是不是他手滑，别让自己演太满', score: score({ SIGNAL: 2, RULE: 1, REACTIVITY: 1 }) },
      { text: '直接问一句“你漏了我还是故意的”', score: score({ EXPRESSION: 2, REASSURANCE: 2, CONTROL: 1 }) },
      { text: '朋友圈而已，我自己都懒得点', score: score({ AUTONOMY: 2, EXIT: 1 }) },
    ],
  },
  {
    id: 5,
    model: 'bonding',
    question: '如果异地恋要靠固定连麦维持安全感，你会站哪边？',
    options: [
      { text: '必须高频，少一次都像服务器掉线', score: score({ CLOSENESS: 4, REASSURANCE: 4, CONSISTENCY: 1 }) },
      { text: '规律沟通就够，频率不必卷成打卡 KPI', score: score({ CONSISTENCY: 2, RULE: 1, CLOSENESS: 1 }) },
      { text: '我更在意质量，不在意是不是每天连', score: score({ CLOSENESS: 1, SIGNAL: 1, AUTONOMY: 1 }) },
      { text: '高频太耗电，我会先保命', score: score({ AUTONOMY: 3, EXIT: 2, CLOSENESS: 0 }) },
    ],
  },
  {
    id: 6,
    model: 'bonding',
    question: '恋爱里你最想从对方那里持续收到的，不是礼物，而是？',
    options: [
      { text: '“我在乎你”的明确表达和稳定回音', score: score({ REASSURANCE: 4, CONSISTENCY: 2, CLOSENESS: 2 }) },
      { text: '把我算进计划里的那种“我们”感', score: score({ FUSION: 4, CLOSENESS: 2, INITIATIVE: 1 }) },
      { text: '彼此舒服但不窒息的存在感', score: score({ RULE: 1, CLOSENESS: 2, AUTONOMY: 1 }) },
      { text: '尊重边界，不要随时查岗', score: score({ AUTONOMY: 3, RULE: 2, REASSURANCE: 0 }) },
    ],
  },
  {
    id: 7,
    model: 'boundary',
    question: '约会前 2 小时，对方突然说要改地点，你最像哪种状态？',
    options: [
      { text: '我不喜欢计划被打断，先问清楚原因再说', score: score({ CONTROL: 3, RULE: 3, SIGNAL: 1 }) },
      { text: '能改，但请给我一个靠谱的新方案', score: score({ RULE: 2, CONTROL: 2, REPAIR: 1 }) },
      { text: '只要人来就行，地点是枝节', score: score({ AUTONOMY: 1, CLOSENESS: 1, RULE: 0 }) },
      { text: '太突然我会直接不想去了', score: score({ AUTONOMY: 3, EXIT: 2, RULE: 2 }) },
    ],
  },
  {
    id: 8,
    model: 'boundary',
    question: '恋爱里“报备”两个字，在你这儿像什么？',
    options: [
      { text: '不是束缚，是基本运行协议', score: score({ RULE: 4, CONTROL: 2, REASSURANCE: 1 }) },
      { text: '重要场景可以说，但不用上升成监控系统', score: score({ RULE: 2, AUTONOMY: 1, SIGNAL: 1 }) },
      { text: '想到就说，不想把关系做成日报周报', score: score({ AUTONOMY: 2, RULE: 0, CONTROL: 0 }) },
      { text: '过度报备会让我想跑路', score: score({ AUTONOMY: 4, EXIT: 2, RULE: 0 }) },
    ],
  },
  {
    id: 9,
    model: 'boundary',
    question: '对方老迟到，你会怎么处理这条 bug？',
    options: [
      { text: '直接出制度：晚到几次就触发惩罚机制', score: score({ CONTROL: 4, RULE: 4, EXPRESSION: 1 }) },
      { text: '认真沟通一次，看看是不是习惯问题', score: score({ RULE: 2, REPAIR: 2, CONTROL: 1 }) },
      { text: '嘴上说没事，心里偷偷减分', score: score({ SIGNAL: 2, TESTING: 1, RULE: 2 }) },
      { text: '我会减少期待，实在不行就散', score: score({ AUTONOMY: 3, EXIT: 3, RULE: 1 }) },
    ],
  },
  {
    id: 10,
    model: 'boundary',
    question: '发生争执时，你更容易自动切到哪个模式？',
    options: [
      { text: '先把流程拉正：问题是什么、谁负责、怎么改', score: score({ CONTROL: 4, RULE: 3, REPAIR: 1 }) },
      { text: '先停战，不在情绪顶峰做决定', score: score({ AUTONOMY: 2, RULE: 2, REACTIVITY: 1 }) },
      { text: '我会把底线讲清楚，但不想压人', score: score({ RULE: 3, EXPRESSION: 1, CONTROL: 1 }) },
      { text: '吵到这份上我先撤，冷静完再说', score: score({ AUTONOMY: 3, EXIT: 3, REPAIR: 0 }) },
    ],
  },
  {
    id: 11,
    model: 'boundary',
    question: '看到对象和异性朋友深夜聊天，你更在意的是？',
    options: [
      { text: '边界有没有被踩，这件事必须对齐标准', score: score({ RULE: 4, CONTROL: 2, SIGNAL: 1 }) },
      { text: '先看内容和背景，不想无差别上纲上线', score: score({ SIGNAL: 2, RULE: 1, AUTONOMY: 1 }) },
      { text: '如果他会主动说明，我就不会太抓狂', score: score({ REASSURANCE: 2, RULE: 1, REPAIR: 1 }) },
      { text: '我不会翻旧账，但会默默把退出键擦亮', score: score({ AUTONOMY: 2, EXIT: 3, SIGNAL: 1 }) },
    ],
  },
  {
    id: 12,
    model: 'boundary',
    question: '你对“恋爱里也要保留完全属于自己的空间”这句话的态度是？',
    options: [
      { text: '100% 同意，空间就是情绪保险丝', score: score({ AUTONOMY: 4, RULE: 2, EXIT: 1 }) },
      { text: '同意，但不能拿空间当失联通行证', score: score({ AUTONOMY: 2, RULE: 2, REASSURANCE: 1 }) },
      { text: '我更喜欢高粘度相处，空间别太多', score: score({ CLOSENESS: 3, FUSION: 2, AUTONOMY: 0 }) },
      { text: '如果爱我，最好自然把我放进核心位置', score: score({ FUSION: 3, REASSURANCE: 2, CLOSENESS: 2 }) },
    ],
  },
  {
    id: 13,
    model: 'investment',
    question: '第一次正式约会前，你的准备程度通常是？',
    options: [
      { text: '路线、备选店、话题、天气预案，我都给你排好了', score: score({ INITIATIVE: 4, CONSISTENCY: 2, CONTROL: 2 }) },
      { text: '会认真准备，但不会做成项目路演', score: score({ INITIATIVE: 2, CONSISTENCY: 2, SIGNAL: 1 }) },
      { text: '正常出门，状态好比流程更重要', score: score({ INITIATIVE: 1, EXPRESSION: 1, AUTONOMY: 1 }) },
      { text: '能准时到已经是我对爱情最大的尊重', score: score({ INITIATIVE: 0, CONSISTENCY: 1, EXIT: 1 }) },
    ],
  },
  {
    id: 14,
    model: 'investment',
    question: '对方随口说一句“最近想吃那家店”，你更容易？',
    options: [
      { text: '下一秒就开始订位，顺手把奶茶口味也问了', score: score({ INITIATIVE: 4, CONSISTENCY: 2, CLOSENESS: 2 }) },
      { text: '记在心里，找合适机会实现', score: score({ CONSISTENCY: 3, INITIATIVE: 2, SIGNAL: 1 }) },
      { text: '会回应，但不想把自己做成 24 小时许愿池', score: score({ AUTONOMY: 1, INITIATIVE: 1, RULE: 1 }) },
      { text: '我听到了，但大概率随风而去', score: score({ INITIATIVE: 0, CONSISTENCY: 0, EXIT: 1 }) },
    ],
  },
  {
    id: 15,
    model: 'investment',
    question: '吵完架以后，谁先开口修关系这件事，在你这儿像什么？',
    options: [
      { text: '只要关系值得，我可以先伸手', score: score({ REPAIR: 4, CONSISTENCY: 2, CLOSENESS: 1 }) },
      { text: '我会看双方责任，不做无限兜底的人', score: score({ REPAIR: 2, RULE: 2, AUTONOMY: 1 }) },
      { text: '我想修，但需要一点缓冲时间', score: score({ REPAIR: 2, REACTIVITY: 1, AUTONOMY: 1 }) },
      { text: '谁惹谁修，我不当情绪售后', score: score({ AUTONOMY: 2, RULE: 2, REPAIR: 0 }) },
    ],
  },
  {
    id: 16,
    model: 'investment',
    question: '如果对方连续一周状态低迷，你会更像？',
    options: [
      { text: '稳定陪着，哪怕我变身人形充电宝', score: score({ CONSISTENCY: 4, REPAIR: 3, CLOSENESS: 2 }) },
      { text: '会支持，但我也需要保留自己的节奏', score: score({ CONSISTENCY: 2, AUTONOMY: 1, REPAIR: 2 }) },
      { text: '先问他要什么，不乱救人', score: score({ SIGNAL: 2, REPAIR: 2, RULE: 1 }) },
      { text: '我会共情，但不会长期背别人的情绪包', score: score({ AUTONOMY: 3, EXIT: 1, CONSISTENCY: 0 }) },
    ],
  },
  {
    id: 17,
    model: 'investment',
    question: '要一起出去玩三天两夜，你会怎么进入状态？',
    options: [
      { text: '我已经建好了共享表格，欢迎进群', score: score({ INITIATIVE: 4, CONSISTENCY: 2, CONTROL: 2 }) },
      { text: '我愿意一起做计划，但别让我一个人承包全部细节', score: score({ INITIATIVE: 2, RULE: 1, CONSISTENCY: 2 }) },
      { text: '别人定大方向，我负责把气氛搞好', score: score({ EXPRESSION: 2, INITIATIVE: 1, CLOSENESS: 1 }) },
      { text: '太复杂了，我会开始怀念独自旅行', score: score({ AUTONOMY: 3, EXIT: 2, INITIATIVE: 0 }) },
    ],
  },
  {
    id: 18,
    model: 'investment',
    question: '恋爱进入平淡期后，你最容易靠什么维持温度？',
    options: [
      { text: '持续的小行动，不靠大场面续命', score: score({ CONSISTENCY: 4, REPAIR: 2, INITIATIVE: 1 }) },
      { text: '定期制造一点新鲜感和小仪式', score: score({ INITIATIVE: 3, EXPRESSION: 2, CONSISTENCY: 1 }) },
      { text: '平淡也挺好，别总想着做综艺效果', score: score({ RULE: 1, CONSISTENCY: 1, AUTONOMY: 1 }) },
      { text: '一旦没感觉，我就会下意识往外撤', score: score({ EXIT: 3, AUTONOMY: 2, CONSISTENCY: 0 }) },
    ],
  },
  {
    id: 19,
    model: 'emotion',
    question: '对方半天没回，你的情绪起伏更接近哪条曲线？',
    options: [
      { text: '火箭式起飞，五分钟一轮心态波动', score: score({ REACTIVITY: 4, RUMINATION: 3, EXPRESSION: 1 }) },
      { text: '会在意，但还能维持人类基本功能', score: score({ REACTIVITY: 2, RUMINATION: 1, SIGNAL: 1 }) },
      { text: '我会观察，但不急着把事情往坏处想', score: score({ SIGNAL: 2, REACTIVITY: 1, RULE: 1 }) },
      { text: '没回就没回，我也不是全天客服', score: score({ AUTONOMY: 2, REACTIVITY: 0, EXIT: 1 }) },
    ],
  },
  {
    id: 20,
    model: 'emotion',
    question: '当对方说“你想多了”，你通常会？',
    options: [
      { text: '想得更多，而且瞬间上头', score: score({ RUMINATION: 4, REACTIVITY: 3, EXPRESSION: 2 }) },
      { text: '先停一下，确认到底是哪部分被误解了', score: score({ SIGNAL: 2, EXPRESSION: 1, REPAIR: 1 }) },
      { text: '会委屈，但我未必当场炸', score: score({ RUMINATION: 2, REACTIVITY: 2, EXPRESSION: 0 }) },
      { text: '那我就不想了，直接降低投入', score: score({ EXIT: 2, AUTONOMY: 2, REACTIVITY: 0 }) },
    ],
  },
  {
    id: 21,
    model: 'emotion',
    question: '吵架时你的嘴和心哪个更先失控？',
    options: [
      { text: '嘴先冲出去，心在后面追着灭火', score: score({ EXPRESSION: 4, REACTIVITY: 3, REPAIR: 1 }) },
      { text: '心里已经海啸了，表面还在装平静', score: score({ RUMINATION: 3, REACTIVITY: 2, EXPRESSION: 0 }) },
      { text: '我会尽量讲重点，不把场面炸穿', score: score({ EXPRESSION: 1, RULE: 1, REPAIR: 1 }) },
      { text: '我会直接静音，免得自己说重话', score: score({ AUTONOMY: 2, EXPRESSION: 0, EXIT: 1 }) },
    ],
  },
  {
    id: 22,
    model: 'emotion',
    question: '看到对象和别人拍了很亲近的合照，你最像哪种反应？',
    options: [
      { text: '先情绪爆闪，再开始解读每一个表情', score: score({ REACTIVITY: 4, RUMINATION: 3, SIGNAL: 2 }) },
      { text: '我会酸，但还是先问清楚背景', score: score({ REACTIVITY: 2, SIGNAL: 2, EXPRESSION: 1 }) },
      { text: '会不舒服，不过不想让自己变成侦探', score: score({ RUMINATION: 1, RULE: 1, AUTONOMY: 1 }) },
      { text: '我会先后退一步看关系值不值得我介意', score: score({ EXIT: 2, AUTONOMY: 2, REACTIVITY: 0 }) },
    ],
  },
  {
    id: 23,
    model: 'emotion',
    question: '确认关系后，对方突然没以前那么热情，你会？',
    options: [
      { text: '立刻感知温差，并且非常难装没事', score: score({ REACTIVITY: 3, REASSURANCE: 2, EXPRESSION: 2 }) },
      { text: '会观察一阵，但不急着宣布剧情反转', score: score({ SIGNAL: 2, RUMINATION: 1, RULE: 1 }) },
      { text: '我会提出来聊，别让我猜到天亮', score: score({ EXPRESSION: 2, REPAIR: 2, REASSURANCE: 1 }) },
      { text: '如果持续降温，我会默默收回热度', score: score({ EXIT: 2, AUTONOMY: 2, CONSISTENCY: 0 }) },
    ],
  },
  {
    id: 24,
    model: 'emotion',
    question: '失落感来袭时，你通常怎样处理自己？',
    options: [
      { text: '反复回想细节，越想越能把自己整破防', score: score({ RUMINATION: 4, REACTIVITY: 2, SIGNAL: 2 }) },
      { text: '找信任的人聊，把情绪排出去', score: score({ EXPRESSION: 3, REPAIR: 1, CLOSENESS: 1 }) },
      { text: '自己消化，等系统重启', score: score({ AUTONOMY: 2, EXPRESSION: 0, RUMINATION: 1 }) },
      { text: '直接切断让我不舒服的来源', score: score({ EXIT: 3, AUTONOMY: 2, REACTIVITY: 1 }) },
    ],
  },
  {
    id: 25,
    model: 'strategy',
    question: '想确认对方有没有心，你更可能怎么试？',
    options: [
      { text: '轻轻放个钩子，看他会不会主动接', score: score({ TESTING: 4, SIGNAL: 3, EXIT: 1 }) },
      { text: '直接问，省得大家靠脑电波谈恋爱', score: score({ EXPRESSION: 2, TESTING: 1, REPAIR: 1 }) },
      { text: '我会观察长期表现，不吃一时高糖', score: score({ SIGNAL: 3, RULE: 1, CONSISTENCY: 1 }) },
      { text: '不试，感觉不明朗我就先保留投入', score: score({ EXIT: 2, AUTONOMY: 2, TESTING: 0 }) },
    ],
  },
  {
    id: 26,
    model: 'strategy',
    question: '你发现关系里有个小问题，但还没大到摊牌，会怎么处理？',
    options: [
      { text: '先记账观察，看它是偶发还是惯犯', score: score({ SIGNAL: 3, TESTING: 2, RULE: 2 }) },
      { text: '尽早讲开，我不爱留定时炸弹', score: score({ REPAIR: 2, RULE: 1, EXPRESSION: 1 }) },
      { text: '问题不大就先放，别一惊一乍', score: score({ AUTONOMY: 1, SIGNAL: 1, RULE: 0 }) },
      { text: '心里会悄悄打开撤退路线图', score: score({ EXIT: 4, SIGNAL: 1, AUTONOMY: 2 }) },
    ],
  },
  {
    id: 27,
    model: 'strategy',
    question: '暧昧对象突然异常热情，你最像哪种反射弧？',
    options: [
      { text: '先开心，再怀疑他是不是有事求我', score: score({ SIGNAL: 3, TESTING: 2, EXIT: 1 }) },
      { text: '享受当下，不先把糖拆成化学成分表', score: score({ CLOSENESS: 2, SIGNAL: 0, RUMINATION: 0 }) },
      { text: '我会接住热情，但也会看后续稳不稳', score: score({ SIGNAL: 2, CONSISTENCY: 2, TESTING: 1 }) },
      { text: '热情太猛会让我本能踩刹车', score: score({ EXIT: 2, AUTONOMY: 2, SIGNAL: 1 }) },
    ],
  },
  {
    id: 28,
    model: 'strategy',
    question: '如果恋爱是一局游戏，你更像哪种玩家？',
    options: [
      { text: '先研究机制，再决定怎么下场', score: score({ SIGNAL: 3, TESTING: 3, RULE: 1 }) },
      { text: '边玩边学，赢了开心输了也算经验', score: score({ TESTING: 1, EXIT: 1, AUTONOMY: 1 }) },
      { text: '我靠真心流，不靠战术流', score: score({ CLOSENESS: 1, TESTING: 0, SIGNAL: 0 }) },
      { text: '我会优先准备好退出键', score: score({ EXIT: 4, AUTONOMY: 2, SIGNAL: 1 }) },
    ],
  },
  {
    id: 29,
    model: 'strategy',
    question: '你平时读恋爱信号，最容易读成哪种风格？',
    options: [
      { text: '一句“晚点聊”我都能听出三层语气', score: score({ SIGNAL: 4, RUMINATION: 2, REASSURANCE: 1 }) },
      { text: '我会读，但尽量不靠脑补定案', score: score({ SIGNAL: 2, RULE: 1, RUMINATION: 0 }) },
      { text: '能听懂大概，细节不想卷', score: score({ SIGNAL: 1, AUTONOMY: 1, EXIT: 0 }) },
      { text: '我读不动，我看行动', score: score({ CONSISTENCY: 1, SIGNAL: 0, TESTING: 0 }) },
    ],
  },
  {
    id: 30,
    model: 'strategy',
    question: '当你感觉一段关系开始不对劲，你通常先启动什么？',
    options: [
      { text: '侦查模式：搜集信号，确认到底哪里变了', score: score({ SIGNAL: 3, TESTING: 2, RUMINATION: 1 }) },
      { text: '沟通模式：先把疑点摊开，不靠猜', score: score({ REPAIR: 2, EXPRESSION: 1, TESTING: 1 }) },
      { text: '缓冲模式：先拉开一点距离，给自己观察位', score: score({ EXIT: 2, AUTONOMY: 2, SIGNAL: 1 }) },
      { text: '撤退模式：不对味我就先下线', score: score({ EXIT: 4, AUTONOMY: 3 }) },
    ],
  },
];

export const QUESTIONS_BY_ID = Object.fromEntries(questions.map((question) => [question.id, question]));

export const TOTAL_QUESTIONS = questions.length;
