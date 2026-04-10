import { personalities } from '../data/personality.js';
import {
  DIMENSION_IDS,
  DIMENSIONS,
  EMPTY_SCORES,
  MODELS_BY_ID,
  PSYCHOLOGY_MODELS,
} from '../data/framework.js';
import { questions } from '../data/questions.js';

const createZeroScores = () => ({ ...EMPTY_SCORES });

const dimensionLimits = questions.reduce(
  (accumulator, question) => {
    DIMENSION_IDS.forEach((dimensionId) => {
      const values = question.options.map((option) => option.score[dimensionId] ?? 0);
      accumulator.min[dimensionId] += Math.min(...values);
      accumulator.max[dimensionId] += Math.max(...values);
    });

    return accumulator;
  },
  {
    min: createZeroScores(),
    max: createZeroScores(),
  },
);

const clampPercent = (value) => Math.max(0, Math.min(100, Math.round(value)));

const rankEntries = (entries) => [...entries].sort((left, right) => right.value - left.value);

const randomTypeFromAll = () => personalities[Math.floor(Math.random() * personalities.length)] ?? personalities[0];

const normalizePersonality = (personality) => {
  if (!personality) {
    return randomTypeFromAll();
  }

  if (personality.id === 'npc') {
    return {
      ...personality,
      code: 'NPC',
      name: '路人型',
    };
  }

  return personality;
};

const VECTOR_RANGES = {
  self: { min: 15, max: 55 },
  emotion: { min: 5, max: 70 },
  attitude: { min: 5, max: 70 },
  action: { min: 8, max: 70 },
  social: { min: 10, max: 50 },
};

const normalizeVectorValue = (key, value) => {
  const range = VECTOR_RANGES[key];

  if (!range || range.max === range.min) {
    return clampPercent(value);
  }

  return clampPercent(((value - range.min) / (range.max - range.min)) * 100);
};

export const getDimensionPercents = (scores) =>
  DIMENSION_IDS.reduce((result, dimensionId) => {
    const min = dimensionLimits.min[dimensionId];
    const max = dimensionLimits.max[dimensionId];
    const raw = scores[dimensionId] ?? 0;

    if (max === min) {
      result[dimensionId] = 50;
      return result;
    }

    result[dimensionId] = clampPercent(((raw - min) / (max - min)) * 100);
    return result;
  }, {});

export const getModelPercents = (dimensionPercents) =>
  PSYCHOLOGY_MODELS.reduce((result, model) => {
    const values = model.dimensions.map((dimensionId) => dimensionPercents[dimensionId] ?? 0);
    result[model.id] = clampPercent(values.reduce((sum, value) => sum + value, 0) / values.length);
    return result;
  }, {});

const average = (values) =>
  values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 50;

const getScoreValue = (source, key) => source[key] ?? 50;

const buildUserVector = (dimensionPercents, modelPercents) => {
  const rawVector = {
    self: average([
      getScoreValue(dimensionPercents, 'AUTONOMY'),
      getScoreValue(dimensionPercents, 'EXIT'),
      getScoreValue(dimensionPercents, 'CONTROL'),
      getScoreValue(modelPercents, 'boundary'),
      getScoreValue(modelPercents, 'strategy'),
    ]),
    emotion: average([
      getScoreValue(dimensionPercents, 'REACTIVITY'),
      getScoreValue(dimensionPercents, 'RUMINATION'),
      getScoreValue(dimensionPercents, 'EXPRESSION'),
      getScoreValue(modelPercents, 'emotion'),
    ]),
    attitude: average([
      getScoreValue(dimensionPercents, 'CLOSENESS'),
      getScoreValue(dimensionPercents, 'REASSURANCE'),
      getScoreValue(dimensionPercents, 'FUSION'),
      getScoreValue(modelPercents, 'bonding'),
      getScoreValue(dimensionPercents, 'RULE') * 0.7,
    ]),
    action: average([
      getScoreValue(dimensionPercents, 'INITIATIVE'),
      getScoreValue(dimensionPercents, 'CONSISTENCY'),
      getScoreValue(dimensionPercents, 'REPAIR'),
      getScoreValue(modelPercents, 'investment'),
      getScoreValue(dimensionPercents, 'CONTROL') * 0.6,
    ]),
    social: average([
      getScoreValue(dimensionPercents, 'CLOSENESS'),
      getScoreValue(dimensionPercents, 'EXPRESSION'),
      getScoreValue(dimensionPercents, 'SIGNAL'),
      getScoreValue(dimensionPercents, 'REPAIR'),
      getScoreValue(modelPercents, 'bonding') * 0.5,
      getScoreValue(modelPercents, 'emotion') * 0.5,
    ]),
  };

  return Object.fromEntries(
    Object.entries(rawVector).map(([key, value]) => [key, normalizeVectorValue(key, value)]),
  );
};

const getVectorDistance = (left, right) =>
  average(
    ['self', 'emotion', 'attitude', 'action', 'social'].map((key) =>
      Math.abs((left[key] ?? 50) - (right[key] ?? 50)),
    ),
  );

const getVectorDistinctiveness = (vector = {}) =>
  average(
    ['self', 'emotion', 'attitude', 'action', 'social'].map((key) =>
      Math.abs((vector[key] ?? 50) - 50),
    ),
  );

const scoreModelAffinity = (personality, modelPercents, rankedModels) => {
  let score = 0;

  if (personality.primaryModel) {
    score += (modelPercents[personality.primaryModel] ?? 50) * 0.18;
    if (rankedModels[0]?.id === personality.primaryModel) {
      score += 8;
    }
  }

  if (personality.secondaryModel) {
    score += (modelPercents[personality.secondaryModel] ?? 50) * 0.1;
    if (rankedModels.slice(0, 2).some((model) => model.id === personality.secondaryModel)) {
      score += 4;
    }
  }

  return score;
};

const getStableHash = (scores, personalityId) =>
  `${DIMENSION_IDS.map((dimensionId) => scores[dimensionId] ?? 0).join('|')}|${personalityId}`
    .split('')
    .reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) % 2147483647, 7);

const scorePersonality = (personality, userVector, modelPercents, rankedModels, scores) => {
  const vectorDistance = getVectorDistance(userVector, personality.vector ?? {});
  const vectorScore = 100 - vectorDistance;
  const modelScore = scoreModelAffinity(personality, modelPercents, rankedModels);
  const distinctivenessScore = getVectorDistinctiveness(personality.vector) * 0.08;
  const stableNoise = (getStableHash(scores, personality.id) % 1000) / 1000;

  return {
    vectorDistance,
    score: vectorScore + modelScore + distinctivenessScore + stableNoise,
  };
};

export const getResultType = (scores) => {
  const dimensionPercents = getDimensionPercents(scores);
  const modelPercents = getModelPercents(dimensionPercents);
  const userVector = buildUserVector(dimensionPercents, modelPercents);
  const rankedModels = rankEntries(
    Object.entries(modelPercents).map(([id, value]) => ({ id, value })),
  );

  const rankedPersonalities = personalities
    .map((personality, index) => ({
      personality,
      index,
      ...scorePersonality(personality, userVector, modelPercents, rankedModels, scores),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.index - right.index;
    });

  const bestMatch = rankedPersonalities[0];

  if (!bestMatch || !Number.isFinite(bestMatch.score)) {
    return randomTypeFromAll();
  }

  const runnerUp = rankedPersonalities[1];
  const hasClearWinner = !runnerUp || bestMatch.score - runnerUp.score >= 8;

  if (hasClearWinner) {
    return normalizePersonality(bestMatch.personality);
  }

  const candidatePool = rankedPersonalities
    .filter((entry) => bestMatch.score - entry.score <= 10)
    .slice(0, 12);

  const weightedPool = candidatePool.flatMap((entry, index) =>
    Array.from({ length: Math.max(1, 12 - index) }, () => entry.personality),
  );

  const choiceIndex = getStableHash(scores, 'tie-breaker') % weightedPool.length;
  return normalizePersonality(
    weightedPool[choiceIndex] ?? bestMatch.personality ?? randomTypeFromAll(),
  );
};

export const getFullResult = (scores) => {
  const dimensionPercents = getDimensionPercents(scores);
  const modelPercents = getModelPercents(dimensionPercents);
  const userVector = buildUserVector(dimensionPercents, modelPercents);
  const personality = getResultType(scores);

  const rankedDimensions = rankEntries(
    DIMENSIONS.map((dimension) => ({
      id: dimension.id,
      label: dimension.label,
      short: dimension.short,
      model: dimension.model,
      value: dimensionPercents[dimension.id],
    })),
  );

  const rankedModels = rankEntries(
    PSYCHOLOGY_MODELS.map((model) => ({
      ...model,
      value: modelPercents[model.id],
    })),
  );

  return {
    personality,
    userVector,
    dimensionPercents,
    modelPercents,
    topDimensions: rankedDimensions.slice(0, 3),
    lowDimensions: [...rankedDimensions].reverse().slice(0, 2),
    topModels: rankedModels.slice(0, 2),
    modelCards: rankedModels.map((model) => ({
      id: model.id,
      name: model.name,
      summary: model.summary,
      color: model.color,
      value: model.value,
      dimensions: model.dimensions.map((dimensionId) => ({
        ...DIMENSIONS.find((dimension) => dimension.id === dimensionId),
        value: dimensionPercents[dimensionId],
      })),
    })),
    explainers: [
      `30 道题先按题目 ID 把分数落到 15 个维度，不会因为随机顺序改变结论。`,
      `15 个维度会再汇总成 5 大心理模型，看你更偏向“靠近、控场、投入、情绪、策略”哪一类驱动。`,
      `最终结果不是抽卡，而是用维度画像去匹配 28 种人格原型中最接近的一型。`,
    ],
  };
};

export const createEmptyScores = () => ({ ...EMPTY_SCORES });

export const sumScores = (baseScores, optionScores) =>
  DIMENSION_IDS.reduce((result, dimensionId) => {
    result[dimensionId] = (baseScores[dimensionId] ?? 0) + (optionScores[dimensionId] ?? 0);
    return result;
  }, {});

export const getModelMeta = (modelId) => MODELS_BY_ID[modelId];
