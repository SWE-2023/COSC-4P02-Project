<script>
	export let eventOne;
	export let eventTwo;
	export let isActive = false;

	function handleClick() {
		isActive = !isActive;
	}
</script>

<button
	class="dot"
	on:click={handleClick}
	on:click={eventOne}
	on:click={eventTwo}
	class:active={isActive}>
	<slot />
</button>

<style>
	.dot {
		width: 16px;
		height: 16px;
		background-color: var(--color-theme-1);
		border-radius: 100vh;
		border: none;
		transform-origin: center;
		transition: all 0.15s ease-in-out;
		z-index: 10;
	}

	.dot:hover {
		cursor: pointer;
		width: 5rem;
		height: 1rem;
		transform: scale(1.2);
	}
</style>
