"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Contact,
  CreateContact
} from "@/types/Contact";

import ContactCard from "@/components/contacts/ContactCard";
import ContactForm from "@/components/contacts/ContactForm";
import EditContactForm from "@/components/contacts/EditContactForm";


export default function ContactsPage(){

const [contacts,setContacts] = useState<Contact[]>([]);
const [editingContact,setEditingContact] = useState<Contact | null>(null);

const router = useRouter();



useEffect(()=>{


async function loadContacts(){

const response = await fetch("/api/contacts");

const data = await response.json();



if(response.status === 401){

router.push("/login");

return;

}



if(!response.ok){

setContacts([]);

return;

}



setContacts(
Array.isArray(data)
?
data
:
[]
);


}


loadContacts();


},[router]);





async function addContact(contact:CreateContact){


const response = await fetch("/api/contacts",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(contact)

});


const saved = await response.json();



setContacts(previous=>[
saved,
...previous
]);


}





async function deleteContact(id:number){


await fetch(`/api/contacts/${id}`,{

method:"DELETE"

});


setContacts(previous=>

previous.filter(
contact=>contact.id!==id
)

);


}





async function saveEditedContact(contact:Contact){


await fetch(`/api/contacts/${contact.id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(contact)

});



setContacts(previous=>

previous.map(item=>

item.id===contact.id
?
contact
:
item

)

);



setEditingContact(null);


}





return (

<main className="
min-h-screen
bg-[#f5f9ff]
">


<div className="
mx-auto
max-w-6xl
px-8
py-10
">


<div className="mb-8">


<h1 className="
text-4xl
font-bold
text-slate-950
">

Network

</h1>


<p className="
mt-2
text-slate-600
">

Manage recruiters, mentors, referrals, and professional relationships.

</p>


</div>




<ContactForm
onAddContact={addContact}
/>




{
editingContact && (

<div className="mt-6">

<EditContactForm

contact={editingContact}

onSave={saveEditedContact}

onCancel={()=>setEditingContact(null)}

/>

</div>

)

}





<div className="
mt-8
grid
gap-5
md:grid-cols-2
">


{
contacts.map(contact=>(


<ContactCard

key={contact.id}

contact={contact}

onEdit={setEditingContact}

onDelete={deleteContact}

/>


))

}


</div>


</div>


</main>

);


}

