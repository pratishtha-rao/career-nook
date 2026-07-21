"use client";


import { useState } from "react";

import {
Material,
MaterialType
} from "@/types/Material";



type Props={

material:Material;

onSave:(material:Material)=>void;

onCancel:()=>void;

};



export default function EditMaterialForm({

material,

onSave,

onCancel

}:Props){


const [title,setTitle]=useState(material.name);

const [type,setType]=useState<MaterialType>(material.type);

const [description,setDescription]=useState(material.description ?? "");

const [link,setLink]=useState(material.link ?? "");




function submit(e:React.FormEvent){

e.preventDefault();


onSave({

...material,

name:title,

type,

description,

link

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

Edit Material

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