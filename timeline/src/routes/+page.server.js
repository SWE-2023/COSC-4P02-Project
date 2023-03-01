import { supabase } from "../lib/supabaseClient";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const { data } = await supabase.from("timeline").select();
		return {
			timeline: data ?? [],
		};
};
