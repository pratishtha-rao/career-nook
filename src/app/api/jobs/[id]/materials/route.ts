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
    const { materialId } = await request.json();

    const jobId = Number(id);
    const parsedMaterialId = Number(materialId);

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

    const material = await prisma.material.findFirst({
      where: {
        id: parsedMaterialId,
        userId: user.id,
      },
    });

    if (!material) {
      return Response.json(
        { error: "Material not found" },
        { status: 404 }
      );
    }

    const existing = await prisma.jobMaterial.findUnique({
      where: {
        jobId_materialId: {
          jobId,
          materialId: parsedMaterialId,
        },
      },
    });

    if (!existing) {
      await prisma.jobMaterial.create({
        data: {
          jobId,
          materialId: parsedMaterialId,
        },
      });
    }

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