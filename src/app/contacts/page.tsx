"use client";


import { useState } from "react";

import { Contact } from "@/types/Contact";

import ContactCard from "@/components/contacts/ContactCard";

import ContactForm from "@/components/contacts/ContactForm";

import EditContactForm from "@/components/contacts/EditContactForm";


export default function ContactsPage(){


const [contacts,setContacts] = useState<Contact[]>([

{
    id: 1,
    name: "Sarah Johnson",
    company: "Google",
    role: "Recruiter",
    email: "sarah@google.com",
    notes: "Met at career fair",
    archived: false,
    type: "Recruiter"
},

{
    id: 2,
    name: "Mike Smith",
    company: "Microsoft",
    role: "Engineering Manager",
    email: "mike@microsoft.com",
    notes: "Interested in networking",
    archived: false,
    type: "Recruiter"
}

]);

const [editingContact,setEditingContact] =
useState<Contact | null>(null);


function deleteContact(id:number){

setContacts(previous =>

previous.filter(
(contact)=>contact.id !== id
)

);

}



function archiveContact(id:number){

setContacts(previous =>

previous.map(contact =>

contact.id === id

?

{
...contact,
archived:true
}

:

contact

)

);

}



function saveEditedContact(updatedContact:Contact){

setContacts(previous =>

previous.map(contact =>

contact.id === updatedContact.id

?

updatedContact

:

contact

)

);


setEditingContact(null);

}




return (

<main className="
min-h-screen
bg-slate-100
">


<div className="
mx-auto
max-w-6xl
px-8
py-12
">


<h1 className="
text-4xl
font-bold
">

Contacts

</h1>


<p className="
mt-3
text-slate-600
">

Manage your professional connections.

</p>

<div className="mt-8">

<ContactForm

onAddContact={(contact)=>

setContacts(previous => [
...previous,
contact
])

}

/>

</div>

{
editingContact && (

<EditContactForm

contact={editingContact}

onSave={saveEditedContact}

onCancel={()=>setEditingContact(null)}

/>

)
}

<div className="
mt-10
grid
gap-6
">


{

contacts

.filter(
(contact)=>!contact.archived
)

.map(contact => (


<ContactCard

key={contact.id}

contact={contact}

onEdit={setEditingContact}

onDelete={deleteContact}

onArchive={archiveContact}

/>


))


}



</div>


</div>


</main>

);


}
