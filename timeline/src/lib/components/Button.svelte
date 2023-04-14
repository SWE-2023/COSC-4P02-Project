<script>
	import { createEventDispatcher } from "svelte";
	import { loadingAction } from "svelte-legos";
	
	const dispatch = createEventDispatcher();
	function click() {
		dispatch("click");
	}
	export let text = "Button";
	export let autofocus = false;
	export let disabled = false;
	export let href = "#";
	export let alt = false;
	export let loading = false;	
</script>

<!-- svelte-ignore a11y-autofocus -->
{#if alt}
	<a {href} >
		<button {autofocus} use:loadingAction={loading} class="alt-button" on:click={click} {disabled}>{text}</button>
	</a>
{:else}
	<a {href}>
		<button {autofocus} use:loadingAction={loading} class="button" on:click={click} {disabled}>{text}</button>
	</a>
{/if}

<style>
	a {
		display: flex;
		margin: 0.5em;
		text-decoration: none !important;
	}
	.button,
	.alt-button {
		user-select: none;
		border-radius: 0.5rem 0.5rem;
		padding: 1em 2em;
		cursor: pointer;
		transition: background-color 0.33s var(--curve), color 0.33s var(--curve);
	}
	.button {
		background: var(--button-background);
		color: var(--button-color);
		border: 2px solid var(--button-border);
	}
	.alt-button {
		background: var(--button-color);
		color: var(--button-hover-color);
		border: 2px solid var(--button-border);
	}
	.button:hover {
		background: var(--button-hover-background);
		color: var(--button-hover-color);
		transition: background-color 0.33s var(--curve);
	}
	.alt-button:hover {
		background: var(--button-active-background);
		color: var(--button-hover-color);
		transition: background-color 0.33s var(--curve);
	}
	.button:disabled,
	.alt-button:disabled {
		background: var(--button-disabled-background);
		color: var(--button-disabled-color);
		border: 2px solid var(--button-disabled-border);
		cursor: default;
	}
	.button:disabled:hover,
	.alt-button:disabled:hover {
		background: var(--button-disabled-background);
		color: var(--button-disabled-color);
	}
	.button:focus,
	.alt-button:focus {
		outline: none;
	}
	.button:active,
	.alt-button:active {
		transition: none;
		background-color: var(--button-active-background);
		transform: scale(0.98);
	}
</style>
