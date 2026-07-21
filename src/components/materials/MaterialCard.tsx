import { Material } from "@/types/Material";


type Props = {

material:Material;

onEdit:(material:Material)=>void;

onDelete:(id:number)=>void;

};



export default function MaterialCard({

material,

onEdit,

onDelete,

}:Props){


return (

<div className="
rounded-xl
border
bg-white
p-6
shadow-sm
text-black
">


<h2 className="
text-xl
font-bold
">

{material.name}

</h2>



<p className="mt-2">

Type: {material.type}

</p>



{
material.description && (

<p>

Description: {material.description}

</p>

)

}



{
material.link && (

<p>

Link: {material.link}

</p>

)

}




<div className="
mt-5
flex
gap-3
">


<button

onClick={()=>onEdit(material)}

className="
rounded-lg
bg-yellow-500
px-4
py-2
text-white
"

>

Edit

</button>


<button

onClick={()=>onDelete(material.id)}

className="
rounded-lg
bg-red-600
px-4
py-2
text-white
"

>

Delete

</button>



</div>


</div>

);

}