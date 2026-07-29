import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getUser";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
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

    const { id } = await params;
    const { contactId } = await request.json();

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

    const contact = await prisma.contact.findFirst({
      where: {
        id: parsedContactId,
        userId: user.id,
      },
    });

    if (!contact) {
      return Response.json(
        { error: "Contact not found" },
        { status: 404 }
      );
    }

    const existing = await prisma.jobContact.findUnique({
      where: {
        jobId_contactId: {
          jobId,
          contactId: parsedContactId,
        },
      },
    });

    if (existing) {
      return Response.json({
        success: true,
        alreadyExists: true,
      });
    }

    await prisma.jobContact.create({
      data: {
        jobId,
        contactId: parsedContactId,
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