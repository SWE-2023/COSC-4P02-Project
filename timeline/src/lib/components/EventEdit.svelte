<script>
    import Button from "./Button.svelte";
    export let logedIn = true;
    let openMenu = 0;

    function changeMenu() {
        openMenu = 1 - openMenu.valueOf(); // change from 1 or 0 for true/false
    }

    function saveChanges() {
        console.log('save changes');

    }

    function deleteChanges() {
        console.log('delete changes');
    }

</script>

{#if logedIn}
    <div class="edit-items">
        <button class="menu-button" on:click={changeMenu}>Edit</button>

        {#if openMenu}
            <button class="dropdown-options" on:click={saveChanges}>Save</button>
            <button class="dropdown-options" on:click={deleteChanges}>Delete</button>
        {/if}

    </div>
    
{/if}

<style>
    .edit-items {
        position: absolute;
        left: 95%;
    }

    .menu-button {
        font-family: var(--font-sans);
        font-size: var(--font-size-small);
        font: var(--font-sans);
		color: var(--button-color);
        background: var(--button-background);
		border: 2px solid var(--button-border);
        border-radius: 5px;
        gap: 5px;
    }
    
    .menu-button:hover, .dropdown-options:hover {
		color: var(--button-hover-color);
        background: var(--button-hover-background);
		transition: background-color 0.15s ease-out;
    }

    .menu-button:active, .dropdown-options:active {
        transition: none;
        background-color: var(--button-active-background);
        transform: scale(0.98);
    }

    .dropdown-options {
		color: var(--button-color);
        background: var(--button-background);
        font-size: 1.1rem;
		border: 2px solid var(--button-border);
        border-radius: 5px;
        gap: 5px;
    }

    /* .dropdown-options:hover {
        background: var(--button-hover-background);
        color: var(--button-hover-color);
        transition: background-color 0.15s ease-out;
    }

    .dropdown-options:active {
        transition: none;
        background-color: var(--button-active-background);
        transform: scale(0.98);
    } */

</style>