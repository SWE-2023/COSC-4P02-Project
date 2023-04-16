<script>
	import { slide } from "svelte/transition";
	import PageTransition from "$lib/components/PageTransitionFly.svelte";
    import Button from "$lib/components/Button.svelte";
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

        

        <div class="form-container">
			<h2 id="inquiry-title">WE'D LOVE TO HEAR FROM YOU:</h2>
			<div class="row">
				<form class="notify" action="/contact" method="post" name="notify">
					<div class="input col-xs-12 col-sm-6">
						<input id="name" class="text required" placeholder="Name" type="text">
					</div>
					<div class="input col-xs-12 col-sm-6">
						<input id="phone" class="text" placeholder="Phone" type="text">
					</div>
					<div class="input col-xs-12 col-sm-6">
						<input id="email" class="text required" placeholder="Email" type="text">
					</div>
					<div class="input col-xs-12 col-sm-6">
						<input id="phone" class="text" placeholder="Inquiry Type" type="text">
					</div>
					<div class="input col-xs-12">
						<textarea id="message" class="text" cols="45" placeholder="Message" rows="8"></textarea>
					</div>
					<div class="input submit col-xs-12">
						<div id="submit-btn">
							<Button alt text="Submit" />
						</div>
					</div>
				</form>
			</div>

        </div>
        
    </div>

    
    
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

	div.input{
		margin: 7px 0;
	}
	.form-container {
		flex:1;
        padding-left:5%;
  		text-align: center;
		--font-size-base:1.2rem;
	}



	*{box-sizing: border-box;}

	.col-xs-12{
		width: 100%;
	}

	.col-sm-6, .col-xs-12 {
		position: relative;
		min-height: 1px;
		padding-left: 5px;
		padding-right: 5px;

	}
	
	#message{
		width: 94%;
		font-size: 1.2rem;
	}

	/* #submit{
		border: 1px solid var(--color-button-primary);

	} */

	#submit-btn{
		/* align-items: center; */
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	@media (min-width: 768px) {

		input{
			padding:18px;
		}
		.col-sm-6 {
			width: 50%;
			float:left;
		}
		
	}


</style>