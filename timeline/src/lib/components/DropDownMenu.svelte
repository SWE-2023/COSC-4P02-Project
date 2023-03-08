<script>
    import { createEventDispatcher } from "svelte";
    import DropDownItem from "./DropDownItem.svelte";
    export let currentlyTitle;
    export let currentOpacity;
    export let list;
    export let show;
    const dispatch = createEventDispatcher();
    const changeItem = () => dispatch("itemSelected");
</script>

{#if show}
    {#if list.length > 0 }
        {#each list as title}
            <DropDownItem 
                bind:selectedTitle={currentlyTitle} 
                itemTitle={title} 
                on:itemSelected={changeItem}/>
        {/each}
    {:else}
        <div class="noResult" style="opacity:{currentOpacity}">No Result!</div>		
    {/if}	
{/if}
 
<style>
    .noResult {
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

</style>