"use client";

import { useState } from "react";
import { CreateContact, ContactType } from "@/types/Contact";

type Props = {
  onAddContact:(contact:CreateContact)=>void;
};

export default function ContactForm({
  onAddContact
}:Props){


const [name,setName] = useState("");
const [company,setCompany] = useState("");
const [role,setRole] = useState("");
const [type,setType] = useState<ContactType>("Recruiter");
const [email,setEmail] = useState("");
const [notes,setNotes] = useState("");



function submit(e:React.FormEvent){

e.preventDefault();


const newContact:CreateContact = {
  
name,

company,

role,

type,

email,

notes,

};


onAddContact(newContact);



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
rounded-xl
border
bg-white
p-6
space-y-4
"

>


<h2 className="
text-xl
font-bold
text-black
">

Add Contact

</h2>



<input

placeholder="Name"

value={name}

onChange={(e)=>setName(e.target.value)}

className="
w-full
rounded-lg
border
p-3
text-black
"

/>



<input

placeholder="Company"

value={company}

onChange={(e)=>setCompany(e.target.value)}

className="
w-full
rounded-lg
border
p-3
text-black
"

/>



<input

placeholder="Role"

value={role}

onChange={(e)=>setRole(e.target.value)}

className="
w-full
rounded-lg
border
p-3
text-black
"

/>



<select

value={type}

onChange={(e)=>setType(e.target.value as ContactType)}

className="
w-full
rounded-lg
border
p-3
text-black
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




<input

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
w-full
rounded-lg
border
p-3
text-black
"

/>



<textarea

placeholder="Notes"

value={notes}

onChange={(e)=>setNotes(e.target.value)}

className="
w-full
rounded-lg
border
p-3
text-black
"

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

Add Contact

</button>



</form>

);


}