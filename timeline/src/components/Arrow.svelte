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
		<button class="button" on:click={goDown} on:click={downFunction}>
			<div class="circle">
				<span class=icon><Fa icon={faChevronDown} size="2x" color="var(--color-text)" /></span>
				</div>
		</button>
	</div>
{:else}
	<div class="up">
		<button class="button" on:click={goUp} on:click={upFunction}>
			<div class="circle">
			<span class=icon><Fa icon={faChevronUp} size="2x" color="var(--color-text)" /></span>
			</div>
		</button>
	</div>
{/if}

<style>
	.up, .down {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9999;
	}

	.up {
		top: 0;
	}

	.down {
		bottom: 0;
	}
	
	.circle { 
		width: 48px;
		height: 48px;
		border-radius: 100%;
		opacity:0.75;
		background-color: var(--color-bg-1);
		border: 3px solid var(--light-color-bg-1);
		box-shadow: 2px 2px 5px 1px #00000022;
		transition: all 0.15s ease-in-out;
		mix-blend-mode: screen
	}


	.button {
		cursor: pointer;
		background-color: transparent;
		border: none;
		padding: 1.5rem 4rem;
	}

	.circle:hover, .button:hover > .circle {
		border: 3px solid var(--color-theme-2-light);
		opacity:0.8;
	}

	.icon {
		position: relative;
		top: 8px;
	}

	.circle:active, .button:active > .circle {
		transform: scale(0.95);
		opacity:1;
	}

</style>
