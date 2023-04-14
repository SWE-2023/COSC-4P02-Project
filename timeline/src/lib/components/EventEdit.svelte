<script>
	// @ts-nocheck
	import supabase from "$lib/supabaseClient";
	import { slide } from "svelte/transition";
	import { userStore } from "$lib/authStore";
	import { createEventDispatcher } from "svelte";
	import { toast } from "@zerodevx/svelte-toast";
	export let lockPage;
	export let enableEditing;
	export let enableAdding;
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

	function changeMenu() {
		lockPage = !lockPage;
		enableEditing = !enableEditing;
	}

	function addNew() {
		lockPage = !lockPage;
		enableAdding = !enableAdding;
	}

	const cancelChanges = () => {
		changeMenu();
		resetEdit();
	};

	const cancelAdd = () => {
		addNew();
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

					changeMenu();
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
					addNew();
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
	{#key enableAdding || enableEditing}
		<div transition:slide={{ axis: "y" }} class="edit-items">
			{#if enableEditing}
				<button on:click={cancelChanges}
					><span class="material-symbols-rounded i">close</span>Cancel</button>
				<div class="line" />
				<button class="options" on:click={saveChanges}
					><span class="material-symbols-rounded i">save</span>Save</button>
				<div class="line" />
				<button class="options" on:click={deleteEntry}
					><span class="material-symbols-rounded i">delete</span>Delete</button>
			{:else if enableAdding}
				<button on:click={cancelAdd}
					><span class="material-symbols-rounded i">close</span>Cancel</button>
				<div class="line" />
				<button class="options" on:click={saveNew}
					><span class="material-symbols-rounded i">save</span>Save</button>
			{:else}
				<button on:click={changeMenu}
					><span class="material-symbols-rounded i">edit</span>Edit</button>
				<div class="line" />
				<button on:click={addNew}
					><span class="material-symbols-rounded i">add</span>Add</button>
			{/if}
		</div>
	{/key}
{/if}

<style>
	.edit-items {
		user-select: none;
		bottom: 0;
		border-radius: var(--font-size-small) var(--font-size-small) 0 0;
		height: calc(3.5 * var(--font-size-base));
		width: clamp(20rem, 80vw, 50rem);
		position: fixed;
		left: calc(50% - clamp(20rem, 80vw, 50rem) / 2);
		justify-content: space-evenly;
		display: flex;
		flex-direction: row;
		z-index: 2;
		background: var(--color-text-card);
		margin: 0;
		padding: 0;
		box-shadow: 0 0 0 2px #00000050;
		transition: all 0.5s var(--curve);
	}

	button {
		cursor: pointer;
		display: inline-flex;
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
		border-radius: var(--font-size-small) 0 0 0;
	}

	.edit-items > *:last-child {
		border-radius: 0 var(--font-size-small) 0 0;
	}

	.line {
		display: flex;
		align-self: center;
		height: 66%;
		width: 1px;
		background-color: #00000020;
		transition: all	0.5s var(--curve);
	}

	.i {
		vertical-align: center;
		font-size: var(--font-size-medium);
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
		.edit-items {
			margin-left: 2.5rem;
		}

		button {
			font-size: var(--font-size-small);
		}

		.i {
			font-size: var(--font-size-base);
		}
	}
</style>
