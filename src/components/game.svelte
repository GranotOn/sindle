<script lang="ts">
	import { onMount } from 'svelte';

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

hey
