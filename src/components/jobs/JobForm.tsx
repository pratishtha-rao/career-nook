"use client";

import { useState } from "react";
import { CreateJob, JobStatus } from "@/types/Job";

type Props = {
  onAddJob: (job: CreateJob) => void;
};

export default function JobForm({ onAddJob }: Props) {

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<JobStatus>("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [url,setUrl] = useState("");

  const [notes,setNotes] = useState("");

  function handleSubmit(e: React.FormEvent) {

    e.preventDefault();


const newJob: CreateJob = {
  company,
  position,
  status,
  dateApplied,
  url,
  notes,
};

onAddJob(newJob);


    setCompany("");
    setPosition("");
    setStatus("Applied");
    setDateApplied("");
    setUrl("");
    setNotes("");
  }


  return (

    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-6 shadow-sm"
    >


      <h2 className="mb-6 text-2xl font-bold">
        Add Job Application
      </h2>



      <div className="grid gap-4">


        <input
          placeholder="Company"
          value={company}
          onChange={(e)=>setCompany(e.target.value)}
          className="rounded-lg border p-3"
          required
        />


        <input
          placeholder="Position"
          value={position}
          onChange={(e)=>setPosition(e.target.value)}
          className="rounded-lg border p-3"
          required
        />



        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value as JobStatus)}
          className="rounded-lg border p-3"
        >

          <option>
            Applied
          </option>

          <option>
            Interview
          </option>

          <option>
            Offer
          </option>

          <option>
            Rejected
          </option>


        </select>


      <input
        placeholder="Job URL"
        value={url}
onChange={(e)=>setUrl(e.target.value)}
className="rounded-lg border p-3"
/>


<textarea
placeholder="Notes"
value={notes}
onChange={(e)=>setNotes(e.target.value)}
className="rounded-lg border p-3"
/>


        <input
          type="date"
          value={dateApplied}
          onChange={(e)=>setDateApplied(e.target.value)}
          className="rounded-lg border p-3"
          required
        />



        <button
          type="submit"
          className="
            rounded-lg
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
            hover:bg-blue-700
          "
        >
          Add Application
        </button>


      </div>


    </form>

  );
}
