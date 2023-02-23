<script>
	export let onClick;
</script>

<button style="" on:click={onClick} />

<style>
	button {
		width: 18px;
		height: 18px;
		background-color: var(--color-theme-1);
		border-radius: 100vh;
		border: solid 2px transparent;
		transform-origin: center;
		transition: all 0.15s ease-in-out;
		z-index: 10;
	}
</style>
