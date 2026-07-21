"use client";


import { useState } from "react";

import { Contact, ContactType } from "@/types/Contact";


type Props={

contact:Contact;

onSave:(contact:Contact)=>void;

onCancel:()=>void;

};



export default function EditContactForm({

contact,

onSave,

onCancel

}:Props){


const [name,setName]=useState(contact.name);

const [company,setCompany]=useState(contact.company);

const [role,setRole]=useState(contact.role);

const [type,setType]=useState<ContactType>(contact.type);

const [email,setEmail]=useState(contact.email ?? "");

const [notes,setNotes]=useState(contact.notes ?? "");




function submit(e:React.FormEvent){

e.preventDefault();


onSave({

...contact,

name,

company,

role,

type,

email,

notes

});


}



return (

<form

onSubmit={submit}

className="
rounded-xl
border
bg-white
p-6
space-y-4
"

>


<h2 className="text-xl font-bold text-black">
Edit Contact
</h2>



<input
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full rounded-lg border p-3 text-black"
/>



<input
value={company}
onChange={(e)=>setCompany(e.target.value)}
className="w-full rounded-lg border p-3 text-black"
/>



<input
value={role}
onChange={(e)=>setRole(e.target.value)}
className="w-full rounded-lg border p-3 text-black"
/>



<select

value={type}

onChange={(e)=>setType(e.target.value as ContactType)}

className="w-full rounded-lg border p-3 text-black"

>

<option>Recruiter</option>
<option>Hiring Manager</option>
<option>Employee</option>
<option>Friend</option>
<option>Other</option>

</select>



<input

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="w-full rounded-lg border p-3 text-black"

/>



<textarea

value={notes}

onChange={(e)=>setNotes(e.target.value)}

className="w-full rounded-lg border p-3 text-black"

/>



<button

className="
rounded-lg
bg-blue-600
px-5
py-2
text-white
"

>

Save

</button>



<button

type="button"

onClick={onCancel}

className="
ml-3
rounded-lg
border
px-5
py-2
text-black
"

>

Cancel

</button>


</form>

);


}