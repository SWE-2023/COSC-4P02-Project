<script>
	import { createEventDispatcher } from "svelte";
	import { tweened } from "svelte/motion";
	import Cursor from "$lib/components/Cursor.svelte";
	import Dot from "$lib/components/Dot.svelte";
  import { cubicOut } from "svelte/easing";
	export let timeData;
	export let currentItem;
	export let disabled;

	
	let pos = 100;
	let visible = true;
	const year = tweened(1720, {
		duration: 600,
		easing: cubicOut
	});
	
	function getYear(date) {
		const year = date.substring(0, 4);
		return parseInt(year);
	}

	const timelineHeight = 80; // in vh
	let scale = 20; // values lower than 10 will cause issues
	let decades = [];
	let lowest = Math.floor(getYear(timeData[0].start_date) / scale) * scale; // round down to nearest 20 year
	let highest =
		Math.ceil(getYear(timeData[timeData.length - 1].start_date) / scale) *
		scale; // round up to nearest 20 year

	for (let i = lowest; i <= highest; i += scale) {
		decades.push(i);
	}

	function getSpacing(date) {
		const top = lowest;
		const bottom = highest;
		const current = getYear(date);
		const percentage = (current - top) / (bottom - top);
		const spacing = percentage * (timelineHeight - 2);
		return spacing;
	}

	const dispatch = createEventDispatcher();
	const change = () => dispatch("change");
	const setDetails = (item) => (currentItem = item);

	function updateGap() {
		const screenHeight = window.innerHeight;
		const scale = Math.max(
			20,
			Math.min(80, Math.round((750 - screenHeight) / 50) * 10)
		);
		lowest = Math.floor(getYear(timeData[0].start_date) / scale) * scale;
		highest =
			Math.ceil(getYear(timeData[timeData.length - 1].start_date) / scale) *
			scale;
		decades = [];
		for (let i = lowest; i <= highest; i += scale) {
			decades.push(i);
		}
	}

	function handleMove(e) {
		pos = e.clientY;
		visible = true;
	}
</script>

<svelte:window on:resize={updateGap} />
<div class="timeline-container"  on:keydown>
	<span style="height:{timelineHeight}vh" class="line" />
	<div class="line-components" style={disabled ? "pointer-events: none;" : ""}>
		{#each timeData as td, i (i)}
			<div
				class="lineItem"
				on:keydown
				on:click={handleMove}
				on:click={() => (year.set(getYear(td.start_date)))}
				>
				<div style="top:{getSpacing(td.start_date)}vh">
					<Dot
						eventOne={() => setDetails(td)}
						eventTwo={() => change()}
						isActive={false}>
						<div class="date">{getYear(td.start_date)}</div>
					</Dot>
				</div>
			</div>
		{/each}
		<ul class="timescale" style="height:{timelineHeight}vh;">
			{#each decades as decade}
				<li>{decade}</li>
			{/each}
		</ul>
		<Cursor {pos} {visible} {year} />
	</div>
</div>

<style>
	:root {
		--foot-height: 2px;
	}

	.line {
		border-radius: 25px;
		position: fixed;
		width: 4px;
		left: calc(40px);
		background-color: var(--color-theme-1);
		transition: left 0.5s var(--curve);
	}

	.line::after {
		content: "";
		position: absolute;
		top: 0;
		transform: translateX(-33%);
		width: 16px;
		height: var(--foot-height);
		border-radius: 10rem;
		background-color: var(--color-theme-1);
	}

	.line::before {
		content: "";
		position: absolute;
		bottom: 0;
		transform: translateX(-33%);
		width: 16px;
		height: var(--foot-height);
		border-radius: 10rem;
		background-color: var(--color-theme-1);
	}

	.line-components {
		position: fixed;
		left: 36px;
		transition: left 0.5s var(--curve);
	}

	.timescale {
		font-size: var(--font-size-small);
		user-select: none;
		z-index: -9;
		opacity: 0.66;
		list-style: none;
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: absolute;
		left: 2.5rem;
		padding: 0;
		transition: left 0.5s var(--curve);
	}

	li {
		opacity: 0.8;
		transition: color 0.5s var(--curve);
		cursor: default;
	}

	li:hover {
		opacity: 0.9;
	}

	.lineItem {
		user-select: none;
		display: flex;
		position: absolute;
	}

	.lineItem div {
		padding: none;
		position: relative;
	}

	.date {
		color: var(--color-text);
		user-select: none;
		top: calc(var(--font-size-small) * -0.2);
		font-size: var(--font-size-small);
		left: 0rem;
		opacity: 0;

		transform-origin: center;
		z-index: -2;
		padding: 0 2.5rem 0 2rem;
		transition: all 0.5s var(--curve);
	}

	.timeline-container {
		position: fixed;
		width: calc(var(--font-size-base) * 4);
		opacity: 1;
		left: 0;
		height: 80%;
		border-radius: 0 var(--font-size-large) var(--font-size-large) 0;
	}

	@media (max-width: 1000px) {
		.line {
			left: -2px;
		}
		.timescale {
			left: 1rem;
		}
		.date {
			padding: 0 2.5rem 0 1rem;
		}
		.line-components {
			left: -5px;
		}
	}

	.lineItem:hover .date,
	.lineItem:focus .date,
	.lineItem:active .date {
		cursor: pointer;
		color: var(--color-text); 
		text-shadow: 0 0 15px 14px var(--color-theme-1);
		transform: scale(1.2);
		opacity: 1;
	}
</style>
