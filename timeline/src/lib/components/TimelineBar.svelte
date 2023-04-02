<script>
	import { createEventDispatcher } from "svelte";
	import { tweened } from "svelte/motion";
	import Cursor from "$lib/components/Cursor.svelte";
	import Dot from "$lib/components/Dot.svelte";
	import { cubicOut } from "svelte/easing";
	import { onMount } from "svelte";
	export let timeData;
	export let currentItem;
	export let disabled;

	let screenHeight = 0;
	let pos = 100;
	let visible;
	let zoom = 1;
	let zoomTweened = tweened(zoom, {
		duration: 300,
		easing: cubicOut,
	});
	let zoomOffset = 0;
	$: zoomOffsetTweened = tweened(zoomOffset, {
		duration: 300,
		easing: cubicOut,
	});

	function getYear(date) {
		const year = date.substring(0, 4);
		return parseInt(year);
	}

	const timelineHeight = 80; // in vh
	let decadeGap = 20; // values lower than 10 will cause issues
	let decades = [];
	let lowest = Math.floor(getYear(timeData[0].start_date) / decadeGap) * decadeGap; // round down to nearest 20 year
	let highest =
		Math.ceil(getYear(timeData[timeData.length - 1].start_date) / decadeGap) *
		decadeGap; // round up to nearest 20 year

	for (let i = lowest; i <= highest; i += decadeGap) {
		decades.push(i);
	}

	const year = tweened(decades[0], {
		duration: 600,
		easing: cubicOut,
	});

	$: getSpacing = (date) => {
		const top = lowest;
		const bottom = highest;
		const current = getYear(date);
		const percentage = (current - top) / (bottom - top) - $zoomOffsetTweened;
		const spacing = $zoomTweened * percentage * (timelineHeight - 2);
		return spacing;
	};

	$: timescaleStyle = `height:${
		timelineHeight * $zoomTweened
	}vh; transform: translateY(-${$zoomOffsetTweened * 100}%)`;

	const dispatch = createEventDispatcher();
	const change = () => dispatch("change");
	const setDetails = (item) => (currentItem = item);

	function handleZoomIn() {
		const newZoom = $zoomTweened + 0.5;
		zoomTweened.set(newZoom);
		visible = false;
		updateGap();
	}

	function resetZoom() {
		zoomTweened.set(1);
		zoomOffsetTweened.set(0);
		pos = 100;
		year.set(decades[0]);
		visible = true;
		setTimeout(() => {
			updateGap();
		}, 301);
	}

	function handleWheel(e) {
		e.preventDefault();
		const newZoomOffset = $zoomOffsetTweened + e.deltaY / (500 * $zoomTweened)
		if (newZoomOffset < 0 || newZoomOffset > 1 - 1 / $zoomTweened) return;
		zoomOffsetTweened.set(newZoomOffset);
		visible = false;
	}

	function updateGap() {
		if ($zoomTweened < 1.5) decadeGap = 20;
		else if ($zoomTweened < 2.5) decadeGap = 10;
		else decadeGap = 5;
		const scale = Math.max(
			decadeGap,
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
		visible = true;
		pos = e.clientY;
	}
	
	onMount(() => {
		screenHeight = innerHeight;
		updateGap();
	});
</script>

<svelte:window on:resize={updateGap} />

<div
	class="timeline-container"
	on:wheel={handleWheel}
	on:dblclick={handleZoomIn}>
	<div>
		<span style="height:{timelineHeight}vh" class="line" />
		<div
			class="line-components"
			style={disabled ? "pointer-events: none;" : ""}>
			{#each timeData as td, i (i)}
				<div
					class="lineItem"
					on:keydown
					on:click={handleMove}
					on:click={() => year.set(getYear(td.start_date))}>
					<div
						class="dot"
						style="transform:translateY({getSpacing(td.start_date)}vh)">
						<Dot
							eventOne={() => setDetails(td)}
							eventTwo={() => change()}
							year={getYear(td.start_date)} />
					</div>
				</div>
			{/each}
			<Cursor {pos} {visible} {year}/>
		</div>
		<ul class="timescale" style={timescaleStyle}>
			{#each decades as decade}
				<li>{decade}</li>
			{/each}
		</ul>
	</div>
	<button class="reset" on:click={resetZoom}
		><span class="material-symbols-rounded i">refresh</span></button>
	<button class="zoom-in" on:click={handleZoomIn}
		><span class="material-symbols-rounded i">add</span></button>
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
		position: relative;
		left: 20px;
		transition: left 0.5s var(--curve);
	}

	.dot {
		position: relative;
		z-index: -1;
	}

	.dot:hover {
		z-index: 1;
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
		left: calc(3.75 * var(--font-size-base));
		padding: 0;
		transition: left 0.5s var(--curve);
	}

	::marker {
		content: "—   ";
		color: var(--color-bg-2);
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

	.timeline-container {
		position: fixed;
		width: calc(var(--font-size-base) * 8);
		opacity: 1;
		left: 0;
		overflow: hidden;

		height: 80%;
	}

	button {
		position: fixed;
		bottom: 0;
		left: 0;
		margin: 1.5rem;
		cursor: pointer;
		background: none;
		border: none;
		color: var(--color-theme-1);
		font-size: var(--font-size-base);
		transition: all 0.5s var(--curve);
	}

	.zoom-in {
		left: 3rem;
	}


	.i {
		user-select:none;
		transition: transform 0.5s var(--curve);
	}

	.reset .i:hover {
		color: var(--color-theme-1-light);
		animation: rotate 1s forwards var(--curve);
	}

	.zoom-in .i:hover {
		color: var(--color-theme-1-light);
	}

	.i:active, .i:focus {
		transform: scale(0.9);
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 1000px) {
		.line {
			left: -2px;
		}
		.timescale {
			left: 1rem;
		}
		.line-components {
			left: -1.4rem;
		}
		button {
			margin: 0.25rem;
		}
		.zoom-in {
			left: 2rem;
		}
	}
</style>
