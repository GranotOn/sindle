<script lang="ts">
	import { onMount } from 'svelte';
	import Input from './Input.svelte';
	import GuessRow from './GuessRow.svelte';
	import ColorMap from './ColorMap.svelte';

	type GameStore = {
		history: {
			id: string | number;
			date: string;
			won: boolean;
			guesses: string[];
		};
	};

	onMount(async () => {
		const data = await (await fetch('/guess?movie=The%20Matrix&guess=1')).json();
		console.log(data);
	});
	// const gameStore: GameStore = JSON.parse(window.localStorage.getItem('store') || '{}');
</script>

<div class="absolute left-4">
	<ColorMap />
</div>

<section class="flex flex-col items-center">
	<Input />
	<GuessRow />
</section>
