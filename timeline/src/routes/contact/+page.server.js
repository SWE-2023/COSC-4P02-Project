import supabase from "$lib/supabaseClient";

export async function load() {
	const { data } = await supabase
		.from("inquiries")
		.select("id, submitted_at, name, phone, email, inquiry-type, message")
		.order("submitted_at");
	return {
		timeline: data ?? [],
	};
}