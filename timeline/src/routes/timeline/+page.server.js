import supabase from "$lib/supabaseClient";

export async function load() {
	const { data } = await supabase
		.from("timeline")
		.select("id, title, image, image_credit, body, start_date")
		.order("start_date");
	return {
		timeline: data ?? [],
	};
}
