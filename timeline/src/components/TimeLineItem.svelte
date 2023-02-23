<!--for handing data components individually-->
<script>
  	import {createEventDispatcher} from 'svelte';
    import Dot from './Dot.svelte';
    export let item; 
    export let spacing;
    export let currentItem;

    const dispatch = createEventDispatcher();
    const change = () => dispatch('change');
    function setDetails(){
      currentItem = item; 
    }
    
</script>

<div class="lineItem">
	<div style="top:{spacing}px">
	  <Dot eventOne={setDetails} eventTwo={change} isActive={false}/>
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