<script>
	import { createEventDispatcher } from "svelte";
	export let lock;
	export let down = false;
	export let disabled = false;
	export let visible = false;

	$: classes =
		"arrow-button " + (down ? "down" : "up") + (visible ? " " : " hidden");

	const dispatch = createEventDispatcher();
	const goUp = () => dispatch("moveUp");
	const goDown = () => dispatch("moveDown");

	function handleKeyDown(event) {
		event.preventDefault();
		if(!lock){
			if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
				goUp();
			} else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
				goDown();
			}
		}	
	}
</script>

<div class={classes}>
	<button {disabled} class="button" on:click={down ? goDown : goUp}>
		<div class="circle">
			<span class="icon">
				{#if down}
					<span class="down-arrow material-symbols-rounded"> keyboard_arrow_down </span>
				{:else}
					<span class="up-arrow material-symbols-rounded"> keyboard_arrow_up </span>
				{/if}
			</span>
		</div>
	</button>
</div>

<svelte:window on:keydown={handleKeyDown} />

<style>
	:root {
		--anim: 0.33s cubic-bezier(0.13, 0.94, 0.16, 1.15);
	}

	.arrow-button {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9999;
		transition: top var(--anim), bottom var(--anim);
	}

	.up {
		top: 3rem;
	}

	.down {
		bottom: 3rem;
	}

	.up.hidden {
		top: -7rem;
	}

	.down.hidden {
		bottom: -7rem;
	}

	.circle {
		width: calc(3 * var(--font-size-base));
		height:  calc(3 * var(--font-size-base));
		border-radius: 100%;
		opacity: 0.5;
		background-color: var(--color-bg-1);
		border: 3px solid var(--light-color-bg-1);
		box-shadow: 2px 2px 5px 1px #00000022;
		mix-blend-mode: screen;
		transition: all 0.15s ease-in-out;
	}

	.button {
		cursor: pointer;
		background-color: transparent;
		border: none;
		padding: 1.5rem 6rem;
	}

	.circle:hover,
	.button:hover > .circle {
		border: 3px solid var(--color-theme-2-light);
		opacity: 1;
	}

	.down-arrow,  .up-arrow {
		color: var(--color-text);
		font-size: calc(3 * var(--font-size-base));
	}

	.down-arrow {
		position:relative;
		top:3px;
	}

	.button:disabled,
	button:disabled > .circle {
		cursor: default;
		opacity: 0.25;
	}

	.circle:active,
	.button:active > .circle {
		transform: scale(0.95);
		opacity: 1;
	}
</style>
