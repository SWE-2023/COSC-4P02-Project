<script>
	import { fade } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	import { tweened } from "svelte/motion";
	import Cursor from "$lib/components/Cursor.svelte";
	import Dot from "$lib/components/Dot.svelte";
	import { cubicOut } from "svelte/easing";
	import { onMount } from "svelte";
	export let timeData;
	export let currentItem;
	export let disabled;

	let dragging = false;
	let startY;
	let screenHeight = 1080;
	let pos = 100;
	let visible;
	let zoom = 1;
	let zoomOffset = 0;
	let isFirefox;
	let isSafari;
	const timelineHeight = 80; // in vh
	let lowest;
	let highest;
	let decadeGap; // values lower than 10 will cause issues
	let decades = [];

	const dispatch = createEventDispatcher();
	const change = () => dispatch("change");
	const setDetails = (item) => (currentItem = item);

	let zoomTweened = tweened(zoom, {
		duration: 300,
		easing: cubicOut,
	});
	$: zoomOffsetTweened = tweened(zoomOffset, {
		duration: 300,
		easing: cubicOut,
	});

	function getYear(date) {
		const year = date.substring(0, 4);
		return parseInt(year);
	}

	const year = tweened(decades[0], {
		duration: 500,
		easing: cubicOut,
	});

	$: getSpacing = (date) => {
		const top = lowest;
		const bottom = highest;
		const current = getYear(date);
		const percentage = (current - top) / (bottom - top) - $zoomOffsetTweened;
		const spacing = percentage * (timelineHeight - 2) * $zoomTweened;
		return spacing;
	};

	$: timescaleStyle = `height:${
		timelineHeight * $zoomTweened
	}vh; transform: translateY(-${$zoomOffsetTweened * 100}%)`;

	function handleZoomIn() {
		const newZoom = $zoomTweened + 0.5;
		zoomTweened.set(newZoom);
		visible = false;
		updateGap();
	}

	function handleZoomOut() {
		const newZoom = $zoomTweened - 0.5;
		if (newZoom < 1) {
			resetZoom();
			return;
		}
		zoomTweened.set(newZoom);
		visible = false;
		setTimeout(() => {
			updateGap();
		}, 301);
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

	function handleDragStart(e) {
		startY = e.touches ? e.touches[0].clientY : e.clientY;
		dragging = true;
	}

	function handleDragEnd() {
		dragging = false;
	}

	function handleDragMove(e) {
		if (!dragging) return;
		const currentY = e.touches ? e.touches[0].clientY : e.clientY;
		const deltaY = (startY - currentY) / (100 * $zoomTweened);
		const newZoomOffset = $zoomOffsetTweened + deltaY;
		if (newZoomOffset < 0 || newZoomOffset > 1 - 1 / $zoomTweened) return;
		zoomOffsetTweened.set(newZoomOffset);
		startY = currentY;
		visible = false;
	}

	function handleWheel(e) {
		const newZoomOffset = $zoomOffsetTweened + e.deltaY / (500 * $zoomTweened);
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
		lowest = Math.floor(getYear(timeData[0].start_date) / scale) * scale - 10;
		highest =
			Math.ceil(getYear(timeData[timeData.length - 1].start_date) / scale) *
				scale +
			10;

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
		isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
		isSafari =
			navigator.userAgent.toLowerCase().indexOf("safari") > -1 &&
			navigator.userAgent.toLowerCase().indexOf("chrome") === -1;
	});
	updateGap();

</script>

<svelte:window bind:innerHeight={screenHeight} on:resize={updateGap} on:mouseup={handleDragEnd} />

<div
	in:fade
	class="timeline-container"
	on:wheel|preventDefault={handleWheel}
	on:dblclick={handleZoomIn}
	on:mousedown={handleDragStart}
	on:mousemove={handleDragMove}
	on:mouseup={handleDragEnd}
	on:touchstart|passive={handleDragStart}
	on:touchmove|passive={handleDragMove}
	on:touchend={handleDragEnd}>
	<div>
		<span style="height:{timelineHeight}vh" class="line" />
		<div
			class={disabled ? "line-components disabled" : "line-components"}
			style={isFirefox || isSafari
				? "--left-offset:-2px"
				: "--left-offset:0px"}>
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
			<Cursor {pos} {visible} {year} />
		</div>
		<ul class="timescale" style={timescaleStyle}>
			{#each decades as decade, i}
				<li>{decade}</li>
			{/each}
		</ul>
	</div>
</div>
<button class="reset" on:click={resetZoom}
	><span class="material-symbols-rounded i">refresh</span>
</button>
<button class="zoom-out" on:click={handleZoomOut}
	><span class="material-symbols-rounded i">remove</span>
</button>
<button class="zoom-in" on:click={handleZoomIn}
	><span class="material-symbols-rounded i">add</span>
</button>

<style>
	:root {
		--foot-height: 2px;
		--left: 20px;
	}

	.line {
		border-radius: 25px;
		position: fixed;
		width: 4px;
		left: var(--left);
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
		user-select: none;
		position: relative;
		left: calc(20px - var(--left-offset));
		transition: left 0.5s var(--curve);
	}

	.disabled {
		pointer-events: none;
	}

	.dot {
		position: relative;
		z-index: 1;
	}

	.dot:hover {
		z-index: 2;
	}

	.timescale {
		font-size: var(--font-size-small);
		user-select: none;
		z-index: -1;
		opacity: 0.66;
		list-style: none;
		margin: 0;
		display: flex;
		height: 80vh;
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
		cursor: grab;
		user-select: none;
		-webkit-user-select: none;
		position: fixed;
		width: calc(var(--font-size-base) * 8);
		opacity: 1;
		z-index: 1;
		left: calc(var(--left) - 2.1 * var(--font-size-base));
		overflow: hidden;
		background: var(--color-bg-1);
		box-shadow: inset 0 0 1rem 0px #00000015;
		border-radius: 0 1.5rem 1.5rem 0;
		height: 80%;
	}

	.timeline-container:active {
		cursor: grabbing;
	}

	button {
		position: fixed;
		bottom: 0;
		left: 0;
		margin: 0.5vw;
		cursor: pointer;
		background: none;
		border: none;
		color: var(--color-theme-1);
		font-size: var(--font-size-base);
		transition: all 0.5s var(--curve);
	}

	.zoom-out {
		left: 3rem;
	}

	.zoom-in {
		left: 6rem;
	}

	.i {
		user-select: none;
		transition: transform 0.5s var(--curve);
	}

	.reset .i:hover {
		color: var(--color-theme-1-light);
		animation: rotate 1s forwards var(--curve);
	}

	.zoom-in .i:hover,
	.zoom-out .i:hover {
		color: var(--color-theme-1-light);
	}

	.i:active,
	.i:focus {
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
			left: var(--left);
		}
		.line-components {
			left: calc(-1.4rem - var(--left-offset));
		}
		.timeline-container {
			width: calc(var(--font-size-base) * 4);
			background: none;
			box-shadow: none;
			left: 0;
		}
		button {
			margin: 0.5vw;
		}
		.zoom-out {
			left: 2rem;
		}
		.zoom-in {
			left: 4rem;
		}
	}
</style>
