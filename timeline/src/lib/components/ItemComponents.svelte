<script>
	// @ts-nocheck
	import Text2Speech from "$lib/components/TextToSpeech.svelte";
	import Fullscreen from "svelte-fullscreen";
	import { format } from "date-fns";

	export let editMode;
	export let addMode;
	export let title;
	export let media;
	export let image_credit;
	export let start_date;
	export let body;
	export let editList;
	export let addList;
	

	let editImagePlaceholder = media;
	let addImageOpacity = 0;
	let addImagePlaceholder;
	let formatted_date;
	let full = false;

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

	formatted_date = formatDate(start_date);

	let placeholder =
		"https://joadre.com/wp-content/uploads/2019/02/no-image.jpg";

	function handleKeyDown(e) {
		if (e.key === "Space Bar") {
			onToggle();
			full = !full;
		}
	}

	const resetEditPlaceholder = () => (editImagePlaceholder = media);
	const changeEditPlaceholder = () => (editImagePlaceholder = mediaEdit);
	const hidePlaceholder = () => (addImageOpacity = 0);
	const changeAddPlaceholder = () => {
		addImagePlaceholder = mediaAdd;
		addImageOpacity = 1;
	};
</script>

<section class="item-components">
	<div class="media-component">
		<div class="tip v-align">
			<span class="material-symbols-rounded "> info </span>
			<p>Click the image to toggle fullscreen.</p>
		</div>
		<Fullscreen let:onToggle>
			<div class="image-cont">
				{#if editMode}
					<div class="edit-cont">
						<img class="image-edit" src={editImagePlaceholder} alt={title} />
						<div class="input-cont">
							<label for="media">Image URL</label>
							<input bind:value={editList.media} on:input={changeEditPlaceholder} />
						</div>
						<div class="input-cont">
							<label for="image_credit">Image source</label>
							<input bind:value={editList.image_credit} />
						</div>
					</div>
				{:else if addMode}
					<div class="edit-cont">
						<img class="image-edit" src={editImagePlaceholder} alt={title} />
						<div class="input-cont">
							<label for="media">Image URL</label>
							<input bind:value={addList.media} on:input={changeEditPlaceholder} />
						</div>
						<div class="input-cont">
							<label for="image_credit">Image source</label>
							<input bind:value={addList.image_credit} />
						</div>
					</div>
				{:else if media}
					{#if media.includes("youtube.com")}
						<iframe
							class="video"
							title="youtube video"
							src={media.replace("watch?v=", "embed/")}
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen />
					{:else}
						<img
							class={full ? "image fullscreen" : "image"}
							src={media}
							alt={title}
							on:click={() => {
								onToggle();
								full = !full;
							}}
							on:keydown={handleKeyDown} />
					{/if}
				{:else}
					<img
						class={full ? "image fullscreen" : "image"}
						src={placeholder}
						alt={title}
						on:click={() => {
							onToggle();
							full = !full;
						}}
						on:keydown={handleKeyDown} />
				{/if}
			</div>
		</Fullscreen>
		{#if image_credit != "null"}
			{#if !editMode && !addMode}
				<div class="image_cred">
					<a href={image_credit} target="_blank" rel="noreferrer">Source</a>
				</div>
			{/if}
		{/if}
	</div>
	<div class="text-component">
		{#if editMode}
			<div class="input-cont">
				<label for="title">Title</label>
				<input bind:value={editList.title} />
			</div>
			<div class="input-cont">
				<label for="start_date">Start date</label>
				<input bind:value={editList.start_date} />
			</div>
			<div class=input-cont>
				<label for="body">Description</label>
				<textarea bind:value={editList.body} />
			</div>
		{:else if addMode}
			<div class="input-cont">
				<label for="title">Title</label>
				<input bind:value={addList.title} />
			</div>
			<div class="input-cont">
				<label for="start_date">Start date</label>
				<input bind:value={addList.start_date} />
			</div>
			<div class=input-cont>
				<label for="body">Description</label>
				<textarea bind:value={addList.body} />
			</div>
		{:else}
			<h1 class="title">{title}</h1>
			<p class="date"><i>{formatted_date}</i></p>
			<div class="tts">
				<Text2Speech {title} {formatted_date} {body} />
			</div>
			{#if body}
				<p class="desc">{body}</p>
			{/if}
		{/if}
	</div>
	<!-- {/if} -->
</section>

<svelte:window on:keypress={handleKeyDown} />

<style>
	:root {
		--vid-ratio: 0.5625;
	}

	.tts {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: right;
	}

	h1 {
		font-family: var(--font-serif);
		font-size: var(--font-size-xxlarge);
		font-weight: 700;
		margin: 0;
	}

	p {
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		padding: 1em 0 1em 0;
		margin: 0.5rem;
	}

	.item-components {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		transition: all 0.2s ease-in-out;
		margin-bottom: 3rem;
	}

	.item-components > div {
		margin: 0 1rem;
	}

	.text-component {
		flex: 1 1 33%;
		padding: 2rem 2rem;
		border-radius: 2rem;
		background: var(--color-text-card);
		box-shadow: 1rem 0rem 28px 0 #00000010;
		text-align: justify;
	}

	.title {
		padding-top: 1rem;
		text-align: center;
	}

	.date {
		text-align: center;
		padding: 0;
		font-size: var(--font-size-base);
		font-weight: 400;
	}

	.desc {
		text-align: justify;
		padding-top: 1rem;
	}

	.image-cont {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 100%;
	}

	.image {
		z-index: 1;
		cursor: pointer;
		min-height: 60vh;
		max-height: 50vh;
		max-width: 100%;
		object-position: center center;
		object-fit: cover;
		border-radius: 1.5vw;
		box-shadow: 1rem 0rem 28px 0 #00000030;
		transition: all 0.3s ease-in-out;
	}

	.image.fullscreen {
		position: fixed;
		display: block;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		max-width: none;
		max-height: none;
		width: 100%;
		height: 100%;
		object-fit: contain;
		z-index: 100;
	}

	.image.fullscreen:hover {
		cursor: zoom-out;
		transform: scale(1);
	}

	@media (max-width: 1000px) {
		.item-components {
			margin: 0 -1rem 0 -1rem;
		}
		.text-component {
			padding: 2rem 1rem;
			text-align: justify;
		}
		.title {
			font-size: var(--font-size-large);
		}
		.date {
			font-size: var(--font-size-small);
		}
		.desc {
			font-size: var(--font-size-base);
		}
		.image {
			min-height: 0vh;
			max-height: 40vh;
		}
	}

	.video {
		z-index: 1;
		max-width: 50vw;
		width: 60vw;
		height: calc(60vw * var(--vid-ratio));
		object-position: center center;
		object-fit: cover;
		border-radius: 1.5vw;
		box-shadow: 1rem 0rem 28px 0 #00000030;
	}

	.image:hover {
		cursor: zoom-in;
		transform: scale(1.01);
		box-shadow: 0.5rem 0rem 32px 0 #00000030;
	}

	.image_cred {
		font-size: var(--font-size-xsmall);
		display: flex;
		justify-content: center;
	}

	.image_cred a {
		color: var(--color-text);
		padding: 0.5rem 4rem;
		opacity: 0.5;
		font-weight: 400;
		transition: all 0.15s ease-in-out;
	}
	.image_cred a:hover {
		opacity: 1;
		color: var(--color-theme-2);
		text-decoration: none;
	}

	.tip span,
	.tip p {
		font-size: var(--font-size-small);
		color: var(--color-text);
		opacity: 0.15;
		transition: opacity 0.33s ease-in-out;
	}

	.tip p {
		white-space: nowrap;
		overflow-x: hidden;
		text-overflow: clip;
		line-height: 0;
		height: 0;
		width: 0rem;
		transition: all 0.33s ease-in-out;
	}

	.tip {
		padding: 0rem;
		position: relative;
		left: 1rem;
		width: 100%;
		cursor: default;
		user-select: none;
		transition: all 0.33s ease-in-out;
	}

	.tip:hover p,
	.tip:hover span {
		opacity: 0.75;
	}

	.tip:hover p {
		width: calc(var(--font-size-small) * 20);
	}

	/* EDIT */

	.edit-cont {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin: 1rem;
	}

	.input-cont {
		flex: 1 1 30%;
		display: flex;
		flex-flow: column wrap;
	}

	label {
		font-size:1em;
		padding-left:1rem;
		color: var(--color-text);
	}

	input,
	textarea {
		flex: 1 1 auto;
		text-align: left;
		margin: 0.5em 0;
		padding: 0.8em;
		border-radius: 0.5em 0.5rem 0 0;
		outline: none;
		border:none;
		border-bottom: 2px solid var(--color-theme-1);
		background: #ffffff22;
		font-size: 1.2em;
		color: var(--color-text);
		font-family: var(--font-sans);
		transition: all 0.3s var(--curve);
	}

	textarea {
		height:clamp(10rem, 20vh, 30rem);
		resize: none;
	}

	input:focus,
	textarea:focus {
		border-bottom: 5px solid var(--color-theme-1);
	}

	.image-edit {
		display: flex;
		width: 100%;
		max-height: 50vh;
		z-index: 1;
		object-position: center center;
		object-fit: contain;
		border-radius: 0.5vw;
	}
</style>
