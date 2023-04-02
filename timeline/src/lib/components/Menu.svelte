<script>
	import { fly } from "svelte/transition";
	import { page } from "$app/stores";
	import { userStore, logout } from "$lib/authStore";

	export let open;
	let user;
	userStore.subscribe((value) => {
		user = value;
	});
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
			{#if user && user.email}
				<li
					aria-current={$page.url.pathname.startsWith("/login")
						? "page"
						: undefined}
					transition:fly={{ x: -24, delay: 150 }}>
					<a
						href="/"
						on:click={(event) => {
							event.preventDefault();
							logout();
							open = false;
						}}>
						<p>{user.email}</p>
						Log Out</a>
				</li>
			{:else}
				<li
					aria-current={$page.url.pathname.startsWith("/login")
						? "page"
						: undefined}
					transition:fly={{ x: -24, delay: 150 }}>
					<a class="login" href="/login" on:click={() => (open = false)}
						>Log In</a>
				</li>
			{/if}
		</ul>
	</div>
{/if}

<style>
	.menu {
		user-select: none;
		display: flex;
		z-index: 1;
		position: fixed;
		top: 5rem;
		left: -2px;
		font-size: var(--font-size-small);
		letter-spacing: 0.1em;
		height: auto;
		background-color: var(--color-bg-1);
		backdrop-filter: blur(1em);
		box-shadow: 0 0 1em rgba(16, 13, 46, 0.2);
		border-radius: 0 1em 1em 0em;
	}
	ul {
		width: calc(16 * var(--font-size-base));
		list-style: none;
		padding: 0;
	}

	li {
		color: #0d0d0d;
		cursor: pointer;
		padding: 0;
		transition: letter-spacing 0.2s ease-in-out, color 0.33s var(--curve);
	}

	li[aria-current="page"] {
		border-right: var(--color-theme-1) 0.25em solid;
		transition: border-right 0.33s var(--curve);
	}

	li a {
		margin: 0;
		display: block;
		padding: 1.5rem 3rem;
		color: var(--color-text);
		text-decoration: none;
	}

	li:last-child a:last-child {
		padding: 0 3rem 1.5rem 3rem;
	}

	.login {
		padding: 1.5rem 3rem !important;
	}

	li p {
		margin: 0;
		padding: 1.5rem 3rem 0.5rem 0;
		font-size: var(--font-size-xsmall);
		color: var(--color-theme-1);
	}

	li:hover {
		background: rgba(16, 13, 46, 0.082);
		letter-spacing: 0.12em;
		color: var(--color-theme-1);
	}
</style>
