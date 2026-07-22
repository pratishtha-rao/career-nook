"use client";


import { useState } from "react";
import { CreateContact, ContactType } from "@/types/Contact";


type Props = {
  onAddContact:(contact:CreateContact)=>void;
};



export default function ContactForm({

onAddContact

}:Props){


const [name,setName]=useState("");
const [company,setCompany]=useState("");
const [role,setRole]=useState("");
const [type,setType]=useState<ContactType>("Recruiter");
const [email,setEmail]=useState("");
const [notes,setNotes]=useState("");




function submit(e:React.FormEvent){

e.preventDefault();


onAddContact({

name,
company,
role,
type,
email,
notes

});


setName("");
setCompany("");
setRole("");
setEmail("");
setNotes("");

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

Add Contact

</h2>




<div className="
grid
gap-4
md:grid-cols-2
">


<input

placeholder="Name"

value={name}

onChange={
e=>setName(e.target.value)
}

className="
border
border-slate-200
p-3
outline-none
focus:border-blue-500
"

/>



<input

placeholder="Company"

value={company}

onChange={
e=>setCompany(e.target.value)
}

className="
border
border-slate-200
p-3
outline-none
focus:border-blue-500
"

/>



<input

placeholder="Role"

value={role}

onChange={
e=>setRole(e.target.value)
}

className="
border
border-slate-200
p-3
outline-none
focus:border-blue-500
"

/>



<input

placeholder="Email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

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

placeholder="Notes"

value={notes}

onChange={
e=>setNotes(e.target.value)
}

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




<button

type="submit"

className="
mt-5
bg-blue-600
px-8
py-3
font-semibold
text-white
hover:bg-blue-700
transition
"

>

Add Contact

</button>



</form>

);


}