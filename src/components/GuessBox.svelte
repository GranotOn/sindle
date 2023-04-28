<script lang="ts">
	import clsx from 'clsx';
	export let similarity: 'wrong' | 'close' | 'correct';

	const getColorsFromSimilarity: () => string = () => {
		if (similarity === 'wrong') return 'bg-neutral-content text-neutral';
		if (similarity === 'close') return 'bg-accent text-accent-content';
		return 'bg-primary text-primary-content animate-glow relative';
	};

	const computedClass: string = clsx(
		getColorsFromSimilarity(),
		'px-16 py-10',
		'shadow-xl',
		'rounded-lg',
		'font-semibold'
	);
</script>

<div class={`${computedClass}`}>
	<slot />
</div>

<style>
	.animate-glow {
		box-shadow: 0 0 5px 1px rgba(0, 255, 0, 1);
		animation: glow-animation 5s ease-in infinite;
	}
	@keyframes glow-animation {
		0%,
		100% {
			box-shadow: 0 0 5px 1px rgba(0, 255, 0, 1);
		}
		50% {
			box-shadow: 0 0 10px 1px rgba(0, 255, 0, 1);
		}
	}
</style>
