<script>
	import { spring } from "svelte/motion";
	import { onMount } from "svelte";
	export let pos = 0;
	export let visible = false;
	export let year;

	let displayedYear = null;

	onMount(() => {
		year.subscribe((value) => {
			displayedYear = value.toFixed(0);
		});
	});

	let yPos = spring(pos, { stiffness: 0.1, damping: 0.99 });
	$: yPos.update(() => pos);
</script>

<div class="cursor" style="transform:translateY({$yPos - 5}px);">
	<div class={visible ? "pill" : "pill hidden"}><p>{displayedYear}</p></div>
</div>

<style>
	.cursor {
		position: fixed;
		top: 0;
		left: 40px;
		pointer-events: none;
	}

	.pill {
		position: absolute;
		left: -10px;
		transform: translateY(-33%);
		width: calc(2 * var(--font-size-small) + 4.5rem);
		height: calc(1.5 * var(--font-size-small));
		border-radius: 100rem;
		background-color: var(--color-theme-1);
		transition: all 0.5s var(--curve);
	}

	p {
		position: absolute;
		top: 0;
		padding: 0;
		padding-left: 2rem;
		line-height: 1;
		margin: 0;
		font-size: var(--font-size-medium);
		font-weight: 600;
		color: var(--color-bg-1);
	}

	.hidden {
		width: 0;
	}
</style>
