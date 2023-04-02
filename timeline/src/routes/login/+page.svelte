<script>
	import PageTransition from "$lib/components/PageTransitionFly.svelte";
	import Button from "$lib/components/Button.svelte";
	import { login } from "$lib/authStore";
	import { logout } from "$lib/authStore";
	import { userStore } from "$lib/authStore";

	let user;
	userStore.subscribe((value) => {
		user = value;
	});

	let loading = false;

	let email = "";
	const handleLogin = async () => {
		loading = true;
		await login(email);
		loading = false;
	};
</script>

<svelte:head>
	<title>Log In</title>
	<meta name="description" content="Log in to your account" />
</svelte:head>

<PageTransition>
	<div class="login-container">
		{#if user && user.email}
			<h1>You are already logged in</h1>
			<p>Click the button below to log out</p>
			<div class="form">
				<div class="form-buttons">
					<div><Button text="Back" href="/" /></div>
					<div>
						<Button alt on:click={logout} text="Log Out" {loading} />
					</div>
				</div>
			</div>
		{:else}
			<h1>Log In</h1>
			<p>Enter your email to receive a log in link</p>

			<div class="form">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="username@email.com" />

				<div class="form-buttons">
					<div><Button text="Back" href="/" /></div>
					<div>
						<Button
							alt
							on:click={handleLogin}
							text="Send Log In Link"
							{loading} />
					</div>
				</div>
			</div>
		{/if}
	</div>
</PageTransition>

<style>
	.login-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.form {
		display: flex;
		flex-direction: column;
		align-items: left;
	}
	.form-buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}
	.form label {
		padding: 0 0 0 1em;
		margin-top: 1rem;
	}
	.form input {
		text-align: left;
		max-width: 30rem;
		margin: 0.5em 0.5em 2em;
		padding: 0.8em;
		border-radius: 0.5em;
		border: 2px solid white;
		box-shadow: 0 0 1px 1px #0000004d;
		transition: border 0.15s ease;
	}
	input:focus {
		outline: none;
		border: 2px solid #000000;
	}
</style>
