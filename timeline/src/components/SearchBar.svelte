<script>
    import { createEventDispatcher } from "svelte";
    import DropDownMenu from "./DropDownMenu.svelte";
    import { faSearch } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa/src/fa.svelte";
    export let currentDropDownSelection;
    export let searchBarOpacity = 1;
    export let titles;
    let showResults = false; //to only show items when an input is given
    let filtered = [];
    let userInput = "";
    const dispatch = createEventDispatcher();
    const notify = () => dispatch("selectionMade");
    const findTitles = () => { return filtered = titles.filter(item => item.toLowerCase().match(userInput.toLowerCase())); }

    const showDropDown = () => {
        if(userInput != ""){
            showResults = true;
        }else{
            showResults = false;
        }
    }
</script>

<div class="container" style="opacity:{searchBarOpacity}">
    <input type="text" placeholder="Search" class="search-box" bind:value={userInput} on:input={showDropDown} on:input={findTitles}>
    <div class="icon">
        <Fa icon={faSearch} color="brown"/>
    </div>
</div>
<DropDownMenu 
    bind:currentlyTitle={currentDropDownSelection} 
    bind:currentOpacity={searchBarOpacity}
    show={showResults} 
    list={filtered} 
    on:itemSelected={notify}/>		

<style>
    .container {
        position: relative;
        height: 30px;
        width: 220px;
        border: 2px solid brown;
        padding: 0px 10px;
        border-radius: 50px;
        display:flex;
        flex-direction: row;
        align-items: center;
        background-color: white;
    }

    .icon {
        background-color: transparent;
        border: none;
    }

    .icon:hover {
        cursor: alias;
    }

    .search-box {
        width: 200px;
        border: none;
        border-radius: 50px;
        font-size: 15px;
        color: brown;
        font-family: var(--font-sans);
    }

    .search-box:focus {
        outline:none;
    }
</style>