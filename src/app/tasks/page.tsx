"use client";


import { useEffect, useState } from "react";

import { Task, CreateTask } from "@/types/Task";

import TaskCard from "@/components/tasks/TaskCard";

import TaskForm from "@/components/tasks/TaskForm";

import EditTaskForm from "@/components/tasks/EditTaskForm";



export default function TasksPage(){


const [tasks,setTasks]=useState<Task[]>([]);


const [editingTask,setEditingTask]=useState<Task | null>(null);



useEffect(()=>{

async function loadTasks(){

const response = await fetch("/api/tasks");

const data = await response.json();

setTasks(data);

}


loadTasks();


},[]);


async function addTask(task:CreateTask){

const response = await fetch("/api/tasks",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(task)

});


const savedTask = await response.json();


setTasks(previous=>[
...previous,
savedTask
]);

}


async function deleteTask(id:number){

await fetch(`/api/tasks/${id}`,{

method:"DELETE"

});


setTasks(previous =>

previous.filter(

(task)=>task.id !== id

)

);

}




async function saveEditedTask(updatedTask:Task){


await fetch(`/api/tasks/${updatedTask.id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(updatedTask)

});



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

