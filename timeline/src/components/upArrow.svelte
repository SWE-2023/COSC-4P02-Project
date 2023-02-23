<script>
import Fa from 'svelte-fa/src/fa.svelte'; //please type and run "npm install svelte-fa" in terminal


import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
//please type and run "npm install @fortawesome/free-solid-svg-icons" &
//"npm install @fortawesome/free-brands-svg-icons" in terminal to avoid any errors


</script>

<div class = "upper">
        <button class = "first">
         <Fa icon={faChevronUp} size = "2x"/>
      </button>
    </div>


    
<style>
    .upper {
    display: flex;
    justify-content: center;
    align-items: center;
    
    
    
  }
  .first{
    cursor: pointer;
    background-color: transparent;
    border:none;
    padding: 0;
    
  }

</style>