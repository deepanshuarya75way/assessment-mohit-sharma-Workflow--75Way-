import { generateCopilotResponse } from '../services/ai.service.js';

// POST /api/copilot — handles chat messages for the HR copilot
export async function handleCopilotChat(req, res, next) {
  try {
    const { messages, userContext } = req.body;
    const reply = await generateCopilotResponse(messages, userContext);

    res.json({ reply });
  } catch (error) {
    next(error);
  }
}
