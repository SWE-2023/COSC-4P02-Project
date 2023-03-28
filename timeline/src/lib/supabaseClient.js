import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;


export async function fetch() {
	const { data } = await supabase
		.from("timeline")
		.select("id, title, image, image_credit, body, start_date")
		.order("start_date");
	return {
		body: data ?? [],
	};
}
