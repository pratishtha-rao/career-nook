import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getUser";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
      materialId: string;
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

    const { id, materialId } = await params;

    const job = await prisma.job.findFirst({
      where: {
        id: Number(id),
        userId: user.id,
      },
    });

    if (!job) {
      return Response.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    await prisma.jobMaterial.delete({
      where: {
        jobId_materialId: {
          jobId: Number(id),
          materialId: Number(materialId),
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