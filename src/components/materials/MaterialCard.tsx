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
border
border-blue-100
bg-white
p-6
shadow-sm
transition
hover:-translate-y-1
hover:shadow-lg
">


<div className="
flex
items-start
justify-between
">


<div>


<h2 className="
text-xl
font-bold
text-slate-900
">

{material.name}

</h2>


<p className="
mt-2
text-sm
text-blue-600
font-medium
">

{material.type}

</p>


</div>


<div className="
bg-blue-50
px-3
py-1
text-xs
font-semibold
text-blue-600
">

Material

</div>


</div>




{
material.description && (

<p className="
mt-5
text-slate-600
leading-relaxed
">

{material.description}

</p>

)

}


{
material.link && (

<a

href={
  material.link.startsWith("http")
    ? material.link
    : `https://${material.link}`
}

target="_blank"

rel="noopener noreferrer"

className="
mt-4
block
text-sm
font-medium
text-blue-600
hover:text-blue-700
hover:underline
"

>

Open Resource →

</a>

)

}


<div className="
mt-6
flex
gap-3
">


<button

onClick={()=>onEdit(material)}

className="
border
border-blue-200
px-5
py-2
font-medium
text-blue-600
hover:bg-blue-50
transition
"

>

Edit

</button>



<button

onClick={()=>onDelete(material.id)}

className="
bg-red-500
px-5
py-2
font-medium
text-white
hover:bg-red-600
transition
"

>

Delete

</button>

</div>

</div>

);

}