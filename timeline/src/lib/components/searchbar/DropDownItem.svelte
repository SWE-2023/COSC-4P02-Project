<script>
    import { slide } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	export let selectedTitle;
	export let itemTitle;
	const dispatch = createEventDispatcher();

	function handleClick() {
		selectedTitle = itemTitle;
        dispatch("selection");
	}
</script>


<button class="item" on:click={handleClick} transition:slide
	><p class="text">{itemTitle}</p>
</button>

<style>
	.item {
		display: flex;
        width:100%;
		align-items: center;
        background:white;
        border:none;
        border-top:1px solid #e0e0e0;
        transition:border 0.05s ease-in-out;
	}

    .item:hover {
        background:#e0e0e0;
    }


    .item p {
        margin:var(--font-size-xsmall);
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
