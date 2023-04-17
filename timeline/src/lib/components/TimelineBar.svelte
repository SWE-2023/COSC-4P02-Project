<script>
	import { fade } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	import { tweened } from "svelte/motion";
	import Cursor from "$lib/components/Cursor.svelte";
	import Dot from "$lib/components/Dot.svelte";
	import { cubicOut } from "svelte/easing";
	import { year, firstYear, lastYear, atStart, atEnd } from "$lib/stores/store";
	import { onMount } from "svelte";
	import { mobile, windowHeight } from "$lib/stores/window";
	import Arrow from "./Arrow.svelte";

	export let timeData;
	export let currentItem;
	export let disabled;
	export let direction;

	let dragging = false;
	let startY;
	let tweening;
	let zoom = 1;
	let zoomOffset = 0;
	let isFirefox;
	let isSafari;
	let timelineHeight = 80; // in vh
	let lowest;
	let highest;
	let decadeGap; // values lower than 10 will cause issues
	let decades = [];
	let arrowVisible = true;
	let touchStartPos = 0;

	firstYear.set(getYear(timeData[0].start_date));
	lastYear.set(getYear(timeData[timeData.length - 1].start_date));

	const dispatch = createEventDispatcher();

	const callPageDown = () => dispatch("pagedown");

	const callPageUp = () => dispatch("pageup");

	const change = () => dispatch("change");

	const setDetails = (item) => (currentItem = item);

	$: zoomOffsetTweened = tweened(zoomOffset, {
		duration: 300,
		easing: cubicOut,
		interpolate: (a, b) => (t) => a + (b - a) * t,
	});

	$: getSpacing = (date) => {
		const top = lowest;
		const bottom = highest;
		const percentage = (date - top) / (bottom - top) - $zoomOffsetTweened;
		const spacing = percentage * (timelineHeight - 2) * $zoomTweened;
		return spacing;
	};

	$: $mobile ? (timelineHeight = 70) : (timelineHeight = 80);

	function getYear(date) {
		const y = date.substring(0, 4);
		return parseInt(y);
	}

	let zoomTweened = tweened(zoom, {
		duration: 300,
		easing: cubicOut,
	});

	function handleZoomIn() {
		const newZoom = $zoomTweened + 0.5;
		zoomTweened.set(newZoom);
		tweening = false;
		handleResize();
	}

	function handleZoomOut() {
		const newZoom = $zoomTweened - 0.5;
		if (newZoom < 1) {
			resetZoom();
			return;
		}
		zoomTweened.set(newZoom);
		tweening = false;
		setTimeout(() => {
			handleResize();
		}, 301);
	}

	function resetZoom() {
		zoomTweened.set(1);
		zoomOffsetTweened.set(0);
		tweening = true;
		setTimeout(() => {
			handleResize();
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
		tweening = false;
	}

	function handleTouchStart(e) {
		touchStartPos = e.touches[0].clientX;
	}

	function handleTouchEnd(e) {
		const touchEndX = e.changedTouches[0].clientX;
		const deltaX = touchEndX - touchStartPos;

		if (Math.abs(deltaX) > 100) {
			if (deltaX > 0) {
				direction = "right";
				callPageUp();
			} else {
				direction = "left";
				callPageDown();
			}
		}
	}

	function handleWheel(e) {
		const newZoomOffset = $zoomOffsetTweened + e.deltaY / (500 * $zoomTweened);
		if (newZoomOffset < 0 || newZoomOffset > 1 - 1 / $zoomTweened) return;
		zoomOffsetTweened.set(newZoomOffset);
		tweening = false;
	}

	function handleResize() {
		let timelineHeightInPercentage = timelineHeight * 0.01 * $windowHeight;

		if ($zoomTweened < 1.5) decadeGap = 100 - timelineHeight;
		else if ($zoomTweened < 2.5) decadeGap = (100 - timelineHeight) / 2;
		else if ($zoomTweened < 4) decadeGap = 5;
		else if ($zoomTweened > 7) decadeGap = 1;

		const scale = Math.max(
			decadeGap,
			Math.min(
				timelineHeightInPercentage,
				Math.round((750 - $windowHeight) / 50) * 10
			)
		);
		lowest = Math.floor($firstYear / scale) * scale - 10;
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
		handleResize();
		year.set($firstYear);
		isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
		isSafari =
			navigator.userAgent.toLowerCase().indexOf("safari") > -1 &&
			navigator.userAgent.toLowerCase().indexOf("chrome") === -1;
	});

	handleResize();

	function handleMove() {
		tweening = true;
	}

	function handleDownArrow() {
		if (!$atEnd) {
			direction = "down";
			callPageDown();
		}
	}

	function handleUpArrow() {
		if (!$atStart) {
			direction = "up";
			callPageUp();
		}
	}
</script>

<svelte:window
	on:resize={handleResize}
	on:mouseup={handleDragEnd}
	on:touchstart={handleTouchStart}
	on:touchmove|passive
	on:touchend|passive={handleTouchEnd} />

<div class="arrow-button up">
	<Arrow on:moveup={handleUpArrow} disabled={$atStart} />
</div>
<div class="arrow-button down">
	<Arrow on:movedown={handleDownArrow} down disabled={$atEnd} />
</div>
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
						style="transform:translateY({getSpacing(
							getYear(td.start_date)
						)}vh)">
						<Dot
							eventOne={() => setDetails(td)}
							eventTwo={() => change()}
							year={getYear(td.start_date)} />
					</div>
				</div>
			{/each}
			<Cursor pos={getSpacing($year)} {tweening} />
		</div>
		<ul class="timescale">
			{#each decades as decade, i}
				<li style="transform:translateY({getSpacing(decade)}vh)">
					{decade.toFixed(0)}
				</li>
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
		--anim: 0.33s cubic-bezier(0.13, 0.94, 0.16, 1.15);
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
		height: var(--height);
		position: absolute;
		left: 4.5rem;
		padding: 0;
		transition: left 0.5s var(--curve);
	}

	.timescale li {
		position: absolute;
		padding: 0;
		margin: 0;
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
		width: 9rem;
		opacity: 1;
		z-index: 1;
		left: calc(var(--left) - 40px);
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

	/* arrow buttons */
	.arrow-button {
		position: fixed;
		height: 0;
		margin: 0;
		left: calc(var(--left) + 6em);
		z-index: 4;
		transition: all var(--anim);
	}

	@media (max-width: 1000px) {
		.arrow-button {
			left: calc(var(--left) + 4rem);
		}
	}

	.up {
		top: 5rem;
	}

	.down {
		top: 9rem;
	}

	.up.hidden {
		top: -7rem;
	}

	.down.hidden {
		bottom: -7rem;
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
			width: 6rem;
			background: none;
			box-shadow: none;
			left: 0;
		}
		.btns {
			flex-flow: column;
		}
	}
</style>
