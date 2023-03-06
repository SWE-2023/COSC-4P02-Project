<script>
	export let eventOne;
	export let eventTwo;
	export let isActive = false;

	function handleClick() {
		isActive = !isActive;
		eventOne();
		eventTwo();
	}
</script>

<button class="dot" on:click={handleClick} class:active={isActive}>
	<slot />
</button>

<style>
	.dot {
		width: 12px;
		height: 12px;
		background-color: var(--color-theme-1);
		box-shadow: 0 0 5px 0 #00000022;
		border-radius: 100vh;
		border: none;
		transform-origin: center;
		transition: all 0.15s ease-in-out;
		z-index: 10;
	}

	.dot:hover {
		cursor: pointer;
		width: calc(2 * var(--font-size-small) + 4rem);
		height: calc(1.2 * var(--font-size-small));
		transform: scale(1.2);
	}
</style>
