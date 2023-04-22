<script>
	import {year  } from "$lib/stores/store";
	export let pos;
	export let tweening = false;
</script>

<div class="cursor" style="transform:translateY(calc(5px + {pos}vh))">
	<div class={tweening ? "pill" : "pill"}>
		<p>{$year ? $year.toFixed(0) : "..."}</p>
	</div>
</div>

<style>
	.cursor {
		user-select: none;
		position: relative;
		top: 0;
		z-index: 2;
		left: var(--left);
		pointer-events: none;
		transition: all 0.5s var(--curve), transform 0ms;
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
</style>
