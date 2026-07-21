"use client";


import { useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import { Job } from "@/types/Job";
import JobForm from "@/components/jobs/JobForm";

export default function JobsPage() {


  const [jobs, setJobs] = useState<Job[]>([
    
    {
      id:1,
      company:"OpenAI",
      position:"Software Engineer",
      status:"Interview",
      dateApplied:"2026-07-20",
    },

    {
      id:2,
      company:"Google",
      position:"Frontend Developer",
      status:"Applied",
      dateApplied:"2026-07-18",
    }
  ]);

  function addJob(job: Job) {
  setJobs((previousJobs)=>[
    ...previousJobs,
    job,
  ]);
}


  return (

    <main className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-6xl px-8 py-12">


        <h1 className="text-4xl font-bold">
          Job Applications
        </h1>


        <p className="mt-3 text-slate-600">
          Track every opportunity in one place.
        </p>

        <div className="mt-8">
        <JobForm onAddJob={addJob}/>
        </div>

        <div className="mt-10 grid gap-6">


          {jobs.map((job)=>(
            <JobCard
              key={job.id}
              job={job}
            />
          ))}


        </div>


      </div>

    </main>

  );
}