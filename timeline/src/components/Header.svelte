<script>
	import { Hamburger } from 'svelte-hamburgers';
    import Menu from './Menu.svelte';

    let open;
</script>

<header>
	<nav>
		<Hamburger bind:open --color="var(--color-theme-1)" type="arrowalt"/>
		<Menu bind:open />
		<img src="assets/notl-museum.svg" alt="logo" class="logo"/>
	</nav>
</header>

<style>
	.logo {
		margin:0 0 0 1em;
		position: absolute;
		width: auto;
		height: 3.5rem;
		top: 0.5rem;
		border-radius: 0.5rem 0.5rem 0 0;
	}

	header {
		padding:0.6em 0 0 0.6em;
		top: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		z-index: 100;
	}
</style>
