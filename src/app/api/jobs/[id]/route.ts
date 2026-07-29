import {
  updateJob,
  deleteJob,
} from "@/services/jobService";

import { getCurrentUser } from "@/lib/getUser";

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const body = await request.json();

  const job = await updateJob(
    Number(id),
    user.id,
    {
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

      archived: body.archived,

      folderIds: body.folderIds,
    }
  );

  return Response.json(job);
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  await deleteJob(
    Number(id),
    user.id
  );

  return Response.json({
    success: true,
  });
}