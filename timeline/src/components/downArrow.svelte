<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
</script>
    
    <div class = "lower">
        <button class = "second"  on:click={console.log}> 
          <Fa icon={faChevronDown}  size = "2x"/>
      </button>
    </div>

    
    
    <style>
      
        
      
      .second{
        cursor: pointer;
        background-color: transparent;
        border:none;
        padding: 0;
      }
      .lower{
        display: flex; 
        justify-content: center;
        align-items: center;
        cursor: pointer;
      
      }
    </style>