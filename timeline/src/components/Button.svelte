<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function click() {
		dispatch('click');
	}

	let palceholder = 'Button';
	let disabled = false;
	
</script>

<button class="button">
	{#if disabled}
		{palceholder}
	{:else}
		<slot />
	{/if}
</button>

<style>
	:root {
		--button-color: var(--color-theme-1);
		--button-background: transparent;
		--button-border: var(--button-color);

		--button-hover-color: #ffffff;
		--button-hover-background: var(--button-color);

		--button-active-background: var(--color-theme-1-light);
		
		--button-disabled-color: #0000004d;
		--button-disabled-background: #0000001a;
		--button-disabled-border: var(--button-disabled-background);
	}

	.button {
		background: var(--button-background);
		color: var(--button-color);
		border-radius: 0.5rem 0.5rem;
		padding: 1.2em 2em;
		cursor: pointer;
		border: 2px solid var(--button-border);

		transition: 
			background-color 0.2s ease-in-out,
			color 0.2s ease-in-out;
	}

	.button:hover {
		background: var(--button-hover-background);
		color: var(--button-hover-color);
		transition: background-color 0.15s ease-out;
	}

	.button:disabled {
		background: var(--button-disabled-background);
		color: var(--button-disabled-color);
		border: 2px solid var(--button-disabled-border);
		cursor:default;
	}

	.button:disabled:hover {
		background: var(--button-disabled-background);
		color: var(--button-disabled-color);
	}

	.button:focus {
		outline: none;
	}

	.button:active {
		transition:none;
		background-color: var(--button-active-background);
		transform: scale(0.98);
	}

	.button:disabled:active {
		transform: scale(1);
	}



</style>