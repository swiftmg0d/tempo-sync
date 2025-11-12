import { string, ZodError } from 'zod';

import * as env from '@/config/env';

const schema = string().min(1, 'This field is required!');

for (const [key, value] of Object.entries(env)) {
  try {
    schema.parse(value);
  } catch (e) {
    if (e instanceof ZodError) {
      console.log('⚙️  Errors from env variables:');
      for (const issue of e.issues) {
        const variableName = key;
        const message = issue.message;
        console.error(`${variableName}: ${message}`);
      }
    }
    process.exit(1);
  }
}
console.log('✅ Environment variables succesfully verified!');
