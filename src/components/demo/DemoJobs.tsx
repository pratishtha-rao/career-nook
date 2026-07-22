"use client";

import { useState } from "react";
import { getDemoData, saveDemoData } from "@/lib/demoStorage";


type Job = {

  id:number;
  company:string;
  position:string;
  status:string;
  dateApplied:string;
  url?:string;
  notes?:string;

};



export default function DemoJobs(){


const [jobs,setJobs] = useState<Job[]>(()=> 
  getDemoData<Job>("demo_jobs")
);



const [editingJob,setEditingJob] = useState<Job | null>(null);



const [company,setCompany] = useState("");
const [position,setPosition] = useState("");
const [status,setStatus] = useState("Applied");
const [dateApplied,setDateApplied] = useState("");
const [url,setUrl] = useState("");
const [notes,setNotes] = useState("");





function resetForm(){

setCompany("");
setPosition("");
setStatus("Applied");
setDateApplied("");
setUrl("");
setNotes("");

}




function addJob(){


const job:Job={

id:Date.now(),

company,

position,

status,

dateApplied,

url,

notes

};



const updated=[

job,
...jobs

];


setJobs(updated);

saveDemoData(
"demo_jobs",
updated
);


resetForm();

}





function startEdit(job:Job){


setEditingJob(job);

setCompany(job.company);

setPosition(job.position);

setStatus(job.status);

setDateApplied(job.dateApplied);

setUrl(job.url ?? "");

setNotes(job.notes ?? "");

}





function saveEdit(){


if(!editingJob) return;



const updated = jobs.map(job=>

job.id === editingJob.id

?

{

...job,

company,

position,

status,

dateApplied,

url,

notes

}

:

job

);



setJobs(updated);


saveDemoData(
"demo_jobs",
updated
);


setEditingJob(null);

resetForm();

}




function deleteJob(id:number){


const updated =
jobs.filter(job=>job.id !== id);


setJobs(updated);


saveDemoData(
"demo_jobs",
updated
);


}





return (

<section>


<h2 className="
text-2xl
font-bold
text-slate-900
">

Jobs

</h2>





<div className="
mt-4
rounded-xl
border
border-blue-100
bg-white
p-6
shadow-sm
space-y-3
">



<input
placeholder="Company"
value={company}
onChange={e=>setCompany(e.target.value)}
className="
w-full
rounded-lg
border
border-slate-200
p-3
"
/>



<input
placeholder="Position"
value={position}
onChange={e=>setPosition(e.target.value)}
className="
w-full
rounded-lg
border
border-slate-200
p-3
"
/>



<select
value={status}
onChange={e=>setStatus(e.target.value)}
className="
w-full
rounded-lg
border
border-slate-200
p-3
"
>

<option>Applied</option>
<option>Interview</option>
<option>Offer</option>
<option>Rejected</option>

</select>



<input
type="date"
value={dateApplied}
onChange={e=>setDateApplied(e.target.value)}
className="
w-full
rounded-lg
border
border-slate-200
p-3
"
/>



<input
placeholder="Job URL"
value={url}
onChange={e=>setUrl(e.target.value)}
className="
w-full
rounded-lg
border
border-slate-200
p-3
"
/>



<textarea
placeholder="Notes"
value={notes}
onChange={e=>setNotes(e.target.value)}
className="
w-full
rounded-lg
border
border-slate-200
p-3
"
/>





<button

onClick={
editingJob
?
saveEdit
:
addJob
}

className="
rounded-lg
bg-blue-600
px-5
py-3
font-semibold
text-white
hover:bg-blue-700
"

>

{
editingJob
?
"Save Job"
:
"Add Job"
}

</button>



{
editingJob && (

<button

onClick={()=>{

setEditingJob(null);
resetForm();

}}

className="
ml-3
rounded-lg
border
px-5
py-3
font-semibold
"

>

Cancel

</button>

)

}


</div>







<div className="
mt-8
space-y-5
">



{

jobs.map(job=>(


<div

key={job.id}

className="
border
border-blue-100
bg-white
p-6
shadow-sm
transition
hover:-translate-y-1
hover:shadow-lg
"

>


<div className="
flex
justify-between
items-start
">


<div>

<h3 className="
text-xl
font-bold
text-slate-900
">

{job.company}

</h3>


<p className="
text-slate-600
mt-1
">

{job.position}

</p>


</div>



<span className="
rounded-full
bg-blue-100
px-3
py-1
text-sm
text-blue-700
">

{job.status}

</span>


</div>



<p className="
mt-3
text-sm
text-slate-600
">

Applied: {job.dateApplied}

</p>




{
job.url && (

<a

href={job.url.startsWith("http") ? job.url : `https://${job.url}`}

target="_blank"

rel="noopener noreferrer"

className="
mt-4
block
text-blue-600
hover:underline
"

>

View Job Posting →

</a>

)

}




{
job.notes && (

<p className="
mt-4
rounded-lg
bg-blue-50
p-3
text-slate-700
">

{job.notes}

</p>

)

}






<div className="
mt-5
flex
gap-3
">


<button

onClick={()=>startEdit(job)}

className="
rounded-lg
border
border-blue-200
px-4
py-2
text-blue-600
hover:bg-blue-50
"

>

Edit

</button>



<button

onClick={()=>deleteJob(job.id)}

className="
rounded-lg
bg-red-600
px-4
py-2
text-white
hover:bg-red-700
"

>

Delete

</button>


</div>



</div>


))

}



</div>


</section>

);


}