<script>
<<<<<<< HEAD
	export let onClick;
</script>

<<<<<<< HEAD
<button style="" on:click={onClick}></button>
=======
	export let eventOne;
    export let eventTwo;
	export let isActive = false;
   
	function handleClick() {
		isActive = !isActive; 
	}
	
</script>

<button on:click={handleClick} on:click={eventOne} on:click={eventTwo} class:active={isActive}></button>
>>>>>>> 5344a0109e3676303ca862f27b9d93683fbf21cf
=======
<button style="" on:click={onClick} />
>>>>>>> b34843fce07e4aa7f97bb49d9e13bee6c387b79c

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
