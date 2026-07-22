"use client";

import { useState } from "react";
import { getDemoData, saveDemoData } from "@/lib/demoStorage";


type Contact = {

id:number;
name:string;
company:string;
role:string;
type:string;
email?:string;
notes?:string;

};



export default function DemoContacts(){


const [contacts,setContacts] = useState<Contact[]>(()=> 
getDemoData<Contact>("demo_contacts")
);



const [editingContact,setEditingContact] = useState<Contact | null>(null);



const [name,setName] = useState("");
const [company,setCompany] = useState("");
const [role,setRole] = useState("");
const [type,setType] = useState("Recruiter");
const [email,setEmail] = useState("");
const [notes,setNotes] = useState("");





function resetForm(){

setName("");
setCompany("");
setRole("");
setType("Recruiter");
setEmail("");
setNotes("");

}





function saveData(updated:Contact[]){

setContacts(updated);

saveDemoData(
"demo_contacts",
updated
);

}





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



saveData([

contact,
...contacts

]);


resetForm();

}





function startEdit(contact:Contact){


setEditingContact(contact);


setName(contact.name);

setCompany(contact.company);

setRole(contact.role);

setType(contact.type);

setEmail(contact.email ?? "");

setNotes(contact.notes ?? "");

}





function saveEdit(){


if(!editingContact) return;



const updated = contacts.map(contact =>

contact.id === editingContact.id

?

{

...contact,

name,

company,

role,

type,

email,

notes

}

:

contact

);



saveData(updated);


setEditingContact(null);

resetForm();


}





function deleteContact(id:number){


const updated = contacts.filter(

contact=>contact.id !== id

);


saveData(updated);


}





return (

<section>


<h2 className="
text-2xl
font-bold
text-slate-900
">

Contacts

</h2>





<div className="
mt-4
rounded-xl
border
border-blue-100
bg-white
p-6
shadow-sm
space-y-3
">





<input

placeholder="Name"

value={name}

onChange={e=>setName(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

/>




<input

placeholder="Company"

value={company}

onChange={e=>setCompany(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

/>




<input

placeholder="Role"

value={role}

onChange={e=>setRole(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

/>




<select

value={type}

onChange={e=>setType(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

>

<option>Recruiter</option>

<option>Hiring Manager</option>

<option>Employee</option>

<option>Friend</option>

<option>Other</option>

</select>





<input

placeholder="Email"

value={email}

onChange={e=>setEmail(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

/>




<textarea

placeholder="Notes"

value={notes}

onChange={e=>setNotes(e.target.value)}

className="
w-full
rounded-lg
border
border-slate-200
p-3
"

/>






<button

onClick={
editingContact
?
saveEdit
:
addContact
}

className="
rounded-lg
bg-blue-600
px-5
py-3
font-semibold
text-white
hover:bg-blue-700
"

>

{
editingContact
?
"Save Contact"
:
"Add Contact"
}

</button>





{
editingContact && (

<button

type="button"

onClick={()=>{

setEditingContact(null);

resetForm();

}}

className="
ml-3
rounded-lg
border
px-5
py-3
font-semibold
hover:bg-slate-50
"

>

Cancel

</button>

)

}



</div>









<div className="
mt-8
space-y-5
">





{

contacts.map(contact=>(


<div

key={contact.id}

className="
border
border-blue-100
bg-white
p-6
shadow-sm
transition
hover:-translate-y-1
hover:shadow-lg
"

>




<div className="
flex
justify-between
items-start
">


<div>


<h3 className="
text-xl
font-bold
text-slate-900
">

{contact.name}

</h3>



<p className="
mt-1
text-slate-600
">

{contact.company}

</p>


</div>



<span className="
rounded-full
bg-blue-100
px-3
py-1
text-xs
font-semibold
text-blue-700
">

{contact.type}

</span>



</div>







<p className="
mt-4
text-slate-700
">

Role: {contact.role}

</p>







{
contact.email && (

<p className="
mt-2
text-slate-600
">

{contact.email}

</p>

)

}







{
contact.notes && (

<div className="
mt-4
rounded-lg
bg-blue-50
p-3
text-slate-700
">

{contact.notes}

</div>

)

}








<div className="
mt-5
flex
gap-3
">



<button

onClick={()=>startEdit(contact)}

className="
rounded-lg
border
border-blue-200
px-4
py-2
text-blue-600
hover:bg-blue-50
"

>

Edit

</button>




<button

onClick={()=>deleteContact(contact.id)}

className="
rounded-lg
bg-red-600
px-4
py-2
text-white
hover:bg-red-700
"

>

Delete

</button>




</div>





</div>


))

}




</div>



</section>

);


}

