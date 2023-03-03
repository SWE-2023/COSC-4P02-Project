<script>
	export let title;
	export let image;
	export let image_credit;
	export let start_date;

</script>

<section class="item-components">
	<div class="image-component">
		<div class="image">
			<img alt={image_credit} src={image? image : "https://joadre.com/wp-content/uploads/2019/02/no-image.jpg"} />
			<a href={image_credit} target="_blank" rel="noreferrer" class="image_cred">Source</a>
		</div>
	</div>
	<div class="text-component">
		<div class="text">
			<h1 class="title">{title}</h1>
			<p class="date">{start_date}</p>
			<slot >
				<p class="description">No description provided.</p>
			</slot>
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
		margin: 0.5rem;
	}

	.title {
		text-align: center;
	}

	.date {
		text-align: center;
		font-size: 1.2rem;
		font-weight: 400;
	}

	
	.image {
		cursor: pointer;
		display: flex;
		flex-direction:column;
		justify-content: center;
		align-items: center;
	}
	
	img {
		max-height:70vh;
		max-width:80vw;
		object-position:center center;
		object-fit: fill;
		border-radius: 1rem;
		box-shadow: 1rem 0rem 32px 0 #00000022;
	}

	.image_cred {
		color: var(--color-text);
		text-align: center;
		font-size: .8rem;
		position:relative;
		padding: 0.5rem;
		opacity:.5;
		font-weight: 400;
		transition: all 0.15s ease-in-out;
	}

	.image_cred:hover {
		opacity: 1;
		color:var(--color-theme-2);
		text-decoration:none;
	}

	.item-components {
		display: flex;
		flex-direction: row;
		flex-wrap:wrap;
		justify-content: center;
		align-items: center;
		transition: all 0.2s ease-in-out;
	}

	.image-component {
		flex: 1;
	}

	.text-component{
		flex: 1;
		padding: 1rem 5rem;
		
	}

	.description {
		text-align: justify;
	}

	@media (max-width: 1500px) {
		.item-components {
			flex-direction: column;
		}
		.image-component, .text-component {
			flex: 1;
			padding: 0 0 2em 0;
		}
		.description {
			width: 100%;
			text-align: justify;
			padding-left: 0;
		}
	}
</style>
