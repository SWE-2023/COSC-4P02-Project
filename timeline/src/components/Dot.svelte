<script>
	export let onClick;
	export let isActive = false;
	
	function handleClick() {
		isActive = !isActive; 
		onClick(isActive);
	}
	
</script>

<button on:click={handleClick} class:active={isActive}></button>

<style>
    button {
        width: 18px;
        height: 18px;
        background-color: var(--color-theme-1);
        border-radius: 100%; 
        border: solid 2px transparent;
		transform-origin: center;
		transition:all 0.1s ease-in-out;
    }

	button:hover {
		cursor:pointer;
	}

	button:hover:not(.active) {
		transform:scale(1.2);
    }

	button:hover.active {
		transform:scale(1.4);
	}
	
    button:active {
		transform:scale(1.5);
        background-color: var(--color-bg-1);
        border-radius: 100%;
        border: solid 2px var(--color-theme-1);
    } 
	
	.active {
		background-color: var(--color-bg-1);
        border-radius: 100%;
        border: solid 2px var(--color-theme-1);
        transform:scale(1.5);
	}
	
</style>