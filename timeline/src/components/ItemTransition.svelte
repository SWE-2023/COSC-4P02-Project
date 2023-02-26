<script>
	import { fly, blur, fade } from "svelte/transition";
	import { reduceMotionStore } from "../store.js";
	export let direction;

	let transition = fly;
	let transitionInParams = { duration: 333, delay: 334 };
	let transitionOutParams = { duration: 333 };
	let offset = 250;

	const unsubscribe = reduceMotionStore.subscribe((value) => {
		if (value) {
			transition = blur;
			transitionInParams = { duration: 0, delay: 0 };
			transitionOutParams = { duration: 0 };
			offset = 0;
		}
	});

	unsubscribe();

	$: null;
</script>

<div
	in:transition|local={{
		...transitionInParams,
		x: 0,
		y: direction == "up" ? -offset : offset,
	}}
	out:transition|local={{
		...transitionOutParams,
		x: 0,
		y: direction == "up" ? offset : -offset,
	}}>
	<slot />
</div>
