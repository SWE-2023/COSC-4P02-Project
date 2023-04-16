<script>
	import { slide } from "svelte/transition";
	import PageTransition from "$lib/components/PageTransitionFly.svelte";
    import Button from "$lib/components/Button.svelte";
</script>

<svelte:head>
	<title>Contact | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Contact page" />
</svelte:head>

<PageTransition>

    <h1>Contact Us</h1>
                    
    

    <div class="container">
        <div class="embedded-map">
            <iframe loading="lazy" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11623.863995681377!2d-79.0716183!3d43.2521344!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf975dbf3ff67d6c0!2sNiagara-on-the-Lake%20Museum!5e0!3m2!1sen!2sca!4v1614106500408!5m2!1sen!2sca" style="border:0;" width="600" height="450"></iframe>


			<!-- ADDRESS -->
			<div class="address-hours-container">
				<div class="contact-flex-item address">
					<p>
						43 Castlereagh Street<br>
						PO Box 208<br>
						Niagara-on-the-Lake, ON<br>
						L0S 1J0<br>
						Canada<br>
					</p>
				</div>

				<!-- CONTACT INFO -->
				<div class="contact-flex-item hours">
					
					<table>
						<tr>
							<td>PHONE:</td>
							<td><a href="tel:9054683912">905 468 3912</a></td>
						</tr>
						<tr>
							<td>FAX:</td>
							<td><a href="tel:9054681728">905 468 1728</a></td>
						</tr>
						<tr>
							<td>EMAIL:</td>
							<td><a href="mailto:contact@nhsm.ca">contact@nhsm.ca</a></td>
						</tr>
						<tr class="socials-row">
							<td>SOCIALS:</td>
							<td class="socials">
								<a href="https://www.facebook.com/NOTLMuseum/" class="fa fa-facebook"></a>
								<a href="https://twitter.com/NOTLMuseum" class="fa fa-twitter"></a>
								<a href="https://www.instagram.com/notlmuseum/" class="fa fa-instagram"></a>
								<a href="https://www.youtube.com/user/NOTLMuseum" class="fa fa-youtube-play"></a>
							
							</td>
						</tr>

					</table>
				</div>
			</div>


        </div>

        <div class="form-container">
			<h2 id="inquiry-title">WE'D LOVE TO HEAR FROM YOU:</h2>
			<div class="row">
				<form class="notify" action="/contact" method="POST" name="netlify-form" data-netlify="true">
					<div class="input col-xs-12 col-sm-6">
						<input id="name" name="form-name" class="text required" placeholder="Name" type="text">
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

	td{
		height:2px;
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

	.contact-flex-item{
		/* align-items: center; */
		margin-top: 15px;
		display: flex;
		flex-wrap: nowrap;
		font-size: 100%;
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

	.socials{
		font-size: 30px;
		vertical-align: middle;
	}

	.socials-row{
		vertical-align: middle;
	}

	*{box-sizing: border-box;}

	.col-xs-12{
		width: 100%;
	}

	.col-sm-6, .col-xs-12 {
		min-height: 1px;
		padding-left: 5px;
		padding-right: 5px;

	}
	
	.address-hours-container{
		display:flex;
		flex-direction: row;
        padding-left:5%;
  		text-align: left;
	}

	.address{
		flex:1;
	}

	.hours{
		flex:1;
	}

	/* SOCIAL MEDIA ICONS */
	.fa {
		padding: 5px;
		font-size: 20px;
		width: 30px;
		text-align: center;
		text-decoration: none;
		margin: 5px 2px;
		border-radius: 150%;
	}
	.fa-facebook {
		background: #3B5998;
		color: white;
	}

	.fa-twitter {
		background: #55ACEE;
		color: white;
	}

	.fa-youtube-play {
		background: #bb0000;
		color: white;
	}

	.fa-instagram {
		background: #d62976;
		color: white;
	}

	#message{
		width: 94%;
		font-size: 1.2rem;
	}

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