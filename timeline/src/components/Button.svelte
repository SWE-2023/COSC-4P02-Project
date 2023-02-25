<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	function click() {
		dispatch("click");
	}
	export let text = "Button";
	export let disabled = false;
	export let href = "#";
	export let alt = false;
	export let scale = 1;
</script>

<!--
	BUTTON USAGE:  
	<Button href="<LINK>" text="<TEXT>" disabled="{<BOOLEAN>}" alt="{<BOOLEAN>}" scale="{<NUMBER>}"/>
	{} = optional
	scale = scale of button (default = 1)
	alt = alternative button style (default = false)
	disabled = disabled button (default = false)
-->

{#if alt}
	<a {href} style="scale:{scale}">
		<button class="alt-button" on:click={click} {disabled}>{text}</button>
	</a>
{:else}
	<a {href} style="scale:{scale}">
		<button class="button" on:click={click} {disabled}>{text}</button>
	</a>
{/if}

<style>
	:root {
		--button-color: var(--color-theme-1);
		--button-background: transparent;
		--button-border: var(--button-color);
		--button-hover-color: var(--color-bg-1);
		--button-hover-background: var(--button-color);
		--button-active-background: var(--light-color-theme-1-light);

		--button-disabled-color: #0000004d;
		--button-disabled-background: #0000001a;
		--button-disabled-border: var(--button-disabled-background);
	}
	a {
		display: flex;
		margin: 0.5em;
		text-decoration: none !important;
	}
	.button,
	.alt-button {
		user-select: none;
		border-radius: 0.5rem 0.5rem;
		padding: 1.2em 2em;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
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
		transition: background-color 0.15s ease-out;
	}
	.alt-button:hover {
		background: var(--button-active-background);
		color: var(--button-hover-color);
		transition: background-color 0.15s ease-out;
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
