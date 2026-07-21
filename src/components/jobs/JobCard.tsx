import { Job } from "@/types/Job";


type Props = {
  job: Job;
};


export default function JobCard({ job }: Props) {

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex justify-between">

        <div>

          <h2 className="text-xl font-bold">
            {job.position}
          </h2>

          <p className="text-slate-600">
            {job.company}
          </p>

        </div>


        <span className="
          rounded-full
          bg-blue-100
          px-3
          py-1
          text-sm
          text-blue-700
        ">
          {job.status}
        </span>

      </div>


      <p className="mt-4 text-sm text-slate-500">
        Applied: {job.dateApplied}
      </p>


    </div>
  );
}