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


return (

<form

onSubmit={handleSubmit}

className="
rounded-xl
border
bg-white
p-6
shadow-sm
space-y-4
"

>


<h2 className="text-xl font-bold">
Edit Job
</h2>



<input

value={company}

onChange={(e)=>setCompany(e.target.value)}

placeholder="Company"

className="
w-full
rounded-lg
border
p-3
text-black
placeholder:text-slate-500
"

/>



<input

value={position}

onChange={(e)=>setPosition(e.target.value)}

placeholder="Position"

className="
w-full
rounded-lg
border
p-3
text-black
placeholder:text-slate-500
"

/>

<input

value={url}

onChange={(e)=>setUrl(e.target.value)}

placeholder="Job URL"

className="
w-full
rounded-lg
border
p-3
text-black
"

/>


<textarea

value={notes}

onChange={(e)=>setNotes(e.target.value)}

placeholder="Notes"

className="
w-full
rounded-lg
border
p-3
text-black
"

/>

<select

value={status}

onChange={(e)=>setStatus(e.target.value as Job["status"])}

className="
w-full
rounded-lg
border
p-3
text-black
placeholder:text-slate-500
"

>

<option>Saved</option>

<option>Applied</option>

<option>Interview</option>

<option>Offer</option>

<option>Rejected</option>


</select>




<input

value={dateApplied}

onChange={(e)=>setDateApplied(e.target.value)}

placeholder="Date Applied"

className="
w-full
rounded-lg
border
p-3
text-black
"

/>


<div className="flex gap-3">


<button

type="submit"

className="
rounded-lg
bg-blue-600
px-5
py-2
text-white
"

>

Save

</button>



<button

type="button"

onClick={onCancel}

className="
rounded-lg
border
px-5
py-2
"

>

Cancel

</button>


</div>


</form>

);


}
