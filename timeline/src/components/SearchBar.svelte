<script>
    import { faSearch } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa/src/fa.svelte";
    export let currentPage;
</script>


{#if currentPage == '../routes/timeline/+page.svlete'}
    <div class="container">
        <button class="icon">
            <Fa icon={faSearch} size="21px"/>
        </button>
    </div>
{/if}


<style>
    .container .icon{
        position:absolute;
        left: 30px;
        top: 50%;
    }
</style>