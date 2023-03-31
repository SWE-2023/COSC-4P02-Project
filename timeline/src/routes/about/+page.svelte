<script>
	import { fade } from "svelte/transition";
	import PageTransition from "$lib/components/PageTransitionFly.svelte";
</script>

<svelte:head>
	<title>About | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="About page" />
</svelte:head>

<PageTransition>
	<section class="page" in:fade>
		<img
			width="196"
			src="/assets/notl-museum.svg"
			alt="Niagara-on-the-Lake Museum Logo" />
		<h1>About The Niagara-on-the-Lake Museum</h1>
		<p>
			Niagara-on-the-Lake (NOTL) is a small town located in southern Ontario,
			Canada. Despite its size, it has a rich history dating back to the 19th
			century. The town was home to Fort George, which was built by the British
			to defend against American offensives in the 19th century. Today, NOTL is
			known for its beautiful flowers and trees and is home to the summer Shaw
			Festival and its iconic wineries.
		</p>
		<p>
			The NOTL Museum is operated and owned by the Niagara Historical Society
			(est. 1895) and continues to present and represent Niagara-on-the-Lake’s
			rich heritage and history. The museum has over 8,500 artifacts, 41,000
			documents, 400 photographs, and 900 books ranging from the Indigenous
			settlement period to the present day. The museum hosts a permanent
			exhibition called “Our Story,” which documents the history of NOTL. It
			also hosts two temporary exhibitions yearly and over 80 engaging programs
			that are enjoyed by people from all walks of life.
		</p>
	</section>
</PageTransition>

<style>
	.page p {
		text-transform: none;
		font-weight: 400;
		text-align: justify;
	}

	h1 {
		padding-top:2rem;
		line-height:1;
	}

	.page {
		display: flex;
		align-items: center;
		flex-flow: column;
		margin: 0 auto;
		max-width: 60rem;
	}
</style>
