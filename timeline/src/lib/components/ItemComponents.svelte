<script>
	// @ts-nocheck
	import Text2Speech from "$lib/components/TextToSpeech.svelte";
	import Fullscreen from "svelte-fullscreen";
	import { format } from "date-fns";
	import PageTransitionBlur from "$lib/components/PageTransitionBlur.svelte";
	import supabase from "$lib/supabaseClient";
	import { toast } from "@zerodevx/svelte-toast";

	// timeline view settings
	export let editing;
	export let adding;
	let loading = false;

	export let item = {
		title: "",
		media: "",
		image_credit: "",
		body: "",
		start_date: "",
	};

	export let editList;
	export let addList;

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

	formatted_date = formatDate(item.start_date);

	function handleKeyDown(e) {
		if (e.key === "Space Bar") {
			onToggle();
			full = !full;
		}
	}

	function autofill(event) {
		const { value, selectionStart, selectionEnd } = event.target;
		const isCursorAtEnd =
			selectionStart === value.length && selectionEnd === value.length;

		if (event.inputType === "deleteContentBackward") {
			if (!isCursorAtEnd) {
				event.preventDefault();
				event.target.setSelectionRange(value.length, value.length);
				const input = event.target.value.replace(/\D/g, "");
				const year = input.slice(0, 4);
				const month = input.slice(4, 6);
				const day = input.slice(6, 8);

				let formattedDate = "";
				if (year) {
					formattedDate += year;
					if (month) {
						formattedDate += "-" + month;
						if (day) {
							formattedDate += "-" + day;
						}
					}
				}

				editing
					? (editList.start_date = formattedDate)
					: (addList.start_date = formattedDate);
			}
		} else {
			const input = event.target.value.replace(/\D/g, "");
			const year = input.slice(0, 4);
			const month = input.slice(4, 6);
			const day = input.slice(6, 8);

			let formattedDate = "";
			if (year) {
				formattedDate += year;
				if (month) {
					formattedDate += "-" + month;
					if (day) {
						formattedDate += "-" + day;
					}
				}
			}

			editing
				? (editList.start_date = formattedDate)
				: (addList.start_date = formattedDate);
		}
	}

	let inputElement;
	function setCursorPositionToEnd() {
		if (inputElement) {
			const inputValueLength = inputElement.value.length;
			inputElement.setSelectionRange(inputValueLength, inputValueLength);
		}
	}

	async function upload(e) {
		loading = true;
		const file = e.target.files[0];
		if (file) {
			if (file.size > 4 * 1024 * 1024) {
				toast.push(`<b>Error:</b><br>File size should be less than 4MB`);
				return;
			} else {
				const { data, error } = await supabase.storage
					.from("images")
					.upload(file.name, file);
				if (error) {
					if (error.error === "Duplicate") {
						const imageUrl = supabase.storage
							.from("images")
							.getPublicUrl(file.name);
						if (editing) {
							editList.media = imageUrl.data["publicUrl"];
						} else if (adding) {
							addList.media = imageUrl.data["publicUrl"];
						}
					} else {
						toast.push(
							`<b>Error ${error.satusCode}: ${error.error}</b><br>${error.message}`
						);
					}
				} else {
					const imageUrl = supabase.storage
						.from("images")
						.getPublicUrl(file.name);
					if (editing) {
						editList.media = imageUrl.data["publicUrl"];
					} else if (adding) {
						addList.media = imageUrl.data["publicUrl"];
					}
				}
			}
		}
		loading = false;
	}
</script>

{#key editing || adding}
	<PageTransitionBlur>
		<section class="item-components">
			<div class="media-component">
				{#if !editing && !adding}
					{#if item.media}
						<div class="tip v-align">
							<span class="material-symbols-rounded "> info </span>
							<p>Click the image to toggle fullscreen.</p>
						</div>
					{/if}
				{:else}
					<div class="notice">
						<h2>
							{editing ? "Edit" : "Add"}ing item
						</h2>
					</div>
					<p
						style="font-size:var(--font-size-small);margin-bottom:0;padding-bottom:0;justify-content:center;align-items:center;display:flex;gap:0.5rem;">
						<span
							style="font-size:var(--font-size-small)"
							class="material-symbols-rounded"
							>{loading ? "autorenew" : "cloud_upload"}</span
						>{loading ? "Uploading..." : "Upload image"}
					</p>
				{/if}
				<Fullscreen let:onToggle>
					<div class="image-cont">
						{#if editing || adding}
							<div class="edit-cont">
								<input
									type="file"
									class="image-edit upload"
									id="file_upload"
									on:change={upload} />
								<img
									class="image-edit"
									src={adding ? addList.media : editList.media}
									alt={adding ? addList.title : editList.title} />
								<div style="width:100%;text-align:center;">
									<p
										style="font-size:var(--font-size-small);align-content:center">
										<i
											>Paste image URL or drag and drop onto image section (4MB
											limit).</i>
									</p>
								</div>

								<div class="input-cont">
									<label for="media">Image URL</label>
									{#if editing}
										<input
											type="text"
											placeholder="https://example.com/image.jpg"
											bind:value={editList.media} />
									{:else if adding}
										<input
											type="text"
											placeholder="https://example.com/image.jpg"
											bind:value={addList.media} />
									{/if}
								</div>
								<div class="input-cont">
									<label for="image_credit">Image source</label>
									{#if editing}
										<input
											type="text"
											placeholder="https://example.com"
											bind:value={editList.image_credit} />
									{:else if adding}
										<input
											type="text"
											placeholder="https://example.com"
											bind:value={addList.image_credit} />
									{/if}
								</div>
							</div>
						{:else if item.media}
							{#if item.media.includes("youtube.com")}
								<iframe
									class="video"
									title="youtube video"
									src={item.media.replace("watch?v=", "embed/")}
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen />
							{:else}
								<img
									class={full ? "image fullscreen" : "image"}
									src={item.media}
									alt={item.title}
									on:click={() => {
										onToggle();
										full = !full;
									}}
									on:keydown={handleKeyDown} />
							{/if}
						{/if}
					</div>
				</Fullscreen>
				{#if item.image_credit != "null" && item.media}
					{#if !editing && !adding}
						<div class="image_cred">
							<a href={item.image_credit} target="_blank" rel="noreferrer"
								>Source</a>
						</div>
					{/if}
				{/if}
			</div>
			<div class="text-component">
				{#if editing || adding}
					<form>
						<div class="input-cont">
							<label for="title"
								>Title <span style="color:var(--color-theme-1)">*</span></label>
							{#if editing}
								<input
									type="text"
									placeholder="Title"
									bind:value={editList.title} />
							{:else if adding}
								<input
									type="text"
									placeholder="Title"
									bind:value={addList.title} />
							{/if}
						</div>
						<div class="input-cont">
							<label for="start_date"
								>Date <span style="color:var(--color-theme-1)">*</span></label>
							{#if editing}
								<input
									type="text"
									bind:value={editList.start_date}
									on:input={autofill}
									bind:this={inputElement}
									on:click={setCursorPositionToEnd}
									on:focus={setCursorPositionToEnd} />
							{:else if adding}
								<input
									type="text"
									bind:value={addList.start_date}
									on:input={autofill}
									bind:this={inputElement}
									on:click={setCursorPositionToEnd}
									on:focus={setCursorPositionToEnd} />
							{/if}
						</div>
						<div class="input-cont">
							<label for="body">Description</label>
							{#if editing}
								<textarea
									placeholder="Description"
									bind:value={editList.body} />
							{:else if adding}
								<textarea placeholder="Description" bind:value={addList.body} />
							{/if}
						</div>
					</form>
				{:else}
					<h1 class="title">{item.title}</h1>
					<p class="date"><i>{formatted_date}</i></p>
					<div class="tts">
						<Text2Speech
							title={item.title}
							date={formatted_date}
							body={item.body} />
					</div>
					{#if item.body}
						<p class="desc">{item.body}</p>
					{/if}
				{/if}
			</div>
		</section>
	</PageTransitionBlur>
{/key}

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
		position: relative;
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
		display: flex;
		justify-content: center;
	}

	.image_cred a {
		font-size: var(--font-size-xsmall);
		color: var(--color-text);
		padding: 1rem 2rem 0.5rem 2rem;
		border-radius: 0 0 0.5rem 0.5rem;
		margin: 0 0 0.5rem 0;
		opacity: 0.75;
		font-weight: 400;
		transform: translateY(-1rem);
		background: var(--color-bg-2);
		transition: all 0.15s var(--curve);
	}
	.image_cred a:hover {
		opacity: 1;
		transform: translateY(-0.5rem);
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

	/* ---------------------- EDIT ---------------------- */

	.notice {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.notice h2 {
		color: var(--color-theme-1);
		font-family: var(--font-sans);
		font-size: var(--font-size-small);
		border: 1px dashed var(--color-theme-1);
		border-radius: var(--font-size-xsmall);
		padding: 0.5rem 3rem;
		align-items: center;
		justify-content: center;
		margin: 0;
	}

	.edit-cont {
		display: flex;
		width: 100%;
		flex: 1 1 49%;
		flex-flow: row wrap;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin: 1rem;
	}

	.input-cont {
		flex: 1 1 49%;
		display: flex;
		flex-flow: column wrap;
	}

	label {
		font-size: 1em;
		padding-left: 1rem;
		color: var(--color-text);
	}

	input[type="text"],
	textarea {
		text-overflow: ellipsis;
		flex: 1 1 auto;
		text-align: left;
		margin: 0.5em 0;
		padding: 0.9em;
		border-radius: var(--font-size-xsmall) var(--font-size-xsmall) 0 0;
		outline: none;
		border: none;
		/* border-bottom: 2px solid var(--color-theme-1); */
		background: transparent;
		backdrop-filter: invert(0.1) sepia(0.1) saturate(0.1) brightness(1.1)
			contrast(1.1);
		font-size: var(--font-size-small);
		color: var(--color-text);
		font-family: var(--font-sans);
		box-shadow: inset 0 -4px 0 -1px var(--color-theme-1);
		transition: all 0.3s var(--curve);
	}

	textarea {
		height: clamp(10rem, 20vh, 30rem);
		resize: none;
	}

	input:focus,
	textarea:focus {
		box-shadow: inset 0 -6px 0 -1px var(--color-theme-1);
	}

	.image-edit {
		position: relative;
		width: clamp(5rem, 70vw, 60rem);
		height: clamp(10rem, 30vw, 30rem);
		border: 3px solid var(--color-theme-1);
		z-index: 2;
		object-position: center center;
		object-fit: contain;
		border-radius: var(--font-size-medium);
		background: var(--color-bg-2);
	}

	.upload {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		margin: 0 auto;
		bottom: 0;
		opacity: 0;
		background: grey;
		z-index: 5;
	}
</style>
