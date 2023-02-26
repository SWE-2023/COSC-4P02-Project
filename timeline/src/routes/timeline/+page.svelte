<script>
	import { timeDataTemp } from "../../lib/timeDataTemp.js";
	import { slide, fade, blur, fly, scale } from "svelte/transition";
	import ItemTransition from "../../components/ItemTransition.svelte";
	import TimelineBar from "../../components/TimelineBar.svelte";
	import Arrow from "../../components/Arrow.svelte";
	import ItemComponents from "../../components/ItemComponents.svelte";
	import PageTransitionFade from "../../components/PageTransitionFade.svelte";

	let timeData = timeDataTemp;
	let transitionDirection;

	let selectedItem = timeData[0];
	let currentTitle = timeData[0].title;
	let currentImage = timeData[0].image;
	let currentImage_credit = timeData[0].image_credit;
	let currentBody = timeData[0].body;
	let currentStart_date = timeData[0].start_date;

	function setComponents() {
		currentTitle = selectedItem.title;
		currentImage = selectedItem.image;
		currentImage_credit = selectedItem.image_credit;
		currentBody = selectedItem.body;
		currentStart_date = selectedItem.start_date;
	}

	let atFirst = true;
	let atLast = false;
	let currentIndex = 0;

	function updateIndex() {
		currentIndex = timeData.indexOf(selectedItem);
	}

	function pageUp() {
		transitionDirection = "up";
		if (!atFirst) {
			selectedItem = timeData[currentIndex - 1];
			setComponents();
			updateIndex();
			updateAtLast();
			updateAtFirst();
		}
	}
	function pageDown() {
		transitionDirection = "down";
		if (!atLast) {
			selectedItem = timeData[currentIndex + 1];
			setComponents();
			updateIndex();
			updateAtFirst();
			updateAtLast();
		}
	}

	function updateAtFirst() {
		if (selectedItem == timeData[0]) {
			atFirst = true;
		} else {
			atFirst = false;
		}
	}

	function updateAtLast() {
		if (selectedItem == timeData[timeData.length - 1]) {
			atLast = true;
		} else {
			atLast = false;
		}
	}
</script>

<svelte:head>
	<title>Timeline | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Timeline page" />
</svelte:head>

<PageTransitionFade>
	<Arrow on:moveUp={pageUp} disabled={atFirst}/>

	<TimelineBar
		item={selectedItem}
		bind:currentItem={selectedItem}
		on:change={setComponents}
		on:change={updateIndex}
		on:change={updateAtFirst}
		on:change={updateAtLast} />
		{#key selectedItem.id}
		<section class="layout">
			<ItemTransition direction={transitionDirection}>
				<ItemComponents
					title={currentTitle}
					image={currentImage}
					image_credit={currentImage_credit}
					body={currentBody}
					start_date={currentStart_date} />
			</ItemTransition>
		</section>
		{/key}

	<Arrow down on:moveDown={pageDown} disabled={atLast} />
</PageTransitionFade>

<style>
	.layout {
		min-height: 72vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
