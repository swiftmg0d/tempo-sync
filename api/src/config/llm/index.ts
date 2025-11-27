import OpenAI from 'openai';

import { GEMINI_API_KEY } from '../env';

const openai = new OpenAI({
	apiKey: GEMINI_API_KEY,
	baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

const model = 'gemini-2.5-flash';

export { model, openai };
