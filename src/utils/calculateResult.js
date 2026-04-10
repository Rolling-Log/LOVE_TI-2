import { personalities } from '../data/personality.js';
import {
  DIMENSION_IDS,
  DIMENSIONS,
  EMPTY_SCORES,
  MODELS_BY_ID,
  PSYCHOLOGY_MODELS,
} from '../data/framework.js';
import { questions } from '../data/questions.js';

const HIGH_THRESHOLD = 62;
const LOW_THRESHOLD = 38;

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

const bandScore = (value, target) => {
  if (target === 'high') {
    return value >= HIGH_THRESHOLD ? 14 + (value - HIGH_THRESHOLD) * 0.2 : -18;
  }

  if (target === 'low') {
    return value <= LOW_THRESHOLD ? 14 + (LOW_THRESHOLD - value) * 0.2 : -18;
  }

  return Math.max(0, 16 - Math.abs(value - 50) * 0.4);
};

const scoreList = (dimensionIds = [], dimensionPercents, target) =>
  dimensionIds.reduce((sum, dimensionId) => sum + bandScore(dimensionPercents[dimensionId] ?? 50, target), 0);

const weightedPreference = (dimensionIds = [], dimensionPercents, target) =>
  dimensionIds.reduce((sum, dimensionId) => {
    const value = dimensionPercents[dimensionId] ?? 50;

    if (target === 'high') {
      return sum + value * 0.14;
    }

    if (target === 'low') {
      return sum + (100 - value) * 0.14;
    }

    return sum + Math.max(0, 16 - Math.abs(value - 50) * 0.32);
  }, 0);

const penaltyList = (dimensionIds = [], dimensionPercents, target) =>
  dimensionIds.reduce((sum, dimensionId) => {
    const value = dimensionPercents[dimensionId] ?? 50;

    if (target === 'high' && value > 70) {
      return sum - (value - 70) * 0.8;
    }

    if (target === 'low' && value < 30) {
      return sum - (30 - value) * 0.8;
    }

    return sum;
  }, 0);

const scoreModelAffinity = (personality, modelPercents, rankedModels) => {
  let score = 0;

  if (personality.primaryModel) {
    score += (modelPercents[personality.primaryModel] ?? 0) * 0.56;
    if (rankedModels[0]?.id === personality.primaryModel) {
      score += 18;
    }
  }

  if (personality.secondaryModel) {
    score += (modelPercents[personality.secondaryModel] ?? 0) * 0.3;
    if (rankedModels.slice(0, 2).some((model) => model.id === personality.secondaryModel)) {
      score += 10;
    }
  }

  if (personality.lowModel) {
    score += (100 - (modelPercents[personality.lowModel] ?? 0)) * 0.28;
  }

  return score;
};

const scorePersonality = (personality, dimensionPercents, modelPercents, rankedModels) => {
  let total = personality.priority ?? 0;

  total += scoreModelAffinity(personality, modelPercents, rankedModels);
  total += scoreList(personality.requiredHighDims, dimensionPercents, 'high');
  total += scoreList(personality.requiredLowDims, dimensionPercents, 'low');
  total += weightedPreference(personality.preferredHighDims, dimensionPercents, 'high');
  total += weightedPreference(personality.preferredLowDims, dimensionPercents, 'low');
  total += weightedPreference(personality.preferredMidDims, dimensionPercents, 'mid');
  total += penaltyList(personality.avoidHighDims, dimensionPercents, 'high');
  total += penaltyList(personality.avoidLowDims, dimensionPercents, 'low');

  return total;
};

export const getResultType = (scores) => {
  const dimensionPercents = getDimensionPercents(scores);
  const modelPercents = getModelPercents(dimensionPercents);
  const rankedModels = rankEntries(
    Object.entries(modelPercents).map(([id, value]) => ({ id, value })),
  );

  const rankedPersonalities = personalities
    .map((personality, index) => ({
      personality,
      index,
      score: scorePersonality(personality, dimensionPercents, modelPercents, rankedModels),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.index - right.index;
    });

  return rankedPersonalities[0]?.personality ?? personalities[0];
};

export const getFullResult = (scores) => {
  const dimensionPercents = getDimensionPercents(scores);
  const modelPercents = getModelPercents(dimensionPercents);
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
