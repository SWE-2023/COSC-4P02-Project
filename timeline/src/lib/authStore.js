import supabase from "$lib/supabaseClient";
import { writable } from "svelte/store";

export const user = writable(false);

// obtain user info from current session
export async function getSessionUser(){
    const { data: { session } } = await supabase.auth.getSession();

    if(session?.user){
            return true;
        }
        return false;
}