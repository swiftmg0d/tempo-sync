import { model, openai } from '@/config/llm';
import { PromptError } from '@/errors';

interface GeneretePromptProperties {
	systemPrompt: string;
	temperature?: number;
	userPrompt: string;
}

export const genereteChat = async ({ systemPrompt, temperature = 0.7, userPrompt }: GeneretePromptProperties) => {
	try {
		const response = await openai.chat.completions.create({
			messages: [
				{ content: systemPrompt, role: 'system' },
				{
					content: userPrompt,
					role: 'user',
				},
			],
			model,
			temperature,
		});
		return {
			result: response.choices[0].message.content?.trim() || '',
		};
	} catch (e) {
		console.error(e);

		throw new PromptError('Failed to generate prompt response!');
	}
};
