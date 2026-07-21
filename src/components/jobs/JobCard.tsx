import { Job } from "@/types/Job";

import Button from "@/components/ui/Button";


type Props = {

job: Job;

onDelete:(id:number)=>void;

onEdit:(job:Job)=>void;

};


export default function JobCard({

job,

onDelete,

onEdit,

}:Props){


return (

<div className="
rounded-xl
border
bg-white
p-6
shadow-sm
">


<div className="flex justify-between">


<div>

<h2 className="text-xl font-bold">
{job.company}
</h2>


<p className="text-slate-600">
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




<div className="
mt-6
flex
gap-3
">


<Button

onClick={()=>onEdit(job)}

className="
bg-yellow-500
text-white
"

>

Edit

</Button>

<Button

onClick={()=>onDelete(job.id)}

className="
bg-red-600
text-white
"

>

Delete

</Button>



</div>



</div>

);


}