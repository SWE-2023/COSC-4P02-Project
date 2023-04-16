<script>
	import { fade } from "svelte/transition";
	import { writable } from "svelte/store";
	import { createEventDispatcher } from "svelte";
	import { tweened } from "svelte/motion";
	import Cursor from "$lib/components/Cursor.svelte";
	import Dot from "$lib/components/Dot.svelte";
	import { cubicOut } from "svelte/easing";
	import { onMount } from "svelte";
	import { windowWidth, windowHeight } from "$lib/stores/window";

	export let timeData;
	export let currentItem;
	export let disabled;

	let dragging = false;
	let startY;
	let pos = 100;
	let visible;
	let zoom = 1;
	let zoomOffset = 0;
	let isFirefox;
	let isSafari;
	let timelineHeight = 80; // in vh
	let lowest;
	let highest;
	let decadeGap; // values lower than 10 will cause issues
	let decades = [];

	const dispatch = createEventDispatcher();
	const change = () => dispatch("change");
	export function callHandleIndexChange(newIndex, direction = 1) {
		dispatch("indexchange", { newIndex, direction });
	}
	const setDetails = (item) => (currentItem = item);

	let animationInProgress = false;
	let sameYearIndex = 0;
	const currentIndex = writable(-1);

	let zoomTweened = tweened(zoom, {
		duration: 300,
		easing: cubicOut,
	});

	$: zoomOffsetTweened = tweened(zoomOffset, {
		duration: 300,
		easing: cubicOut,
		interpolate: (a, b) => (t) => a + (b - a) * t,
	});

	function getYear(date) {
		const year = date.substring(0, 4);
		return parseInt(year);
	}

	const year = tweened(decades[0], {
		duration: 200,
		easing: cubicOut,
		interpolate: (a, b) => (t) => a + (b - a) * t,
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
		const deltaY = (startY - currentY) / (50 * $zoomTweened);
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

	function updateHeight() {
		if ($windowWidth < 1000) {
			timelineHeight = 70;
		} else {
			timelineHeight = 80;
		}
	}

	function updateGap() {
		updateHeight();
		let timelineHeightInPercentage = timelineHeight * 0.01 * $windowHeight;

		if ($zoomTweened < 1.5) decadeGap = 100 - timelineHeight;
		else if ($zoomTweened < 2.5) decadeGap = (100 - timelineHeight) / 2;
		else decadeGap = 5;

		const scale = Math.max(
			decadeGap,
			Math.min(
				timelineHeightInPercentage,
				Math.round((750 - $windowHeight) / 50) * 10
			)
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

	onMount(() => {
		updateHeight();
		isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
		isSafari =
			navigator.userAgent.toLowerCase().indexOf("safari") > -1 &&
			navigator.userAgent.toLowerCase().indexOf("chrome") === -1;
	});
	updateGap();

	function handleMove(e) {
		visible = true;
		if ($windowHeight > 500) {
			const { closestY, closestIndex } = findClosestLineItemY(e.clientY);
			pos = closestY;
			currentIndex.set(closestIndex);
		} else {
			pos = e.clientY;
		}
	}

	function findClosestLineItemY(currentY) {
		let closestY;
		let minDiff = Infinity;
		let closestIndex;

		timeData.forEach((td, index) => {
			const itemYPosition =
				getSpacing(td.start_date) * 0.01 * $windowHeight +
				0.125 * $windowHeight;
			const diff = Math.abs(currentY - itemYPosition);
			if (diff < minDiff) {
				minDiff = diff;
				closestY = itemYPosition;
				closestIndex = index;
			}
		});

		return { closestY: Number(closestY), closestIndex };
	}

	function handleKeyPress(e) {
		if (animationInProgress) return;
		if (e.key === "ArrowUp") {
			handleIndexChange($currentIndex - 1, -1);
		} else if (e.key === "ArrowDown") {
			handleIndexChange($currentIndex + 1, 1);
		}
	}

	function handleIndexChange(newIndex, direction = 1) {
		if (newIndex >= 0 && newIndex < timeData.length) {
			animationInProgress = true;
			setTimeout(() => {
				animationInProgress = false;
			}, 250);

			const newYear = getYear(timeData[newIndex].start_date);

			if (newYear === $year) {
				const sameYearEvents = timeData
					.map((td, i) => ({ index: i, year: getYear(td.start_date) }))
					.filter(({ year }) => year === newYear);

				if (direction > 0) {
					sameYearIndex = (sameYearIndex + 1) % sameYearEvents.length;
				} else {
					sameYearIndex =
						(sameYearIndex - 1 + sameYearEvents.length) % sameYearEvents.length;
				}
				newIndex = sameYearEvents[sameYearIndex].index;
			} else {
				sameYearIndex = 0;
				year.set(newYear);
			}

			currentIndex.set(newIndex);

			const itemYPosition = getSpacing(timeData[newIndex].start_date);
			pos = itemYPosition * 0.01 * $windowHeight + 0.125 * $windowHeight;
		}
	}
</script>

<svelte:window on:resize={updateGap} on:mouseup={handleDragEnd} on:keydown={handleKeyPress}/>

<div
	style="--height:{timelineHeight}vh"
	in:fade
	class="timeline-container"
	on:wheel|preventDefault={handleWheel}
	on:dblclick={handleZoomIn}
	on:mousedown={handleDragStart}
	on:mousemove={handleDragMove}
	on:mouseup={handleDragEnd}
	on:touchstart|passive={handleDragStart}
	on:touchmove|preventDefault={handleDragMove}
	on:touchend={handleDragEnd}>
	<div>
		<span class="line" />
		<div
			class={disabled ? "line-components disabled" : "line-components"}
			style={isFirefox || isSafari
				? "--left-offset:-2px"
				: "--left-offset:0px"}>
			{#each timeData as td, i}
				<div
					on:keyup
					data-year={getYear(td.start_date)}
					class="lineItem"
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
			<Cursor bind:pos {visible} {year} />
		</div>
		<ul class="timescale" style={timescaleStyle}>
			{#each decades as decade, i}
				<li>{decade}</li>
			{/each}
		</ul>
	</div>
</div>
<div class="btns">
	<button class="reset" on:click={resetZoom} title="Reset Zoom"
		><span class="material-symbols-rounded i">refresh</span>
	</button>
	<button class="zoom-out" on:click={handleZoomOut} title="Zoom Out"
		><span class="material-symbols-rounded i">remove</span>
	</button>
	<button class="zoom-in" on:click={handleZoomIn} title="Zoom In"
		><span class="material-symbols-rounded i">add</span>
	</button>
</div>

<style>
	:root {
		--foot-height: 2px;
		--left: 20px;
		--height: 80vh;
	}

	div:focus {
		outline: none !important;
		border: none !important;
	}

	.line {
		border-radius: 25px;
		height: var(--height);
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
		height: var(--height);
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
		height: var(--height);
	}

	.timeline-container:active {
		cursor: grabbing;
	}

	.i {
		user-select: none;
		transition: transform 0.5s var(--curve);
	}

	.reset .i:hover {
		animation: rotate 1s forwards var(--curve);
	}

	.i:active,
	.i:focus {
		transform: scale(0.9);
	}

	.btns {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		flex-flow: row;
		margin: 0.5rem;
		gap: 5px;
		z-index: 99;
	}

	button {
		cursor: pointer;
		background: var(--color-bg-1);
		user-select: none;
		color: var(--color-theme-1);
		line-height: 0;
		height: calc((var(--font-size-base) * 1) + 1rem);
		width: calc(var(--font-size-base) * 1 + 1rem);
		margin: 0;
		padding: 0;
		justify-self: center;
		filter: invert(0.1);
		border-radius: 100rem;
		border: var(--border);
		font-weight: 900;
		transition: all 0.5s var(--curve);
	}

	button:hover {
		filter: invert(0.2);
	}

	button:active {
		filter: invert(0.3);
		scale: 0.95;
		transition: none;
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
		:root {
			--left: 4px;
		}
		.line {
			left: var(--left);
		}
		.timescale {
			left: calc(5 * var(--left));
		}
		.line-components {
			left: calc((var(--left) - 20px) - var(--left-offset));
		}
		.timeline-container {
			width: calc(var(--font-size-base) * 4);
			background: none;
			box-shadow: none;
			left: 0;
		}
		.btns {
			flex-flow: column;
		}
	}
</style>
