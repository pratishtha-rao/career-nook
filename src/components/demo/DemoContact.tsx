"use client";

import {useState} from "react";
import {getDemoData,saveDemoData} from "@/lib/demoStorage";


type Contact={

id:number;
name:string;
company:string;
role:string;
type:string;
email?:string;
notes?:string;

};



export default function DemoContacts(){


const [contacts,setContacts]=useState<Contact[]>(()=> 
getDemoData<Contact>("demo_contacts")
);



const [name,setName]=useState("");
const [company,setCompany]=useState("");
const [role,setRole]=useState("");
const [type,setType]=useState("Recruiter");
const [email,setEmail]=useState("");
const [notes,setNotes]=useState("");





function addContact(){


const contact:Contact={

id:Date.now(),

name,
company,
role,
type,
email,
notes

};



const updated=[

contact,
...contacts

];


setContacts(updated);


saveDemoData(
"demo_contacts",
updated
);



setName("");
setCompany("");
setRole("");
setEmail("");
setNotes("");

}





function deleteContact(id:number){


const updated =
contacts.filter(
contact=>contact.id!==id
);


setContacts(updated);


saveDemoData(
"demo_contacts",
updated
);


}






return (

<section>


<h2 className="text-2xl font-bold">
Contacts
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
className="border p-2 w-full"
value={name}
onChange={e=>setName(e.target.value)}
/>


<input
placeholder="Company"
className="border p-2 w-full"
value={company}
onChange={e=>setCompany(e.target.value)}
/>


<input
placeholder="Role"
className="border p-2 w-full"
value={role}
onChange={e=>setRole(e.target.value)}
/>



<select
className="border p-2 w-full"
value={type}
onChange={e=>setType(e.target.value)}
>

<option>Recruiter</option>
<option>Hiring Manager</option>
<option>Employee</option>
<option>Other</option>

</select>



<input
placeholder="Email"
className="border p-2 w-full"
value={email}
onChange={e=>setEmail(e.target.value)}
/>



<textarea
placeholder="Notes"
className="border p-2 w-full"
value={notes}
onChange={e=>setNotes(e.target.value)}
/>



<button

onClick={addContact}

className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-2
rounded-lg
"

>

Add Contact

</button>


</div>





{
contacts.map(contact=>(


<div

key={contact.id}

className="
bg-white
mt-4
border
rounded-xl
p-5
"

>


<h3 className="font-bold text-lg">

{contact.name}

</h3>


<p>{contact.company}</p>

<p>{contact.role}</p>

<p>{contact.type}</p>


{
contact.email &&
<p>{contact.email}</p>
}



{
contact.notes &&
<p>{contact.notes}</p>
}




<button

onClick={()=>deleteContact(contact.id)}

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