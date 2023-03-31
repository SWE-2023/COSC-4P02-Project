<script>
	import { fly, blur, fade } from "svelte/transition";
	import { reduceMotionStore } from "$lib/stores/store.js";
	
	export let direction;

	let transition = fly;
	let offset = 100;

	const unsubscribe = reduceMotionStore.subscribe((value) => {
		if (value) {
			transition = blur;
		}
	});

	unsubscribe();

	$: null;
</script>

<div
	in:transition={{ duration: 400, delay: 401, x: 0, y: direction == "up" ? -offset : offset}}
	out:transition={{ duration: 400, x: 0, y: direction == "up" ? offset : -offset }}>
	<slot />
</div>
