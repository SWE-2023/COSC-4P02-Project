<script>
    import { createEventDispatcher } from "svelte";
    export let selectedTitle;
    export let itemTitle;
    const dispatch = createEventDispatcher();
    
    function returnItem(){
        selectedTitle = itemTitle;
        dispatch("itemSelected");
    }

</script>

 <button class="drop-down" on:click={returnItem}><span class="text">{itemTitle}</span></button>
	
<style>
    .drop-down {
        position: relative;
        height: 30px;
        width: 245px;
        border: 2px solid black;
        background-color: rgb(206, 204, 204);
        display:flex;
        align-items: center;
        overflow: hidden;
        text-overflow:ellipsis;
    }

    .text {
        overflow: hidden;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>