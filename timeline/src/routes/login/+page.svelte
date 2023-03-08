<script>
	import { onMount } from "svelte";
	import PageTransition from "../../components/PageTransitionFly.svelte";
	import Button from "../../components/Button.svelte";
    import supabase from "$lib/supabaseClient";

	let email="";
	// let password = "";

	// handle logins
	const magicLinkLogin = async () => {

		try{
			const { error } = await supabase.auth.signInWithOtp({ email });
		if (error) throw error
		alert('A login link has been sent to your email')
		}catch(error){
			if(error instanceof Error){
				alert(error.message)
			}
		}
	}
	
	// sign out - CONSIDER PUTTING THIS IN SEPARATE COMPONENT FOR ACCOUNT MANAGEMENT
	const signOut = async () => {
		try{
			let {error} = await supabase.auth.signOut();
			if (error) throw error

		}catch (error) {
			if (error instanceof Error){
				alert(error.message)
			}
		}
	}



	// async function signOut(){
	// 	const {error} = await supabase.auth.signOut()
	// }

	// const handleLogin = () => {
	// 	// console.log(`email: ${email}`);
	// 	// TODO: add login functionality
	// 	window.location.href='http://localhost:5173/home'; // CHANGE TO ACTUAL URL ONCE DEPLOYED
	// };

	// const gotoForgot = () => {
	// 	// console.log("i forgor 💀");
	// 	// TODO: add forgot password functionality
	// };
</script>

<svelte:head>
	<title>Log In</title>
	<meta name="description" content="Log in to your account" />
</svelte:head>

<PageTransition>
	<div class="login-container">
		<h1>Log In</h1>
		<p>Enter your email to receive a log in link</p>

		<div class="form">
			<label for="email">Email</label>
			<input type="text" id="email" bind:value={email} />
			<!-- <label for="password">Password</label>
			<input type="password" id="password" bind:value={password} /> -->

			<div class="form-buttons">
				<Button alt on:click={magicLinkLogin} text="Send Log In Link" />
				<Button text="Home" href = "/"/>
				
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
