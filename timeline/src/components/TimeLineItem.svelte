<!--for handing data components individually-->
<script>
    export let item 
</script>

<li class = lineItem>
    <span class = "title">{item.title}</span>
    <span class = "dot"></span>
    <span class = "date">{item.id}</span>
</li>

<style>
    .title {
        transform: rotate(-70deg);
        padding-left: 7em;
    }

    .dot{
        height: 12px;
        width: 12px;
        border-radius: 50%;
        border: 2px solid #dfdfdf;
        background-color: #f8f8f8;
    }

    .date {
        padding-top: 10px;

    }

   .lineItem {
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -35px;
   }
   
</style>