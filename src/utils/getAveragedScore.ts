import type { AdvancedScore } from "../schema/reviews.schema.ts";

const getAveragedScore = (advancedScore: AdvancedScore) => {
  const allValues = Object.values(advancedScore);
  const sum = allValues.reduce((prev, curr) => prev + curr, 0);

  return sum / allValues.length;
};

export default getAveragedScore;
