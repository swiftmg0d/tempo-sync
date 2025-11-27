import { PromptKeys, promptsMap } from '@/config/llm/prompts';
import { genereteChat } from '@/config/llm/prompts/generate';
import { PromptError } from '@/errors';

export const generetePrompt = async <T = string>(json: unknown, key: PromptKeys) => {
	try {
		const { result } = await genereteChat({
			systemPrompt: promptsMap[key].systemPrompt,
			userPrompt: promptsMap[key].userPrompt(json),
		});

		try {
			return JSON.parse(result) as T;
		} catch {
			return result as T;
		}
	} catch (e) {
		console.error(e);
		throw new PromptError('Failed to generate prompt!');
	}
};
