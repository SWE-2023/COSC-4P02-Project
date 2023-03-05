<script>
    import { faSearch } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa/src/fa.svelte";
    export let searchBarOpacity = 1;

</script>

<div class="container" style="opacity:{searchBarOpacity}">
    <input type="text" placeholder="Search" class="search-box">
    <button class="icon">
        <Fa icon={faSearch} color="brown"/>
    </button>
</div>

<style>
    .container {
        position: relative;
        height: 30px;
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