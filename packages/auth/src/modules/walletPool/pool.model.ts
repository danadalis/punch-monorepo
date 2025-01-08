// UserSchema.ts

import { z } from 'zod';

export const PoolSchema = z.object({
  url: z.string(),
  env: z.string(),
});

// You can also create a type for this schema using Zod's .infer
export type Pool = z.infer<typeof PoolSchema>;
