"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
Task,
CreateTask
} from "@/types/Task";

import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";
import EditTaskForm from "@/components/tasks/EditTaskForm";


export default function TasksPage(){


const [tasks,setTasks]=useState<Task[]>([]);

const [editingTask,setEditingTask]=useState<Task | null>(null);

const router = useRouter();



useEffect(()=>{


async function loadTasks(){

const response = await fetch("/api/tasks");

const data = await response.json();



if(response.status===401){

router.push("/login");

return;

}



if(!response.ok){

setTasks([]);

return;

}



setTasks(
Array.isArray(data)
?
data
:
[]
);


}


loadTasks();


},[router]);





async function addTask(task:CreateTask){


const response = await fetch("/api/tasks",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(task)

});


const saved = await response.json();



setTasks(previous=>[
saved,
...previous
]);


}





async function deleteTask(id:number){


await fetch(`/api/tasks/${id}`,{

method:"DELETE"

});


setTasks(previous=>

previous.filter(
task=>task.id!==id
)

);


}





async function saveEditedTask(task:Task){


await fetch(`/api/tasks/${task.id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(task)

});



setTasks(previous=>

previous.map(item=>

item.id===task.id
?
task
:
item

)

);



setEditingTask(null);


}





return (

<main className="
min-h-screen
bg-[#f5f9ff]
">


<div className="
mx-auto
max-w-6xl
px-8
py-10
">


<div className="mb-8">


<h1 className="
text-4xl
font-bold
text-slate-950
">

Tasks

</h1>


<p className="
mt-2
text-slate-600
">

Organize deadlines, priorities, and career progress.

</p>


</div>




<TaskForm

onAddTask={addTask}

/>





{
editingTask && (

<div className="mt-6">

<EditTaskForm

task={editingTask}

onSave={saveEditedTask}

onCancel={()=>setEditingTask(null)}

/>

</div>

)

}





<div className="
mt-8
grid
gap-5
md:grid-cols-2
">


{
tasks.map(task=>(


<TaskCard

key={task.id}

task={task}

onEdit={setEditingTask}

onDelete={deleteTask}

/>


))

}


</div>


</div>


</main>

);


}