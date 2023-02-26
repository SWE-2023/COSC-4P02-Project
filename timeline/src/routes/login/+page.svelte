<script>
	import { onMount } from "svelte";
	import PageTransition from "../../components/PageTransition.svelte";
	import Button from "../../components/Button.svelte";
	import { onMount } from "svelte";
	import PageTransition from "../../components/PageTransition.svelte";
	import Button from "../../components/Button.svelte";

	let email = "";
	let password = "";
	let email = "";
	let password = "";

	const handleLogin = () => {
		console.log(`email: ${email}`);
		console.log(`pass: ${password}`);
		// TODO: add login functionality
	};
	const handleLogin = () => {
		console.log(`email: ${email}`);
		console.log(`pass: ${password}`);
		// TODO: add login functionality
	};

  const gotoForgot = () => {
    console.log("i forgor 💀");
	// TODO: add forgot password functionality
  };

  function IncFontSize() {
		var elmntsToChg = document.querySelectorAll('[id=text]');
		
		console.log(elmntsToChg);
		
		// elmntsToChg.forEach(elmnt => {
		// 	elmnt.style.font-size = "4rem";
		// });

		for (let i = 0; i < elmntsToChg.length; i ++) {
			// @ts-ignore
			console.log(elmntsToChg[i].style.fontSize);
			// @ts-ignore
			// elmntsToChg[i].style.fontSize = "5rem";

			// @ts-ignore
			if (!elmntsToChg[i].style.fontSize) {
				console.log('still here');
				// if (elmntsToChg[i].className === 'title') {
				if (elmntsToChg[i].className.includes('title', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "3.5rem";

				} else if (elmntsToChg[i].className.includes('subtitle', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "2.5rem";
				
				// } else if (elmntsToChg[i].className.includes('subtext')) {
				} else {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "1.5rem";
					// @ts-ignore
					// console.log(elmntsToChg[i].style.fontSize);

				}

			} else {
				console.log('defaulted here now');
				// get fontSize which is string
				// trimm the 'rem' off the end so only the numerical digit is present
				// turn into integer (any number format)
				// increase that integer by 1, (decided to add 1 instead since parseFloat() func doess the top steps 2 in 1 go)
				// turn integer back to string
				// attach 'rem' back too the end of the integer
				// set that as it's new fontSize
				// @ts-ignore
				// elmntsToChg[i].style.fontSize = elmntsToChg[i].style.fontSize + (1 * "1rem");

				let temp = elmntsToChg[i].style.fontSize;
				temp = parseFloat(temp);
				temp = temp + 1;
				let finalTemp = temp.toString() + 'rem';

				// @ts-ignore
				elmntsToChg[i].style.fontSize = finalTemp;


			}

		}

	}
	
	function DecFontSize() {
		var elmntsToChg = document.querySelectorAll('[id=text]');
		
		// console.log(elmntsToChg);

		for (let i = 0; i < elmntsToChg.length; i ++) {
			// @ts-ignore
			// console.log(elmntsToChg[i].style.fontSize);

			// @ts-ignore
			if (!elmntsToChg[i].style.fontSize) {
				console.log('still here');
				// if (elmntsToChg[i].className === 'title') {
				if (elmntsToChg[i].className.includes('title', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "3.5rem";

				} else if (elmntsToChg[i].className.includes('subtitle', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "2.5rem";
				
				// } else if (elmntsToChg[i].className.includes('subtext')) {
				} else {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "1.5rem";
					// @ts-ignore
					// console.log(elmntsToChg[i].style.fontSize);

				}

			} else {
				console.log('defaulted here now');
				// get fontSize which is string
				// trimm the 'rem' off the end so only the numerical digit is present
				// turn into integer (any number format)
				// increase that integer by 1, (decided to add 1 instead since parseFloat() func doess the top steps 2 in 1 go)
				// turn integer back to string
				// attach 'rem' back too the end of the integer
				// set that as it's new fontSize
				// @ts-ignore
				// elmntsToChg[i].style.fontSize = elmntsToChg[i].style.fontSize + (1 * "1rem");

				let temp = elmntsToChg[i].style.fontSize;
				temp = parseFloat(temp);
				temp = temp - 1;
				let finalTemp = temp.toString() + 'rem';

				// @ts-ignore
				elmntsToChg[i].style.fontSize = finalTemp;


			}

		}

	}

</script>

<svelte:head>
	<title>Log In</title>
	<meta name="description" content="Log in to your account" />
	<title>Log In</title>
	<meta name="description" content="Log in to your account" />
</svelte:head>

<button class="PosButton" on:click={IncFontSize}>+</button>
<button class="NegButton" on:click={DecFontSize}>-</button>

<PageTransition>
  <div class="login-container">

    <h1 id="text">Log In</h1>
	  <p id="text">Enter your email and password</p>

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
</PageTransition>

<style>
	h1 {
		font-family: var(--font-serif);
		padding: 1em 0 0 0;
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0;
	}
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

  .PosButton {
		position: absolute;
		top: 15%;
		left: 96%;
	}

	.NegButton {
		position: absolute;
		top: 15%;
		left: 98%;
	}

</style>
