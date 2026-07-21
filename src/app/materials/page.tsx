"use client";


import { useState } from "react";

import { Material } from "@/types/Material";

import MaterialCard from "@/components/materials/MaterialCard";

import MaterialForm from "@/components/materials/MaterialForm";



export default function MaterialsPage(){


const [materials,setMaterials]=useState<Material[]>([


{
id:1,
title:"Software Engineer Resume",
type:"Resume",
description:"Frontend focused resume",
link:"https://example.com"
},


{
id:2,
title:"Google Cover Letter",
type:"Cover Letter",
description:"Customized cover letter example"
}


]);




function addMaterial(material:Material){

setMaterials((previous)=>[
...previous,
material
]);

}



return (

<main className="min-h-screen bg-slate-100">


<div className="mx-auto max-w-6xl px-8 py-12">


<h1 className="text-4xl font-bold">
Application Materials
</h1>


<p className="mt-3 text-slate-600">
Manage resumes, cover letters, and portfolio items.
</p>



<div className="mt-8">

<MaterialForm
onAddMaterial={addMaterial}
/>

</div>



<div className="mt-10 grid gap-6">


{
materials.map((material)=>(

<MaterialCard

key={material.id}

material={material}

/>

))
}


</div>


</div>


</main>

);


}