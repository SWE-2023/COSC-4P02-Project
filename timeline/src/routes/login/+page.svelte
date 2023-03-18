<script>
	import { onMount } from "svelte";
	import PageTransition from "$lib/components/PageTransitionFly.svelte";
	import Button from "$lib/components/Button.svelte";
    import supabase from "$lib/supabaseClient";
    import { error } from "@sveltejs/kit";

	let loading=false;
	let email;

	// handle logins
	const handleLogin = async () => {

		try {
			loading=true;
			console.log(email);
			
			const {error} = await supabase.auth.signInWithOtp({email});
			if (error) throw error;
			alert('A login link has been sent to your email')
			
		} catch (error) {
			// console.error(err);
			// alert(error.message);
			if(error instanceof Error){
				alert(error.message);
			}
		}finally{
			loading = false;
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
			<input type="email" id="email" bind:value={email} placeholder="username@email.com"/>

			<div class="form-buttons">
				<Button text="Home" href = "/"/>
				<Button alt on:click={handleLogin} text="Send Log In Link" />
				
			</div>
		</div>
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
