"use client";


import { useState } from "react";

import {
CreateTask,
TaskPriority,
TaskStatus
} from "@/types/Task";


type Props={

onAddTask:(task:CreateTask)=>void;

};



export default function TaskForm({

onAddTask

}:Props){


const [title,setTitle]=useState("");

const [description,setDescription]=useState("");

const [dueDate,setDueDate]=useState("");

const [priority,setPriority]=useState<TaskPriority>("Medium");

const [status,setStatus]=useState<TaskStatus>("Not Started");





function submit(e:React.FormEvent){

e.preventDefault();


onAddTask({

title,

description,

dueDate,

priority,

status

});


setTitle("");

setDescription("");

setDueDate("");

}



return (

<form

onSubmit={submit}

className="
border
border-blue-100
bg-white
p-6
shadow-sm
"

>


<h2 className="
text-2xl
font-bold
mb-5
">

Add Task

</h2>



<div className="
grid
gap-4
md:grid-cols-2
">


<input

placeholder="Task title"

value={title}

onChange={e=>setTitle(e.target.value)}

className="
border
p-3
focus:border-blue-500
outline-none
"

/>




<input

type="date"

value={dueDate}

onChange={e=>setDueDate(e.target.value)}

className="
border
p-3
"

/>



<select

value={priority}

onChange={e=>setPriority(e.target.value as TaskPriority)}

className="
border
p-3
"

>

<option>Low</option>
<option>Medium</option>
<option>High</option>


</select>




<select

value={status}

onChange={e=>setStatus(e.target.value as TaskStatus)}

className="
border
p-3
"

>

<option>Not Started</option>
<option>In Progress</option>
<option>Completed</option>


</select>


</div>





<textarea

placeholder="Description"

value={description}

onChange={e=>setDescription(e.target.value)}

className="
mt-4
h-28
w-full
border
p-3
"

/>





<button

className="
mt-5
bg-blue-600
px-8
py-3
font-semibold
text-white
hover:bg-blue-700
"

>

Add Task

</button>



</form>

);


}