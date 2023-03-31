<script>
	import { slide } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	export let selectedTitle;
	export let item;
	export let color = "var(--color-text)";
	const dispatch = createEventDispatcher();

	function handleClick() {
		selectedTitle = item.title;
		dispatch("selection");
	}
</script>

<button class="item" on:click={handleClick} transition:slide>
	{#if item.title}
		<p style="color:{color}" class="text"><b>{item.year}</b> • {item.title}</p>
	{:else}
		<p style="color:{color}" class="text">{item}</p>
	{/if}
</button>

<style>
	.item {
		display: flex;
		width: 100%;
		align-items: center;
		background: var(--color-bg-1);
		border: none;
		border-top: 1px solid var(--color-bg-2);
		transition: border 0.05s ease-in-out;
	}

	.item:hover {
		background: var(--color-text-card);
	}

	.item p {
		margin: var(--font-size-xsmall);
		text-align: left;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
</style>
