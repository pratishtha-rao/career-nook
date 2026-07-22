"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";


export default function CopilotPage() {


const router = useRouter();

const supabase = createClient();



useEffect(()=>{


async function checkAuth(){


const {
data
} = await supabase.auth.getUser();



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
mx-auto
max-w-7xl
px-8
py-16
">



<div className="
max-w-3xl
">


<h1 className="
mt-4
text-5xl
font-bold
text-slate-950
">

Nook Copilot

</h1>



<p className="
mt-5
text-lg
leading-relaxed
text-slate-600
">

AI-powered career tools that help you create stronger applications,
improve your resume, and understand how competitive you are for
specific opportunities.

</p>


</div>





<div className="
mt-12
grid
gap-5
md:grid-cols-2
xl:grid-cols-3
">


<CopilotCard

href="/copilot/cover-letter"

title="Cover Letter Generator"

text="Create personalized cover letters using your experience and the job description."

/>




<CopilotCard

href="/copilot/resume-optimizer"

title="Resume Optimizer"

text="Improve your resume by comparing it with a position and generating targeted improvements."

/>





<CopilotCard

href="/copilot/application-match"

title="Application Match Analyzer"

text="Analyze your resume against a job description, find gaps, and receive improvement suggestions."

/>



</div>



</div>


</main>

);


}







function CopilotCard({
href,
title,
text,
}:{
href:string;
title:string;
text:string;
}){


return (

<Link

href={href}

className="
group
relative
overflow-hidden
border
border-slate-200
bg-white
p-7
transition
hover:-translate-y-1
hover:border-blue-300
hover:shadow-xl
hover:shadow-blue-100
"

>


<div className="
absolute
right-0
top-0
h-32
w-32
bg-blue-200/40
blur-3xl
group-hover:bg-blue-300/50
transition
"/>



<div className="
relative
">


<h2 className="
mt-6
text-2xl
font-bold
text-slate-950
">

{title}

</h2>



<p className="
mt-3
leading-relaxed
text-slate-600
">

{text}

</p>




<p className="
mt-6
text-sm
font-semibold
text-blue-600
">

Open Tool →

</p>


</div>


</Link>

);


}