import prisma from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import ss from 'string-similarity';
import { GuessSchema, type GuessSucessfullReturn } from './schemas';

const CLOSE_ENOUGH_THRESHOLD = 0.75;

export const GET: RequestHandler = async (event) => {
	// get params and validate
	const params = event.url.searchParams;
	const guess = {
		movie: params.get('movie'),
		guess: Number(params.get('guess'))
	};
	const validatedGuess = GuessSchema.safeParse(guess);
	if (!validatedGuess.success) {
		return new Response(JSON.stringify('Invalid params'), {
			status: 400
		});
	}

	const today = new Date();

	let todayMovie = await prisma.movie.findFirst({
		where: {
			lastPlayed: {
				gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
				lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
			}
		}
	});

	// first movie of the day, pick one
	if (!todayMovie) {
		const oldestMovie = await prisma.movie.findFirst({
			orderBy: {
				lastPlayed: 'asc'
			}
		});

		if (!oldestMovie) {
			return new Response(JSON.stringify('Database is empty.'), {
				status: 500
			});
		}

		await prisma.movie.update({
			where: {
				id: oldestMovie.id
			},
			data: {
				lastPlayed: new Date()
			}
		});

		await prisma.game.create({
			data: {
				movieId: oldestMovie.id
			}
		});

		todayMovie = oldestMovie;
	}

	const guessSimilarity = ss.compareTwoStrings(todayMovie.title, validatedGuess.data.movie);

	const guessReturn: GuessSucessfullReturn = {
		guessState: 'bad'
	};
	if (guessSimilarity > CLOSE_ENOUGH_THRESHOLD) {
		guessReturn.guessState = 'good';
		return new Response(JSON.stringify(guessReturn), {
			status: 200
		});
	}

	return new Response(JSON.stringify(guessReturn), {
		status: 200
	});
};
