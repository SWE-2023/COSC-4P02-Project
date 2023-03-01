<script>
    import Fa from "svelte-fa/src/fa.svelte";
	import { faExpand } from "@fortawesome/free-solid-svg-icons";
	import { faCompress } from "@fortawesome/free-solid-svg-icons";
    import Fullscreen from "svelte-fullscreen";
    
   
  </script>

<style>
   
  </style>
  
  <Fullscreen let:onRequest let:onExit>
    <div>
      
      <button on:click={() => onRequest()}><Fa icon={faExpand} color="var(--color-text)" /></button>
      <button on:click={() => onExit()}><Fa icon={faCompress} color="var(--color-text)" /></button>
    </div>
  </Fullscreen>