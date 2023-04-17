<!-- Arrow.svelte -->
<script>
	import { tweened } from "svelte/motion";
	import { quintOut } from "svelte/easing";
	import { mobile } from "$lib/stores/window";

	export let open = false;
	const flip = tweened(0, { duration: 300, easing: quintOut });

	const toggle = () => (open = !open);

	$: {
		if (open) {
			flip.set(-1);
		} else {
			flip.set(1);
		}
	}
</script>

<div class="cont" on:click={toggle} on:keydown>
	<div
		class={`arrow ${$mobile ? "mobile" : ""}`}
		style="transform: scaleX({$flip})">
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9 18L15 12L9 6"
				stroke="var(--color-theme-1)"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round" />
		</svg>
	</div>
</div>

<style>
	.cont {
		padding: 1rem 1rem;
		cursor: pointer;
	}

	@media (max-width: 1000px) {
		.cont {
			padding: 1rem 2rem;
		}
	}

	.arrow {
		display: inline-flex;
		transform-origin: 50%;
		rotate: 0deg;
		z-index: 5;
		transition: rotate 1s var(--curve);
	}

	.mobile {
		rotate: 90deg;
	}
</style>
