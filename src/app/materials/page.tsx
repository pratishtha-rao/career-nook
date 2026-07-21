"use client";


import { useEffect, useState } from "react";

import { Material } from "@/types/Material";

import MaterialCard from "@/components/materials/MaterialCard";

import MaterialForm from "@/components/materials/MaterialForm";

import EditMaterialForm from "@/components/materials/EditMaterialForm";



export default function MaterialsPage(){


const [materials,setMaterials] = useState<Material[]>([]);

const [editingMaterial,setEditingMaterial] = useState<Material | null>(null);

const [loading,setLoading] = useState(true);




useEffect(()=>{


async function loadMaterials(){


try{


const response = await fetch("/api/materials");


const data = await response.json();


setMaterials(data);



}

catch(error){


console.error(
"Failed to load materials:",
error
);


}

finally{


setLoading(false);


}


}



loadMaterials();


},[]);






async function addMaterial(material:Material){



const response = await fetch("/api/materials",{

method:"POST",

headers:{

"Content-Type":"application/json",

},

body:JSON.stringify({
  name: material.name,
  type: material.type,
  description: material.description ?? "",
  link: material.link ?? "",
}),

});




const newMaterial = await response.json();



setMaterials(previous=>[

newMaterial,

...previous

]);



}







async function deleteMaterial(id:number){



await fetch(`/api/materials/${id}`,{


method:"DELETE",


});




setMaterials(previous=>

previous.filter(

(material)=>material.id !== id

)

);



}









async function saveEditedMaterial(updatedMaterial:Material){



const response = await fetch(

`/api/materials/${updatedMaterial.id}`,

{


method:"PUT",


headers:{


"Content-Type":"application/json",


},


body:JSON.stringify(updatedMaterial),


}

);




const savedMaterial = await response.json();





setMaterials(previous=>


previous.map(material=>


material.id === savedMaterial.id

?

savedMaterial

:

material


)

);





setEditingMaterial(null);



}









if(loading){


return (

<main className="
min-h-screen
flex
items-center
justify-center
bg-slate-100
">


<p className="text-lg text-black">

Loading materials...

</p>


</main>

);


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

<div className="mt-8">


<EditMaterialForm

material={editingMaterial}

onSave={saveEditedMaterial}

onCancel={()=>setEditingMaterial(null)}

/>


</div>

)

}









<div className="
mt-10
grid
gap-6
">





{

materials.map(material=>(



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
