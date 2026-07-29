import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getUser";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
      contactId: string;
    }>;
  }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id, contactId } = await params;

    const jobId = Number(id);
    const parsedContactId = Number(contactId);

    if (
      Number.isNaN(jobId) ||
      Number.isNaN(parsedContactId)
    ) {
      return Response.json(
        { error: "Invalid IDs" },
        { status: 400 }
      );
    }

    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId: user.id,
      },
    });

    if (!job) {
      return Response.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    await prisma.jobContact.delete({
      where: {
        jobId_contactId: {
          jobId,
          contactId: parsedContactId,
        },
      },
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}