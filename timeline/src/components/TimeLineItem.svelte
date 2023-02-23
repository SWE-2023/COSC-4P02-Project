<!--for handing data components individually-->
<script>
    import Dot from './Dot.svelte';
    export let item; 
    export let spacing;
    export let currentTitle;
    export let currentPicture;
    export let currentText;

    function setDetails(){
		console.log("test");
        currentTitle = item.title;
        currentPicture = item.picture;
        currentText = item.text; 
    }

</script>

<div class="lineItem">
	<div style="top:{spacing}px">
	  <Dot onClick={setDetails} isActive={false}/>
	  <div class="date">{item.id}</div>
	</div>
  </div>

<style>
    .lineItem {
        display: flex;
        position: absolute;
        left:42px;
    }

	.lineItem div {
		padding:none;
		position: relative;
	}
    
    .date {
		top:-19px;
		left: 28px;
    }
   
</style>