import { z } from 'zod';

export const EmiModelSchema = z.object({
  address: z.string(),
  walletId: z.string(),
  signatureId: z.string(),
  message: z.string(),
});




export type AssingEmi = z.infer<typeof EmiModelSchema>;
