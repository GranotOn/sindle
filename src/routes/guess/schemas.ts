import { z } from 'zod';

export const GuessSchema = z.object({
	movie: z.string().min(1),
	guess: z.number().min(1).max(5)
});

export const GuessSucessfullReturnSchema = z.object({
	guessState: z.literal('good').or(z.literal('bad'))
});

export type GuessSucessfullReturn = z.infer<typeof GuessSucessfullReturnSchema>;
