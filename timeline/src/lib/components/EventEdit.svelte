<script>
// @ts-nocheck
	
	import supabase from "../supabaseClient";
	import Button from "./Button.svelte";
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
		reset();
		changeMenu();
		
	}

	const cancelAdd= () => {
		reset();
		addNew();
		
	}

	function isValidDateFormat(dateString) {
		// Check that the string is in the format YYYY-MM-DD
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (!dateRegex.test(dateString)) {
			return false;
		}

		// Split the string into year, month, and day components
		const [year, month, day] = dateString.split('-');

		// Check that the month is in the range 01-12
		if (Number(month) < 1 || Number(month) > 12) {
			return false;
		}

		// Check that the day is in the range 01-31
		if (Number(day) < 1 || Number(day) > 31) {
			return false;
		}

		// All checks passed, so the date is valid
		return true;
	}

	const saveChanges = async() => {
		if(changes.title.length != 0 && changes.start_date.length != 0){
			if(isValidDateFormat(changes.start_date)){
				try {
					const { error } = await supabase
						.from('timeline')
						.update({
							title: changes.title,
							image: changes.media,
							image_credit: changes.image_credit,
							start_date: changes.start_date,
							body: changes.body
						})
						.eq("id", currentEntry);

						if (error) {
							throw error;
						}

						dispatch("saveEdit");
						reset();	
						changeMenu();
					}catch(error){
						console.log(error) 
						//toast
					}
			}else{
				//taost
			}
		}else{
			//toast
		}
	}

	const saveNew= async() => {
		if(newItem.title.length != 0 && newItem.start_date.length != 0){
			if(isValidDateFormat(newItem.start_date)){
				try {

				}catch(error){
					console.log(error) //replace with toast?
				}
			}else{
				//toast
			}
		}else{
			//toast
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
