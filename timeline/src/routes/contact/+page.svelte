<script>
	import { slide } from "svelte/transition";
	import PageTransition from "$lib/components/PageTransitionFly.svelte";
</script>

<svelte:head>
	<title>About | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Contact page" />
</svelte:head>

<PageTransition>

    <h1>Contact Us</h1>
                    
    

    <div class="container">
        <div class="embedded-map">
            <iframe loading="lazy" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11623.863995681377!2d-79.0716183!3d43.2521344!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf975dbf3ff67d6c0!2sNiagara-on-the-Lake%20Museum!5e0!3m2!1sen!2sca!4v1614106500408!5m2!1sen!2sca" style="border:0;" width="600" height="450"></iframe>

        </div>

        

        <div class="inquiry-form">
            <p>hello there</p>
        </div>
        
    </div>

    
    

	<section class="page" in:slide>
		<!-- <div class="contact-info">
			<h1>Contact Us</h1>
                		
        </div>

        <div id="embedded-map">
            <iframe loading="lazy" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11623.863995681377!2d-79.0716183!3d43.2521344!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf975dbf3ff67d6c0!2sNiagara-on-the-Lake%20Museum!5e0!3m2!1sen!2sca!4v1614106500408!5m2!1sen!2sca" style="border:0;" width="600" height="450"></iframe>

        </div> -->

	</section>
	<big-gap/>
</PageTransition>

<style>
	h1 {
		text-align: center;
        font-size: 80px;
	}

    iframe{
        width:100%;
    }

	section {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}

	section p {
		flex: 1 1 50%;
		text-align: justify;
		display: flex;
		align-items: center;
		flex-flow: column;
		margin: 0 auto;
		max-width: 40rem;
	}

	img {
		flex: 1 1 50%;
		display: flex;
		margin: 0 auto;
		width: 100%;
		max-width: 30rem;
	}

    .container{
        display:flex;
        flex-direction: row;
        /* justify-content: center; */
        align-content: center;
    }
    .embedded-map{
        flex:1;
    }
    .inquiry-form{
        flex:1;
        padding-left:5%;
    }



</style>