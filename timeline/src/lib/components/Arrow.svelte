<script>
	import { direction, mode } from "$lib/stores/store";
	import { createEventDispatcher } from "svelte";

	export let down = false;
	export let visible = true;
	export let disabled = false;

	$: classes =
		"arrow-button " + (down ? "down" : "up") + (visible ? " " : " hidden");

	const dispatch = createEventDispatcher();
	const goUp = () => dispatch("moveup");
	const goDown = () => dispatch("movedown");

	function handleKeyDown(event) {
		if ($mode !== "default") return;
		switch (event.key) {
			case "ArrowUp":
				event.preventDefault();
				direction.set("up");
				goUp();
				break;
			case "ArrowDown":
				event.preventDefault();
				direction.set("down");
				goDown();
				break;
			case "ArrowLeft":
				event.preventDefault();
				direction.set("right");
				goUp();
				break;
			case "ArrowRight":
				event.preventDefault();
				direction.set("left");
				goDown();
				break;
		}
	}

	function handleClick() {
		if (down) {
			direction.set("down");
			goDown();
		} else {
			direction.set("up");
			goUp();
		}
	}
</script>

<div class={classes}>
	<button {disabled} class="button" on:click={handleClick}>
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
	* {
		user-select: none;
	}

	.circle {
		width: calc(2.5 * var(--font-size-base));
		height: calc(2.5 * var(--font-size-base));
		border-radius: 100%;
		opacity: var(--arrow-opacity);
		background-color: var(--color-bg-1);
		border: var(--arrow-border);
		transition: all 0.3s var(--curve);
	}

	.button {
		cursor: pointer;
		background-color: transparent;
		border: none;
		padding: 0.5rem;
	}

	.circle:hover,
	.button:hover > .circle {
		background-color: var(--color-bg-2);
		opacity: 1;
	}

	.down-arrow,
	.up-arrow {
		color: var(--color-theme-1);
		font-size: calc(2.5 * var(--font-size-base));
	}

	@media (max-width: 1000px) {
		.circle {
			border: var(--border);
		}
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
		border: var(--border);
		opacity: 1;
	}
</style>
