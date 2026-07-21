"use client";

import { useEffect, useState } from "react";

import { Contact, CreateContact } from "@/types/Contact";

import ContactCard from "@/components/contacts/ContactCard";
import ContactForm from "@/components/contacts/ContactForm";
import EditContactForm from "@/components/contacts/EditContactForm";
import { useRouter } from "next/navigation";

export default function ContactsPage(){


const [contacts,setContacts] = useState<Contact[]>([]);
const router = useRouter();

const [editingContact,setEditingContact] = useState<Contact | null>(null);



useEffect(() => {

  async function loadContacts() {

    const response = await fetch("/api/contacts");

    const data = await response.json();

    if (response.status === 401) {
      router.push("/login");
      return;
    }

    if (!response.ok) {
      console.error(data);
      setContacts([]);
      return;
    }

    setContacts(Array.isArray(data) ? data : []);

  }

  loadContacts();

}, [router]);

async function addContact(contact:CreateContact){

const response = await fetch("/api/contacts",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(contact)

});


const savedContact = await response.json();


setContacts(previous=>[
...previous,
savedContact
]);


}




async function deleteContact(id:number){

await fetch(`/api/contacts/${id}`,{

method:"DELETE"

});


setContacts(previous=>

previous.filter(
(contact)=>contact.id !== id
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

item.id === contact.id

?

contact

:

item

)

);


setEditingContact(null);

}




return (

<main className="min-h-screen bg-slate-100">

<div className="mx-auto max-w-6xl px-8 py-12">


<h1 className="text-4xl font-bold text-black">
Contacts
</h1>


<p className="mt-3 text-slate-600">
Manage your professional connections.
</p>



<div className="mt-8">

<ContactForm

onAddContact={addContact}

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




<div className="mt-10 grid gap-6">


{

contacts.map(contact=>(


<ContactCard

key={contact.id}

contact={contact}

onEdit={(contact)=>
setEditingContact(contact)
}

onDelete={deleteContact}

/>


))

}


</div>


</div>


</main>

);


}
