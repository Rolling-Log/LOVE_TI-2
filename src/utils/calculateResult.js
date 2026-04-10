import { personalities } from '../data/personality.js';
import { DIMENSIONS, EMPTY_SCORES, questions } from '../data/questions.js';

const LOW_THRESHOLD = 33;
const HIGH_THRESHOLD = 67;

const createZeroScores = () => ({ ...EMPTY_SCORES });

const dimensionLimits = questions.reduce(
  (accumulator, question) => {
    DIMENSIONS.forEach((dimension) => {
      const values = question.options.map((option) => option.score[dimension] ?? 0);
      accumulator.min[dimension] += Math.min(...values);
      accumulator.max[dimension] += Math.max(...values);
    });

    return accumulator;
  },
  {
    min: createZeroScores(),
    max: createZeroScores(),
  },
);

const clampPercent = (value) => Math.max(0, Math.min(100, Math.round(value)));

const getBand = (percent) => {
  if (percent <= LOW_THRESHOLD) {
    return 'low';
  }

  if (percent >= HIGH_THRESHOLD) {
    return 'high';
  }

  return 'mid';
};

const matchesBandList = (dimensions = [], targetBand, bands) =>
  dimensions.every((dimension) => bands[dimension] === targetBand);

const countPreferredMatches = (matcher, bands) => {
  const preferredHigh = (matcher.preferredHigh ?? []).filter(
    (dimension) => bands[dimension] === 'high',
  ).length;
  const preferredLow = (matcher.preferredLow ?? []).filter(
    (dimension) => bands[dimension] === 'low',
  ).length;

  return preferredHigh + preferredLow;
};

const getHighestRelevantPercent = (matcher, percents) => {
  const dimensions = [
    ...(matcher.requiredHigh ?? []),
    ...(matcher.preferredHigh ?? []),
    ...(matcher.requiredLow ?? []),
    ...(matcher.preferredLow ?? []),
  ];

  if (dimensions.length === 0) {
    return Math.max(...Object.values(percents));
  }

  return Math.max(
    ...dimensions.map((dimension) => {
      const prefersLow =
        (matcher.requiredLow ?? []).includes(dimension) || (matcher.preferredLow ?? []).includes(dimension);

      return prefersLow ? 100 - percents[dimension] : percents[dimension];
    }),
  );
};

const isNpcScenario = (percents, bands) => {
  const values = Object.values(percents);
  const spread = Math.max(...values) - Math.min(...values);
  const highCount = Object.values(bands).filter((band) => band === 'high').length;
  const lowCount = Object.values(bands).filter((band) => band === 'low').length;

  return spread < 14 || (highCount === 0 && lowCount === 0);
};

const getNpcPersonality = () => personalities.find((personality) => personality.code === 'NPC');

export const getDimensionPercents = (scores) =>
  DIMENSIONS.reduce((result, dimension) => {
    const min = dimensionLimits.min[dimension];
    const max = dimensionLimits.max[dimension];
    const raw = scores[dimension] ?? 0;

    if (max === min) {
      result[dimension] = 50;
      return result;
    }

    result[dimension] = clampPercent(((raw - min) / (max - min)) * 100);
    return result;
  }, {});

export const getResultType = (scores) => {
  const percents = getDimensionPercents(scores);
  const bands = DIMENSIONS.reduce((result, dimension) => {
    result[dimension] = getBand(percents[dimension]);
    return result;
  }, {});

  if (isNpcScenario(percents, bands)) {
    return getNpcPersonality();
  }

  const candidates = personalities
    .map((personality, index) => ({
      personality,
      index,
      matcher: personality.matcher ?? {},
    }))
    .filter(({ personality }) => personality.code !== 'NPC')
    .filter(({ matcher }) => {
      const requiredHighMatched = matchesBandList(matcher.requiredHigh, 'high', bands);
      const requiredLowMatched = matchesBandList(matcher.requiredLow, 'low', bands);
      return requiredHighMatched && requiredLowMatched;
    })
    .map((entry) => ({
      ...entry,
      preferredScore: countPreferredMatches(entry.matcher, bands),
      highestPercent: getHighestRelevantPercent(entry.matcher, percents),
    }));

  if (candidates.length === 0) {
    return getNpcPersonality();
  }

  candidates.sort((left, right) => {
    const priorityDelta = (right.matcher.priority ?? 0) - (left.matcher.priority ?? 0);
    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    const preferredDelta = right.preferredScore - left.preferredScore;
    if (preferredDelta !== 0) {
      return preferredDelta;
    }

    const percentDelta = right.highestPercent - left.highestPercent;
    if (percentDelta !== 0) {
      return percentDelta;
    }

    return left.index - right.index;
  });

  return candidates[0].personality;
};
