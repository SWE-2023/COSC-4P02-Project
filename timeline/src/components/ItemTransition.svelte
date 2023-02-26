<script>
	import { fly } from "svelte/transition";
	export let direction;

	let transition = fly;
	let transitionInParams = { duration: 333, delay: 334 };
	let transitionOutParams = { duration: 333 };
	let offset = 500;
	
	$: null; 
</script>

<div
	in:transition={{ 
		...transitionInParams, 
		x: 0, 
		y: direction == "up" ? -offset : offset,
		}}
	out:transition={{
		...transitionOutParams,
		x: 0,
		y: direction == "up" ? offset : -offset,
	}}>
	<slot />
</div>
