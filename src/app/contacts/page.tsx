"use client";


import { useState } from "react";
import { Contact } from "@/types/Contact";

import ContactCard from "@/components/contacts/ContactCard";
import ContactForm from "@/components/contacts/ContactForm";



export default function ContactsPage(){


const [contacts,setContacts]=useState<Contact[]>([

{
id:1,
name:"Sarah Johnson",
company:"Microsoft",
role:"Recruiter",
type:"Recruiter",
email:"sarah@microsoft.com",
notes:"Met at career fair"
},

{
id:2,
name:"Alex Lee",
company:"Google",
role:"Software Engineer",
type:"Employee",
notes:"Potential referral contact"
}

]);



function addContact(contact:Contact){

setContacts((previous)=>[
...previous,
contact
]);

}



return (

<main className="min-h-screen bg-slate-100">


<div className="mx-auto max-w-6xl px-8 py-12">


<h1 className="text-4xl font-bold">
Contacts
</h1>


<p className="mt-3 text-slate-600">
Manage your professional network.
</p>



<div className="mt-8">

<ContactForm
onAddContact={addContact}
/>

</div>




<div className="mt-10 grid gap-6">


{
contacts.map((contact)=>(

<ContactCard
key={contact.id}
contact={contact}
/>

))
}


</div>


</div>


</main>

);


}