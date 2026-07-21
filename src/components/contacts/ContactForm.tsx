"use client";


import { useState } from "react";
import { Contact, ContactType } from "@/types/Contact";


type Props = {
  onAddContact: (contact: Contact)=>void;
};



export default function ContactForm({
  onAddContact,
}: Props) {


  const [name,setName] = useState("");
  const [company,setCompany] = useState("");
  const [role,setRole] = useState("");
  const [type,setType] = useState<ContactType>("Recruiter");
  const [email,setEmail] = useState("");
  const [notes,setNotes] = useState("");



  function handleSubmit(
    e: React.FormEvent
  ){

    e.preventDefault();


    const newContact: Contact = {

      id: Date.now(),

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
    setType("Recruiter");

  }



  return (

    <form
      onSubmit={handleSubmit}
      className="
      rounded-2xl
      border
      bg-white
      p-6
      shadow-sm
      "
    >


      <h2 className="mb-6 text-2xl font-bold">
        Add Contact
      </h2>



      <div className="grid gap-4">


        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="rounded-lg border p-3"
          required
        />



        <input
          placeholder="Company"
          value={company}
          onChange={(e)=>setCompany(e.target.value)}
          className="rounded-lg border p-3"
          required
        />



        <input
          placeholder="Role"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          className="rounded-lg border p-3"
          required
        />



        <select
          value={type}
          onChange={(e)=>setType(
            e.target.value as ContactType
          )}
          className="rounded-lg border p-3"
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
            Mentor
          </option>

          <option>
            Other
          </option>


        </select>



        <input
          placeholder="Email (optional)"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="rounded-lg border p-3"
        />



        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e)=>setNotes(e.target.value)}
          className="rounded-lg border p-3"
        />



        <button
          className="
          rounded-lg
          bg-purple-600
          px-6
          py-3
          font-semibold
          text-white
          hover:bg-purple-700
          "
        >

          Add Contact

        </button>


      </div>


    </form>

  );

}