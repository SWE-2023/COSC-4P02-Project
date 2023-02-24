<script>

    export let title = "Dummy Title";
    export let image = "assets/placeholder.jpg";
    export let image_credit = "sample image credit";
    export let body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis viverra orci, eget rutrum ex consectetur vitae. Pellentesque et volutpat eros. In risus enim, dapibus ultricies pellentesque vel, tristique ac libero. Phasellus eget augue eget velit scelerisque vestibulum id eget ipsum. Sed ultricies mauris condimentum feugiat ullamcorper. Maecenas vestibulum lacus ut interdum hendrerit. Integer tincidunt quis felis vel vulputate. Phasellus varius mollis gravida. Nulla euismod, nulla ac varius tincidunt, turpis justo faucibus arcu, vitae accumsan ex erat quis magna. Phasellus vehicula mauris metus, eu commodo purus placerat nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    export let start_date = "1999"

</script>

<section class="item-components">

    <div class="image">
        <img alt="" src={image}/>
    </div>
    <div class="text">
        <h1>{title}</h1>
        <p>{start_date}</p>
        <p>{body}</p>
        <p>{image_credit}</p>
    </div>

</section>

<style>


    h1 {
		font-family: var(--font-serif);
		padding: 2em 0 0 0;
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0;
	}

	img {
		width: 100%;
		object-fit: cover;
		margin: 1rem 0rem;
		border-radius: 1rem;
		box-shadow: 1rem 0rem 32px 0 #00000044;
	}

    p {
        font-family: var(--font-sans);
        padding: 1em 0 1em 0;
        font-size: 1.5rem;
        font-weight: 800;
        margin: 0;
        text-align: center;
        text-transform: uppercase;
    }

    .item-components {
		display: flex;
		flex-direction: row;
	}

    .image,.text {
        margin: 2rem;
    }



</style>