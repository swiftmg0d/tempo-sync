import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { token, TokenInsertType } from '@/db/schema';
import { DatabaseError } from '@/errors';
import { TokenResponse } from '@/types/auth.type';
import { encrypt } from '@/utils/crypt.utils';
import { incrementDateBySeconds } from '@/utils/date.utils';

import { refreshAccessToken } from './token.api';

export const saveToken = async (tokenData: TokenInsertType) => {
	try {
		const { athleteId, expiresAt, provider, type, value } = tokenData;

		await db.insert(token).values({
			athleteId: athleteId,
			expiresAt: expiresAt,
			provider: provider,
			type: type,
			value: encrypt(value),
		});
		return {
			message: 'Successfully saved the token!',
			success: true,
		};
	} catch (e) {
		console.error(e);
		throw new DatabaseError('Failed to save token');
	}
};

export const updateTokenById = async (data: { expiresAt: Date | null; id: number; value: string }) => {
	try {
		const { expiresAt, id, value } = data;

		await db
			.update(token)
			.set({
				expiresAt,
				value,
			})
			.where(eq(token.id, id));
		return {
			message: 'Successfully updated the token!',
			success: true,
		};
	} catch (e) {
		console.error(e);
		throw new DatabaseError('Failed to update the token!');
	}
};

export const findTokensByProvider = async (provider: 'spotify' | 'strava') => {
	try {
		const tokens = await db
			.select()
			.from(token)
			.where(and(eq(token.provider, provider)));

		return tokens;
	} catch (e) {
		console.error(e);
		throw new DatabaseError('Failed to retrieve tokens by provider');
	}
};

export const verifyToken = async (tokenType: 'spotify' | 'strava') => {
	const tokens = await findTokensByProvider(tokenType);

	const accesshToken = tokens.find((token) => token.type === 'access');
	const refreshToken = tokens.find((token) => token.type === 'refresh');

	if (accesshToken?.expiresAt != null && refreshToken?.value) {
		if (accesshToken.expiresAt < new Date()) {
			const result = await refreshAccessToken(tokenType, refreshToken.value);

			const { access_token, expires_in, refresh_token } = result as TokenResponse;

			updateTokenById({
				...accesshToken,
				expiresAt: incrementDateBySeconds(expires_in),
				value: encrypt(access_token),
			});

			if (refresh_token) {
				updateTokenById({
					...refreshToken,
					value: encrypt(refresh_token),
				});
			}

			return {
				message: 'Tokens succesfully verified!',
				result: encrypt(access_token),
				success: true,
			};
		}
		return {
			message: 'Token already verified!',
			result: accesshToken.value,
			success: true,
		};
	}

	throw new DatabaseError('Failed to verify token - missing access or refresh token');
};
