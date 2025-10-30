import { db } from '@/db';
import { token, TokenType } from '@/db/schema';
import { encrypt } from '@/utils/crypt.utils';

export const saveToken = async (tokenData: TokenType) => {
  const { athleteId, expiresAt, provider, type, value } = tokenData;

  await db.insert(token).values({
    athleteId: athleteId,
    expiresAt: expiresAt,
    provider: provider,
    type: type,
    value: encrypt(value),
  });
};
