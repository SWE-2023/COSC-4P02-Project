<script>
	import { fade } from "svelte/transition";
</script>

<div
	in:fade={{ duration: 250, delay: 251 }}
	out:fade={{  duration: 250 }}>
	<slot />
 </div>