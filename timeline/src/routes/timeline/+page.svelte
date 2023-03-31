<script>
	import ItemTransition from "$lib/components/ItemTransition.svelte";
	import TimelineBar from "$lib/components/TimelineBar.svelte";
	import Arrow from "$lib/components/Arrow.svelte";
	import SearchBar from "$lib/components/searchbar/SearchBar.svelte";
	import ItemComponents from "$lib/components/ItemComponents.svelte";
	import PageTransitionFade from "$lib/components/PageTransitionFade.svelte";
	import EventEdit from "$lib/components/EventEdit.svelte";

	export let data;
	let { timeline } = data;
	$: ({ timeline } = data);

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
	
	let dropDownSelection = "";
	let transitionDirection;
	let selectedItem = timeline[0];
	let atFirst = true;
	let atLast = false;
	let currentIndex = 0;
	let isEditing = false;
	let isAdding = false;
	let lockSelection = false;

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
		transitionDirection = "up";
		if (!atFirst) {
			selectedItem = timeline[--currentIndex];
			update();
		}
		setEditFields();
	}
	function pageDown() {
		transitionDirection = "down";
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

		currentIndex = timeline.indexOf(selectedItem);
		atFirst = selectedItem == timeline[0];
		atLast = selectedItem == timeline[timeline.length - 1];
		setEditFields();
	}

	let upVisible = false;
	let downVisible = false;
	function showArrows(event) {
		if (!lockSelection) {
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
</script>

<svelte:head>
	<title>Timeline | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Timeline page" />
</svelte:head>

<svelte:window
	on:mousemove={showArrows} />

<PageTransitionFade>
	<SearchBar
		lock={lockSelection}
		bind:selection={dropDownSelection}
		data={searchData}
		on:selection={gotoItem}
		on:selection={update} />
	<Arrow
		lock={lockSelection}
		on:moveUp={pageUp}
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
		{#key selectedItem}
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
				<img alt="google dino" width='64' style="mix-blend-mode:darken" src="https://play-lh.googleusercontent.com/i-0HlK6I-K5ZVI28HFa4iXz0T22Mg2WjQ4gMsEYvqmSNdifp2NE41ZiaUCavmbIimQ"/>
				<h1>
					No items in timeline. Click 'Add' to create a new event.
				</h1>
			</section>
	{/if}
	
	<Arrow
		lock={lockSelection}
		down
		on:moveDown={pageDown}
		disabled={atLast}
		visible={downVisible} />
		
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
</style>
