<script>
	import PageTransition from "$lib/components/PageTransitionFly.svelte";
	import Button from "$lib/components/Button.svelte";

	let email = "";

	const handleForgotPassword = () => {
		// console.log("i forgor 💀");
	};
</script>

<svelte:head>
	<title>Forgot Password</title>
	<meta
		name="description"
		content="Forgot your password? Enter your email to reset it" />
</svelte:head>

<PageTransition>
	<section class="page">
		<h1>Forgot Password</h1>
		<p>Enter your email to reset your password</p>

		<div class="forgot-container">
			<div class="form">
				<label for="email">Email</label>
				<input type="text" id="email" bind:value={email} />
			</div>
			<Button
				alt
				on:click={handleForgotPassword}
				text="Reset Password"
				href="/login" />
		</div>
	</section>
</PageTransition>

<style>
	.forgot-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.form {
		display: flex;
		flex-direction: column;
		align-items: left;
	}

	.form label {
		padding: 0 0 0 1rem;
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
</style>
