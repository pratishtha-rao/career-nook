"use client";

import { useState } from "react";
import { Task } from "@/types/Task";
import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";

export default function TasksPage(){

const [tasks,setTasks]=useState<Task[]>([


{
id:1,
title:"Follow up with recruiter",
description:"Send thank-you email after interview",
dueDate:"2026-07-25",
priority:"High",
completed:false
},


{
id:2,
title:"Update resume",
description:"Add new project experience",
dueDate:"2026-07-22",
priority:"Medium",
completed:true
}


]);





function addTask(task:Task){

setTasks((previous)=>[
...previous,
task
]);

}




function toggleTask(id:number){

setTasks((previous)=>

previous.map(task=>

task.id===id

?

{
...task,
completed:!task.completed
}

:

task

)

);


}





return (

<main className="min-h-screen bg-slate-100">


<div className="mx-auto max-w-6xl px-8 py-12">


<h1 className="text-4xl font-bold">
Tasks
</h1>


<p className="mt-3 text-slate-600">
Stay organized during your job search.
</p>



<div className="mt-8">

<TaskForm
onAddTask={addTask}
/>

</div>




<div className="mt-10 grid gap-6">


{
tasks.map((task)=>(

<TaskCard

key={task.id}

task={task}

onToggle={toggleTask}

/>

))
}


</div>


</div>


</main>

);


}