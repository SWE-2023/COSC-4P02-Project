<script>
    import Fa from 'svelte-fa/src/fa.svelte'; //please type and run "npm install svelte-fa" in terminal

    
    import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; 
    //please type and run "npm install @fortawesome/free-solid-svg-icons" &
    //"npm install @fortawesome/free-brands-svg-icons" in terminal to avoid any errors
    
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