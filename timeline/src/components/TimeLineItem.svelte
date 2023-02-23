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
<<<<<<< HEAD
	<div style="top:{spacing}vh">
	  <Dot onClick={setDetails}/>
=======
	<div style="top:{spacing}px">
	  <Dot eventOne={setDetails} eventTwo={change} isActive={false}/>
>>>>>>> 5344a0109e3676303ca862f27b9d93683fbf21cf
	  <div class="date">{item.id}</div>
	</div>
  </div>

<style>
    .lineItem {
        display: flex;
        position:absolute;
        left:43px;
    }

	.lineItem div {
		padding:none;
		position: relative;
	}

	.date {
		top:-17px;
		font-size:10px;
		left: 40px;
		opacity: 0.5;
		filter: blur(2px);
		transform-origin: center left;
		z-index:2;
		padding:0 2rem 0 0;
		transition: all 0.15s ease-in-out;
	}
    
    .lineItem:hover .date{
		cursor:pointer;
		color:var(--color-bg-1);
		transform: scale(1.75);
		opacity: 1;
		filter:blur(0px);
    }

	.lineItem:hover :global(button) {
		cursor:pointer;
		width:5rem;
		transform:scale(1.2);
	}

	.date:hover :global(button) {
		cursor:pointer;
		width:5rem;
		transform:scale(1.2);
	}

</style>