import { getCurrentUser } from "@/lib/getUser";
import {
  getJobs,
  createJob,
} from "@/services/jobService";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

const jobs = await getJobs(user.id);

const activeJobs = jobs.filter(job => !job.archived);

return Response.json(activeJobs);

}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const body = await request.json();

  const job = await createJob(user.id, {
    company: body.company,
    position: body.position,
    status: body.status,

dateApplied: new Date(body.dateApplied),

    salary: body.salary,
    salaryNotes: body.salaryNotes,

    location: body.location,

    officeType: body.officeType,

    url: body.url,

    description: body.description,

    notes: body.notes,

    referredBy: body.referredBy,

    folderIds: body.folderIds ?? [],
  });

  return Response.json(job);
}