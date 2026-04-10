export const PSYCHOLOGY_MODELS = [
  {
    id: 'bonding',
    name: '依恋启动系统',
    summary: '决定你会怎么靠近、怎么确认、怎么把“我们”想得越来越具体。',
    color: '#ff7a59',
    dimensions: ['CLOSENESS', 'REASSURANCE', 'FUSION'],
  },
  {
    id: 'boundary',
    name: '边界调度系统',
    summary: '决定你会不会拿节奏、立规矩、优先保护自己的空间感。',
    color: '#101010',
    dimensions: ['CONTROL', 'RULE', 'AUTONOMY'],
  },
  {
    id: 'investment',
    name: '投入续航系统',
    summary: '决定你会不会主动点火、持续供能，以及关系出问题后愿不愿意修。',
    color: '#ff4fa3',
    dimensions: ['INITIATIVE', 'CONSISTENCY', 'REPAIR'],
  },
  {
    id: 'emotion',
    name: '情绪波动系统',
    summary: '决定你被触发后上头有多快、脑补有多深、外放有多明显。',
    color: '#ffb703',
    dimensions: ['REACTIVITY', 'RUMINATION', 'EXPRESSION'],
  },
  {
    id: 'strategy',
    name: '策略博弈系统',
    summary: '决定你会不会解码信号、安排试探、提前给自己留退路。',
    color: '#4c7cff',
    dimensions: ['SIGNAL', 'TESTING', 'EXIT'],
  },
];

export const DIMENSIONS = [
  {
    id: 'CLOSENESS',
    label: '贴近需求',
    short: '想靠多近',
    model: 'bonding',
    description: '你需要多高频的陪伴、互动和存在感。',
  },
  {
    id: 'REASSURANCE',
    label: '确认饥渴',
    short: '要多少确认',
    model: 'bonding',
    description: '你有多需要对方反复证明“我还在”。',
  },
  {
    id: 'FUSION',
    label: '合体想象',
    short: '会不会自动双人化',
    model: 'bonding',
    description: '你会不会很快把两个人的生活想成同一个计划表。',
  },
  {
    id: 'CONTROL',
    label: '掌控驱动',
    short: '谁拿方向盘',
    model: 'boundary',
    description: '你会不会主动给关系定节奏、定流程、定方向。',
  },
  {
    id: 'RULE',
    label: '规则密度',
    short: '边界要多清楚',
    model: 'boundary',
    description: '你对原则、报备、秩序和边界有多在意。',
  },
  {
    id: 'AUTONOMY',
    label: '自主防御',
    short: '会不会先护住自己',
    model: 'boundary',
    description: '你在靠近关系时，有多强的自我保护和撤回倾向。',
  },
  {
    id: 'INITIATIVE',
    label: '主动点火',
    short: '会不会先冲',
    model: 'investment',
    description: '你会不会先联系、先安排、先把关系往前推。',
  },
  {
    id: 'CONSISTENCY',
    label: '持续供能',
    short: '能不能稳住输出',
    model: 'investment',
    description: '你的热情能不能从开场撑到中后段，不是三分钟热度。',
  },
  {
    id: 'REPAIR',
    label: '修复意愿',
    short: '吵完还修不修',
    model: 'investment',
    description: '关系出问题以后，你愿不愿意回来修、补、沟通。',
  },
  {
    id: 'REACTIVITY',
    label: '触发反应',
    short: '一点就炸吗',
    model: 'emotion',
    description: '你对延迟、冷淡、歧义等刺激的即时反应强度。',
  },
  {
    id: 'RUMINATION',
    label: '反刍脑补',
    short: '会不会越想越多',
    model: 'emotion',
    description: '你会不会反复回放细节，把一句话脑补成八集连续剧。',
  },
  {
    id: 'EXPRESSION',
    label: '外放表达',
    short: '上头会不会写脸上',
    model: 'emotion',
    description: '你的情绪会不会明显出现在语言、表情和行动里。',
  },
  {
    id: 'SIGNAL',
    label: '信号解码',
    short: '多会读空气',
    model: 'strategy',
    description: '你会不会快速捕捉语气、节奏和细节里的隐藏信号。',
  },
  {
    id: 'TESTING',
    label: '试探倾向',
    short: '会不会偷偷出题',
    model: 'strategy',
    description: '你会不会设计小测试来确认对方到底有没有心。',
  },
  {
    id: 'EXIT',
    label: '退场预案',
    short: '有没有逃生门',
    model: 'strategy',
    description: '你会不会提前给自己留后手、留撤退路线、留体面。',
  },
];

export const DIMENSION_IDS = DIMENSIONS.map((dimension) => dimension.id);

export const EMPTY_SCORES = DIMENSION_IDS.reduce((accumulator, id) => {
  accumulator[id] = 0;
  return accumulator;
}, {});

export const MODELS_BY_ID = Object.fromEntries(
  PSYCHOLOGY_MODELS.map((model) => [model.id, model]),
);

export const DIMENSIONS_BY_ID = Object.fromEntries(
  DIMENSIONS.map((dimension) => [dimension.id, dimension]),
);
