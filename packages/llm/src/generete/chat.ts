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
        console.warn('Rate limit exceeded... trying next provider if available.');
        return 'rate_limited';
      } else if (error.status === 413) {
        console.warn('Request payload too large... trying next provider if available.');
        return 'payload_too_large';
      } else if (error.status === 404) {
        console.error('Model not found... trying next provider if available.');
        return 'model_not_found';
      } else if (error.status === 401 || error.status === 403) {
        console.error('Authentication failed... trying next provider if available.');
        return 'auth_failed';
      } else if (error.status >= 500) {
        console.error('Server error... trying next provider if available.');
        return 'server_error';
      }
      return '';
    }
    console.error('Error in createChatCompletion:', error);
    return null;
  }
};
