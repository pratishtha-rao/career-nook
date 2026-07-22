"use client";

import { useState } from "react";

import {
  CreateMaterial,
  MaterialType,
} from "@/types/Material";


type Props = {

  onAddMaterial:(material:CreateMaterial)=>void;

};



export default function MaterialForm({

  onAddMaterial

}:Props){


const [name,setName] = useState("");

const [type,setType] =
useState<MaterialType>("Resume");

const [description,setDescription] = useState("");

const [link,setLink] = useState("");



function submit(e:React.FormEvent){

e.preventDefault();


onAddMaterial({

name,

type,

description,

link,

});


setName("");

setDescription("");

setLink("");

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


<div className="
mb-6
flex
items-center
justify-between
">


<h2 className="
text-2xl
font-bold
text-slate-900
">

Add Material

</h2>


<span className="
bg-blue-50
px-3
py-1
text-sm
font-medium
text-blue-600
">

Library

</span>


</div>





<div className="
grid
gap-4
md:grid-cols-2
">


<input

placeholder="Material name"

value={name}

onChange={(e)=>setName(e.target.value)}

className="
border
border-slate-200
p-3
outline-none
focus:border-blue-500
"

/>



<select

value={type}

onChange={(e)=>
setType(e.target.value as MaterialType)
}

className="
border
border-slate-200
p-3
outline-none
focus:border-blue-500
"

>


<option>Resume</option>

<option>Cover Letter</option>

<option>Portfolio</option>

<option>Other</option>


</select>


</div>




<textarea

placeholder="Description"

value={description}

onChange={(e)=>setDescription(e.target.value)}

className="
mt-4
min-h-[120px]
w-full
border
border-slate-200
p-3
outline-none
focus:border-blue-500
"

/>





<input

placeholder="Resource URL"

value={link}

onChange={(e)=>setLink(e.target.value)}

className="
mt-4
w-full
border
border-slate-200
p-3
outline-none
focus:border-blue-500
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
transition
"

>

Add Material

</button>


</form>

);

}

