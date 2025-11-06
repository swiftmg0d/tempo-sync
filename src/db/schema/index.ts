import { athlete } from '@/db/schema/athlete.table';
import { token } from '@/db/schema/token.table';

type TokenInsertType = typeof token.$inferInsert;
type TokenSelectType = typeof token.$inferSelect;

export { athlete, token, TokenInsertType, TokenSelectType };
