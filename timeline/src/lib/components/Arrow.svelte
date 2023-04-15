<script>
	import { createEventDispatcher } from "svelte";
	export let lock;
	export let down = false;
	export let disabled = false;
	export let visible = false;

	$: classes =
		"arrow-button " + (down ? "down" : "up") + (visible ? " " : " hidden");

	const dispatch = createEventDispatcher();
	const goUp = () => dispatch("moveup");
	const goDown = () => dispatch("movedown");

	function handleKeyDown(event) {
		if (!lock) {
			if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
				event.preventDefault();
				goUp();
			} else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
				event.preventDefault();
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
					<span class="down-arrow material-symbols-rounded">
						keyboard_arrow_down
					</span>
				{:else}
					<span class="up-arrow material-symbols-rounded">
						keyboard_arrow_up
					</span>
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

	* {
		user-select: none;
	}

	.arrow-button {
		position: fixed;
		left: 11rem;
		transform: translateX(-50%);
		z-index: 4;
		transition: top var(--anim), bottom var(--anim);
	}

	.up {
		top: 10vh;
	}

	.down {
		bottom: 7vh;
	}

	.up.hidden {
		top: -7rem;
	}

	.down.hidden {
		bottom: -7rem;
	}

	.circle {
		width: calc(2.5 * var(--font-size-base));
		height: calc(2.5 * var(--font-size-base));
		border-radius: 100%;
		opacity: var(--arrow-opacity);
		background-color: var(--color-bg-1);
		border: var(--border);
		transition: all 0.5s var(--curve);
	}

	.button {
		cursor: pointer;
		background-color: transparent;
		border: none;
		padding: 1rem 1rem;
	}

	.circle:hover,
	.button:hover > .circle {
		border: 2px solid var(--color-theme-1);
		opacity: 1;
	}

	.down-arrow,
	.up-arrow {
		color: var(--color-theme-1);
		font-size: calc(2.5 * var(--font-size-base));
	}

	.down-arrow {
		position: relative;
		top: 3px;
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
