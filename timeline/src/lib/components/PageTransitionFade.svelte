<script>
	import { fade } from "svelte/transition";
</script>

<div
	in:fade={{ duration: 500, delay: 501 }}
	out:fade={{  duration: 500 }}>
	<slot />
 </div>