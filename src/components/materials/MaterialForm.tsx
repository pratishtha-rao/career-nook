"use client";


import { useState } from "react";
import { Material, MaterialType } from "@/types/Material";


type Props = {
  onAddMaterial:(material:Material)=>void;
};



export default function MaterialForm({
  onAddMaterial,
}:Props){


const [title,setTitle]=useState("");
const [type,setType]=useState<MaterialType>("Resume");
const [description,setDescription]=useState("");
const [link,setLink]=useState("");



function handleSubmit(
e:React.FormEvent
){

e.preventDefault();


const newMaterial:Material={

id:Date.now(),

title,

type,

description,

link,

};


onAddMaterial(newMaterial);


setTitle("");
setDescription("");
setLink("");
setType("Resume");

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
Add Material
</h2>



<div className="grid gap-4">


<input

placeholder="Title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

className="rounded-lg border p-3"

required

/>



<select

value={type}

onChange={(e)=>
setType(e.target.value as MaterialType)
}

className="rounded-lg border p-3"

>

<option>
Resume
</option>

<option>
Cover Letter
</option>

<option>
Portfolio
</option>

<option>
Other
</option>

</select>



<textarea

placeholder="Description"

value={description}

onChange={(e)=>setDescription(e.target.value)}

className="rounded-lg border p-3"

/>



<input

placeholder="Link (optional)"

value={link}

onChange={(e)=>setLink(e.target.value)}

className="rounded-lg border p-3"

/>



<button

className="
rounded-lg
bg-blue-600
px-6
py-3
font-semibold
text-white
hover:bg-blue-700
"

>

Add Material

</button>


</div>


</form>

);

}