import { Task } from "@/types/Task";


type Props={

task:Task;

onEdit:(task:Task)=>void;

onDelete:(id:number)=>void;

};



export default function TaskCard({

task,

onEdit,

onDelete

}:Props){



return (

<div className="
border
border-blue-100
bg-white
p-6
shadow-sm
hover:shadow-lg
transition
">


<div className="
flex
justify-between
items-start
">


<h2 className="
text-2xl
font-bold
text-slate-950
">

{task.title}

</h2>



<span className="
bg-blue-100
px-3
py-1
text-sm
font-semibold
text-blue-700
">

{task.status}

</span>


</div>





<p className="
mt-3
text-slate-600
">

{task.description}

</p>





<div className="
mt-5
grid
grid-cols-2
gap-3
text-sm
">


<div>

<p className="text-slate-500">
Due Date
</p>

<p className="font-semibold">
{task.dueDate}
</p>

</div>




<div>

<p className="text-slate-500">
Priority
</p>

<p className="font-semibold">
{task.priority}
</p>

</div>



</div>





<div className="
mt-6
flex
gap-3
">


<button

onClick={()=>onEdit(task)}

className="
bg-blue-600
px-5
py-2
font-semibold
text-white
hover:bg-blue-700
transition
"

>

Edit

</button>




<button

onClick={()=>onDelete(task.id)}

className="
border
border-red-200
px-5
py-2
font-semibold
text-red-600
hover:bg-red-50
transition
"

>

Delete

</button>


</div>


</div>

);


}