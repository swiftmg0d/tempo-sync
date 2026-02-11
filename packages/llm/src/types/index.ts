import type { LLMEnv } from '@tempo-sync/shared/types';
import type OpenAI from 'openai';

import type { PromptKeys } from '../constants';

export type GroqModel =
  | 'llama-3.3-70b-versatile'
  | 'llama-4-maverick-17b-128e-instruct'
  | 'llama-3.1-405b-reasoning';

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

export type Providers = 'groq' | 'openrouter' | 'cerebras' | 'sambanova';

export type LLMModel =
  | { provider: 'groq'; model: GroqModel }
  | { provider: 'openrouter'; model: OpenRouterModel }
  | { provider: 'cerebras'; model: CerebrasModel }
  | { provider: 'sambanova'; model: SambanovaModel };

export type LLMPhase = 'processing' | 'analysis' | 'formatting';

export type LLMPipeline = Record<LLMPhase, LLMModel[]>;

export type LLMProvider = Record<
  Providers,
  {
    client: OpenAI;
  }
>;

export interface LLMChatCompletionParams {
  llmProvider: Providers;
  provider: OpenAI;
  prompts: {
    system: string;
    user: string;
  };
  temp?: number;
  model: LLMModel['model'];
}

export const ChatCompletionResponse = {
  RATE_LIMITED: 'rate_limited',
  PAYLOAD_TOO_LARGE: 'payload_too_large',
  SERVER_ERROR: 'server_error',
  MODEL_NOT_FOUND: 'model_not_found',
  AUTH_FAILED: 'auth_failed',
} as const;

export type ChatCompletionResponseType =
  (typeof ChatCompletionResponse)[keyof typeof ChatCompletionResponse];

export interface GeneretePromptProperties {
  env: LLMEnv;
  temperature?: number;
  data: unknown;
  prompt: PromptKeys;
}
