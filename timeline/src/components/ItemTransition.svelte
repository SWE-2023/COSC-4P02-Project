<script>
	import { fly, blur, fade } from "svelte/transition";
	import { reduceMotionStore } from "../store.js";
	export let direction;

	let transition = fly;
	let offset = 250;

	const unsubscribe = reduceMotionStore.subscribe((value) => {
		if (value) {
			transition = blur;
		}
	});

	unsubscribe();

	$: null;
</script>


<div
	in:transition={{ duration: 333, delay: 334, x: 0, y: direction == "up" ? -offset : offset}}
	out:transition={{ duration: 333, x: 0, y: direction == "up" ? offset : -offset }}>
	<slot />
</div>
