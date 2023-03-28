<script>
	import ItemTransition from "$lib/components/ItemTransition.svelte";
	import TimelineBar from "$lib/components/TimelineBar.svelte";
	import Arrow from "$lib/components/Arrow.svelte";
	import SearchBar from "$lib/components/searchbar/SearchBar.svelte";
	import ItemComponents from "$lib/components/ItemComponents.svelte";
	import PageTransitionFade from "$lib/components/PageTransitionFade.svelte";
	import EventEdit from "$lib/components/EventEdit.svelte";
	import supabase from "$lib/supabaseClient";

	export let data;
	let { timeline } = data;
	$: ({ timeline } = data);

	async function refresh() {
		try{
			const { data } = await supabase
				.from("timeline")
				.select("id, title, image, image_credit, body, start_date")
				.order("created_at", { ascending: false });
			timeline = data ?? [];
		}catch(error){
			console.log("refresh failed") //repalce with toast
		}
	}

	// map timeline titles to search data
	let searchData = timeline.map((item) => item.title);
	let dropDownSelection = "";
	let transitionDirection;
	let selectedItem = timeline[0];
	let atFirst = true;
	let atLast = false;
	let currentIndex = 0;
	let isEditing = false;
	let isAdding = false;
	let lockSelection = false;
	let editedTitle = selectedItem.title;
	let editedMedia = selectedItem.image;
	let editedImage_credit = selectedItem.image_credit;
	let editedStart_date = selectedItem.start_date;
	let editedBody = selectedItem.body;
	let addedTitle = "";
	let addedMedia = "";
	let addedImage_credit = "";
	let addedStart_date = "";
	let addedBody = "";
	let scroll;
	let searchBarOpacity = 1;

	let currentItem = {
		title: selectedItem.title,
		image: selectedItem.image,
		image_credit: selectedItem.image_credit,
		body: selectedItem.body,
		start_date: selectedItem.start_date,
	};

	function pageUp() {
		if(!lockSelection){
			transitionDirection = "up";
			if (!atFirst) {
				selectedItem = timeline[--currentIndex];
				update();
			}
		}
	}
	function pageDown() {
		if(!lockSelection){
			transitionDirection = "down";
			if (!atLast) {
				selectedItem = timeline[++currentIndex];
				update();
			}
		}
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
	}

	let upVisible = false;
	let downVisible = false;
	function showArrows(event) {
		if(!lockSelection){
			if (window.innerWidth < 1000) {
				upVisible = true;
				downVisible = true;
				return;
			}
			let y = event.clientY;
			let height = window.innerHeight;
			upVisible = y < height * 0.1;
			downVisible = y > height * 0.8;
		}
	}

	function gotoItem() {
		let item = timeline.find((item) => item.title == dropDownSelection);
		if (item) {
			selectedItem = item;
			update();
		}
	}

	function updateOpacity(){
		searchBarOpacity = scroll > 42 ? 0 : 1;
	}

	function setEditFields(){
		editedTitle = selectedItem.title;
		editedMedia = selectedItem.image;
		editedImage_credit = selectedItem.image_credit;
		editedStart_date = selectedItem.start_date;
		editedBody = selectedItem.body;
	}

	function setAddFields(){
		addedTitle = "";
		addedMedia = "";
		addedImage_credit = "";
		addedStart_date = "";
		addedBody = "";
	}

</script>

<svelte:head>
	<title>Timeline | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Timeline page" />
</svelte:head>

<svelte:window bind:scrollY={scroll} on:scroll={updateOpacity} on:mousemove={showArrows} />
<PageTransitionFade>
	<SearchBar
		lock={lockSelection}
		bind:selection={dropDownSelection}
		titles={searchData}
		barOpacity={searchBarOpacity}
		on:selection={gotoItem}
		on:selection={update} />
	<Arrow lock={lockSelection} on:moveUp={pageUp} disabled={atFirst} visible={upVisible} />
	<TimelineBar
		lock={lockSelection}
		timeData={timeline}
		bind:currentItem={selectedItem}
		on:change={update} />
	<EventEdit 
		bind:lockPage={lockSelection}
		bind:enableEditing={isEditing}
		bind:enableAdding={isAdding}
		changedTitle={editedTitle}
		changedMedia={editedMedia}
		changedImage_credit={editedImage_credit}
		changedStart_date={editedStart_date}
		changedBody={editedBody}  
		newTitle={addedTitle}
		newMedia={addedMedia}
		newImage_credit={addedImage_credit}
		newStart_date={addedStart_date}
		newBody={addedBody}
		currentEntry={currentIndex+1}
		on:saveEdit={refresh}
		on:resetEdit={setEditFields}
		on:resetAdd={setAddFields}/>
	{#key selectedItem}
		<section class="layout">
			<ItemTransition direction={transitionDirection}>
				<ItemComponents
					editMode={isEditing}
					addMode={isAdding}
					bind:titleEdit={editedTitle}
					bind:mediaEdit={editedMedia}
					bind:image_creditEdit={editedImage_credit}
					bind:start_dateEdit={editedStart_date}
					bind:bodyEdit={editedBody}
					bind:titleAdd={addedTitle}
					bind:mediaAdd={addedMedia}
					bind:image_creditAdd={addedImage_credit}
					bind:start_dateAdd={addedStart_date}
					bind:bodyAdd={addedBody}
					title={currentItem.title}
					media={currentItem.image}
					image_credit={currentItem.image_credit}
					start_date={currentItem.start_date}
					body={currentItem.body}/>
			</ItemTransition>
		</section>
	{/key}
	<Arrow lock={lockSelection} down on:moveDown={pageDown} disabled={atLast} visible={downVisible} />
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
