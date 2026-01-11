import { fallbackOrder, providers } from '@/config/llm';
import { PromptError } from '@/errors';

interface GeneretePromptProperties {
	systemPrompt: string;
	temperature?: number;
	userPrompt: string;
}

function isApiError(error: unknown): error is { status: number } {
	return typeof error === 'object' && error !== null && 'status' in error;
}

export const genereteChat = async ({ systemPrompt, temperature = 0.7, userPrompt }: GeneretePromptProperties) => {
	for (const { model, provider } of fallbackOrder) {
		try {
			const response = await providers[provider].client.chat.completions.create({
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
		} catch (e: unknown) {
			if (isApiError(e)) {
				if (e.status === 429) {
					console.log(`Rate limited on ${provider}/${model}, trying next...`);
					continue;
				} else if (e.status === 413) {
					console.log(`Requst to large on ${provider}/${model}, trying next...`);
					continue;
				}
			}
			throw e;
		}
	}

	throw new PromptError('Failed to generate prompt response from any provider!');
};
