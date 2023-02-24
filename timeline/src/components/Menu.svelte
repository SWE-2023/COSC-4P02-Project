<script>
    import { fly } from 'svelte/transition';
	import { page } from '$app/stores';

    export let open;

</script>

{#if open}
    <div class="menu" transition:fly={{ x: -100 }} >
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined} transition:fly={{  x: -24, delay: 50 }}>
				<a href="/"on:click={() => open = false}>Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined} transition:fly={{  x: -24, delay: 100 }}>
				<a href="/about"on:click={() => open = false}>About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/contact') ? 'page' : undefined} transition:fly={{  x: -24, delay: 150 }}>
				<a href="/contact"on:click={() => open = false}>Contact</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/login') ? 'page' : undefined} transition:fly={{  x: -24, delay: 150 }}>
				<a href="/login"on:click={() => open = false}>Log In</a>
			</li>		
		</ul>
    </div>
{/if}

<style>
    .menu {
		z-index: 1;
		position:fixed;
		top:5rem;
		left:-1px;
        font-size: 1.15em;
        letter-spacing: 0.1em;
		width:16rem;
		height:auto;
		background-color: var(--color-bg-1);
		backdrop-filter: blur(1em);
		box-shadow: 0 0 1em rgba(16, 13, 46, 0.2);
		border-radius: 0 1em 1em 0em;
    }

	ul {
		list-style: none;
		padding: 0;
	}

    li {
		color: #0d0d0d;
        cursor: pointer;
		padding: 1.5em 0;
		transition: letter-spacing 0.2s ease-in-out, color 0.2s ease-in-out;
    }

	li[aria-current="page"] {
		border-right: var(--color-theme-1) 0.25em solid;
		transition: border-right 0.2s ease-in-out;
	}

	li a{
		padding: 1.5em 3em;
		margin:0;
		color: var(--color-text);
		text-decoration: none;
	}

    li:hover {
		background:rgba(16, 13, 46, 0.082);
		letter-spacing: 0.12em;
		color: var(--color-theme-1);
    }
</style>