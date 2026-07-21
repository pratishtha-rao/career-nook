import { Contact } from "@/types/Contact";


type Props = {

contact:Contact;

onEdit:(contact:Contact)=>void;

onDelete:(id:number)=>void;

};



export default function ContactCard({

contact,

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

{contact.name}

</h2>



<p className="mt-2">
Company: {contact.company}
</p>


<p>
Role: {contact.role}
</p>


<p>
Type: {contact.type}
</p>



{
contact.email && (

<p>
Email: {contact.email}
</p>

)
}



{
contact.notes && (

<p>
Notes: {contact.notes}
</p>

)
}




<div className="
mt-5
flex
gap-3
">


<button

onClick={()=>onEdit(contact)}

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

onClick={()=>contact.id && onDelete(contact.id)}

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
