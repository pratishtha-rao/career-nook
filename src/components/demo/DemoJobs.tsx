"use client";

import {useState} from "react";
import {getDemoData,saveDemoData} from "@/lib/demoStorage";


type Job={

id:number;
company:string;
position:string;
status:string;
dateApplied:string;
url?:string;
notes?:string;

};



export default function DemoJobs(){


const [jobs,setJobs]=useState<Job[]>(()=> 
getDemoData<Job>("demo_jobs")
);



const [company,setCompany]=useState("");
const [position,setPosition]=useState("");
const [status,setStatus]=useState("Applied");
const [dateApplied,setDateApplied]=useState("");
const [url,setUrl]=useState("");
const [notes,setNotes]=useState("");





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



setCompany("");
setPosition("");
setDateApplied("");
setUrl("");
setNotes("");

}





function deleteJob(id:number){


const updated =
jobs.filter(
job=>job.id!==id
);


setJobs(updated);


saveDemoData(
"demo_jobs",
updated
);


}






return (

<section>


<h2 className="text-2xl font-bold">

Jobs

</h2>




<div className="
bg-white
p-5
rounded-xl
space-y-3
mt-4
">



<input

placeholder="Company"

value={company}

onChange={e=>setCompany(e.target.value)}

className="
border
p-2
w-full
"

/>




<input

placeholder="Position"

value={position}

onChange={e=>setPosition(e.target.value)}

className="
border
p-2
w-full
"

/>





<select

value={status}

onChange={e=>setStatus(e.target.value)}

className="
border
p-2
w-full
"

>


<option>
Applied
</option>

<option>
Interview
</option>

<option>
Offer
</option>

<option>
Rejected
</option>


</select>





<input

placeholder="Date Applied"

value={dateApplied}

onChange={e=>setDateApplied(e.target.value)}

className="
border
p-2
w-full
"

/>

<input

placeholder="URL"

value={url}

onChange={e=>setUrl(e.target.value)}

className="
border
p-2
w-full
"

/>





<textarea

placeholder="Notes"

value={notes}

onChange={e=>setNotes(e.target.value)}

className="
border
p-2
w-full
"

/>





<button

onClick={addJob}

className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-2
rounded-lg
"

>

Add Job

</button>



</div>






<div className="
mt-5
space-y-4
">


{

jobs.map(job=>(


<div

key={job.id}

className="
bg-white
border
rounded-xl
p-5
"

>


<h3 className="
font-bold
text-lg
">

{job.company}

</h3>



<p>
{job.position}
</p>


<p className="text-blue-600">
{job.status}
</p>


<p>
Date Applied: {job.dateApplied}
</p>



{
job.url &&
<p>
{job.url}
</p>
}



{
job.notes &&
<p>
{job.notes}
</p>
}





<button

onClick={()=>deleteJob(job.id)}

className="
mt-4
bg-red-600
hover:bg-red-700
text-white
px-4
py-2
rounded-lg
font-semibold
"

>

Delete

</button>



</div>


))

}



</div>



</section>

);


}