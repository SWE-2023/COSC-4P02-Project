<!-- based on https://dev.to/giorgosk/smooth-page-transitions-in-layout-svelte-with-sveltekit-or-sapper-4mm1 -->
<script>
	import { fly } from "svelte/transition";
</script>

<div
	in:fly={{ y: -50, duration: 300, delay: 301 }}
	out:fly={{ y: -50, duration: 300 }}>
	<slot />
</div>
