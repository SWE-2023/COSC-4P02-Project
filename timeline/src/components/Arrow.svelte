<script>
	import { createEventDispatcher } from "svelte";
	import Fa from "svelte-fa/src/fa.svelte";
	import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
	import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

	export let alt = false;
	export let upFunction;
	export let downFunction;

	const dispatch = createEventDispatcher();
	const goUp = () => dispatch("moveUp");
	const goDown = () => dispatch("moveDown");
</script>

{#if alt}
	<div class="down">
		<button class="down-button" on:click={goDown} on:click={downFunction}>
			<Fa icon={faChevronDown} size="2x" color=var(--color-text) />
		</button>
	</div>
{:else}
	<div class="up">
		<button class="up-button" on:click={goUp} on:click={upFunction}>
			<Fa icon={faChevronUp} size="2x" color=var(--color-text) />
		</button>
	</div>
{/if}

<style>
	.up {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		top: 2rem;
		z-index: 9999;
	}

	.down {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 2rem;
		z-index: 9999;
	}

	.up-button {
		cursor: pointer;
		background-color: transparent;
		border: none;
		padding: 0 1rem 1rem 1rem;
	}

	.down-button {
		cursor: pointer;
		background-color: transparent;
		border: none;
		padding: 1rem 1rem 0 1rem;
	}
</style>
