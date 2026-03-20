import { ChatCompletionResponse, type LLMChatCompletionParams } from '../types';

function isApiError(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export const createChatCompletion = async ({
  llmProvider,
  provider,
  prompts,
  temp = 0.7,
  model,
}: LLMChatCompletionParams): Promise<string | null> => {
  try {
    const response = await provider.chat.completions.create({
      messages: [
        { content: prompts.system, role: 'system' },
        { content: prompts.user, role: 'user' },
      ],
      model,
      temperature: temp,
    });

    return response.choices[0].message.content?.trim() ?? '';
  } catch (error) {
    if (isApiError(error)) {
      if (error.status === 429) {
        console.warn(
          `Provider: ${llmProvider} - ${model} Rate limit exceeded... trying next provider if available.`
        );
        return ChatCompletionResponse.RATE_LIMITED;
      } else if (error.status === 413) {
        console.warn(
          `Provider: ${llmProvider} - ${model} Request payload too large... trying next provider if available.`
        );
        return ChatCompletionResponse.PAYLOAD_TOO_LARGE;
      } else if (error.status === 404) {
        console.error(
          `Provider: ${llmProvider} - ${model}   Model not found... trying next provider if available.`
        );
        return ChatCompletionResponse.MODEL_NOT_FOUND;
      } else if (error.status === 401 || error.status === 403) {
        console.error(
          `Provider: ${llmProvider} - ${model} Authentication failed... trying next provider if available.`
        );
        return ChatCompletionResponse.AUTH_FAILED;
      } else if (error.status >= 500) {
        console.error(
          `Provider: ${llmProvider} - ${model} Server error... trying next provider if available.`
        );
        return ChatCompletionResponse.SERVER_ERROR;
      }
      return '';
    }
    console.error('Error in createChatCompletion:', error);
    return null;
  }
};
