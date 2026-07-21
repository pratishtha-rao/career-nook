"use client";


import ResumeOptimizer from "@/components/copilot/ResumeOptimizer";



export default function ResumeOptimizerPage(){


return (

<main className="
min-h-screen
bg-slate-100
">


<div className="
max-w-6xl
mx-auto
px-8
py-12
">


<h1 className="
text-4xl
font-bold
text-slate-900
">

Resume Optimizer

</h1>



<p className="
mt-3
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