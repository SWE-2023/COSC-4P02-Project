<script>
	export let eventOne;
	export let eventTwo;
	export let year;

	function handleClick() {
		eventOne();
		eventTwo();
	}
</script>

<button
	class="dot-container"
	on:click={handleClick}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="dot-svg"
		width="32"
		height="32"
		viewBox="0 0 16 16">
		<circle class="dot" cx="8" cy="8" r="3.5" />
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
		padding:none;
		border:none;
		width: calc(2 * var(--font-size-small) + 7rem);
		height: var(--font-size-large);
		transition: all 0.5s var(--curve);
	}

	.dot-svg {
		position: absolute;
		z-index:3;
	}

	.dot {
		position: absolute;
		fill: var(--color-theme-1);
		stroke: var(--color-bg-1);
		stroke-width: 0;
		transform-origin: center;
		filter: saturate(0.5) brightness(1.5);
		transition: all 0.5s var(--curve);
	}

	.date {
		user-select: none;
		margin-left: calc(1.75*var(--font-size-base));
		font-size: var(--font-size-small);
		line-height: 1;
		border-radius: 1rem;
		opacity: 0;
		background:var(--color-bg-1);
		padding: 0.25rem 0.5rem 0.25rem 0.5rem;
		font-size: var(--font-size-base);
		transform:  scaleY(0.8);
		transition: all 0.5s var(--curve);
		z-index:1;
	}

	.dot-container:hover .dot {
		stroke-width: 2.5;
		filter: saturate(0.5) brightness(2);
		transform:scale(1.33);
	}

	.dot-container:active .dot {
		stroke-width: 3.5;
	}

	.dot-container:active .dot {
		transform: scale(1.2);
	}

	.dot-container:hover .date {
		cursor: pointer;
		color: var(--color-theme-1);
		transform: scale(1.1);
		margin-left: calc(2*var(--font-size-base));
		opacity: 1;
		
	}

	@media (max-width: 1000px) {
		.dot-container:hover .date {
			margin-left: calc(1.5*var(--font-size-base));
		}
		.dot-container:hover .dot {
			transform:scale(1.2) translateX(3px);
		}
	}
</style>
