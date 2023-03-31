
<script>
	import { createEventDispatcher } from "svelte";
	import Cursor from "$lib/components/Cursor.svelte";
	import Dot from "$lib/components/Dot.svelte";
	export let timeData;
	export let currentItem;
	export let disabled;
	let yPos = 0;

	function year(date) {
		const year = date.substring(0, 4);
		return year;
	}

	const timelineHeight = 80; // in vh
	let scale = 20; // values lower than 10 will cause issues
	let decades = [];
	let lowest = Math.floor(year(timeData[0].start_date) / scale) * scale; // round down to nearest 20 year
	let highest = Math.ceil(year(timeData[timeData.length - 1].start_date) / scale) * scale; // round up to nearest 20 year

	for (let i = lowest; i <= highest; i += scale) {
		decades.push(i);
	}

	function getSpacing(date) {
		const top = lowest;
		const bottom = highest;
		const current = year(date);
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
		lowest = Math.floor(year(timeData[0].start_date) / scale) * scale;
		highest = Math.ceil(year(timeData[timeData.length - 1].start_date) / scale) * scale;
		decades = [];
		for (let i = lowest; i <= highest; i += scale) {
			decades.push(i);
		}
	}

</script>

<svelte:window on:resize={updateGap} />

	<div class="timeline-container" on:mousemove={(e) => (yPos = e.clientY)}>
	<span style="height:{timelineHeight}vh" class="line" />
		<div class="line-components" style={disabled ? "pointer-events: none;" : ""} >
		<Cursor pos={yPos} />
			{#each timeData as td, i (i)}
				<div class="lineItem">
					<div style="top:{getSpacing(td.start_date)}vh">
						<Dot
							eventOne={() => setDetails(td)}
							eventTwo={() => change()}
							isActive={false}>
							<div class="date">{year(td.start_date)}</div>
						</Dot>
					</div>
				</div>
			{/each}
			<ul class="timescale" style="height:{timelineHeight}vh;">
				{#each decades as decade}
					<li>{decade}</li>
				{/each}
			</ul>
		</div>
</div>

<style>
	.line {
		border-radius: 25px;
		position: fixed;
		width: 4px;
		background-color: var(--color-theme-1);
		left: 40px;
		transition: left 0.5s ease-in-out;
	}

	.line-components {
		position: fixed;
		left: 36px;
		transition: left 0.5s ease-in-out;
	}

	.timescale {
		font-size: var(--font-size-small);
		user-select: none;
		z-index: -9;
		opacity: 1;
		list-style: none;
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: absolute;
		left: 2.5rem;
		padding: 0;
		transition: left 0.5s ease-in-out;
	}

	li {
		opacity: 0.8;
		transition: color 0.5s ease;
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
		left: 0.2rem;
		opacity: 0;

		transform-origin: center;
		z-index: -2;
		padding: 0 2.5rem 0 2rem;
		transition: all 0.15s ease-in-out;
	}

	.timeline-container {
		z-index:999;
		position: fixed;
		width:10rem;
		/* background:red; */
		opacity:1;
		left:0;
		height:100%;
	}

	@media (max-width: 1000px) {
		.line {
			left: -2px;
		}
		.timescale {
			left: 1.5rem;
		}
		.date {
			padding: 0 2.5rem 0 1rem;
		}
		.line-components {
			left: -5px;
		}
	}

	.lineItem:hover .date,
	.lineItem:focus-within .date,
	.lineItem:focus .date,
	.lineItem:active .date {
		cursor: pointer;
		color: #e0dbd4; /* doesnt change since background is red */
		transform: scale(1.2);
		opacity: 1;
		top: 0;
		z-index: 111;
	}
</style>
