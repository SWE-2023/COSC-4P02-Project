<script>
	import Button from "../components/Button.svelte";
	import { fade } from "svelte/transition";
	import PageTransition from "../components/PageTransition.svelte";

	let headerText = [
		"Explore the rich history of our town.",
		"Discover our heritage.",
		"Travel through time with us.",
	];

	let currentOption = 0, titleSize = 3.5, subtitleSize = 2.5, subtextSize = 1.5;;

	setInterval(() => {currentOption = (currentOption + 1) % headerText.length;}, 10000);

	function initFontSize() {
		const varToString = varObj => Object.keys(varObj)[0];

		// var title = 3.5, subtitle = 2.5, subtext = 1.5;

		// console.log(document.getElementsByClassName(varToString({ title })));
		// get all titles, subtitles and subtext elements in the page and initialize their font size
		var titleArr = document.getElementsByClassName("title"), subtitleArr = document.getElementsByClassName("subtitle"), subtextArr = document.getElementsByClassName("subtext");

		for (let i = 0; i < titleArr.length; i ++) {
			// @ts-ignore
			console.log(titleArr[i].style.fontSize);

			// @ts-ignore
			if (titleArr[i].style.fontSize == '') {
				if (titleArr[i].className == 'title') {
					// @ts-ignore
					titleArr[i].style.fonrSize = 3.5;

				} else if (titleArr[i].className == 'subtitle') {
					// @ts-ignore
					titleArr[i].style.fonrSize = 2.5;
				
				} else if (titleArr[i].className == 'subtext') {
					// @ts-ignore
					titleArr[i].style.fonrSize = 1.5;

				}

			} else {
				// @ts-ignore
				titleArr[i].style.fontSize ++;

			}

		}

	}

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
	<title>Home | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Niagara-on-the-Lake History Timeline" />
</svelte:head>

<button class="PosButton" on:click={IncFontSize}>+</button>
<button class="NegButton" on:click={DecFontSize}>-</button>

<PageTransition>
<section>
<section class="welcome" >
	<h1 class="title" id="text">Welcome to the<br><span style="color:var(--color-theme-1)">Niagara-on-the-Lake</span> Timeline</h1>
	
	<!-- TODO add transitions between headers -->
	<h1 class="subtitle" id="text" in:fade>{headerText[currentOption]}</h1>
	
	<p class="subtext" id="text">A digital interactive timeline of the history of the Niagara-on-the-Lake</p>

		<Button href="/timeline" text="Explore the Timeline" />
	</section>
</PageTransition>

<style>
	.title {
		font-family: Georgia, "Times New Roman", Times, serif;
		padding: 2em 0 0 0;
		text-align:start;
		/* --titleSize: 3.5;
		font-size: calc(var(--titleSize) * 1rem); */
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
