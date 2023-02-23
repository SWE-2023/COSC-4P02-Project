<!--for handing data components individually-->
<script>
    import Dot from './Dot.svelte';
    export let item; 
    export let spacing;
    export let currentTitle;
    export let currentPicture;
    export let currentText;

    function setDetails(){
        currentTitle = item.title;
        currentPicture = item.picture;
        currentText = item.text; 
    }

</script>

<div style="padding-top: {spacing}rem" class = lineItem>
    <Dot on:click[{setDetails()}]/>
    <div class = "date">{item.id}</div>
</div>

<style>
    .lineItem {
        display: flex;
        position: absolute;
        left:42px;
    }
    
    .date {
        padding-left: 10px;  
    }
   
</style>