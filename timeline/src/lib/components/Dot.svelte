<script>
	import { mobile } from "$lib/stores/window";
	export let eventOne;
	export let eventTwo;
	export let year;

	function handleClick() {
		eventOne();
		eventTwo();
	}
</script>

<button class="dot-container" on:click={handleClick}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="dot-svg"
		width="32"
		height="32"
		viewBox="0 0 32 16">
		<circle class="dot" cx="12" cy="11" r="7" />
		{#if !$mobile}
			<line
				class="line"
				x1="14"
				y1="11"
				x2="28"
				y2="11"
				stroke="var(--color-theme-1)"
				stroke-width="4"
				stroke-linecap="square"
				stroke-linejoin="round" />
		{/if}
	</svg>
	<div class="date">{year}</div>
</button>

<style>
	.dot-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		cursor: pointer;
		background: none;
		padding: none;
		border: none;
		width: 15px;
		height: 15px;
		transition: all 0.5s var(--curve);
	}

	.dot-svg {
		position: absolute;
		left: 9px;
		z-index: 3;
	}

	.dot {
		position: absolute;
		fill: var(--color-theme-1);
		stroke: var(--color-bg-1);
		stroke-width: 0;
		transform-origin: center;
		transition: transform 0.5s var(--curve);
	}

	.date {
		user-select: none;
		margin-left: 1.6rem;
		font-size: var(--font-size-small);
		line-height: 1;
		border-radius: 1rem;
		opacity: 0;
		background: var(--color-bg-1);
		padding: 0.25rem 0.5rem 0.25rem 0.5rem;
		font-size: var(--font-size-base);
		transform: scaleY(0.8);
		transition: all 0.5s var(--curve);
		z-index: 1;
	}

	.dot-container:hover .dot {
		stroke-width: 2.5;
		fill: var(--color-theme-1);
		transform: scale(1) translateX(14px);
	}

	.line {
		transform: scaleX(0);
		transform-origin: center;
		transition: transform 0.5s var(--curve);
	}

	.dot-container:hover .line {
		transform: scaleX(1);
	}

	.dot-container:active .dot {
		stroke-width: 3.5;
	}

	.dot-container:hover .date {
		cursor: pointer;
		color: var(--color-theme-1);
		transform: scale(1.1);
		margin-left: 2.4rem;
		opacity: 1;
	}

	@media (max-width: 1000px) {
		.dot-container:hover .date {
			margin-left: calc(1.5 * var(--font-size-base));
		}
		.dot-container:hover .dot {
			transform: scale(1.2) translateX(2px);
		}
	}
</style>
