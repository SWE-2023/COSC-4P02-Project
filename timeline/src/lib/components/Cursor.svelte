<script>
	import { spring, tweened } from "svelte/motion";
	import { onMount } from "svelte";
	import { cubicOut } from "svelte/easing";
	export let pos = 0;
	export let visible = false;
	export let year;

	let displayedYear;

	let yPos = tweened(pos, { duration: 50, easing: cubicOut });
	$: yPos.update(() => pos);

	onMount(() => {
		year.subscribe((value) => {
			if (value !== undefined) {
				displayedYear = value.toFixed(0);
			}
		});
	});
</script>

<div class="cursor" style="transform:translateY({$yPos - 5}px);">
	<div class={visible ? "pill" : "pill hidden"}>
		<p>{displayedYear ? displayedYear : "..."}</p>
	</div>
</div>

<style>
	.cursor {
		user-select: none;
		position: fixed;
		top: 0;
		z-index: 2;
		left: var(--left);
		pointer-events: none;
		transition: all 0.5s var(--curve);
	}

	@media (max-width: 1000px) {
		.cursor {
			left: -11px;
		}
	}

	.pill {
		position: absolute;
		left: -14px;
		transform: scaleX(1) translateY(-33%);
		width: calc(2 * var(--font-size-small) + 4.2rem);
		height: calc(1.5 * var(--font-size-small));
		border-radius: 100rem;
		border: 3px solid var(--color-bg-1);
		background-color: var(--color-theme-1);
		transition: all 0.5s var(--curve);
		transform-origin: 18px 50%;
		mix-blend-mode: lighten;
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
		border: 3px solid transparent;
		transform: scaleX(0);
	}

	.hidden * {
		opacity: 0;
	}
</style>
