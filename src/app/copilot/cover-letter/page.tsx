"use client";


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

import CoverLetterGenerator from "@/components/copilot/CoverLetterGenerator";



export default function CoverLetterPage(){


const router = useRouter();

const supabase = createClient();



useEffect(()=>{


async function checkAuth(){


const {
data
}=await supabase.auth.getUser();



if(!data.user){

router.push("/login");

}


}


checkAuth();


},[router,supabase]);






return (

<main className="
min-h-screen
bg-[#f5f9ff]
">


<div className="
max-w-5xl
mx-auto
px-8
py-12
">


<h1 className="
text-5xl
font-bold
text-slate-950
">

Cover Letter Generator

</h1>



<p className="
mt-4
text-lg
text-slate-600
">

Create personalized cover letters that match specific job postings.

</p>




<div className="
mt-8
">

<CoverLetterGenerator />

</div>



</div>


</main>

);

}