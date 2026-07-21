import { Task } from "@/types/Task";


type Props = {
  task: Task;
  onToggle: (id:number)=>void;
};


export default function TaskCard({
  task,
  onToggle,
}: Props) {


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


<h2
className={`text-xl font-bold ${
task.completed
? "line-through text-slate-400"
: ""
}`}
>
{task.title}
</h2>


<p className="mt-2 text-slate-600">
{task.description}
</p>


</div>



<span
className="
rounded-full
bg-orange-100
px-3
py-1
text-sm
text-orange-700
"
>
{task.priority}
</span>



</div>



<div className="mt-5 flex items-center justify-between">


<p className="text-sm text-slate-500">
Due: {task.dueDate}
</p>



<button

onClick={()=>onToggle(task.id)}

className="
rounded-lg
bg-green-600
px-4
py-2
text-sm
font-semibold
text-white
hover:bg-green-700
"

>

{
task.completed
? "Completed"
: "Mark Done"
}


</button>


</div>


</div>

);


}