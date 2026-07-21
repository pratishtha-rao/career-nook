import { createClient } from "./supabaseServer";


export async function getCurrentUser(){

const supabase = await createClient();


const {
data:{
session
}

}=await supabase.auth.getSession();


return session?.user ?? null;

}
