"use client";

import {useState} from "react";
import {getDemoData,saveDemoData} from "@/lib/demoStorage";


type Task={

id:number;
title:string;
description:string;
dueDate:string;
priority:string;
status:string;

};



export default function DemoTasks(){


const [tasks,setTasks]=useState<Task[]>(()=> 
getDemoData<Task>("demo_tasks")
);



const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [dueDate,setDueDate]=useState("");
const [priority,setPriority]=useState("Medium");
const [status,setStatus]=useState("Pending");






function addTask(){


const task:Task={

id:Date.now(),

title,

description,

dueDate,

priority,

status

};



const updated=[

task,
...tasks

];


setTasks(updated);


saveDemoData(
"demo_tasks",
updated
);



setTitle("");
setDescription("");
setDueDate("");

}





function deleteTask(id:number){


const updated =
tasks.filter(
task=>task.id!==id
);



setTasks(updated);



saveDemoData(
"demo_tasks",
updated
);


}






return (

<section>


<h2 className="text-2xl font-bold">

Tasks

</h2>




<div className="
bg-white
p-5
rounded-xl
space-y-3
mt-4
">



<input

placeholder="Title"

value={title}

onChange={e=>setTitle(e.target.value)}

className="
border
p-2
w-full
"

/>




<textarea

placeholder="Description"

value={description}

onChange={e=>setDescription(e.target.value)}

className="
border
p-2
w-full
"

/>





<input

placeholder="Due Date"

value={dueDate}

onChange={e=>setDueDate(e.target.value)}

className="
border
p-2
w-full
"

/>





<select

value={priority}

onChange={e=>setPriority(e.target.value)}

className="
border
p-2
w-full
"

>


<option>
Low
</option>

<option>
Medium
</option>

<option>
High
</option>


</select>





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
Pending
</option>

<option>
Completed
</option>


</select>





<button

onClick={addTask}

className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-2
rounded-lg
"

>

Add Task

</button>




</div>







{

tasks.map(task=>(


<div

key={task.id}

className="
bg-white
border
rounded-xl
p-5
mt-4
"

>


<h3 className="font-bold text-lg">

{task.title}

</h3>


<p>
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





<button

onClick={()=>deleteTask(task.id)}

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



</section>

);


}