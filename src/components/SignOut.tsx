"use client";


import {createClient} from "@/lib/supabase";

import {useRouter} from "next/navigation";


export default function SignOut(){


const router=useRouter();



async function logout(){


const supabase=createClient();


await supabase.auth.signOut();


router.push("/login");


}



return (

<button

onClick={logout}

className="text-red-600"

>

Sign Out

</button>

);


}