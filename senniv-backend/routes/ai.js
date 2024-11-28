const express = require('express');
const auth = require('../middleware/auth');
const OpenAI = require('openai');
const { generateGenericBusinessPlanPrompt, updateStepPrompt } = require('../utils/promptTemplates');

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate steps based on user prompt
router.post('/define-steps', auth, async (req, res) => {
  const { prompt } = req.body;
  const userId = req.user.id;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const trainedPrompt = generateGenericBusinessPlanPrompt(prompt);

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a business plan assistant.' },
        { role: 'user', content: trainedPrompt },
      ],
    });

    const output = response.choices[0]?.message?.content.trim();
    if (!output) {
      throw new Error('AI response was empty.');
    }

    res.json({ steps: [{ id: 1, title: 'Business Plan', content: output }] });
  } catch (error) {
    console.error('Error in /define-steps:', error.message);
    res.status(500).json({ error: 'Error generating steps.' });
  }
});

// Update a specific step
router.post('/update-step', auth, async (req, res) => {
  const { stepId, prompt } = req.body;
  const userId = req.user.id;

  if (!stepId || !prompt) {
    return res.status(400).json({ error: 'Step ID and prompt are required.' });
  }

  try {
    const currentStep = sessionData[userId]?.steps.find((s) => s.id === stepId)?.content;
    if (!currentStep) {
      return res.status(404).json({ error: 'Step not found.' });
    }

    const trainedPrompt = updateStepPrompt(currentStep, prompt);

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a business plan assistant.' },
        { role: 'user', content: trainedPrompt },
      ],
    });

    const updatedContent = response.choices[0]?.message?.content.trim();
    if (!updatedContent) {
      throw new Error('AI response was empty.');
    }

    sessionData[userId].steps = sessionData[userId].steps.map((step) =>
      step.id === stepId ? { ...step, content: updatedContent } : step
    );

    res.json({ step: { id: stepId, content: updatedContent } });
  } catch (error) {
    console.error('Error in /update-step:', error.message);
    res.status(500).json({ error: 'Error updating step.' });
  }
});

module.exports = router;
