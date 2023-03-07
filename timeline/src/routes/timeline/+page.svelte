<script>
	import ItemTransition from "$lib/components/ItemTransition.svelte";
	import TimelineBar from "$lib/components/TimelineBar.svelte";
	import Arrow from "$lib/components/Arrow.svelte";
	import ItemComponents from "$lib/components/ItemComponents.svelte";
	import PageTransitionFade from "$lib/components/PageTransitionFade.svelte";
	import { format } from "date-fns";

	export let data;
	let { timeline } = data;
	$: ({ timeline } = data);

	// makes date readable
	function formatDate(date) {
		if (date.slice(5) == "01-01") {
			return "circa " + date.slice(0, 4);
		}
		date = new Date(date + "T00:00:00");
		if (date == "Invalid Date") {
			return date;
		}
		return format(date, "MMMM d, yyyy");
	}

	let transitionDirection;
	let selectedItem = timeline[0];

	let currentItem = {
		title: selectedItem.title,
		image: selectedItem.image,
		image_credit: selectedItem.image_credit,
		body: selectedItem.body,
		start_date: selectedItem.start_date
	};

	function setComponents() {
		currentItem = {
			title: selectedItem.title,
			image: selectedItem.image,
			image_credit: selectedItem.image_credit,
			body: selectedItem.body,
			start_date: selectedItem.start_date
		};
	}

	let atFirst = true;
	let atLast = false;
	let currentIndex = 0;

	function updateIndex() {
		currentIndex = timeline.indexOf(selectedItem);
	}

	function pageUp() {
		transitionDirection = "up";
		if (!atFirst) {
			selectedItem = timeline[--currentIndex];
			setComponents();
			updateIndex();
			updateAtLast();
			updateAtFirst();
		}
	}

	function pageDown() {
		transitionDirection = "down";
		if (!atLast) {
			selectedItem = timeline[++currentIndex];
			setComponents();
			updateIndex();
			updateAtFirst();
			updateAtLast();
		}
	}

	function updateAtFirst() {
		atFirst = selectedItem == timeline[0];
	}

	function updateAtLast() {
		atLast = selectedItem == timeline[timeline.length - 1];
	}

	let upVisible = false;
	let downVisible = false;

	function showArrows(event) {
		if (window.innerWidth < 1000) {
			upVisible = true;
			downVisible = true;
			return;
		}
		let y = event.clientY;
		let height = window.innerHeight;
		upVisible = y < height * 0.2;
		downVisible = y > height * 0.8;
	}
</script>

<svelte:head>
	<title>Timeline | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Timeline page" />
</svelte:head>

<svelte:window on:mousemove={showArrows} />

<PageTransitionFade>
	<Arrow on:moveUp={pageUp} disabled={atFirst} visible={upVisible} />

	<TimelineBar
		timeData={timeline}
		bind:currentItem={selectedItem}
		on:change={setComponents}
		on:change={updateIndex}
		on:change={updateAtFirst}
		on:change={updateAtLast} />
	{#key selectedItem}
		<section class="layout">
			<ItemTransition direction={transitionDirection}>
				<ItemComponents
					title={currentItem.title}
					media={currentItem.image}
					image_credit={currentItem.image_credit}
					start_date={formatDate(currentItem.start_date)}
					body={currentItem.body} />
			</ItemTransition>
		</section>
	{/key}

	<Arrow down on:moveDown={pageDown} disabled={atLast} visible={downVisible} />
</PageTransitionFade>

<style>
	.layout {
		min-height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: margin-left 0.5s ease;
	}

	@media (max-width: 1000px) {
		.layout {
			margin-left: var(--font-size-medium);
			margin-bottom:10rem;
		}
	}
</style>
