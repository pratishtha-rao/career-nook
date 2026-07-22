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



function statusColor(status:string){

if(status.includes("Offer"))
return "bg-green-100 text-green-700 border-green-200";


if(
status.includes("Interview")
)
return "bg-purple-100 text-purple-700 border-purple-200";


if(status==="Rejected" || status==="Ghosted")
return "bg-red-100 text-red-700 border-red-200";


if(status==="Applied")
return "bg-blue-100 text-blue-700 border-blue-200";


return "bg-slate-100 text-slate-700 border-slate-200";

}



return (

<div className="
group
border
border-blue-100
bg-white
p-6
shadow-sm
transition
hover:-translate-y-1
hover:shadow-lg
hover:shadow-blue-100
">


<div className="
flex
flex-col
md:flex-row
md:justify-between
gap-5
">


<div>


<div className="
flex
items-center
gap-3
">


<h2 className="
text-2xl
font-bold
text-slate-950
">

{job.company}

</h2>


<span className={`
border
px-3
py-1
text-xs
font-semibold
${statusColor(job.status)}
`}>

{job.status}

</span>


</div>



<p className="
mt-2
text-lg
text-slate-600
">

{job.position}

</p>



</div>




<div className="
text-sm
text-slate-500
">

Applied

<p className="
mt-1
font-medium
text-slate-900
">

{job.dateApplied}

</p>


</div>


</div>

{
job.url && (

<a
  href={
    job.url.startsWith("http")
      ? job.url
      : `https://${job.url}`
  }
  target="_blank"
  rel="noopener noreferrer"
  className="
    mt-3
    block
    text-blue-600
    hover:text-blue-800
    hover:underline
  "
>
  View Job Posting →
</a>

)
}


{
job.notes && (

<div className="
mt-5
border-l-2
border-blue-500
bg-blue-50
px-4
py-3
text-sm
text-slate-700
">

{job.notes}

</div>

)

}







<div className="
mt-6
flex
gap-3
">


<Button

onClick={()=>onEdit(job)}

className="
border
border-slate-200
bg-white
text-slate-700
hover:bg-slate-50
"

>

Edit

</Button>




<Button

onClick={()=>onDelete(job.id)}

className="
bg-red-600
text-white
hover:bg-red-700
"

>

Delete

</Button>



</div>




</div>

);


}