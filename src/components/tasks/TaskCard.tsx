import { Task } from "@/types/Task";


type Props = {

task:Task;

onEdit:(task:Task)=>void;

onDelete:(id:number)=>void;

onArchive:(id:number)=>void;

};



export default function TaskCard({

task,

onEdit,

onDelete,

onArchive

}:Props){


return (

<div className="
rounded-xl
border
bg-white
p-6
shadow-sm
text-black
">


<h2 className="
text-xl
font-bold
">

{task.title}

</h2>



<p className="mt-2">

{task.description}

</p>



<p>

Due: {task.dueDate}

</p>



<p>

Priority: {task.priority}

</p>



<p>

Status: {task.status}

</p>




<div className="
mt-5
flex
gap-3
">


<button

onClick={()=>onEdit(task)}

className="
rounded-lg
bg-yellow-500
px-4
py-2
text-white
"

>

Edit

</button>




<button

onClick={()=>onArchive(task.id)}

className="
rounded-lg
bg-purple-600
px-4
py-2
text-white
"

>

Archive

</button>




<button

onClick={()=>onDelete(task.id)}

className="
rounded-lg
bg-red-600
px-4
py-2
text-white
"

>

Delete

</button>



</div>


</div>

);

}
