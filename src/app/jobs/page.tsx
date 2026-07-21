"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobForm from "@/components/jobs/JobForm";
import EditJobForm from "@/components/jobs/EditJobForm";
import { Job, CreateJob } from "@/types/Job";

export default function JobsPage() {

const [jobs, setJobs] = useState<Job[]>([]);
const [loading, setLoading] = useState(true);


  const [editingJob,setEditingJob] = useState<Job | null>(null);

async function addJob(job: CreateJob) {
    const response = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

if(!response.ok){
const error = await response.text();
console.log(error);
return;
}

const newJob = await response.json();

  setJobs(previous => [newJob, ...previous]);
}

  useEffect(() => {
  async function loadJobs() {
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();

      setJobs(data);
    } catch (error) {
      console.error("Failed to load jobs:", error);
    } finally {
      setLoading(false);
    }
  }

  loadJobs();
}, []);


async function deleteJob(id: number) {
  await fetch(`/api/jobs/${id}`, {
    method: "DELETE",
  });

  setJobs(previous =>
    previous.filter(job => job.id !== id)
  );
}

async function saveEditedJob(updatedJob: Job) {
  const response = await fetch(`/api/jobs/${updatedJob.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedJob),
  });

if(!response.ok){
const error = await response.text();
console.log(error);
return;
}

const job = await response.json();

  setJobs(previous =>
    previous.map(item =>
      item.id === job.id ? job : item
    )
  );

  setEditingJob(null);
}


if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Loading jobs...</p>
    </main>
  );
}

  return (


    <main className="min-h-screen bg-slate-100">


      <div className="
        mx-auto
        max-w-6xl
        px-8
        py-12
      ">


        <h1 className="
          text-4xl
          font-bold
          text-slate-900
        ">
          Jobs
        </h1>



        <p className="
          mt-3
          text-slate-600
        ">
          Track your job applications and opportunities.
        </p>





        <div className="mt-8">

          <JobForm
            onAddJob={addJob}
          />

        </div>


      {
        editingJob && (

        <EditJobForm

        job={editingJob}

        onSave={saveEditedJob}

        onCancel={()=>setEditingJob(null)}

        />

    )
      }


        <div className="
          mt-10
          grid
          gap-6
        ">



          {
            jobs
              .map((job) => (


                <JobCard

                  key={job.id}

                  job={job}

                  onDelete={deleteJob}

                  onEdit={(job)=>setEditingJob(job)}
                />


              ))
          }



        </div>



      </div>


    </main>


  );

}

