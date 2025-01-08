// UserSchema.ts

import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string(),
  phoneNumber: z.string(),
});

export const OTPQuerySchema = z.object({
    phoneNumber: z.string(),
})

export const OTPResultSchema = z.object({
    phoneNumber: z.string(),
    code: z.string(),
})


// You can also create a type for this schema using Zod's .infer
export type User = z.infer<typeof UserSchema>;
export type OTPQuery = z.infer<typeof OTPQuerySchema>;
export type OTPResult = z.infer<typeof OTPResultSchema>;
