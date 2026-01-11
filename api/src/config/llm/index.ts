import OpenAI from 'openai';

import { GEMINI_API_KEY, GROQ_API_KEY } from '../env';

const models = {
	google: {
		'flash-2': 'gemini-2.0-flash',
		'flash-2-lite': 'gemini-2.0-flash-lite',
	},
	groq: {
		'kimi-k2': 'moonshotai/kimi-k2-instruct',
		'llama-3.1': 'llama-3.1-8b-instant',
		'llama-3.3': 'llama-3.3-70b-versatile',
		'llama-4': 'meta-llama/llama-4-scout-17b-16e-instruct',
		qwen3: 'qwen/qwen3-32b',
	},
};

export const providers = {
	google: {
		client: new OpenAI({
			apiKey: GEMINI_API_KEY,
			baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
		}),
		models: [models.google['flash-2'], models.google['flash-2-lite']],
	},
	groq: {
		client: new OpenAI({
			apiKey: GROQ_API_KEY,
			baseURL: 'https://api.groq.com/openai/v1',
		}),
		models: [models.groq['llama-4'], models.groq['llama-3.1'], models.groq['llama-3.3']],
	},
};

export const fallbackOrder: { model: string; provider: 'google' | 'groq' }[] = [
	// { provider: 'groq', model: models.groq['llama-4'] },
	// { provider: 'groq', model: models.groq['llama-3.1'] },
	// { provider: 'gemini', model: models.gemini['flash-2'] },
	// { provider: 'groq', model: models.groq['llama-3.3'] },
	{ model: models.google['flash-2-lite'], provider: 'google' },
	{ model: models.groq['kimi-k2'], provider: 'groq' },
	{ model: models.groq['llama-3.3'], provider: 'groq' },
	{ model: models.groq.qwen3, provider: 'groq' },
];
