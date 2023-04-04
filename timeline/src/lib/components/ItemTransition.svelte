<script>
	import { fly, blur, fade } from "svelte/transition";
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
	  x: 0,
	  y: $direction == "up" ? -offset : offset,
	  easing: cubicOut,
	}));
  
	const outTransition = derived(directionStore, ($direction) => ({
	  duration: 250,
	  x: 0,
	  y: $direction == "up" ? offset : -offset,
	  easing: cubicOut,
	}));
  
	unsubscribe();
  </script>
  
  <div
	style="position: relative; overflow: hidden;"
	in:transition={$inTransition}
	out:transition={$outTransition}
  >
	<slot />
  </div>