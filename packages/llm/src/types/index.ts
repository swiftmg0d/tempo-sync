import type { LLMEnv } from '@tempo-sync/shared/types';
import type OpenAI from 'openai';

import type { PromptKeys } from '../constants';

export type GroqModel = 'llama-3.3-70b-versatile' | 'llama-4-maverick-17b-128e-instruct';

export type OpenRouterModel =
  | 'qwen/qwen3-coder:free'
  | 'deepseek/deepseek-r1-0528:free'
  | 'xiaomi/mimo-v2-flash:free'
  | 'tngtech/deepseek-r1t2-chimera:free'
  | 'google/gemma-3-27b-it:free'
  | 'meta-llama/llama-3.3-70b-instruct:free'
  | 'arcee-ai/arcee-trinity-large-preview:free'
  | 'deepseek/deepseek-chat-v3-0324:free';

export type CerebrasModel = 'llama-3.3-70b' | 'qwen-3-32b';

export type SambanovaModel = 'Meta-Llama-3.3-70B-Instruct' | 'DeepSeek-R1-0528';

export type LLMModel =
  | { provider: 'groq'; model: GroqModel }
  | { provider: 'openrouter'; model: OpenRouterModel }
  | { provider: 'cerebras'; model: CerebrasModel }
  | { provider: 'sambanova'; model: SambanovaModel };

export type LLMPhase = 'processing' | 'analysis' | 'formatting';

export type LLMPipeline = Record<LLMPhase, LLMModel[]>;

export type LLMProvider = Record<
  'groq' | 'openrouter' | 'gemini' | 'cerebras' | 'sambanova',
  {
    client: OpenAI;
  }
>;

export interface LLMChatCompletionParams {
  provider: OpenAI;
  prompts: {
    system: string;
    user: string;
  };
  temp?: number;
  model: LLMModel['model'];
}

export type ChatCompletionResponse = 'rate_limited' | 'payload_too_large' | string | null;

export interface GeneretePromptProperties {
  env: LLMEnv;
  temperature?: number;
  data: unknown;
  prompt: PromptKeys;
}
