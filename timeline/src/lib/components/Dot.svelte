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
		transform-origin:  right;
		transition: all 0.33s var(--curve);
		z-index: 10;
	}

	.dot:active {
		transform: scale(0.9);
	}

</style>
