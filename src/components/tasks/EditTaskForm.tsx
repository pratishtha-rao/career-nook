"use client";


import { useState } from "react";

import {
Task,
TaskPriority,
TaskStatus
} from "@/types/Task";


type Props={

task:Task;

onSave:(task:Task)=>void;

onCancel:()=>void;

};



export default function EditTaskForm({

task,

onSave,

onCancel

}:Props){


const [title,setTitle]=useState(task.title);

const [description,setDescription]=useState(task.description ?? "");

const [dueDate,setDueDate]=useState(task.dueDate);

const [priority,setPriority]=useState<TaskPriority>(task.priority);

const [status,setStatus]=useState<TaskStatus>(task.status);



function submit(e:React.FormEvent){

e.preventDefault();


onSave({

...task,

title,

description,

dueDate,

priority,

status

});


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

Edit Task

</h2>



<input

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

<option>Low</option>

<option>Medium</option>

<option>High</option>

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

<option>Not Started</option>

<option>In Progress</option>

<option>Completed</option>

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

Save

</button>



<button

type="button"

onClick={onCancel}

className="
ml-3
rounded-lg
border
px-5
py-2
text-black
"

>

Cancel

</button>



</form>

);


}
