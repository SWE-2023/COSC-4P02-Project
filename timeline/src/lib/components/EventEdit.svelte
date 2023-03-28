<script>
// @ts-nocheck
	
	import supabase from "../supabaseClient";
	import Button from "./Button.svelte";
	import { slide } from "svelte/transition";
	import { userStore } from "$lib/authStore";
	import { createEventDispatcher } from "svelte";
	export let lockPage;
	export let enableEditing;
	export let enableAdding;
	export let currentEntry;
	export let changedTitle;
	export let changedMedia;
	export let changedImage_credit;
	export let changedStart_date;
	export let changedBody;  
	export let newTitle;
	export let newMedia;
	export let newImage_credit;
	export let newStart_date;
	export let newBody;  
	
	let user;
	userStore.subscribe((value) => {
		user = value && value.email ? value : null;
	});

	const dispatch = createEventDispatcher();
	const reset = () => dispatch("reset");
	user = true; // for testing

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
		reset();
	}

	const cancelAdd= () => {
		addNew();
	}

	const saveChanges = async() => {
		if(changedTitle.length != 0 && changedStart_date.length != 0){
			try {
				const { data, error } = await supabase
						.from('timeline')
						.update(
						{ title: changedTitle }, 
						{ image: changedMedia }, 
						{ image_credit: changedImage_credit }, 
						{ start_date: changedStart_date }, 
						{ body: changedBody })
						.eq("id", currentEntry)
				}catch(error){
					console.log("Title" + error)
				}
			dispatch("saveEdit");	
			changeMenu();
			reset();
		}else{
			//toast
		}
	}

	const saveNew= async() => {
		if(newTitle.length != 0 && newStart_date.length != 0){

		}	
	}

	function deleteEntry() {
		console.log(currentEntry);
	}


</script>

{#if user}
	<div transition:slide class="edit-items">
		{#if enableEditing}
			<button transition:slide on:click={cancelChanges}
				><span class="material-symbols-rounded i">close</span>Cancel</button>
			<div transition:slide class="line" />
			<button transition:slide class="options" on:click={saveChanges} 
				><span class="material-symbols-rounded i">save</span>Save</button>
			<div transition:slide class="line" />
			<button transition:slide class="options" on:click={deleteEntry}
				><span class="material-symbols-rounded i">delete</span>Delete</button>
		{:else if enableAdding}
			<button transition:slide on:click={cancelAdd}
			><span class="material-symbols-rounded i">close</span>Cancel</button>
			<div transition:slide class="line" />
			<button transition:slide class="options" on:click={saveNew} 
				><span class="material-symbols-rounded i">save</span>Save</button>
		{:else}
			<button transition:slide on:click={changeMenu}
				><span class="material-symbols-rounded i">edit</span>Edit</button>
			<div transition:slide class="line" />
			<button transition:slide on:click={addNew}
				><span class="material-symbols-rounded i">add</span>Add</button>
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
