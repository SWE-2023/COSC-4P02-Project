<script>
	// @ts-nocheck
    function IncFontSize() {
		var elmntsToChg = document.querySelectorAll('h1, p, label');

		// Can probably split this up into methods but I don't know if this is the final method of changing fontsize so i'll leave it like so for now
		for (let i = 0; i < elmntsToChg.length; i ++) {
			let temp = window.getComputedStyle(elmntsToChg[i]).fontSize;
			// 1 rem is equal to 16px and ^ returns size in px
			let tem = parseInt(temp); // turn into float
			tem = tem + 16; // add 16 to inc by 1 rem equival
			tem = tem / 16; // div by 16 to turn back to rem equival
			let finaltem = tem.toString() + 'rem'; // change back to 'rem' style
			// console.log(tem);

			elmntsToChg[i].style.fontSize = finaltem; // changes size

		}

	}

	function DecFontSize() {
		var elmntsToChg = document.querySelectorAll('h1, p, label');
		
		for (let i = 0; i < elmntsToChg.length; i ++) {	
			let temp = window.getComputedStyle(elmntsToChg[i]).fontSize;
			// 1 rem is equal to 16px and ^ returns size in px
			let tem = parseInt(temp); // turn into float (js acting weird if i just use the same variable, so using another)
			tem = tem - 16; // subt 16 to dec by 1 rem equival
			tem = tem / 16; // div by 16 to turn back to rem equival
			let finaltem = tem.toString() + 'rem'; // change back to 'rem' style
			// console.log(tem);

			elmntsToChg[i].style.fontSize = finaltem; // changes size

		}

	}

</script>

<button class="PosButton" on:click={IncFontSize}>+</button>
<button class="NegButton" on:click={DecFontSize}>-</button>

<style>
    .PosButton {
		position: absolute;
		top: 15%;
		left: 90%;
	}

	.NegButton {
		position: absolute;
		top: 15%;
		left: 92%;
	}
</style>
