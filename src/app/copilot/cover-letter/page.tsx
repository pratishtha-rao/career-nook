import CoverLetterGenerator 
from "@/components/copilot/CoverLetterGenerator";

export default function CoverLetterPage(){


return (

<main className="
min-h-screen
bg-slate-100
">


<div className="
max-w-5xl
mx-auto
px-8
py-12
">


<h1 className="
text-4xl
font-bold
">

Cover Letter Generator

</h1>


<p className="
mt-3
text-slate-600
">

Create personalized cover letters that match specific job postings.

</p>



<div className="mt-8">

<CoverLetterGenerator/>

</div>


</div>


</main>

);

}