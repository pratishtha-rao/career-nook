"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobForm from "@/components/jobs/JobForm";
import EditJobForm from "@/components/jobs/EditJobForm";
import { Job, CreateJob } from "@/types/Job";
import { useRouter } from "next/navigation";


export default function JobsPage() {


const [jobs,setJobs] = useState<Job[]>([]);
const [editingJob,setEditingJob] = useState<Job | null>(null);
const [loading,setLoading] = useState(true);

const router = useRouter();



async function addJob(job:CreateJob){

const response = await fetch("/api/jobs",{

method:"POST",

headers:{
"Content-Type":"application/json",
},

body:JSON.stringify(job),

});


if(!response.ok){

console.error(await response.text());

return;

}


const newJob = await response.json();


setJobs(previous=>[
newJob,
...previous
]);


}




useEffect(()=>{


async function loadJobs(){


try{


const response = await fetch("/api/jobs",{
cache:"no-store"
});


if(response.status===401){

router.push("/login");

return;

}



const data = await response.json();


setJobs(
Array.isArray(data)
?
data
:
[]
);


}

catch(error){

console.error(error);

setJobs([]);

}

finally{

setLoading(false);

}


}


loadJobs();


},[router]);







async function deleteJob(id:number){


await fetch(`/api/jobs/${id}`,{

method:"DELETE",

});


setJobs(previous=>
previous.filter(job=>job.id!==id)
);


}







async function saveEditedJob(updatedJob:Job){


const response = await fetch(
`/api/jobs/${updatedJob.id}`,
{

method:"PUT",

headers:{
"Content-Type":"application/json",
},

body:JSON.stringify(updatedJob),

});


if(!response.ok){

console.error(await response.text());

return;

}


const job = await response.json();


setJobs(previous=>
previous.map(item=>
item.id===job.id
?
job
:
item
)
);


setEditingJob(null);


}






if(loading){

return (

<main className="
min-h-screen
flex
items-center
justify-center
bg-slate-100
">

<p className="
text-slate-600
font-medium
">

Loading applications...

</p>

</main>

);

}






return (

<main className="
min-h-screen
bg-[#f4f8ff]
">


<div className="
max-w-7xl
mx-auto
px-6
py-8
">





{/* HEADER */}


<div className="
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-5
">


<div>

<h1 className="
mt-2
text-5xl
font-bold
text-slate-950
">

Applications

</h1>


<p className="
mt-2
text-slate-600
text-lg
">

Track jobs, internships, interviews, and opportunities.

</p>


</div>

</div>

{/* ADD APPLICATION */}


<div className="
mt-8
bg-white
border
border-blue-100
shadow-sm
p-6
">


<h2 className="
text-xl
font-bold
mb-4
">

Add Application

</h2>


<JobForm
onAddJob={addJob}
/>


</div>








{
editingJob && (

<div className="
mt-6
bg-white
border
border-blue-100
shadow-sm
p-6
">

<EditJobForm

job={editingJob}

onSave={saveEditedJob}

onCancel={()=>
setEditingJob(null)
}

/>

</div>

)

}








{/* APPLICATION LIST */}


<div className="
mt-8
flex
items-center
justify-between
">


<h2 className="
text-2xl
font-bold
">

Your Applications

</h2>

</div>







{
jobs.length===0 && (

<div className="
mt-5
bg-white
border
border-dashed
border-blue-200
p-10
text-center
">

<h3 className="
text-xl
font-bold
">

No applications yet

</h3>


<p className="
mt-2
text-slate-500
">

Add your first opportunity above to start tracking.

</p>


</div>

)

}





<div className="
mt-5
grid
gap-5
">


{
jobs.map(job=>(

<JobCard

key={job.id}

job={job}

onDelete={deleteJob}

onEdit={
(job)=>
setEditingJob(job)
}

/>

))

}


</div>





</div>


</main>

);


}