import type { LLMEnv } from '@tempo-sync/shared/types';
import OpenAI from 'openai';

import type { LLMPipeline, LLMProvider } from '../types';

export const getProviderModels = (env: LLMEnv) => {
  const providers: LLMProvider = {
    groq: {
      client: new OpenAI({
        apiKey: env.GROQ_API_KEY,
        baseURL: 'https://api.groq.com/openai/v1',
      }),
    },
    openrouter: {
      client: new OpenAI({
        apiKey: env.OPENROUTER_API_KEY,
        baseURL: 'https://openrouter.ai/api/v1',
      }),
    },
    gemini: {
      client: new OpenAI({
        apiKey: env.GEMINI_API_KEY,
        baseURL: 'https://gemini.api.google.com/v1',
      }),
    },
  };
  return providers;
};

export const llmPipeline: LLMPipeline = {
  processing: [
    { provider: 'gemini', model: 'gemini-2.0-flash' },

    { provider: 'groq', model: 'llama-3.3-70b-versatile' },
    {
      provider: 'openrouter',
      model: 'qwen/qwen3-coder:free',
    },
    { provider: 'groq', model: 'llama-4-maverick-17b-128e-instruct' },
  ],
  analysis: [
    { provider: 'openrouter', model: 'deepseek/deepseek-r1-0528:free' },
    { provider: 'gemini', model: 'gemini-2.5-pro-preview-05-06' },
    { provider: 'openrouter', model: 'xiaomi/mimo-v2-flash:free' },
    { provider: 'openrouter', model: 'tngtech/deepseek-r1t2-chimera:free' },
  ],
  formatting: [
    { provider: 'gemini', model: 'gemini-2.0-flash' },
    { provider: 'openrouter', model: 'google/gemma-3-27b-it:free' },
    { provider: 'openrouter', model: 'meta-llama/llama-3.3-70b-instruct:free' },
    { provider: 'groq', model: 'llama-3.3-70b-versatile' },
    { provider: 'openrouter', model: 'xiaomi/mimo-v2-flash:free' },
  ],
};
