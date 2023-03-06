<script>
    import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
    import { faStop } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa/src/fa.svelte";
    import { onDestroy } from 'svelte';
    
 
   
    let speaking = false;
    let currentUtterance;
    export let body;
    export let title;
    export let start_date;
 
    //export let image_credit;
	

    function text2Speech(){
        if (!speaking) {
            const utterance1 = new SpeechSynthesisUtterance(title);
            const utterance2 = new SpeechSynthesisUtterance(start_date);
            const utterance3 = new SpeechSynthesisUtterance(body);
            //const utterance4 = new SpeechSynthesisUtterance(image_credit);

         
            
            utterance1.onend = () => {
                if (currentUtterance === utterance1) {
                    currentUtterance = null;
                    speaking = false;
                }
            };
            utterance2.onend = () => {
                if (currentUtterance === utterance2) {
                    currentUtterance = null;
                    speaking = false;
                }
            };
            utterance3.onend = () => {
                if (currentUtterance === utterance3) {
                    currentUtterance = null;
                    speaking = false;
                }
            };
            currentUtterance = utterance3;
            speechSynthesis.speak(utterance1);
            speechSynthesis.speak(utterance2);
            speechSynthesis.speak(utterance3);
            //speechSynthesis.speak(utterance4);
            
            speaking = true;
        }
    }
   
    
    function stop() {
        if (speaking) {
            speechSynthesis.cancel();
            currentUtterance = null;
            speaking = false;
           
            
        }
    }

    // clean up speech synthesis resources when component is removed from DOM
    function cleanupSpeech() {
        if (speaking) {
            speechSynthesis.cancel();
        }
    }
    // add event listener to remove event listeners when component is destroyed
    if (typeof window !== "undefined") {
        window.addEventListener("unload", cleanupSpeech);
    }
   
    onDestroy( () => {
        cleanupSpeech();
    });
    

    
    
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

