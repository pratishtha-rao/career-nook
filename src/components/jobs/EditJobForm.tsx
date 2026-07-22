"use client";


import { useState } from "react";
import { Job } from "@/types/Job";


type Props = {

  job: Job;

  onSave: (job: Job) => void;

  onCancel: () => void;

};




export default function EditJobForm({

  job,

  onSave,

  onCancel,

}: Props) {



const [company,setCompany] = useState(job.company);

const [position,setPosition] = useState(job.position);

const [status,setStatus] = useState(job.status);

const [dateApplied,setDateApplied] = useState(job.dateApplied);

const [url,setUrl] = useState(job.url ?? "");

const [notes,setNotes] = useState(job.notes ?? "");





function handleSubmit(e:React.FormEvent){

e.preventDefault();


onSave({

...job,

company,

position,

status,

dateApplied,

url,

notes,

});

}





const inputStyle = `
w-full
border
border-blue-100
bg-white
px-4
py-3
text-slate-900
outline-none
transition
focus:border-blue-500
focus:ring-2
focus:ring-blue-100
`;





return (

<form

onSubmit={handleSubmit}

className="
border
border-blue-100
bg-gradient-to-br
from-white
to-blue-50
p-7
shadow-sm
"

>




<div className="
flex
items-start
justify-between
mb-6
">


<div>


<p className="
text-xs
uppercase
tracking-widest
font-semibold
text-blue-600
">

Update Opportunity

</p>


<h2 className="
mt-2
text-2xl
font-bold
text-slate-950
">

Edit Application

</h2>


<p className="
mt-1
text-sm
text-slate-600
">

Modify company details, progress, and notes.

</p>


</div>



<div className="
h-10
w-10
flex
items-center
justify-center
bg-blue-600
text-white
font-bold
">

✎

</div>


</div>






<div className="
grid
gap-5
md:grid-cols-2
">



<div>

<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Company

</label>


<input

value={company}

onChange={(e)=>setCompany(e.target.value)}

placeholder="Company"

className={inputStyle}

/>

</div>






<div>

<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Position

</label>


<input

value={position}

onChange={(e)=>setPosition(e.target.value)}

placeholder="Position"

className={inputStyle}

/>

</div>







<div>

<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Status

</label>


<select

value={status}

onChange={(e)=>setStatus(e.target.value as Job["status"])}

className={inputStyle}

>


<option>
Interested
</option>


<option>
Not Started
</option>


<option>
In Progress
</option>


<option>
Applied
</option>


<option>
Interview Scheduled
</option>


<option>
Interview 1
</option>


<option>
Interview 2
</option>


<option>
Interview 3
</option>


<option>
Finished Interview(s)
</option>


<option>
Waiting for Response
</option>


<option>
Offer Received
</option>


<option>
Rejected
</option>


<option>
Ghosted
</option>


</select>


</div>







<div>

<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Application Date

</label>


<input

value={dateApplied}

onChange={(e)=>setDateApplied(e.target.value)}

type="date"

className={inputStyle}

/>


</div>



</div>








<div className="mt-5">


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Job URL

</label>


<input

value={url}

onChange={(e)=>setUrl(e.target.value)}

placeholder="https://company.com/job"

className={inputStyle}

/>


</div>







<div className="mt-5">


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Notes

</label>


<textarea

value={notes}

onChange={(e)=>setNotes(e.target.value)}

placeholder="Interview notes, recruiter details, reminders..."

className="
w-full
h-32
border
border-blue-100
bg-white
px-4
py-3
outline-none
resize-none
focus:border-blue-500
focus:ring-2
focus:ring-blue-100
"

/>


</div>








<div className="
mt-6
flex
gap-3
">


<button

type="submit"

className="
bg-blue-600
px-8
py-3
font-semibold
text-white
shadow-lg
shadow-blue-200
transition
hover:bg-blue-700
hover:-translate-y-0.5
"

>

Save Changes

</button>





<button

type="button"

onClick={onCancel}

className="
border
border-slate-200
bg-white
px-8
py-3
font-semibold
text-slate-700
transition
hover:border-blue-300
hover:text-blue-600
"

>

Cancel

</button>



</div>



</form>

);

}
