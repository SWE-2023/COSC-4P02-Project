<script>
	export let title;
	export let image;
	export let image_credit;
	export let body;
	export let start_date;
	import Fa from "svelte-fa/src/fa.svelte";
	import { faExpand } from "@fortawesome/free-solid-svg-icons";
	import { faCompress } from "@fortawesome/free-solid-svg-icons";
    import Fullscreen from "svelte-fullscreen";
</script>

<section class="item-components">
	<div class="child-component">
		<div class="image">
			
			<Fullscreen let:onRequest let:onExit>
				
				<img alt={image_credit} src={image} />
				  <button on:click={() => onRequest()}><Fa icon={faExpand} color="var(--color-text)" /></button>
				  
				  <button on:click={() => onExit()}><Fa icon={faCompress} color="var(--color-text)" /></button>
				  
				
			  </Fullscreen>
		</div>
	</div>
	<div class="child-component">
		<div class="text">
			<h1 class="title">{title}</h1>
			<p class="date">{start_date}</p>
			<p class="description">{body}</p>
			<p class="image_cred">{image_credit}</p>
		</div>
	</div>
</section>

<style>
	h1 {
		font-family: var(--font-serif);
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0;
		
		

	}

	p {
		font-family: var(--font-sans);
		padding: 1em 0 1em 0;
		font-size: 1rem;
		margin: 0;
		text-align: center;
		

	}

	.title {
		text-align: center;
		
	
	}

	.date {
		text-align: center;
		font-size: 1.2rem;
		font-weight: 400;
		
	}

	.image_cred {
		text-align: left;
		font-size: 1rem;
		font-weight: 400;
	}

	.image {
		width: 100%;
		height: 100%;
		display:flex;
		justify-content: center;
		align-items: center;
		
		
		
	}

	.image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 1rem;
		box-shadow: 1rem 0rem 32px 0 #00000044;
	}

	.item-components {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		transition: all 0.5s ease-in-out;
		animation: fadeInAnimation ease 3s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
        }
        @keyframes fadeInAnimation {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
		

		
	}

	.child-component {
		flex: 2;
		padding: 0 1rem;

		

	}

	/* get 2nd child of item-components */
	.item-components > :nth-child(2) {
		flex: 1;
		
		

	}

	.description {
		max-width: 100%;
		text-align: justify;
	}

	@media (max-width: 1500px) {
		.item-components {
			flex-direction: column;
		}
		.child-component {
			flex: 1;
			padding: 0 0 5em 0;
		}
		.description {
			width: 100%;
			text-align: justify;
			padding-left: 0;
		}
	}
</style>
