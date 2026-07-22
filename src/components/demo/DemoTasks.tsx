"use client";

import { useState } from "react";
import { getDemoData, saveDemoData } from "@/lib/demoStorage";


type Task = {

id:number;
title:string;
description:string;
dueDate:string;
priority:string;
status:string;

};



export default function DemoTasks(){


const [tasks,setTasks] = useState<Task[]>(()=> 
getDemoData<Task>("demo_tasks")
);



const [editingTask,setEditingTask] = useState<Task | null>(null);



const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [dueDate,setDueDate] = useState("");
const [priority,setPriority] = useState("Medium");
const [status,setStatus] = useState("Not Started");





function resetForm(){

setTitle("");
setDescription("");
setDueDate("");
setPriority("Medium");
setStatus("Not Started");

}





function saveData(updated:Task[]){

setTasks(updated);

saveDemoData(
"demo_tasks",
updated
);

}





function addTask(){


const task:Task={

id:Date.now(),

title,

description,

dueDate,

priority,

status

};



saveData([

task,
...tasks

]);


resetForm();

}





function startEdit(task:Task){


setEditingTask(task);

setTitle(task.title);

setDescription(task.description);

setDueDate(task.dueDate);

setPriority(task.priority);

setStatus(task.status);

}





function saveEdit(){


if(!editingTask) return;



const updated = tasks.map(task =>


task.id === editingTask.id

?

{

...task,

title,

description,

dueDate,

priority,

status

}

:

task


);



saveData(updated);


setEditingTask(null);

resetForm();


}





function deleteTask(id:number){


saveData(

tasks.filter(
task=>task.id !== id
)

);


}





function priorityColor(value:string){


if(value==="High")

return "bg-red-100 text-red-700";


if(value==="Medium")

return "bg-yellow-100 text-yellow-700";


return "bg-green-100 text-green-700";


}





return (

<section>


<h2 className="
text-2xl
font-bold
text-slate-900
">

Tasks

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

placeholder="Task title"

value={title}

onChange={e=>setTitle(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

/>





<textarea

placeholder="Description"

value={description}

onChange={e=>setDescription(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

/>





<input

type="date"

value={dueDate}

onChange={e=>setDueDate(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

/>





<select

value={priority}

onChange={e=>setPriority(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

>

<option>Low</option>

<option>Medium</option>

<option>High</option>

</select>






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

<option>Not Started</option>

<option>In Progress</option>

<option>Completed</option>

</select>







<button

onClick={
editingTask
?
saveEdit
:
addTask
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
editingTask
?
"Save Task"
:
"Add Task"
}

</button>





{
editingTask && (

<button

onClick={()=>{

setEditingTask(null);

resetForm();

}}

className="
ml-3
rounded-lg
border
px-5
py-3
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

tasks.map(task=>(


<div

key={task.id}

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


<h3 className="
text-xl
font-bold
text-slate-900
">

{task.title}

</h3>



<span className={`
rounded-full
px-3
py-1
text-xs
font-semibold
${priorityColor(task.priority)}
`}>

{task.priority}

</span>


</div>





<p className="
mt-3
text-slate-600
">

{task.description}

</p>





<p className="
mt-3
text-sm
text-slate-600
">

Due: {task.dueDate}

</p>




<p className="
mt-1
text-sm
font-medium
text-blue-600
">

Status: {task.status}

</p>







<div className="
mt-5
flex
gap-3
">


<button

onClick={()=>startEdit(task)}

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

onClick={()=>deleteTask(task.id)}

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