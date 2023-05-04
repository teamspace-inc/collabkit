import { z } from 'zod';

export const Message = z.discriminatedUnion('type', [
  z.object({ type: z.literal('eval'), id: z.string(), code: z.string() }),
  z.object({ type: z.literal('token'), id: z.string(), token: z.string() }),
  z.object({ type: z.literal('answer'), id: z.string(), answer: z.string() }),
  z.object({ type: z.literal('error'), error: z.string() }),
  z.object({
    type: z.literal('evalSuccess'),
    id: z.string(),
    result: z.string(),
  }),
  z.object({ type: z.literal('evalError'), id: z.string(), error: z.string() }),
  z.object({
    type: z.literal('question'),
    id: z.string(),
    question: z.string(),
  }),
]);

export type RemoteEvalResult =
  | {
      type: 'evalSuccess';
      id: string;
      result: string;
    }
  | {
      type: 'evalError';
      id: string;
      error: string;
    };

export type Message = z.infer<typeof Message>;
