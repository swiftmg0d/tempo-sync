import type { ChatCompletionResponse, LLMChatCompletionParams } from '../types';

function isApiError(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export const createChatCompletion = async ({
  provider,
  prompts,
  temp = 0.7,
  model,
}: LLMChatCompletionParams): Promise<ChatCompletionResponse> => {
  try {
    const response = await provider.chat.completions.create({
      messages: [
        { content: prompts.system, role: 'system' },
        { content: prompts.user, role: 'user' },
      ],
      model,
      temperature: temp,
    });

    return response.choices[0].message.content?.trim() || '';
  } catch (error) {
    if (isApiError(error)) {
      if (error.status === 429) {
        console.log(
          'Rate limit exceeded... trying next provider if available.'
        );
        return 'rate_limited';
      } else if (error.status == 413) {
        console.warn(
          'Request payload too large... trying next provider if available.'
        );
        return 'payload_too_large';
      }
    }
  }
  return null;
};
