<script>
	import GuessBox from './GuessBox.svelte';
</script>

<div class="flex flex-row gap-2">
	<GuessBox similarity="correct">hey</GuessBox>
	<GuessBox similarity="close">hey</GuessBox>
	<GuessBox similarity="wrong">hey</GuessBox>
	<GuessBox similarity="wrong">hey</GuessBox>
	<GuessBox similarity="correct">hey</GuessBox>
</div>
