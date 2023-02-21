<!--for handing data components individually-->
<script>
    export let item; 
    export let spacing;
</script>

<div style="padding-top: {spacing}px" class = lineItem>
    <span class = "dot"></span>
    <span class = "date">{item.id}</span>
</div>

<style>
    .lineItem {
        display: flex;
        justify-content: left;
        position: relative;
        right: 5px;
    }
    
    .dot {
        width: 15px;
        height: 15px;
        background-color: brown;
        border-radius: 20%;
        border-radius: 138px; 
    }

    .date {
        padding-left: 10px;
        
    }
   
</style>