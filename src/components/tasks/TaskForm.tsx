"use client";


import { useState } from "react";
import { Task, TaskPriority } from "@/types/Task";


type Props = {
onAddTask:(task:Task)=>void;
};



export default function TaskForm({
onAddTask
}:Props){


const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [dueDate,setDueDate]=useState("");
const [priority,setPriority]=useState<TaskPriority>("Medium");



function handleSubmit(
e:React.FormEvent
){

e.preventDefault();



const newTask:Task={

id:Date.now(),

title,

description,

dueDate,

priority,

completed:false

};



onAddTask(newTask);



setTitle("");
setDescription("");
setDueDate("");
setPriority("Medium");


}



return (

<form

onSubmit={handleSubmit}

className="
rounded-2xl
border
bg-white
p-6
shadow-sm
"

>


<h2 className="mb-6 text-2xl font-bold">
Add Task
</h2>


<div className="grid gap-4">


<input

placeholder="Task title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

className="rounded-lg border p-3"

required

/>



<textarea

placeholder="Description"

value={description}

onChange={(e)=>setDescription(e.target.value)}

className="rounded-lg border p-3"

/>



<input

type="date"

value={dueDate}

onChange={(e)=>setDueDate(e.target.value)}

className="rounded-lg border p-3"

required

/>



<select

value={priority}

onChange={(e)=>
setPriority(
e.target.value as TaskPriority
)}

className="rounded-lg border p-3"

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




<button

className="
rounded-lg
bg-green-600
px-6
py-3
font-semibold
text-white
hover:bg-green-700
"

>

Add Task

</button>


</div>


</form>

);


}