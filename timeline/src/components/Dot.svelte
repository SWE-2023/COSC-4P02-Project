<script>
	export let onClick;
</script>

<button on:click={onClick}></button>

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
		transform:scale(1.2);
	}

    button:active {
		transform:scale(1.1);
        border: solid 2px var(--color-theme-1);
    } 
	
</style>