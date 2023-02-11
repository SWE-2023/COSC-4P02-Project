<script>
  import { Hamburger } from "svelte-hamburgers";
  import Menu from "./Menu.svelte";

  let open;
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,500,0,200" />

<header>
  <nav>
    <div class="left">
      <Hamburger bind:open --color="var(--color-theme-1)" type="arrowalt" />
      <Menu bind:open />
      <a href="/"><img src="assets/notl-museum.svg" alt="logo" class="logo" /></a>
    </div>

    <div class="right">
      <a href="/"><span class="material-symbols-outlined accessibility" style="scale: 1.2;">settings</span>
		<!-- TODO -->
		<!-- reuse Menu component for accesibility panel -->
	</div>
  </nav>
</header>

<style>

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		z-index: 100;
	}

	.logo {
		position: relative;
		margin: 0 0 0 1em;
		width: auto;
		height: 3.5rem;
		border-radius: 0.5rem 0.5rem 0 0;
	}

	.left {
		display: flex;
		align-items: center;
		margin-left: .75em;
	}
	
	.right {
		display: flex;
	  justify-content: flex-end;
	  margin-right: 2em;
	}

	.accessibility {
		transform: rotate(0);

		transition: transform 0.33s ease-out;
	}

	.accessibility:hover {
		transform: rotate(180deg);
	}

	header {
		padding: 0.6em 0 0 0.6em;
    	top: 0;
    	left: 0;
    	width: 100%;
    	height: 5rem;
    	z-index: 100;
	}


</style>
