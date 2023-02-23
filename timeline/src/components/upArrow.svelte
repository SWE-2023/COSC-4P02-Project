<script>
import Fa from 'svelte-fa/src/fa.svelte';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
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