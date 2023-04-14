<script>
	import ItemTransition from "$lib/components/ItemTransition.svelte";
	import TimelineBar from "$lib/components/TimelineBar.svelte";
	import Arrow from "$lib/components/Arrow.svelte";
	import SearchBar from "$lib/components/searchbar/SearchBar.svelte";
	import ItemComponents from "$lib/components/ItemComponents.svelte";
	import PageTransitionFade from "$lib/components/PageTransitionFade.svelte";
	import EventEdit from "$lib/components/EventEdit.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import supabase from "$lib/supabaseClient.js";
	import { currentItemIndexStore } from "$lib/stores/store.js";
	import { onMount } from "svelte";

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

	let showModal = false;
	let screenWidth = 1920;
	let screenHeight = 1080;
	let touchStartPos = 0;

	let dropDownSelection = "";
	let transitionDirection;
	let selectedItem = timeline[0];
	let atFirst = true;
	let atLast = false;
	let currentIndex = 0;
	let isEditing = false;
	let isAdding = false;
	let lockSelection = false;
	let upVisible = true;
	let downVisible = true;

	let edit = {
		title: selectedItem.title,
		media: selectedItem.image,
		image_credit: selectedItem.image_credit,
		start_date: selectedItem.start_date,
		body: selectedItem.body,
	};

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

	function pageUp() {
		if (!atFirst) {
			selectedItem = timeline[--currentIndex];
			update();
		}
		setEditFields();
	}
	function pageDown() {
		if (!atLast) {
			selectedItem = timeline[++currentIndex];
			update();
		}
		setEditFields();
	}

	function update() {
		currentItem = {
			title: selectedItem.title,
			image: selectedItem.image,
			image_credit: selectedItem.image_credit,
			body: selectedItem.body,
			start_date: selectedItem.start_date,
		};

		if (timeline.indexOf(selectedItem) > currentIndex) {
			transitionDirection = "down";
		} else if (timeline.indexOf(selectedItem) < currentIndex) {
			transitionDirection = "up";
		}
		currentIndex = timeline.indexOf(selectedItem);
		atFirst = selectedItem == timeline[0];
		atLast = selectedItem == timeline[timeline.length - 1];
		setEditFields();
		currentItemIndexStore.set(currentIndex);
	}

	function showArrows() {
		if (!lockSelection) {
			if (screenWidth < 1000) {
				upVisible = false;
				downVisible = false;
				return;
			} else {
				upVisible = true;
				downVisible = true;
			}
		}
	}

	function gotoItem() {
		let item = timeline.find((item) => item.title == dropDownSelection);
		if (item) {
			selectedItem = item;
			update();
		}
		setEditFields();
	}

	function setEditFields() {
		edit.title = selectedItem.title;
		edit.media = selectedItem.image;
		edit.image_credit = selectedItem.image_credit;
		edit.start_date = selectedItem.start_date;
		edit.body = selectedItem.body;
	}

	function setAddFields() {
		add.title = "";
		add.media = "";
		add.image_credit = "";
		add.start_date = "";
		add.body = "";
	}

	function handleAdd() {
		selectedItem = timeline[0];
		update();
	}

	function handleDelete() {
		if (timeline.length >= 1) {
			selectedItem = timeline[0];
			isEditing = !isEditing;
			update();
		}
	}

	function handleDownArrow() {
		transitionDirection = "down";
		pageDown();
	}

	function handleUpArrow() {
		transitionDirection = "up";
		pageUp();
	}

	function handleTouchStart(e) {
		touchStartPos = e.touches[0].clientX;
	}

	function handleTouchEnd(e) {
		const touchEndX = e.changedTouches[0].clientX;
		const deltaX = touchEndX - touchStartPos;

		if (Math.abs(deltaX) > 100) {
			if (deltaX > 0) {
				transitionDirection = "right";
				pageUp();
			} else {
				transitionDirection = "left";
				pageDown();
			}
		}
	}

	async function fetchTimelineData() {
		const { data } = await supabase
			.from("timeline")
			.select("id, title, image, image_credit, body, start_date")
			.order("start_date");
		data && (timeline = data);
	}

	onMount(async () => {
		showArrows();
		const firstVisit = localStorage.getItem("firstVisit");

		if (!firstVisit) {
			showModal = true;
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

		// await fetchTimelineData();

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
	bind:innerHeight={screenHeight}
	bind:innerWidth={screenWidth}
	on:resize={showArrows}
	on:touchstart={handleTouchStart}
	on:touchmove|passive
	on:touchend|passive={handleTouchEnd} />

<PageTransitionFade>
	<Modal bind:showModal>
		<h2 slot="header">How to use the timeline</h2>
		<p>
			Welcome! There are several ways to navigate the timeline. Below are some
			instructions to help you get started.
		</p>
		<h3>
			Timeline <span class="material-symbols-rounded r rotate-90">commit</span>
		</h3>
		<ul>
			<li>
				Click on timeline items <span
					class="material-symbols-rounded i rotate-90">commit</span> in the left
				column to navigate to it.
			</li>
			<li>
				Click the <span class="material-symbols-rounded i">add</span> button or double-click
				to zoom in the timeline.
			</li>
			<li>
				Click the <span class="material-symbols-rounded i">remove</span> button
				to zoom out the timeline bar, and
				<span class="material-symbols-rounded i">refresh</span> to reset both zoom
				and position.
			</li>
			<li>
				Click and drag or scroll on the timeline to move up or down once zoomed
				in.
			</li>
		</ul>
		<h3>Search Bar <span class="material-symbols-rounded r">search</span></h3>
		<ul>
			<li>
				Click on the search bar or hit <code>'/'</code> and type in a keyword or
				year to search for a timeline item.
			</li>
			<li>
				Click on the timeline item in the search results to navigate to it.
			</li>
			<li>
				Click on the <span class="material-symbols-rounded i">close</span> button
				to clear the search bar.
			</li>
		</ul>
		<h3>Navigation Buttons</h3>
		<ul>
			<li>
				<span class="material-symbols-rounded r">smartphone</span>
				<b> Mobile &mdash; </b>
				Swipe <span class="material-symbols-rounded i">swipe</span> left or right
				to navigate through timeline items.
			</li>
			<li>
				<span class="material-symbols-rounded r">mouse</span>
				<b> Mouse &mdash; </b>
				Click on the
				<span class="material-symbols-rounded i">keyboard_arrow_up</span>/<span
					class="material-symbols-rounded i">keyboard_arrow_down</span> floating
				buttons at the top and bottom of the screen to navigate up or down through
				timeline items.
			</li>
			<li>
				<span class="material-symbols-rounded r">keyboard_alt</span>
				<b> Keyboard &mdash;</b>
				Press<span class="material-symbols-rounded i">keyboard_arrow_up</span
				>/<span class="material-symbols-rounded i">keyboard_arrow_left</span>
				or
				<span class="material-symbols-rounded i">keyboard_arrow_down</span
				>/<span class="material-symbols-rounded i">keyboard_arrow_right</span> to
				navigate up or down through timeline items.
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
		<p>
			To see this message again, click on the <span
				class="material-symbols-rounded i">help</span> button at the bottom right
			of the page.
		</p>
	</Modal>
	<SearchBar
		lock={lockSelection}
		bind:selection={dropDownSelection}
		data={searchData}
		on:selection={gotoItem}
		on:selection={update} />
	<Arrow
		lock={lockSelection}
		on:moveup={handleUpArrow}
		disabled={atFirst}
		visible={upVisible} />
	<TimelineBar
		disabled={lockSelection}
		timeData={timeline}
		bind:currentItem={selectedItem}
		on:change={update} />
	<EventEdit
		bind:lockPage={lockSelection}
		bind:enableEditing={isEditing}
		bind:enableAdding={isAdding}
		changes={edit}
		newItem={add}
		currentEntry={selectedItem.id}
		on:resetEdit={setEditFields}
		on:resetAdd={setAddFields}
		on:saveNew={handleAdd}
		on:entryDeleted={handleDelete} />
	{#if timeline.length > 0}
		{#key `${selectedItem.id}-${transitionDirection}`}
			<section class="layout">
				<ItemTransition direction={transitionDirection}>
					<ItemComponents
						editing={isEditing}
						adding={isAdding}
						bind:editList={edit}
						bind:addList={add}
						item={{
							title: selectedItem.title,
							media: selectedItem.image,
							image_credit: selectedItem.image_credit,
							body: selectedItem.body,
							start_date: selectedItem.start_date,
						}} />
				</ItemTransition>
			</section>
		{/key}
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

	<Arrow
		lock={lockSelection}
		down
		on:movedown={handleDownArrow}
		disabled={atLast}
		visible={downVisible} />
	<div class="help">
		<button on:click={() => (showModal = true)}>
			<span class="material-symbols-rounded i">help</span>
		</button>
	</div>
</PageTransitionFade>

<style>
	.layout {
		min-height: 80vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: margin-left 0.5s ease;
	}

	@media (max-width: 1000px) {
		.layout {
			margin-left: var(--font-size-medium);
			margin-bottom: 10rem;
		}
	}

	li {
		margin-bottom: 0.25rem;
	}

	.i {
		vertical-align: middle;
		color: var(--color-theme-1);
	}

	.r {
		vertical-align: -15%;
	}

	.rotate-90 {
		transform: rotate(90deg);
	}

	.help {
		position: fixed;
		bottom: 0;
		right: 0;
		margin: 1rem;
	}

	.help button {
		background: var(--color-bg-2);
		border-radius: 5rem;
		padding: 0.5rem;
		border: none;
		transition: all 0.5s var(--curve);
	}

	.help button:hover {
		filter: invert(0.1);
	}

	.help button:active {
		filter: invert(0.3);
		scale: 0.95;
	}
</style>
