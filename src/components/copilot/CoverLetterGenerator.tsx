"use client";


import {useState} from "react";


export default function CoverLetterGenerator(){


const [company,setCompany]=useState("");

const [position,setPosition]=useState("");

const [jobDescription,setJobDescription]=useState("");

const [draft,setDraft]=useState("");

const [letter,setLetter]=useState("");

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");

const [message,setMessage]=useState("");

const [copied,setCopied]=useState(false);

const [generatedAt,setGeneratedAt]=useState<Date | null>(null);






async function generateLetter(){


if(!jobDescription.trim()){

setError(
"Please enter a job description first."
);

return;

}



setLoading(true);

setError("");

setMessage("");

setLetter("");



try{


const response = await fetch(

"/api/copilot/cover-letter",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

company,

position,

jobDescription,

draft

})

}

);





const data = await response.json();





if(!response.ok){

setError(
data.error || 
"Failed to generate cover letter."
);

setLoading(false);

return;

}





setLetter(data.letter);

setGeneratedAt(new Date());



}catch(error){


console.error(error);


setError(
"Something went wrong."
);


}



setLoading(false);



}




async function saveMaterial(){


if(!letter){
return;
}


const response = await fetch(
"/api/materials",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:
`Nook Copilot Generated Cover Letter - ${company || "Untitled"}`,

type:
"Cover Letter",

description:
letter || "",

link:
""

})

}

);


if(response.ok){

alert(
"Saved to Materials"
);

}


}



async function copyLetter(){


await navigator.clipboard.writeText(letter);


setCopied(true);


setTimeout(()=>{

setCopied(false);

},2000);


}









return (

<div className="
bg-white
rounded-xl
p-8
shadow-sm
space-y-5
">





<h2 className="
text-2xl
font-bold
text-slate-900
">

Cover Letter Generator

</h2>





<p className="
text-slate-600
">

Create a personalized cover letter based on a job posting.

</p>









<input

placeholder="Company (optional)"

value={company}

onChange={
e=>setCompany(e.target.value)
}

className="
border
rounded-lg
p-3
w-full
"

/>







<input

placeholder="Position (optional)"

value={position}

onChange={
e=>setPosition(e.target.value)
}

className="
border
rounded-lg
p-3
w-full
"

/>








<textarea

placeholder="
Paste job description here *
"

value={jobDescription}

onChange={
e=>setJobDescription(e.target.value)
}

className="
border
rounded-lg
p-3
w-full
h-56
"

/>







<textarea

placeholder="
Optional existing cover letter draft
"

value={draft}

onChange={
e=>setDraft(e.target.value)
}

className="
border
rounded-lg
p-3
w-full
h-40
"

/>








<button

onClick={generateLetter}

disabled={loading}

className="
bg-blue-600
hover:bg-blue-700
text-white
rounded-lg
px-5
py-3
font-semibold
disabled:opacity-50
"

>

{

loading

?

"Generating..."

:

letter

?

"Regenerate Cover Letter"

:

"Generate Cover Letter"

}



</button>










{
error &&

<p className="
text-red-600
">

{error}

</p>

}






{
message &&

<p className="
text-green-600
">

{message}

</p>

}











{
letter &&

<div className="
mt-8
space-y-4
">


<div className="
flex
justify-between
items-center
">


<h3 className="
font-bold
text-xl
">

Generated Cover Letter

</h3>



{

generatedAt &&

<p className="
text-sm
text-slate-500
">

Generated:

{generatedAt.toLocaleTimeString()}

</p>

}



</div>







<textarea

value={letter}

readOnly

className="
border
rounded-lg
p-4
w-full
h-96
bg-slate-50
"

/>









<div className="
flex
gap-3
flex-wrap
">






<button

onClick={copyLetter}

className="
border
rounded-lg
px-4
py-2
hover:bg-slate-100
"

>

{

copied

?

"Copied!"

:

"Copy"

}


</button>







<button

onClick={saveMaterial}

className="
bg-green-600
hover:bg-green-700
text-white
rounded-lg
px-4
py-2
font-semibold
"

>

Save to Materials

</button>





</div>




</div>

}




</div>

);


}