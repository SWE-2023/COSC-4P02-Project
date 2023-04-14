<script>
	import { fly, blur } from "svelte/transition";
	import { reduceMotionStore } from "$lib/stores/store.js";
	import { cubicOut } from "svelte/easing";
	import { writable, derived } from "svelte/store";

	export let direction;

	let transition = fly;
	let offset = 500;

	const unsubscribe = reduceMotionStore.subscribe((value) => {
		if (value) {
			transition = blur;
		}
	});

	const directionStore = writable(direction);
	$: directionStore.set(direction);

	const inTransition = derived(directionStore, ($direction) => ({
		duration: 250,
		delay: 251,
		x: $direction === "left" ? offset : $direction === "right" ? -offset : 0,
		y: $direction === "up" ? -offset : $direction === "down" ? offset : 0,
		easing: cubicOut,
	}));

	const outTransition = derived(directionStore, ($direction) => ({
		duration: 250,
		x: $direction === "left" ? -offset : $direction === "right" ? offset : 0,
		y: $direction === "up" ? offset : $direction === "down" ? -offset : 0,
		easing: cubicOut,
	}));

	unsubscribe();
</script>

<div class="container">
	<div
		in:transition={$inTransition}
		out:transition={$outTransition}>
		<slot />
	</div>
</div>

<style>
	.container {
		overflow: hidden;
		z-index: 1;
	}
</style>
