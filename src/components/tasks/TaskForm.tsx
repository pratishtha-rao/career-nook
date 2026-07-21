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


const newTask:CreateTask={

title,

description,

dueDate,

priority,

status,

};

onAddTask(newTask);



setTitle("");

setDescription("");

setDueDate("");

}



return (

<form

onSubmit={submit}

className="
rounded-xl
border
bg-white
p-6
space-y-4
"

>


<h2 className="
text-xl
font-bold
text-black
">

Add Task

</h2>




<input

placeholder="Task title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

className="
w-full
rounded-lg
border
p-3
text-black
"

/>




<textarea

placeholder="Description"

value={description}

onChange={(e)=>setDescription(e.target.value)}

className="
w-full
rounded-lg
border
p-3
text-black
"

/>




<input

type="date"

value={dueDate}

onChange={(e)=>setDueDate(e.target.value)}

className="
w-full
rounded-lg
border
p-3
text-black
"

/>




<select

value={priority}

onChange={(e)=>setPriority(e.target.value as TaskPriority)}

className="
w-full
rounded-lg
border
p-3
text-black
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

onChange={(e)=>setStatus(e.target.value as TaskStatus)}

className="
w-full
rounded-lg
border
p-3
text-black
"

>

<option>
Not Started
</option>

<option>
In Progress
</option>

<option>
Completed
</option>


</select>




<button

className="
rounded-lg
bg-blue-600
px-5
py-2
text-white
"

>

Add Task

</button>



</form>

);


}
