<script>
    import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
    import { faStop } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa/src/fa.svelte";
   
    let speaking = false;
    export let body;
	

    function text2Speech(){
        if (!speaking) {
            const utterance = new SpeechSynthesisUtterance(body);
            speechSynthesis.speak(utterance);
            speaking = true;
           
        
        }
    }
    
    function stop() {
        if (speaking) {
            speechSynthesis.cancel();
            speaking = false;
            
        }
    }
   
    
</script>

<button class = "text2Speech" on:click={text2Speech}> <Fa icon={faVolumeHigh} size="2x" /> </button>
&nbsp; &nbsp;
<button class = "text2Speech" on:click={stop}> <Fa icon={faStop} size="2x" /> </button>


<style>
    .text2Speech{
        opacity:0.5;
        cursor:pointer;
        display:inline-flex;
        border:none;
        background:transparent;
    
    }

</style>
