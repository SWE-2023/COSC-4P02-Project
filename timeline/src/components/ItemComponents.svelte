<script>
    export let title;
    export let image;
    export let image_credit;
    export let body;
    export let start_date;
</script>

<section class="item-components">
    <div class="child-component">
        <div class="image">
            <img alt="" src={image}/>
        </div>
    </div>
    <div class="child-component">
        <div class="text">
            <h1>{title}</h1>
            <p>{start_date}</p>
            <p id="description">{body}</p>
            <p>{image_credit}</p>
        </div>
    </div>

</section>

<style>
    h1 {
		font-family: var(--font-serif);
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0;
	}
   
    .image,.text {
        margin: 2rem;
    }

	img {
		width: 120%;
        height: 120%;
		object-fit: cover;
		margin: 1rem 0rem;
		border-radius: 1rem;
		box-shadow: 1rem 0rem 32px 0 #00000044;
	}

    p {
        font-family: var(--font-sans);
        padding: 1em 0 1em 0;
        font-size: 0.75rem;
        font-weight: 800;
        margin: 0;
        text-align: center;
        text-transform: uppercase;
    }

    .item-components {
		display: flex;
		flex-direction: row;
	}

    .child-component{
        flex:2;
        padding: 0 0 5em 5em;
    }
    
    #description{
        width: 50%;
        text-align: justify;
        padding-left: 25%;
    }
    
</style>