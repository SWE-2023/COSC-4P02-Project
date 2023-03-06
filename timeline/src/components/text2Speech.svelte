<script>
	import { onDestroy, onMount } from "svelte";

	export let body;
	export let title;
	export let start_date;
	
    let speaking = false;
	let currentUtterance;
	let voice;

	function text2Speech() {
		if (!speaking) {
			const utterances = [
				new SpeechSynthesisUtterance(title),
				new SpeechSynthesisUtterance(start_date),
				new SpeechSynthesisUtterance(body),
			];

			utterances.forEach((utterance) => {
				utterance.voice = voice;
				utterance.lang = "en-US";
				utterance.rate = 0.75;
				utterance.pitch = 1;
			});

			for (let i = 0; i < utterances.length; i++) {
				const utterance = utterances[i];
				utterance.onend = () => {
					if (currentUtterance === utterance) {
						currentUtterance = null;
						speaking = false;
					}
				};
				speechSynthesis.speak(utterance);
			}
			currentUtterance = utterances[2];
			speaking = true;
		}
	}

	function stop() {
		if (speaking) {
			speechSynthesis.cancel();
			currentUtterance = null;
			speaking = false;
		}
	}

	// clean up speech synthesis resources when component is removed from DOM
	function cleanupSpeech() {
		if (speaking) {
			speechSynthesis.cancel();
		}
	}

	// add event listener to remove event listeners when component is destroyed
	if (typeof window !== "undefined") {
		window.addEventListener("unload", cleanupSpeech);
	}

	onMount(() => {
		window.speechSynthesis.onvoiceschanged = () => {
			voice = window.speechSynthesis.getVoices().filter(function (voice) {
				return voice.name == "Microsoft Zira - English (United States)";
			})[0];
		};
	});

	onDestroy(() => {
		cleanupSpeech();
	});
</script>

<div class="tts-container">
	{#if speaking}
		<button title="Stop Reading" class="text2Speech" on:click={stop}>
			<span class="material-symbols-rounded">stop</span>
		</button>
	{:else}
		<button title="Read Aloud" class="text2Speech" on:click={text2Speech}>
			<span class="material-symbols-rounded">volume_up</span>
		</button>
	{/if}
</div>

<style>
	.tts-container {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin: calc(-1 * var(--font-size-xxlarge)) 0 0 0;
	}

	.text2Speech {
		color: var(--color-text);
		opacity: 0.8;
		cursor: pointer;
		display: inline-flex;
		border: none;
		background: transparent;
		transition: all 0.2s ease-in-out;
	}

	.text2Speech span {
		font-size: var(--font-size-large);
		transition: transform 0.2s ease-in-out;
	}

	.text2Speech:hover span {
		transform: scale(1.1);
	}

	.text2Speech:hover {
		opacity: 1;
		color: var(--color-theme-1);
	}
</style>
