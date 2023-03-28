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
	export let titleEdit;
	export let mediaEdit;
	export let image_creditEdit;
	export let start_dateEdit;
	export let bodyEdit;
	export let titleAdd;
	export let mediaAdd;
	export let image_creditAdd;
	export let start_dateAdd;
	export let bodyAdd;
	

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

	let placeholder ="https://joadre.com/wp-content/uploads/2019/02/no-image.jpg";

	function handleKeyDown(e) {
		if (e.key === "Space Bar") {
			onToggle();
			full = !full;
		}
	}

	const resetEditPlaceholder = () => editImagePlaceholder = media;
	const changeEditPlaceholder = () => editImagePlaceholder = mediaEdit;
	const hidePlaceholder = () => addImageOpacity = 0;
	const changeAddPlaceholder = () => {
		addImagePlaceholder = mediaAdd;
		addImageOpacity = 1;
	}

</script>

{#if editMode}
	<section class="edit-mode">
		<div class="media-component">
			<img
				class="placeholder-image"
				src={editImagePlaceholder}
				alt={title}
				on:error={resetEditPlaceholder}/>
			<div class="image-info">
				<input bind:value={mediaEdit} on:input={changeEditPlaceholder} class="image-input">
				<input bind:value={image_creditEdit} class="credit-input">
			</div>
		</div>
		<div class="text-component">
			<textarea bind:value={titleEdit} class="title-input"></textarea>
			<input bind:value={start_dateEdit} class="date-input">
			{#if body}
				<textarea bind:value={bodyEdit} class="desc-input"></textarea> 
			{/if}
		</div>
	</section>
{:else if addMode}
	<section class="add-mode">
		<div class="media-component">
			<img
				style="opacity:{addImageOpacity}"
				class="placeholder-image"
				src={addImagePlaceholder}
				alt={titleAdd}
				on:error={hidePlaceholder}/>
			<div class="image-info">
				<input bind:value={mediaAdd} on:input={changeAddPlaceholder} class="image-input" placeholder="Image address">
				<input bind:value={image_creditAdd} class="credit-input" placeholder="Image source">
			</div>
		</div>
		<div class="text-component">
			<textarea bind:value={titleAdd} class="title-input" placeholder="Title"></textarea>
			<input bind:value={start_dateAdd} class="date-input" placeholder="Start date">
			{#if body}
				<textarea bind:value={bodyAdd} class="desc-input" placeholder="Description"></textarea> 
			{/if}
		</div>
	</section>
{:else}
	<section class="item-components">
		<div class="media-component">
			<div class="tip v-align">
				<span class="material-symbols-rounded "> info </span>
				<p>Click the image to toggle fullscreen.</p>
			</div>
			<Fullscreen let:onToggle>
				<div class="image-cont">
					{#if media}
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
				<div class="image_cred">
					<a href={image_credit} target="_blank" rel="noreferrer">Source</a>
				</div>
			{/if}
		</div>
		<div class="text-component">
			<h1 class="title">{title}</h1>
			<p class="date"><i>{formatted_date}</i></p>
			<Text2Speech {title} {formatted_date} {body} />
			{#if body}
				<p class="desc">{body}</p>
			{/if}
		</div>
	</section>
{/if}
	<svelte:window on:keypress={handleKeyDown} />

<style>
	:root {
		--vid-ratio: 0.5625;
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

	img:hover {
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

	textarea {
		resize: none;
	}

	.image-input, .credit-input, .title-input, .date-input, .desc-input {
		text-align: left;
		margin: 0.5em 0.5em 2em;
		padding: 0.8em;
		border-radius: 0.5em;
		border: 2px solid white;
		box-shadow: 0 0 1px 1px #0000004d;
		
	}

	.image-info{
		display: flex;
		flex-direction: row;
	}

	.date-input{
		height:10px;
	}

	.title-input{
		width: 40em;
		height: 2em;
	}

	.date-input{
		width:5em;
	}

	.desc-input{
		width: 50em;
		height: 20em;
	}

	.edit-mode, .add-mode, .text-component, .media-component {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.placeholder-image {
		width: clamp(300px,40%,500px);
		height:clamp(300px,40%,500px);
		z-index: 1;
		object-position: center center;
		object-fit: cover;
		border-radius: 1.5vw;
		box-shadow: 1rem 0rem 28px 0 #00000030;
	}

</style>
