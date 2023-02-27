<script>
	import { onMount } from "svelte";
	import PageTransition from "../../components/PageTransition.svelte";
	import Button from "../../components/Button.svelte";
	
	let email = "";
	let password = "";
	
	const handleLogin = () => {
		console.log(`email: ${email}`);
		console.log(`pass: ${password}`);
		// TODO: add login functionality
	};
	
	const gotoForgot = () => {
    console.log("i forgor 💀");
	// TODO: add forgot password functionality
  };
</script>

<svelte:head>
	<title>Log In</title>
	<meta name="description" content="Log in to your account" />
</svelte:head>

<PageTransition>
  <div class="login-container">

    <h1 id="text">Log In</h1>
	  <p id="text">Enter your email and password</p>

		<div class="form">
			<label for="email" id="text">Email</label>
			<input type="text" id="email" bind:value={email} />
			<label for="password" id="text">Password</label>
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
</PageTransition>

<style>
	h1 {
		font-family: var(--font-serif);
		padding: 1em 0 0 0;
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0;
	}
	p {
		padding: 1em 0 1em 0;
		font-size: 1.33rem;
		font-weight: 400;
		margin: 0;
		text-align: center;
	}
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
		font-size: 1.2rem;
	}
	.form input {
		text-align: left;
		font-size: 1.2rem;
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
