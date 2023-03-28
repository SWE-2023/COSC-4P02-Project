<script>
	import Button from "./Button.svelte";
	import { slide } from "svelte/transition";
	import { userStore } from "$lib/authStore";
	export let lockPage;
	export let enableEditing;

	let user;
	userStore.subscribe((value) => {
		user = value && value.email ? value : null;
	});

	user = true; // for testing

	let openMenu = false;

	function changeMenu() {
		openMenu = !openMenu;
		lockPage = !lockPage;
		enableEditing = !enableEditing;	
	}

	function saveChanges() {
		console.log("save changes");
	}

	function deleteChanges() {
		console.log("delete changes");
	}

	function addNew() {
		console.log("add new");
	}


</script>

{#if user}
	<div transition:slide class="edit-items">
		{#if !openMenu}
			<button transition:slide on:click={changeMenu}
				><span class="material-symbols-rounded i">edit</span>Edit</button>
			<button transition:slide on:click={addNew}
				><span class="material-symbols-rounded i">add</span>Add</button>
		{:else if openMenu}
			<button transition:slide on:click={changeMenu}
				><span class="material-symbols-rounded i">close</span>Cancel</button>
			<div transition:slide class="line" />
			<button transition:slide class="options" on:click={saveChanges}
				><span class="material-symbols-rounded i">save</span>Save</button>
			<div transition:slide class="line" />
			<button transition:slide class="options" on:click={deleteChanges}
				><span class="material-symbols-rounded i">delete</span>Delete</button>
		{/if}
	</div>
{/if}

<style>
	.edit-items {
		width: 10rem;
		position: fixed;
		display: flex;
		flex-direction: column;
		top: 10rem;
		right: 2rem;
		z-index: 20;
		border-radius: var(--font-size-small);
		background: var(--color-text-card);
		box-shadow: 5px 5px 3em #00000022;
		margin: 0;
		padding: 0;
	}

	button {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: var(--font-sans);
		font-size: var(--font-size-small);
		font: var(--font-sans);
		color: var(--button-color);
		background: none;
		border: none;
		padding: 0.75rem 2rem;
	}

	.line {
		display: flex;
		align-self: center;
		width: 80%;
		height: 1px;
		background-color: #00000020;
	}

	.i {
		margin: 0.5rem 0;
		font-size: var(--font-size-medium);
	}

	button:hover,
	.options:hover {
		font-weight: 900;
		transition: background-color 0.15s ease-out;
	}

	button:active,
	.options:active {
		transition: none;
		transform: scale(0.95);
	}
</style>
