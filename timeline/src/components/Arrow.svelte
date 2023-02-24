<script>
  import {createEventDispatcher} from 'svelte';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
  import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

  export let alt = false;
  export let upFunction; 
  export let downFunction;

  const dispatch = createEventDispatcher();
  const goUp = () => dispatch('moveUp');
  const goDown= () => dispatch('moveDown');
</script>
    

{#if alt}
  <div class = "down">
    <button class = "down-button"  on:click={goDown} on:click={downFunction}>
      <Fa icon={faChevronDown}  size = "2x"/>
    </button>
  </div>
{:else}
  <div class = "up">
    <button class = "up-button" on:click={goUp} on:click={upFunction}>
    <Fa icon={faChevronUp} size = "2x"/>
    </button>
  </div>
{/if}
  
 
<style>
  .up {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 5rem;
  }

  .down{
    display: flex; 
    justify-content: center;
    align-items: center;
    position: relative;
    top: 10rem;
  }

  .up-button{
    cursor: pointer;
    background-color: transparent;
    border:none;
    padding: 0;      
  }
        
  .down-button{
    cursor: pointer;
    background-color: transparent;
    border:none;
    padding: 0;
  }
</style>