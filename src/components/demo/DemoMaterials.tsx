"use client";

import {useState} from "react";
import {getDemoData,saveDemoData} from "@/lib/demoStorage";


type Material={

id:number;
name:string;
type:string;
description?:string;
link?:string;

};



export default function DemoMaterials(){


const [materials,setMaterials]=useState<Material[]>(()=> 
getDemoData<Material>("demo_materials")
);



const [name,setName]=useState("");
const [type,setType]=useState("Resume");
const [description,setDescription]=useState("");
const [link,setLink]=useState("");







function addMaterial(){


const material:Material={

id:Date.now(),

name,

type,

description,

link

};



const updated=[

material,
...materials

];



setMaterials(updated);



saveDemoData(
"demo_materials",
updated
);



setName("");
setDescription("");
setLink("");

}





function deleteMaterial(id:number){


const updated =
materials.filter(
material=>material.id!==id
);



setMaterials(updated);



saveDemoData(
"demo_materials",
updated
);


}







return (

<section>


<h2 className="text-2xl font-bold">

Materials

</h2>





<div className="
bg-white
p-5
rounded-xl
space-y-3
mt-4
">





<input

placeholder="Name"

value={name}

onChange={e=>setName(e.target.value)}

className="
border
p-2
w-full
"

/>






<select

value={type}

onChange={e=>setType(e.target.value)}

className="
border
p-2
w-full
"

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



</select>







<textarea

placeholder="Description"

value={description}

onChange={e=>setDescription(e.target.value)}

className="
border
p-2
w-full
"

/>







<input

placeholder="Link"

value={link}

onChange={e=>setLink(e.target.value)}

className="
border
p-2
w-full
"

/>








<button

onClick={addMaterial}

className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-2
rounded-lg
"

>

Add Material

</button>




</div>







{

materials.map(material=>(


<div

key={material.id}

className="
bg-white
border
rounded-xl
p-5
mt-4
"

>



<h3 className="
font-bold
text-lg
">

{material.name}

</h3>




<p>
Type: {material.type}
</p>




{
material.description &&
<p>
{material.description}
</p>
}





{
material.link &&
<p>
{material.link}
</p>
}







<button

onClick={()=>deleteMaterial(material.id)}

className="
mt-4
bg-red-600
hover:bg-red-700
text-white
px-4
py-2
rounded-lg
font-semibold
"

>

Delete

</button>





</div>


))

}




</section>

);


}
