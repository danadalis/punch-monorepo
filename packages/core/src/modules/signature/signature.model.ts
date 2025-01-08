import { z } from 'zod';

export const GenerateSignatureSchema = z.object({
  walletid: z.string(),
  message: z.string()
});

export const GetSignatureSchema = z.object({
    walletid: z.string(),
    signid: z.string()
  });



  export type GenerateSignature = z.infer<typeof GenerateSignatureSchema>;
  export type Signature = z.infer<typeof GetSignatureSchema>;
