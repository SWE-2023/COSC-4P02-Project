<!--for handing data components individually-->
<script>
    export let item; 
    export let spacing;
</script>

<div style="padding-top: {spacing}rem" class = lineItem>
    <div class = "dot"></div>
    <div class = "date">{item.id}</div>
</div>

<style>
    .lineItem {
        display: flex;
        position: absolute;
        left:42px;
    }
    
    .dot {
        width: 17px;
        height: 17px;
        background-color: brown;
        border-radius: 20%;
        border-radius: 100px; 
    }
    .date {
        padding-left: 10px;  
    }
   
</style>