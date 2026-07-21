"use client";

import { useState } from "react";

export default function ResumeOptimizer() {


const [resume,setResume] = useState("");

const [jobDescription,setJobDescription] = useState("");

const [company,setCompany] = useState("");

const [position,setPosition] = useState("");

const [result,setResult] = useState("");

const [loading,setLoading] = useState(false);

const [error,setError] = useState("");





async function optimizeResume(){


setLoading(true);

setError("");

setResult("");



const response = await fetch(

"/api/copilot/resume-optimizer",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

resume,

jobDescription,

company,

position

})

}

);




const data = await response.json();




if(!response.ok){


setError(data.error);

setLoading(false);

return;


}



setResult(
data.optimizedResume
);


setLoading(false);


}







async function saveMaterial(){


if(!result){

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
`Nook Copilot Generated Resume - ${company || "Untitled"}`,

type:
"Resume",

description:
result,

link:""

})

}

);




if(response.ok){

alert(
"Saved to Materials"
);

}
else{

const data = await response.json();

console.error(data);

}


}








return (

<div className="
bg-white
rounded-xl
shadow
p-8
space-y-5
">





<h2 className="
text-2xl
font-bold
">

Nook Copilot Resume Optimizer

</h2>






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








<label className="
font-semibold
">

Job Description *

</label>



<textarea

placeholder="
Paste the job description here...
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
h-48
"

/>








<label className="
font-semibold
">

Current Resume *

</label>





<textarea

placeholder="
Paste your resume text here...
"

value={resume}

onChange={
e=>setResume(e.target.value)
}

className="
border
rounded-lg
p-3
w-full
h-64
"

/>







<button

onClick={optimizeResume}

disabled={loading}

className="
bg-blue-600
text-white
px-5
py-3
rounded-lg
"

>

{

loading

?

"Optimizing..."

:

"Optimize Resume"

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

result &&

<div className="
space-y-4
mt-8
">





<h3 className="
text-xl
font-bold
">

Optimized Resume

</h3>







<textarea

readOnly

value={result}

className="
border
rounded-lg
p-4
w-full
h-96
"

/>








<div className="
flex
gap-3
">







<button

onClick={()=>navigator.clipboard.writeText(result)}

className="
border
rounded-lg
px-4
py-2
"

>

Copy

</button>








<button

onClick={saveMaterial}

className="
bg-green-600
text-white
px-4
py-2
rounded-lg
"

>

Save To Materials

</button>







</div>







</div>

}





</div>

);


}
