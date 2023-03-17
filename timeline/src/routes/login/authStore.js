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

    // const { data: session, error} = await supabase.auth.getUser();

    // if (error) {
    //     console.error(error);
    //     return false;
    // }

    // if (session) {
    //     return true;
    // }else{
    //     return false;
    // }

    
}