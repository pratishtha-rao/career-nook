"use client";

import { useState } from "react";

import { Job } from "@/types/Job";

import JobCard from "@/components/jobs/JobCard";

import JobForm from "@/components/jobs/JobForm";

import EditJobForm from "@/components/jobs/EditJobForm";

export default function JobsPage() {


  const [jobs, setJobs] = useState<Job[]>([

    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      status: "Applied",
      dateApplied: "2026-07-20",
      notes: "Waiting for response",
      archived: false,
    },

    {
      id: 2,
      company: "Microsoft",
      position: "Frontend Developer",
      status: "Interview",
      dateApplied: "2026-07-18",
      notes: "Technical interview scheduled",
      archived: false,
    },

  ]);

  const [editingJob,setEditingJob] = useState<Job | null>(null);

  function addJob(job: Job) {

    setJobs((previous) => [

      ...previous,

      job,

    ]);

  }




  function deleteJob(id: number) {

    setJobs((previous) =>

      previous.filter(
        (job) => job.id !== id
      )

    );

  }




  function archiveJob(id: number) {

    setJobs((previous) =>

      previous.map((job) =>

        job.id === id

          ?

          {
            ...job,
            archived: true,
          }

          :

          job

      )

    );

  }




function saveEditedJob(updatedJob:Job){

setJobs(previous =>

previous.map(job =>

job.id === updatedJob.id

?

updatedJob

:

job

)

);


setEditingJob(null);

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
              .filter(
                (job) => !job.archived
              )
              .map((job) => (


                <JobCard

                  key={job.id}

                  job={job}

                  onDelete={deleteJob}

                  onArchive={archiveJob}

                  onEdit={(job)=>setEditingJob(job)}
                />


              ))
          }



        </div>



      </div>


    </main>


  );

}

