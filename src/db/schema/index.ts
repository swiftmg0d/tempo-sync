import { athlete } from '@/db/schema/athlete.table';
import { token } from '@/db/schema/token.table';

type TokenType = typeof token.$inferInsert;

export { athlete, token, TokenType };
