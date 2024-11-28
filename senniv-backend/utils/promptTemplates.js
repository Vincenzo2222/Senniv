const generateGenericBusinessPlanPrompt = (userPrompt) => `
  You are an AI assistant specialized in creating business plans.
  Based on the following input: "${userPrompt}",
  create a complete and detailed business plan. Include:
  - Sections like market research, marketing strategy, budget planning, and execution steps.
  - Detailed steps for each section with descriptions, required resources, and objectives.
`;

const updateStepPrompt = (currentStep, userPrompt) => `
  The user wants to update the following step:
  "${currentStep}"
  Based on this new input: "${userPrompt}",
  rewrite and enhance the step with additional details and suggestions.
`;

module.exports = { generateGenericBusinessPlanPrompt, updateStepPrompt };
