<script>
	import { createEventDispatcher } from "svelte";
	import Dot from "./Dot.svelte";

	export let timeData;
	export let currentItem;

	function year(date) {
		const year = date.substring(0, 4);
		return year;
	}

	for (let i = 0; i < timeData.length; i++) {
		timeData[i].id = year(timeData[i].start_date);
	}

	console.log(timeData)

	const timelineHeight = 80; // in vh
	let scale = 20; // values lower than 10 will cause issues
	let decades = [];
	let lowest = Math.floor(timeData[0].id / scale) * scale; // round down to nearest 20 year
	let highest = Math.ceil(timeData[timeData.length - 1].id / scale) * scale; // round up to nearest 20 year

	for (let i = lowest; i <= highest; i += scale) {
		decades.push(i);
	}

	function getSpacing(id) {
		const top = lowest;
		const bottom = highest;
		const current = id;
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
		lowest = Math.floor(timeData[0].id / scale) * scale;
		highest = Math.ceil(timeData[timeData.length - 1].id / scale) * scale;
		decades = [];
		for (let i = lowest; i <= highest; i += scale) {
			decades.push(i);
		}
	}
</script>

<svelte:window on:resize={updateGap} />

<span style="height:{timelineHeight}vh" class="line" />
<div class="line-components">
	{#each timeData as td, i (i)}
		<div class="lineItem">
			<div style="top:{getSpacing(td.id)}vh">
				<Dot
					eventOne={() => setDetails(td)}
					eventTwo={() => change()}
					isActive={false}>
					<div class="date">{td.id}</div>
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

<style>
	.line {
		position: fixed;
		width: 4px;
		background-color: var(--color-theme-1);
		left: 40px;
		transition: left 0.5s ease-in-out;
	}

	@media (max-width: 1000px) {
		.line {
			left: -2px;
		}
	}

	.line-components {
		position: fixed;
		left: 34px;
		transition: left 0.5s ease-in-out;
	}

	@media (max-width: 1000px) {
		.line-components {
			left: -9px;
		}
	}

	.timescale {
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

	@media (max-width: 1000px) {
		.timescale {
			left: 1.5rem;
		}
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
		top: -2px;
		font-size: 13px;
		left: 0.2rem;
		opacity: 0.5;
		filter: blur(3px);

		transform-origin: center;
		z-index: -2;
		padding: 0 2.5rem 0 2rem;
		transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out,
			color 0.15s ease-in-out, padding 0.5s ease-in-out;
	}

	@media (max-width: 1000px) {
		.date {
			padding: 0 2.5rem 0 1rem;
		}
	}

	.lineItem:hover .date {
		cursor: pointer;
		color: #e0dbd4; /* doesnt change since background is red */
		transform: scale(1.2);
		opacity: 1;
		filter: blur(0px);
		z-index: 111;
	}
</style>
