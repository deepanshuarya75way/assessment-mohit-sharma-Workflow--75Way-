import Groq from 'groq-sdk';
import environment from '../config/environment.js';

const groq = new Groq({
  apiKey: environment.groqApiKey || 'dummy_api_key_for_build_validation',
});

// Takes conversation messages + user context, returns an AI-generated reply
export async function generateCopilotResponse(messages, userContext) {
  const systemPrompt = {
    role: 'system',
    content: `You are an expert HR Copilot assistant for WorkFlow HRMS. You help employees with HR-related questions.
User details:
- Name: ${userContext?.name || 'Employee'}
- Role: ${userContext?.role || 'Employee'}
- Department: ${userContext?.department || 'N/A'}
- Designation: ${userContext?.designation || 'N/A'}

Key company policies:
- Leave: Casual Leave 12 days, Sick Leave 10 days, Earned Leave 15 days per year
- Attendance: Office hours 9 AM to 6 PM, grace period 15 minutes
- Salary: Paid on last working day of each month
- Expenses: Submit within 30 days with receipt attached
- Work from home: 2 days per week with manager approval
- Performance reviews: Quarterly and Annual

Keep responses concise, friendly and helpful. Use bullet points where appropriate. Answer only HR-related questions.`,
  };

  const chatCompletion = await groq.chat.completions.create({
    model: 'qwen/qwen3.8-27b',
    max_tokens: 1024,
    messages: [systemPrompt, ...messages],
  });

  return chatCompletion.choices[0]?.message?.content || 'Sorry, I could not process your request.';
}
