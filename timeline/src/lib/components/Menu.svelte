<script>
	import { fly } from "svelte/transition";
	import { page } from "$app/stores";
    import supabase from "$lib/supabaseClient";
	import {getSessionUser} from '$lib/authStore.js'
	import{readable} from 'svelte/store'
    import { prevent_default, onMount } from "svelte/internal";

	export let open;

	let sessionUser = false;

	async function checkSession(){
		sessionUser = await getSessionUser();
		console.log("user logged in: "+sessionUser);
	}
	checkSession();

	const logout = () => {
		console.log("logged out");
		supabase.auth.signOut();
		// location.reload();
	}
	
</script>

{#if open}
	<div class="menu" transition:fly={{ x: -100 }}>
		<ul>
			<li
				aria-current={$page.url.pathname === "/" ? "page" : undefined}
				transition:fly={{ x: -24, delay: 50 }}>
				<a href="/" on:click={() => (open = false)}>Home</a>
			</li>
			<li
				aria-current={$page.url.pathname === "/about" ? "page" : undefined}
				transition:fly={{ x: -24, delay: 100 }}>
				<a href="/about" on:click={() => (open = false)}>About</a>
			</li>
			<li
				aria-current={$page.url.pathname.startsWith("/contact")
					? "page"
					: undefined}
				transition:fly={{ x: -24, delay: 150 }}>
				<a href="/contact" on:click={() => (open = false)}>Contact</a>
			</li>
			{#if sessionUser==true}
				<li
					aria-current={$page.url.pathname.startsWith("/login")
						? "page"
						: undefined}
					transition:fly={{ x: -24, delay: 150 }}>
					<a href="/login" on:click={(event) =>{event.preventDefault(); logout(); open=false; }}>Log Out</a>
				</li>
			{:else}
				<li
					aria-current={$page.url.pathname.startsWith("/login")
						? "page"
						: undefined}
					transition:fly={{ x: -24, delay: 150 }}>
					<a href="/login" on:click={() => (open = false)}>Log In</a>
				</li>
			{/if}
		</ul>
	</div>
{/if}

<style>
	.menu {
		user-select:none;
		display:flex;
		z-index: 1;
		position: fixed;
		top: 5rem;
		left: -2px;
		font-size:var(--font-size-small);
		letter-spacing: 0.1em;
		height: auto;
		background-color: var(--color-bg-1);
		backdrop-filter: blur(1em);
		box-shadow: 0 0 1em rgba(16, 13, 46, 0.2);
		border-radius: 0 1em 1em 0em;
	}
	
	ul {
		width: calc(12 * var(--font-size-base));
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

	li a {
		padding: 1.5em 3em;
		margin: 0;
		color: var(--color-text);
		text-decoration: none;
	}

	li:hover {
		background: rgba(16, 13, 46, 0.082);
		letter-spacing: 0.12em;
		color: var(--color-theme-1);
	}
</style>
