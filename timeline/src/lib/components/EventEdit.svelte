<script>
	// @ts-nocheck
	import supabase from "$lib/supabaseClient";
	import { slide, fly } from "svelte/transition";
	import { userStore } from "$lib/authStore";
	import { createEventDispatcher } from "svelte";
	import { toast } from "@zerodevx/svelte-toast";
	import { mode } from "$lib/stores/store";
	export let currentEntry;
	export let changes;
	export let newItem;

	let user;
	userStore.subscribe((value) => {
		user = value && value.email ? value : null;
	});

	const dispatch = createEventDispatcher();
	const resetEdit = () => dispatch("resetEdit");
	const resetAdd = () => dispatch("resetAdd");

	function handleEdit() {
		mode.update((n) => (n === "default" ? "edit" : "default"));
	}

	function handleAdd() {
		mode.update((n) => (n === "default" ? "add" : "default"));
	}

	const cancelEdit = () => {
		handleEdit();
		resetEdit();
	};

	const cancelAdd = () => {
		handleAdd();
		resetAdd();
	};

	function isValidDateFormat(dateString) {
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (!dateRegex.test(dateString)) {
			return false;
		}

		const [year, month, day] = dateString.split("-");

		if (Number(month) < 1 || Number(month) > 12) {
			return false;
		}

		if (Number(day) < 1 || Number(day) > 31) {
			return false;
		}

		return true;
	}

	const saveChanges = async () => {
		if (changes.title.length != 0 && changes.start_date.length != 0) {
			if (isValidDateFormat(changes.start_date)) {
				try {
					const { error } = await supabase
						.from("timeline")
						.update({
							title: changes.title,
							image: changes.media,
							image_credit: changes.image_credit,
							start_date: changes.start_date,
							body: changes.body,
						})
						.eq("id", currentEntry);

					if (error) {
						throw error;
					}

					handleEdit();
					resetEdit();
					toast.push("<b>Success</b><br>Changes saved. Refreshing items...");
					setTimeout(() => {
						location.reload();
					}, 0);
				} catch (error) {
					toast.push(`Error: ${error.message}`);
				}
			} else {
				toast.push("Please enter a valid date.");
			}
		} else {
			toast.push("<b>Error</b><br>Please fill out the date and title fields.");
		}
	};

	const saveNew = async () => {
		if (newItem.title.length != 0 && newItem.start_date.length != 0) {
			if (isValidDateFormat(newItem.start_date)) {
				try {
					const { error } = await supabase.from("timeline").insert({
						title: newItem.title,
						image: newItem.media,
						image_credit: newItem.image_credit,
						start_date: newItem.start_date,
						body: newItem.body,
					});

					if (error) {
						throw error;
					}

					dispatch("saveNew");
					handleAdd();
					resetAdd();
					toast.push("<b>Success</b><br>New entry added. Refreshing items...");
					setTimeout(() => {
						location.reload();
					}, 0);
				} catch (error) {
					toast.push(`<b>Query Error</b><br>${error.message}`);
				}
			} else {
				toast.push("<b>Error</b><br>Please enter a valid date.");
			}
		} else {
			toast.push("<b>Error</b><br>Please fill out the date and title fields.");
		}
	};

	const deleteEntry = async () => {
		try {
			if (confirm("Are you sure you want to delete this entry?") == false) {
				toast.push("<b>Cancelled</b><br>Item not deleted.");
				return;
			}
			const { data, error } = await supabase
				.from("timeline")
				.delete()
				.eq("id", currentEntry);

			if (error) {
				throw error;
			}
			dispatch("entryDeleted");
			toast.push(
				"<b>Success</b><br>Entry deleted successfully. Refreshing items..."
			);
			setTimeout(() => {
				location.reload();
			}, 0);
		} catch (error) {
			toast.push(`<b>Query Error</b><br>${error.message}`);
		}
	};
</script>

{#if user && user.email}
	{#key $mode}
		<div class="container" transition:fly={{ y: 100 }}>
			{#if $mode !== "default"}
				<div class="notice">
					<h2>
						{$mode === "edit" ? "Edit" : "Add"}ing item
					</h2>
				</div>
			{/if}
			<div class="edit-items">
				{#if $mode === "edit"}
					<button on:click={cancelEdit} title="Cancel changes"
						><span class="material-symbols-rounded i">close</span
						>Cancel</button>
					<div class="line" />
					<button class="options" on:click={saveChanges} title="Save changes"
						><span class="material-symbols-rounded i">save</span>Save</button>
					<div class="line" />
					<button class="options" on:click={deleteEntry} title="Delete entry"
						><span class="material-symbols-rounded i">delete</span
						>Delete</button>
				{:else if $mode === "add"}
					<button on:click={cancelAdd} title="Cancel changes"
						><span class="material-symbols-rounded i">close</span
						>Cancel</button>
					<div class="line" />
					<button class="options" on:click={saveNew} title="Save changes"
						><span class="material-symbols-rounded i">save</span>Save</button>
				{:else}
					<button on:click={handleEdit} title="Edit items"
						><span class="material-symbols-rounded i">edit</span>Edit</button>
					<div class="line" />
					<button on:click={handleAdd} title="Add New item"
						><span class="material-symbols-rounded i">add</span>Add</button>
				{/if}
			</div>
		</div>
	{/key}
{/if}

<style>
	.container {
		position: fixed;
		display: flex;
		left: 0;
		bottom: 0;
		flex-flow: column;
		align-items: center;
		width: 100%;
		margin-left: calc(var(--timeline-width) / 2);
		z-index: 2;
	}

	.edit-items {
		user-select: none;

		border-radius: var(--font-size-small);
		height: calc(3 * var(--font-size-base));
		width: clamp(10rem, 80vw, 30rem);
		margin-bottom: 1rem;

		display: flex;
		flex-direction: row;

		background: var(--color-bg-1);
		border: var(--border);
		transition: all 0.5s var(--curve);
		box-shadow: 5px 5px 7px #00000020;
	}

	.notice {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0.25rem;
	}

	.notice h2 {
		color: var(--color-theme-1);
		font-family: var(--font-sans);
		font-size: var(--font-size-small);
		border: 1px dashed var(--color-theme-1);
		border-radius: var(--font-size-xsmall);
		background: var(--color-bg-1);
		opacity: 0.8;
		padding: 0.5rem 3rem;
		align-items: center;
		justify-content: center;
		margin: 0;
	}

	button {
		cursor: pointer;
		display: inline-flex;
		white-space: nowrap;
		flex-direction: row;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		font: var(--font-sans);
		color: var(--color-theme-1);
		background: none;
		width: 100%;
		height: 100%;
		border: none;
		transition: all 0.5s var(--curve);
	}

	.edit-items > *:first-child {
		border-radius: var(--font-size-small) 0 0 var(--font-size-small);
	}

	.edit-items > *:last-child {
		border-radius: 0 var(--font-size-small) var(--font-size-small) 0;
	}

	.line {
		display: flex;
		align-self: center;
		height: 66%;
		width: 1px;
		background-color: #00000020;
		transition: all 0.5s var(--curve);
	}

	button {
		font-size: var(--font-size-small);
	}

	button:hover {
		backdrop-filter: invert(0.1);
	}

	.edit-items:hover .line {
		background-color: transparent;
	}

	button:active {
		backdrop-filter: invert(0.2);
	}

	@media (max-width: 1000px) {
		button {
			font-size: var(--font-size-small);
		}

		.i {
			font-size: var(--font-size-base);
		}
	}
</style>
