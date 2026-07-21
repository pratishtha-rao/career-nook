"use client";


import { useEffect, useState } from "react";

import MaterialCard from "@/components/materials/MaterialCard";

import MaterialForm from "@/components/materials/MaterialForm";

import EditMaterialForm from "@/components/materials/EditMaterialForm";

import { useRouter } from "next/navigation";

import { Material, CreateMaterial } from "@/types/Material";

export default function MaterialsPage(){

const [materials,setMaterials] = useState<Material[]>([]);
const router = useRouter();

const [editingMaterial,setEditingMaterial] = useState<Material | null>(null);

const [loading,setLoading] = useState(true);




useEffect(() => {

  async function loadMaterials() {

    try {

      const response = await fetch("/api/materials", {
        cache:"no-store",
      });


      const data = await response.json();



      if (response.status === 401) {

        router.push("/login");

        return;

      }



      if (!response.ok) {

        console.error(data);

        setMaterials([]);

        return;

      }



      setMaterials(
        Array.isArray(data)
        ? data
        : []
      );


    } catch(error){

      console.error(
        "Failed loading materials:",
        error
      );

      setMaterials([]);

    }
    finally {

      setLoading(false);

    }


  }


  loadMaterials();


},[router]);

async function addMaterial(material:CreateMaterial){


const response = await fetch("/api/materials",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(material)

});


const savedMaterial = await response.json();


if(!response.ok){

console.log(savedMaterial);

return;

}


setMaterials(previous=>[
savedMaterial,
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
