import type { GeneretePromptProperties, LLMPhase } from '../types';
import { getProviderModels, llmPipeline } from '../config';
import { createChatCompletion } from './chat';
import { promptsMap, type PromptKeys } from '../constants';
import { PromptError } from '@tempo-sync/shared/errors';

export const generetePrompt = async <T = string>({
  env,
  temperature = 0.7,
  data,
  prompt,
}: GeneretePromptProperties) => {
  const providers = getProviderModels(env);

  let previousResult = '';

  for (const round in llmPipeline) {
    const llms = llmPipeline[round as LLMPhase];

    for (const llm of llms) {
      const client = providers[llm.provider].client;

      const prompts = promptsMap[prompt as PromptKeys];

      const response = await createChatCompletion({
        provider: client,
        prompts: {
          system: prompts[round as LLMPhase].system,
          user: prompts[round as LLMPhase].user(previousResult || data),
        },
        temp: temperature,
        model: llm.model,
      });

      if (response === 'rate_limited' || response === 'payload_too_large') {
        continue;
      } else if (response === null) {
        throw new PromptError(
          500,
          'LLM provider failed to generate a response!'
        );
      }

      previousResult = response;
      break;
    }
  }

  try {
    return JSON.parse(previousResult) as T;
  } catch {
    return previousResult as T;
  }
};
