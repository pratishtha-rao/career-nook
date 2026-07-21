"use client";


import { useState } from "react";

import {
Material,
MaterialType
} from "@/types/Material";



type Props={

onAddMaterial:(material:Material)=>void;

};



export default function MaterialForm({

onAddMaterial

}:Props){


const [name,setName] = useState("");
const [type,setType] = useState<MaterialType>("Resume");
const [description,setDescription] = useState("");
const [link,setLink] = useState("");

function submit(e:React.FormEvent){

e.preventDefault();


const newMaterial:Material={
id:Date.now(),
name,
type,
description: description || "",
link,
};

onAddMaterial(newMaterial);


setName("");

setDescription("");

setLink("");

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

Add Material

</h2>



<input
placeholder="Material name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="
w-full
rounded-lg
border
p-3
text-black
"
/>

<select

value={type}

onChange={(e)=>setType(e.target.value as MaterialType)}

className="
w-full
rounded-lg
border
p-3
text-black
"

>

<option>Resume</option>

<option>Cover Letter</option>

<option>Portfolio</option>

<option>Other</option>

</select>




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
  placeholder="Link / URL"
  value={link}
  onChange={(e)=>setLink(e.target.value)}
  className="
  w-full
  rounded-lg
  border
  p-3
  text-black
  "
/>


<button

className="
rounded-lg
bg-blue-600
px-5
py-2
text-white
"

>

Add Material

</button>


</form>

);

}
