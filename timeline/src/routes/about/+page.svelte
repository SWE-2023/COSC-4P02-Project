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
		<h1>About</h1>
		<p>Located in southern Ontario, Niagara-on-the-Lake (NOTL) is a town that resides on the shores of Lake Ontario at the core of the Niagara River. Despite being a small town with an area of 132.8 km2 serving as a home to a population of 17,511 (2016), the land has a rich history dating back to the 19th-century with remnants of buildings along Queen Street. From being where the British built Fort George to defend against American offensives in the 19th-century, to a town filled with flowers and lined with trees that hosts the summer Shaw Festival and its iconic wineries.</p>
		<p>NOTL Museum operated and owned by Niagara Historical Society (est. 1895) continues to present and represent Niagara-on-the-Lake’s rich heritage and history. The museum is home to over 8500 artifacts, 41,000 documents, 400 photographs and 900 books ranging from the Indigenous settlement period to the present day, the site being a fusion of 3 independent buildings: The High School building (1875), Memorial Hall (1907) and the Link Building (1971). A permanent exhibition, ‘Our Story’, documents the history of NOTL is hosted by the museum in addition to 2 temporary exhibitions hosted yearly and over 80 engaging programs that are enjoyed by people from all walks of life.</p>
	</section>
</PageTransition>

<style>
</style>
