import { env } from 'cloudflare:workers';

export const verifyTurnstile = async (token: string, ip?: string): Promise<boolean> => {
	const body = new URLSearchParams();
	body.append('secret', env.TURNSTILE_SECRET);
	body.append('response', token);

	if (ip) {
		body.append('remoteip', ip);
	}

	try {
		const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			body: body.toString(),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			method: 'POST',
		});
		const data = await res.json();

		return (data as { success: boolean }).success;
	} catch (e) {
		console.error('Turnstile verification error:', e);
		return false;
	}
};
