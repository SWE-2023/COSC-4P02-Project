<script>
	import { windowWidth } from "$lib/stores/window.js";
	import { direction, mode } from "$lib/stores/store.js";
	import ItemTransition from "$lib/components/ItemTransition.svelte";
	import TimelineBar from "$lib/components/TimelineBar.svelte";
	import SearchBar from "$lib/components/searchbar/SearchBar.svelte";
	import ItemComponents from "$lib/components/ItemComponents.svelte";
	import PageTransitionFade from "$lib/components/PageTransitionFade.svelte";
	import EventEdit from "$lib/components/EventEdit.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import supabase from "$lib/supabaseClient.js";
	import { tweened } from "svelte/motion";
	import { year, atStart, atEnd, showModal } from "$lib/stores/store.js";
	import { currentItemIndexStore } from "$lib/stores/store.js";
	import { onMount } from "svelte";
	import { quintOut } from "svelte/easing";
	import { writable } from "svelte/store";

	export let data;
	let { timeline } = data;

	// map timeline titles and years to searchData
	let searchData = [];
	$: {
		searchData = timeline.map((item) => {
			return {
				title: item.title,
				year: item.start_date.slice(0, 4),
			};
		});
	}

	let itemIndex = 0;
	currentItemIndexStore.subscribe((value) => {
		itemIndex = value;
	});

	let dropDownSelection = "";
	let selectedItem = timeline[0];

	let currentIndex = 0;
	let edit = {
		title: selectedItem.title,
		media: selectedItem.image,
		image_credit: selectedItem.image_credit,
		start_date: selectedItem.start_date,
		body: selectedItem.body,
	};

	$: if (selectedItem) {
		edit = {
			title: selectedItem.title,
			media: selectedItem.image,
			image_credit: selectedItem.image_credit,
			start_date: selectedItem.start_date,
			body: selectedItem.body,
		};
	}

	let add = {
		title: "",
		media: "",
		image_credit: "",
		start_date: "",
		body: "",
	};

	let currentItem = {
		title: selectedItem.title,
		image: selectedItem.image,
		image_credit: selectedItem.image_credit,
		body: selectedItem.body,
		start_date: selectedItem.start_date,
	};

	let timelineBar;

	let touchStartX = 0;
	let touchEndX = 0;
	let touchDeltaX = 0;

	const itemTranslateX = tweened(0, {
		duration: 300,
		easing: quintOut,
	});

	const opacity = writable(1);

	$: atStart.set(currentIndex == 0);
	$: atEnd.set(currentIndex == timeline.length - 1);

	function pageDown() {
		selectedItem = timeline[++currentIndex];
		update();
	}

	function pageUp() {
		selectedItem = timeline[--currentIndex];
		update();
	}

	async function update() {
		year.set(parseInt(selectedItem.start_date.slice(0, 4)));
		currentItem = {
			title: selectedItem.title,
			image: selectedItem.image,
			image_credit: selectedItem.image_credit,
			body: selectedItem.body,
			start_date: selectedItem.start_date,
		};

		currentIndex = timeline.indexOf(selectedItem);
		currentItemIndexStore.set(currentIndex);
	}

	function gotoItem() {
		let item = timeline.find((item) => item.title == dropDownSelection);
		if (item) {
			selectedItem = item;
			if (timeline.indexOf(selectedItem) > currentIndex) {
				$direction = "down";
			} else if (timeline.indexOf(selectedItem) < currentIndex) {
				$direction = "up";
			}
			update();
		}
	}

	$: add = {
		title: "",
		media: "",
		image_credit: "",
		start_date: "",
		body: "",
	};

	function handleAdd() {
		selectedItem = timeline[0];
		update();
		$mode = "add";
	}

	function handleDelete() {
		if (timeline.length >= 1) {
			selectedItem = timeline[0];
			update();
			$mode = "default";
		}
	}

	async function fetchTimelineData() {
		const { data } = await supabase
			.from("timeline")
			.select("id, title, image, image_credit, body, start_date")
			.order("start_date");
		if (data) {
			timeline = data;
			update();
		}
	}

	function handleTouchStart(event) {
		if (
			event.touches[0].clientX < 128 ||
			event.touches[0].clientY < 128 ||
			$mode !== "default"
		)
			return;
		touchStartX = event.touches[0].clientX;
	}

	function handleTouchMove(event) {
		if (
			event.touches[0].clientX < 128 ||
			event.touches[0].clientY < 128 ||
			$mode !== "default"
		)
			return;
		touchEndX = event.touches[0].clientX;
		if (Math.abs(touchEndX - touchStartX) < 60) return;
		touchDeltaX = touchEndX - touchStartX;
		itemTranslateX.set(touchDeltaX);
		opacity.set(1 - Math.abs(touchDeltaX) / 750);
	}

	async function handleTouchEnd() {
		if (Math.abs(touchDeltaX) > 60) {
			if (touchDeltaX > 100) {
				if (!$atStart) {
					$direction = "none";
					await pageUp();
					$opacity = 0;
					$itemTranslateX = -250;
				}
			} else if (touchDeltaX < -100) {
				if (!$atEnd) {
					$direction = "none";
					await pageDown();
					$opacity = 0;
					$itemTranslateX = 250;
				}
			}
			sleep(250).then(() => {
				resetSwipe();
			});
		}
	}

	const sleep = (milliseconds) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};

	function resetSwipe() {
		touchDeltaX = 0;
		$opacity = 1;
		$itemTranslateX = 0;
	}

	onMount(async () => {
		const firstVisit = localStorage.getItem("firstVisit");

		if (!firstVisit) {
			$showModal = true;
			localStorage.setItem("firstVisit", "false");
		}

		const timelineChannel = supabase
			.channel("custom-all-channel")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "timeline" },
				() => {
					fetchTimelineData();
				}
			)
			.subscribe();

		if (timeline.length > 0 && itemIndex !== 0) {
			currentIndex = itemIndex;
			selectedItem = timeline[itemIndex];
			update();
		}

		return () => {
			supabase.removeChannel(timelineChannel);
		};
	});
</script>

<svelte:head>
	<title>Timeline | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Timeline page" />
</svelte:head>

<svelte:window
	on:touchend={handleTouchEnd}
	on:touchmove|passive={handleTouchMove} />

<Modal>
	<h2 slot="header"><b>Timeline Quick Start Guide</b></h2>
	<p>
		Welcome! This guide provides an overview of key features to help you
		navigate and explore the timeline with ease.
	</p>
	<h3>
		Timeline <span class="material-symbols-rounded r rotate-90">commit</span>
	</h3>
	<ul>
		<li>
			Click on timeline items <span class="material-symbols-rounded i rotate-90"
				>commit</span> in the left column to view it.
		</li>
		<li>
			Click the <span class="material-symbols-rounded i">add</span> button or double-click
			to zoom in the timeline.
		</li>
		<li>
			Click the <span class="material-symbols-rounded i">remove</span> button to
			zoom out the timeline bar, and
			<span class="material-symbols-rounded i">refresh</span> to reset both zoom
			and position.
		</li>
		<li>
			Once zoomed in, click and drag or scroll on the timeline to move up or
			down.
		</li>
	</ul>
	<h3>Search Bar <span class="material-symbols-rounded r">search</span></h3>
	<ul>
		<li>
			Click on the search bar or hit <code>'/'</code> and type in a keyword or year
			to search for a timeline item.
		</li>
		<li>Click on the timeline item in the search results to navigate to it.</li>
		<li>
			Click on the <span class="material-symbols-rounded i">close</span> button to
			clear the search bar.
		</li>
	</ul>
	<h3>Navigation Buttons</h3>
	<ul>
		<li>
			<span class="material-symbols-rounded r">smartphone</span>
			<b> Mobile &mdash; </b>
			Swipe <span class="material-symbols-rounded i">swipe</span> left or right to
			navigate through timeline items.
		</li>
		<li>
			<span class="material-symbols-rounded r">mouse</span>
			<b> Mouse &mdash; </b>
			Click on the
			<span class="material-symbols-rounded i">keyboard_arrow_up</span>/<span
				class="material-symbols-rounded i">keyboard_arrow_down</span> floating buttons
			at the top and bottom of the screen to navigate up or down through timeline
			items.
		</li>
		<li>
			<span class="material-symbols-rounded r">keyboard_alt</span>
			<b> Keyboard &mdash;</b>
			Press<span class="material-symbols-rounded i">keyboard_arrow_up</span
			>/<span class="material-symbols-rounded i">keyboard_arrow_left</span>
			or
			<span class="material-symbols-rounded i">keyboard_arrow_down</span>/<span
				class="material-symbols-rounded i">keyboard_arrow_right</span> to navigate
			up or down through timeline items.
		</li>
	</ul>
	<h3>Fullscreen</h3>
	<ul>
		<li>
			Click on the image to view it in fullscreen mode. Click on the image again
			to exit fullscreen mode.
		</li>
		<li>
			On mobile, pinch <span class="material-symbols-rounded i">pinch</span> to zoom
			in and out of the image.
		</li>
	</ul>
	<h3>Accessibility</h3>
	<ul>
		<li>
			Press the
			<span class="material-symbols-rounded i">volume_up</span>
			button to hear a description of the current timeline item. Press the
			<span class="material-symbols-rounded i">stop</span> button to stop the audio
			playback.
		</li>
	</ul>
	<hr />
	<h3>Issues</h3>
	If you come across any issues or bugs, reach out to our team by visiting our&nbsp;<a
		href="https://github.com/SWE-2023/COSC-4P02-Project">
		GitHub repository</a
	>.
	<br />
	<br />
	<p slot="footer" style="text-align:center;">
		Click on the <span class="material-symbols-rounded i">help</span> button to view
		this message again
	</p>
</Modal>
<SearchBar
	bind:selection={dropDownSelection}
	data={searchData}
	on:selection={gotoItem}
	on:selection={update} />
<TimelineBar
	timeData={timeline}
	bind:currentItem={selectedItem}
	bind:this={timelineBar}
	on:change={update}
	on:pagedown={pageDown}
	on:pageup={pageUp} />
<EventEdit
	changes={edit}
	newItem={add}
	currentEntry={selectedItem.id}
	on:saveNew={handleAdd}
	on:entryDeleted={handleDelete} />
{#if timeline.length > 0}
	<PageTransitionFade>
		{#key `${selectedItem.id}-${$direction}`}
			<section
				class="layout"
				style="transform-origin:bottom center;transform: translateX({$itemTranslateX}px) rotate({$itemTranslateX /
					($windowWidth / 5)}deg);opacity:{$opacity};"
				on:touchstart|passive={handleTouchStart}>
				<ItemTransition>
					<ItemComponents
						bind:editList={edit}
						bind:addList={add}
						item={selectedItem} />
				</ItemTransition>
			</section>
		{/key}
	</PageTransitionFade>
{:else}
	<section class="layout col">
		<img
			alt="google dino"
			width="64"
			style="mix-blend-mode:darken"
			src="https://play-lh.googleusercontent.com/i-0HlK6I-K5ZVI28HFa4iXz0T22Mg2WjQ4gMsEYvqmSNdifp2NE41ZiaUCavmbIimQ" />
		<h1>No items in timeline. Click 'Add' to create a new event.</h1>
	</section>
{/if}

<style>
	.layout {
		min-height: 80vh;
		width: 100%;
		display: flex;
		justify-content: center;
		margin-left: calc(var(--timeline-width) / 2);
		align-items: center;
		transition: margin-left 0.5s ease;
	}

	@media (max-width: 1000px) {
		.layout {
			margin-bottom: 10rem;
		}
	}

	li {
		margin-bottom: 0.25rem;
	}

	.i {
		color: var(--color-theme-1);
	}

	.r {
		vertical-align: -15%;
	}

	.rotate-90 {
		transform: rotate(90deg);
	}

	hr {
		border: none;
		width: 80%;
		border-top: 1px solid var(--color-text);
		opacity: 0.33;
	}
</style>
