<script>
	import { afterUpdate } from "svelte";
	import TimelineBar from "../../components/TimelineBar.svelte";
	import { timeDataTemp } from "../../lib/timeDataTemp.js";
	import Arrow from "../../components/Arrow.svelte";
	import ItemComponents from "../../components/ItemComponents.svelte";

	let timeData = timeDataTemp;

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
		if (!atFirst) {
			selectedItem = timeData[currentIndex - 1];
			setComponents();
			updateIndex();
			updateAtLast();
			updateAtFirst();
		}
	}
	function pageDown() {
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

	let isInitialLoad = true;

	const addFadeInClass = () => {
		if (isInitialLoad) {
			isInitialLoad = false;
			setTimeout(() => {
				timelineContainerClass += " fade-in";
			}, 300);
		}
	};

	let timelineContainerClass = "timeline-container";
	$: addFadeInClass();

	afterUpdate(() => {
		addFadeInClass();
	});
</script>

<svelte:head>
	<title>Timeline | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Timeline page" />
</svelte:head>

<Arrow alt={false} on:moveUp={pageUp} />

<section class={timelineContainerClass}>
	<TimelineBar
		item={selectedItem}
		bind:currentItem={selectedItem}
		on:change={setComponents}
		on:change={updateIndex}
		on:change={updateAtFirst}
		on:change={updateAtLast} 
		/>

	<section class="layout">
		<ItemComponents
			title={currentTitle}
			image={currentImage}
			image_credit={currentImage_credit}
			body={currentBody}
			start_date={currentStart_date} />
	</section>

	<Arrow alt={true} on:moveDown={pageDown} />
</section>

<style>
	.layout {
		min-height: 72vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.timeline-container {
		opacity: 0;
	}

	.fade-in {
		opacity: 0;
		animation: fadeInAnimation ease-in-out 2s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	@keyframes fadeInAnimation {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
