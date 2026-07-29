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
    const { taskId } = await request.json();

    const jobId = Number(id);
    const parsedTaskId = Number(taskId);

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

    const task = await prisma.task.findFirst({
      where: {
        id: parsedTaskId,
        userId: user.id,
      },
    });

    if (!task) {
      return Response.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    const existing = await prisma.jobTask.findUnique({
      where: {
        jobId_taskId: {
          jobId,
          taskId: parsedTaskId,
        },
      },
    });

    if (!existing) {
      await prisma.jobTask.create({
        data: {
          jobId,
          taskId: parsedTaskId,
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