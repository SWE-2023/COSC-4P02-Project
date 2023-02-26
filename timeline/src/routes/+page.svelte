<script>
	import Button from "../components/Button.svelte";
	import { fade } from "svelte/transition";
	import PageTransition from "../components/PageTransition.svelte";

	let headerText = [
		"Explore the rich history of our town.",
		"Discover our heritage.",
		"Travel through time with us.",
		"Explore the rich history of our town.",
		"Discover our heritage.",
		"Travel through time with us.",
	];

	let currentOption = 0, titleSize = 3.5, subtitleSize = 2.5, subtextSize = 1.5;;

	setInterval(() => {currentOption = (currentOption + 1) % headerText.length;}, 10000);

	function IncFontSize() {
		var elmntsToChg = document.querySelectorAll('[id=text]');
		
		for (let i = 0; i < elmntsToChg.length; i ++) {
			// @ts-ignore
			if (!elmntsToChg[i].style.fontSize) {
				if (elmntsToChg[i].className.includes('title', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "3.5rem";

				} else if (elmntsToChg[i].className.includes('subtitle', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "2.5rem";
				
				} else {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "1.5rem";
					
				}

			} else {
				// console.log('defaulted here now');
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
		
		for (let i = 0; i < elmntsToChg.length; i ++) {
			// @ts-ignore
			if (!elmntsToChg[i].style.fontSize) {
				if (elmntsToChg[i].className.includes('title', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "3.5rem";

				} else if (elmntsToChg[i].className.includes('subtitle', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "2.5rem";
				
				} else {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "1.5rem";
					
				}

			} else {
				// @ts-ignore
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
	<title>Home | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Niagara-on-the-Lake History Timeline" />
</svelte:head>

<button class="PosButton" on:click={IncFontSize}>+</button>
<button class="NegButton" on:click={DecFontSize}>-</button>

<PageTransition>
	<section class="welcome">
		<h1 class="title" id="text">
			Welcome to the<br /><span style="color:var(--color-theme-1)"
				>Niagara-on-the-Lake</span> Timeline
		</h1>

		<!-- TODO add transitions between headers -->
		<h1 class="subtitle" id="text" in:fade>{headerText[currentOption]}</h1>

		<p class="subtext" id="text">
			A digital interactive timeline of the history of the Niagara-on-the-Lake
		</p>

		<Button href="/timeline" text="Explore the Timeline" />
	</section>
</PageTransition>

<style>
	.title {
		font-family: Georgia, "Times New Roman", Times, serif;
		padding: 2em 0 0 0;
		text-align: start;
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0;
	}

	.subtitle {
		font-family: var(--font-serif);
		padding: 1em 0 0 0;
		text-align: start;
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0;
	}

	.subtext {
		padding: 1em 0 1em 0;
		text-align: start;
		font-size: 1.5rem;
		font-weight: 800;
		margin: 0;
		text-transform: uppercase;
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
