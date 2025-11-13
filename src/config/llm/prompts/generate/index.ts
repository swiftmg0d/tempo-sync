import { model, openai } from '@/config/llm';
import { PromptError } from '@/errors';

interface GeneretePromptProperties {
  systemPrompt: string;
  userPrompt: string;
}

export const generatePrompt = async ({
  systemPrompt,
  userPrompt,
}: GeneretePromptProperties) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { content: systemPrompt, role: 'system' },
        {
          content: userPrompt,
          role: 'user',
        },
      ],
      model: model,
    });
    return {
      result: response.choices[0].message.content?.trim() || '',
    };
  } catch (e) {
    console.error(e);

    throw new PromptError('Failed to generate prompt response!');
  }
};
