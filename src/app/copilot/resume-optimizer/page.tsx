"use client";


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

import ResumeOptimizer from "@/components/copilot/ResumeOptimizer";



export default function ResumeOptimizerPage(){


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
max-w-6xl
mx-auto
px-8
py-12
">


<h1 className="
text-5xl
font-bold
text-slate-950
">

Resume Optimizer

</h1>



<p className="
mt-4
text-lg
text-slate-600
">

Improve your resume for specific job applications using Nook Copilot.

</p>




<div className="
mt-8
">

<ResumeOptimizer />

</div>



</div>


</main>

);

}
