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
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
      }),
    },
    cerebras: {
      client: new OpenAI({
        apiKey: env.CEREBRAS_API_KEY,
        baseURL: 'https://api.cerebras.ai/v1',
      }),
    },
    sambanova: {
      client: new OpenAI({
        apiKey: env.SAMBANOVA_API_KEY,
        baseURL: 'https://api.sambanova.ai/v1',
      }),
    },
  };
  return providers;
};

export const llmPipeline: LLMPipeline = {
  processing: [
    { provider: 'gemini', model: 'gemini-2.0-flash' },
    { provider: 'cerebras', model: 'llama-3.3-70b' },
    { provider: 'groq', model: 'llama-3.3-70b-versatile' },
    { provider: 'sambanova', model: 'Meta-Llama-3.3-70B-Instruct' },
    { provider: 'openrouter', model: 'qwen/qwen3-coder:free' },
  ],
  analysis: [
    { provider: 'openrouter', model: 'deepseek/deepseek-r1-0528:free' },
    { provider: 'gemini', model: 'gemini-2.5-pro-preview-05-06' },
    { provider: 'sambanova', model: 'DeepSeek-R1-0528' },
    { provider: 'cerebras', model: 'qwen-3-32b' },
    { provider: 'openrouter', model: 'xiaomi/mimo-v2-flash:free' },
    { provider: 'openrouter', model: 'tngtech/deepseek-r1t2-chimera:free' },
  ],
  formatting: [
    { provider: 'gemini', model: 'gemini-2.0-flash' },
    { provider: 'cerebras', model: 'llama-3.3-70b' },
    { provider: 'openrouter', model: 'google/gemma-3-27b-it:free' },
    { provider: 'groq', model: 'llama-3.3-70b-versatile' },
    { provider: 'openrouter', model: 'meta-llama/llama-3.3-70b-instruct:free' },
    { provider: 'openrouter', model: 'xiaomi/mimo-v2-flash:free' },
  ],
};
