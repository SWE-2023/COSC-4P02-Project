<script>
	import { onMount } from "svelte";
	import PageTransition from "../../components/PageTransitionFly.svelte";
	import Button from "../../components/Button.svelte";

	let email = "";
	let password = "";

	const handleLogin = () => {
		// console.log(`email: ${email}`);
		// console.log(`pass: ${password}`);
		// TODO: add login functionality
	};

	const gotoForgot = () => {
		// console.log("i forgor 💀");
		// TODO: add forgot password functionality
	};
</script>

<svelte:head>
	<title>Log In</title>
	<meta name="description" content="Log in to your account" />
</svelte:head>

<PageTransition>
	<section class="page">
		<div class="login-container">
			<h1>Log In</h1>
			<p>Enter your email and password</p>

			<div class="form">
				<label for="email">Email</label>
				<input type="text" id="email" bind:value={email} />
				<label for="password">Password</label>
				<input type="password" id="password" bind:value={password} />

				<div class="form-buttons">
					<Button
						on:click={gotoForgot}
						text="Forgot Password?"
						href="/login/forgot" />
					<Button alt on:click={handleLogin} text="Log In" href="/" />
				</div>
			</div>
		</div>
	</section>
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
