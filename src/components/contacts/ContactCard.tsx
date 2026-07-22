import { Contact } from "@/types/Contact";


type Props={

contact:Contact;

onEdit:(contact:Contact)=>void;

onDelete:(id:number)=>void;

};



export default function ContactCard({

contact,

onEdit,

onDelete

}:Props){



return (

<div className="
border
border-blue-100
bg-white
p-6
shadow-sm
hover:shadow-lg
transition
">


<div className="
flex
justify-between
items-start
">


<div>


<h2 className="
text-2xl
font-bold
text-slate-950
">

{contact.name}

</h2>


<p className="
mt-1
text-blue-600
font-medium
">

{contact.role}

</p>


<p className="
text-slate-500
">

{contact.company}

</p>


</div>



<span className="
bg-blue-100
text-blue-700
px-3
py-1
text-sm
font-semibold
">

{contact.type}

</span>


</div>





<div className="
mt-5
space-y-2
text-slate-600
">


{
contact.email &&
<p>
{contact.email}
</p>
}



{
contact.notes &&
<p className="
text-sm
">

{contact.notes}

</p>
}


</div>





<div className="
mt-6
flex
gap-3
">


<button

onClick={()=>onEdit(contact)}

className="
bg-blue-600
px-5
py-2
text-white
font-semibold
hover:bg-blue-700
transition
"

>

Edit

</button>



<button

onClick={()=>contact.id && onDelete(contact.id)}

className="
border
border-red-200
px-5
py-2
text-red-600
font-semibold
hover:bg-red-50
transition
"

>

Delete

</button>


</div>


</div>

);


}

