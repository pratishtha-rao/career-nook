"use client";

import { useState } from "react";
import { Contact, ContactType } from "@/types/Contact";


type Props = {

  contact: Contact;

  onSave:(contact:Contact)=>void;

  onCancel:()=>void;

};



export default function EditContactForm({

contact,

onSave,

onCancel

}:Props){


const [name,setName] = useState(contact.name);

const [company,setCompany] = useState(contact.company);

const [role,setRole] = useState(contact.role);

const [type,setType] = useState<ContactType>(contact.type);

const [email,setEmail] = useState(contact.email ?? "");

const [notes,setNotes] = useState(contact.notes ?? "");





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
border
border-blue-100
bg-white
p-6
shadow-sm
"

>


<h2 className="
text-2xl
font-bold
mb-5
text-slate-950
">

Edit Contact

</h2>




<div className="
grid
gap-4
md:grid-cols-2
">



<input

value={name}

onChange={
e=>setName(e.target.value)
}

placeholder="Name"

className="
border
border-slate-200
p-3
outline-none
focus:border-blue-500
"

/>




<input

value={company}

onChange={
e=>setCompany(e.target.value)
}

placeholder="Company"

className="
border
border-slate-200
p-3
outline-none
focus:border-blue-500
"

/>




<input

value={role}

onChange={
e=>setRole(e.target.value)
}

placeholder="Role"

className="
border
border-slate-200
p-3
outline-none
focus:border-blue-500
"

/>





<input

value={email}

onChange={
e=>setEmail(e.target.value)
}

placeholder="Email"

className="
border
border-slate-200
p-3
outline-none
focus:border-blue-500
"

/>





<select

value={type}

onChange={
e=>setType(e.target.value as ContactType)
}

className="
border
border-slate-200
p-3
outline-none
focus:border-blue-500
"

>

<option>
Recruiter
</option>

<option>
Hiring Manager
</option>

<option>
Employee
</option>

<option>
Friend
</option>

<option>
Other
</option>


</select>



</div>






<textarea

value={notes}

onChange={
e=>setNotes(e.target.value)
}

placeholder="Notes"

className="
mt-4
h-28
w-full
border
border-slate-200
p-3
outline-none
focus:border-blue-500
"

/>






<div className="
mt-5
flex
gap-3
">


<button

type="submit"

className="
bg-blue-600
px-7
py-3
font-semibold
text-white
hover:bg-blue-700
transition
"

>

Save Changes

</button>





<button

type="button"

onClick={onCancel}

className="
border
border-slate-300
px-7
py-3
font-semibold
text-slate-700
hover:bg-slate-50
transition
"

>

Cancel

</button>



</div>



</form>

);


}

