"use client";


import { useState } from "react";

import { Task } from "@/types/Task";

import TaskCard from "@/components/tasks/TaskCard";

import TaskForm from "@/components/tasks/TaskForm";

import EditTaskForm from "@/components/tasks/EditTaskForm";



export default function TasksPage(){



const [tasks,setTasks]=useState<Task[]>([


{
id:1,
title:"Follow up with recruiter",
description:"Send thank-you email after interview",
dueDate:"2026-07-25",
priority:"High",
status:"In Progress",
},


{
id:2,
title:"Update resume",
description:"Add new project experience",
dueDate:"2026-07-22",
priority:"Medium",
status:"Completed",
}


]);



const [editingTask,setEditingTask]=useState<Task | null>(null);





function addTask(task:Task){

setTasks(previous=>[

...previous,

task

]);

}




function deleteTask(id:number){

setTasks(previous =>

previous.filter(

(task)=>task.id !== id

)

);

}


function saveEditedTask(updatedTask:Task){

setTasks(previous =>

previous.map(task =>

task.id === updatedTask.id

?

updatedTask

:

task

)

);


setEditingTask(null);

}





return (

<main className="
min-h-screen
bg-slate-100
">


<div className="
mx-auto
max-w-6xl
px-8
py-12
">


<h1 className="
text-4xl
font-bold
text-black
">

Tasks

</h1>



<p className="
mt-3
text-slate-600
">

Stay organized during your job search.

</p>




<div className="mt-8">


<TaskForm

onAddTask={addTask}

/>


</div>





{

editingTask && (

<EditTaskForm

task={editingTask}

onSave={saveEditedTask}

onCancel={()=>setEditingTask(null)}

/>

)

}




<div className="
mt-10
grid
gap-6
">


{

tasks.map(task=>(

<TaskCard

key={task.id}

task={task}

onEdit={(task)=>

setEditingTask(task)

}

onDelete={deleteTask}

/>


))

}



</div>



</div>


</main>

);


}