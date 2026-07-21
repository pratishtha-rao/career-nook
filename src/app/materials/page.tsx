"use client";


import { useState } from "react";

import { Material } from "@/types/Material";

import MaterialCard from "@/components/materials/MaterialCard";

import MaterialForm from "@/components/materials/MaterialForm";

import EditMaterialForm from "@/components/materials/EditMaterialForm";



export default function MaterialsPage(){



const [materials,setMaterials]=useState<Material[]>([


{
id:1,
name:"Software Engineer Resume",
type:"Resume",
description:"Frontend focused resume",
link:"https://example.com",
},


{
id:2,
name:"Google Cover Letter",
type:"Cover Letter",
description:"Customized cover letter example",
link:"",
}


]);




const [editingMaterial,setEditingMaterial]=useState<Material | null>(null);





function addMaterial(material:Material){

setMaterials(previous=>[

...previous,

material

]);

}





function deleteMaterial(id:number){

setMaterials(previous =>

previous.filter(

(material)=>material.id !== id

)

);

}


function saveEditedMaterial(updatedMaterial:Material){

setMaterials(previous =>

previous.map(material =>

material.id === updatedMaterial.id

?

updatedMaterial

:

material

)

);


setEditingMaterial(null);

}





return (

<main className="
min-h-screen
bg-slate-100
">


<div className="
mx-auto
max-w-6xl
px-8
py-12
">


<h1 className="
text-4xl
font-bold
text-black
">

Application Materials

</h1>



<p className="
mt-3
text-slate-600
">

Manage resumes, cover letters, and portfolio items.

</p>





<div className="mt-8">


<MaterialForm

onAddMaterial={addMaterial}

/>


</div>





{

editingMaterial && (

<EditMaterialForm

material={editingMaterial}

onSave={saveEditedMaterial}

onCancel={()=>setEditingMaterial(null)}

/>

)

}






<div className="
mt-10
grid
gap-6
">


{

materials

.map(material=>(


<MaterialCard

key={material.id}

material={material}

onEdit={(material)=>

setEditingMaterial(material)

}

onDelete={deleteMaterial}

/>


))

}


</div>



</div>


</main>

);


}