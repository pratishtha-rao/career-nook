"use client";

import { useState } from "react";
import { getDemoData, saveDemoData } from "@/lib/demoStorage";


type Material = {

id:number;
name:string;
type:string;
description?:string;
link?:string;

};



export default function DemoMaterials(){


const [materials,setMaterials] = useState<Material[]>(()=> 
getDemoData<Material>("demo_materials")
);



const [editingMaterial,setEditingMaterial] = useState<Material | null>(null);



const [name,setName] = useState("");
const [type,setType] = useState("Resume");
const [description,setDescription] = useState("");
const [link,setLink] = useState("");






function resetForm(){

setName("");

setType("Resume");

setDescription("");

setLink("");

}




function saveData(updated:Material[]){

setMaterials(updated);

saveDemoData(
"demo_materials",
updated
);

}





function addMaterial(){


const material:Material={

id:Date.now(),

name,

type,

description,

link

};



saveData([

material,
...materials

]);


resetForm();

}





function startEdit(material:Material){


setEditingMaterial(material);


setName(material.name);

setType(material.type);

setDescription(material.description ?? "");

setLink(material.link ?? "");

}





function saveEdit(){


if(!editingMaterial) return;



const updated = materials.map(material =>


material.id === editingMaterial.id

?

{

...material,

name,

type,

description,

link

}

:

material


);



saveData(updated);


setEditingMaterial(null);

resetForm();


}





function deleteMaterial(id:number){


saveData(

materials.filter(
material=>material.id !== id
)

);


}






function formatLink(value:string){

if(!value) return "";

return value.startsWith("http")

?

value

:

`https://${value}`;

}





return (

<section>


<h2 className="
text-2xl
font-bold
text-slate-900
">

Materials

</h2>





<div className="
mt-4
rounded-xl
border
border-blue-100
bg-white
p-6
shadow-sm
space-y-3
">





<input

placeholder="Material name"

value={name}

onChange={e=>setName(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

/>





<select

value={type}

onChange={e=>setType(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
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

onChange={e=>setDescription(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

/>





<input

placeholder="Link / URL"

value={link}

onChange={e=>setLink(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

/>






<button

onClick={
editingMaterial
?
saveEdit
:
addMaterial
}

className="
rounded-lg
bg-blue-600
px-5
py-3
font-semibold
text-white
hover:bg-blue-700
"

>

{
editingMaterial
?
"Save Material"
:
"Add Material"
}

</button>





{
editingMaterial && (

<button

onClick={()=>{

setEditingMaterial(null);

resetForm();

}}

className="
ml-3
rounded-lg
border
px-5
py-3
"

>

Cancel

</button>

)

}



</div>









<div className="
mt-8
space-y-5
">





{

materials.map(material=>(


<div

key={material.id}

className="
border
border-blue-100
bg-white
p-6
shadow-sm
transition
hover:-translate-y-1
hover:shadow-lg
"

>




<div className="
flex
justify-between
items-start
">


<div>


<h3 className="
text-xl
font-bold
text-slate-900
">

{material.name}

</h3>



<p className="
mt-1
text-blue-600
font-medium
">

{material.type}

</p>



</div>



<span className="
rounded-full
bg-blue-50
px-3
py-1
text-xs
font-semibold
text-blue-600
">

Material

</span>


</div>








{
material.description && (

<p className="
mt-4
text-slate-600
">

{material.description}

</p>

)

}







{
material.link && (

<a

href={formatLink(material.link)}

target="_blank"

rel="noopener noreferrer"

className="
mt-4
block
font-medium
text-blue-600
hover:underline
"

>

Open Resource →

</a>

)

}







<div className="
mt-5
flex
gap-3
">


<button

onClick={()=>startEdit(material)}

className="
rounded-lg
border
border-blue-200
px-4
py-2
text-blue-600
hover:bg-blue-50
"

>

Edit

</button>




<button

onClick={()=>deleteMaterial(material.id)}

className="
rounded-lg
bg-red-600
px-4
py-2
text-white
hover:bg-red-700
"

>

Delete

</button>


</div>





</div>


))

}




</div>



</section>

);


}

